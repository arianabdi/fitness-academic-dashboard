import React, { useEffect, useState } from "react";
import Form, { FormIsLoading } from "../../../components/fouladyar/form";
import { useDispatch, useSelector } from "react-redux";
import { selectPending } from "../../../redux/store/services/general/store";
import { formStructure, formStatics } from "./index";
import axios from "axios";
import { convertDate } from "../../../shared/shared";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getItemById } from "../../../redux/store/services/asoo/classes/store/class-actions";
import { DataTableBody } from "../../../components/table/DataTable";
import { Col } from "../../../components/grid/Grid";
import { Card } from "reactstrap";

function ClassAdd ({ ...props }) {

  const { id } = useParams();
  const location = useLocation();
  const isEditing = location.pathname.includes('course-class-edit');
  const navigate = useNavigate();
  const path = '/Courses/CourseClass'
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isLoading, setIsloading] = useState(isEditing ? true : false)
  const [data, setData] = useState({
    "title": "",
    "status": true,
    "date": "",
    "time": null,
    "teacherPrice": null,
    "course": null,
    "duration": 0,
    "teacher": null
  });

  async function loadData() {
    const res = await dispatch(getItemById(id));
    if(res.statusCode === 200){

      console.log('______response', res.data)
      setData((prevData) => ({
        ...prevData,
        id: res.data.id,
        title: res.data.title,
        teacherPrice: res.data.teacherPrice,
        date: new Date(res.data.date),
        course: res.data.course.id,
        teacher: res.data.teacher.id,
      }));
      setIsloading(false)
      return data;
    }

    return {}

  }


  useEffect(() => {


    console.log('teacher changed', data.student)
    async function getDefaultTeacherPrice(){
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/Settings/Setting?slug=courseTuitionPricePerHour`,
        {
          headers: {
            "authorization": `bearer ${auth.token}`
          }
        }
      );

      console.log('getDefaultTeacherPrice', parseInt(res.data.data.setting[0].value))

      if(res.data.statusCode === 200){
        setData(prevState => ({
            ...prevState,
            teacherPrice: parseInt(res.data.data.setting[0].value) || 0
          })
        )
      }
    }

    getDefaultTeacherPrice()


    if(isEditing)
      loadData();
  }, []);



  async function onCreate() {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/Courses/CourseClass`,
        {
          ...data,
          "date": convertDate(data.date),
        }, {
          headers: {
            'authorization': `bearer ${auth.token}`
          }
        }
      );

      console.log('res', res)
      if(res.data.statusCode === 201)
        navigate(`/course-class-list`);


    } catch (e) {
      console.log("Error: ", e);
    }
  }

  async function onUpdate() {
    try {
      const res = await axios.put(`${process.env.REACT_APP_API_URL}${path}`,
        {
          ...data,
          "date": convertDate(data.date),
        }, {
          headers: {
            "authorization": `bearer ${auth.token}`
          }
        }
      );

      if(res.data.statusCode === 200)
        navigate(`/course-class-list`);

    } catch (e) {
      console.log("Error: ", e);
    }
  }




  function handleOnFieldChange(change){
    setData((prevData) => ({
      ...prevData,
      ...change
    }));
    console.log('setValue', change)
  }
 async function handleOnSubmit(){
   console.log("form", data);
   !isEditing ? await onCreate() : await onUpdate();
  }

  return (

    <>
      {
        isLoading ?
          <FormIsLoading
            statics={formStatics}
            isEditing={isEditing}
          />
          :
        <Form
          form={data}
          isEditing={isEditing}
          fields={formStructure}
          statics={formStatics}
          submitButtonText={"ایجاد کلاس"}
          onFieldChange={handleOnFieldChange}
          onFormSubmit={handleOnSubmit}
        />
      }
    </>


  );
};

export default ClassAdd;
