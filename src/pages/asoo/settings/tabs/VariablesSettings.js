import React, { useEffect, useState } from "react";
import { SettingHeader, SettingItem } from "../../../../shared/settting";
import { useSelector } from "react-redux";
import axios from "axios";
import { LoadingState } from "../../../../components/fouladyar/loading-state/loadingState";

const NotificationSettings = () => {

  const auth = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({
    FlightPilotPricePerHour: null,
    FlightCoPilotPricePerHour: null,
    CourseTuitionPricePerHour: null,
    FuelPricePerLiter: null,
  })

  const structure = [
    {
      title: 'هزینه پرواز برای خلبان',
      slug: 'FlightPilotPricePerHour',
      description: 'به ازای هر ساعت پرواز',
      placeholder: '',
      disabled: false,
      type: 'number'
    },
    {
      title: 'هزینه پرواز برای کمک خلبان',
      slug: 'FlightCoPilotPricePerHour',
      description: 'به ازای هر ساعت پرواز',
      placeholder: '',
      disabled: false,
      type: 'number'
    },
    {
      title: 'هزینه تدریس کلاس',
      slug: 'CourseTuitionPricePerHour',
      description: 'به ازای هر ساعت تدریس',
      placeholder: '',
      disabled: false,
      type: 'number'
    },
    {
      title: 'هزینه سوخت',
      slug: 'FuelPricePerLiter',
      description: 'به ازای هر لیتر',
      placeholder: '',
      disabled: false,
      type: 'number'
    },
  ]



  useEffect(()=>{
    async function loadData(){
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/Settings/Setting?dataType=Number`, {
          headers: {
            "authorization": `bearer ${auth.token}`
          }
        }
      );

      console.log('variableSettings', res);

      if(res.data.statusCode === 200){
        const settings = res.data.data.setting;
        if(res.data.data.setting.length > 0){
          setData({
            FlightPilotPricePerHour: parseInt((settings.filter(item=>item.slug === "flightPilotPricePerHour"))[0].value),
            FlightCoPilotPricePerHour: parseInt((settings.filter(item=>item.slug === "flightCoPilotPricePerHour"))[0].value),
            CourseTuitionPricePerHour: parseInt((settings.filter(item=>item.slug === "courseTuitionPricePerHour"))[0].value),
            FuelPricePerLiter: parseInt((settings.filter(item=>item.slug === "fuelPricePerLiter"))[0].value),
          })
        }
        setIsLoading(false);
      }

    }


    loadData()
  }, [])

  function onSubmit(){
      console.log('data', data);
  }

  return (
    <div class="card-inner card-inner-lg">
      <SettingHeader
        title={'تنظیمات متغیرهای پیشفرض'}
        description={'در این تنظیمات متغیرهای پیشفرض مربوط به بخش هزینه های سیستم را وارد کنید'}
      />
      <div class="nk-block">
        {
          isLoading ? <LoadingState/> :
            <div className="gy-3 form-settings">
              {
                structure.map(item => {
                  return(
                    <SettingItem
                      data={item}
                      value={data[item.slug]}
                      onChange={(e) => setData({
                        ...data,
                        [item.slug]: e
                      })}
                    />
                  )
                })
              }
              <div class="row g-3">
                <div class="col-lg-7">
                  <div class="form-group mt-2">
                    <div className="btn btn-lg btn-primary" onClick={()=>{onSubmit()}}>بروزرسانی</div>
                  </div>
                </div>
              </div>
            </div>
        }
      </div>
    </div>
  );
};

export default NotificationSettings;
