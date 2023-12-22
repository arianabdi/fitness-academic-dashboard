import React, { useEffect, useMemo, useState } from "react";
import Table from "../../../components/fouladyar/table";
import { useDispatch, useSelector } from "react-redux";
import { selectPending } from "../../../redux/store/services/general/store";
import { getItems } from "../../../redux/store/services/fitness-academic/exercise/store/exerciseItems";
import { filterStructure, tableHeading, tableStructure } from "./index";
import { ConvertFilterObjectToUrlParam } from "../../../redux/store/shared/shared";


const UserList2 = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const isLoading = useSelector(selectPending("program", "list"));
  const [isApplyingFilter, setIsApplyingFilter] = useState(false);
  const [pagination, setPagination] = useState({
    itemPerPage: 7,
    currentPage: 1,
    totalItems: 0,
    lastUpdateBy: ''
  })

  const [filter, setFilter] = useState({})
  async function initializeData() {
    const res = await dispatch(getItems(
      pagination
    ));
    if(res.statusCode === 200){
      setData(res.data.exercises)
      setPagination({...pagination, totalItems: res.data.totalItems, lastUpdateBy: 'initializer'})
    }

  }

  async function fetchData(updater) {
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
        filter={filter}
        tableData={data}
        pagination={pagination}
        tableHeading={tableHeading}
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

export default UserList2;
