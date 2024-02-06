import React, { useEffect, useState } from "react"

import Input from "../../reusableUi/Input"
import ButtonPrimary from "@/components/reusableUi/ButtonPrimary"


function Index({ setAddEmployee, addEmployee, userData, setUserData }) {
    // customer info tickets
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("")
    const [type, setType] = useState("")
    const [memberId, setMemberId] = useState(-1)
    const [loader, setLoader] = useState(false)
    // const [createUser] = useCreateUserMutation()

    // error states
    const [Message, setMessage] = useState("")

    // Update User Mutation
    // const [updateUser] = useUpdateUserMutation()

    // checking live data in inputs whether its filled or not
    const validateForm = () => {
        if (
            firstName === "" ||
            lastName === "" ||
            email === "" ||
            password === "" ||
            role === ""||
            type === "" 
        ) {
            return true
        } else return false
    }

    useEffect(() => {
        validateForm()
    }, [firstName, lastName, email, password,type, role])

    const submitHandler = async (e) => {
        setLoader(true)
        e.preventDefault()
        const data = {
            firstName: firstName,
            lastName: lastName,
            userEmail: email,
            password: password,
            role: role,
            type:type
        }
        const res = await createUser(data)

        if (res && res?.error) {
            setMessage(res?.error?.data?.message)
            setLoader(false)
            setTimeout(() => {
                setMessage("")
            }, [1000])
        } else {
            setMessage("Member Created Successfully!")
            setFirstName("")
            setLastName("")
            setEmail("")
            setPassword("")
            setRole("")
            setType("")
            setMemberId(-1)
            setLoader(false)
            setTimeout(() => {
                setUserData("")
                setMessage("")
                setAddEmployee(false)
            }, [1000])
        }
    }

    const updateHandler = async (e) => {
        setLoader(true)
        e.preventDefault()
        const updateUserBody = {
            firstName: firstName,
            lastName: lastName,
            userEmail: email,
            password: password,
            type:type,
            role: role
        }
        const res = await updateUser({ updateUserBody, userId: memberId })

        if (res && res?.error) {
            setMessage(res?.error?.data?.message)
            setLoader(false)
            setTimeout(() => {
                setMessage("")
            }, [1000])
        } else {
            setMessage("Member Updated Successfully!")
            setFirstName("")
            setLastName("")
            setEmail("")
            setPassword("")
            setType("")
            setRole("")
            setMemberId(-1)
            setLoader(false)
            setTimeout(() => {
                setUserData("")
                setMessage("")
                setAddEmployee(false)
            }, [1000])
        }
    }

    useEffect(() => {
        if (userData) {
            setFirstName(userData?.firstName)
            setLastName(userData?.lastName)
            setEmail(userData?.userEmail)
            setRole(userData?.role)
            setType(userData?.type)
            setMemberId(userData?.id)
            setPassword("OnlyToPassValidation")
        } else {
            setUserData("")
        }
    }, [userData])

    useEffect(() => {
        if (addEmployee == false) {
            setTimeout(() => {
                setFirstName("")
                setLastName("")
                setEmail("")
                setPassword("")
                setRole("")
                setType("")
                setUserData("")
                setMessage("")
            }, 400)
        }
    }, [addEmployee])

    return (
        <>
            <main className="bg-summary-cards flex xl:flex-nowrap flex-col flex-wrap pt-0 pb-7 gap-8">
                <div className="flex items-center justify-end">
                    <button
                        onClick={() => {
                            setFirstName("")
                            setLastName("")
                            setEmail("")
                            setPassword("")
                            setRole("")
                            setType("")
                            setMemberId(-1)
                            setLoader(false)
                            setUserData("")
                            setMessage("")
                            setAddEmployee(false)
                        }}
                        className=""
                    >
                        <svg
                            className="mt-1 "
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M6.64645 16.6464C6.45118 16.8417 6.45118 17.1583 6.64645 17.3536C6.84171 17.5488 7.15829 17.5488 7.35355 17.3536L6.64645 16.6464ZM12.3536 12.3536C12.5488 12.1583 12.5488 11.8417 12.3536 11.6464C12.1583 11.4512 11.8417 11.4512 11.6464 11.6464L12.3536 12.3536ZM11.6464 11.6464C11.4512 11.8417 11.4512 12.1583 11.6464 12.3536C11.8417 12.5488 12.1583 12.5488 12.3536 12.3536L11.6464 11.6464ZM17.3536 7.35355C17.5488 7.15829 17.5488 6.84171 17.3536 6.64645C17.1583 6.45118 16.8417 6.45118 16.6464 6.64645L17.3536 7.35355ZM12.3536 11.6464C12.1583 11.4512 11.8417 11.4512 11.6464 11.6464C11.4512 11.8417 11.4512 12.1583 11.6464 12.3536L12.3536 11.6464ZM16.6464 17.3536C16.8417 17.5488 17.1583 17.5488 17.3536 17.3536C17.5488 17.1583 17.5488 16.8417 17.3536 16.6464L16.6464 17.3536ZM11.6464 12.3536C11.8417 12.5488 12.1583 12.5488 12.3536 12.3536C12.5488 12.1583 12.5488 11.8417 12.3536 11.6464L11.6464 12.3536ZM7.35355 6.64645C7.15829 6.45118 6.84171 6.45118 6.64645 6.64645C6.45118 6.84171 6.45118 7.15829 6.64645 7.35355L7.35355 6.64645ZM7.35355 17.3536L12.3536 12.3536L11.6464 11.6464L6.64645 16.6464L7.35355 17.3536ZM12.3536 12.3536L17.3536 7.35355L16.6464 6.64645L11.6464 11.6464L12.3536 12.3536ZM11.6464 12.3536L16.6464 17.3536L17.3536 16.6464L12.3536 11.6464L11.6464 12.3536ZM12.3536 11.6464L7.35355 6.64645L6.64645 7.35355L11.6464 12.3536L12.3536 11.6464Z"
                                fill="#475569"
                            />
                        </svg>
                    </button>
                </div>

                <form
                    onSubmit={(e) => {
                        !userData ? submitHandler(e) : updateHandler(e)
                    }}
                >
                    <div className="rounded-md w-full">
                        <div className="w-full pb-4 flex flex-col gap-2 border-b border-navborder">
                            <p className="text-xl font-extrabold leading-[20px]">
                                {!userData ? "Add User" : "Update User"}
                            </p>
                        </div>

                        <div className="mt-5">
                            <Input
                                label="First Name"
                                changeHandler={(e) =>
                                    setFirstName(e.target.value)
                                }
                                value={firstName}
                                placeholder="John"
                                maxLength={40}
                                required={true}
                                type={"text"}
                                autoComplete={"off"}
                                inputHeight={"h-[42px]"}
                            />
                        </div>
                        <div className="mt-5">
                            <Input
                                label="Last Name"
                                changeHandler={(e) =>
                                    setLastName(e.target.value)
                                }
                                value={lastName}
                                placeholder="Doe"
                                maxLength={40}
                                required={true}
                                type={"text"}
                                autoComplete={"off"}
                                inputHeight={"h-[42px]"}
                            />
                        </div>
                        <div className="mt-5">
                            <Input
                                label="Email"
                                changeHandler={(e) => setEmail(e.target.value)}
                                value={email}
                                placeholder="johndoe@gmail.com"
                                maxLength={40}
                                required={true}
                                type={"email"}
                                autoComplete={"off"}
                                inputHeight={"h-[42px]"}
                            />
                        </div>
                       
                    
                            <div className="mt-5">
                                <Input
                                    changeHandler={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    value={password}
                                    label="Password"
                                    placeholder="Enter your password"
                                    maxLength={40}
                                    required={true}
                                    type={"password"}
                                    autoComplete={"off"}
                                    inputHeight={"h-[42px]"}
                                />
                            </div>
                        
                        
                        <div className="mt-5">
                            <label className="text-xs font-semibold leading-[150%] text-card-heading">
                                User Type
                            </label>
                            <select
                                onChange={(e) => {
                                    setType(e.target.value)
                                }}
                                value={type}
                                className="mt-2 outline-none border border-navborder rounded-md placeholder-zinc-400  text-card-subheading w-full text-xs leading-[150%] font-medium px-[14px] icon-change h-[42px]"
                            >
                                <option defaultValue>Select role</option>
                                <option value="User">Demo User</option>
                                <option value="Supplier">Paid Client</option>
                                
                            </select>
                        </div>
                        <div className="mt-5">
                            <label className="text-xs font-semibold leading-[150%] text-card-heading">
                                Role
                            </label>
                            <select
                                onChange={(e) => {
                                    setRole(e.target.value)
                                }}
                                value={role}
                                className="mt-2 outline-none border border-navborder rounded-md placeholder-zinc-400  text-card-subheading w-full text-xs leading-[150%] font-medium px-[14px] icon-change h-[42px]"
                            >
                                <option defaultValue>Select role</option>
                                <option value="User">User</option>
                                <option value="Supplier">Supplier</option>
                                <option value="Manager">Manager</option>
                                <option value="Reporter">Reporter</option>
                            </select>
                        </div>
                    </div>

                    {/* Divider */}

                    {/* Divider */}
                    <div className="border-b-[1px] border-navborder my-6" />

                    {/* Message */}
                    <p className="text-zinc-900 text-sm font-semibold text-700">
                        {Message && Message}
                    </p>

                    {/* Add/Update and Cancel Buttons */}

                    {/* Message */}
                    <p className="text-zinc-900 text-sm font-semibold text-700">
                        {Message && Message}
                    </p>

                    {/* Add/Update and Cancel Buttons */}
                    <div className="flex flex-col gap-2">
                        <ButtonPrimary
                            disabled={validateForm()}
                            type={"submit"}
                            className={`${validateForm()
                                    ? "bg-zinc-500"
                                    : "bg-zinc-900 hover:bg-zinc-700"
                                } px-5 py-3 mt-6 rounded-md text-zinc-50  transform duration-300  ease-in-out text-sm leading-[150%] font-medium`}

                                label={`
                            ${
                                    !userData ? (
                                    "Add User"
                                ) : (
                                    "Update User"
                                )}
                            `}
                        />


                        <div
                            onClick={() => {
                                setLoader(false)
                                setAddEmployee(false)
                                // setTimeout(() => {
                                //     setMemberId(-1)
                                //     setFirstName("")
                                //     setLastName("")
                                //     setEmail("")
                                //     setPassword("")
                                //     setRole("")
                                //     setUserData("")
                                //     setMessage("")
                                // }, 400)
                            }}
                            className="py-3 border text-center cursor-pointer border-navborder text-card-heading hover:border-1 hover:border-rose-600 hover:text-rose-600 rounded-[6px] font-medium text-sm leading-[150%]"
                        >
                            Cancel
                        </div>
                    </div>
                </form>
            </main>
        </>
    )
}

export default Index
