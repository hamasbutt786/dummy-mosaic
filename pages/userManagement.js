import React, { useEffect, useState } from "react";
import AddUser from "../components/usersManagement/addUser";
import Users from "../components/usersManagement";
import Layout from "../components/layout";
import Header from "../components/header";
import ButtonPrimary from "@/components/reusableUi/ButtonPrimary";
import Search from "@/components/reusableUi/search";
import withAuth from "@/components/middlewares/Auth";
const userManagement = () => {
  const [addEmployee, setAddEmployee] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const [filterData, setFilterData] = useState([]);
  // Update team member data state
  const [userData, setUserData] = useState("");
  const array = [
    {
      firstName: "John",
      lastName: "Doe",
      email: "john@gmail.com",
      password: "12345678",
      role: "supplier",
      type: "paid",
      createdAt: "12/12/2021",
      status: "Active",
    },
    {
      firstName: "John",
      lastName: "Doe",
      email: "john@gmail.com",
      password: "12345678",
      role: "user",
      type: "paid",
      createdAt: "12/12/2021",
      status: "Active",
    },
    {
      firstName: "kiani",
      lastName: "Doe",
      email: "kiani@gmail.com",
      password: "12345678",
      role: "manager",
      type: "paid",
      createdAt: "12/12/2021",
      status: "Active",
    },
    {
      firstName: "John",
      lastName: "Doe",
      email: "john@gmail.com",
      password: "12345678",
      role: "reporter",
      type: "paid",
      createdAt: "12/12/2021",
      status: "Active",
    },
  ];
  const userSearch = (value) => {
    if (value != "") {
      if (value.length > 0) {
        const dataSearch = array.filter((item) => {
          if (
            item.firstName.toLowerCase().includes(value.toLowerCase()) ||
            item.lastName.toLowerCase().includes(value.toLowerCase()) ||
            item.email.toLowerCase().includes(value.toLowerCase()) ||
            item.role.toLowerCase().includes(value.toLowerCase()) ||
            item.createdAt.toLowerCase().includes(value.toLowerCase())
          ) {
            return item;
          }
        });
        setFilterData(dataSearch);
      }
    } else {
      setFilterData(array);
    }
  };
  useEffect(() => {
    setFilterData(array);
  }, []);
  return (
    <Layout nav={true}>
      <Header title={"Logo"} />
      <>
        <div className="max-w-[1124px] w-full container mx-auto px-2">
          <div className="w-full flex justify-between mt-8 mb-[17.5px]">
            <div className="flex gap-4">
              <ButtonPrimary
                handleClick={() => {
                  setAddEmployee(true);
                }}
                type="button"
                label={"Add User"}
                className="py-3 px-6 bg-zinc-900 hover:bg-zinc-700  text-zinc-50 rounded-[8px]"
              />
            </div>
            <Search
              filterValue={filterValue}
              setFilterValue={setFilterValue}
              searchFunction={userSearch}
              placeholder={"Search"}
            />
          </div>
          <Users
            array={array}
            setUserData={setUserData}
            setAddEmployee={setAddEmployee}
            filterData={filterData}
          />
        </div>
        <>
          <div
            onClick={() => setAddEmployee(false)}
            className={`${
              addEmployee
                ? "z-[100] opacity-1 visible "
                : "invisible opacity-0 z-0 "
            } fixed inset-0 w-full h-full transform  transition-all duration-500 ease-in-out bg-zinc-600 bg-opacity-80`}
          ></div>
          <div
            className={`bg-summary-cards fixed inset-0 h-full max-w-[384px] transition-all duration-700 ease-in-out z-[200] m-auto ${
              addEmployee ? "mr-0" : "mr-[-100%]"
            } w-full p-6 overflow-y-auto min-h-screen`}
          >
            <AddUser
              setAddEmployee={setAddEmployee}
              addEmployee={addEmployee}
              userData={userData}
              setUserData={setUserData}
            />
          </div>
        </>
      </>
    </Layout>
  );
};

export default withAuth(userManagement);
