 
## Stack
- Linux debian 4.9.0-3-amd64 #1 SMP Debian 4.9.30-2+deb9u5 (2017-09-19) x86_64 GNU
- node.js 8.11.1, npm 6.1.0
- truffle 4.1.12 (core: 4.1.12)
- Solidity 0.4.24 (solc-js)
- Open Zeppelin 1.11.0

## Development IDE
- Visual Studio Code 1.24.1

## Download Repository
* $ git clone https://github.com/paul-darbyshire/medici.pre.ico.git
* Switch to relevant directory
* $ npm install
* $ truffle compile

## Running Unit Tests [Total = 26]
## Method 1: Truffle: https://github.com/trufflesuite/truffle
* $ npm i -g truffle
* $ truffle develop
* truffle(develop)> test

## Method 2: Ganache-CLI: https://github.com/trufflesuite/ganache-cli
* $ npm i -g ganache-cli
* $ truffle test --network ganachecli

## Method 3: Ganache-GUI
* Follow instructions here to install: https://github.com/trufflesuite/ganache
* $ truffle test --network ganache

NOTES: 

The above Ethereum test accounts are preloaded with 100 ETH each. 
If you wish to run multiple tests and/or use higher ETH values run the following script in which each account is initialised with 1M ETH:
* $ scripts/accounts.sh
* $ truffle test --network ganachecli

Example output:

Using network 'ganachecli'.

    Contract: Medici
    Successful deployment
      ✓ should deploy successfully
      ✓ should be correct owner address
      ✓ should be correct beneficiary address
    Intialising values
      ✓ should fail with zero cap (73ms)
      ✓ should fail with zero bonus (77ms)
      ✓ should fail with zero min. ETH accepted (70ms)
    Checking balances
      ✓ should have zero contract balance
      ✓ should be able to send an amount of ETH to contract (131ms)
      ✓ should set amount of ETH raised correctly (64ms)
    Pausing contract
      ✓ should pause contract and not allow sending ETH (151ms)
      ✓ should know contract is in pause state (39ms)
      ✓ should unpause contract and allow sending ETH (180ms)
      ✓ should know contract is in normal state
    Checking minimum ETH purchase
      ✓ should not accept payments below minumum ETH amount (90ms)
    Checking cap reached
      ✓ should not accept payments if cap reached (155ms)
    Checking has closed
      ✓ should not have closed yet
    Contract ownership
      ✓ should have an owner (56ms)
      ✓ changes owner after transfer (144ms)
      ✓ changes owner back to original (138ms)
      ✓ should prevent non-owners from transfering (59ms)
      ✓ should guard ownership against stuck state (69ms)
      ✓ should prevent non-owners from renouncement (62ms)
      ✓ loses owner after renouncement (144ms)
    Checking set methods
      ✓ should not reset cap if same value as before (74ms)
      ✓ should not reset bonus if same value as before (51ms)
      ✓ should not reset minimum ETH amount if same value as before

  26 passing (3s)

  ## Ropsten Testnet: 
  * The smart contract is currently deployed on the Ropsten Testnet but yet to be Verified & Published.
  * Contract address: '0xc56b1022a6e9d645c3a3e6a0169bac761c93a0f1'
  * Available to view at: https://ropsten.etherscan.io/address/0xc56b1022a6e9d645c3a3e6a0169bac761c93a0f1

  ## Semantics and style
  ## solium
  * $ sudo npm install -g solium
  * $ solium --init
  * $ solium -f contracts/Migrations.sol --fix

  Console output:

  No issues found.

  * $ solium -f contracts/Medici.sol --fix

  No issues found.

  ## Run Test Platform

  ## Local

  * Right click public/index.html
  * Open Containing Folder
  * Right click index.html
  * Open with Google Chrome

  ## Remote

* Heroku is a platform as a service (PaaS) that enables developers to build, run, and operate applications entirely in the cloud. The Test Platform has been deployed at: https://agile-lowlands-23166.herokuapp.com.

-------------------------
  FURTHER NOTES:

  1. The Test Platform is only designed to be run on a desktop PC and not setup to be reposnsive on other media e.g., smartphone, tablet, etc.
  2. The Test Platform allows you to set and read various parameters within the smart contract as well as send ETH to the contract address.
  3. To send ETH to the contract address you must have an Ethereum browser client e.g. Metamask for Chrome or Firefox:
  https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en
  4. Although the website is not designed to be repsonsive to smartphone display, it is possible to send ETH to the contract address using a mobile Ethereum client e.g. Metamask mobile.
  5. Click CTRL + I to open the Console window and see the Ethereum Ropsten network being polled for the latest transactions to the contract address.

  The majority of files relating to the Test Platform are found in the 'public/js' directory. Please note that some folders e.g., routes and test files e.g., users.js were only for testing purposes to check the connection to the Heroku cloud platform. Our partner web developers will be responsible for taking these developments   further as well as implementing database backup and transferring the website to Amazon or our preferred cloud host for the Pre-ICO. 

  Sometimes it can take several minutes to process a transaction and it is usually necessary to input a gas limit for the transaction to complete successfully.

  
