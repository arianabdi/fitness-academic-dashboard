import React, { useEffect, useState } from "react";
import Content from "../../../layout/content/Content";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Button,
  Col,
  PreviewCard,
  Row
} from "../../../components/Component";
import { useTranslation } from "react-i18next";
import { Field } from "../field/field";
import DuotoneSpace from "react-syntax-highlighter/dist/cjs/styles/prism/duotone-space";
import { makeStyles } from "@material-ui/styles";
import { Alert } from "reactstrap";
import Icon from "../../icon/Icon";
import axios from "axios";
import { convertDate } from "../../../shared/shared";
import { useSelector } from "react-redux";
import { FormUtils, loadOptionsFromApi } from "../../../shared/forms";


function Form ({ form, fields, statics, isEditing, isloading, componentBeforeForm, componentAfterForm,  onFieldChange, onFormSubmit }) {
  const { t, i18n } = useTranslation();

  const auth = useSelector((state) => state.auth);
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState()
  const classes = useStyles();
  const [data, setData] = useState(form)
  const [_cols, set_cols] = useState([])
  const [_rows, set_rows] = useState([])

  useEffect(()=>{
    setData(form)
  },[form])

  function validateForm(){
    let errors = [];

    fields.map(row => {
      row.map(field =>{
        if(field.regex){
          const isMatch = field.regex.test(form[field.slug])
          if(!isMatch){
            errors.push(field.alert);

          }
        }
      })
    })



    console.log('error', errors);
    if(errors.length === 0){
      setShowAlert(false)
      setAlertText('');
      return true;
    }

    setAlertText(
      <>
        شما باید فیلد های زیر را تغییر دهید:
        <div className="space-10"/>
        <ul>
          {
            errors.map(message => {
              return (
                <li>{message}</li>
              )
            })
          }
        </ul>
      </>
    )
    setShowAlert(true)
    return false;
  }





  useEffect(() => {
    set_cols([])
    set_rows([])

    async function fetchDataAndRender() {
      const rows = [];
      for (const [rowIndex, row] of fields.entries()) {

        for (const [colIndex, col] of row.entries()) {
          const selectOptions = col.chooseOptionsFromApi ?
            (await FormUtils.loadOptionsFromApi(auth, col.path, col.key, col.chooseOptionsLabelFrom, col.chooseOptionsValueFrom) || null) :
            (col.options || null)

          set_cols(prevState => ([
            ...prevState,
            {
              ...col,
              options: selectOptions,
              rowLength: row.length,
              rowIndex: rowIndex
            }
          ]))
        }


        set_rows(prevState => ([
          ...prevState,
          {
            rowIndex: rowIndex,
            rowLength: row.length
          }
        ]))
      }



    }

    fetchDataAndRender();
  }, []);

  return (
    <Content page="component">
      <Block size="lg">
        <BlockHead>
          <BlockHeadContent>
            <BlockTitle tag="h5">{isEditing ? statics.editTitle : (statics.title || 'فرم بدون عنوان')}</BlockTitle>
            <p>{isEditing ? statics.editDescription : (statics.description || 'فرم بدون خلاصه')}</p>
          </BlockHeadContent>
        </BlockHead>
        <PreviewCard>
          <div className="card-head">
            <h5 className="card-title">{isEditing ? statics.editTitle : (statics.title || 'فرم بدون عنوان')}</h5>
          </div>
          <div className="card-head">
            <h5 className="card-title alert-container">

              {
                !showAlert ? null :
                  <div>
                    <Alert className="alert-fill alert-icon" color="danger">
                      {alertText}
                      <Icon name="alert-circle" />
                    </Alert>
                  </div>
              }
            </h5>
          </div>
          <form>
            {componentBeforeForm}

            {
              !_rows ? '' :
                _rows.map((row, rIndex)=>{

                  return(
                    <Row key={`row-${rIndex}`} className={`g-4 ${classes.formRow}`}>
                      {
                        !_cols ? '' :
                          _cols.map((col, cIndex) => {
                            return(
                              <>
                                {
                                  rIndex !== col.rowIndex ? '' :
                                    (
                                      <Col lg={`${12 / col.rowLength}`} className={col.type} key={`col-${cIndex}-${col.rowIndex}`}>
                                        {
                                          !col.slugDependency || (form[col.slugDependency] === col.slugDependencyStatement) ? (
                                            <Field
                                              id={col.slug}
                                              name={col.slug}
                                              label={col.title}

                                              placeholder={col.placeholder}
                                              isRequired={col.isRequired}
                                              disabled={col.disabled || false}
                                              isJalali={col.isJalali}
                                              options={col.options}
                                              onChange={(value) => onFieldChange({ [col.slug]: value })}
                                              value={form[col.slug]}
                                              type={col.type}


                                              className={'post-image-uploader'}
                                              fileUploadType={'post'}
                                              multiple={false}
                                            />
                                          ) : (
                                            <></>
                                          )
                                        }

                                      </Col>
                                    )

                                }
                              </>

                            )
                          })
                      }
                    </Row>
                  )
                })
            }

            {componentAfterForm}
            <Row className="g-4 form-submit-container">
              <Col xl="12" className={"no-padding"}>
                <button type={"button"} className="btn btn-primary form-submit-btn" disabled={isloading} color="primary" size="lg" onClick={()=>{

                  if(!validateForm())
                    return

                  onFormSubmit()
                }}>
                  {isEditing ? statics.editSubmitText : (statics.submitText || 'ایجاد')}
                </button>
              </Col>
            </Row>
          </form>
        </PreviewCard>
      </Block>

    </Content>
  );
};

export default Form;

export function FormIsLoading({isEditing, statics}){
  return(
    <Content page="component">
      <Block size="lg">
        <BlockHead>
          <BlockHeadContent>
            <BlockTitle tag="h5">{isEditing ? statics.editTitle : (statics.title || 'فرم بدون عنوان')}</BlockTitle>
            <p>{isEditing ? statics.editDescription : (statics.description || 'فرم بدون عنوان')}</p>
          </BlockHeadContent>
        </BlockHead>
        <PreviewCard>
          <div className="card-head">
            <h5 className="card-title">{isEditing ? statics.editTitle : (statics.title || 'فرم بدون عنوان')}</h5>
          </div>

          <div className="align-center justify-center w-100">
            در حال بارگذاری...
          </div>

        </PreviewCard>
      </Block>

    </Content>
  )
}


const useStyles = makeStyles((theme) => ({
    formRow: {
      marginTop: "0px",
    }
  })
);

