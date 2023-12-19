import { RiBankLine, RiBook2Line } from "react-icons/ri";
import { BiChalkboard, BiGroup } from "react-icons/bi";
import { MdOutlineHome, MdOutlineHomeRepairService } from "react-icons/md";
import { PiChalkboardTeacher, PiChalkboardTeacherBold, PiStudentBold } from "react-icons/pi";
import { LuGraduationCap, LuUsers, LuUserSquare } from "react-icons/lu";
import { TbPlane, TbPlaneInflight, TbSettings } from "react-icons/tb";
import { LiaPlaneDepartureSolid, LiaPlaneSolid } from "react-icons/lia";
import { FiUser } from "react-icons/fi";

const fontSize = 19;
const color = "#6e82a5";
const menu = [
  // {
  //   heading: "منو فولادیار",
  // },

  {
    heading: "مدرسه پرواز آسو"
  },
  {
    icon: <MdOutlineHome size={fontSize} color={color} />,
    text: "خانه",
    link: "/asoo_home",
    roles: ["Teacher", "Admin", "Student"],
    dashboard: true
  },
  // {
  //   icon: <LuUsers size={fontSize-1} color={color} />,
  //   text: "مدیریت کاربران",
  //   roles: ["Admin"],
  //   active: false,
  //   subMenu: [
  //     {
  //       text: "کاربران",
  //       link: "/user-list-2",
  //       roles: ["Admin"],
  //     },
  //     {
  //       text: "ایجاد کاربر سیستم",
  //       link: "/user-add-2",
  //       roles: ["Admin"],
  //     }
  //   ]
  // },
  {
    icon: <PiChalkboardTeacherBold size={fontSize} color={color} />,
    text: "اساتید",
    roles: ["Admin"],
    active: false,
    subMenu: [
      {
        text: "مدیریت اساتید",
        link: "/teacher-list",
        roles: ["Admin"],
      },
      {
        text: "ایجاد استاد",
        link: "/teacher-add",
        roles: ["Admin"],
      }
    ]
  },
  {
    icon: <LuGraduationCap size={fontSize-1} color={color} />,
    text: "دانشجویان",
    roles: ["Admin"],
    active: false,
    subMenu: [
      {
        text: "مدیریت دانشجویان",
        link: "/student-list",
        roles: ["Admin"],
      },
      {
        text: "ایجاد دانشجو",
        link: "/student-add",
        roles: ["Admin"],
      }
    ]
  },
  {
    icon: <LiaPlaneDepartureSolid size={fontSize+1} color={color} />,
    text: "پروازها",
    roles: ["Teacher", "Admin", "Student", "Plane"],
    active: false,
    subMenu: [
      {
        text: "مدیریت پروازها",
        link: "/flight-list",
        roles: ["Teacher", "Admin", "Student", "Plane"],
      },
      {
        text: "ایجاد پرواز",
        link: "/flight-add",
        roles: ["Admin"],
      },
      // {
      //   text: "خدمات پرواز",
      //   link: "/flight-service",
      //   roles: ["Admin"],
      // }
    ]
  },
  {
    icon: <LiaPlaneSolid size={fontSize+1} color={color} />,
    text: "هواپیما",
    roles: ["Admin"],
    active: false,
    subMenu: [
      {
        text: "مدیریت هواپیما ها",
        link: "/plane-list",
        roles: ["Admin"],
      },
      {
        text: "ایجاد هواپیما",
        link: "/plane-add",
        roles: ["Admin"],
      }
    ]
  },
  {
    icon: <MdOutlineHomeRepairService size={fontSize} color={color} />,
    text: "خدمات",
    roles: ["Admin", "Plane"],
    active: false,
    subMenu: [
      {
        text: "لیست خدمات",
        link: "/service-list",
        roles: ["Admin", "Plane"],
      },
      {
        text: "افزودن خدمات",
        link: "/service-add",
        roles: ["Admin"],
      }
    ]
  },
  {
    icon: <RiBook2Line size={fontSize} color={color} />,
    text: "دوره ها",
    roles: ["Admin", "Teacher", "Student"],
    active: false,
    subMenu: [
      {
        text: "مدیریت دوره ها",
        link: "/course-list",
        roles: ["Admin", "Teacher", "Student"],
      },
      {
        text: "ایجاد دوره",
        link: "/course-add",
        roles: ["Admin"],
      }
    ]
  },
  {
    icon: <BiChalkboard size={fontSize} color={color} />,
    text: "کلاس ها",
    roles: ["Teacher", "Admin", "Student"],
    active: false,
    subMenu: [
      {
        text: "مدیریت کلاس ها",
        link: "/course-class-list",
        roles: ["Teacher", "Admin", "Student"],
      },
      {
        text: "ایجاد کلاس",
        link: "/course-class-add",
        roles: ["Admin"],
      }
    ]
  },
  {
    icon: <RiBankLine size={fontSize} color={color} />,
    text: "مالی",
    roles: ["Teacher", "Admin", "Student", "Plane"],
    active: false,
    subMenu: [
      {
        text: "تراکنش ها",
        link: "/transaction-list",
        roles: ["Teacher", "Admin", "Student", "Plane"],
      },
      {
        text: "تسویه حساب",
        link: "/checkout",
        roles: ["Admin"],
      },
      {
        text: "شارژ کیف پول",
        link: "/recharge",
        roles: ["Admin"],
      },
      {
        text: "درگاه های پرداخت",
        link: "/payment-gateways",
        roles: ["Admin"],
      }
    ]
  },
  {
    icon: <TbSettings size={fontSize} color={color} />,
    text: "تنظیمات",
    roles: ["Admin"],
    active: false,
    subMenu: [
      {
        text: "عمومی",
        link: "/settings",
        roles: ["Admin"],
      },
      {
        text: "قالب",
        link: "/settings",
        roles: ["Admin"],
      },
      {
        text: "متغیرهای پیشفرض",
        link: "/settings",
        roles: ["Admin"],
      }
    ]
  }
];
export default menu;
