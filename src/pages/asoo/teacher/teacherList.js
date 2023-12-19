import React, { useEffect, useMemo, useState } from "react";
import Table from "../../../components/fouladyar/table";
import { useDispatch, useSelector } from "react-redux";
import { filterStructure, tableStatics, tableStructure } from "./index";
import { ConvertFilterObjectToUrlParam } from "../../../redux/store/shared/shared";
import { getItems } from "../../../redux/store/services/asoo/teachers/store/teachers-actions";
import toast from "react-hot-toast";






const TeacherList = () => {

  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({
    itemPerPage: 7,
    currentPage: 1,
    totalItems: 0,
    lastUpdateBy: ''
  })

  const [filter, setFilter] = useState({})
  async function initializeData() {
    setIsLoading(true)
    const res = await dispatch(getItems(
      pagination
    ));

    console.log('teacher', res);
    if(res.data.statusCode === 200 || !res.data.statusCode){
      setData(res.data.persons)
      setPagination({...pagination, totalItems: res.count || 1, lastUpdateBy: 'initializer'})
    }
    setIsLoading(false)
  }

  async function fetchData(updater) {



    try {
      setIsLoading(true)
      const res = await dispatch(getItems(
        pagination,
        ConvertFilterObjectToUrlParam(filter)
      ));



      if(res.statusCode === 200){
        setData(res.data.persons)
        if(updater === 'filter')
          setPagination({
            ...pagination,
            totalItems: res.data.count,
            currentPage: 1,
            lastUpdateBy: updater
          })
      }
      setIsLoading(false)
    }catch (e){
      toast.error(e.response.data.error || (e.response.data.message || e.message))
    }


  }

  useEffect(() => {
    initializeData();
  }, []);


  useEffect(() => {
    if(pagination.lastUpdateBy === "pagination")
        fetchData('pagination');

  }, [pagination]);



  useEffect(() => {
    fetchData('filter');
  }, [filter]);



  return (
    <React.Fragment>
      <Table
        loading={isLoading}
        filter={filter}
        tableData={data}
        pagination={pagination}
        tableHeading={tableStatics}
        tableStructure={tableStructure}
        filterStructure={filterStructure}
        onItemPerPageChange={(itemPerPage, currentPage)=> {
          setPagination({...pagination, itemPerPage: itemPerPage, currentPage: currentPage, lastUpdateBy: 'pagination'})
        }}
        onCurrentPageChange={(currentPage)=> {
          setPagination({...pagination, currentPage: currentPage, lastUpdateBy: 'pagination'})
        }}
        onFilterSubmit={ (e)=>{d
          setFilter(e);
        }}
      />
    </React.Fragment>
  );
};

export default TeacherList;
