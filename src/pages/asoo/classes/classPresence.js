import React, { useEffect, useState } from "react";
import { FormIsLoading } from "../../../components/fouladyar/form";
import { useDispatch, useSelector } from "react-redux";
import { formStatics } from "./index";
import axios from "axios";
import { convertDate } from "../../../shared/shared";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Badge } from "reactstrap";
import { BlockHeadContent, BlockTitle } from "../../../components/block/Block";
import { makeStyles } from "@material-ui/styles";
import Table from "../../../components/fouladyar/table";
import { ConvertGregorianToJalali } from "../../../shared/convertGregorianToJalali";
import { toFarsiNumber } from "../../../shared/toFarsiNumber";
import { LoadingState } from "../../../components/fouladyar/loading-state/loadingState";
import { Field } from "../../../components/fouladyar/field/field";

function ClassPresence({ ...props }) {

  const classes = useStyles();
  const { courseId, classId } = useParams();
  const location = useLocation();
  const isEditing = location.pathname.includes("course-class-presence");
  const navigate = useNavigate();
  const path = "/Courses/CourseClass";
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isLoading, setIsloading] = useState(isEditing ? true : false);
  const [courseName, setCourseName] = useState("");
  const [className, setClassName] = useState("");
  const [classDate, setClassDate] = useState("");
  const [classDuration, setClassDuration] = useState("");
  const [alreadyCreated, setAlreadyCreated] = useState(false);
  const [data, setData] = useState([
    // {
    //   name: 'ارین عبدی',
    //   presence: true
    // },
    // {
    //   name: 'مجید رضوی',
    //   presence: true
    // },
    // {
    //   name: 'حسین گرامی',
    //   presence: true
    // },
    // {
    //   name: 'محسن میرحسینی',
    //   presence: true
    // },
  ]);

  useEffect(() => {
  }, []);

  async function loadData() {
    const courseStudentsResponse = await axios.get(`${process.env.REACT_APP_API_URL}/Courses/CourseStudent?page=1&limit=1000&sort=createdAt&sortType=ASC&course=${courseId}`, {
        headers: {
          "authorization": `bearer ${auth.token}`
        }
      }
    );

    const courseDataResponse = await axios.get(`${process.env.REACT_APP_API_URL}/Courses/CourseClass?courseClass=${classId}`, {
        headers: {
          "authorization": `bearer ${auth.token}`
        }
      }
    );

    console.log("users", courseStudentsResponse);
    console.log("class", courseDataResponse);
    const courseClass = courseDataResponse.data.data.courseClasses[0];
    if (courseStudentsResponse.data.statusCode === 200 && courseDataResponse.data.statusCode === 200) {
      if (courseStudentsResponse.data.data.CourseStudents.length > 0) {
        const firstPresence = courseClass.classPresences.length === 0;
        const items = courseStudentsResponse.data.data.CourseStudents.map(item => {
          //status
          // const s = firstPresence ? true : (courseDataResponse.data.data.classPresences.filter(j => j.userId === item.student.userId))[0].status
          const sPres = courseClass.classPresences.find(u=>u.student.userId === item.student.userId);
          return {
            // classPresences
            status: !sPres ? false : sPres.status, //courseClass.classPresences.length > 0 ? courseClass.classPresences.find(u=>u.student.userId === item.student.userId).status : false,
            isDisabled: !sPres ? true : false,
            courseClass: classId,
            student: item.student,
            userId: item.student.userId,
            name: item.student.fullname
          };
        });
        setData(items);
      }

      if (courseClass) {

        setClassName(courseClass.title);
        setClassDate(toFarsiNumber(ConvertGregorianToJalali(new Date(courseClass.course.startDate), false)));
        setCourseName(courseClass.course.title);
        setAlreadyCreated(courseClass.classPresences.length > 0);
      }

      setIsloading(false);
      return data;
    }


    return {};

  }


  useEffect(() => {
      loadData();
  }, []);




  function handleOnFieldChange(change) {
    setData((prevData) => ({
      ...prevData,
      ...change
    }));
  }

  async function handleOnSubmit() {
    console.log("form", data);
    const presenceData = data.map(item => {
      return {
        status: item.status,
        courseClass: parseInt(classId),
        student: item.userId
      }
    })

    const classDurationUpdate = {
      id: classId,
      duration: parseInt(classDuration)
    }



    const updateClassDurationResponse = await axios.put(`${process.env.REACT_APP_API_URL}/Courses/CourseClass`, classDurationUpdate,{
        headers: {
          "authorization": `bearer ${auth.token}`
        }
      }
    );


    console.log('updateClassDurationResponse',updateClassDurationResponse )
    if(updateClassDurationResponse.data.statusCode ===200){
      const submitClassPresenceResponse = await axios.post(`${process.env.REACT_APP_API_URL}/Courses/ClassPresence`, presenceData,{
          headers: {
            "authorization": `bearer ${auth.token}`
          }
        }
      );
      console.log('submitClassPresenceResponse',submitClassPresenceResponse )
      if(submitClassPresenceResponse.data.statusCode === 201){
        navigate(`/course-class-list`)
      }
    }



  }

  const classPresenceTableStructure = [
    {
      title: "نام دانشجو",
      slug: "name"
    },
    {
      title: "کد ملی",
      // slug: 'nationalCode',
      slug: "student.nationalCode",
      useFarsiNumber: true
    },
    {
      title: "شماره تماس",
      // slug: 'phoneNumber',
      slug: "student.phoneNumber",
      useFarsiNumber: true
    },
    {
      title: "وضعیت حضور",
      slug: "status",


      useSelect: true,
      pickIdFrom: "student.userId",
      options: [
        { label: "حاضر", value: true },
        { label: "غایب", value: false }
      ],
      defaultValue: [{ label: "حاضر", value: true }],
      placeholder: ""
    },
    {
      title: "",
      slug: "",
      useFarsiNumber: true
    }

  ];


  return (

    <>
      <div>
        <div className="add-student-to-class-style">


          <div className="nk-content padding-top">
            <BlockHeadContent>
              <BlockTitle tag="h5">حضور و غیاب</BlockTitle>
              <p> در این صفحه قادر خواهید بود تا اقدام به حضور و غیاب دانشجویان دوره، برای کلاس عنوان شده کنید. دقت
                کنید که به صورت پیشفرض تمام دانشجویان حاضر عنوان شده است، تنها دانشجویان غایب را تغییر داده و دکمه
                ثبت حضور و غیاب را بزنید تا حضور و غیاب تایید شود. </p>
            </BlockHeadContent>
          </div>


          <div className="row nk-content padding-top">
            <div className="col-sm-auto card-head d-flex flex-row justify-content-start m-0">
              <h5 className="card-title">کلاس {className} - تاریخ  {classDate} </h5>
              {
                alreadyCreated
                  ?
                  <Badge className="me-1" color="success">
                    <div className={classes.badgeFont}>
                      ثبت شده
                    </div>
                  </Badge>
                  :
                  <Badge className="me-1" color="danger">
                    <div className={classes.badgeFont}>
                      ثبت نشده
                    </div>
                  </Badge>

              }
            </div>

            <div class="col-sm d-flex">
              <div class="form-group col-12 d-flex flex-row justify-content-end p-2 ">
                <div className="row">
                  <div className="col-sm-auto p-0">
                    <Field
                      className="pt-0 pb-0 duration-field "
                      id={"duration"}
                      name={"duration"}
                      placeholder={"مدت زمان کلاس (دقیقه)"}
                      type={"number"}
                      value={classDuration}
                      onChange={(e) => {
                        setClassDuration(e)
                      }}
                    />
                  </div>
                  <div className="col-sm-auto">
                    <button
                      onClick={async ()=>{await handleOnSubmit()}}
                      disabled={alreadyCreated || isLoading}
                      className={`btn btn-sm btn-success justify-content-center ${classes.buttonFont}`}
                    >
                      ثبت حضور و غیاب
                    </button></div>
                </div>
              </div>
            </div>
          </div>

          {
            isLoading ? <LoadingState/> :
              <Table
                hideActions={true}
                hidePagination={true}
                tableData={data || []}
                tableStructure={classPresenceTableStructure}
                onItemPerPageChange={(itemPerPage, currentPage) => {
                  setPagination({
                    ...pagination,
                    itemPerPage: itemPerPage,
                    currentPage: currentPage,
                    lastUpdateBy: "pagination"
                  });
                }}
                onCurrentPageChange={(currentPage) => {
                  setPagination({ ...pagination, currentPage: currentPage, lastUpdateBy: "pagination" });
                }}
                onFilterSubmit={(e) => {
                  d;
                  setFilter(e);
                }}
                onEveryGridButtonClick={({ slug, id, value }) => {
                  // eventSelector(slug, id);
                  if (slug === "status") {
                    setData(
                      data.map(item => {
                        if(item.userId === id){
                          return {
                            ...item,
                            status: value
                          }
                        }

                        return item
                      })
                    )
                  }
                }}
              />
          }



        </div>
      </div>
    </>


  );
};

export default ClassPresence;


const useStyles = makeStyles((theme) => ({
    rowItem: {
      margin: "0px"
    },
    buttonFont: {
      fontFamily: "iransans, serif !important",
      fontWeight: "400",
      letterSpacing: "0px",
      fontSize: 13
    },
    badgeFont: {
      fontFamily: "iransans, serif !important",
      fontWeight: "500",
      letterSpacing: "0px",
      fontSize: 13
    },
    addStudentToCourse: {
      border: "1px solid #dde4f7",
      padding: "6px 0px",
      margin: "9px 0px",
      boxShadow: "0px 1px 2px -2px #ccc",
      borderRadius: "5px",
      background: "#f7f8fb"
    }

  })
);
