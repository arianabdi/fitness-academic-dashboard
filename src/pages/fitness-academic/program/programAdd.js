import React, { useEffect, useState } from "react";
import Form, { FormIsLoading } from "../../../components/fouladyar/form";
import { useDispatch, useSelector } from "react-redux";
import { formStatics, formStructure } from "./index";
import axios from "axios";
import { convertDate } from "../../../shared/shared";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getItemById, path } from "../../../redux/store/services/fitness-academic/exercise/store/exerciseItems/exercise-actions";

import { ErrorToaster } from "../../../shared/toaster";
import { Button, Collapse, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { Field } from "../../../components/fouladyar/field/field";
import { Block, BlockHead, BlockHeadContent, BlockTitle } from "../../../components/block/Block";
import { PreviewCard } from "../../../components/preview/Preview";
import Content from "../../../layout/content/Content";
import { toFarsiNumber } from "../../../shared/toFarsiNumber";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import classnames from "classnames";
import { IoMdClose } from "react-icons/io";
import { preventDefault } from "@fullcalendar/react";
import { LuPlus } from "react-icons/lu";



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
  const [isOpen, setIsOpen] = useState("1");
  const [program, setProgram] = useState([])
  const emptyExercise = {
    sets: "",
    reps: "",
    rest: "",
    weight: "",
    categoryId: "",
    exerciseId: "",
    description: ""
  }
  const emptyDiet = {
    suggestions: [""],
    title: "",
    type: "",
  }

  /*Tab*/
  const [activeTab, setActiveTab] = useState("1");
  const [activeIconTab, setActiveIconTab] = useState("5");
  const [activeAltTab, setActiveAltTab] = useState("9");
  const [verticalTab, setVerticalTab] = useState("1");
  const [verticalIconTab, setVerticalIconTab] = useState("1");

  /*Tab Functions*/
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const toggleIconTab = (icontab) => {
    if (activeIconTab !== icontab) setActiveIconTab(icontab);
  };
  const toggleAltTab = (alttab) => {
    if (activeAltTab !== alttab) setActiveAltTab(alttab);
  };


  const [status, setStatus] = useState()
  const [diet, setDiet] = useState([])
  const [exercises, setExercises] = useState([])

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
          console.log('program', res.data.data.program)
          const p = {...res.data.data.program}
          delete p.diet;
          delete p.exercises;
          setProgram(p)
          setStatus(p.status)
        }

        if(res.data.data.program.exercises.length > 0){
          setExercises(res.data.data.program.exercises)
        }


        if(res.data.data.program.diet.length > 0){
          console.log('diet',res.data.data.program.diet )
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

        if(currentCategory)
          if(exerciseItem.category === currentCategory.slug ){
            return exerciseItem
          }


      })
    }


    return []

  }


  const updateSuggestions = (rowIndex, index, value) => {
    setDiet((prevGrid) => {
      const newGrid = [...prevGrid];
      newGrid[rowIndex] = {
        ...prevGrid[rowIndex],
        suggestions: [
          ...prevGrid[rowIndex].suggestions.slice(0, index),
          value,
          ...prevGrid[rowIndex].suggestions.slice(index + 1),
        ],
      };
      return newGrid;
    });
  };
  const removeDietSuggestionCell = (rowIndex, colIndex) => {
    setDiet(diet.map((row, i) => {
      if(rowIndex === i){
        return {
          ...row,
          suggestions: row.suggestions.filter((_, j) => j !== colIndex)
        }
      }
      return row;
    }))

  };
  const addNewSuggestionCell = (rowIndex) => {
    setDiet(diet.map((row, i) => {
      if(rowIndex === i){
        return {
          ...row,
          suggestions:  [...row.suggestions, '']
        }
      }
      return row;
    }))

  };

  function validateform() {
    let ErrorMessages = []
    exercises.map((ex, index) => {
      if(!ex.categoryId)
        ErrorMessages.push(`لطفا فیلد دسته بندی شماره ${index + 1} را پر کنید`)

      if(!ex.exerciseId)
        ErrorMessages.push(`لطفا فیلد عنوان تمرین شماره ${index + 1} را پر کنید`)

      if(!ex.sets)
        ErrorMessages.push(`لطفا تعداد ست تمرین شماره ${index + 1} را پر کنید`)

      if(!ex.reps)
        ErrorMessages.push(`لطفا تعداد تکرار تمرین شماره ${index + 1} را پر کنید`)
    })

    if(ErrorMessages.length > 0){
      toast.error(ErrorMessages.join('\n'))
    }
  }

  function onSubmitForm() {
    console.log('diet', diet)
    console.log('exercise', exercises)
    validateform()
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
                    <BlockTitle tag="h5" className="block-title">ایجاد برنامه جدید</BlockTitle>
                    <p>در بخش باید متناسب با اطلاعات وارد شده توسط کاربر، برنامه تمرینی و غذایی ایجاد و ثبت شود</p>
                  </BlockHeadContent>
                </BlockHead>
                <PreviewCard>

                  <Nav tabs className="mt-n3">
                    <NavItem>
                      <NavLink
                        tag="a"
                        href="#tab"
                        className={`${classnames({ active: activeTab === "1" })} tab-title tab-space`}
                        onClick={(ev) => {
                          ev.preventDefault();
                          toggle("1");
                        }}
                      >
                        تمرین
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        tag="a"
                        href="#tab"
                        className={`${classnames({ active: activeTab === "2" })} tab-title tab-space`}
                        onClick={(ev) => {
                          ev.preventDefault();
                          toggle("2");
                        }}
                      >
                        برنامه غذایی
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                      <p>
                        ادمین عزیز! در اینجا شما می‌توانید برنامه حرکت های ورزشی را اضافه کرده و  ویرایش کنید. از فرم زیر برای افزودن حرکات ورزشی، انتخاب دسته بندی و انتخاب عنوان حرکت و تعیین تعداد تکرار و ست‌ها استفاده کنید:
                      </p>
                      <div className={[`accordion`]} key={`accordion-1`}  >
                        {
                          exercises.map((itemIndex, index) => {
                            return(
                              <div className="accordion-item"  key={`accordion-item-${itemIndex}`}  >
                                <div   className={[`d-flex flex-row justify-content-between accordion-head${isOpen !== index ? " collapsed" : ""}`]} >
                                  <h6 className="title" onClick={() => toggleCollapse(index)}>{`${toFarsiNumber(index + 1)}. ${(exerciseListOptions.length > 0 && itemIndex.exerciseId) ? (exerciseListOptions.find(i=>i.value === itemIndex.exerciseId))?.label : 'ثبت نشده'}`}</h6>
                                  <span className="icon" onClick={() => {
                                    setExercises(exercises.filter((i, indx) => {
                                      if(indx !== index)
                                        return i
                                    }))
                                  }}>
                                    <IoClose size={18} color={"#526484"}/>
                                  </span>
                                </div>
                                <Collapse className="accordion-body justify-content-between"  isOpen={isOpen === index ? true : false}>
                                  <div className="accordion-inner"  key={`accordion-inner-${itemIndex}`}  >
                                    <div className="d-flex flex-row "   >
                                      <div className="w-100 p-1"  key={`sets-${itemIndex}`}   >
                                        <Field
                                          id={"sets"}
                                          name={"sets"}
                                          label={"تعداد ست"}
                                          type={"number"}
                                          value={itemIndex.sets}
                                          onChange={(e) => {

                                            setExercises(exercises.map((i, indx) => {
                                              if(index === indx){
                                                return {
                                                  ...itemIndex,
                                                  sets: e
                                                }
                                              }

                                              return i;
                                            }))

                                          }}
                                        />
                                      </div>
                                      <div className="w-100 p-2" key={`reps-${itemIndex}`}  >
                                        <Field
                                          id={"reps"}
                                          name={"reps"}
                                          label={"تعداد تکرار"}
                                          type={"number"}
                                          value={itemIndex.reps}
                                          onChange={(e) => {
                                            setExercises(exercises.map((i, indx) => {
                                              if(index === indx){
                                                return {
                                                  ...itemIndex,
                                                  reps: e
                                                }
                                              }

                                              return i;
                                            }))
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div className="d-flex flex-row "  >
                                      <div className="w-100 p-1" key={`rest-${itemIndex}`} >
                                        <Field
                                          id={"rest"}
                                          name={"rest"}
                                          label={"استراحت بین ست"}
                                          type={"number"}
                                          value={itemIndex.rest}
                                          onChange={(e) => {
                                            setExercises(exercises.map((i, indx) => {
                                              if(index === indx){
                                                return {
                                                  ...itemIndex,
                                                  rest: e
                                                }
                                              }

                                              return i;
                                            }))
                                          }}
                                        />
                                      </div>
                                      <div className="w-100 p-1" key={`weight-${itemIndex}`}  >
                                        <Field
                                          id={"weight"}
                                          name={"weight"}
                                          label={"وزن"}
                                          type={"number"}
                                          value={itemIndex.weight}
                                          onChange={(e) => {
                                            setExercises(exercises.map((i, indx) => {
                                              if(index === indx){
                                                return {
                                                  ...itemIndex,
                                                  weight: e
                                                }
                                              }

                                              return i;
                                            }))
                                          }}
                                        />
                                      </div>


                                    </div>
                                    <div className="d-flex flex-row "  key={`categoryId-${itemIndex}`}   >
                                      <div className="w-100 p-1">
                                        <Field
                                          id={"categoryId"}
                                          name={"categoryId"}
                                          label={"دسته بندی تمرین"}
                                          disabled={exerciseCategoriesOptions.length === 0}
                                          options={exerciseCategoriesOptions}
                                          type={"select"}
                                          value={itemIndex.categoryId}
                                          onChange={(e) => {
                                            setExercises(exercises.map((i, indx) => {
                                              if(index === indx){
                                                return {
                                                  ...itemIndex,
                                                  categoryId: e,
                                                  exerciseId: ''
                                                }
                                              }

                                              return i;
                                            }))
                                          }}
                                        />
                                      </div>
                                      <div className="w-100 p-1"  key={`exerciseId-${itemIndex}`}  >
                                        <Field
                                          id={"exerciseId"}
                                          name={"exerciseId"}
                                          disabled={exerciseListOptions.length === 0}
                                          options={loadExerciseOptionsByCategoryId(itemIndex.categoryId)}
                                          label={"عنوان تمرین"}
                                          type={"select"}
                                          value={itemIndex.exerciseId}
                                          onChange={(e) => {
                                            setExercises(exercises.map((i, indx) => {
                                              if(index === indx){
                                                return {
                                                  ...itemIndex,
                                                  exerciseId: e
                                                }
                                              }

                                              return i;
                                            }))
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div className="d-flex flex-row "  key={`description-${itemIndex}`}   >
                                      <div className="w-100 p-1">
                                        <Field
                                          id={"description"}
                                          name={"description"}
                                          label={"توضیحات"}
                                          type={"textarea"}
                                          value={itemIndex.description}
                                          onChange={(e) => {
                                            setExercises(exercises.map((i, indx) => {
                                              if(index === indx){
                                                return {
                                                  ...itemIndex,
                                                  description: e
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
                      <Button outline color="light" className="dana-font mt-3 w-100 d-flex justify-content-center btn-font-weight-thin" onClick={()=>{
                        setExercises(prevState => ([
                          ...prevState,
                          emptyExercise
                        ]))
                      }}>
                        افزودن تمرین جدید
                      </Button>
                    </TabPane>
                    <TabPane tabId="2" >
                      <p>
                        اادمین عزیز! در اینجا شما می‌توانید برنامه های غذایی را اضافه کرده و  ویرایش کنید. از فرم زیر برای افزودن آیتم های غذایی هدف و نوع وعده غذایی را تعیین کنید:
                      </p>
                      <div className={[`accordion`]} key={`accordion-2`}  >
                        {
                          diet.map((item, itemIndex) => {
                            return(
                              <div className="accordion-item"  key={`accordion-item-${itemIndex}`}>
                                <div key={`accordion-head-${itemIndex}`} className={[`d-flex flex-row justify-content-between accordion-head${isOpen !== itemIndex ? " collapsed" : ""}`]} >
                                  <h6 className="title" onClick={() => toggleCollapse(itemIndex)}>{`${toFarsiNumber(itemIndex + 1)}. ${item.title ? item.title : 'ثبت نشده'}`}</h6>
                                  <span className="icon" onClick={() => {
                                      setDiet(diet.filter((i, indx) => {
                                        if(indx !== itemIndex)
                                          return i
                                      }))
                                    }}>
                                    <IoClose size={18} color={"#526484"}/>
                                  </span>
                                </div>
                                <Collapse className="accordion-body justify-content-between"  key={`accordion-body-${itemIndex}`}  isOpen={isOpen === itemIndex ? true : false}>
                                  <div className="accordion-inner"  key={`accordion-inner-${itemIndex}`}>
                                    <div className="d-flex flex-row " key={`accordion-inner-head-${itemIndex}`}  >
                                      <div className="w-100 p-1">
                                        <Field
                                          id={"title"}
                                          name={"title"}
                                          label={"عنوان"}
                                          type={"text"}
                                          value={item.title}
                                          onChange={(e) => {

                                            setDiet(diet.map((i, indx) => {
                                              if(itemIndex === indx){
                                                return {
                                                  ...item,
                                                  title: e
                                                }
                                              }

                                              return i;
                                            }))

                                          }}
                                        />
                                      </div>
                                      <div className="w-100 p-2">
                                        <Field
                                          id={"type"}
                                          name={"type"}
                                          label={"نوع"}
                                          type={"select"}
                                          options={[
                                            {label: 'وعده غذایی', value: 'meal'},
                                            {label: 'غذایی مکمل', value: 'supplement'},
                                            {label: 'محدودیت', value: 'limitation'},
                                          ]}
                                          value={item.type}
                                          onChange={(e) => {
                                            setDiet(diet.map((i, indx) => {
                                              if(itemIndex === indx){
                                                return {
                                                  ...item,
                                                  type: e
                                                }
                                              }

                                              return i;
                                            }))
                                          }}
                                        />
                                      </div>
                                    </div>


                                    <div key={`accordion-inner-add-item-container-${itemIndex}`} className={`d-flex flex-row justify-content-between m-0 add-new-suggestion-container`} >
                                      <h6 className="title add-new-suggestion-title" >موارد پیشنهادی</h6>
                                      <Button
                                        outline
                                        color="light"
                                        className="dana-font m-0 d-flex justify-content-center add-new-suggestion-button"
                                        onClick={(e)=>{
                                          addNewSuggestionCell(itemIndex)
                                        }}>
                                        <LuPlus  size={16} className="me-1 ms-1" color={"#526484"}/> افزودن پیشنهاد جدید
                                      </Button>
                                    </div>


                                    <div key={`accordion-inner-suggestions-container-${itemIndex}`}>
                                      {
                                        item.suggestions.map((dietSuggItem, dietSuggItemIndex)=>{

                                          return(
                                            <div className="d-flex flex-row " key={`accordion-inner-suggestions-item-${itemIndex}-${dietSuggItemIndex}`} >
                                              <div className="d-flex flex-row w-100 p-2"   >
                                                <Field
                                                  label={`پیشنهاد ${dietSuggItemIndex + 1}`}
                                                  type={"text"}
                                                  value={item.suggestions[dietSuggItemIndex]}
                                                  onChange={(e) => {
                                                    updateSuggestions (itemIndex, dietSuggItemIndex, e)

                                                  }}
                                                />

                                                <Button
                                                  outline
                                                  color="light"
                                                  className="dana-font mt-5 me-3 d-flex justify-content-center diet-cancel-btn"
                                                  onClick={(e)=>{
                                                    removeDietSuggestionCell(itemIndex, dietSuggItemIndex)
                                                  }}>
                                                  <IoMdClose size={19} color={"#526484"}/>
                                                </Button>
                                              </div>
                                            </div>
                                          )
                                        })
                                      }
                                    </div>
                                  </div>
                                </Collapse>
                              </div>
                            )
                          })
                        }
                      </div>
                      <Button outline color="light" className="dana-font mt-3 w-100 d-flex justify-content-center btn-font-weight-thin" onClick={()=>{
                        setDiet(prevState => ([
                          ...prevState,
                          emptyDiet
                        ]))
                      }}>
                        افزودن وعده غذایی
                      </Button>
                    </TabPane>
                  </TabContent>


                </PreviewCard>


              </Block>
              <Block size="lg">
                <BlockHead>
                  <BlockHeadContent>
                    <BlockTitle tag="h5" className="block-title">وضعیت برنامه</BlockTitle>
                    <p>از این بخش میتوانید وضعیت برنامه تغییر دهید</p>
                  </BlockHeadContent>
                </BlockHead>
                <PreviewCard className="pt-0 pb-0">

                  <div className="container">
                    <div className="row d-flex flex-row">
                      <div className="col-6 d-flex flex-column">
                        <div className="status-title">تغییر وضعیت برنامه</div>
                        <span>با تغییر وضعیت برنامه، ممکن است دسترسی کاربر به برنامه تغییر کند</span>
                      </div>
                      <div className="col-6" >
                        <Field
                          id={"status"}
                          name={"status"}
                          label={"وضعیت برنامه"}
                          type={"select"}
                          options={[
                            {label: 'پرداخت نشده', value: 'unpaid'},
                            {label: 'تکمیل اطلاعات', value: 'fill_info'},
                            {label: 'در حال آماده سازی', value: 'pending'},
                            {label: 'فعال', value: 'active'},
                            {label: 'منقضی شده', value: 'expired'},
                          ]}
                          value={status}
                          onChange={(e) => {
                            setStatus(e)
                          }}
                        />
                      </div>
                    </div>
                  </div>

                </PreviewCard>
              </Block>

              <Block size="lg">
                <BlockHead>
                  <BlockHeadContent>
                    <BlockTitle tag="h5" className="block-title">اطالاعات کاربر</BlockTitle>
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


              <Block size="lg">
                <div className="btn btn-primary d-flex w-100 dana-font justify-content-center align-content-center" onClick={()=>{
                  onSubmitForm()
                }}>
                  ثبت
                </div>
              </Block>
            </Content>
          </>
      }
    </>


  );
};

export default ProgramAdd;
