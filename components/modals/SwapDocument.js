import React from 'react'
import ButtonPrimary from '../reusableUi/ButtonPrimary';

const SwapDocument = ({ setOpen, modalObj }) => {
    return (
        <>
            <div
                onClick={(event) => {
                    event.stopPropagation();
                    setOpen(pre => ({ ...pre, 'state': false }));
                }}
                className={`fixed inset-0 bg-black bg-opacity-50 bg-blur z-[40]`}
            ></div>
            <div className="m-auto fixed w-full max-w-[502px] h-full max-h-[260px] inset-0 z-[50]" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="bg-white p-6 rounded-[10px] material-shadow">
                    <div className='flex flex-col gap-6'>
                        <div className='flex justify-between items-center'>
                            <p className={`text-lg font-semibold inter-font text-slate-800 leading-[18px]`}>Swap Document</p>
                            <svg
                                onClick={() => setOpen(pre => ({ ...pre, 'state': false }))}
                                className='cursor-pointer ' width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.25 17.25L6.75 6.75" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M17.25 6.75L6.75 17.25" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>

                        <div className='flex flex-col gap-[6px] '>
                            <p className={`text-base font-semibold inter-font text-slate-800 leading-[19px]`}>Are you sure you want to swap current document with </p>
                            <p className={`text-base font-medium inter-font text-emerald-600 !leading-none`}>Customers_Q5_2023.PDF </p>
                        </div>
                        <div className='flex justify-end gap-4'>
                            <ButtonPrimary handleClick={() => {
                                setOpen(pre => ({ ...pre, 'state': false }));
                            }} label={'Cancel'} btnSecondary={true} padding={'py-3 px-6'} textSize={'text-sm'} />
                            <ButtonPrimary label={'Confirm'} padding={'py-3 px-6'} textSize={'text-sm'} />
                        </div>
                    </div>

                </div>
            </div >
        </>
    )
}

export default SwapDocument