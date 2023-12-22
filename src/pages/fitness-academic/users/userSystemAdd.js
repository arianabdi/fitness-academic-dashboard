import React, { useEffect, useState } from "react";
import Form from "../../../components/fouladyar/form";
import { useDispatch, useSelector } from "react-redux";
import { selectPending } from "../../../redux/store/services/general/store";
import { formStructure, itemAddHeader } from "./index";

const UserSystemAdd = ({ ...props }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const isLoading = useSelector(selectPending("program", "list"));
  const [form, setForm] = useState({
    title: '',
    slug: '',
    level: '',
    categoryId: '',
    description: '',
    gender: '',
    video: '',
    image: '',
  });

  async function loadData() {
    // const res = await dispatch(getItems(
    //   pagination
    // ));
    // if(res.statusCode === 200){
    //   setData(res.data.user)
    //   setPagination({...pagination, totalItems: res.data.totalItems, lastUpdateBy: 'initializer'})
    // }

  }


  useEffect(() => {
    loadData();
  }, []);


  return (
    <React.Fragment>
      <Form
        form={form}
        fields={formStructure}
        header={itemAddHeader}
        onFieldChange={(form) => {setForm(form)}}
        onFormSubmit={() => {
          console.log('form', form)
        }}
      />
    </React.Fragment>
  );
};

export default UserSystemAdd;
