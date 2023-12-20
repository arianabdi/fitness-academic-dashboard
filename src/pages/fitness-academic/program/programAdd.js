import React, { useEffect, useState } from "react";
import Form, { FormIsLoading } from "../../../components/fouladyar/form";
import { useDispatch, useSelector } from "react-redux";
import { formStatics, formStructure } from "./index";
import axios from "axios";
import { convertDate } from "../../../shared/shared";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getItemById, path } from "../../../redux/store/services/fitness-academic/exercise/store/exercise-actions";

import { ErrorToaster } from "../../../shared/toaster";
import { Collapse } from "reactstrap";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { Field } from "../../../components/fouladyar/field/field";
import { Block, BlockHead, BlockHeadContent, BlockTitle } from "../../../components/block/Block";
import { PreviewCard } from "../../../components/preview/Preview";
import Content from "../../../layout/content/Content";
import { toFarsiNumber } from "../../../shared/toFarsiNumber";
import { useTranslation } from "react-i18next";



function ProgramAdd({ ...props }) {

  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const isEditing = location.pathname.includes("exercise-edit");
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const path = '/api/exercise'
  const dispatch = useDispatch();
  const [isLoading, setIsloading] = useState(isEditing ? true : false);
  const [processing, setProcessing] = useState(false);
  const [exerciseCategories, setExerciseCategories] = useState([]);
  const [exerciseCategoriesOptions, setExerciseCategoriesOptions] = useState([]);
  const [exerciseList, setExerciseList] = useState([]);
  const [exerciseListOptions, setExerciseListOptions] = useState([]);
  const [diet, setDiet] = useState([])
  const [isOpen, setIsOpen] = useState("1");
  const [program, setProgram] = useState([])
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

  function loadExercisesByCategoryId(categoryId){
    const items = exerciseCategories.filter(j => j._id === categoryId);

    if(items.length > 0){
      const slug = (items[0]).slug;

      if(exerciseList.length > 0){
        return exerciseList.filter(i => {
          if(i.category === slug)
            return {label: i.title, value: i._id}
        })
      }
    }


    return []
  }

  async function loadExercises(){
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/exercise`, {
        headers: {authorization: `bearer ${auth.token}`}
      });


      console.log('exercises', res.data.data.exercises)
      if (res.status === 200) {
        setExerciseList(res.data.data.exercises)
        setExerciseListOptions(res.data.data.exercises.map(item => {
          return(
            {label: item.title, value: item._id, category: item.category}
          )
        }))
      }
    }catch (e){
      ErrorToaster(e)
    }
  }



  async function loadProgram(){
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/programs/${id}`, {
        headers: {authorization: `bearer ${auth.token}`}
      });


      if (res.status === 200) {

        if(res.data.data.program){
          const p = {...res.data.data.program}
          delete p.diet;
          delete p.exercises;
          setProgram(p)
        }

        if(res.data.data.program.exercises.length > 0){
          setExercises(res.data.data.program.exercises)
        }


        if(res.data.data.program.diet.length > 0){
          setDiet(res.data.data.program.diet)
        }
      }
    }catch (e){
      ErrorToaster(e)
    }
  }

  useEffect(() => {
    loadExerciseCategories()
    loadExercises()
    loadProgram()

    if (isEditing)
      loadData();


  }, []);


  async function loadExerciseCategories(){
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/category/exercise`, {
        headers: {authorization: `bearer ${auth.token}`}
      });

      console.log('categories', res.data.data.categories)
      if (res.status === 200) {
        setExerciseCategories(res.data.data.categories)
        setExerciseCategoriesOptions(res.data.data.categories.map(item => {
          return(
            {label: item.title, value: item._id, slug: item.slug}
          )
        }))

      }
    }catch (e){
      ErrorToaster(e)
    }
  }



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





      if(res.data.statusCode === 200){
        navigate(`/exercise-list`);
      }

      setProcessing(false)

    } catch (e) {
      ErrorToaster(e)
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
  const toggleCollapse = (param) => {
    if (param === isOpen) {
      setIsOpen("0");
    } else {
      setIsOpen(param);
    }
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



      if(res.status === 200)
        return res.data.fileId;


    } catch (e) {
      ErrorToaster(e)
    }
  }




  function InfoItem({title, value}){
    return(
      <div className="d-flex flex-row justify-content-between InfoItem-container">
        <div className="info-title">
          {title}
        </div>
        <div className="info-value">
          {value ? toFarsiNumber(value) : '-'}
        </div>
      </div>
    )
  }

  function loadExerciseOptionsByCategoryId(categoryId) {
    if(categoryId){
      return exerciseListOptions.filter(exerciseItem => {
        const currentCategory = exerciseCategoriesOptions?.find(i=>i.value === categoryId);


        if(exerciseItem.category === currentCategory.slug ){
          console.log('loadExerciseOptionsByCategoryId', categoryId, exerciseItem.category, currentCategory.slug)
          return exerciseItem
        }


      })
    }


    return []

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
                    <BlockTitle tag="h5">ایجاد برنامه جدید</BlockTitle>
                    <p>در بخش باید متناسب با اطلاعات وارد شده توسط کاربر، برنامه تمرینی و غذایی ایجاد و ثبت شود</p>
                  </BlockHeadContent>
                </BlockHead>
                <PreviewCard>

                  <div className={[`accordion`]}>

                    {
                      exercises.map((item, index) => {

                        return(
                          <div className="accordion-item">
                            <div className={[`d-flex flex-row justify-content-between accordion-head${isOpen !== index ? " collapsed" : ""}`]} onClick={() => toggleCollapse(index)}>
                              <h6 className="title">{`${toFarsiNumber(index + 1)}. تعریف نشده`}</h6>
                              <span className="icon">
                    <IoClose size={18} color={"#526484"}/>
                  </span>
                            </div>
                            <Collapse className="accordion-body justify-content-between"  isOpen={isOpen === index ? true : false}>
                              <div className="accordion-inner">
                                <div className="d-flex flex-row ">
                                  <div className="w-100 p-1">
                                    <Field
                                      id={"sets"}
                                      name={"sets"}
                                      label={"تعداد ست"}
                                      type={"number"}
                                      value={item.sets}
                                      onChange={(e) => {

                                        setExercises(exercises.map((i, indx) => {
                                          if(index === indx){
                                            return {
                                              ...item,
                                              sets: e
                                            }
                                          }

                                          return i;
                                        }))

                                      }}
                                    />
                                  </div>
                                  <div className="w-100 p-2">
                                    <Field
                                      id={"reps"}
                                      name={"reps"}
                                      label={"تعداد تکرار"}
                                      type={"number"}
                                      value={item.reps}
                                      onChange={(e) => {
                                        setExercises(exercises.map((i, indx) => {
                                          if(index === indx){
                                            return {
                                              ...item,
                                              reps: e
                                            }
                                          }

                                          return i;
                                        }))
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="d-flex flex-row ">
                                  <div className="w-100 p-1">
                                    <Field
                                      id={"rest"}
                                      name={"rest"}
                                      label={"استراحت بین ست"}
                                      type={"number"}
                                      value={item.rest}
                                      onChange={(e) => {
                                        setExercises(exercises.map((i, indx) => {
                                          if(index === indx){
                                            return {
                                              ...item,
                                              rest: e
                                            }
                                          }

                                          return i;
                                        }))
                                      }}
                                    />
                                  </div>
                                  <div className="w-100 p-1">
                                    <Field
                                      id={"weight"}
                                      name={"weight"}
                                      label={"وزن"}
                                      type={"number"}
                                      value={item.weight}
                                      onChange={(e) => {
                                        setExercises(exercises.map((i, indx) => {
                                          if(index === indx){
                                            return {
                                              ...item,
                                              weight: e
                                            }
                                          }

                                          return i;
                                        }))
                                      }}
                                    />
                                  </div>


                                </div>
                                <div className="d-flex flex-row ">
                                  <div className="w-100 p-1">
                                    <Field
                                      id={"categoryId"}
                                      name={"categoryId"}
                                      label={"دسته بندی تمرین"}
                                      disabled={exerciseCategoriesOptions.length === 0}
                                      options={exerciseCategoriesOptions}
                                      type={"select"}
                                      value={item.categoryId}
                                      onChange={(e) => {
                                        setExercises(exercises.map((i, indx) => {
                                          if(index === indx){
                                            return {
                                              ...item,
                                              categoryId: e,
                                              exerciseId: ''
                                            }
                                          }

                                          return i;
                                        }))
                                      }}
                                    />
                                  </div>
                                  <div className="w-100 p-1">
                                    <Field
                                      id={"exerciseId"}
                                      name={"exerciseId"}
                                      disabled={exerciseListOptions.length === 0}
                                      options={loadExerciseOptionsByCategoryId(item.categoryId)}
                                      label={"عنوان تمرین"}
                                      type={"select"}
                                      value={item.exerciseId}
                                      onChange={(e) => {
                                        setExercises(exercises.map((i, indx) => {
                                          if(index === indx){
                                            return {
                                              ...item,
                                              exerciseId: e
                                            }
                                          }

                                          return i;
                                        }))
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="d-flex flex-row ">
                                  <div className="w-100 p-1">
                                    <Field
                                      id={"description"}
                                      name={"description"}
                                      label={"توضیحات"}
                                      type={"text"}
                                      value={item.description}
                                      onChange={(e) => {
                                        setExercises(exercises.map((i, indx) => {
                                          if(index === indx){
                                            return {
                                              ...item,
                                              exerciseId: e
                                            }
                                          }

                                          return i;
                                        }))
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </Collapse>
                          </div>
                        )
                      })
                    }


                  </div>

                </PreviewCard>

                <div className="btn btn-primary" onClick={()=>{
                  console.log('exercise', exercises);
                }}>
                  click on me!
                </div>
              </Block>
              <Block size="lg">
                <BlockHead>
                  <BlockHeadContent>
                    <BlockTitle tag="h5">اطالاعات کاربر</BlockTitle>
                    <p>این اطلاعات توسط کاربر تکمیل و ارسال شده اند و کاربر قبول کرده است که این اطلاعات کاملا صحیح میباشد.</p>
                  </BlockHeadContent>
                </BlockHead>
                <PreviewCard className="pt-0 pb-0">

                  {
                    Object.keys(program).map(key => {
                      return(
                        <InfoItem title={t(key)} value={program[key]}/>
                      )
                    })
                  }

                </PreviewCard>
              </Block>
            </Content>
          </>
      }
    </>


  );
};

export default ProgramAdd;
