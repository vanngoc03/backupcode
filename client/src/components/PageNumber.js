import React, { memo } from 'react'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'


const notActive = 'w-[46px] h-[48px] flex justify-center items-center bg-white hover:bg-gray-200  rounded-md'
const Active = 'w-[46px] h-[48px] flex justify-center items-center bg-secondary3 text-white hover:opacity-90  rounded-md'

const PageNumber = ({text, currentPage, icon, setCurrentPage, type}) => {

    const navigate = useNavigate()
    const location = useLocation()

    const [paramsSearch] = useSearchParams()
    let entries = paramsSearch.entries()

    const append = (entries) => {
        let params = []
        paramsSearch.append('page', + text)
        for (let entry of entries){
            params.push(entry);
        }
        let searchParamObject = {}
        params?.forEach(i => { 
            if (Object.keys(searchParamObject)?.some(item => item === i[0] && item !== 'page')){
                searchParamObject[i[0]] = [...searchParamObject[i[0]], i[1]]
            } else {
                searchParamObject = { ...searchParamObject, [i[0]] : [i[1]] }
            }
        }) 
        return searchParamObject
    }
    


    const handleChangePage = () => {
        if (!(text === '...')){
            setCurrentPage(+text)
        
            navigate({
                pathname: location?.pathname,
                search: createSearchParams(append(entries)).toString()
            })
        }
    }

  return (
    <div 
        className={+text === +currentPage ? `${Active} ${text === '...' ? 'cursor-text' : 'cursor-pointer'}` : `${notActive} ${text === '...' ? 'cursor-text' : 'cursor-pointer'}`}
        onClick={handleChangePage}
    >
        {icon || text}
    </div>
  )
}

export default memo(PageNumber)