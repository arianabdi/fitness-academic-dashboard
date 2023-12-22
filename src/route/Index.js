import React, { useLayoutEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Layout from "../layout/Index";

import UserList2 from "../pages/asoo/user/userList";
import UserAdd2 from "../pages/asoo/user/userAdd";
import PlaneList from "../pages/asoo/plane/planeList";
import PlaneAdd from "../pages/asoo/plane/planeAdd";
import TeacherList from "../pages/asoo/teacher/teacherList";
import TeacherAdd from "../pages/asoo/teacher/teacherAdd";
import StudentList from "../pages/asoo/student/studentList";
import FlightAdd from "../pages/asoo/flight/flightAdd";
import FlightList from "../pages/asoo/flight/flightList";
import CourseList from "../pages/asoo/courses/courseList";
import CourseAdd from "../pages/asoo/courses/courseAdd";
import AsooLogin from "../pages/asoo/auth/asoo-login";
import AsooHome from "../pages/asoo/home";
import ClassList from "../pages/asoo/classes/classList";
import ClassAdd from "../pages/asoo/classes/classAdd";
import StudentAdd from "../pages/asoo/student/studentAdd";
import ClassPresence from "../pages/asoo/classes/classPresence";
import CourseStudents from "../pages/asoo/courses/courseStudents";
import FlightServices from "../pages/asoo/flight/flightServices/flightServices";
import NotificationsList from "../pages/asoo/notification/notificationsList";
import TransactionList from "../pages/asoo/transactions/transactionList";
import ServiceList from "../pages/asoo/services/serviceList";
import ServiceAdd from "../pages/asoo/services/serviceAdd";
import Profile from "../pages/asoo/profile";
import Checkout from "../pages/asoo/checkout/checkout";
import Recharge from "../pages/asoo/recharge/recharge";
import Error404Classic from "../pages/asoo/error/404-classic";
import Error504Classic from "../pages/asoo/error/504-classic";
import Settings from "../pages/asoo/settings";
import ExerciseList from "../pages/fitness-academic/exercises/exerciseList";
import ExerciseAdd from "../pages/fitness-academic/exercises/exerciseAdd";
import ProgramAdd from "../pages/fitness-academic/program/programAdd";
import ProgramList from "../pages/fitness-academic/program/programList";


const Pages = () => {
  const location = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Routes>
      <Route path="" element={<Layout />}>
        {/*<Route index element={<Homepage />}></Route>*/}
        <Route index element={<AsooHome />}></Route>

        {/*FitnessAcademic*/}
        <Route>
          <Route path="exercise-list" element={<ExerciseList />}></Route>
          <Route path="exercise-add" element={<ExerciseAdd />}></Route>
          <Route path="exercise-categories" element={<ExerciseAdd />}></Route>
          <Route path="exercise-edit/:id" element={<ExerciseAdd />}></Route>
        </Route>


        {/*FitnessAcademic*/}
        <Route>
          <Route path="program-list" element={<ProgramList />}></Route>
          <Route path="program-edit/:id" element={<ProgramAdd />}></Route>
        </Route>

        {/*FitnessAcademic*/}
        <Route>
          <Route path="post-list" element={<ProgramList />}></Route>
          <Route path="post-add" element={<ExerciseAdd />}></Route>
          <Route path="post-edit/:id" element={<ProgramAdd />}></Route>
        </Route>

        {/*Asoo*/}
        <Route>
          <Route path="settings" element={<Settings />}></Route>
        </Route>

        {/*Asoo*/}
        <Route path="asoo_home" element={<AsooHome />}></Route>
        <Route>
          <Route path="user-list-2" element={<UserList2 />}></Route>
          <Route path="user-add-2" element={<UserAdd2 />}></Route>
        </Route>

        {/*Asoo*/}
        <Route>
          <Route path="plane-list" element={<PlaneList />}></Route>
          <Route path="plane-add" element={<PlaneAdd />}></Route>
          <Route path="plane-edit/:id" element={<PlaneAdd />}></Route>
        </Route>

        {/*Asoo*/}
        <Route>
          <Route path="teacher-list" element={<TeacherList />}></Route>
          <Route path="teacher-add" element={<TeacherAdd />}></Route>
          <Route path="teacher-edit/:id" element={<TeacherAdd />}></Route>
        </Route>

        {/*Asoo*/}
        <Route>
          <Route path="student-add" element={<StudentAdd />}></Route>
          <Route path="student-list" element={<StudentList />}></Route>
          <Route path="student-edit/:id" element={<StudentAdd />}></Route>
        </Route>

        {/*Asoo*/}
        <Route>
          <Route path="service-add" element={<ServiceAdd />}></Route>
          <Route path="service-list" element={<ServiceList />}></Route>
          <Route path="service-edit/:id" element={<ServiceAdd />}></Route>
        </Route>

        {/*Asoo*/}
        <Route>
          <Route path="flight-list" element={<FlightList />}></Route>
          <Route path="flight-add" element={<FlightAdd />}></Route>
          <Route path="flight-edit/:id" element={<FlightAdd />}></Route>
          <Route path="flight-service" element={<FlightServices />}></Route>
        </Route>

        {/*Asoo*/}
        <Route>
          <Route path="course-list" element={<CourseList />}></Route>
          <Route path="course-add" element={<CourseAdd />}></Route>
          <Route path="course-edit/:id" element={<CourseAdd />}></Route>
          <Route path="course-students/:courseId" element={<CourseStudents />}></Route>
        </Route>

        {/*Asoo*/}
        <Route>
          <Route path="course-class-list" element={<ClassList />}></Route>
          <Route path="course-class-add" element={<ClassAdd />}></Route>
          <Route path="course-class-edit/:id" element={<ClassAdd />}></Route>
          <Route path="course-class-presence/:courseId/:classId" element={<ClassPresence />}></Route>
        </Route>

        {/*Asoo*/}
        <Route>
          <Route path="notifications" element={<NotificationsList />}></Route>
        </Route>


        {/*Asoo*/}
        <Route>
          <Route path="profile/:role/:id" element={<Profile />}></Route>
        </Route>

        {/*Asoo*/}
        <Route>
          <Route path="transaction-list" element={<TransactionList />}></Route>
          <Route path="recharge-wallet" element={<TransactionList />}></Route>
          <Route path="checkout" element={<Checkout />}></Route>
          <Route path="recharge" element={<Recharge />}></Route>
        </Route>

        {/*Asoo*/}
        <Route>
          <Route path="add-student-to-course/:courseId" element={<StudentList />}></Route>
        </Route>
      </Route>
      {/*asoo*/}
      <Route path="login" element={<AsooLogin />}></Route>
      <Route path="errors">
        <Route path="404-classic" element={<Error404Classic />}></Route>
        <Route path="504-classic" element={<Error504Classic />}></Route>
      </Route>
      <Route path="*" element={<Error404Classic />}></Route>


    </Routes>
  );
};
export default Pages;
