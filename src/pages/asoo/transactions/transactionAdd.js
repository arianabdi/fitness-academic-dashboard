import React, { useEffect, useState } from "react";
import Form, { FormIsLoading } from "../../../components/fouladyar/form";
import { useDispatch, useSelector } from "react-redux";
import { selectPending } from "../../../redux/store/services/general/store";
import { formStructure, formStatics } from "./index";
import axios from "axios";
import { convertDate } from "../../../shared/shared";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getItemById } from "../../../redux/store/services/asoo/courses/store/course-actions";


const CourseAdd = ({ ...props }) => {

  const { id } = useParams();
  const location = useLocation();
  const isEditing = location.pathname.includes('course-edit');
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const path = '/Courses'
  const dispatch = useDispatch();
  const [isLoading, setIsloading] = useState(isEditing ? true : false)
  const [data, setData] = useState({
    "title": "",
    "startDate": "",
    "totalHours": null,
    "status": true,
    "defaultStudentPrice": null,
    "defaultTeacherPrice": null
  });

  async function loadData() {
    const res = await dispatch(getItemById(id));
    if(res.statusCode === 200){

      console.log('______response', res.data)
      setData((prevData) => ({
        ...prevData,
        id: res.data.id,
        title: res.data.title,
        startDate: new Date(res.data.startDate),
        totalHours: res.data.totalHours,
        status: res.data.status,
        defaultStudentPrice: res.data.defaultStudentPrice,
        defaultTeacherPrice: res.data.defaultTeacherPrice,
      }));
      setIsloading(false)
      return data;
    }

    return {}
  }


  useEffect(() => {
    if(isEditing)
      loadData();
  }, []);


  async function onCreate() {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}${path}`,
        {
          ...data,
          "startDate": convertDate(data.startDate),
        }, {
          headers: {
            'authorization': `bearer ${auth.token}`
          }
        }
      );

      console.log('res', res)
      if(res.data.statusCode === 201)
        navigate(`/course-list`);


    } catch (e) {
      console.log("Error: ", e);
    }
  }

  async function onUpdate() {
    try {
      const res = await axios.put(`${process.env.REACT_APP_API_URL}/Courses/Course`,
        {
          ...data,
          "startDate": convertDate(data.startDate),
        }, {
          headers: {
            "authorization": `bearer ${auth.token}`
          }
        }
      );

      if(res.data.statusCode === 200)
        navigate(`/course-list`);

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
            submitButtonText={"ایجاد دوره"}
            onFieldChange={handleOnFieldChange}
            onFormSubmit={handleOnSubmit}
          />
      }
    </>

  );
};

export default CourseAdd;
