import React, { useEffect, useState, Fragment, useReducer } from 'react'
import { useLocation } from 'react-router-dom'
import CourseItem from '../../../parts/components/CourseItem/CourseItem'
import { createBrowserHistory } from "history";
import jwtEnum from '../../../utils/enums/jwtEnum'
import Pagination from './containers/Pagination/Pagination'
import apiStateEnum from '../../../utils/enums/apiStateEnum';
import { getSubscribersByStudentIdApi } from '../../../services/api/subscriberApi';
const SubscribedCourseList = () => {
  const location = useLocation();
  const pathName = location.pathname;
  const params = new URLSearchParams(location.search);
  const page = Number(params.get("page")) || 1;
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  const history = createBrowserHistory({ forceRefresh: true });
  const [courses, setCourses] = useState(null);
  const [messageAlert, setMessageAlert] = useState('');
  const [apiState, setApiState] = useState(apiStateEnum.PROCESSING);
  useEffect(() => {
    getSubscribersByStudentIdApi(page).then(result => {
      if (result.isSuccess) {
        setCourses(result.data);
        setMessageAlert('');
        setApiState(apiStateEnum.SUCCESS);
      } else if (result.message === jwtEnum.TOKEN_IS_EXPIRED || result.message === jwtEnum.NO_TOKEN) {
        history.push('/login');
      } else {
        setMessageAlert(result.message);
        setApiState(apiStateEnum.FAIL);
      }
    });
  }, [useLocation(), ignored]);
  return (
    <Fragment>
      <div className="login-form-area edu-pd mg-b-15">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="tab-content-details shadow-reset">
                <h2>Danh sách khóa học đã đăng ký</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      {apiState === apiStateEnum.SUCCESS ?
        <div className="courses-area">
          <div className="container-fluid">
            <div className="row">
              {courses && courses.subscribed_courses && courses.subscribed_courses.map((course, index) => {
                return <CourseItem course={course} key={course._id} forceUpdate={forceUpdate} />
              })}
            </div>
            <div className="mg-b-30">
              <Pagination
                page={page}
                page_number={courses && courses.page_number}
                pathName={pathName} />
            </div>
          </div>
        </div>
        : apiState === apiStateEnum.FAIL ?
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="alert alert-info alert-st-two" role="alert">
              <i className="fa fa-times edu-danger-error admin-check-pro admin-check-pro-none" aria-hidden="true"></i>
              <p className="message-mg-rt message-alert-none"><strong>Oh!</strong> {messageAlert}</p>
            </div>
          </div> :
          <Fragment />}
    </Fragment>
  )
}

export default SubscribedCourseList
