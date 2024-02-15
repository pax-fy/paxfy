import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "hardhat-contract-sizer";
import * as dotenv from "dotenv";

dotenv.config();

module.exports = {
    solidity: {
        version: "0.8.18",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },
    docgen: {
        output: "docs",
        pages: "files",
    },
    paths: {
        sources: "./contracts",
        cache: "./cache",
        artifacts: "./artifacts",
    },
    //
    networks: {
        crossbell: {
            url: "https://api.avax-test.network/ext/bc/C/rpc",
             accounts: [process.env.PRIVATE_KEY]
        },
    },

    etherscan: {
        apiKey: {
            snowtrace: "snowtrace",
        },
        customChains: [
            {
                network: "snowtrace",
                chainId: 43113,
                urls: {
                    apiURL: "https://api.routescan.io/v2/network/testnet/evm/43113/etherscan",
                    browserURL: "https://testnet.snowtrace.io"
                },
            },
        ],
    },
} as HardhatUserConfig;
