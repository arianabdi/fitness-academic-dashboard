import React, { useEffect, useMemo, useState } from "react";
import Table from "../../../components/fouladyar/table";
import { useDispatch, useSelector } from "react-redux";
import { filterStructure, tableStatics, tableStructure } from "./index";
import { ConvertFilterObjectToUrlParam } from "../../../redux/store/shared/shared";
import { getItems } from "../../../redux/store/services/asoo/transactions/store";


const TransactionList = () => {

  const dispatch = useDispatch();
  const [data, setData] = useState([]);
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

    console.log('transactions', res)
    if(res.statusCode === 200 ){
      setData(res.data.transactions)
      setPagination({...pagination, totalItems: res.count || 9, lastUpdateBy: 'initializer'})
    }

  }


  async function fetchData(updater) {
    const res = await dispatch(getItems(
      pagination,
      ConvertFilterObjectToUrlParam(filter)
    ));
    if(res.statusCode === 200){
      setData(res.data.transactions)
      if(updater === 'filter')
        setPagination({
          ...pagination,
          totalItems: res.data.count,
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
      />
    </React.Fragment>
  );
};

export default TransactionList;
