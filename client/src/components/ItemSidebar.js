import React, { memo } from 'react'
import icons from '../ultils/icons'
import { formatVietnameseToString } from '../ultils/Common/formatVietnamesToString'
import { Link } from 'react-router-dom'
import * as actions from '../store/actions'
import { useDispatch } from 'react-redux'
import { createSearchParams, useLocation , useNavigate } from 'react-router-dom'

const {MdOutlineNavigateNext} = icons

const ItemSidebar = ({content, title, isDouble, type}) => {

  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  //console.log(location)

  const formatContent = () => {
    const oddEl = content?.filter((item, index) => index%2 !== 0 )
    const evenEl = content?.filter((item, index) => index%2 === 0 )
    const formatContent = oddEl?.map((item, index) => {
      return {
        right: item,
        left: evenEl?.find((item2, index2 ) => index2 === index)
      }
    })
    return formatContent
  }

  const handleFilterPosts = (code) => {
    navigate({
    pathname: location?.pathname,
    search: createSearchParams({
        [type]: code
    }).toString()
  }); 
  }

  return (
    <div className='p-4 rounded-md bg-white w-full shadow-md'>
        <h3 className='text-lg font-semibold mb-4 '>{title}</h3>
        {!isDouble && <div className='flex flex-col gap-2'> 
          {content?.length > 0 && content.map(item => {
            return(
              <Link 
              to={`${formatVietnameseToString(item.value)}`}
              key={item.code} 
              className=' flex gap-2 items-center cursor-pointer hover:text-orange-600 border-b border-dashed border-gray-200 pb-1'
              >
                <MdOutlineNavigateNext size={12}/>
                <p>{item.value}</p>
              </Link>
            )
          })}
        </div>}
        {isDouble && <div className='flex flex-col gap-2'> 
          {content?.length > 0 && formatContent().map((item, index ) => {
            return(
              <div key={index} className=''>
                <div className='flex items-center justify-around'> 
                  <div 
                  onClick={() => handleFilterPosts(item.left.code)}
                  className='flex flex-1 gap-2 items-center cursor-pointer hover:text-orange-600 border-b border-dashed border-gray-200 pb-1'
                  >
                    <MdOutlineNavigateNext size={12}/>
                    <p>{item.left.value}</p>
                  </div>
                  <div 
                  onClick={() => handleFilterPosts(item.right.code)}
                  className='flex flex-1 gap-2 items-center cursor-pointer hover:text-orange-600 border-b border-dashed border-gray-200 pb-1'
                  >
                    <MdOutlineNavigateNext size={12}/>
                    <p>{item.right.value}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>}
        
    </div>
  )
}

export default memo(ItemSidebar)