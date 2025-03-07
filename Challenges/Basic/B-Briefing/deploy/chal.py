import json
from pathlib import Path


import eth_sandbox
from web3 import Web3


def deploy(web3: Web3, deployer_address: str, deployer_privateKey: str, player_address: str) -> str:
    contract_info = json.loads(Path("compiled/Setup.sol/Setup.json").read_text())

    abi = contract_info["abi"]
    bytecode = contract_info["bytecode"]["object"]

    secret = "0x4e6f77596f754b6e6f7753746f7261676549734e6f7454686174536166652e2e"

    contract = web3.eth.contract(abi=abi, bytecode=bytecode)

    construct_txn = contract.constructor(secret).build_transaction(
        {
            "from": deployer_address,
            "value": Web3.toWei(1000, 'ether'),
            "nonce": web3.eth.get_transaction_count(deployer_address),
        }
    )

    tx_create = web3.eth.account.sign_transaction(construct_txn, deployer_privateKey)
    tx_hash = web3.eth.send_raw_transaction(tx_create.rawTransaction)

    rcpt = web3.eth.wait_for_transaction_receipt(tx_hash)

    return rcpt.contractAddress

app = eth_sandbox.run_launcher(deploy)
