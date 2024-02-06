// import LoginComponent from '@/components/login/LoginComponent'
import BlackSpinner from '@/components/reusableUi/BlackSpinner'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
const LoginComponent = dynamic(() => import('../components/login/LoginComponent'), { ssr: false })

const login = () => {
    const [clientIdVerificationLoader, setClientIdVerificationLoader] = useState(false);
    return (
        <>
            <Head>
                <title>Mosaica</title>
            </Head>
            <div className="flex-col lg:flex-row lg:flex  overflow-hidden bg-summary-cards">
                <div className="w-full lg:w-1/2  lg:h-screen px-12 py-10   hero-pattern bg-no-repeat bg-auto  ">
                    <Link
                        href={"/"}
                        className="flex w-full lg:items-start items-center lg:justify-start justify-center"
                    >
                        <Image
                            src="/logo/mosaica_fulltext_green.png"
                            width={222}
                            height={52}
                            alt="Mosaic Logo"
                            className="py-1.5 px-2"
                        />
                    </Link>

                </div>
                <div className="w-full lg:w-1/2 py-41 flex items-center">
                    <LoginComponent setClientIdVerificationLoader={setClientIdVerificationLoader} />
                </div>
            </div>
            <div
                style={{
                    display: !clientIdVerificationLoader ? 'none' : ''
                }}
                className="fixed inset-0 h-full w-full  bg-black/20">
                <div className='  h-full w-full flex flex-col justify-center items-center'>
                    <BlackSpinner height={90} width={90} />
                </div>
            </div>
        </>
    )
}

export default login