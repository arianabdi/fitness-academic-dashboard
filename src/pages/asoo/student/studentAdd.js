import React, { useEffect, useState } from "react";
import Form, { FormIsLoading } from "../../../components/fouladyar/form";
import { useDispatch, useSelector } from "react-redux";
import { formStatics, formStructure } from "./index";
import axios from "axios";
import { convertDate } from "../../../shared/shared";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getItemById } from "../../../redux/store/services/asoo/students/store/students-actions";
import toast from "react-hot-toast";



function StudentAdd({ ...props }) {

  const { id } = useParams();
  const location = useLocation();
  const isEditing = location.pathname.includes("student-edit");
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const path = '/Persons/Student'
  const dispatch = useDispatch();
  const [processing, setProcessing] = useState(false);
  const [isLoading, setIsloading] = useState(isEditing ? true : false);
  const [data, setData] = useState({
    "firstName": "",
    "lastName": "",
    "nationalCode": "",
    "systemCode": "",
    "address": "",
    "telePhoneNumber": "",
    "mobilePhoneNumber": "",
    "email": "",
    "birthDate": "",
    "licenceNumber": "",
    "licenceDate": "",
    "medicalNumber": "",
    "personalImage": "",
    "nationalCardImage": "",
    "entryCardImage": "",
    "personalImagePreview": "",
    "nationalCardImagePreview": "",
    "entryCardImagePreview": "",
    "medicalDate": ""
  });

  async function loadData() {
    const res = await dispatch(getItemById(id));
    if (res.statusCode === 200) {

      console.log("______response", res);
      setData((prevData) => ({
        ...prevData,
        ...res.data,
        birthDate: new Date(res.data.birthDate),
        licenceDate: new Date(res.data.licenceDate),
        medicalDate: new Date(res.data.medicalDate),
        personalImagePreview: res.data.personalImage,
        personalImage: [],
        entryCardImagePreview: res.data.entryCardImage,
        entryCardImage: [],
        nationalCardImagePreview: res.data.nationalCardImage,
        nationalCardImage: []
      }));
      setIsloading(false);
      return data;
    }

    try {

    }catch (e){
      toast.error(e.response.data.error || (e.response.data.message || e.message))
    }


  }


  useEffect(() => {
    if (isEditing)
      loadData();
  }, []);


  async function onCreate() {
    try {
      setProcessing(true)
      const res = await axios.post(`${process.env.REACT_APP_API_URL}${path}`,
        {
          ...data,
          "birthDate": convertDate(data.birthDate),
          "licenceDate": convertDate(data.licenceDate),
          "medicalDate": convertDate(data.medicalDate),
        }, {
          headers: {
            "authorization": `bearer ${auth.token}`
          }
        }
      );



      console.log('student created!', res)
      if(res.data.statusCode === 201){

        if(data.personalImage.length > 0){
          await uploadImage({
            file: data.personalImage[0].file,
            user: res.data.data.user.id,
            type: 1
          })
          console.log('personalImage uploaded!', res.data.data)
        }

        if(data.nationalCardImage.length > 0){
          await uploadImage({
            file: data.nationalCardImage[0].file,
            user: res.data.data.user.id,
            type: 4
          })
          console.log('nationalCardImage uploaded!', res.data.data)
        }

        if(data.entryCardImage.length > 0){
          await uploadImage({
            file: data.entryCardImage[0].file,
            user: res.data.data.user.id,
            type: 5
          })
          console.log('entryCardImage uploaded!', res.data.data)
        }
        navigate(`/student-list`);
        setProcessing(false)
      }

    } catch (e) {
      console.log("Error: ", e);
      setProcessing(false)
      toast.error(e.response.data.error || (e.response.data.message || e.message))
    }
  }

  async function uploadImage({file, user, type}) {
    try {
      setProcessing(true)


      const res = await axios.post(`${process.env.REACT_APP_API_URL}/Files/file`,
        {
          file: file,
          type: type, // اجازه نامه پرواز
          user: user // بعد از ایجاد هواپیما، ایدی ایجاد شده را در اینجا ست کن
        }, {
          headers: {
            "authorization": `bearer ${auth.token}`,
            "Content-Type": "multipart/form-data"
          },

        }
      );

      console.log('fileUpload',res)
    } catch (e) {
      console.log("Error: ", e);
      toast.error(e.response.data.error || (e.response.data.message || e.message))
    }
  }

  async function onUpdate() {
    try {

      setProcessing(true)
      let _data = {...data}
      delete _data.personalImage;
      delete _data.personalImagePreview;
      delete _data.nationalCardImage;
      delete _data.nationalCardImagePreview;
      delete _data.entryCardImage;
      delete _data.entryCardImagePreview;

      const res = await axios.put(`${process.env.REACT_APP_API_URL}${path}`,
        {
          ..._data,
          "birthDate": convertDate(_data.birthDate),
          "licenceDate": convertDate(_data.licenceDate),
          "medicalDate": convertDate(_data.medicalDate),
        }, {
          headers: {
            "authorization": `bearer ${auth.token}`
          }
        }
      );

      console.log('res', res)
      if(res.data.statusCode === 200){

        if(data.personalImage.length > 0){
          await uploadImage({
            file: data.personalImage[0].file,
            user: res.data.data.user.id,
            type: 1
          })
          console.log('personalImage uploaded!', res.data.data)
        }

        if(data.nationalCardImage.length > 0){
          await uploadImage({
            file: data.nationalCardImage[0].file,
            user: res.data.data.user.id,
            type: 4
          })
          console.log('nationalCardImage uploaded!', res.data.data)
        }

        if(data.entryCardImage.length > 0){
          await uploadImage({
            file: data.entryCardImage[0].file,
            user: res.data.data.user.id,
            type: 5
          })
          console.log('entryCardImage uploaded!', res.data.data)
        }

        navigate(`/student-list`);

      }

      setProcessing(false)
    } catch (e) {
      console.log("Error: ", e);
      setProcessing(false)
      toast.error(e.response.data.error || (e.response.data.message || e.message))
    }
  }

  function handleOnFieldChange(change) {
    setData((prevData) => ({
      ...prevData,
      ...change
    }));
    console.log("setValue", change);
  }

  async function handleOnSubmit() {
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
            isloading={processing}
            submitButtonText={"ایجاد کلاس"}
            onFieldChange={handleOnFieldChange}
            onFormSubmit={handleOnSubmit}
          />
      }
    </>


  );
};

export default StudentAdd;
