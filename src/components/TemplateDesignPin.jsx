import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FadeInOutOpacity, scaleInOut } from '../animations'
import { BiFolderPlus, BiHeart, BiSolidFolderPlus, BiSolidHeart } from 'react-icons/bi'
import useUser from '../hooks/userUser'
import { saveToCollections, saveToFavorites } from '../api'
import useTemplates from '../hooks/useTemplates'
import { useNavigate } from 'react-router-dom'

const TemplateDesignPin = ({data,index}) => {
    
    const {data:user,refetch:userRefetch}=useUser()
    
    const {refetch:temp_refetch}=useTemplates()

    const [isHovered,setIsHovered]=useState(false)

    const navigate=useNavigate()

    const addToCollection=async(e)=>{
        e.stopPropagation();
        await saveToCollections(user,data);
        userRefetch()

    }
    const addToFavourites=async(e)=>{
        e.stopPropagation();
        await saveToFavorites(user,data);
        temp_refetch()
    }

    const handelRouteNavigation=()=>{
        navigate(`/resumeDetail/${data?._id}`,{replace:true})

    }
   
  return (
    <div>
        <motion.div
        key={data?._id}
        {...scaleInOut(index)}
        >
            <div className='w-full h-[500px] 2xl:h-[400px] rounded-md bg-gray-200 overflow-hidden relative' 
            onMouseEnter={()=>setIsHovered(true)}
            onMouseLeave={()=>setIsHovered(false)}
            >
                <img src={data?.imageURL}
                className='w-full h-full object-cover'
                alt="" />

                <AnimatePresence>
                 {isHovered && (
                       <motion.div
                       {...FadeInOutOpacity}
                       onClick={handelRouteNavigation}
                       className='absolute inset-0 bg-[rgba(0,0,0,0.4)] flex flex-col items-center justify-start px-4 py-3 z-50 cursor-pointer'
                       >
                           <div className='flex flex-col items-end justify-start w-full gap-8 right'>
                            <InnerBoxCard 
                            label={user?.collections?.includes(data?._id)?"Added to Collection":"Add to Collections"} 
                            Icon={user?.collections?.includes(data?._id)?BiSolidFolderPlus:BiFolderPlus} 
                            onHandle={addToCollection} />
   
                            <InnerBoxCard label={data?.favourites?.includes( user?.uid)?"Added to Favourites":"Add to Favourites"} Icon={data?.favourites?.includes( user?.uid)?BiSolidHeart:BiHeart} onHandle={addToFavourites}/>
   
   
                           </div>
                       </motion.div>
                 )}
                </AnimatePresence>

            </div>
        </motion.div>
    </div>
  )
}

const InnerBoxCard=({label,Icon,onHandle})=>{
    const [isHovered, setIsHovered] = useState(false)
    return(

        <div onClick={onHandle} className='w-10 h-10 rounded-md bg-gray-200 flex items-center justify-center hover:shadow-md relative'
        onMouseEnter={()=>setIsHovered(true)}
        onMouseLeave={()=>setIsHovered(false)}
        >
            <Icon className='text-txtPrimary text-base '/>
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                    initial={{opacity:0,scale:0.6,x:50}}
                    animate={{opacity:1,scale:1,x:0}}
                    exit={{opacity:0,scale:0.6,x:50}}
                     className='px-3 py-2 rounded-md bg-gray-200 absolute -left-40 after:w-2 after:h-2 after:absolute after:-right-1 after:top-[14px] after:rotate-45 after:bg-gray-200 '> 
                    <p className='text-sm text-txtPrimary whitespace-nowrap '>{label}</p>
                </motion.div>
                )
                }
            </AnimatePresence>

        </div>
    )

}

export default TemplateDesignPin