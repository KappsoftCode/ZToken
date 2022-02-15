import { resolve } from 'path';
import { compile } from 'solc';
import { removeSync, readFileSync, ensureDirSync, outputJsonSync } from 'fs-extra';

const buildPath = resolve(__dirname, 'build');

removeSync(buildPath) //remove build directory if exists

const tokenPath = resolve(__dirname, 'contracts', 'ZToken.sol');
const proxyPath = resolve(__dirname, 'contracts', 'ZProxy.sol');
const proxyAdminPath = resolve(__dirname, 'contracts', 'ZProxyAdmin.sol')
const tokenSource = readFileSync(tokenPath, 'utf8');
const proxySource = readFileSync(proxyPath, 'utf8');
const proxyAdminSource = readFileSync(proxyAdminPath, 'utf-8');

var input = {
    language: 'Solidity',
    sources: {
        'ZToken.sol': {
            content: tokenSource
        },
        'ZProxy.sol': {
            content: proxySource
        },
        'ZProxyAdmin.sol': {
            content: proxyAdminSource
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        },
        remappings: ["@openzeppelin=./node_modules/@openzeppelin"],
    }
};
function findImports(path_) {
    if (path_)
        return {
            contents:
                readFileSync(path_, 'utf-8')
        };
    else return { error: 'File not found' };
}
//console.log(JSON.parse(solc.compile(JSON.stringify(input), { import: findImports })))
const output = JSON.parse(compile(JSON.stringify(input), { import: findImports })).contracts

ensureDirSync(buildPath); //check whether dir exist and will create one

for (let source of Object.values(output) ) {
    for (let contract in source) {
        outputJsonSync(
            resolve(buildPath, contract + '.json'),
            source[contract]
        )
    }
}

/*
the foor loop above take each keys(contaracts) from output object
create a json file with contract name in build directory
*/
