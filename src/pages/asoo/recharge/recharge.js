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


const Recharge = ({ ...props }) => {

  const { id } = useParams();
  const location = useLocation();
  const isEditing = location.pathname.includes('course-edit');
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const path = '/Courses'
  const dispatch = useDispatch();
  const [isLoading, setIsloading] = useState(isEditing ? true : false)
  const [data, setData] = useState({
    "student": null,
    "paymentMethod": "",
    "amount": null,
    "discount": null,
    "total": null,
    "description": "",
  });


  useEffect(()=>{
    console.log('teacher changed', data.student)
    async function getUserDept(){
      if(data.student){
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/Transaction/Balance/${data.student}`,
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
              amount: (res.data.data.amount < 0 ? Math.abs(parseInt(res.data.data.amount)) : 0)
            })
          )
        }

      }

    }

    getUserDept()
  },[data.student])






  const rechargeWalletSummaryData = [
    {
      key: 'مبلغ شارژ',
      value: data.amount || 0,
      suffix: 'ریال'
    },
    {
      key: 'تخفیف',
      value: data.discount || 0,
      suffix: 'ریال'
    },
    {
      divider: true
    },
    {
      key: 'مبلغ قابل پرداخت',
      value: (parseInt(data.amount) - parseInt(data.discount)) || 0,
      suffix: 'ریال',
      bold: true
    },
  ];

  function handleOnFieldChange(change){
    setData((prevData) => ({
      ...prevData,
      ...change
    }));
    console.log('setValue', change)
  }
  async function handleOnSubmit(){
    console.log("form", data);


    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/Transaction/Transaction`,
        {

          amount: parseInt(data.amount),
          discount: parseInt(data.discount),
          reward: 0,
          description: data.description,

          type: 1, //code=1 slug=transactionType (Deposit)
          method: data.paymentMethod,
          category: 1, //code=1 slug=transactionCategory

          status: true,
          date: new Date(),
          user: data.student

        }, {
          headers: {
            "authorization": `bearer ${auth.token}`
          }
        }
      );

      // if(res.data.statusCode === 200)
      //   navigate(`/transactions`);

    } catch (e) {
      console.log("Error: ", e);
    }
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
            componentAfterForm={<CheckoutSummary data={rechargeWalletSummaryData}/>}
            submitButtonText={"ایجاد دوره"}
            onFieldChange={handleOnFieldChange}
            onFormSubmit={handleOnSubmit}
          />
      }
    </>

  );
};

export default Recharge;
