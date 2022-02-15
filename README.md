<img src="https://www.zebacus.com/img/logo/zebacus-brand-logo.png" width="300">

-------

# Z TOKEN

Z Token is a fully regulated utility token licensed by LFSSA, Malaysia. It is an exclusive limited issue
token only for use by all registered members, clients and users on all of Unicoin DCX Limited’s (UDCX)
regulated digital exchange platform at www.unicoindcx.com. Tokens can be used for paying trading fees,
obtaining discounts, staking and all future services. 


## DEPLOYMENT INSTRUCTIONS
----

* Install truffle globally.

        $npm install -g truffle

* Clone the github repo.

        $git clone https://github.com/Kappsoft/UNICOIN-DCX.git

* Install all other packages.

        $cd UNICOIN-DCX
        $npm install

* Create a .env file with following variables.

            ETHERSCAN_API_KEY =NMY3M6XYFUnhkjhXNTASD71PPM56Z2EMKJM
            DEVELOPMENT_MNEMONIC =blah cook jacket visit float skip frost 
            INFURA_SECRET =9a6258223f98b747d5a16b6e11b0a16d7b
            INFURA_ID =cb546799242c4621b4e5c511234b6e85
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

## Deployed Contract Details (Rinkeby Test Network) [Dated 09/09/2021]
-------------------------------------------------------------------

* ZProxyAdmin - 0x346d7ba7610D19e7ee06256b59bd9962e5AA14C6  
* ZToken_V1   - 0x3C11CD6A605B80F51A1b39875d40B2486ED216bd  
* ZProxy      - 0xb92De13C291cB8c305302249DA18D779Ae412100
