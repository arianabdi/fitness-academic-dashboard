import React, { useState } from "react";
import { toFarsiNumber } from "../../../shared/toFarsiNumber";
import { ConvertDateToCalendarString } from "../../../shared/convertDateToCalendarString";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AudienceOverview from "./charts/audience-overview/AudienceOverview";
import { PreviewAltCard } from "../../../components/preview/Preview";
import { Col } from "../../../components/grid/Grid";

const AsooHome = () => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [dd, setdd] = useState("30");


  const [traffic, setTraffic] = useState("30");
  const TrafficChannelDoughnutData = {
    labels: ["واحد مطالبات", "تیم پشتیبانی", "واحد فروش", "واحد مدیریت"],
    dataUnit: "People",
    legend: false,
    datasets: [
      {
        borderColor: "#fff",
        backgroundColor: ["#798bff", "#b8acff", "#ffa9ce", "#f9db7b"],
        data: [4705, 1509, 482, 1000]
      }
    ]
  };


  const [recentActivity, setRecentActivity] = useState([
    {
      title: "ایمیل جدید به fouladyar-support@test.com ارسال شد",
      color: "bg-success",
      createdAt: "2023-08-24T13:31:15.516Z"
    },
    {
      title: "ایجاد کاربر جدید با نام mohammad",
      color: "bg-warning",
      createdAt: "2023-08-24T13:31:15.516Z"
    },
    {
      title: "کاربر simin-1 نقش توسعه دهنده را ایجاد کرد",
      color: "bg-pink",
      createdAt: "2023-08-24T13:31:15.516Z"
    },
    {
      title: "تنظیمات چت تغییر کرد",
      color: "bg-azure",
      createdAt: "2023-08-24T13:31:15.516Z"
    },
    {
      title: "ایجاد کاربر جدید با نام mohammad",
      color: "bg-warning",
      createdAt: "2023-08-24T13:31:15.516Z"
    }
  ]);

  function HeadingSegment() {
    return (
      <div className="col-12">
        <div className="card card-bordered home-toolbox">
          <div className="card-inner">
            <div className="card-title mb-4">
              <h3 className="title" style={{
                  fontSize: "29px",
                  padding: "10px 0px"
              }}>به داشبورد ادمین مدرسه پرواز آسو خوش آمدید</h3>
            </div>
            <div className="row g-gs">
              <div className="col-xxl-3">
                <div className="fake-class">
                  <h5 className="title">بروزرسانی</h5>
                  <div className="nk-block-des text-soft">
                    <p>از طریق دکمه زیر اقدام به درخواست جهت بروزرسانی داشبورد خود کنید</p>
                  </div>
                  <a href="#" className="btn btn-primary btn-lg mt-4 tool-box-submit-btn">بروزرسانی</a>
                </div>
              </div>
              <div className="col-sm-6 col-md-4 col-xxl-3">
                <div className="fake-class">
                  <h5 className="title">فرم ها</h5>
                  <ul className="link-list is-compact pb-0">
                    <li><a href="/#/course-add"><em
                      className="icon ni ni-file-text"></em><span>ایجاد دوره جدید</span></a>
                    </li>
                    <li><a href="/#/course-class-add"><em
                      className="icon ni ni-property-add"></em><span>ایجاد کلاس جدید</span></a>
                    </li>
                    <li><a href="/#/flight-add"><em
                      className="icon ni ni-property-add"></em><span>ایجاد پرواز جدید</span></a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-6 col-md-4 col-xxl-3">
                <div className="fake-class">
                  <h5 className="title">دسترسی سریع</h5>
                  <ul className="link-list is-compact pb-0">
                    <li><a href="/#/plane-list"><em className="icon ni ni-edit-fill"></em><span>۸ هواپیما</span></a>
                    </li>
                    <li><a href="/#/student-list"><em
                      className="icon ni ni-user"></em><span>۱۴ دانشجو</span></a>
                    </li>
                    <li><a href="/#/course-list"><em
                      className="icon ni ni-file-text"></em><span>۲۵ دوره</span></a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-6 col-md-4 col-xxl-3">
                <div className="fake-class">
                  <h5 className="title">عملیات دیگر</h5>
                  <ul className="link-list is-compact pb-0">
                    <li><a href="#"><em
                      className="icon ni ni-grid-fill"></em><span>مدیریت منوها</span></a></li>
                    <li><a href="#"><em
                      className="icon ni ni-comments"></em><span>تنظیمات قالب</span></a></li>
                    <li><a href="#"><em
                      className="icon ni ni-more-h"></em><span>مشاهده فعالیت ها</span></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function QuickDraft() {
    return (
      <div className="col-12 col-xxl-6">
        <div className="card card-bordered h-100">
          <div className="card-inner border-bottom">
            <div className="card-title-group g-2">
              <div className="card-title card-title-sm">
                <h6 className="title">ارسال تیکت</h6>
              </div>
            </div>
          </div>
          <div className="card-inner">
            <form action="#">
              <div className="row g-gs align-center">
                <div className="col-12">
                  <div className="form-group">
                    <div className="form-control-wrap">
                      <label className="form-label" htmlFor="title">عنوان</label>
                      <input type="text" className="form-control" id="title" placeholder="عنوان" />
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-control-wrap">
                    <label className="form-label" htmlFor="content">متن</label>
                    <textarea className="form-control form-control-sm no-resize" id="content"
                              placeholder="متن تیکت را وارد کنید"></textarea>
                  </div>
                  <div className="form-group mt-4">
                    <button type="submit" className="btn btn-primary">ارسال تیکت</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  function RecentActivity() {
    return (
      <div className="col-md-6 col-xxl-6 recent-activity">
        <div className="card card-bordered h-100">
          <div className="card-inner border-bottom">
            <div className="card-title-group g-2">
              <div className="card-title card-title-sm">
                <h6 className="title">فعالیت های اخیر</h6>
              </div>
            </div>
          </div>

          <ul className="nk-activity">
            {
              recentActivity.map((item, index) => {
                return (
                  <li key={`recent-activity-index-${index}`} className="nk-activity-item">
                    <div className={`nk-activity-media user-avatar ${item.color}`}><img src="./images/avatar/c-sm.jpg"
                                                                                        alt="" /></div>
                    <div className="nk-activity-data">
                      <div className="label">{item.title}</div>
                      <span
                        className="time">{toFarsiNumber(ConvertDateToCalendarString(item.createdAt.split(".")[0]))}</span>
                    </div>
                  </li>
                );
              })
            }
          </ul>
        </div>

      </div>
    );
  }

  return (
    <React.Fragment>
      <div className="nk-content ">
        <div className="container-fluid">
          <div className="nk-content-inner">
            <div className="nk-content-body">
              <div className="nk-block">
                <div className="row g-gs">
                  <HeadingSegment />
                  {/*<RecentActivity />*/}
                  {/*<Col lg="6" sm="12">*/}
                  {/*  <PreviewAltCard className="h-100 card-bordered">*/}
                  {/*    <AudienceOverview/>*/}
                  {/*  </PreviewAltCard>*/}
                  {/*</Col>*/}
                  {/*<QuickDraft />*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>

  );
};

export default AsooHome;
