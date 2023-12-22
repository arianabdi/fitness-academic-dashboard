import React, { useLayoutEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Layout from "../layout/Index";


import StudentList from "../pages/asoo/student/studentList";
import AsooLogin from "../pages/asoo/auth/asoo-login";
import AsooHome from "../pages/asoo/home";
import NotificationsList from "../pages/asoo/notification/notificationsList";
import TransactionList from "../pages/asoo/transactions/transactionList";
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
import PostList from "../pages/fitness-academic/post/postList";
import PostAdd from "../pages/fitness-academic/post/postAdd";
import PostCategoriesList from "../pages/fitness-academic/post/postCategoriesList";
import ExerciseCategoryList from "../pages/fitness-academic/exercises/exerciseCategoryList";
import ExerciseCategoryAdd from "../pages/fitness-academic/exercises/exerciseCategoryAdd";
import PostCategoryAdd from "../pages/fitness-academic/post/postCategoryAdd";
import UserSystemAdd from "../pages/fitness-academic/users/userSystemAdd";
import UserSystemList from "../pages/fitness-academic/users/userSystemList";
import PaymentGatewayList from "../pages/fitness-academic/payment-gateways/paymentGatewayList";
import PaymentGatewayAdd from "../pages/fitness-academic/payment-gateways/paymentGatewayAdd";
import ProductCategoryList from "../pages/fitness-academic/products/productCategoryList";


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
          <Route path="exercise-edit/:id" element={<ExerciseAdd />}></Route>
          <Route path="exercise-category-list" element={<ExerciseCategoryList />}></Route>
          <Route path="exercise-category-add" element={<ExerciseCategoryAdd />}></Route>
          <Route path="exercise-category-edit/:id" element={<ExerciseCategoryAdd />}></Route>
        </Route>


        {/*FitnessAcademic*/}
        <Route>
          <Route path="program-list" element={<ProgramList />}></Route>
          <Route path="program-edit/:id" element={<ProgramAdd />}></Route>
        </Route>

        {/*FitnessAcademic*/}
        <Route>
          <Route path="post-list" element={<PostList />}></Route>
          <Route path="post-add" element={<PostAdd />}></Route>
          <Route path="post-edit/:id" element={<PostAdd />}></Route>
          <Route path="post-category-list" element={<PostCategoriesList />}></Route>
          <Route path="post-category-add" element={<PostCategoryAdd />}></Route>
          <Route path="post-category-edit/:id" element={<PostCategoryAdd />}></Route>
        </Route>

        {/*Asoo*/}
        <Route>
          <Route path="settings" element={<Settings />}></Route>
        </Route>

        {/*Fitness Academic*/}
        <Route path="asoo_home" element={<AsooHome />}></Route>
        <Route>
          <Route path="user-system-list" element={<UserSystemList />}></Route>
          <Route path="user-system-add" element={<UserSystemAdd />}></Route>
          <Route path="user-system-edit/:id" element={<UserSystemAdd />}></Route>
        </Route>

        {/*Fitness Academic*/}
        <Route>
          <Route path="payment-gateway-list" element={<PaymentGatewayList />}></Route>
          <Route path="payment-gateway-add" element={<PaymentGatewayAdd />}></Route>
          <Route path="payment-gateway-edit/:id" element={<PaymentGatewayAdd />}></Route>
        </Route>


        {/*Fitness Academic*/}
        <Route>
          <Route path="products-category-list" element={<ProductCategoryList />}></Route>
          <Route path="products-category-add" element={<PaymentGatewayAdd />}></Route>
          <Route path="products-category-edit/:id" element={<PaymentGatewayAdd />}></Route>
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
