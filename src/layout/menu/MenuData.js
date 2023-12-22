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
    heading: "فیتنس آکادمیک"
  },
  {
    icon: <LuUsers size={fontSize-1} color={color} />,
    text: "تمرین",
    roles: ["admin"],
    active: false,
    subMenu: [
      {
        text: "تمرین ها",
        link: "/exercise-list",
        roles: ["admin"],
      },
      {
        text: "دسته بندی تمرین ها",
        link: "/exercise-category-list",
        roles: ["admin"],
      }
    ]
  },
  {
    icon: <LuUsers size={fontSize-1} color={color} />,
    text: "مقاله",
    roles: ["admin"],
    active: false,
    subMenu: [
      {
        text: "مقاله ها",
        link: "/post-list",
        roles: ["admin"],
      },
      {
        text: "دسته بندی مقاله ها",
        link: "/post-category-list",
        roles: ["admin"],
      }
    ]
  },
  {
    icon: <MdOutlineHome size={fontSize} color={color} />,
    text: "برنامه ها",
    link: "/program-list",
    roles: ["admin"],
  },
  {
    icon: <LuUsers size={fontSize-1} color={color} />,
    text: "کاربران",
    roles: ["admin"],
    active: false,
    subMenu: [
      {
        text: "کاربران سیستم",
        link: "/user-system-list",
        roles: ["admin"],
      },
      {
        text: "مشتریان",
        link: "/customer-list",
        roles: ["admin"],
      }
    ]
  },
  {
    icon: <LuUsers size={fontSize-1} color={color} />,
    text: "فروشگاه",
    roles: ["admin"],
    active: false,
    subMenu: [
      {
        text: "محصولات",
        link: "/products",
        roles: ["admin"],
      },
      {
        text: "دسته بندی محصولات",
        link: "/products-category-list",
        roles: ["admin"],
      },
      {
        text: "درگاه های بانکی",
        link: "/payment-gateway-list",
        roles: ["admin"],
      }
    ]
  },
  {
    heading: "مدرسه پرواز آسو"
  },
  {
    icon: <MdOutlineHome size={fontSize} color={color} />,
    text: "خانه",
    link: "/asoo_home",
    roles: ["Teacher", "admin", "Student"],
    dashboard: true
  },
  // {
  //   icon: <LuUsers size={fontSize-1} color={color} />,
  //   text: "مدیریت کاربران",
  //   roles: ["admin"],
  //   active: false,
  //   subMenu: [
  //     {
  //       text: "کاربران",
  //       link: "/user-list-2",
  //       roles: ["admin"],
  //     },
  //     {
  //       text: "ایجاد کاربر سیستم",
  //       link: "/user-add-2",
  //       roles: ["admin"],
  //     }
  //   ]
  // },
  {
    icon: <PiChalkboardTeacherBold size={fontSize} color={color} />,
    text: "اساتید",
    roles: ["admin"],
    active: false,
    subMenu: [
      {
        text: "مدیریت اساتید",
        link: "/teacher-list",
        roles: ["admin"],
      },
      {
        text: "ایجاد استاد",
        link: "/teacher-add",
        roles: ["admin"],
      }
    ]
  },
  {
    icon: <LuGraduationCap size={fontSize-1} color={color} />,
    text: "دانشجویان",
    roles: ["admin"],
    active: false,
    subMenu: [
      {
        text: "مدیریت دانشجویان",
        link: "/student-list",
        roles: ["admin"],
      },
      {
        text: "ایجاد دانشجو",
        link: "/student-add",
        roles: ["admin"],
      }
    ]
  },
  {
    icon: <LiaPlaneDepartureSolid size={fontSize+1} color={color} />,
    text: "پروازها",
    roles: ["Teacher", "admin", "Student", "Plane"],
    active: false,
    subMenu: [
      {
        text: "مدیریت پروازها",
        link: "/flight-list",
        roles: ["Teacher", "admin", "Student", "Plane"],
      },
      {
        text: "ایجاد پرواز",
        link: "/flight-add",
        roles: ["admin"],
      },
      // {
      //   text: "خدمات پرواز",
      //   link: "/flight-service",
      //   roles: ["admin"],
      // }
    ]
  },
  {
    icon: <LiaPlaneSolid size={fontSize+1} color={color} />,
    text: "هواپیما",
    roles: ["admin"],
    active: false,
    subMenu: [
      {
        text: "مدیریت هواپیما ها",
        link: "/plane-list",
        roles: ["admin"],
      },
      {
        text: "ایجاد هواپیما",
        link: "/plane-add",
        roles: ["admin"],
      }
    ]
  },
  {
    icon: <MdOutlineHomeRepairService size={fontSize} color={color} />,
    text: "خدمات",
    roles: ["admin", "Plane"],
    active: false,
    subMenu: [
      {
        text: "لیست خدمات",
        link: "/service-list",
        roles: ["admin", "Plane"],
      },
      {
        text: "افزودن خدمات",
        link: "/service-add",
        roles: ["admin"],
      }
    ]
  },
  {
    icon: <RiBook2Line size={fontSize} color={color} />,
    text: "دوره ها",
    roles: ["admin", "Teacher", "Student"],
    active: false,
    subMenu: [
      {
        text: "مدیریت دوره ها",
        link: "/course-list",
        roles: ["admin", "Teacher", "Student"],
      },
      {
        text: "ایجاد دوره",
        link: "/course-add",
        roles: ["admin"],
      }
    ]
  },
  {
    icon: <BiChalkboard size={fontSize} color={color} />,
    text: "کلاس ها",
    roles: ["Teacher", "admin", "Student"],
    active: false,
    subMenu: [
      {
        text: "مدیریت کلاس ها",
        link: "/course-class-list",
        roles: ["Teacher", "admin", "Student"],
      },
      {
        text: "ایجاد کلاس",
        link: "/course-class-add",
        roles: ["admin"],
      }
    ]
  },
  {
    icon: <RiBankLine size={fontSize} color={color} />,
    text: "مالی",
    roles: ["Teacher", "admin", "Student", "Plane"],
    active: false,
    subMenu: [
      {
        text: "تراکنش ها",
        link: "/transaction-list",
        roles: ["Teacher", "admin", "Student", "Plane"],
      },
      {
        text: "تسویه حساب",
        link: "/checkout",
        roles: ["admin"],
      },
      {
        text: "شارژ کیف پول",
        link: "/recharge",
        roles: ["admin"],
      },
      {
        text: "درگاه های پرداخت",
        link: "/payment-gateways",
        roles: ["admin"],
      }
    ]
  },
  {
    icon: <TbSettings size={fontSize} color={color} />,
    text: "تنظیمات",
    roles: ["admin"],
    active: false,
    subMenu: [
      {
        text: "عمومی",
        link: "/settings",
        roles: ["admin"],
      },
      {
        text: "قالب",
        link: "/settings",
        roles: ["admin"],
      },
      {
        text: "متغیرهای پیشفرض",
        link: "/settings",
        roles: ["admin"],
      }
    ]
  }
];
export default menu;
