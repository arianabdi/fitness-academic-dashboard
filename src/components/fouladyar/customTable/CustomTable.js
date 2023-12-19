/*
{*=============================================================================
|         Name:  CUSTOM_TABLE
|  Description:  THIS COMPONENT WILL USE IN ANY MODAL COMPONENTS AS A CHILD,
|                TO FILTER TABLES DATA WE USE THIS COMPONENT.
|
|       Author:  ARIAN ABDI
|      Version:  1.2.0
|
|
+-----------------------------------------------------------------------------
|
|      Example:
|
|
|
*============================================================================}
*/


import React, {useEffect, useState} from "react";
import {
    Button,
    DataTable,
    DataTableBody,
    DataTableHead,
    DataTableRow,
    Icon,
    PaginationComponent,
} from "../../components/Component";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {selectThemeInfo} from "../../redux/store/services/theme/store";
import {makeStyles} from "@material-ui/styles";
import {Link} from "react-router-dom";
import {TableLoadingState} from "../loading-state/loadingState";
import {FilterParamsBadgeLoader} from "../filter/filter.badge";
import {Col, Row} from "reactstrap";
import {Field} from "../field/field";


const useStyles = makeStyles((theme) => ({
        cardInner: {
            '& .nk-tb-head': {
                '& .nk-tb-col': {
                    padding: "20px 0px",
                    fontSize: "15px",
                    textAlign: "center"
                }
            }
        }
    })
);

export const TotalItemPerPageOptions = [
    {value: 10, label: '10'},
    {value: 25, label: "25"},
    {value: 50, label: "50"},
    {value: 100, label: "100"},
];


