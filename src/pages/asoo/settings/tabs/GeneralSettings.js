import React, { useEffect, useState } from "react";
import { SettingHeader, SettingItem } from "../../../../shared/settting";
import { useSelector } from "react-redux";
import axios from "axios";
import { LoadingState } from "../../../../components/fouladyar/loading-state/loadingState";

const GeneralSettings = () => {

  const auth = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({
    companyAddress: '',
    companyPhone: '',
    currency: '',
    email: '',
  })

  const structure = [
    {
      title: 'آدرس شرکت',
      slug: 'companyAddress',
      description: 'آدرس شرکت را وارد کنید',
      placeholder: '',
      disabled: false,
      type: 'text'
    },
    {
      title: 'تلفن شرکت',
      slug: 'companyPhone',
      description: 'تلفن شرکت را وارد کنید',
      placeholder: '',
      disabled: false,
      type: 'text'
    },
    {
      title: 'واحد پول سیستم',
      slug: 'currency',
      description: 'واحد پول را وارد کنید',
      placeholder: '',
      disabled: false,
      type: 'text'
    },
    {
      title: 'پست الکترونیک',
      slug: 'email',
      description: 'پست الکترونیک را وارد کنید',
      placeholder: '',
      disabled: false,
      type: 'text'
    }
  ]



  useEffect(()=>{
    async function loadData(){
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/Settings/Setting?dataType=String`, {
          headers: {
            "authorization": `bearer ${auth.token}`
          }
        }
      );

      console.log('GeneralSettigns', res);

      if(res.data.statusCode === 200){
        const settings = res.data.data.setting;
        if(res.data.data.setting.length > 0){
          setData({
            companyAddress: (settings.filter(item=>item.slug === "companyAddress"))[0].value,
            companyPhone: (settings.filter(item=>item.slug === "companyPhone"))[0].value,
            currency: (settings.filter(item=>item.slug === "currency"))[0].value,
            email: (settings.filter(item=>item.slug === "email"))[0].value,
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
        title={'تنظیمات عمومی'}
        description={'در این بخش تنظیمات عمومی سیستم از جمله اطلاعات تماس شرکت خود را وارد کنید'}
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

export default GeneralSettings;
