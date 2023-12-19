import React, { useEffect, useState } from "react";
import Form, { FormIsLoading } from "../../../components/fouladyar/form";
import { useDispatch, useSelector } from "react-redux";
import { formStatics, formStructure } from "./index";
import axios from "axios";
import { convertDate } from "../../../shared/shared";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getItemById } from "../../../redux/store/services/asoo/flight/store/flight-actions";



function FlightAdd({ ...props }) {

  const { id } = useParams();
  const location = useLocation();
  const isEditing = location.pathname.includes("plane-edit");
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const path = '/Flights/Flight'
  const dispatch = useDispatch();
  const [isLoading, setIsloading] = useState(isEditing ? true : false);
  const [defaultPrice, setDefaultPrice] = useState({
    "pilotPrice": null,
    "coPilotPrice": null,
  });

  const [data, setData] = useState({
    // "id": null,
    "type": 1,
    "date": "",
    "duration": null,
    "place": "",
    "status": true,
    "pilotPrice": null,
    "coPilotPrice": null,
    "pilot": "",
    "coPilot": "",
    "plane": null,
    // "discount": null,
    // "additionalCost": null,

  });

  async function loadData() {
    const res = await dispatch(getItemById(id));
    if (res.statusCode === 200) {

      setData((prevData) => ({
        ...prevData,
        ...res.data,
        date: new Date(res.data.date),
      }));
      setIsloading(false);
      return data;
    }

    return {};

  }

  async function getFlightPilotPricePerHour(){
   try {
     const res = await axios.get(`${process.env.REACT_APP_API_URL}/Settings/Setting?slug=flightPilotPricePerHour`,
       {
         headers: {
           "authorization": `bearer ${auth.token}`
         }
       }
     );

     console.log('getFlightPilotPricePerHour', parseInt(res.data.data.setting[0].value))


     if(res.data.statusCode === 200){
       setDefaultPrice(prevState => ({
           ...prevState,
            pilotPrice: parseInt(res.data.data.setting[0].value) || 1
         })
       )
     }
   }catch (e) {
     console.log('Error:', e)
   }

  }

  async function getFlightCoPilotPricePerHour(){
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/Settings/Setting?slug=flightCoPilotPricePerHour`,
      {
        headers: {
          "authorization": `bearer ${auth.token}`
        }
      }
    );

    console.log('getFlightCoPilotPricePerHour',  parseInt(res.data.data.setting[0].value))

    if(res.data.statusCode === 200){
      setDefaultPrice(prevState => ({
          ...prevState,
          coPilotPrice: parseInt(res.data.data.setting[0].value) || 0
        })
      )
    }


  }


  useEffect(() => {
    if (isEditing)
      loadData();

    getFlightCoPilotPricePerHour()
    getFlightPilotPricePerHour()
  }, []);



  useEffect(()=>{
    setData(prevState => ({
      ...prevState,
      "pilotPrice": data.duration * defaultPrice.pilotPrice,
      "coPilotPrice": data.duration * defaultPrice.coPilotPrice,
    }))
  }, [data.duration])


  async function onCreate() {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}${path}`,
        {
          ...data,
          "date": convertDate(data.date),
        }, {
          headers: {
            "authorization": `bearer ${auth.token}`
          }
        }
      );

      console.log('res', res)
      if(res.data.statusCode === 201)
        navigate(`/flight-list`);

    } catch (e) {
      console.log("Error: ", e);
    }
  }

  async function onUpdate() {
    try {
      const res = await axios.put(`${process.env.REACT_APP_API_URL}${path}`,
        {
          ...data,
          "date": convertDate(data.date),
        }, {
          headers: {
            "authorization": `bearer ${auth.token}`
          }
        }
      );

      console.log('res', res)
      if(res.data.statusCode === 200)
        navigate(`/flight-list`);

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
            submitButtonText={"ایجاد کلاس"}
            onFieldChange={handleOnFieldChange}
            onFormSubmit={handleOnSubmit}
          />
      }
    </>


  );
};

export default FlightAdd;
