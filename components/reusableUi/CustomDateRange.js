import ButtonPrimary from "@/components/reusableUi/ButtonPrimary";
import React, {useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
const DatePickerComponent = ({
  startDate,
  endDate,
  setEndDate,
  setStartDate,
  compname,
  hitApi,
  minwidth,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [datePickerKey, setDatePickerKey] = useState(0);
  const handleApply = () => {
    if (hitApi) {
      hitApi();
    }
    // Handle applying the selected date range
    if (startDate && endDate) {
      setSelectedItem(
        `${format(startDate, "yyyy-MM-dd")} - ${format(endDate, "yyyy-MM-dd")}`
      );
    } else if (selectedItem === "Custom Date") {
    } else {
    }
    setIsOpen(false);
  };
  const handleCancel = () => {
    // Handle canceling the selection
    setStartDate(null);
    setEndDate(null);
    setIsOpen(false);
    setSelectedItem("");
  };
  const handleItemClick = (item) => {
    setSelectedItem(item);
    // setIsOpen(false);
    switch (item) {
      case "Today":
        setStartDate(new Date());
        setDatePickerKey((prevKey) => prevKey + 1);

        setEndDate(null);
        break;
      case "Yesterday":
        setStartDate(new Date(new Date().setDate(new Date().getDate() - 1)));
        setEndDate(null);
        setDatePickerKey((prevKey) => prevKey + 1);
        break;
      case "This Month":
        setStartDate(
          new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        );
        setEndDate(null);
        setDatePickerKey((prevKey) => prevKey + 1);
        break;
      case "This Week":
        const today = new Date();
        const firstDayOfWeek = today.getDate() - today.getDay();
        const lastDayOfWeek = firstDayOfWeek + 6;
        const firstDay = new Date(today.setDate(firstDayOfWeek));
        const lastDay = new Date(today.setDate(lastDayOfWeek));
        setStartDate(firstDay);
        setEndDate(lastDay);
        setDatePickerKey((prevKey) => prevKey + 1);
        break;
      case "This Quarter":
        const currentMonth = new Date().getMonth();
        const firstMonthOfQuarter = currentMonth - (currentMonth % 3);
        const firstDayOfQuarter = new Date(
          new Date().getFullYear(),
          firstMonthOfQuarter,
          1
        );
        const lastDayOfQuarter = new Date(
          firstDayOfQuarter.getFullYear(),
          firstDayOfQuarter.getMonth() + 3,
          0
        );
        setStartDate(firstDayOfQuarter);
        setEndDate(lastDayOfQuarter);
        setDatePickerKey((prevKey) => prevKey + 1);
        break;
      case "Last Quarter":
        const previousMonth = new Date().getMonth() - 3;
        const firstMonthOfLastQuarter = previousMonth - (previousMonth % 3);
        const firstDayOfLastQuarter = new Date(
          new Date().getFullYear(),
          firstMonthOfLastQuarter,
          1
        );
        const lastDayOfLastQuarter = new Date(
          firstDayOfLastQuarter.getFullYear(),
          firstDayOfLastQuarter.getMonth() + 3,
          0
        );
        setStartDate(firstDayOfLastQuarter);
        setEndDate(lastDayOfLastQuarter);
        setDatePickerKey((prevKey) => prevKey + 1);
        break;
      case "This Year":
        const currentYear = new Date().getFullYear();
        const firstDayOfYear = new Date(currentYear, 0, 1);
        const lastDayOfYear = new Date(currentYear, 11, 31);
        setStartDate(firstDayOfYear);
        setEndDate(lastDayOfYear);
        setDatePickerKey((prevKey) => prevKey + 1);
        break;
      case "Last Year":
        const previousYear = new Date().getFullYear() - 1;
        const firstDayOfLastYear = new Date(previousYear, 0, 1);
        const lastDayOfLastYear = new Date(previousYear, 11, 31);
        setStartDate(firstDayOfLastYear);
        setEndDate(lastDayOfLastYear);
        setDatePickerKey((prevKey) => prevKey + 1);
        break;
      default:
        setStartDate(null);
        setEndDate(null);
        break;
    }
  };
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  useEffect(()=>{
    if(startDate||endDate){
      setSelectedItem(
          `${format(startDate, "yyyy-MM-dd")} - ${format(endDate, "yyyy-MM-dd")}`
      )
    }
  },[])
  return (
    <div className="relative ">
      <div className={`flex flex-row items-center justify-between w-full `}>
        <div className="w-full">
          <div className="relative inline-block text-left w-full">
            <div className="w-full ">
              <button
                type="button"
                className={`flex  text-xs border font-normal text-card-subheading !leading-none ${minwidth ? minwidth : `min-w-full`
                  } max-w-full  cursor-pointer capitalize items-center lg:pr-3 md:px-2 lg:pl-4 py-4 w-full h-full max-h-[42px] border-navborder rounded-lg  justify-between text-left  bg-transparent`}
                id="options-menu"
                aria-haspopup="true"
                aria-expanded="true"
                onClick={toggleDropdown}
              >
                {selectedItem || "PO Date"}
                <div className="flex justify-center items-center">

                <hr className="border w-5 rotate-90 border-[#e5e7eb]"></hr>
                
                <svg
                  className={`
                ${isOpen ? "rotate-180" : "rotate-0"
                    } transition-all ease-in-out duration-300`}
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_451_8017)">
                <path 
                   fill={`${isOpen?"#000000":"#e5e7eb"}`}
                d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                  
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
                </div>
              </button>
            </div>
            {isOpen && (
              <div
                className={`  ${compname === "scope" ? "right-0" : ""
                  } absolute z-30`}
              >
                <div
                  className=" mt-2 w-full flex  rounded-md shadow-lg min-h-[420px] h-full bg-summary-cards ring-1 ring-black ring-opacity-5"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <div
                    className="py-1 w-[126px] "
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <button
                      className={`${selectedItem === "This Quarter"
                          ? "bg-btnBackground text-white"
                          : "text-card-subheading"
                        } block px-4 py-2 text-sm`}
                      role="menuitem"
                      onClick={() => handleItemClick("This Quarter")}
                    >
                      This Quarter
                    </button>
                    <button
                      className={`${selectedItem === "Last Quarter"
                          ? "bg-btnBackground text-white"
                          : "text-card-subheading"
                        } block px-4 py-2 text-sm`}
                      role="menuitem"
                      onClick={() => handleItemClick("Last Quarter")}
                    >
                      Last Quarter
                    </button>
                    <button
                      className={`${selectedItem === "This Year"
                          ? "bg-btnBackground text-white"
                          : "text-card-subheading"
                        } block px-4 py-2 text-sm`}
                      role="menuitem"
                      onClick={() => handleItemClick("This Year")}
                    >
                      This Year
                    </button>
                    <button
                      className={`${selectedItem === "Last Year"
                          ? "bg-btnBackground text-white"
                          : "text-card-subheading"
                        } block px-4 py-2 text-sm`}
                      role="menuitem"
                      onClick={() => handleItemClick("Last Year")}
                    >
                      Last Year
                    </button>
                  </div>
                  <div className=" flex flex-col justify-between min-w-[544px] relative">
                    <div className="flex w-full">
                      <div className="w-full min-w-[200px] max-w-full  bg-summary-cards p-4 flex gap-2">
                        <DatePicker
                          key={`start-date-picker-${datePickerKey}`}
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          selectsStart
                          startDate={startDate}
                          endDate={endDate}
                          className="border rounded  p-2 mb-2 outline-none text-xs"
                          value={
                            startDate
                              ? format(startDate, "yyyy-MM-dd")
                              : "Start Date"
                          }
                          open={true}
                        />
                      </div>
                      <div className="w-full min-w-[200px]  max-w-full bg-summary-cards p-4 flex gap-2">
                        <DatePicker
                          key={`End-date-picker-${datePickerKey}`}
                          selected={endDate}
                          onChange={(date) => setEndDate(date)}
                          selectsEnd
                          startDate={startDate}
                          endDate={endDate}
                          minDate={startDate}
                          className="border rounded p-2 outline-none text-xs"
                          open={true}
                          value={
                            endDate ? format(endDate, "yyyy-MM-dd") : "End Date"
                          }
                        />
                      </div>
                    </div>
                    <div className="w-full flex md:gap-5 justify-end   p-4">
                      <ButtonPrimary
                        btnSecondary={true}
                        label="Cancel"
                        handleClick={handleCancel}
                      />
                      <ButtonPrimary handleClick={handleApply} label="Apply" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatePickerComponent;
