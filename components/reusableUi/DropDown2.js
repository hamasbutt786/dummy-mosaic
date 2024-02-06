import { useState } from "react";

const Dropdown2 = ({ label, options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full flex flex-col gap-3">
      {label && (
        <p className="text-sm px-1 !leading-none inter-font text-card-heading ">
          {label}:
        </p>
      )}
      <div className="">
        <button
          type="button"
          className="flex  items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          aria-haspopup="true"
          aria-expanded={isOpen}
          onClick={handleToggle}
        >
          {selectedOption?.title || "Select an option"}
          <svg
            className={`${
              isOpen && "rotate-180 "
            } transition-all ease-in-out duration-300`}
            width={25}
            height={24}
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_451_8017)">
              <path
                d="M13.031 12.95L17.981 8L19.395 9.414L13.031 15.778L6.66699 9.414L8.08099 8L13.031 12.95Z"
                fill="#475569"
              />
            </g>
            <defs>
              <clipPath id="clip0_451_8017">
                <rect
                  width={24}
                  height={24}
                  fill="white"
                  transform="translate(0.666992)"
                />
              </clipPath>
            </defs>
          </svg>
          {/* <svg
            className={`w-5 h-5 ml-2 -mr-1 text-gray-400 ${
               ? "transform rotate-180" : ""
            }`}
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M7 7l3-3 3 3m0 6l-3 3-3-3"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg> */}
        </button>
      </div>
      {isOpen && (
        <div className="absolute top-[70px] z-10 w-full mt-2 bg-white rounded-md shadow-lg">
          <ul
            className="py-1 overflow-auto text-base bg-white rounded-md shadow-xs max-h-60 focus:outline-none"
            tabIndex="-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options.map((option) => (
              <li
                key={option}
                className={`${
                  openDD[index].data.includes(item.title)
                    ? "text-selected-text"
                    : "text-card-subheading"
                } text-sm font-normal w-full !leading-none  cursor-pointer capitalize`}
                role="menuitem"
                onClick={() => handleOptionSelect(option)}
              >
                {option?.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown2;
