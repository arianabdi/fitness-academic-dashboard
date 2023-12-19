import React, { useState } from "react";
import classnames from "classnames";
import { TabContent, TabPane } from "reactstrap";
import VariablesSettings from "./tabs/VariablesSettings";
import GeneralSettings from "./tabs/GeneralSettings";
import AppearanceSettings from "./tabs/AppearanceSettings";

const settingsMenu = [
  {
    title: 'تنظیمات عمومی',
    slug: 'General Settings',
    component: <GeneralSettings />
  },
  {
    title: 'تنظیمات قالب',
    slug: "Appearance Settings",
    component: <AppearanceSettings />
  },
  {
    title: 'تنظیمات متغیرهای پیشفرض',
    slug: 'Variable Settings',
    component: <VariablesSettings />
  },
]
const Settings = () => {


  const [verticalTab, setVerticalTab] = useState("General Settings");





  function SettingsHeader() {
    return (
      <div class="card-inner">
        <h3 class="nk-block-title page-title">تنظیمات</h3>
        <div class="nk-block-des text-soft">
          <p>در این صفحه تنظیمات اپلیکیشن و داشبورد را میتوانید انجام دهید.</p>
        </div>
      </div>
    );
  }


  function SettingsMenu() {
    return (

      <div class="card-inner p-0">
        <ul className="nav link-list-menu border border-light round m-0">
          {
            settingsMenu.map(item=> {
              return(
                <li>
                  <a
                    href="#tab"
                    className={classnames({ active: verticalTab === item.slug })}
                    onClick={(ev) => {
                      ev.preventDefault();
                      setVerticalTab(item.slug);
                    }}
                  >
                    {item.title}
                  </a>
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }

  function SettingsTabContentItem({ tabId, component }) {
    return (
      <TabPane key={tabId} tabId={tabId}>
        {component}
      </TabPane>
    );
  }

  function SettingsTabContent() {
    return (
      <TabContent activeTab={verticalTab}>
        {
          settingsMenu.map(item => {
            return(
              <SettingsTabContentItem tabId={item.slug} component={item.component} />
            )
          })
        }
      </TabContent>
    );
  }

  function SettingsSidebar() {
    return (
      <div
        class="card-aside card-aside-left settings-sidebar user-aside toggle-slide toggle-slide-left toggle-break-lg"
        data-toggle-body="true" data-content="userAside" data-toggle-screen="lg"
        data-toggle-overlay="true">
        <div class="card-inner-group">
          <SettingsHeader />
          <SettingsMenu />
        </div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div class="nk-content">
        <div class="container-fluid">
          <div class="nk-content-inner">
            <div class="nk-content-body">
              <div class="nk-block">
                <div class="card card-bordered settings-card">
                  <div class="card-aside-wrap">
                    <SettingsTabContent />
                    <SettingsSidebar />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Settings;
