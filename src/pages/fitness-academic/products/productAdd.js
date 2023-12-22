import React, { useEffect, useState } from "react";
import Form, { FormIsLoading } from "../../../components/fouladyar/form";
import { useDispatch, useSelector } from "react-redux";
import { formStatics, formStructure } from "./index";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getItemById } from "../../../redux/store/services/fitness-academic/product/store/productItems";
import { ErrorToaster } from "../../../shared/toaster";
import toast from "react-hot-toast";


function ProductAdd({ ...props }) {

  const { id } = useParams();
  const location = useLocation();
  const isEditing = location.pathname.includes("products-edit");
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const path = "/api/product";
  const dispatch = useDispatch();
  const [isLoading, setIsloading] = useState(isEditing ? true : false);
  const [processing, setProcessing] = useState(false);

  const [data, setData] = useState({
    "title": "",
    "slug": "",
    "categoryId": "",
    "price": "",
    "description": "",
  });


  async function loadData() {
    const res = await dispatch(getItemById(id));
    console.log("product load ", res);
    if (res.statusCode === 200) {
      setData(prevState => ({
        ...prevState,
        ...res.product
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
      // const fileId = await uploadImage({ image: data.imageHolder });


      const res = await axios.post(`${process.env.REACT_APP_API_URL}${path}`, {
        ...data,
        // image: fileId
      }, {
        headers: { "authorization": `bearer ${auth.token}` }
      });

      console.log("product-res", res);


      if (res.data.statusCode === 200) {
        toast.success("محصول جدید با موفقیت ثبت شد")
        navigate(`/products-list`);
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
      let _data = { ...data };
      // let fileId;
      // delete _data.imagePreview;
      // delete _data.imageHolder;

      // console.log("image-in-upload", data.imageHolder);
      // if (data.imageHolder.length !== 0) {
      //   fileId = await uploadImage({ image: data.imageHolder });
      // }
      const res = await axios.patch(`${process.env.REACT_APP_API_URL}${path}/${id}`,
        {
          ..._data,
          // image: fileId || data.image
        },
        { headers: { "authorization": `bearer ${auth.token}` } }
      );


      if(res.status === 200){
        toast.success("محصول مورد نظر با موفقیت بروزرسانی شد")
        navigate(`/products-list`);
        setProcessing(false);
      }

    } catch (e) {
      ErrorToaster(e);
      setProcessing(false);
    }
  }

  async function uploadImage({ image }) {
    try {

      const formData = new FormData();
      formData.append("image", image[0].file);

      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/file/upload/image`,
        formData, {
          headers: {
            "authorization": `bearer ${auth.token}`,
            "Content-Type": "multipart/form-data"
          }

        }
      );

      console.log("fileUpload", res);

      if (res.status === 200)
        return res.data.fileId;


    } catch (e) {
      ErrorToaster(e);
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
            submitButtonText={"ایجاد محصول"}
            onFieldChange={handleOnFieldChange}
            onFormSubmit={handleOnSubmit}
          />
      }
    </>


  );
};

export default ProductAdd;
