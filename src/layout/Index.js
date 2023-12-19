import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Appbar from "./appbar/Appbar";
import Sidebar from "./sidebar/Sidebar";
import Head from "./head/Head";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import AppRoot from "./global/AppRoot";
import AppMain from "./global/AppMain";
import AppWrap from "./global/AppWrap";
import { useSelector } from "react-redux";
import { validateToken } from "../pages/asoo/auth";

const Layout = ({title, app, ...props}) => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [IS_TOKEN_VALID, SET_IS_TOKEN_VALID] = useState(false);

  useEffect(() => {

    async function validateAccessToken(){
      const tokenValidation = await validateToken(auth.token);
      console.log("auth", auth);

      if(!tokenValidation){
        navigate(`/login`)
      }else{
        SET_IS_TOKEN_VALID(true);
      }

    }
    validateAccessToken()


  }, [auth.token]);

  return (
      <>
        {
          !IS_TOKEN_VALID ? <></> :
            <>
              <Head title={!title && 'Loading'} />
              <AppRoot>
                {/*<Appbar />*/}
                <AppMain>
                  <Sidebar fixed />
                  <AppWrap>
                    <Header fixed />
                    <Outlet />
                    <Footer />
                  </AppWrap>
                </AppMain>
              </AppRoot>
            </>
        }

      </>
  );
};
export default Layout;
