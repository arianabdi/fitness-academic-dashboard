import React, { useEffect, useState } from "react";
import Form, { FormIsLoading } from "../../../components/fouladyar/form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { getItemById } from "../../../redux/store/services/fitness-academic/users/store/userSystem";
import { formStatics, formStructure } from "./index";
import toast from "react-hot-toast";
import { ErrorToaster } from "../../../shared/toaster";
import axios from "axios";
const UserSystemAdd = ({ ...props }) => {
  const { id } = useParams();
  const location = useLocation();
  const isEditing = location.pathname.includes("user-system-edit");
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const path = '/api/user/system-user'
  const dispatch = useDispatch();
  const [isLoading, setIsloading] = useState(isEditing ? true : false);
  const [processing, setProcessing] = useState(false);

  const [data, setData] = useState({
    "first_name": "",
    "last_name": "",
    "gender": "",
    "role": "",
    "email": "",
    "mobile": "",
    "country": "",
    "city": "",
    "address": "",
    "password": "",
    "confirmPassword": "",
    "image": null, // در زمان update مقدار fileId فایل آپلود شده قبلی رو نگه میداره
    "imageHolder": null, // در زمان create و update فایل عکس رو نگه میداره
    "imagePreview": null, // در زمان update آدرس عکسی که قبلا آپلود شده رو نگه میداره
  });



  async function loadData() {
    const res = await dispatch(getItemById(id));
    console.log('user-system load ', res);
    if (res.statusCode === 200) {
      setData(prevState => ({
        ...prevState,
        ...res.user,
        address: res.user.location.address,
        city: res.user.location.city,
        country: res.user.location.country,
        role: res.user.roles[0],
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
    console.log('data', data)

    try {
      setProcessing(true)
      // const fileId = await uploadImage({ image: data.imageHolder })

      const res = await axios.post(`${process.env.REACT_APP_API_URL}${path}`, {
        ...data,
        // image: fileId
      }, {
        headers: { "authorization": `bearer ${auth.token}` }
      });

      console.log('user-system-res', res)

      if(res.data.statusCode === 200){
        toast.success("کاربر جدید با موفقیت ثبت شد")
        navigate(`/user-system-list`);
      }

      setProcessing(false)

    } catch (e) {
      ErrorToaster(e)
      console.log("Error: ", e);
      setProcessing(false)
    }
  }



  async function onUpdate() {
    try {

      setProcessing(true)
      let _data = {...data}
      // let fileId;
      // delete _data.imagePreview;
      // delete _data.imageHolder;
      //
      // console.log('image-in-upload', data.imageHolder)
      // if(data.imageHolder.length !== 0){
      //   fileId = await uploadImage({ image: data.imageHolder })
      // }
      const res = await axios.patch(`${process.env.REACT_APP_API_URL}${path}/${id}`,
        {
          ..._data,
          // image: fileId || data.image
        },
        { headers: { "authorization": `bearer ${auth.token}` }}
      );

      if(res.status === 200){
        toast.success("کاربر مورد نظر با موفقیت بروزرسانی شد")
        navigate(`/user-system-list`);
        setProcessing(false)
      }


      setProcessing(false)
    } catch (e) {
      ErrorToaster(e)
      setProcessing(false)
    }
  }

  async function uploadImage({image}) {
    try {

      const formData = new FormData();
      formData.append('image', image[0].file);

      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/file/upload/image`,
        formData, {
          headers: {
            "authorization": `bearer ${auth.token}`,
            "Content-Type": "multipart/form-data"
          },

        }
      );

      console.log('fileUpload',res)

      if(res.status === 200)
        return res.data.fileId;


    } catch (e) {
      ErrorToaster(e)
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
            submitButtonText={"ایجاد کاربر سیستم"}
            onFieldChange={handleOnFieldChange}
            onFormSubmit={handleOnSubmit}
          />
      }
    </>


  );
};

export default UserSystemAdd;