const CustomTable = ({
                         key,
                         headerItems,
                         headerButtonsList,
                         paginate,
                         filterParams,
                         loading,
                         tableData,
                         pagination,
                         onTotalItemPerPageChange,
                         onCreateTableRowData,
                         onNextPage,
                         onPrevPage,
                         onFilterBadgeClose
                     }) => {

    const classes = useStyles();
    const {t, i18n} = useTranslation();
    // const {contextData} = useContext(tableContext);

    const [data, setData] = useState(tableData);
    const [onSearch, setonSearch] = useState(true);
    const [onSearchText, setSearchText] = useState("");
    const [totalItemPerPage, setTotalItemPerPage] = useState(10);
    const themeState = useSelector(selectThemeInfo());

    // Sorting data
    const sortFunc = (params) => {
        let defaultData = data;
        if (params === "asc") {
            let sortedData = defaultData.sort((a, b) => a.name.localeCompare(b.name));
            setData([...sortedData]);
        } else if (params === "dsc") {
            let sortedData = defaultData.sort((a, b) => b.name.localeCompare(a.name));
            setData([...sortedData]);
        }
    };

    // unselects the data on mount
    useEffect(() => {
        let newData;
        newData = tableData.map((item) => {
            item.checked = false;
            return item;
        });
        setData([...newData]);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Changing state value when searching name
    useEffect(() => {
        if (onSearchText !== "") {
            const filteredObject = tableData.filter((item) => {
                return (
                    item.name.toLowerCase().includes(onSearchText.toLowerCase()) ||
                    item.email.toLowerCase().includes(onSearchText.toLowerCase())
                );
            });
            setData([...filteredObject]);
        } else {
            setData([...tableData]);
        }
    }, [onSearchText, setData]);

    // onChange function for searching name
    const onFilterChange = (e) => {
        setSearchText(e.target.value);
    };

    // function to change the selected property of an item
    const onSelectChange = (e, id) => {
        let newData = data;
        let index = newData.findIndex((item) => item.id === id);
        newData[index].checked = e.currentTarget.checked;
        setData([...newData]);
    };


    // function to change the check property of an item
    const selectorCheck = (e) => {
        let newData;
        newData = data.map((item) => {
            item.checked = e.currentTarget.checked;
            return item;
        });
        setData([...newData]);
    };

    const toggle = () => setonSearch(!onSearch);


    function TableHeaderCheckBox({key}){
        return (
            <DataTableRow size="mb" className="nk-tb-col-check">
                <div className="custom-control custom-control-sm custom-checkbox notext">
                    <input
                        key={key}
                        type="checkbox"
                        className="custom-control-input"
                        onChange={(e) => selectorCheck(e)}
                        id="uid"
                    />
                    <label className="custom-control-label" htmlFor="uid"/>
                </div>
            </DataTableRow>
        )
    }

    function RowItem({size, classes, title}){
        return(
            <DataTableRow key={key}  size={size}>
                <span className={classes}>{t(title)}</span>
            </DataTableRow>
        )
    }

    function TableHeader(){
        return(
            <DataTableHead>
                <TableHeaderCheckBox key={'all'}/>
                {headerItems.map((item) => {
                    return (
                        <>
                            {
                                item.isMobileView ? (
                                    themeState.mobileView ?
                                        <RowItem classes={item.classes} key={item.title}  title={item.title} size={item.size}/> : ''
                                ) : (
                                    <RowItem classes={item.classes} key={item.title} title={item.title} size={item.size}/>
                                )
                            }
                        </>
                    );
                })}
            </DataTableHead>
        )
    }

    function TableBody(){
        if(tableData.length > 0 && !loading)
            return (
                tableData.map((item, index) => {
                    return (
                        onCreateTableRowData(item, index+1)
                    );
                })
            )
        return(<></>)
    }

    function TablePagination(){
        return(
            <div className="card-inner">
                {
                    loading ? (
                        <div className="text-center">
                            <span className="text-silent">
                                <TableLoadingState/>
                            </span>
                        </div>
                    ) : (
                        tableData.length > 0 ? (
                            <Row>
                                <Col md={10} sm={10} lg={10}>
                                    <PaginationComponent
                                        itemPerPage={pagination.itemPerPage}
                                        totalItems={pagination.totalItems}
                                        paginate={(e) => paginate(e)}
                                        currentPage={pagination.currentPage}
                                        onNextPage={(e) => paginate(e)}
                                        onPrevPage={(e) => paginate(e)}
                                    />
                                </Col>
                                <Col md={2} sm={2} lg={2}>
                                    <Field
                                        defaultValue={TotalItemPerPageOptions.filter(item => item.value === totalItemPerPage)[0]}
                                        name="totalItemPerPage"
                                        id="totalItemPerPage"
                                        value={TotalItemPerPageOptions.filter(item => item.value === totalItemPerPage)[0]}
                                        options={TotalItemPerPageOptions}
                                        onChange={(e) => {
                                            setTotalItemPerPage(e.value)
                                            onTotalItemPerPageChange(e.value);
                                        }}
                                        type="select"
                                    />
                                </Col>
                            </Row>
                        ) : (

                            <div className="text-center">
                                <span className="text-silent">No data found</span>
                            </div>

                        )
                    )
                    }
            </div>
        )
    }

    function TableFilterAndSearchButtons({Routes}){
        return(
            <div className={`card-inner position-relative card-tools-toggle `}>
                <ul className="nk-block-tools g-3">
                    <li>
                        <Button color="light" outline className="btn-white" onClick={openFilterWindow}>
                            <Icon name="filter"/>
                            <span>{t('filter')}</span>
                        </Button>
                    </li>
                    {Routes.map((route) => (
                        <li>
                            <Button color={route.color ? route.color : ""} className={route.classes}>
                                <Link to={`${process.env.PUBLIC_URL}${route.link}`}>
                                    {route.icon ? <Icon  style={{color:"#ffffff"}} name={route.icon}/> : ''}
                                    <span style={{color:"#ffffff"}}>{t(route.text)}</span>
                                </Link>
                            </Button>
                        </li>
                    ))}

                </ul>
            </div>
        )
    }


    return (
        <div>
            <FilterParamsBadgeLoader
                obj={filterParams}
                onBadgeClose={(e)=> onFilterBadgeClose(e)}
            />
            <DataTable className="card-stretch">
                {headerButtonsList ? <TableFilterAndSearchButtons Routes={headerButtonsList}/> : ''}
                <DataTableBody className={`${classes.cardInner}`}>
                    <TableHeader/>
                    <TableBody/>
                </DataTableBody>
                <TablePagination/>
            </DataTable>
        </div>

    );
};
export default CustomTable;
