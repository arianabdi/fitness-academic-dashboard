import React, { useEffect, useState } from "react";
import Form, { FormIsLoading } from "../../../components/fouladyar/form";
import { useDispatch, useSelector } from "react-redux";
import { selectPending } from "../../../redux/store/services/general/store";
import { formStructure, formStatics } from "./index";
import axios from "axios";
import { convertDate } from "../../../shared/shared";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getItemById } from "../../../redux/store/services/asoo/courses/store/course-actions";
import { toFarsiNumber } from "../../../shared/toFarsiNumber";
import { CheckoutSummary } from "../../../shared/checkoutSummary";


const Checkout = ({ ...props }) => {

  const { id } = useParams();
  const location = useLocation();
  const isEditing = location.pathname.includes('course-edit');
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const path = '/Courses'
  const dispatch = useDispatch();
  const [isLoading, setIsloading] = useState(isEditing ? true : false)
  const [data, setData] = useState({
    "teacher": null,
    "paymentMethod": "",
    "amount": 0,
    "reward": 0,
    "description": "",
  });




  const checkoutSummaryData = [
    {
      key: 'مبلغ دستمزد',
      value: data.amount || 0,
      suffix: 'ریال',
    },
    {
      key: 'مبلغ پاداش',
      value: data.reward || 0,
      suffix: 'ریال',
    },
    {
      divider: true
    },
    {
      key: 'جمع کل دستمزد',
      value: (parseInt(data.amount) + parseInt(data.reward)) || 0,
      suffix: 'ریال',
      bold: true
    },
  ];

  useEffect(()=>{
    console.log('teacher changed', data.teacher)
    async function getTeacherDemand(){
      if(data.teacher){
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/Transaction/Balance/${data.teacher}`,
          {
            headers: {
              "authorization": `bearer ${auth.token}`
            }
          }
        );

        console.log('notifications', parseInt(res.data.data.amount))

        if(res.data.statusCode === 200){
          setData(prevState => ({
              ...prevState,
              amount: (res.data.data.amount > 0 ? res.data.data.amount : 0)
            })
          )
        }

      }

    }

    getTeacherDemand()
  },[data.teacher])


  function handleOnFieldChange(change){
    setData((prevData) => ({
      ...prevData,
      ...change
    }));
  }
  async function handleOnSubmit(){
    console.log("form", data);

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/Transaction/Transaction`,
        {

          amount: parseInt(data.amount),
          discount: 0,
          reward: parseInt(data.reward),
          description: data.description,

          type: 2, //code=2 slug=transactionType (widthdraw)
          method: data.paymentMethod,
          category: 1, //code=1 slug=transactionCategory

          status: true,
          date: new Date(),
          user: data.teacher

        }, {
          headers: {
            "authorization": `bearer ${auth.token}`
          }
        }
      );

      if(res.data.statusCode === 200)
        navigate(`/transactions`);

    } catch (e) {
      console.log("Error: ", e);
    }

    // !isEditing ? await onCreate() : await onUpdate();
  }



  function Empty(){
    return(
      <div></div>
    )
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
            componentBeforeForm={<Empty/>}
            componentAfterForm={<CheckoutSummary data={checkoutSummaryData}/>}
            submitButtonText={"ایجاد دوره"}
            onFieldChange={handleOnFieldChange}
            onFormSubmit={handleOnSubmit}
          />
      }
    </>

  );
};

export default Checkout;
