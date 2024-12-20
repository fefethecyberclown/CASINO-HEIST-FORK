#!/bin/bash

# Step 1: Ask For input
# require sudo?
# domain_name - Domain
# challenge_ip - Challenge VPS IP
read -p "Does your VPS Require sudo(yes/no): " require_sudo

if [ "$require_sudo" == "yes" ]; then
    sudo_needed="sudo"
elif [ "$require_sudo" == "no" ]; then
    sudo_needed=""
else
    echo "Invalid input!"
    exit 1
fi

read -p "Enter your domain name: " domain_name
read -p "Enter your challenge server IP: " challenge_ip

# STEP 2: Generating Random 32 Bytes SECRET_KEY
echo "Generating 32-byte hex secret..."
secret_key=$(openssl rand -hex 32)
backend_env="./Backend/.env"
echo "SECRET_KEY=$secret_key" > "$backend_env"
echo "Secret key saved in $backend_env"

# Step 3: Run docker-compose up in detached mode for Backend
echo "Starting Docker containers..."
docker-compose down 
docker-compose up -d --build

# Step 4: Changing the .env for Frontend and preparing for Nginx
frontend_env="./Frontend/.env"
echo "VITE_BACKEND_IP='https://$domain_name/api'" > "$frontend_env"
cd ./Frontend
python3 changer.py $challenge_ip
chmod 777 ./install.sh
./install.sh
cp -r ./dist/* /var/www/$domain_name/html
cd ..

# Step 5: Get the IP address of the 'react-casino-heist_web' container
container_id=$(docker ps --filter "ancestor=react-casino-heist_web" --format "{{.ID}}")

if [ -z "$container_id" ]; then
    echo "No running container found with image 'react-casino-heist_web'."
    exit 1
fi

echo "Container ID found: $container_id"

container_ip=$(docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' "$container_id")
echo "$container_id has the IP of: $container_ip"

if [ -z "$container_ip" ]; then
    echo "Failed to get container IP. Make sure the container is running."
    exit 1
fi

echo "Container IP for $container_name: $container_ip"

# Step 6: Create the Nginx configuration file
nginx_config_path="/etc/nginx/sites-available/$domain_name"

cat > "$nginx_config_path" <<EOL
server {
    root /var/www/${domain_name}/html;
    index index.html index.htm index.nginx-debian.html;

    server_name ${domain_name} www.${domain_name};

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://${container_ip}:8000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    listen [::]:443 ssl ipv6only=on;
    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/${domain_name}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${domain_name}/privkey.pem;

    error_page 404 /index.html;
}

server {
    if (\$host = www.${domain_name}) {
        return 301 https://\$host\$request_uri;
    }
    if (\$host = ${domain_name}) {
        return 301 https://\$host\$request_uri;
    }

    listen 80;
    listen [::]:80;
    server_name ${domain_name} www.${domain_name};
    return 404;
}
EOL

# Step 7: Create symlink to enable the site
rm -rf /etc/nginx/sites-enabled/$domain_name
ln -s "$nginx_config_path" /etc/nginx/sites-enabled/

# Step 8: Test NGINX configuration
nginx -t
if [ $? -ne 0 ]; then
    echo "NGINX configuration test failed. Please check the config."
    exit 1
fi

# Step 9: Restart NGINX service
echo "Restarting Nginx..."
$sudo_needed service nginx restart

echo "Deployment completed successfully!"
echo "Your website is deployed on https://$domain_name"
