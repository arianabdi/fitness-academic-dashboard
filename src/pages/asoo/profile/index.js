import React, { useEffect, useMemo, useState } from "react";
import Table from "../../../components/fouladyar/table";
import { useDispatch, useSelector } from "react-redux"
import { ConvertFilterObjectToUrlParam } from "../../../redux/store/shared/shared";
import { selectPending } from "../../../redux/store/services/general/store";
import { getItems } from "../../../redux/store/services/asoo/services/store";
import { useLocation, useParams } from "react-router-dom";
import { toFarsiNumber } from "../../../shared/toFarsiNumber";
import axios from "axios";
import toast from "react-hot-toast";
import { LoadingState } from "../../../components/fouladyar/loading-state/loadingState";
import { EmptyState } from "../../../components/fouladyar/empty-state/emptyState";
import { LuUser } from "react-icons/lu";



const Profile = ({ }) => {
  const { role, id } = useParams();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isApplyingFilter, setIsApplyingFilter] = useState(false);
  const [pagination, setPagination] = useState({
    itemPerPage: 7,
    currentPage: 1,
    totalItems: 0,
    lastUpdateBy: ''
  })


  const [user, setUser] = useState()




  useEffect(()=>{
    async function loadProfile(){
      try {
        setIsLoading(true)
        const res = await axios.get(`${process.env.REACT_APP_API_URL}${role === 'me' ? `/User/User/${id}` : `/Persons/${role}/${id}`}`, {
          headers: { "authorization": `bearer ${auth.token}` }
        });
        if (res.status === 200 || res.status === 201) {
          setUser(res.data.data)

        }

        setIsLoading(false)
      }catch (e){
        setIsLoading(false)
        console.log('Error: ', e)
        toast.error(e.response.data.error || (e.response.data.message || e.message))
      }
    }

    loadProfile()
  }, [])







  function Translate(key){
    switch (key){
      case 'fullname':
        return 'نام و نام خانوادگی';
      case 'nationalCode':
        return 'کد ملی';
      case 'systemCode':
        return 'کد کاربری';
      case 'lastName':
        return 'نام خانوادگی';
      case 'firstName':
        return 'نام';
      case 'type':
        return 'نوع';
      case 'deletedAt':
        return 'تاریخ حذف';
      case 'updatedAt':
        return 'تاریخ آخرین بروزرسانی';
      case 'createdAt':
        return 'تاریخ ایجاد';
      case 'id':
        return 'شناسه';
      case 'role':
        return 'نقش';
      case 'address':
        return 'آدرس';
      case 'telePhoneNumber':
        return 'تلفن ثابت';
      case 'mobilePhoneNumber':
        return 'شماره موبایل';
      case 'email':
        return 'پست الکترونیک';
      case 'licenceDate':
        return 'تاریخ گواهینامه';
      case 'licenceNumber':
        return 'شماره گواهینامه';
      case 'birthDate':
        return 'تاریخ تولد';
      case 'medicalDate':
        return 'تاریخ مدیکال';
      case 'medicalNumber':
        return 'شماره مدیکال';
      default:
        return key;

    }
  }




  function Header({title, description}){
    return(
      <div class="nk-block-head-content">
        <h3 class="nk-block-title page-title">{title}</h3>
        <div class="nk-block-des text-soft">
          <p>{description}</p>
        </div>
      </div>
    )
  }



  function ProfileInfo(){

    function ProfileInfoItem({title, value}){
      return(
        <div class="col-sm-6 col-md-6 col-lg-4">
          <span class="sub-text">{Translate(title)}:</span>
          <span>{toFarsiNumber(value || '-')}</span>
        </div>
      )
    }

    return(
      <div class="card card-bordered">
        <div class="card-inner-group">
          <div class="card-inner">
            <div class="user-card user-card-s2">
              <div class="user-avatar lg bg-primary">
                <img src={user.personalImage} alt=""/>
              </div>
              <div class="user-info">
                <div class="badge bg-light rounded-pill ucap">{user.role}</div>
                <h5>{`${user.firstName} ${user.lastName}`}</h5>
                <span class="sub-text">{user.email}</span>
              </div>
            </div>
          </div>

          {/*<div class="card-inner card-inner-sm">*/}
          {/*  <ul class="btn-toolbar justify-center gx-1">*/}
          {/*    <li><a href="#" className="btn btn-trigger btn-icon"><em*/}
          {/*      class="icon ni ni-shield-off"></em></a></li>*/}
          {/*    <li><a href="#" className="btn btn-trigger btn-icon"><em class="icon ni ni-mail"></em></a>*/}
          {/*    </li>*/}
          {/*    <li><a href="#" className="btn btn-trigger btn-icon"><em*/}
          {/*      class="icon ni ni-bookmark"></em></a></li>*/}
          {/*    <li><a href="#" className="btn btn-trigger btn-icon text-danger"><em*/}
          {/*      class="icon ni ni-na"></em></a></li>*/}
          {/*  </ul>*/}
          {/*</div>*/}

          {/*<div class="card-inner">*/}
          {/*  <div class="row text-center">*/}
          {/*    <div class="col-4">*/}
          {/*      <div class="profile-stats">*/}
          {/*        <span class="amount">23</span>*/}
          {/*        <span class="sub-text">Total Order</span>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*    <div class="col-4">*/}
          {/*      <div class="profile-stats">*/}
          {/*        <span class="amount">20</span>*/}
          {/*        <span class="sub-text">Complete</span>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*    <div class="col-4">*/}
          {/*      <div class="profile-stats">*/}
          {/*        <span class="amount">3</span>*/}
          {/*        <span class="sub-text">Progress</span>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}


          <div class="card-inner">
            <div class="row g-3">
              {
                Object.keys(user).map(key => {
                  return(
                    <ProfileInfoItem title={key} value={user[key]}/>
                  )
                })
              }
              {/*<div class="col-sm-6 col-md-4 col-lg-12">*/}
              {/*  <span class="sub-text">User ID:</span>*/}
              {/*  <span>UD003054</span>*/}
              {/*</div>*/}
              {/*<div class="col-sm-6 col-md-4 col-lg-12">*/}
              {/*  <span class="sub-text">Billing Email:</span>*/}
              {/*  <span>billing@softnio.com</span>*/}
              {/*</div>*/}
              {/*<div class="col-sm-6 col-md-4 col-lg-12">*/}
              {/*  <span class="sub-text">Billing Address:</span>*/}
              {/*  <span>551 Swanston Street, Melbourne <br /> Victoria 3053 Australia</span>*/}
              {/*</div>*/}
              {/*<div class="col-sm-6 col-md-4 col-lg-12">*/}
              {/*  <span class="sub-text">Language:</span>*/}
              {/*  <span>English, France</span>*/}
              {/*</div>*/}
              {/*<div class="col-sm-6 col-md-4 col-lg-12">*/}
              {/*  <span class="sub-text">Last Login:</span>*/}
              {/*  <span>15 Feb, 2019 01:02 PM</span>*/}
              {/*</div>*/}
              {/*<div class="col-sm-6 col-md-4 col-lg-12">*/}
              {/*  <span class="sub-text">KYC Status:</span>*/}
              {/*  <span class="lead-text text-success">Approved</span>*/}
              {/*</div>*/}
              {/*<div class="col-sm-6 col-md-4 col-lg-12">*/}
              {/*  <span class="sub-text">Register At:</span>*/}
              {/*  <span>Nov 24, 2019</span>*/}
              {/*</div>*/}
            </div>
          </div>
        </div>
      </div>
    )
  }


  return (
    <React.Fragment>

      <div class="nk-content ">
        <div class="container">
          <div class="nk-content-inner">
            <div class="nk-content-body">
              <div class="nk-block-head nk-block-head-sm">
                <div class="nk-block-between g-3">
                  <Header title={"پروفایل کاربری"} description={""}/>
                </div>
              </div>
              <div class="nk-block">
                <div class="row g-gs">
                  <div class="col-lg-12 col-xl-12 col-xxl-12">
                    {
                      isLoading ? <LoadingState/> : (
                        !user ? <EmptyState
                          icon={<LuUser size={38} color={"#737373"}/>}
                          title={"کاربر مورد نظر یافت نشد"}
                          content={"کاربر مورد نظر یافت نشد. لطفا مجددا تلاش کرده یا به پشتیبانی اطلاع دهید"}/> :
                          <ProfileInfo/>
                      )
                    }
                  </div>
                  {/*<div class="col-lg-8 col-xl-8 col-xxl-9">*/}
                  {/*  <ProfileGrid/>*/}
                  {/*</div>*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Profile;
