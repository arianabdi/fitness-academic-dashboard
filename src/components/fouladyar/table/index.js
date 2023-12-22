import React, { useEffect, useState } from "react";
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";
import {
  Block,
  BlockBetween,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Col,
  DataTableBody,
  DataTableHead,
  DataTableItem,
  DataTableRow,
  Icon,
  PaginationComponent,
  Row
} from "../../../components/Component";
import { Card, DropdownItem, DropdownMenu, DropdownToggle, Modal, ModalBody, UncontrolledDropdown } from "reactstrap";
import { useForm } from "react-hook-form";
import ProductH from "../../../images/product/h.png";
import ModalHelper from "../modal-helper/modalHelper";
import CopyToClipboard from "react-copy-to-clipboard";
import exportFromJSON from "export-from-json";
import tab from "bootstrap/js/src/tab";
import { ConvertGregorianToJalali } from "../../../shared/convertGregorianToJalali";
import { useTranslation } from "react-i18next";
import { toFarsiNumber } from "../../../shared/toFarsiNumber";
import Filter from "../filter/filter";
import { useNavigate } from "react-router-dom";
import { YesOrNoModal } from "../modal-helper/pages/yesOrNo";
import { Field } from "../field/field";
import { LoadingState } from "../loading-state/loadingState";
import { useSelector } from "react-redux";
import { LuBell, LuCopy, LuMoreHorizontal, LuPrinter } from "react-icons/lu";
import { RiFileExcel2Line } from "react-icons/ri";
import { TbFileTypeCsv, TbFilterSearch } from "react-icons/tb";
import { MdAdd } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";


const Export = ({ data }) => {
  const [modal, setModal] = useState(false);


  useEffect(() => {
    if (modal === true) {
      setTimeout(() => setModal(false), 2000);
    }
  }, [modal]);

  const fileName = "user-data";

  const exportCSV = () => {
    const exportType = exportFromJSON.types.csv;
    exportFromJSON({ data, fileName, exportType });
  };

  const exportExcel = () => {
    const exportType = exportFromJSON.types.xls;
    exportFromJSON({ data, fileName, exportType });
  };

  const copyToClipboard = () => {
    setModal(true);
  };


  return (
    <React.Fragment>
      <div className="dt-export-buttons d-flex align-center">
        <div className="dt-buttons btn-group btn-group-grid flex-wrap">
          <button className="btn btn-secondary buttons-html5" type="button"
                  onClick={() => copyToClipboard()}>
            <CopyToClipboard text={JSON.stringify(data)}>
              <LuCopy size={17} color={"#657180"}/>
            </CopyToClipboard>
          </button>
          <button className="btn btn-secondary buttons-html5" type="button" onClick={() => exportCSV()}>
            <TbFileTypeCsv    size={17} color={"#657180"}/>
          </button>
          <button className="btn btn-secondary buttons-html5" type="button" onClick={() => exportExcel()}>
            <RiFileExcel2Line   size={17} color={"#657180"}/>
          </button>
          <button className="btn btn-secondary buttons-html5" type="button" onClick={() => print()}>
            <LuPrinter  size={17} color={"#657180"}/>
          </button>
        </div>
      </div>
      <Modal isOpen={modal} className="modal-dialog-centered text-center" size="sm">
        <ModalBody className="text-center m-2">
          <h5>کپی</h5>
        </ModalBody>
        <div className="p-3 bg-light">
          <div className="text-center">کپی جدول با موفقیت انجام شد</div>
        </div>
      </Modal>
    </React.Fragment>
  );
};

const Pagination = ({ itemPerPage, currentPage, totalItems, setRowsPerPage, paginate }) => {

  return (
    <Row className={`justify-between g-2 with-export`}>
      <Col className="col-7 text-start" sm="4">
        <div className="card-inner">
          <PaginationComponent
            itemPerPage={itemPerPage}
            totalItems={totalItems}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </Col>
      <Col className="col-5 text-end" sm="8">
        <div className="card-inner d-flex align-center justify-end">
          <div className="dataTables_info" id="DataTables_Table_2_info" role="status" aria-live="polite">
            {itemPerPage * (currentPage - 1) + 1} - {(totalItems > itemPerPage * currentPage) ? itemPerPage * currentPage : totalItems} از {totalItems}
          </div>
          {/*<span className="d-none d-sm-inline-block">Show</span>*/}
          <div className="form-control-select">
            {" "}
            <select
              name="DataTables_Table_0_length"
              className="custom-select custom-select-sm form-control form-control-sm"
              onChange={(e) => {
                setRowsPerPage(e.target.value);
              }}
              value={itemPerPage}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="5">5</option>
              <option value="7">7</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="40">40</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>{" "}
          </div>
        </div>
      </Col>
    </Row>
  );
};

