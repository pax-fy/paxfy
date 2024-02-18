import React, {useState, useEffect} from 'react'
import { useEthereum, useConnect, useAuthCore } from '@particle-network/auth-core-modal';
import { Avalanche, AvalancheTestnet, Ethereum } from '@particle-network/chains';
import { AAWrapProvider, SendTransactionMode, SmartAccount } from '@particle-network/aa';
import { ethers, Contract } from 'ethers';
import { truncateText } from '@/helpers';

export default function Nvabr() {
  const { provider } = useEthereum();
  const { connect, disconnect } = useConnect();
  const { userInfo } = useAuthCore();
  const [balance, setBalance] = useState(null);
  const [userAddress, setuserAddress] = useState()

  const smartAccount = new SmartAccount(provider, {
    projectId: "5d8ff4b5-9f56-42b9-94a9-3e571dd76971",
    clientKey: "coEAg8IqDkfoJRvQEs7E77VQo2TMEoXaCmwAYBGw",
    appId: "2425631a-545c-46b6-8e9f-d57303ce9d68",
    aaOptions: {
      simple: [{ chainId:  AvalancheTestnet.id, version: '1.0.0',  }]
    }
  });

    const  fetchAddress = async () => {
      const address = await smartAccount.getAddress();
      setuserAddress(address)
    }
  
  const customProvider = new ethers.providers.Web3Provider(new AAWrapProvider(smartAccount, SendTransactionMode.Gasless), "any");

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
    <div className='border-b border-gray-700 flex bg-inherit justify-between items-center py-3 h-[60px] max-w-7xl mx-auto px-2 sticky top-0  '>
        <p className='text-xl font-extrabold capitalize cursor-pointer'>paxfy</p>
         {
          userInfo ? (
            <p className='font-bold text-xl cursor-pointer'>{userAddress && truncateText(userAddress, 6)}</p>
          ) : (
            <button className='bg-black text-white py-2 px-2 cursor-pointer ' onClick={() => handleLogin('')}> connect wallet</button>

          )
         }
      
    </div>
  )
}
