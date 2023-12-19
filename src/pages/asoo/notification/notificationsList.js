import React, { useEffect, useState } from "react";
import { FormIsLoading } from "../../../components/fouladyar/form";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Block, BlockHead, BlockHeadContent, BlockTitle } from "../../../components/block/Block";
import { PreviewCard } from "../../../components/preview/Preview";
import Content from "../../../layout/content/Content";
import { makeStyles } from "@material-ui/styles";
import { NotificationItem } from "../../../layout/header/dropdown/notification/Notification";

function NotificationsList ({ ...props }) {

  const classes = useStyles();
  const location = useLocation();

  const navigate = useNavigate();
  const path = '/Notifications/GetData/Notification'
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isLoading, setIsloading] = useState(false)
  const [alreadyCreated, setAlreadyCreated] = useState(false);
  const [data, setData] = useState([

  ]);



  async function loadData() {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}${path}`, {
        headers: {
          "authorization": `bearer ${auth.token}`
        }
      }
    );

    console.log('notifications', res);

    if(res.data.statusCode === 200 ){
      console.log('enter', res.data.data.notifications)
      setData(res.data.data.notifications);
      setIsloading(false)
      return data;
    }



    return {}

  }


  useEffect(() => {
      loadData();
  }, []);







  function NotificationList() {
    return(
      data.map(item => {
        return(
          <NotificationItem
            key={item.id}
            id={item.id}
            icon={item.icon || ''}
            iconStyle={item.iconStyle || ''}
            text={item.text || ''}
            createdAt={item.createdAt}
          />
        )
      })
    )
  }

  return (

    <>
      {
        isLoading ?
          "در حال بارگذاری"
          :
          <Content page="component">
            <Block size="lg">
              <BlockHead>
                <BlockHeadContent>
                  <BlockTitle tag="h5"> اعلان ها </BlockTitle>
                </BlockHeadContent>
              </BlockHead>
              <PreviewCard>
                <div className="card-head d-flex flex-row justify-content-start">
                  <h5 className="card-title">اعلان های اخیر</h5>
                </div>
                {NotificationList()}
              </PreviewCard>
            </Block>

          </Content>
      }
    </>


  );
};

export default NotificationsList;


const useStyles = makeStyles((theme) => ({
  rowItem: {
      margin: "0px"
  },
  buttonFont:{
    fontFamily: "iransans, serif !important",
    fontWeight: "700",
    letterSpacing: "0px",
    fontSize: 15
  },
  badgeFont:{
    fontFamily: "iransans, serif !important",
    fontWeight: "500",
    letterSpacing: "0px",
    fontSize: 13
  },
  addStudentToCourse: {
      border: "1px solid #dde4f7",
      padding: "6px 0px",
      margin: "9px 0px",
      boxShadow: "0px 1px 2px -2px #ccc",
      borderRadius: "5px",
      background: "#f7f8fb"
  }

  })
);
