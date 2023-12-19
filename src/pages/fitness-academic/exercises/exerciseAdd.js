import React, { useEffect, useState } from "react";
import Form, { FormIsLoading } from "../../../components/fouladyar/form";
import { useDispatch, useSelector } from "react-redux";
import { formStatics, formStructure } from "./index";
import axios from "axios";
import { convertDate } from "../../../shared/shared";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getItemById } from "../../../redux/store/services/asoo/plane/store/plane-actions";
import fa from "react-date-object/locales/gregorian_fa";


function ExerciseAdd({ ...props }) {

  const { id } = useParams();
  const location = useLocation();
  const isEditing = location.pathname.includes("plane-edit");
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const path = '/Planes/Plane'
  const dispatch = useDispatch();
  const [isLoading, setIsloading] = useState(isEditing ? true : false);
  const [processing, setProcessing] = useState(false);

  const [data, setData] = useState({

    "title": "",
    "slug": "",
    "categoryId": "",
    "level": null,
    "description": "",
    "image": null,
    "video": "",
  });



  async function loadData() {
    const res = await dispatch(getItemById(id));
    if (res.statusCode === 200) {

      setData((prevData) => ({
        ...prevData,
        ...res.data,
        engineOverhaulDate: new Date(res.data.engineOverhaulDate),
        buildDate: new Date(res.data.buildDate),
        propellerOverhaulDate: new Date(res.data.propellerOverhaulDate),
        flightPermitDate: new Date(res.data.flightPermitDate),
        insuranceImagePreview: res.data.insuranceImage,
        insuranceImage: [],
        flightPermitImage: [],
        flightPermitImagePreview: res.data.flightPermitImage,
      }));
      setIsloading(false);
      return data;
    }

    return {};

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
          "engineOverhaulDate": convertDate(data.engineOverhaulDate),
          "propellerOverhaulDate": convertDate(data.propellerOverhaulDate),
          "flightPermitDate": convertDate(data.flightPermitDate),
          "buildDate": convertDate(data.buildDate)
        }, {
          headers: {
            "authorization": `bearer ${auth.token}`
          }
        }
      );

      if(res.data.statusCode === 201){

        if(data.flightPermitImage.length > 0){
          await uploadImage({
            file: data.flightPermitImage[0].file,
            user: res.data.data.user.id,
            type: 3
          })
          console.log('flightPermitImage uploaded!', res.data.data)
        }

        if(data.insuranceImage.length > 0){
          await uploadImage({
            file: data.insuranceImage[0].file,
            user: res.data.data.user.id,
            type: 2
          })

          console.log('insuranceImage uploaded!', res.data.data)
        }
        navigate(`/plane-list`);
      }

      setProcessing(false)

    } catch (e) {
      console.log("Error: ", e);
      setProcessing(false)
    }
  }



  async function onUpdate() {
    try {

      setProcessing(true)
      let _data = {...data}
      delete _data.insuranceImage;
      delete _data.flightPermitImage;
      delete _data.insuranceImagePreview;
      delete _data.flightPermitImagePreview;
      const res = await axios.put(`${process.env.REACT_APP_API_URL}${path}`,
        {
          ..._data,
          "engineOverhaulDate": convertDate(data.engineOverhaulDate),
          "propellerOverhaulDate": convertDate(data.propellerOverhaulDate),
          "flightPermitDate": convertDate(data.flightPermitDate)
        }, {
          headers: {
            "authorization": `bearer ${auth.token}`
          }
        }
      );

      console.log('plane created!', res)
      if(res.data.statusCode === 200){

        if(data.flightPermitImage.length > 0){
          await uploadImage({
            file: data.flightPermitImage[0].file,
            user: res.data.data.user.id,
            type: 3
          })
          console.log('flightPermitImage uploaded!', res.data.data)
        }

        if(data.insuranceImage.length > 0){
          await uploadImage({
            file: data.insuranceImage[0].file,
            user: res.data.data.user.id,
            type: 2
          })

          console.log('insuranceImage uploaded!', res.data.data)
        }
        navigate(`/plane-list`);
      }


      setProcessing(false)
    } catch (e) {
      console.log("Error: ", e);

      setProcessing(false)
    }
  }

  async function uploadImage({file, user, type}) {
    try {



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

export default ExerciseAdd;
