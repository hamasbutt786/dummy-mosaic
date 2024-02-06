import { useRouter } from "next/router";
import React, { useState } from "react";
import ButtonPrimary from "../reusableUi/ButtonPrimary";
import InputTag from "../reusableUi/Input";
import Link from "next/link";
const Register = ({ handleCodeConfirmation }) => {
  const { push, asPath } = useRouter();
  const [passwordType, setPasswordType] = useState("password");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [regCreds, setRegCreds] = useState({
    companyName: "",
    fullName: "",
    email: "",
    password: "",
  });

  function handleChange(e, str) {
    if (str.includes("email")) {
      setRegCreds((pre) => ({ ...pre, email: e.target.value }));
    } else if (str.includes("password")) {
      setRegCreds((pre) => ({ ...pre, password: e.target.value }));
    } else if (str.includes("companyName")) {
      setRegCreds((pre) => ({ ...pre, companyName: e.target.value }));
    } else {
      setRegCreds((pre) => ({ ...pre, fullName: e.target.value }));
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    let payload = {
      email: regCreds.email,
      password: regCreds.password,
      companyName: regCreds.companyName,
      fullName: regCreds.fullName,
    };

    // router.push("/welcome");
  };

  return (
    <form
      className={`w-full ${asPath.includes(
        "?signUp" ? "h-full max-h-65vh overflow-y-auto" : ""
      )}`}
      onSubmit={(e) => handleSubmit(e)}
    >
      <div
        className={`flex flex-col space-y-4 lg:space-y-7 w-full lg:max-w-[416px] lg:mx-auto container `}
      >
        <div className="flex flex-col gap-2">
          <p className="text-2xl text-card-heading !leading-none font-semibold">
            Create a new account.
          </p>
          <p className="text-base text-card-subheading !leading-none font-normal">
            Let's start a new journey together, sign up now.
          </p>
        </div>
        <div className="space-y-2">
          <InputTag
            type={"text"}
            label={"Company Name"}
            placeholder={"Ex: Mosiac"}
            changeHandler={(e) => handleChange(e, "companyName")}
          />
        </div>
        <div className="space-y-2">
          <InputTag
            type={"text"}
            label={"Full Name"}
            placeholder={"Ex: David"}
            changeHandler={(e) => handleChange(e, "fullName")}
          />
        </div>
        <div className="space-y-2">
          <InputTag
            type={"text"}
            label={"Email Address"}
            changeHandler={(e) => (e, "email")}
            placeholder={"Ex: someone@gmail.com"}
          />
        </div>
        <div className="space-y-2">
          <div className="relative">
            <InputTag
              type={passwordType}
              label={"Password"}
              changeHandler={(e) => handleChange(e, "password")}
              placeholder={"Enter your password here"}
            />
            {passwordType === "password" && (
              <svg
                className="absolute top-9 right-4 cursor-pointer sho-password"
                onClick={() => {
                  setPasswordType("text");
                }}
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 9.0293C12.2761 9.0293 12.5 8.80544 12.5 8.5293C12.5 8.25315 12.2761 8.0293 12 8.0293V9.0293ZM7.39961 16.8316C7.6461 16.9561 7.94684 16.8572 8.07132 16.6107C8.1958 16.3642 8.09688 16.0635 7.85039 15.939L7.39961 16.8316ZM11.5 8.529C11.5 8.80514 11.7239 9.029 12 9.029C12.2761 9.029 12.5 8.80514 12.5 8.529H11.5ZM12.5 5C12.5 4.72386 12.2761 4.5 12 4.5C11.7239 4.5 11.5 4.72386 11.5 5H12.5ZM11.9984 8.02806C11.7222 8.02895 11.4991 8.25353 11.5 8.52967C11.5009 8.80581 11.7255 9.02895 12.0016 9.02806L11.9984 8.02806ZM14.6371 9.36917C14.904 9.44034 15.1779 9.28173 15.2491 9.01492C15.3203 8.7481 15.1617 8.47411 14.8949 8.40295L14.6371 9.36917ZM6.32289 6.54338C6.20015 6.29601 5.90012 6.19499 5.65275 6.31773C5.40539 6.44048 5.30437 6.74051 5.42711 6.98787L6.32289 6.54338ZM6.86611 9.88787C6.98885 10.1352 7.28888 10.2363 7.53625 10.1135C7.78361 9.99077 7.88463 9.69074 7.76189 9.44338L6.86611 9.88787ZM7.25727 19.6612C7.07016 19.8643 7.08312 20.1806 7.28622 20.3677C7.48931 20.5548 7.80562 20.5419 7.99273 20.3388L7.25727 19.6612ZM10.5677 17.5438C10.7548 17.3407 10.7419 17.0244 10.5388 16.8373C10.3357 16.6502 10.0194 16.6631 9.83227 16.8662L10.5677 17.5438ZM19.3683 7.9871C19.5553 7.78395 19.5423 7.46764 19.3391 7.2806C19.136 7.09356 18.8197 7.10662 18.6326 7.30977L19.3683 7.9871ZM16.6126 9.50377C16.4256 9.70692 16.4387 10.0232 16.6418 10.2103C16.845 10.3973 17.1613 10.3843 17.3483 10.1811L16.6126 9.50377ZM9.83149 16.867C9.64438 17.0701 9.65734 17.3864 9.86043 17.5735C10.0635 17.7606 10.3798 17.7477 10.5669 17.5446L9.83149 16.867ZM12.5992 14.6008L12.9669 14.9396L12.9674 14.9391L12.5992 14.6008ZM13.6842 13.4198L13.3164 13.0811L13.316 13.0815L13.6842 13.4198ZM17.347 10.1805C17.5341 9.97738 17.5211 9.66106 17.3179 9.474C17.1148 9.28693 16.7985 9.29996 16.6114 9.50309L17.347 10.1805ZM10.2812 16.7126C10.0088 16.6673 9.75129 16.8514 9.70599 17.1238C9.6607 17.3962 9.8448 17.6537 10.1172 17.699L10.2812 16.7126ZM11.9992 17.3538V16.8538L11.9989 16.8538L11.9992 17.3538ZM18.9992 12.9418H19.4992C19.4992 12.9299 19.4988 12.9181 19.498 12.9063L18.9992 12.9418ZM17.2131 9.39989C16.9691 9.2707 16.6665 9.36382 16.5373 9.60787C16.4081 9.85193 16.5012 10.1545 16.7453 10.2837L17.2131 9.39989ZM10.1744 14.2704C10.3359 14.4944 10.6485 14.5451 10.8724 14.3836C11.0964 14.2221 11.1471 13.9095 10.9856 13.6856L10.1744 14.2704ZM10.437 12.1447L10.883 12.3707L10.437 12.1447ZM12 11.176L11.9994 10.676L11.996 10.676L12 11.176ZM12.6556 11.8637C12.8896 12.0103 13.1982 11.9394 13.3447 11.7054C13.4913 11.4714 13.4204 11.1628 13.1864 11.0163L12.6556 11.8637ZM12 8.0293C9.98751 8.0293 8.14193 8.54236 6.78365 9.39842C5.43188 10.2504 4.5 11.4902 4.5 12.9413H5.5C5.5 11.9553 6.13512 10.9892 7.31685 10.2444C8.49207 9.50373 10.1465 9.0293 12 9.0293V8.0293ZM4.5 12.9413C4.5 14.6012 5.71482 15.9808 7.39961 16.8316L7.85039 15.939C6.33518 15.1738 5.5 14.0673 5.5 12.9413H4.5ZM12.5 8.529V5H11.5V8.529H12.5ZM12.0016 9.02806C12.8913 9.02518 13.7775 9.13988 14.6371 9.36917L14.8949 8.40295C13.9501 8.15096 12.9762 8.0249 11.9984 8.02806L12.0016 9.02806ZM5.42711 6.98787L6.86611 9.88787L7.76189 9.44338L6.32289 6.54338L5.42711 6.98787ZM7.99273 20.3388L10.5677 17.5438L9.83227 16.8662L7.25727 19.6612L7.99273 20.3388ZM18.6326 7.30977L16.6126 9.50377L17.3483 10.1811L19.3683 7.9871L18.6326 7.30977ZM10.5669 17.5446L12.9669 14.9396L12.2315 14.262L9.83149 16.867L10.5669 17.5446ZM12.9674 14.9391L14.0524 13.7581L13.316 13.0815L12.231 14.2625L12.9674 14.9391ZM14.052 13.7585L17.347 10.1805L16.6114 9.50309L13.3164 13.0811L14.052 13.7585ZM10.1172 17.699C10.7393 17.8025 11.3689 17.8542 11.9996 17.8538L11.9989 16.8538C11.4234 16.8542 10.8489 16.807 10.2812 16.7126L10.1172 17.699ZM11.9992 17.8538C14.0117 17.8538 15.8573 17.3407 17.2156 16.4847C18.5673 15.6327 19.4992 14.3928 19.4992 12.9418H18.4992C18.4992 13.9277 17.8641 14.8939 16.6824 15.6387C15.5071 16.3794 13.8527 16.8538 11.9992 16.8538V17.8538ZM19.498 12.9063C19.3923 11.4216 18.5287 10.0963 17.2131 9.39989L16.7453 10.2837C17.7559 10.8187 18.4193 11.8368 18.5005 12.9773L19.498 12.9063ZM10.9856 13.6856C10.7082 13.3009 10.6687 12.7937 10.883 12.3707L9.99102 11.9187C9.60762 12.6752 9.67838 13.5825 10.1744 14.2704L10.9856 13.6856ZM10.883 12.3707C11.0974 11.9478 11.5298 11.6798 12.004 11.676L11.996 10.676C11.1479 10.6828 10.3744 11.1622 9.99102 11.9187L10.883 12.3707ZM12.0006 11.676C12.2323 11.6757 12.4593 11.7408 12.6556 11.8637L13.1864 11.0163C12.8306 10.7934 12.4192 10.6755 11.9994 10.676L12.0006 11.676Z"
                  fill="#171717"
                />
              </svg>
            )}
            {passwordType === "text" && (
              <svg
                className="absolute top-9 right-4 cursor-pointer sho-password"
                onClick={() => {
                  setPasswordType("password");
                }}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18 12.7147C18 15.0817 14.866 17.0007 11 17.0007C7.134 17.0007 4 15.0817 4 12.7147C4 10.3477 7.134 8.42969 11 8.42969C14.866 8.42969 18 10.3477 18 12.7147Z"
                  stroke="#525252"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.7497 12.7141C12.7643 13.425 12.3473 14.0741 11.6947 14.3563C11.0421 14.6386 10.2835 14.4979 9.77554 14.0003C9.26756 13.5028 9.11112 12.7473 9.37974 12.089C9.64836 11.4306 10.2886 11.0002 10.9997 11.0001C11.459 10.9953 11.9015 11.1732 12.2297 11.4946C12.5579 11.8161 12.7449 12.2547 12.7497 12.7141V12.7141Z"
                  stroke="#525252"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.5 8.429C10.5 8.70514 10.7239 8.929 11 8.929C11.2761 8.929 11.5 8.70514 11.5 8.429H10.5ZM11.5 5C11.5 4.72386 11.2761 4.5 11 4.5C10.7239 4.5 10.5 4.72386 10.5 5H11.5ZM17.5704 6.94114C17.6959 6.69514 17.5981 6.39402 17.3521 6.26857C17.1061 6.14312 16.805 6.24086 16.6796 6.48686L17.5704 6.94114ZM15.2426 9.30486C15.1171 9.55086 15.2149 9.85198 15.4609 9.97743C15.7069 10.1029 16.008 10.0051 16.1334 9.75914L15.2426 9.30486ZM5.32043 6.48686C5.19498 6.24086 4.89386 6.14312 4.64786 6.26857C4.40186 6.39402 4.30412 6.69514 4.42957 6.94114L5.32043 6.48686ZM5.86657 9.75914C5.99202 10.0051 6.29314 10.1029 6.53914 9.97743C6.78514 9.85198 6.88288 9.55086 6.75743 9.30486L5.86657 9.75914ZM11.5 8.429V5H10.5V8.429H11.5ZM16.6796 6.48686L15.2426 9.30486L16.1334 9.75914L17.5704 6.94114L16.6796 6.48686ZM4.42957 6.94114L5.86657 9.75914L6.75743 9.30486L5.32043 6.48686L4.42957 6.94114Z"
                  fill="#525252"
                />
              </svg>
            )}
            <div
              className={` ${
                error ? "opacity-100 " : "opacity-0"
              } transition-all ease-in-out duration-300  absolute -bottom-5`}
            >
              <p className="text-xs text-card-subheading font-semibold">
                Invalid email or password
              </p>
            </div>
          </div>
        </div>

        <ButtonPrimary
          loader={loading}
          label="Register"
          // handleClick={() => {
          //   handleCodeConfirmation(false);
          // }}
        />

        <p className="text-base leading-[16px] text-center lg:text-left figtree-font text-card-subheading">
          Already have an account?
          <Link href="/">
            <span className="text-base leading-[120%] font-medium text-primary underline px-2 underline-offset-2 cursor-pointer">
              Log in
            </span>{" "}
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Register;
