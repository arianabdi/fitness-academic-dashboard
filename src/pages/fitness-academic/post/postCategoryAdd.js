import React, { useEffect, useState } from "react";
import Form, { FormIsLoading } from "../../../components/fouladyar/form";
import { useDispatch, useSelector } from "react-redux";
import { formStatics, formStaticsOfCategories, formStructureOfCategories } from "./index";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getItemById } from "../../../redux/store/services/fitness-academic/posts/store/postCategories";
import { ErrorToaster } from "../../../shared/toaster";
import toast from "react-hot-toast";


function PostCategoryAdd({ ...props }) {
  const { id } = useParams();
  const location = useLocation();
  const isEditing = location.pathname.includes("post-category-edit");
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const path = "/api/category/post";
  const dispatch = useDispatch();
  const [isLoading, setIsloading] = useState(isEditing ? true : false);
  const [processing, setProcessing] = useState(false);

  const [data, setData] = useState({
    "title": "",
    "slug": "",
    "description": ""
  });


  async function loadData() {
    const res = await dispatch(getItemById(id));
    console.log("post-category-load ", res);
    if (res.statusCode === 200) {
      setData(prevState => ({
        ...prevState,
        ...res.data
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
      setProcessing(true);
      const res = await axios.post(`${process.env.REACT_APP_API_URL}${path}`, data, {
        headers: { "authorization": `bearer ${auth.token}` }
      });
      console.log("exercise-res", res);
      if (res.status === 200) {
        toast.success("دسته بندی مقاله با موفقیت ثبت شد")
        navigate(`/post-category-list`);
      }
      setProcessing(false);

    } catch (e) {
      ErrorToaster(e);
      console.log("Error: ", e);
      setProcessing(false);
    }
  }


  async function onUpdate() {
    try {
      setProcessing(true);
      const res = await axios.patch(`${process.env.REACT_APP_API_URL}${path}/${id}`, data,
        { headers: { "authorization": `bearer ${auth.token}` } }
      );

      console.log('update-post-category', res)
      if(res.status === 200){
        toast.success("دسته بندی مقاله با موفقیت بروزرسانی شد")
        navigate(`/post-category-list`);
      }
      setProcessing(false);
    } catch (e) {
      ErrorToaster(e);
      setProcessing(false);
    }
  }


  function handleOnFieldChange(change) {
    setData((prevData) => ({
      ...prevData,
      ...change
    }));
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
            fields={formStructureOfCategories}
            statics={formStaticsOfCategories}
            isloading={processing}
            submitButtonText={"ایجاد دسته بندی مقاله"}
            onFieldChange={handleOnFieldChange}
            onFormSubmit={handleOnSubmit}
          />
      }
    </>


  );
};

export default PostCategoryAdd;
