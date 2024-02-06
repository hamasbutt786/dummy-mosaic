import React from 'react'
import ButtonPrimary from '../reusableUi/ButtonPrimary';
import Image from 'next/image';

const Notifications = ({ setOpen }) => {

    let notifyArr = [
        {
            name: 'John Smith',
            msg: 'Your password has been successfully changed',
            date: 'April 24, 2023',
            time: '25 min ago',
            img: '/images/profile.svg'
        },
        {
            name: 'John Smith',
            msg: 'Welcome to the board',
            date: 'April 24, 2023',
            time: '55 min ago',
            img: '/images/profile.svg'
        },
        {
            name: 'John Smith',
            msg: 'Chris Hoch give you Admin role',
            date: 'April 24, 2023',
            time: '3 hour ago',
            img: '/images/profile.svg'
        },
    ]
    return (
        <>
            <div
                onClick={(event) => {
                    event.stopPropagation();
                    setOpen(false);
                }}
                className={`fixed inset-0 bg-opacity-50 bg-blur z-[10]`}
            ></div>
            <div className="m-auto fixed w-full max-w-[502px] right-24 top-14 z-20" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="bg-summary-cards border border-navborder rounded-[10px] material-shadow">
                    <div className='flex flex-col  '>
                        <div

                            className='flex p-4 justify-between items-center border-b border-navborder'>
                            <p className={`text-lg font-semibold inter-font text-card-heading leading-[18px]`}>Notifications</p>
                        </div>
                        {
                            notifyArr.map((item, i) => {
                                return <div key={i} className={`border-b max-h-[86px] border-navborder flex  gap-4 p-4  `}>
                                    <div className='flex gap-2'>
                                        <Image src={item.img}
                                            width='0'
                                            height='0'
                                            style={{ width: '100%', height: 'auto', imageRendering: "optimizeQuality" }}
                                            alt="Profile Image" />
                                        <div className='flex flex-col gap-2 max-w-[344px] min-w-[344px]'>
                                            <div className='flex flex-col gap-1'>
                                                <p className={`text-xs font-light inter-font text-card-subheading !leading-none`}>{item.name}</p>
                                                <p className={`text-sm font-medium inter-font text-card-heading leading-[130%]`}>{item.msg}</p>
                                            </div>
                                            <p className={`text-xs font-light inter-font text-card-subheading !leading-none`}>{item.date}</p>
                                        </div>
                                    </div>
                                    <p className={`text-xs font-light inter-font text-card-subheading !leading-none`}>{item.time}</p>
                                </div>
                            })
                        }
                        <p className={`text-sm font-medium underline py-4 text-center inter-font text-card-subheading !leading-none`}>Load More</p>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Notifications