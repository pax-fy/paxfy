import React, {useState, useEffect, useRef} from 'react'
import { ethers, Contract } from 'ethers';
import ABI from '../abi/clone.json'
import { AAWrapProvider, SendTransactionMode, SmartAccount } from '@particle-network/aa';
import { usePinToIpfs } from '@/hooks/usePinToIpfs';
import { json } from 'stream/consumers';
import { LuImagePlus } from "react-icons/lu";

type  Props = {
   smartAccount : any
   userAddress : any
}

export default function CreateHandle({smartAccount, userAddress} : Props) {
   const [ChannelHandle, setChannelHandle] = useState("")
   const [channelName, setchannelName] = useState()
   const [channelBio, setchannelBio] = useState()
   const [channelAvatar, setchannelAvatar] = useState()
   const [isHandleCreated, setisHandleCreated] = useState(false)
   const [isHandleFailed, setisHandleFailed] = useState(false)
   const [handleInfo, sethandleInfo] = useState()
   const [handleCheck, sethandleCheck] = useState("NOT_AVAILABLE")
   const {uploadToIpfs, isUploading, isUploadingError} = usePinToIpfs()
  const [balance, setBalance] = useState(null);
  const customProvider = new ethers.providers.Web3Provider(new AAWrapProvider(smartAccount, SendTransactionMode.Gasless), "any");
 const signer = customProvider.getSigner();
  const address = "0xdE3309F5513B2f88daf325ED8841404d74049Ea3";
 const  contract = new Contract(address, ABI, signer)

  const selctAvatarRef = useRef(null)

    console.log('the selcted image', channelAvatar)
    console.log('is handleCreated', isHandleCreated)
    console.log('the handle failed', isHandleFailed)
    console.log('the handle info', handleInfo?.handle
       )
 const createHandle = async () => {
  if (!contract) {
    alert("Please connect a wallet");
    return;
  }

  try {

      const avatarCID = await uploadToIpfs(channelAvatar)
        console.log("the avatar cid", avatarCID)
    const handleMetadata = {
      name : ChannelHandle,
      bio : channelBio,
      avatar : avatarCID?.path,
      
   }

     const ipfsCID = await uploadToIpfs(JSON.stringify(handleMetadata))
      console.log("the ipfs cid", ipfsCID)
    const fakeLinkModuleInitData = "0x7374617274696e675f6279746533320000000000000000000000000000000000"; // Adjust as needed
    const createCharacterData = {
      to: userAddress, // Recipient address
      handle:  ChannelHandle,
      uri: ipfsCID?.path || ipfsCID?.cid || "Nothing commited",
      linkModule: "0x0000000000000000000000000000000000000000", // Use zero address for now
      linkModuleInitData: fakeLinkModuleInitData, // Empty since linkModule is zero address
      characterId: 1235,
      validateHandle: true, // Enable validation
    };

    const transaction = await contract?.createCharacter(createCharacterData);
    await transaction.wait();

    console.log("Character created successfully!");
    console.log("Character created  here is the tx id", transaction);
    setisHandleCreated(true)
  } catch (error) {
    console.error("Error creating character:", error);
    setisHandleFailed(true)
    //setError(error?.message); // Display error message to the user
  } finally {
    //setLoading(false);
  }
};

  const isHandleAvailable = async () => {
    const transaction = await contract?.getCharacterByHandle(ChannelHandle);
      sethandleInfo(transaction)
       if(! transaction.handle){
        sethandleCheck("AVAILABLE")
       }else if(transaction.handle){
        sethandleCheck("NOT_AVAILABLE")
       }
      console.log("the transaction", transaction?.handle)
  }

  useEffect(() => {
 
      isHandleAvailable()
    
      
  }, [ChannelHandle])

    const  checkHandleAvailability = () => {
        if(handleCheck === "AVAILABLE"){
          return "Available"
        }else if(handleCheck === "NOT_AVAILABLE"){
          return "Not available"
        }
    }
  
  return (
    <div className="min-h-screen w-full flex-col gap-2 max-w-7xl mx-auto flex items-center justify-center">
      <h1 className='text-xl font-extrabold mb-4'>Claim your channel profile</h1>

      <div className='w-[400px] h-[570px] border border-gray-600 rounded-lg p-4 flex flex-col items-center  '>
       <div>
          <h1 className='font-semibold my-3 text-center'>Profile Avatar</h1>
           <div>
           <input
                type="file"
                accept="image/*"
                onChange={(e) => setchannelAvatar(e.target.files[0])}
                ref={selctAvatarRef}
                hidden
              />

               <div className='w-[150px] h-[150px] rounded-full border p-1 border-blue-200 flex items-center justify-center'>
                 <div className=' cursor-pointer '>
                  {
                    ! channelAvatar ? (
                      <LuImagePlus width={200} className='w-72' onClick= {() => {
                        selctAvatarRef.current.click();
                      }} />
                    ) : (
                       <img   src={URL.createObjectURL(channelAvatar)}
                       className="w-[140px] h-[140px] object-cover rounded-full"  />
                    )
                  }
                
                 </div>
               </div>
           </div>
       </div>

        <div className='my-3'>
        <h1 className=' my-3 text-sm '>Channel handle</h1>  
         <input
        type='text'
        placeholder='ex kabugu'
         onChange={(e) => setChannelHandle(e.target.value)}
         value={ChannelHandle}
         className='w-[370px] h-11 rounded-lg p-2 bg-inherit border border-gray-400 placeholder:text-sm'

  />

    {
     
    }
        </div>

        <div className='my-3'>
        <h1 className=' my-3 text-sm '>Channel bio</h1>  
         <textarea
        placeholder='This  is  my channel'
         onChange={(e) => setchannelBio(e.target.value)}
         value={channelBio}
         className='w-[370px] resize-none h-24 rounded-lg p-2 bg-inherit border border-gray-400 placeholder:text-sm'

  />
        </div>

         <button className='w-full bg-gradient-to-r from-indigo-500 via-blue-400 to-indigo-400 hover:bg-indigo-400  text-center py-3 cursor-pointer px-3 rounded-xl' disabled={handleInfo?.handle} onClick={createHandle}>
          Mint Your Profile
         </button>
      </div>
    
      </div>
  )
}
