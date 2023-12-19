import React, { useEffect, useState } from "react";
import { Field } from "../components/fouladyar/field/field";
import { FormUtils } from "./forms";
import { useSelector } from "react-redux";


export function SettingItem({ data, value, onChange }) {
  const auth = useSelector((state) => state.auth);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    async function fetchDataAndRender() {
      setOptions(
        data.chooseOptionsFromApi ?
          (await FormUtils.loadOptionsFromApi(auth, data.path, data.key, data.chooseOptionsLabelFrom, data.chooseOptionsValueFrom) || null) :
          (data.options || null)
      );
    }

    fetchDataAndRender();
  }, []);

  return (
    <div key={data.slug} class="row g-3 align-center">
      <div class="col-lg-5">
        <div class="form-group">
          <label className="form-label" htmlFor="site-email">{data.title} </label>
          <span class="form-note">{data.description}</span>
        </div>
      </div>
      <div class="col-lg-7">
        <div class="form-group">
          <div class="form-control-wrap">
            <Field
              key={data.slug}
              type={data.type}
              name={data.slug}
              options={options}
              placeholder={data.placeholder}
              disabled={data.disabled}
              value={value}
              onChange={(e) => {
                onChange(e);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}


export function SettingHeader({ title, description}) {
  return (
    <div class="nk-block-head nk-block-head-lg">
      <div class="nk-block-between">
        <div class="nk-block-head-content">
          <h5 class="nk-block-title">{title}</h5>
          <span>{description}</span>
        </div>
        <div class="nk-block-head-content align-self-start d-lg-none">
          <a href="#" className="toggle btn btn-icon btn-trigger mt-n1"
             data-target="userAside"><em class="icon ni ni-menu-alt-r"></em></a>
        </div>
      </div>
    </div>
  );
}
