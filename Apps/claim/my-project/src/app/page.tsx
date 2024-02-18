"use client"

import Image from "next/image";
import { useEthereum, useConnect, useAuthCore } from '@particle-network/auth-core-modal';
import { Avalanche, AvalancheTestnet, Ethereum } from '@particle-network/chains';
import { AAWrapProvider, SendTransactionMode, SmartAccount } from '@particle-network/aa';
import { ethers, Contract } from 'ethers';
import { useState, useEffect } from "react";
import ABI from '../abi/clone.json'
import Nvabr from "@/components/Nvabr";
import CreateHandle from "@/components/CreateHandle";
export default function Home() {
  const { provider } = useEthereum();
  const { connect, disconnect } = useConnect();
  const { userInfo } = useAuthCore();


   
  const smartAccount = new SmartAccount(provider, {
    projectId: "5d8ff4b5-9f56-42b9-94a9-3e571dd76971",
    clientKey: "coEAg8IqDkfoJRvQEs7E77VQo2TMEoXaCmwAYBGw",
    appId: "2425631a-545c-46b6-8e9f-d57303ce9d68",
    aaOptions: {
      simple: [{ chainId:  AvalancheTestnet.id, version: '1.0.0',  }]
    }
  });


  const customProvider = new ethers.providers.Web3Provider(new AAWrapProvider(smartAccount, SendTransactionMode.Gasless), "any");
  const [balance, setBalance] = useState(null);
  const [userAddress, setuserAddress] = useState()
  const signer = customProvider.getSigner();
  const address = "0x6F8dA3FD32d91D2420751c07F020CAF64d63bFEA";
 const  contract = new Contract(address, ABI, signer)

 const  fetchAddress = async () => {
  const address = await smartAccount.getAddress();
  setuserAddress(address)
}
 const createHandle = async () => {
  if (!contract) {
    alert("Please connect a wallet");
    return;
  }

  try {

    const fakeLinkModuleInitData = "0x7374617274696e675f6279746533320000000000000000000000000000000000"; // Adjust as needed
    const createCharacterData = {
      to: "0xe19b8ED6b0188D5F3cc08A12969e7Df1a798aF64", // Recipient address
      handle: "Yusra",
      uri: "http://example.com",
      linkModule: "0x0000000000000000000000000000000000000000", // Use zero address for now
      linkModuleInitData: fakeLinkModuleInitData, // Empty since linkModule is zero address
      characterId: 1235,
      validateHandle: true, // Enable validation
    };

    const transaction = await contract?.createCharacter(createCharacterData);
    await transaction.wait();

    console.log("Character created successfully!");
    console.log("Character created  here is the tx id", transaction);
  } catch (error) {
    console.error("Error creating character:", error);
    //setError(error?.message); // Display error message to the user
  } finally {
    //setLoading(false);
  }
};

useEffect(() => {
  if (userInfo) {
    fetchBalance();
    fetchAddress()
  }
}, [userInfo, smartAccount, customProvider]);

const fetchBalance = async () => {
  const address = await smartAccount.getAddress();
  const balanceResponse = await customProvider.getBalance(address);
  setBalance(ethers.utils.formatEther(balanceResponse));
};

const handleLogin = async (authType) => {
  if (!userInfo) {
    await connect({
      socialType: authType,
      chain: AvalancheTestnet,
    });
  }
};

  return (
    <main className="p-4 bg-gray-800 text-gray-300">
      <Nvabr   />
   <CreateHandle smartAccount={smartAccount} userAddress={userAddress} />
    
    </main>
  );
}
