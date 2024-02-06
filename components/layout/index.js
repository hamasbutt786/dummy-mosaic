import React, { useEffect } from "react";
import Navigation from "../reusableUi/navigation";
import { useDispatch } from "react-redux";
import { setLocalVariable } from "@/redux-setup/DataSlice";

const Index = ({ children, nav, logInFlow }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    if (typeof window === 'undefined') return
    let business_entity_id = localStorage?.getItem("business_entity_id")
    dispatch(setLocalVariable({ business_entity_id }))
  }, [])
  if (logInFlow) {
    return <>{children}</>
  }
  return (
    <section className="flex w-full justify-between relative ">
      <Navigation nav={nav} />
      <main
        className={`${nav && ""
          } max-w-[1180px] w-full main-section  bg-main-bg`}
      >
        <div className="w-full mx-auto h-full">{children}</div>
      </main>
      <style>
        {`
				@media screen and (min-width: 900px) {
					.main-section {
						max-width: ${nav ? "calc(100% - 16rem)" : "100%"};
					}
				} 
				`}
      </style>
    </section>
  );
};

export default Index;
