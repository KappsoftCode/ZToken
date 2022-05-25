/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * trufflesuite.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like @truffle/hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */

const HDWalletProvider = require("@truffle/hdwallet-provider");
require("dotenv").config();
const mnemonic = process.env.MNEMONIC;
const infuraRinkeby = `wss://:${process.env.INFURA_SECRET}@rinkeby.infura.io/ws/v3/${process.env.INFURA_ID}`;
const mumbaiTestnetSeed = "https://matic-mumbai.chainstacklabs.com";
const polygonMainnetSeed = "https://polygon-rpc.com/"
const binanceMainnetSeed = "https://bsc-dataseed2.binance.org/"
const infura = `https://:${process.env.INFURA_SECRET}@mainnet.infura.io/v3/${process.env.INFURA_ID}`;
const binanceTestnetSeed = "https://data-seed-prebsc-2-s3.binance.org:8545/";

module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */

  networks: {
  
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 7545, // Standard Ethereum port (default: none)
      network_id: 5777, // Any network (default: none)
    },
    
    polygonTestnet: {
      provider: () =>
        new HDWalletProvider({
          mnemonic: {
            phrase: mnemonic,
          },
          providerOrUrl: mumbaiTestnetSeed,
          pollingInterval: 8000,
        }),
      network_id: 80001,
      timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      deploymentPollingInterval: 8000,
      skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
    },

    binanceTestnet: {
      provider: () => new HDWalletProvider({
        mnemonic: {
          phrase: mnemonic,
        },
        providerOrUrl: binanceTestnetSeed,
        pollingInterval: 12000,
      }),
      network_id: 97,
      deploymentPollingInterval: 8000,
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 500, // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
    },

    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, infuraRinkeby),
      network_id: 4, // Rinkeby's id
      gas: 6000000,
      confirmations: 2, // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 500, // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
      deploymentPollingInterval: 8000,
    },

    //Mainnets
    ethereum: {
      provider: () => new HDWalletProvider(mnemonic, infura),
      network_id: 1,
      confirmations: 2, // # of confs to wait between deployments. (default: 0)
      production: true, // Treats this network as if it was a public net. (default: false)
    },

    polygon: {
      provider: () => new HDWalletProvider(mnemonic, polygonMainnetSeed),
      network_id: 137,
      confirmations: 2, 
      production: true, 
      gasPrice: 32000000000
    },

    bsc: {
      provider: () => new HDWalletProvider(mnemonic, binanceMainnetSeed),
      network_id: 56, 
      confirmations: 2, 
      production: true, 
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.2", // Fetch exact version from solc-bin (default: truffle's version)
      //docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {
        // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: false,
          runs: 200,
        },
        evmVersion: "byzantium",
      },
    },
  },


  db: {
    enabled: false,
  },

  plugins: ["truffle-plugin-verify"],

  api_keys: {
    etherscan: process.env.ETHERSCAN_API_KEY,
    bscscan: process.env.BSCSCAN_API_KEY,
    polygonscan: process.env.POLYGONSCAN_API_KEY,
  },
};
