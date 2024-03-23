<p align='center'>
<img src="https://www.paxfy.xyz/_next/image?url=%2Fimg%2Flogo.png&w=256&q=75" alt="CrossSync Logo" width="60" height="60" />
</p>

<h1  align='center'>Paxfy</h1>

In a world dominated by centralized social media platforms, Paxfy emerges as a breath of fresh air, offering a decentralized video sharing experience like no other. With Paxfy, users not only consume content but become active participants in a digital ecosystem where ownership, creativity, and connection reign supreme, Paxfy is not just a platform; it's a community where fairness isn't just a promise

- **Links**
    - **Read the full documentation here**  [Paxfy Docs](https://open.gitbook.com/~space/oN0Hr2co20NYVrxEUzpZ)
   - **Website url** : [PAXFY](https://www.paxfy.xyz/)
   - **Demo video** : [Youtube](https://youtu.be/6ke3u9Z9pE4)
   - **Smart contract repo** : [SC repo](https://github.com/pax-fy/paxfy)
   - **Front-end app repo**  [Front-end repo](https://github.com/pax-fy/web_app)
 

## Development

Install foundry if you don't have one:

# install foundry
curl -L https://foundry.paradigm.xyz | bash
foundryup
Compile and run tests:
  ## create .env  file and add information you can copy the instance frm deployment config from avalanche.json file
yarn
yarn test
#run single test function using --match-test
forge test --match-test testXXX  -vvvvv
#run single test contract using --match-contract
forge test --match-contract xxxTest  -vvvvv
#run a group of tests using --match-path
forge test --match-path test/...  -vvvvv
Deploy:

forge script scripts/Deploy.s.sol:Deploy --private-key $PRIVATE_KEY --broadcast --legacy --rpc-url $RPC_URL --ffi                   
forge script scripts/Deploy.s.sol:Deploy --sig 'sync
