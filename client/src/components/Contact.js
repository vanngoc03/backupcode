import React from 'react'
import { text } from '../ultils/dataContact'
import {Button} from '../components'

const Contact = () => {
  return (
    <div className=' bg-white rounded-md shadow-md p-4 w-3/5 flex flex-col justify-center items-center gap-6'>
      <img src={text.image} alt="loi roi thang ngu" className='w-full h-48 object-contain'/>
      <p className=''>
        {text.content}
      </p>
      <div className='flex items-center justify-around w-full'>
        {text.contacts.map((item, index) => {
          return (
            <div key={index} className='flex flex-col items-center justify-center '>
              <span className='text-orange-500 text-[18px] font-semibold'>{item.description}</span> 
              <span className='text-blue-700 text-[20px] font-semibold'>{item.phone}</span> 
              <span className='text-blue-700 text-[20px] font-semibold'>{item.zalo}</span> 
            </div>
          )
        })}
      </div>
      <Button
      text={'Gửi liên hệ.'}
      bgcolor='bg-secondary3'
      textcolor='text-white'
      px='px-6'
      />
    </div>
  )
}

export default Contact