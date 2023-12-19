import React, { useEffect, useState } from "react";
import { SettingHeader, SettingItem } from "../../../../shared/settting";
import { useSelector } from "react-redux";
import axios from "axios";
import { LoadingState } from "../../../../components/fouladyar/loading-state/loadingState";

const GeneralSettings = () => {

  const auth = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({
    Language: '',
    templateFont: '',
    templateFontSize: '',
    templateTheme: '',
  })

  const structure = [
    {
      title: 'زبان سیستم',
      slug: 'Language',
      description: 'زبان سیستم را انتخاب کنید',
      placeholder: '',
      disabled: false,
      options: [
        {label: 'فارسی', value: 'فارسی'},
        {label: 'انگلیسی', value: 'انگلیسی'},
      ],
      type: 'select'
    },
    {
      title: 'فونت پیشفرض',
      slug: 'templateFont',
      description: 'فونت پیشفرض را انتخاب کنید',
      placeholder: '',
      options: [
        {label: 'ایران سنس', value: 'iransans'},
        {label: 'یکان بخ', value: 'yekan-bakh'},
        {label: 'تاهوما', value: 'tahoma'},
        {label: 'دانا', value: 'dana'},
      ],
      disabled: false,
      type: 'select'
    },
    {
      title: 'اندازه فونت',
      slug: 'templateFontSize',
      description: 'اندازه فونت را وارد کنید',
      placeholder: '',
      disabled: false,
      type: 'number'
    },
    {
      title: 'تم قالب',
      slug: 'templateTheme',
      description: 'تم قالب را انتخاب کنید',
      placeholder: '',
      disabled: true,
      options: [
        {label: 'روشن', value: 'light'},
      ],
      type: 'select'
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

      console.log('GeneralSettings', res);

      if(res.data.statusCode === 200){
        const settings = res.data.data.setting;
        if(res.data.data.setting.length > 0){

          setData({
            Language: (settings.filter(item=>item.slug === "Language"))[0].value,
            templateFont: (settings.filter(item=>item.slug === "templateFont"))[0].value,
            templateFontSize: (settings.filter(item=>item.slug === "templateFontSize"))[0].value,
            templateTheme: (settings.filter(item=>item.slug === "templateTheme"))[0].value,
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
        title={'تنظیمات قالب'}
        description={'در این بخش تنظیمات قالب سیستم از جمله فونت و رنگبندی را وارد کنید'}
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
