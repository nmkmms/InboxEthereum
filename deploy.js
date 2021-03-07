const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { contract_interface, bytecode } = require('./compile');

const MNEMONIC = 'YOUR_MNEMONIC';
const INFURA_API_LINK = 'YPUR_INFURA_API_LINK'

const provider = new HDWalletProvider(
    MNEMONIC,
    INFURA_API_LINK
);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(contract_interface))
        .deploy({ data: '0x' + bytecode, arguments: ['Hi there!'] })
        .send({ from: accounts[0] });

    console.log('Contract deployed to', result.options.address);
};
deploy();