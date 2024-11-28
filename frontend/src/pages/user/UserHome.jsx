import React from 'react'
import pic1 from '../../assets/image/pic1.png'
import pic2 from '../../assets/image/pic2.png'
import pic3 from '../../assets/image/pic3.png'

const UserHome = () => {
  return (
    <>
        <div className="p-4 ">
            <nav className="flex mb-4" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3 rtl:space-x-reverse">
                    <li className="inline-flex items-center">
                    <a href="#" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-gray-900">
                        <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                        </svg>
                        Home
                    </a>
                    </li>
                </ol>
            </nav>

            <div className='px-20 grid-cols-1'>
                <div className='p-4 border bg-white rounded-t-lg shadow '>
                    <div>
                        <img src={pic1} alt='pic1' className='w-full rounded-lg'/>
                    </div>
                </div>
                <div className='p-4 border bg-white shadow '>
                    <div>
                        <img src={pic2} alt='pic1' className='w-full rounded-lg'/>
                    </div>
                </div>
                <div className='p-4 border bg-white shadow '>
                    <div>
                        <img src={pic3} alt='pic1' className='w-full rounded-lg'/>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default UserHome