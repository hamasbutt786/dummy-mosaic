import { useCreateSignUpUserMutation } from "@/redux-setup/api/auth";
import jwt from "jsonwebtoken";
import { signIn, useSession } from "next-auth/react";
import Image from 'next/image';
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ButtonPrimary from "../reusableUi/ButtonPrimary";
import InputTag from "../reusableUi/Input";
import useBusinessEntity from "@/hooks/useBusinessEntity";
import dynamic from "next/dynamic";
import { useLoginMutation } from "@/redux-setup/api/data";
const Layout = dynamic(() => import('../layout/index.js'), { ssr: false })
const LoginComponent = ({
  setClientIdVerificationLoader
}) => {
  const router = useRouter();
  const { push, asPath } = useRouter();
  const [message, setMessage] = useState(null);
  const [disableSession, setdisableSession] = useState(false);
  const [error, setError] = useState(false);
  const [loginPage, setloginPage] = useState(false);
  // const [sessionAuthTrig] = useCreateSocialLoginAuthMutation()
  const [LoginTrigger] = useLoginMutation();
  const business_entity_id = useBusinessEntity()
  const [signUpTrigger] = useCreateSignUpUserMutation();
  const [loginCreds, setLoginCreds] = useState({
    email: "",
    password: "",
  });
  const [buttonLoader, setbuttonLoader] = useState(false);
  const { data: session } = useSession();
  function handleChange(e, str) {
    if (str.includes("email")) {
      setLoginCreds((pre) => ({ ...pre, email: e.target.value }));
    } else {
      setLoginCreds((pre) => ({ ...pre, password: e.target.value }));
    }
  }
  // useEffect(() => {
  //   loginWithSession();
  // }, [session?.user?.email,]);

  const handleSubmitSignUp = async (e) => {
    e.preventDefault();
    setbuttonLoader(true)

    let payload = {
      email: loginCreds.email,
      business_entity_id,
    };
    try {
      if (!business_entity_id || business_entity_id == null) {
        setTimeout(() => {
          setClientIdVerificationLoader(true);
        }, 2000);
        setTimeout(() => {
          router.push("/clientid-verification");
          setClientIdVerificationLoader(false);
        }, 4000);
        throw new Error('Please verify your Client ID First. Redirecting to ClientID verification')
      }
      let resp = await signUpTrigger(payload);
      console.log({ resp })
      if (resp?.error) {
        throw new Error(resp.error.data.message);
      }
      let { data } = resp;


      if (!data?.token) return;
      const businessId = jwt.decode(data?.token);
      document.cookie = `Auth=${data?.token}`
      localStorage.setItem("Auth", data?.token);
      localStorage.setItem("business_entity_id", business_entity_id);
      // localStorage.setItem("environment", data?.environment);
      router.push("/welcome");
      // window.location.replace("/welcome");

    } catch (error) {
      console.log(error, "error is");
      setMessage(`${error.message}`);
      setTimeout(() => {
        setMessage(null);
        // setLoader(false);
      }, 3000);
    } finally {
      setbuttonLoader(false)
    }
  };
  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    setbuttonLoader(true)
    let payload = {
      email: loginCreds.email,
    };
    try {
      let resp = await LoginTrigger(payload);
      if (resp?.error) {
        throw new Error(resp.error.data.message);
      }
      let { data } = resp;
      if (!data?.token) return;
      document.cookie = `Auth=${data?.token}`
      localStorage.setItem("Auth", data?.token);
      localStorage.setItem("business_entity_id", data?.buisness_entity_id);
      // localStorage.setItem("environment", data?.environment);
      router.push("/welcome");
      // window.location.replace("/welcome");
    } catch (error) {
      console.log(error, "error is");
      setMessage(error.message);
      setTimeout(() => {
        setMessage(null);
        // setLoader(false);
      }, 3000);
    } finally {
      setbuttonLoader(false)
    }
  };
  useEffect(() => {
    if (typeof window === "undefined") return
    if (localStorage.getItem('Auth')) return
    if (session === undefined || session === null || !session?.user?.email) return
    loginWithSession()
  }, [session?.user?.email])

  async function loginWithSession() {
    setdisableSession(true)
    if (session === undefined || session === null || !session?.user?.email) {
      signIn('google', {
        redirect: false
      })
      return null
    }
    let payloadLogin = {
      email: session?.user?.email,
    };
    let payloadSignup = {
      email: session?.user?.email,
      business_entity_id
    };
    try {
      if (typeof business_entity_id !== 'number') {
        let resp = await LoginTrigger(payloadLogin);
        if (resp?.error) {
          setTimeout(() => {
            router.push('clientid-verification')
          }, 4000);
          throw new Error('User not registered. Please contact support. If you have a clientID, please signup first. Redirecting to clientID verification');
        }
        let { data } = resp;
        responseConfirm(data)
      } else {
        let resp = await signUpTrigger(payloadSignup);
        let { data } = resp;
        responseConfirm(data)
        // localStorage.setItem("environment", data?.environment);
        if (resp?.error) {
          // setTimeout(() => {
          //   router.push('clientid-verification')
          // }, 4000);
          throw new Error(resp.error.data.message);
        }
      }
    } catch (error) {
      console.log(error, "error is");
      setMessage(error.message);
      setTimeout(() => {
        setMessage(null);
        // setLoader(false);
      }, 3000);
    } finally {
      setdisableSession(false)
    }
    // if (typeof localStorage.getItem("Auth") === "string") return;
    // if (!session || session === null) return;
    // let expires = session?.expires;
    // let accessToken = session?.access_token;
    // const jwt = require('jsonwebtoken');
    // let user = session?.user
    // let tokenAuth = jwt.sign(user, 'secretKey')
    // let newSession = { accessToken, expires, ...session.user };
    // localStorage.setItem("Auth", tokenAuth);
  }
  const responseConfirm = (data) => {
    if (!data?.token) return;
    // const businessId = jwt.decode(data?.token);
    localStorage.setItem("Auth", data?.token);
    document.cookie = `Auth=${data?.token}`
    localStorage.setItem("business_entity_id", business_entity_id);
    router.push("/welcome");
  }
  // async function loginWithCredentials(e) {
  //   e.preventDefault();
  //   if (!loginCreds.email.length && !loginCreds.password.length) return;
  //   let payload = {
  //     email: loginCreds.email
  //   };
  //   let { data } = await LoginTrigger(payload);
  //   // console.log(data?.token, "valvalvalval");
  //   if (!data?.token) return;
  //   localStorage.setItem("Auth", data?.token);
  //   router.push("/welcome");
  // }

  return (
    <Layout logInFlow={true}>
      <form
        className={`w-full  ${asPath.includes(
          "?signUp" ? "h-full max-h-65vh overflow-y-auto" : ""
        )}`}
        onSubmit={(e) => loginPage ? handleSubmitLogin(e) : handleSubmitSignUp(e)}
      >
        <div
          className={`flex flex-col space-y-4 lg:space-y-6 w-full lg:max-w-[416px] lg:mx-auto container `}
        >
          <p className="text-2xl text-card-heading !leading-none font-semibold">
            Welcome
          </p>

          <div className="flex flex-col justify-center items-center space-y-6">
            <div
              onClick={() => {
                loginWithSession()
              }}
              className="w-full px-4 py-4 gap-[10px] cursor-pointer border border-navborder bg-summary-cards rounded-xl text-sm leading-normal text-slate-600 flex"
            >
              <Image
                src={"/images/google.png"}
                alt={"social-media-icon"}
                width={24}
                height={24}
              />
              <div className="text-base text-card-subheading ">
                Continue with Google
              </div>
            </div>
            <div
              onClick={() => {
                signIn("azure-ad", {
                  callbackUrl: "/welcome",
                });
              }}
              className="w-full cursor-pointer px-4 py-4 gap-[10px] border border-navborder bg-summary-cards rounded-xl text-sm leading-normal text-slate-600 flex"
            >
              <Image
                src={"/images/microsoft.png"}
                alt={"social-media-icon"}
                width={24}
                height={24}
              />
              <div className="text-base text-card-subheading">
                Continue with Microsoft
              </div>
            </div>
          </div>
          {/* <div className="flex gap-6 items-center py-[9px] lg:py-15 justify-center relative">
            <hr className="w-full bg-navborder"></hr>
            <span className="text-base leading-normal text-card-subheading px-4 absolute -translate-x-1/2 left-1/2">
              OR
            </span>
            <hr className="w-full bg-navborder"></hr>
          </div> */}
          <div className="">
            {/* <Link
                            href={"/"}
                            className="flex space-x-1 items-center transition-all ease-in-out duration-300 hover:text-primary"
                        >
                            <div className="flex gap-1 items-center hover:text-primary  transition-colors duration-300 ease-in-out   cursor-pointer font-sm font-normal text-neutral-600 underline leading-normal -ml-2">
                                <svg
                                    width="21"
                                    height="21"
                                    viewBox="0 0 21 21"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M13.0007 6.33398L8.83398 10.5007L13.0007 14.6673"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <p className="-ml-1">Back</p>
                            </div>
                        </Link> */}
          </div>
          <div className="space-y-2">
            <InputTag
              required={true}
              type={"email"}
              label={"Email Address"}
              placeholder={"Ex: someone@gmail.com"}
              changeHandler={(e) => handleChange(e, "email")}
            />
          </div>
          {message !== null && (
            <p className="text-rose-600 text-xs font-semibold text-700">
              {message}
            </p>
          )}
          <div className="flex justify-between">
            <div className="flex gap-3 items-center">
              <input type="checkbox" name="" value="" />
              <p className="text-sm !leading-none ">Remember Me</p>
            </div>
          </div>

          <ButtonPrimary disabled={disableSession} loader={buttonLoader} label={loginPage ? "Login" : "Signup"} />
          <p className="text-base leading-[16px] text-center lg:text-left figtree-font text-card-subheading">
            {loginPage ? `Don't Have An Account` : `Already Have An Account`}
            {/* <Link href={"/clientid-verification"}> */}
            <span onClick={() => setloginPage(pre => !pre)}>
              <span className="text-base leading-[120%] font-medium text-primary underline px-2 underline-offset-2 cursor-pointer">

                {loginPage ? 'Signup now' : `Login now`}

              </span>{" "}
            </span>
          </p>

        </div>
      </form>

    </Layout>
  );
};

export default LoginComponent;
