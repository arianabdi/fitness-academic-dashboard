import React, { useEffect, useState } from "react";
import { FormIsLoading } from "../../../components/fouladyar/form";
import { useDispatch, useSelector } from "react-redux";
import { formStatics } from "./index";
import axios from "axios";
import { convertDate } from "../../../shared/shared";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Col, Row } from "../../../components/grid/Grid";
import { BlockHeadContent, BlockTitle } from "../../../components/block/Block";
import { Field } from "../../../components/fouladyar/field/field";
import { makeStyles } from "@material-ui/styles";
import { Icon } from "../../../components/Component";
import "./styles.css";
import Table from "../../../components/fouladyar/table";
import { LoadingState } from "../../../components/fouladyar/loading-state/loadingState";

function CourseStudents({ ...props }) {

  const classes = useStyles();
  const { courseId } = useParams();
  const location = useLocation();
  const isEditing = location.pathname.includes("course-students");
  const navigate = useNavigate();
  const path = "/Courses/CourseClass";
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isLoading, setIsloading] = useState(isEditing ? true : false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [coursePrice, setCoursePrice] = useState(null);
  const [data, setData] = useState([
  ]);

  const [searchInputText, setSearchInputText] = useState("");
  const [searchResults, setSearchResults] = useState([]);


  async function loadData() {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/Courses/CourseStudent?sort=createdAt&sortType=ASC&course=${courseId}`, {
        headers: {
          "authorization": `bearer ${auth.token}`
        }
      }
    );

    if (res.data.statusCode === 200) {
      if (res.data.data.CourseStudents.length > 0) {
        const items = res.data.data.CourseStudents.map(item => {
          return {
            id: item.id,
            firstName: "",
            fullname: item.student.fullname,
            student: item.student,
            lastName: "",
            user: { id: item.student.userId },
            userId: item.student.userId

          };
        });
        setData(items);
      }
      setIsloading(false);
      return data;
    }

    return {};

  }


  useEffect(() => {
    if (isEditing)
      loadData();
  }, []);


  async function onUpdate() {
    try {
      const res = await axios.put(`${process.env.REACT_APP_API_URL}${path}`,
        {
          ...data,
          "date": convertDate(data.date)
        }, {
          headers: {
            "authorization": `bearer ${auth.token}`
          }
        }
      );

      if (res.data.statusCode === 200)
        navigate(`/course-class-list`);

    } catch (e) {
      console.log("Error: ", e);
    }
  }

  async function onSearch() {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/Persons/Search/Student?firstName=${searchInputText}`,
        {
          headers: {
            "authorization": `bearer ${auth.token}`
          }
        }
      );


      if (res.data.statusCode === 200) {
        //get default course price
        const defaultCoursePriceResponse = await axios.get(`${process.env.REACT_APP_API_URL}/Courses/Course/${courseId}`,
          {
            headers: {
              "authorization": `bearer ${auth.token}`
            }
          }
        );

        if(defaultCoursePriceResponse.data.statusCode === 200){
          setCoursePrice(defaultCoursePriceResponse.data.data.studentPrice)
          setSearchResults(res.data.data.results.map(item =>{
            return {
              ...item,
              price: coursePrice
            }
          }));

        }else{

          setSearchResults(res.data.data.results);
        }
      }

    } catch (e) {
      console.log("Error: ", e);
    }
  }


  async function handleOnSubmit() {
    try {
      const updatedData = data.map(i => {
        return {
          price: 1,
          course: courseId,
          student: i.userId
        };
      });
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/Courses/CourseStudent`,
        updatedData,
        {
          headers: {
            "authorization": `bearer ${auth.token}`
          }
        }
      );


      if (res.data.statusCode === 200) {
        setSearchResults(res.data.data.results);
      }

    } catch (e) {
      console.log("Error: ", e);
    }
  }

  async function addUserToCourse(item) {
    try {
      if ((data.filter(i => i.userId === item.userId)).length === 0) {
        setIsProcessing(true);
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/Courses/CourseStudent`,

            {
              price: item.price,
              course: parseInt(courseId),
              student: item.userId
            }

          , {
            headers: {
              "authorization": `bearer ${auth.token}`
            }
          }
        );


        if (res.data.statusCode === 204 || res.data.statusCode === 200 || res.data.statusCode === 201) {
          setData(prevState => [
            ...prevState,
            {
              ...item,
              id: res.data.data.id,
              student: {
                nationalCode: item.nationalCode,
                phoneNumber: item.mobilePhoneNumber
              }
            }
          ]);
        }
        setIsProcessing(false);
      }
    } catch (e) {
      console.log("Error", e);
      setIsProcessing(false);
    }

  }

  async function removeUserFromCourse(item) {
    console.log('remove', item)
    try {
      setIsProcessing(true);
      const res = await axios.delete(`${process.env.REACT_APP_API_URL}/Courses/CourseStudent/${item.id}`, {
          headers: {
            "authorization": `bearer ${auth.token}`
          }
        }
      );


      if (res.data.statusCode === 204) {
        setData(prevState => [
          ...prevState.filter(i => i.id !== item.id)
        ]);
      }

      setIsProcessing(false);
    } catch (e) {
      console.log("Error", e);

      setIsProcessing(false);
    }

  }

  function StudentSearchResultItem({ item }) {
    return (
      <Col lg={6} md={6} sm={12} className={`p-1 pt-0 pb-0`}>
        <div className={`p-1 ${classes.addStudentToCourse}`}>
          <button disabled={isProcessing} onClick={async () => {
            await addUserToCourse(item);
          }} className="btn m-1 mt-0 mb-0 btn-xs btn-success pt-1 pb-1">
            <Icon name="plus"></Icon>
          </button>
          {item.fullname}
        </div>
      </Col>
    );
  }

  function AddedStudentsListItem({ item }) {
    return (
      <Col lg={6} md={6} sm={12} className={`p-1 pt-0 pb-0`}>
        <div className={`p-1 ${classes.addStudentToCourse}  d-flex flex-row justify-content-between`}>
          {item.fullname}
          <button disabled={isProcessing} onClick={async () => {
            await removeUserFromCourse(item);
          }} className="btn m-1 mt-0 mb-0 btn-xs btn-danger pt-1 pb-1">
            <Icon name="cross"></Icon>
          </button>
        </div>
      </Col>
    );
  }

  function loadStudentList() {
    return (
      <Row>
        {
          data.length === 0 ? "" :
            data.map(item => {
              return (
                <AddedStudentsListItem item={item} />
              );
            })
        }
      </Row>

    );
  }

  function SearchResultItems() {
    return (
      <Row>
        {
          searchResults.map(item => {
            return (
              <StudentSearchResultItem item={item} />
            );
          })
        }
      </Row>

    );
  }

  function SearchInput() {
    return (
      <div className="nk-content" style={{marginBottom: "-60px"}}>
        <Col lg={12} md={12} sm={12}>
          <div className={`p-1 w-100 ${classes.addStudentToCourse}  d-flex flex-row justify-content-between`}>


            <Field
              id={"username"}
              name={"username"}
              placeholder={"لطفا نام کاربری خود را وارد کنید"}
              type={"text"}
              onChange={(e) => {
                setSearchInputText(e);
              }}
              defaultValue={searchInputText}
            />
            <button onClick={async () => {
              await onSearch();
            }} className="btn m-1 p-3 pt-0 pb-0 mt-0 mb-0 btn-xs btn-secondary pt-1 pb-1">
              <Icon name="search"></Icon>
            </button>
          </div>
        </Col>

      </div>

    );
  }


  const [pagination, setPagination] = useState({
    itemPerPage: 7,
    currentPage: 1,
    totalItems: 0,
    lastUpdateBy: ""
  });


  const searchStudentTableStructure = [
    {
      title: "نام دانشجو",
      slug: "fullname"
    },
    {
      title: "کد ملی",
      // slug: 'nationalCode',
      slug: "systemCode",
      useFarsiNumber: true
    },
    {
      title: "شماره تماس",
      // slug: 'phoneNumber',
      slug: "mobilePhoneNumber",
      useFarsiNumber: true
    },
    {
      title: "هزینه دوره",
      slug: "price",

      useField: true,
      type: 'text',
      pickIdFrom: "userId"
    },
    {
      title: "افزودن به کلاس",
      slug: "add-to-class",

      useButton: true,
      buttonColor: "success",
      buttonTitle: "افزودن دانشجو",
      pickIdFrom: "userId"
    }
  ];


  const courseStudentsTableStructure = [
    {
      title: "نام دانشجو",
      slug: "fullname"
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
      title: "حذف از کلاس",
      slug: "remove-from-course",

      useButton: true,
      buttonColor: "danger",
      buttonTitle: "حذف دانشجو",
      pickIdFrom: "userId"
    }
  ];

  async function eventSelector(slug, id, value) {
    switch (slug) {
      case "price":
        await setSearchResults(searchResults.map(item => {
          if(item.userId === id) {
            return {
              ...item,
              price: value
            }
          }
          return item
        }))
        return;
      case "add-to-class":
        await addUserToCourse(searchResults.filter(item => item.userId === id)[0]);
        return;
      case "remove-from-course":
        await removeUserFromCourse(data.filter(item => id === item.userId)[0]);
        return;
      default:
        return;

    }
  }

  return (

    <>
      <div>
        <div className="add-student-to-class-style">

          <div className="nk-content padding-top">
            <BlockHeadContent>
              <BlockTitle tag="h5">جستجو دانشجو</BlockTitle>
              <p>در افزودن دانشجویان دقت کافی را انجام دهید، زیرا با اضافه شدن دانشجو به کلاس، فاکتور جدیدی به حساب
                وی اضافه خواهد شد و از کیف پول کاربر پول کسر خواهد شد. دقت کنید حذف تراکنش از طریق سوپر ادمین امکان
                پذیر خواهد بود.</p>
            </BlockHeadContent>
          </div>


          {SearchInput()}

          {
            isLoading ? <LoadingState/> :
              <Table
                hideActions={true}
                tableData={searchResults || []}
                pagination={pagination}
                tableStructure={searchStudentTableStructure}
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
                onEveryGridButtonClick={async ({ slug, id, value }) => {
                  await eventSelector(slug, id, value);
                }}
              />
          }


          <div className="nk-content padding-top">
            <BlockHeadContent>
              <BlockTitle tag="h5">دانشجویان اضافه شده</BlockTitle>
            </BlockHeadContent>
          </div>

          {
            isLoading ? <LoadingState/> : <Table
              hideActions={true}
              hidePagination={true}
              tableData={data || []}
              pagination={pagination}
              tableStructure={courseStudentsTableStructure}
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
              onEveryGridButtonClick={({ slug, id }) => {
                eventSelector(slug, id);
              }}
            />
          }

        </div>
      </div>
    </>


  );
};

export default CourseStudents;


const useStyles = makeStyles((theme) => ({
    rowItem: {
      margin: "0px"
    },
    buttonFont: {
      fontFamily: "iransans, serif !important",
      fontWeight: "700",
      letterSpacing: "0px",
      fontSize: 15
    },
    addStudentToCourse: {
      border: "1px solid #dde4f7",
      padding: "6px 0px",
      margin: "9px 0px",
      boxShadow: "0px 1px 2px -2px #ccc",
      borderRadius: "5px",
      background: "#f7f8fb"
    },
    noMargin: {
      marginBottom: "0px !important"
    }


  })
);
