import React, { useEffect, useMemo, useState } from "react";
import Table from "../../../components/fouladyar/table";
import { useDispatch, useSelector } from "react-redux";
import { filterStructure, tableStatics, tableStructure } from "./index";
import { ConvertFilterObjectToUrlParam } from "../../../redux/store/shared/shared";
import { selectPending } from "../../../redux/store/services/general/store";
import { getItems } from "../../../redux/store/services/fitness-academic/exercise/store";




const ExerciseList = () => {

  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isApplyingFilter, setIsApplyingFilter] = useState(false);
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

    console.log('plane', res);
    if(res.data.statusCode === 200 || res.status === 200 ){
      setData(res.data.exercises)
      setPagination({...pagination, totalItems: res.data.totalItems || 9, lastUpdateBy: 'initializer'})
    }

    setIsLoading(false)
  }

  async function fetchData(updater) {
    setIsLoading(true)
    const res = await dispatch(getItems(
      pagination,
      ConvertFilterObjectToUrlParam(filter)
    ));




    if(res.statusCode === 200){
      setData(res.data.exercises)
      if(updater === 'filter')
        setPagination({
          ...pagination,
          totalItems: res.data.totalItems,
          currentPage: 1,
          lastUpdateBy: updater
        })
    }

    setIsLoading(false)
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
        onFilterSubmit={ (e)=>{
          setFilter(e);
        }}
        onDeleteComplete={ (e)=>{
          fetchData('pagination');
        }}
      />
    </React.Fragment>
  );
};

export default ExerciseList;
