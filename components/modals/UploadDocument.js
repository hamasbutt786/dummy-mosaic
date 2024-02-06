import React from 'react'
import ButtonPrimary from '../reusableUi/ButtonPrimary';

const UploadDocument = () => {
    return (
        <>
            <div
                onClick={(event) => {
                    event.stopPropagation();
                    // setOpen(false);
                }}
                className={`fixed inset-0 bg-black bg-opacity-50 bg-blur z-[10]`}
            ></div>
            <div className="m-auto fixed w-full max-w-[502px] h-full max-h-[458px] inset-0 z-20" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="bg-white p-6 rounded-[10px] material-shadow">
                    <div className='flex flex-col gap-8'>
                        <div className='flex justify-between items-center'>
                            <p className={`text-lg font-semibold inter-font text-slate-800 leading-[18px]`}>Upload  Document</p>
                            <svg
                                // onClick={() => setOpen(false)}
                                className='cursor-pointer ' width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.25 17.25L6.75 6.75" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M17.25 6.75L6.75 17.25" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>

                        <div className='flex flex-col gap-6'>
                            <div className='relative flex flex-col items-center justify-center gap-4 bg-slate-50 py-6 rounded-[10px]'>
                                <svg width={40} height={40} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M17.5 6.25C11.9772 6.25 7.5 10.7272 7.5 16.25C7.5 16.5281 7.51138 16.8037 7.53373 17.0765C4.56045 18.4734 2.5 21.4947 2.5 25C2.5 29.8325 6.41751 33.75 11.25 33.75H30C34.1421 33.75 37.5 30.3921 37.5 26.25C37.5 23.4421 35.9574 20.9969 33.6763 19.7116C33.7249 19.3977 33.75 19.0765 33.75 18.75C33.75 15.2982 30.9518 12.5 27.5 12.5C27.2598 12.5 27.0225 12.5136 26.7888 12.5401C25.3155 8.8547 21.7133 6.25 17.5 6.25ZM20.8839 15.3661C20.3957 14.878 19.6043 14.878 19.1161 15.3661L14.1161 20.3661C13.628 20.8543 13.628 21.6457 14.1161 22.1339C14.6043 22.622 15.3957 22.622 15.8839 22.1339L18.75 19.2678L18.75 27.5C18.75 28.1904 19.3096 28.75 20 28.75C20.6904 28.75 21.25 28.1904 21.25 27.5V19.2678L24.1161 22.1339C24.6043 22.622 25.3957 22.622 25.8839 22.1339C26.372 21.6457 26.372 20.8543 25.8839 20.3661L20.8839 15.3661Z" fill="#059669" />
                                </svg>
                                <p className={`text-base font-semibold inter-font text-slate-800 !leading-none`}>Drag & drop files or <span className='text-emerald-600 border-b border-emerald-600'>Browse</span></p>
                                <p className={`text-xs font-semibold inter-font text-slate-500 !leading-none`}>Upload PDF size should be below 5MB</p>
                                <input type='file' className='absolute h-full w-full opacity-0 z-10 cursor-pointer' />
                            </div>
                            {
                                true && <div className='p-4 bg-slate-100 flex-col flex gap-4'>
                                    <div className='flex gap-3'>
                                        <svg width={24} height={30} viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M2.96875 0.125H7.75C10.684 0.125 13.0625 2.50349 13.0625 5.4375V8.09375C13.0625 9.56076 14.2517 10.75 15.7188 10.75H18.375C21.309 10.75 23.6875 13.1285 23.6875 16.0625V27.2188C23.6875 28.6858 22.4983 29.875 21.0312 29.875H2.96875C1.50174 29.875 0.3125 28.6858 0.3125 27.2188V2.78125C0.3125 1.31424 1.50174 0.125 2.96875 0.125ZM12.7513 14.2487C12.552 14.0494 12.2818 13.9375 12 13.9375C11.7182 13.9375 11.448 14.0494 11.2487 14.2487L6.9987 18.4987C6.58377 18.9136 6.58377 19.5864 6.9987 20.0013C7.41363 20.4162 8.08637 20.4162 8.5013 20.0013L10.9375 17.5651L10.9375 23.5C10.9375 24.0868 11.4132 24.5625 12 24.5625C12.5868 24.5625 13.0625 24.0868 13.0625 23.5L13.0625 17.5651L15.4987 20.0013C15.9136 20.4162 16.5864 20.4162 17.0013 20.0013C17.4162 19.5864 17.4162 18.9136 17.0013 18.4987L12.7513 14.2487Z" fill="#059669" />
                                            <path d="M15.1875 5.4375C15.1875 3.57734 14.5046 1.87668 13.3759 0.572532C18.191 1.83035 21.9822 5.62149 23.24 10.4366C21.9358 9.30789 20.2352 8.625 18.375 8.625H15.7188C15.4253 8.625 15.1875 8.38715 15.1875 8.09375V5.4375Z" fill="#059669" />
                                        </svg>
                                        <div className='flex justify-between w-full items-center gap-2'>
                                            <div className='space-y-[10px] w-full'>
                                                <div className='flex justify-between items-center w-full'>
                                                    <p className={`text-sm font-medium inter-font text-slate-800 !leading-none`}>Customers_Q4_2023.PDF</p>
                                                    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M11.5 11.5L4.5 4.5" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M11.5 4.5L4.5 11.5" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </div>
                                                <div className='flex justify-between items-center w-full'>
                                                    <p className={`text-xs  inter-font text-slate-600 !leading-none`}>320KB ∙ 2seconds left</p>
                                                    <p className={`text-xs font-semibold inter-font text-slate-600 !leading-none`}>24%</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {false && <div className={`w-full  rounded-2xl h-1.5  bg-slate-300`} >
                                        <div className={` h-1.5 rounded-full`} style={{ width: `30%`, backgroundColor: '#1E293B' }}></div>
                                    </div>}
                                </div>
                            }
                            <div className='flex items-center gap-4 w-full px-6'>
                                <svg width={201} height={1} viewBox="0 0 201 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <line y1="0.5" x2={201} y2="0.5" stroke="#E2E8F0" />
                                </svg>

                                <div className='text-sm !leading-none font-medium inter-font text-slate-300'>
                                    OR
                                </div>
                                <svg width={201} height={1} viewBox="0 0 201 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <line y1="0.5" x2={201} y2="0.5" stroke="#E2E8F0" />
                                </svg>

                            </div>
                            <div className='flex flex-col items-start gap-[10px] w-full'>
                                <p className={`text-sm font-semibold inter-font text-slate-800 leading-[16px]`}>Import From URL</p>
                                <input className='rounded-lg outline-none border placeholder:text-slate-600 border-slate-300 w-full h-[48px] p-4' placeholder='Add File URL' />
                            </div>
                        </div>
                        <div className='flex justify-end gap-4'>
                            <div className='max-w-[94px] min-w-[94px]'>
                                <ButtonPrimary handleClick={() => {
                                    // setOpen(false)
                                }} label={'Cancel'} btnSecondary={true} padding={'py-3'} textSize={'text-sm'} />
                            </div>
                            <div className='max-w-[94px] min-w-[94px]'>
                                <ButtonPrimary label={'Import'} padding={'py-3'} textSize={'text-sm'} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default UploadDocument