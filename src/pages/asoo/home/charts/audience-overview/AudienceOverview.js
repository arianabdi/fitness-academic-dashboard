import React, { useState } from "react";
import { AudienceLineChart } from "../analytics/AnalyticsCharts";
import { Icon } from "../../../../../components/Component";


const AudienceOverview = () => {
  const [auOverview, setAuOverview] = useState("month-1");
  return (
    <React.Fragment>
      <div className="card-title-group pb-3 g-2">
        <div className="card-title card-title-sm">
          <h6 className="title">گزارش هزینه ها</h6>
          <p>بررسی اجمالی هزینه ها از قبیل خدمات پرواز، فرودگاهی و ... .</p>
        </div>
        <div className="card-tools shrink-0 d-none d-sm-block">
          {/*<ul className="nav nav-switch-s2 nav-tabs bg-white">
            <li className="nav-item">
              <a
                href="#navitem"
                className={auOverview === "day-7" ? "nav-link active" : "nav-link"}
                onClick={(e) => {
                  e.preventDefault();
                  setAuOverview("day-7");
                }}
              >
                7 D
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#navitem"
                className={auOverview === "month-1" ? "nav-link active" : "nav-link"}
                onClick={(e) => {
                  e.preventDefault();
                  setAuOverview("month-1");
                }}
              >
                1 M
              </a>
            </li>
          </ul>*/}
        </div>
      </div>
      <div className="analytic-ov">
        <div className="analytic-data-group analytic-ov-group g-2">
          <div className="analytic-data analytic-ov-data">
            <div className="title">خدمات فرودگاهی</div>
            <div className="amount"> ۱۲,۰۰۰,۰۰۰</div>
            <div className="change up">
              <Icon name="arrow-long-up"></Icon>۲۰٪ افزایش
            </div>
          </div>
          <div className="analytic-data analytic-ov-data">
            <div className="title">پرواز ها</div>
            <div className="amount">۱۶,۸۸۰,۰۰۰</div>
            <div className="change up">
              <Icon name="arrow-long-up"></Icon> ۵٪ افزایش
            </div>
          </div>
          <div className="analytic-data analytic-ov-data">
            <div className="title">کلاس ها</div>
            <div className="amount">۶,۸۸۰,۰۰۰</div>
            <div className="change down">
              <Icon name="arrow-long-down"></Icon> ۲٪ کاهش
            </div>
          </div>
        </div>
        <div className="analytic-ov-ck">
          <AudienceLineChart state={auOverview} />
        </div>
        <div className="chart-label-group ms-5">
          <div className="chart-label">۲۰ آبان</div>
          <div className="chart-label d-none d-sm-block"> ۱۵ آبان</div>
          <div className="chart-label">  ۱۲ آبان</div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default AudienceOverview;
