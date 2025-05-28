import React, {useEffect, useState} from 'react'
import { PageNumber } from '../../components'
import { useSelector } from 'react-redux'
import icons from '../../ultils/icons'
import { useSearchParams } from 'react-router-dom'

const { GrFormNextLink} = icons
const Pagination = ({page}) => {
    const { count,posts } = useSelector(state => state.post)
    const [arrPage, setArrPage] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [isHidenEnd, setIsHidenEnd] = useState(false)
    const [isHidenStart, setIsHidenStart] = useState(false)
    const [searchParams] = useSearchParams()

    useEffect(() => { 
        let page = searchParams.get('page')
        page && +page !== currentPage && setCurrentPage(+page) 
        !page && setCurrentPage(1)
     },[searchParams])

    useEffect (() => {
        let maxPage = Math.ceil(count / process.env.REACT_APP_LIMIT_POST)

        let end = (currentPage + 2 ) > maxPage ? maxPage : (currentPage + 2)

        let start = (currentPage - 2 ) <= 1 ? 1 : (currentPage - 2)

        let temp = []
        for (let i = start; i <= end; i++) {
            temp.push(i)
        }
        setArrPage(temp)
        currentPage >= ( maxPage - 2) ? setIsHidenEnd(true) : setIsHidenEnd(false)
        currentPage <= 3 ? setIsHidenStart(true) : setIsHidenStart(false)

    }, [count, posts, currentPage])

  return (
    
    <div className='flex items-center justify-center gap-2 py-5'> 
        {!isHidenStart && <PageNumber setCurrentPage={setCurrentPage} text={1}/>}
        {(!isHidenStart && currentPage !== 4) && <PageNumber text={'...'}/>}
        {arrPage.length > 0 && arrPage.map(item => {
            return(
                <PageNumber
                    key={item}
                    text={item}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />
            )
        })}
        {!isHidenEnd && <PageNumber text={'...'}/>}
        {!isHidenEnd && <PageNumber icon={<GrFormNextLink/>} setCurrentPage={setCurrentPage} text={Math.floor(count / posts.length)}/>}
    </div>
  )
}

export default Pagination