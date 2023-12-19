import React, { useEffect, useState } from "react";
import Select from "react-select";
import {useTranslation} from "react-i18next";
import {DropdownFileUploader} from "../DropdownFileUploader/DropdownFileUploader";
import DatePicker from "react-datepicker";
import { ConvertGregorianToJalali } from "../../../shared/convertGregorianToJalali";
import MultiDatePicker  from "react-multi-date-picker";
import fa from "react-date-object/locales/gregorian_fa";
import persian from "react-date-object/calendars/persian";

export const Field = ({
    id,
    ref,
    name,
    type,
    label,
    value,
    // file-upload
    fileUploadType,
    fileUploadAcceptedFiles,
    formControlClassName,
    multiple,
    accept,
    format,
    sources ,
    disabled,
    isRequired,
    isJalali,
    defaultValue,
    options,
    className,
    errors,
    validation,
    showSuccessValidation,
    placeholder,
    labelClassName,
    onChange,
    onBlur,
    onFocus,
    ...props
}) => {
    const { t, i18n } = useTranslation();

    let invalid = {
        color: "#e85347",
        fontSize: "11px",
        fontStyle: "italic"
    }



    function FieldLabel({className}){
        return(
            <>
                {
                    !label ? '' :
                        <div className={`form-label-group ${labelClassName} ${className}`}>
                            <label style={{opacity: `${disabled ? '0.5': "1"}`}} >
                                {label} <span className="text-danger">{isRequired ? "*" : ''}</span>
                            </label>
                        </div>
                }
            </>
        )
    }


    if(type === "number"){
        return (
            <div className="form-group w-100 mb-0">
                <FieldLabel/>
                <div className="form-control-group">
                    <input
                        key={name}
                        type={"text"}
                        pattern="[0-9]*"
                        placeholder={placeholder}
                        className={`form-control form-control-lg ${className}`}
                        ref={ref}
                        disabled={disabled}
                        name={name}
                        // defaultValue={value}
                        value={value}
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                            }
                        }}
                        onChange={(e)=> {onChange(e.target.value ? parseFloat(e.target.value) : '')}}
                    />

                    {
                        validation ? (!validation.isValid ? (<span className="invalid">{t(validation.message)}</span>) : (showSuccessValidation === true ? <span className="valid">{t(validation.message)}</span> : '')  ) : ''
                    }
                </div>
            </div>
        )
    }

    if(type === "text" || type === "password"){
        return (
            <div className="form-group w-100 mb-0">
                <FieldLabel/>
                <div className={`form-control-group form-group ${formControlClassName}`}>
                    <input
                        key={name}
                        type={type}
                        className={`form-control form-control-lg ${className}`}
                        ref={ref}
                        name={name}
                        placeholder={placeholder}
                        disabled={disabled}
                        defaultValue={value}
                        // value={value}
                        onChange={(e)=> {onChange(e.target.value)}}
                        onBlur={onBlur}
                        onFocus={onFocus}
                        // required={isRequired}
                    />
                    {
                        validation ? (!validation.isValid ? (<span className="invalid">{t(validation.message)}</span>) : (showSuccessValidation === true ? <span className="text-success">{t(validation.message)}</span> : '')  ) : ''
                    }
                </div>
            </div>
        )
    }

    if(type === 'checkbox'){
        const handleChange = () => {
            // setChecked(!checked);
        };
        return (
          <>
              <div  className={`form-group `}>
                  <FieldLabel/>
                  <div  className={`form-group ${formControlClassName}`}>
                      <input
                        key={name}
                        type="checkbox"
                        checked={value}
                        // defaultChecked={value}
                        disabled={disabled}
                        onChange={handleChange}
                        id={id}
                        name={name}
                      />
                  </div>
              </div>
          </>

        )
    }

    if(type === 'date'){

        let date = value === '' || value === null ? null : new Date(value);


        return (
            <div className="form-group w-100 mb-0">
                <FieldLabel/>
                <div className="form-control-group">

                    <MultiDatePicker
                      placeholder={placeholder}
                      className={`form-control form-control-lg ${className}`}
                      value={date}
                      locale={isJalali ? fa : null}
                      calendar={isJalali ? persian : null}
                      disabled={disabled}
                      name={name}
                      id={id}
                      format={format}
                      onChange={event=> onChange(new Date(event?.toDate?.().toString()))}
                    />
                    {
                        validation ? (!validation.isValid ? (<span className="invalid">{t(validation.message)}</span>) : (showSuccessValidation === true ? <span className="text-success">{t(validation.message)}</span> : '')  ) : ''
                    }
                </div>

            </div>
        )
    }

    if(type === "image-preview"){
      if(!value)
        return null

      return (
          <>
            <div className="card">
              <FieldLabel className={"label"}/>
              <img src={value} alt={""}/>
            </div>
          </>
      )
    }

    if(type === "file-upload"){

        return (
          <div  className="form-group">
            <FieldLabel/>
            <DropdownFileUploader
              value={value}
              className={className}
              multiple={multiple}
              fileUploadAcceptedFiles={fileUploadAcceptedFiles}
              fileUploadType={fileUploadType}
              onChange={onChange}
            />
          </div>
        )
    }

    if(type === "radiobox"){
        return (
          <div className="form-group">
              <FieldLabel/>
              <ul className="custom-control-group g-3 align-center flex-wrap"

              >
                  {
                      options.map(item => {
                          return(
                            <li>
                                <div className="custom-control custom-radio"
                                     onClick={(event)=>{
                                         onChange(item.value)
                                     }}>
                                    <input
                                      type="radio"
                                      className="custom-control-input"
                                      checked={value === item.value}
                                      name={name}
                                      value={item.value}
                                    />
                                    <label
                                      className="custom-control-label"
                                      htmlFor={name}
                                    >
                                        {item.label}
                                    </label>
                                </div>
                            </li>
                          )
                      })
                  }
                  {/*<li>*/}
                  {/*    <div className="custom-control custom-radio">*/}
                  {/*        <input*/}
                  {/*          type="radio"*/}
                  {/*          className="custom-control-input"*/}
                  {/*          defaultChecked*/}
                  {/*          name="reg-public"*/}
                  {/*          id="reg-enable"*/}
                  {/*        />*/}
                  {/*        <label className="custom-control-label" htmlFor="reg-enable">*/}
                  {/*            Enable*/}
                  {/*        </label>*/}
                  {/*    </div>*/}
                  {/*</li>*/}
                  {/*<li>*/}
                  {/*    <div className="custom-control custom-radio">*/}
                  {/*        <input*/}
                  {/*          type="radio"*/}
                  {/*          className="custom-control-input"*/}
                  {/*          name="reg-public"*/}
                  {/*          id="reg-disable"*/}
                  {/*        />*/}
                  {/*        <label className="custom-control-label" htmlFor="reg-disable">*/}
                  {/*            Disable*/}
                  {/*        </label>*/}
                  {/*    </div>*/}
                  {/*</li>*/}
                  {/*<li>*/}
                  {/*    <div className="custom-control custom-radio">*/}
                  {/*        <input*/}
                  {/*          type="radio"*/}
                  {/*          className="custom-control-input"*/}
                  {/*          name="reg-public"*/}
                  {/*          id="reg-request"*/}
                  {/*        />*/}
                  {/*        <label className="custom-control-label" htmlFor="reg-request">*/}
                  {/*            On Request*/}
                  {/*        </label>*/}
                  {/*    </div>*/}
                  {/*</li>*/}
              </ul>
          </div>
        )
    }

    if(type === "textarea"){
        return (
            <div className="form-group w-100 mb-0">
                <FieldLabel/>
                <div className="form-control-group">
                    <textarea
                        key={name}
                        className="form-control form-control-lg no-resize ex-large"
                        placeholder={placeholder}
                        defaultValue={value}
                        // value={value}
                        ref={ref}
                        disabled={disabled}
                        id={id}
                        name={name}
                        onChange={(e)=> {onChange(e.target.value)}}
                    ></textarea>
                    {
                        validation ? (!validation.isValid ? (<span className="invalid">{t(validation.message)}</span>) : (showSuccessValidation === true ? <span className="text-success">{t(validation.message)}</span> : '')  ) : ''
                    }
                </div>
            </div>

        )
    }

    if(type === 'select'){

        const selectOptions = options.map(item => {return {value: item.value, label: t(item.label)}});
        return (
            <div className="form-group w-100 mb-0">
                <FieldLabel/>
                <div className="form-control-group form-group">
                    <div className="form-control-select">
                        <Select
                            key={name}
                            id={id}
                            name={name}
                            isDisabled={disabled}
                            className="react-select-container"
                            classNamePrefix="react-select"
                            defaultValue={(selectOptions.filter(item => item.value === value))[0]}
                            options={selectOptions}
                            onChange={(e)=>{onChange(e.value)}}
                            placeholder={placeholder}
                        />
                    </div>
                    {
                        validation ? (!validation.isValid ? (<span style={invalid} className="invalid">{t(validation.message)}</span>) : (showSuccessValidation === true ? <span className="text-success">{t(validation.message)}</span> : '')  ) : ''
                    }
                </div>
            </div>
        )
    }

};
