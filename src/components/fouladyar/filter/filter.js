
import { Button, Card } from "reactstrap";
import React, {useEffect, useState} from "react";
import FilterItem from "./filter.item";
import {useTranslation} from "react-i18next";
import { Icon } from "../../Component";
import { FormUtils } from "../../../shared/forms";
import { useSelector } from "react-redux";
import { LoadingState } from "../loading-state/loadingState";
import { LuMoreHorizontal } from "react-icons/lu";
import { MdClose } from "react-icons/md";



export default function Filter({filterStructure, filter, onClose, onSubmit, onChange}) {

  const auth = useSelector((state) => state.auth);
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true)
  const [_rows, set_rows] = useState([])

  useEffect(() => {
    set_rows([])

    async function fetchDataAndRender() {
      for (const [rowIndex, row] of filterStructure.entries()) {
        const selectOptions = row.chooseOptionsFromApi ?
          (await FormUtils.loadOptionsFromApi(auth, row.path, row.key, row.chooseOptionsLabelFrom, row.chooseOptionsValueFrom) || null) :
          (row.options || null)

        set_rows(prevState => ([
          ...prevState,
          {
            ...row,
            options: selectOptions,
            rowIndex: rowIndex
          }
        ]))
      }

      _rows.map(item => {
        if (filter.hasOwnProperty(item.slug)) {
          // If the key exists, set isSelected to true
          return {
            ...item,
            selected: true
          }
        }

        return item;
      })

      setIsLoading(false)
    }

    fetchDataAndRender();

  },[])

  async function getFilterSearchValues(){
    const obj = _rows.filter(item=> item.selected).reduce((acc, curr) => {
      acc[curr.slug] = curr.value;
      return acc;
    }, {});

   return obj;
  }

  return (
    <div>
      <div className="btn" onClick={onClose}>
        <a href="#cancel" className="close">
          <MdClose size={22} color={"#26282a"} onClick={(ev) => {ev.preventDefault();}}/>
        </a>
      </div>
      <h4 style={{ padding: "0px 20px" }}>{t('filter')}</h4>
      <li className="divider" style={{margin: 0}}></li>


      <div style={{ margin: "30px 15px" }}>
        {

          isLoading ? <LoadingState/> :

            <Card className="card-bordered">
              <div className="nk-data data-list">

                {
                  _rows.map((item) =>{

                    return(
                      <FilterItem
                        key={item.slug}
                        title={item.title}
                        value={item.value}
                        type={item.type}
                        selected={item.selected}
                        onSelect={() => {
                          set_rows([
                            ..._rows.map((i) => {
                              if(i.title === item.title)
                                return {
                                  ...i,
                                  selected: !item.selected
                                }
                              return i
                            }),
                          ])
                        }}
                        options={item.options}
                        onChange={(e)=> {
                          set_rows([
                            ..._rows.map((i) => {
                              if(i.title === item.title)
                                return {
                                  ...i,
                                  value: e
                                }
                              return i
                            }),
                          ])
                        }}
                      />
                    )})
                }
              </div>
            </Card>
        }
      </div>
      <li className="divider" style={{margin: 0}}></li>

      <div style={{ margin: "10px 15px 20px 15px" }}>
        <button
          className="btn btn-primary btn-outline w-100"
          style={{ margin: "10px 0px 0px 0px" }}
          onClick={async () => {
            onSubmit(await getFilterSearchValues());
          }}>
          <span className="form-submit-btn">{t("filter")}</span>
        </button>
      </div>

    </div>
  );
}
