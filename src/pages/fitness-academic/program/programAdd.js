import React, { useEffect, useState } from "react";
import Form, { FormIsLoading } from "../../../components/fouladyar/form";
import { useDispatch, useSelector } from "react-redux";
import { formStatics, formStructure } from "./index";
import axios from "axios";
import { convertDate } from "../../../shared/shared";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getItemById } from "../../../redux/store/services/fitness-academic/exercise/store/exercise-actions";

import { ErrorToaster } from "../../../shared/toaster";
import { Collapse } from "reactstrap";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { Field } from "../../../components/fouladyar/field/field";
import { Block, BlockHead, BlockHeadContent, BlockTitle } from "../../../components/block/Block";
import { PreviewCard } from "../../../components/preview/Preview";
import Content from "../../../layout/content/Content";



function ProgramAdd({ ...props }) {

  const { id } = useParams();
  const location = useLocation();
  const isEditing = location.pathname.includes("exercise-edit");
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const path = '/api/exercise'
  const dispatch = useDispatch();
  const [isLoading, setIsloading] = useState(isEditing ? true : false);
  const [processing, setProcessing] = useState(false);
  const [exercises, setExercises] = useState([
    {
      sets: "3",
      reps: "10",
      rest: "1",
      weight: "0",
      categoryId: "64ac3d35a19a70a65c8f44a5",
      exerciseId: "6508119b38c1fe2b0eb5ee5b",
      description: "این یک توضیح تستی برای شکم کرانچ نیمه است "
    },
    {
      sets: "3",
      reps: "10",
      rest: "1",
      weight: "0",
      categoryId: "64ac3d35a19a70a65c8f44a5",
      exerciseId: "6508119b38c1fe2b0eb5ee5b",
      description: "این یک توضیح تستی برای شکم کرانچ نیمه است "
    },
    {
      sets: "3",
      reps: "10",
      rest: "1",
      weight: "0",
      categoryId: "64ac3d35a19a70a65c8f44a5",
      exerciseId: "6508119b38c1fe2b0eb5ee5b",
      description: "این یک توضیح تستی برای شکم کرانچ نیمه است "
    }
  ])

  const [data, setData] = useState({
    "title": "",
    "slug": "",
    "categoryId": "",
    "level": "",
    "description": "",
    "image": null, // در زمان update مقدار fileId فایل آپلود شده قبلی رو نگه میداره
    "imageHolder": null, // در زمان create و update فایل عکس رو نگه میداره
    "imagePreview": null, // در زمان update آدرس عکسی که قبلا آپلود شده رو نگه میداره
    "video": null,
  });
  async function loadData() {
    const res = await dispatch(getItemById(id));
    console.log('exercise load ', res);
    if (res.statusCode === 200) {
      // _id: "6581578049b2da2bfca792d3"
      // categoryId: "64ac2e32a19a70a65c8f4465"
      // createdAt: "2023-12-19T08:42:40.888Z"
      // description: "jjjjjj"
      // image: "6581577f49b2da2bfca792ce"
      // isAlive: true
      // level: "professional"
      // slug: "hhhh"
      // title: "jjjj"
      // updatedAt: "2023-12-19T08:42:40.888Z"

      setData(prevState => ({
        ...prevState,
        ...res.data.exercise
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
      const fileId = await uploadImage({ image: data.imageHolder })



      const res = await axios.post(`${process.env.REACT_APP_API_URL}${path}`, {
        ...data,
        image: fileId
      }, {
          headers: { "authorization": `bearer ${auth.token}` }
      });

      console.log('exercise-res', res)



      if(res.data.statusCode === 200){
        navigate(`/exercise-list`);
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
      let fileId;
      delete _data.imagePreview;
      delete _data.imageHolder;

      console.log('image-in-upload', data.imageHolder)
      if(data.imageHolder.length !== 0){
        fileId = await uploadImage({ image: data.imageHolder })
      }
      const res = await axios.patch(`${process.env.REACT_APP_API_URL}${path}/${id}`,
        { ..._data, image: fileId || data.image },
        { headers: { "authorization": `bearer ${auth.token}` }}
      );



      setProcessing(false)
    } catch (e) {
      ErrorToaster(e)
      setProcessing(false)
    }
  }

  const Accordion = ({ className, variation }) => {
    const [isOpen, setIsOpen] = useState("1");

    const AccordionItem = ({item}) => {
      return(
        <div className="accordion-item">
          <div className={[`d-flex flex-row justify-content-between accordion-head${isOpen !== id ? " collapsed" : ""}`]} onClick={() => toggleCollapse(id)}>
            <h6 className="title">{title}</h6>
            <span className="icon">
              <IoClose size={18} color={"#526484"}/>
            </span>
          </div>
          <Collapse className="accordion-body justify-content-between"  isOpen={isOpen === id ? true : false}>
            <div className="accordion-inner">
              <div className="d-flex flex-row ">
                <div className="w-100 p-1">
                  <Field
                    id={"username"}
                    name={"username"}
                    label={"تعداد ست"}
                    type={"text"}
                    value={""}
                    onChange={(e) => {
                    }}
                  />
                </div>
                <div className="w-100 p-2">
                  <Field
                    id={"username"}
                    name={"username"}
                    label={"تعداد تکرار"}
                    type={"text"}
                    value={""}
                    onChange={(e) => {
                    }}
                  />
                </div>
              </div>
              <div className="d-flex flex-row ">
                <div className="w-100 p-1">
                  <Field
                    id={"username"}
                    name={"username"}
                    label={"استراحت بین ست"}
                    type={"text"}
                    value={""}
                    onChange={(e) => {
                    }}
                  />
                </div>
                <div className="w-100 p-1">
                  <Field
                    id={"username"}
                    name={"username"}
                    label={"وزن"}
                    type={"text"}
                    value={""}
                    onChange={(e) => {
                    }}
                  />
                </div>


              </div>
              <div className="d-flex flex-row ">
                <div className="w-100 p-1">
                  <Field
                    id={"username"}
                    name={"username"}
                    label={"دسته بندی تمرین"}
                    type={"text"}
                    value={""}
                    onChange={(e) => {
                    }}
                  />
                </div>
                <div className="w-100 p-1">
                  <Field
                    id={"username"}
                    name={"username"}
                    label={"عنوان تمرین"}
                    type={"text"}
                    value={""}
                    onChange={(e) => {
                    }}
                  />
                </div>
              </div>
              <div className="d-flex flex-row ">
                <div className="w-100 p-1">
                  <Field
                    id={"username"}
                    name={"username"}
                    label={"توضیحات"}
                    type={"text"}
                    value={item.description}
                    onChange={(e) => {
                    }}
                  />
                </div>
              </div>
            </div>
          </Collapse>
        </div>
      )
    }
    const toggleCollapse = (param) => {
      if (param === isOpen) {
        setIsOpen("0");
      } else {
        setIsOpen(param);
      }
    };

    return (
      <div className={[`accordion${variation ? " accordion-s" + variation : ""}${className ? " " + className : ""}`]}>

        {
          exercises.map(item => {
            return(<AccordionItem item={item} />)
          })
        }


      </div>
    );
  };

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
          <>
            <Content page="component">
              <Block size="lg">
                <BlockHead>
                  <BlockHeadContent>
                    <BlockTitle tag="h5">عنوان</BlockTitle>
                    <p>توضیحات</p>
                  </BlockHeadContent>
                </BlockHead>
                <PreviewCard>

                  <Accordion/>

                </PreviewCard>
              </Block>

            </Content>
          </>
      }
    </>


  );
};

export default ProgramAdd;
