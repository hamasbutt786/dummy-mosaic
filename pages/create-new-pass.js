import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import ConfirmationCode from '@/components/register/cofirmation-code'
import { useState } from 'react'
import Register from '@/components/register'
import CreatePassword from '@/components/register/create-new-pass/CreatePassword'

const CreateNewPass = () => {
    const [codeStatus, setCodeStatus] = useState(true)

    function handleCodeConfirmation(val) {
        setCodeStatus(val)
    }

    return (
        <>
            <Head>
                <title>Mosaica | Register</title>
            </Head>
            <div className="flex-col lg:flex-row lg:flex overflow-hidden bg-white">
                <div className="w-full lg:w-1/2  lg:h-screen px-12 py-10   hero-pattern bg-no-repeat bg-auto  ">
                    <Link
                        href={"/"}
                        className="flex w-full lg:items-start items-center lg:justify-start justify-center"
                    >
                        <Image
                            src="/images/mosaic01_logo.png"
                            width={222}
                            height={52}
                            alt="Mosaic Logo"
                            className="py-1.5 px-2"
                        />
                    </Link>

                </div>

                {/* // NOTE API CALL FOR REGISTER SHOULD BE IMPLEMENTED HERE */}

                <div className="w-full lg:w-1/2 py-41 flex items-center">
                    <CreatePassword />
                </div>
            </div>
        </>
    )
}

export default CreateNewPass