import ButtonPrimary from '@/components/reusableUi/ButtonPrimary'
import { useCreateVerifyClientIdMutation } from '@/redux-setup/api/data'
import { getTitle } from '@/utils/functions'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const ClientIdVerification = () => {
    const [triggerClient, { isLoading }] = useCreateVerifyClientIdMutation()
    const [status, setStatus] = useState(null)
    const router = useRouter()
    async function handleSubmit(e) {
        e.preventDefault()
        const { clientID } = e.target
        try {
            const res = await triggerClient({ clientID: clientID.value })
            if (res.data.response) {
                throw new Error(`Invalid client ID`)
            }
            if (res?.data?.status === 'verified') {
                localStorage.setItem('business_entity_id', res?.data?.business_entity_id)
                signOut({ callbackUrl: "/login" });
                setStatus({ msg: 'Client ID Verified', color: '#059669' })
            }
            e.target.reset()
        } catch (error) {
            console.error(error)
            setStatus({ msg: error.message, color: '#dc2626' })
        }
    }
    useEffect(() => {
        setTimeout(() => {
            setStatus({})
        }, 3000);
    }, [status?.msg])
    return (
        <>
            {getTitle("Clientid Verification | Mosaica -  Business Intelligence for Corporate Responsibility")}

            <div className="flex-col lg:flex-row lg:flex overflow-hidden bg-summary-cards h-screen">
                <div className="w-full lg:w-1/2  lg:h-screen px-12 py-10 md:hidden lg:flex   hero-pattern bg-no-repeat bg-auto  ">
                    <Link
                        href={""}
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
                <div className="w-full lg:w-1/2  lg:h-screen px-12 py-10 md:flex lg:hidden   bg-no-repeat bg-auto  ">
                    <Link
                        href={""}
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

                <div className="w-full lg:w-1/2 md:p-28 lg:py-41 flex items-center">
                    <form
                        className={`w-full `}
                        onSubmit={(e) => handleSubmit(e)}
                    >
                        <div
                            className={`flex flex-col space-y-4 lg:space-y-6 w-full lg:max-w-[416px] lg:mx-auto container `}
                        >
                            <div className="flex flex-col gap-2">
                                <p className="text-2xl w-full min-w-[398px] max-w-[398px] text-card-heading !leading-none font-semibold">
                                    Please verify your client ID
                                </p>
                            </div>
                            <div className="flex flex-col items-start gap-2 cursor-pointer">
                                <input name='clientID' placeholder='Enter Client ID' className='w-full border border-navborder bg-summary-cards rounded-xl p-4 text-sm !leading-none text-card-subheading flex outline-none' />
                                {status?.msg && (
                                    <p style={{ color: status?.color }} className={" text-xs font-semibold text-700"}>
                                        {status?.msg}
                                    </p>
                                )}
                            </div>
                            <ButtonPrimary loader={isLoading} label="Verify" type='submit' />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ClientIdVerification