const Table = ({
   tableHeading,
   tableStructure,
   filterStructure,
   hideActions,
   hidePagination,
   tableData,
   pagination,
   loading,
   filter,
   onEveryGridButtonClick,
   onItemPerPageChange,
   onCurrentPageChange,
   onFilterSubmit,
   onDeleteComplete
}) => {
  const auth = useSelector((state) => state.auth);
  const { t, i18n } = useTranslation();
  // const [data, setData] = useState([]);
  const [smOption, setSmOption] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterModalComponent, setFilterModalComponent] = useState(<div>empty</div>);
  const navigate = useNavigate();

  const profile = useSelector((state) => state.profile);
  const [formData, setFormData] = useState({
    name: "",
    img: null,
    sku: "",
    price: 0,
    salePrice: 0,
    stock: 0,
    category: [],
    fav: false,
    check: false
  });
  const [editId, setEditedId] = useState();
  const [view, setView] = useState({
    edit: false,
    add: false,
    details: false
  });
  const [onSearchText, setSearchText] = useState("");
  const [totalItems, setTotalItems] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(5);
  const [files, setFiles] = useState([]);

  //modal
  const [yesOrNoModalIsOpen, setYesOrNoModalIsOpen] = useState(false);
  const [modalProps, setModalProps] = useState({
    modalCancelText: "",
    modalSubmitText: "",
    modalTitle: "",
    modalContent: "",
    modalItemTarget: "",
    modalType: "",
    modalPath: ""
  });

  //scroll off when sidebar shows
  useEffect(() => {
    view.add ? document.body.classList.add("toggle-shown") : document.body.classList.remove("toggle-shown");
  }, [view.add]);

  // Changing state value when searching name
  useEffect(() => {
    if (onSearchText !== "") {
      const filteredObject = tableData.filter((item) => {
        return item.sku.toLowerCase().includes(onSearchText.toLowerCase());
      });
      // setData([...filteredObject]);
    } else {
      // setData([...tableData]);
    }
  }, [onSearchText]);




  const resetForm = () => {
    setFormData({
      name: "",
      img: null,
      sku: "",
      price: 0,
      salePrice: 0,
      stock: 0,
      category: [],
      favorite: false,
      check: false
    });
    reset({});
  };



  useEffect(() => {
    reset(formData);
  }, [formData]);

  // selects all the products
  const selectorCheck = (e) => {
    let newData;
    newData = tableData.map((item) => {
      item.check = e.currentTarget.checked;
      return item;
    });
    // setData([...newData]);
  };

  // selects one product
  const onSelectChange = (e, id) => {
    let newData = tableData;
    let index = newData.findIndex((item) => item._id === id);
    newData[index].check = e.currentTarget.checked;
    // setData([...newData]);
  };

  const toggle = (type) => {
    setView({
      edit: type === "edit" ? true : false,
      add: type === "add" ? true : false,
      details: type === "details" ? true : false
    });
  };



  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);


  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  function onFilterPress() {
    setFilterModalComponent(
      <Filter
        filterStructure={filterStructure}
        filter={filter}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(e) => {
          onFilterSubmit(e);
          setIsModalOpen(false);
        }}

      />
    );
    setIsModalOpen(true);
  }

  function TableHeader() {
    return (
      <BlockHead size="sm">
        <BlockBetween>
          {
            !tableHeading ? "" :
              <BlockHeadContent>
                <BlockTitle>{tableHeading.title}</BlockTitle>
              </BlockHeadContent>
          }
          <BlockHeadContent>
            <div className="toggle-wrap nk-block-tools-toggle">
              <a
                href="#more"
                className="btn btn-icon btn-trigger toggle-expand me-n1"
                onClick={(ev) => {
                  ev.preventDefault();
                  setSmOption(!smOption);
                }}
              >
                <LuMoreHorizontal  size={17} color={"#657180"}/>
              </a>
              <div className="toggle-expand-content" style={{ display: smOption ? "block" : "none" }}>

                {
                  hideActions ? "" :
                    <ul className="nk-block-tools btn-group-grid g-3 dt-buttons">
                      {
                        !tableHeading ? "" :
                          !tableHeading.addNewItemButtonLink ? "" :
                            <li>
                              <button className="btn btn-secondary  buttons-html5 " type="button" onClick={() => {
                                navigate(`${tableHeading.addNewItemButtonLink}`);
                              }}>
                                <MdAdd  size={18}  color={"#657180"}/>
                              </button>
                            </li>
                      }


                      <li>
                        <button className="btn btn-secondary  buttons-html5 " type="button" onClick={() => onFilterPress()}>
                          <TbFilterSearch size={16}  color={"#657180"} />
                        </button>
                      </li>
                      <Export data={tableData || []} />

                    </ul>
                }
              </div>
            </div>
          </BlockHeadContent>
        </BlockBetween>
      </BlockHead>
    );
  }

  function ActionsDropdownButton() {
    return (
      <ul className="nk-tb-actions gx-1 my-n1">
        <li className="me-n1">
          <UncontrolledDropdown>
            <DropdownToggle
              tag="a"
              href="#toggle"
              onClick={(ev) => ev.preventDefault()}
              className="dropdown-toggle btn btn-icon btn-trigger"
            >
              <LuMoreHorizontal  size={17} color={"#252525"}/>
            </DropdownToggle>

          </UncontrolledDropdown>
        </li>
      </ul>
    );
  }

  function TableHead() {
    return (
      <>
        <DataTableHead>
          <DataTableRow className="nk-tb-col-check">
            <div className="custom-control custom-control-sm custom-checkbox notext">
              <input
                type="checkbox"
                className="custom-control-input"
                id="uid_1"
                onChange={(e) => selectorCheck(e)}
              />
              <label className="custom-control-label" htmlFor="uid_1"></label>
            </div>
          </DataTableRow>
          {
            tableStructure.map(item => {
              if (item.useActionsButton) {
                return (

                  <DataTableRow key={`${item.slug}-head`} className="nk-tb-col-tools">
                    <ActionsDropdownButton />
                  </DataTableRow>
                );
              }
              return (
                <DataTableRow key={`${item.slug}-head`} size="sm">
                  <span>{item.title}</span>
                </DataTableRow>
              );
            })
          }
        </DataTableHead>
      </>
    );
  }



  function replacePlaceholders(str, data) {
    console.log('placeholder', str, data);
    return str.replace(/:(\w+(\.\w+)?)/g, (match, key) => {
      const keys = key.split(".");

      console.log('keys', keys);
      let value = data;
      for (const k of keys) {
        value = value[k];
        if (value === undefined) {
          return match; // Return the original placeholder if the nested key doesn't exist
        }
      }
      return value;
    });
  }

  function DataGenerator({ index, item, itemConfig, itemValue }) {


    //Action Buttons
    if (itemConfig.useActionsButton) {
      return (
        <UncontrolledDropdown key={`${itemConfig.slug}-${index}-${itemValue}`}>
          <DropdownToggle
            tag="a"
            href="#more"
            onClick={(ev) => ev.preventDefault()}
            className="dropdown-toggle btn btn-icon btn-trigger p-1"
          >
            <LuMoreHorizontal  size={17} color={"#252525"}/>
          </DropdownToggle>
          <DropdownMenu end>
            <ul className="link-list-opt no-bdr">
              {
                itemConfig.actions.map(j => {
                  if((j.roles && j.roles.includes(profile.roles[0])) || !j.roles)
                    return (
                      <li key={`action-btn-${j.slug}-${index}`}>
                        <DropdownItem
                          tag="a"
                          href="#edit"
                          onClick={(ev) => {
                            ev.preventDefault();

                            if (j.useRoute) {
                              navigate(`${replacePlaceholders(j.route, item) || ""}`);
                            }

                            if (j.useYesOrNoModal) {
                              setYesOrNoModalIsOpen(true);
                              setModalProps({
                                modalCancelText: j.modalCancelText || "بستن",
                                modalSubmitText: j.modalSubmitText || "تایید",
                                modalTitle: j.modalTitle || "عنوان پنجره یافت نشد",
                                modalContent: j.modalContent || "متن پنجره یافت نشد",
                                modalType: j.modalType || "",
                                modalPath: j.modalPath || "",
                                modalItemTarget: item || "",
                              });
                            }
                            // onEditClick(item.id);
                            // toggle("edit");
                          }}
                        >
                          <div className="action-btn-icon">
                            {j.icon}
                          </div>
                          <span>{j.title}</span>
                        </DropdownItem>
                      </li>
                    );

                  return null
                })
              }
            </ul>
          </DropdownMenu>
        </UncontrolledDropdown>
      );
    }

    if(itemValue){
      if (itemConfig.useField) {
        return (
          <Field
            formControlClassName="add-student-to-class-text"
            id={itemConfig.slug}
            name={itemConfig.slug}
            type={itemConfig.type}
            placeholder={itemConfig.placeholder || ""}
            options={itemConfig.options || []}
            value={itemValue}
            onChange={(e) => {
              onEveryGridButtonClick({
                slug: itemConfig.slug,
                id: (itemConfig.pickIdFrom.split(".")).length === 1 ? item[itemConfig.pickIdFrom] : (itemConfig.pickIdFrom.split(".").reduce((obj, key) => obj && obj[key], item) || ""),
                value: e
              });
            }}
          />
        );
      }

      if (itemConfig.useSelect) {
        return (
          <Field
            id={"username"}
            name={"username"}
            type={"select"}
            placeholder={itemConfig.placeholder || ""}
            options={itemConfig.options || []}
            value={itemValue}
            onChange={(e) => {
              onEveryGridButtonClick({
                slug: itemConfig.slug,
                id: (itemConfig.pickIdFrom.split(".")).length === 1 ? item[itemConfig.pickIdFrom] : (itemConfig.pickIdFrom.split(".").reduce((obj, key) => obj && obj[key], item) || ""),
                value: e
              });
            }}
          />
        );
      }

      if (itemConfig.useButton) {
        return (
          <div
            className={`btn btn-sm btn-${itemConfig.buttonColor || "primary"} custom-btn-font`}
            style={{}}
            onClick={() => {
              onEveryGridButtonClick({ slug: itemConfig.slug, id: item[itemConfig.pickIdFrom] });
            }}
          >
            {itemConfig.buttonTitle ? itemConfig.buttonTitle : " "}
          </div>
        );
      }

      //این داده قطعا تاریخ است. با فرمت جلالی نشون بده
      if (itemConfig.useJalaliFormat) {
        if (itemConfig.useFarsiNumber) {

          return (
            <span className="title" key={`${itemConfig.slug}-${index}-${itemValue}`}
                  style={{ direction: "ltr" }}>{toFarsiNumber(ConvertGregorianToJalali(itemValue, itemConfig.showDateTime ? itemConfig.showDateTime : false))}</span>
          );


        }
        return (
          <span key={`${itemConfig.slug}-${index}-${itemValue}`}
                className="title">{ConvertGregorianToJalali(itemValue, itemConfig.showDateTime ? itemConfig.showDateTime : false)}</span>
        );
      }

      //ترجمه این داده رو نشون بده
      if (itemConfig.useTranslate) {
        if (itemConfig.useFarsiNumber) {
          return (
            <span key={`${itemConfig.slug}-${index}-${itemValue}`} className="title">{toFarsiNumber(itemValue)}</span>
          );
        }

        return (
          <span key={`${itemConfig.slug}-${index}-${itemValue}`} className="title">{t(itemValue)}</span>
        );
      }



      if (itemConfig.useFarsiNumber) {
        return (
          <span key={`${itemConfig.slug}-${index}-${itemValue}`} className="title">{toFarsiNumber(itemValue)}</span>
        );
      }

      if (typeof itemValue === 'boolean'){
        return (
          <span key={`${itemConfig.slug}-${index}-${itemValue}`} className="title">{itemValue === true ? itemConfig.ifItsTrue : itemConfig.ifItsFalse}</span>
        );
      }

      return (
        <span key={`${itemConfig.slug}-${index}-${itemValue}`} className="title">{itemValue}</span>
      );
    }

   return <span>-</span>



  }

  function TableRow({ item }) {
    return (
      <DataTableItem key={item?._id ? item?._id : item?._id}>
        <DataTableRow className="nk-tb-col-check">
          <div className="custom-control custom-control-sm custom-checkbox notext">
            <input
              disabled={true}
              type="checkbox"
              className="custom-control-input"
              defaultChecked={item.check}
              id={item._id + "uid1"}
              key={Math.random()}
              onChange={(e) => onSelectChange(e, item?._id)}
            />
            <label className="custom-control-label" htmlFor={item?._id + "uid1"}></label>
          </div>
        </DataTableRow>
        {
          tableStructure.map((i, index) => {
            return (
              <DataTableRow key={`${item.slug}-${index}`} size="sm">
                  <span className={`tb-product ${i.useActionsButton ? "d-flex justify-end align-end" : ""}`}>
                    {/*<img src={item.img ? item.img : ProductH} alt="product" className="thumb" />*/}
                    <DataGenerator
                      index={index}
                      item={item}
                      itemConfig={i}
                      itemValue={(i.slug.split(".")).length === 1 ? item[i.slug] : (i.slug.split(".").reduce((obj, key) => obj && obj[key], item) || "")}
                    />

                  </span>
              </DataTableRow>
            );
          })
        }
      </DataTableItem>
    );
  }

  function TableItems() {

    return (
      <>
        {

          tableData.length > 0 ?
            tableData.map((item, index) => {
              return (
                <TableRow key={`data-${index}`} item={item} />
              );
            }) : null
        }
      </>
    );
  }

  function TableBody() {
    return (
      <Block>
        <Card className="card-bordered">
          <div className="card-inner-group">
            <div className="card-inner p-0">

              {
                loading ? <div className="pt-5 pb-5 d-flex justify-center align-center"> <LoadingState/> </div> :
                  <>

                    <DataTableBody>
                      <TableHead key={"tableHead"} />
                      <TableItems key={"tableItems"} />
                    </DataTableBody>

                    {

                      tableData.length > 0 ?
                        null : (
                          <Col className="col-12 text-start no-data-found">
                            <div className="text-center">
                              <span className="text-silent">داده مورد نظر یافت نشد</span>
                            </div>
                          </Col>

                        )
                    }
                    {
                      hidePagination ? "" :
                        <Pagination
                          itemPerPage={pagination.itemPerPage}
                          totalItems={pagination.totalItems}
                          currentPage={pagination.currentPage}
                          paginate={(pageNumber) => {
                            onCurrentPageChange(pageNumber);
                          }}
                          setRowsPerPage={(e) => {
                            onItemPerPageChange(parseInt(e), 1);
                          }}
                        />
                    }
                  </>
              }




            </div>
          </div>
        </Card>
      </Block>
    );
  }

  return (
    <>
      {
        !tableHeading ? "" : <Head title={tableHeading.title}></Head>
      }

      <ModalHelper
        open={isModalOpen}
        onOpen={() => setIsModalOpen(true)}
        onClose={() => setIsModalOpen(false)}
        component={filterModalComponent}
      />

      <ModalHelper
        open={yesOrNoModalIsOpen}
        onOpen={() => setYesOrNoModalIsOpen(true)}
        onClose={() => setYesOrNoModalIsOpen(false)}
        component={
          <YesOrNoModal
            cancelText={modalProps.modalCancelText}
            submitText={modalProps.modalSubmitText}
            onClose={() => {
              setYesOrNoModalIsOpen(false);
            }}
            onSubmit={async ()=>{
              if(modalProps.modalType === 'delete'){
                // replacePlaceholders(j.route, item)
                const res = await axios.delete(`${process.env.REACT_APP_API_URL}${replacePlaceholders(modalProps.modalPath, modalProps.modalItemTarget)}`, {
                  headers: {authorization: `bearer ${auth.token}`}
                });

                if(res.status === 200){
                  onDeleteComplete()
                  setYesOrNoModalIsOpen(false);
                  toast.success("آیتم مورد نظر با موفقیت حذف شد")
                }

                console.log('delete item', res)
              }
            }}
            title={modalProps.modalTitle}
            content={modalProps.modalContent}
          />
        }
      />


      <Content>
        {
          !tableHeading ? "" : <TableHeader />
        }
        <TableBody />

        {view.add && <div className="toggle-overlay" onClick={toggle}></div>}
      </Content>
    </>
  );
};

export default Table;
