const path = require('path');
const fs = require('fs');
const solc = require('solc');

module.exports = ( tokenOrPresale )=>{

    if (tokenOrPresale =='token'){
        const contractPath = path.resolve(__dirname, '../contracts/Token.sol');
        const source = fs.readFileSync(contractPath, 'utf8');
        const input = {
            language: 'Solidity',
            sources: {
                'Token.sol': {
                    content: source,
                },
            },
            settings: {
                optimizer: {
                    enabled: true,
                    runs: 200
                },
                outputSelection: {
                    '*': {
                        '*': ['*'],
                    },
                },
            },
        };
        const tempFile = JSON.parse(solc.compile(JSON.stringify(input)));
        const contractFile = tempFile.contracts['Token.sol']['StandardToken'];
        return contractFile;
    }else{
        const contractPath = path.resolve(__dirname, '../contracts/Presale.sol');
        const source = fs.readFileSync(contractPath, 'utf8');

        const input = {
            language: 'Solidity',
            sources: {
                'Presale.sol': {
                    content: source,
                },
            },
            settings: {
                optimizer: {
                    enabled: true,
                    runs: 1
                },
                outputSelection: {
                    '*': {
                        '*': ['*'],
                    },
                },
            },
        };
        const tempFile = JSON.parse(solc.compile(JSON.stringify(input)));

        const contractFile = tempFile.contracts['Presale.sol']['SafuTrendzPresale'];

        return contractFile;
    }
}

