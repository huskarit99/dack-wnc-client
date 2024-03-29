import React from "react";
import { useRecoilValue } from "recoil";
import { useLocation } from "react-router-dom";

import Sort from "./components/Sort/Sort";
import roleState from "../../../state/roleState";
import ShowLink from "./components/ShowLink/ShowLink";
import SearchCourse from "./components/SearchCourse/SearchCourse";
import SortByCategory from "./components/SortByCategory/SortByCategory";
import SortByTeacher from "./components/SortByTeacher/SortByTeacher";

const BreadCome = () => {
  const location = useLocation();
  const role = useRecoilValue(roleState);

  return (
    <div className="header-advance-area">
      <div className="breadcome-area">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="breadcome-list">
                <div className="row">
                  <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                    {role !== "teacher" && role !== "admin" && <SearchCourse />}
                    {role === 'admin' && location.pathname.includes("/courses") && <SortByCategory />}
                  </div>
                  <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12">
                    {role !== "teacher" &&
                      role !== "admin" &&
                      location.pathname.includes("/courses/search") && <Sort />}
                    {role === 'admin' && location.pathname.includes("/courses") && <SortByTeacher />}
                  </div>
                  <div className="col-lg-7 col-md-6 col-sm-6 col-xs-12">
                    <ShowLink />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreadCome;
