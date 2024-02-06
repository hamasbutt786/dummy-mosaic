import ButtonPrimary from "@/components/reusableUi/ButtonPrimary";
import { useCreatedTokenValidationMutation } from "@/redux-setup/api/token-validation";
import { decode } from "base-64";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import VerificationInput from "react-verification-input";

// import ReactCodeInput from "react-verification-code-input"

const ConfirmationCode = ({ handleCodeConfirmation }) => {
  const { push, asPath } = useRouter();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [validateTrig, { isLoading }] = useCreatedTokenValidationMutation();
  const [tokenEmail, setTokenEmail] = useState("")
  const router = useRouter();
  function handleChange(otp) {
    setOtp(otp);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    let params = {
      token: router.query?.token,
      code: parseInt(otp)
    };
    try {
      let { data: res } = await validateTrig(params);
      if (!res || res.status !== "verified") {

        throw new Error('status not verified');
        // return;
        // localStorage.setItem("Auth",params?.token)
        // setSuccessModal(true)
      }
      localStorage.clear()
      document.cookie = `Auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      router.replace("/clientid-verification");
    } catch (error) {
      console.log(error, "error");
      setSuccessModal(true);
      setTimeout(() => {
        setSuccessModal(false);
      }, 3000);
      // setSuccessModal(false);
    }
  };
  useEffect(() => {
    if (router.query?.token != undefined && router.query?.token != null) {
      try {
        const decodedToken = decode(router.query?.token);
        const orignaltoken = jwt.decode(decodedToken)
        setTokenEmail(orignaltoken?.email)
        // You can now use the decoded token as needed.
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, [router?.query?.token])

  return (
    <>
      {/* {successModal && <UserVerifiedModal setModal={setSuccessModal} />} */}
      <form
        className={`w-full ${asPath.includes(
          "?signUp" ? "h-full max-h-65vh overflow-y-auto" : ""
        )}`}
        onSubmit={(e) => handleSubmit(e)}
      >
        <div
          className={`flex flex-col space-y-4 lg:space-y-6 w-full lg:max-w-[416px] lg:mx-auto container `}
        >
          <div className="flex flex-col gap-2">
            {/* <div
              onClick={() => {
                handleCodeConfirmation(true);
                // push('/register')
              }}
              className="flex items-center gap-1.5 cursor-pointer"
            >
              <svg
                className="svg-theme"
                width={7}
                height={10}
                viewBox="0 0 7 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.49967 0.833984L1.33301 5.00065L5.49967 9.16732"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-sm border-b-2 border-svg-theme pb-0.5 text-card-subheading !leading-none font-semibold">
                Back
              </p>
            </div> */}
            <p className="text-2xl w-full min-w-[398px] max-w-[398px] text-card-heading !leading-none font-semibold">
              Check your email for the 4 digit code
            </p>
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <p className="text-base font-normal text-card-subheading !leading-none">
              {tokenEmail != "" ? tokenEmail : "Someone@example.com"}
            </p>
            {/* <p className="text-base font-medium text-emerald-700 leading-[120%]">
              Change
            </p> */}
          </div>
          <div className="flex flex-col items-start gap-2 cursor-pointer">
            <p className="text-sm font-semibold text-card-heading !leading-none">
              Enter 4 digit code
            </p>
            <VerificationInput
              length={4}
              placeholder={"-"}
              value={otp}
              validChars="0-9"
              passwordMode={false}
              classNames={{
                character: "character"
              }}
              onChange={(e) => handleChange(e)}
            />
          </div>
          {successModal && (
            <p className="text-rose-600 text-xs font-semibold text-700">
              The Entered code is not Verified.
            </p>
          )}
          <ButtonPrimary loader={isLoading} label="Verify" />
          {/* <p className="text-base leading-[16px] text-center lg:text-left figtree-font text-card-heading">
            Didn’t receive the Email:
            <span className="text-base leading-[120%] font-medium text-card-subheading underline px-2 underline-offset-2 cursor-pointer">
              Send again
            </span>{" "}
          </p> */}
        </div>
      </form>
    </>
  );
};

export default ConfirmationCode;
