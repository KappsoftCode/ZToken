<img src="https://www.zebacus.com/img/logo/zebacus-brand-logo.png" width="300">

-------

# Z TOKEN

Z Token is an exclusive multi utility token issued for all registered members, clients and users on all of Zebacus digital exchange platform at www.zebacus.com. Tokens can be used to pay trading fees, avail discounts, stake and access all future services. The tokens are available for purchase for a limited time and quantity before being listed for trading on our exchange.


## DEPLOYMENT INSTRUCTIONS
----

* Install truffle globally.

        $npm install -g truffle

* Clone the github repo.

        $git clone https://github.com/KappsoftCode/ZToken.git

* Install all other packages.

        $cd ZToken
        $npm install

* Create a .env file with following variables.

            ETHERSCAN_API_KEY =NMY3M6XYFUnhkjhXNgh54j71PPM56Z2EMKJM
            DEVELOPMENT_MNEMONIC =Alice bob apple visit float skip ball 
            INFURA_SECRET =9a6258223f9858655a16b6e11b0a16d7b
            INFURA_ID =gb546799242c4621b4e5c511235456e85
            MNEMONIC =Please fill the data
    (NB:Never use the above value, Update the data)

* Compile the contracts.

        $truffle compile

* Deploy the contract.
        
        $truffle migrate --network rinkeby
    (NB: change network accordingly)

* Verify the contract code.

        $truffle run verify ZProxyAdmin --network rinkeby
        $truffle run verify ZToken_V1 --network rinkeby
        $truffle run verify ZProxy --network rinkeby

## Developement
---

Prerequisite : Truffle ( https://github.com/trufflesuite/truffle#readme ).

truffle netwok configuration 
```
host: 127.0.0.1
port: 7545
network_id: 5777
```
----
### install

```
$npm install
```
### compile
```
$truffle compile
```
### migration 
```
$truffle migrate --network development
```

## Test
---

```
$truffle test
```        

## Deployed Contract Details (Rinkeby Test Network)
-------------------------------------------------------------------

* ZProxyAdmin - 0x35f192b3781cE3E79817b39C083979EdAb85EBb7
* ZToken_V1   - 0x292C92c0f7A935e34944534B18f3484E881Ac068
* ZProxy      - 0x7B218739C85b05AC8b67485819B206B3802622d9

## Deployed Contract Details (BSC Test Network)
-------------------------------------------------------------------

* ZProxyAdmin - 0x7Fdd2632FB111A57695Bbd1E971e83856D72af61
* ZToken_V1   - 0x8B3757f14D150a1890368C1790B6663CBfFDD6b0
* ZProxy      - 0x89F31803F05e808Cf92493B923B670513f35FE11

## Deployed Contract Details (Polygon Mumbai Testnet)
-------------------------------------------------------------------

* ZProxyAdmin - 0xE7F4AFD8D2450c547e5636800479606b582C1f60
* ZToken_V1   - 0x0bB0C9e08C8F86c4c31ECc4D567be4F9C298D238
* ZProxy      - 0x2CB36EAC655C736Fe56a732737d23982C2EE16Fe
