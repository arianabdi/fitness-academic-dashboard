import { TbEdit } from "react-icons/tb";
import { RiDeleteBinLine } from "react-icons/ri";

export const tableStatics = {
  title: "پروازها",
  description: "",
  addNewItemButtonLink: '/flight-add'
}
export const formStatics = {
  title: "ایجاد پرواز",
  editTitle: "ویرایش پرواز",
  description: "از اینجا میتوانید اقدام به ایجاد پرواز کنید",
  editDescription: "از اینجا میتوانید اقدام به ویرایش پرواز کنید",
  submitText: "ایجاد پرواز",
  editSubmitText: "ویرایش پرواز",
}


export const filterStructure = [
  {
    title: "استاد خلبان",
    slug: 'pilot',
    type: "select",

    chooseOptionsFromApi: true,
    path: '/Persons/Search/Teacher',
    key: 'results',
    chooseOptionsLabelFrom: 'fullname',
    chooseOptionsValueFrom: 'userId',
    options: [],
    placeholder: "استاد خلبان را انتخاب کنید",

  },
  {
    title: "دانشجو",
    slug: 'coPilot',
    type: "select",

    chooseOptionsFromApi: true,
    path: '/Persons/Search/Student',
    key: 'results',
    chooseOptionsLabelFrom: 'fullname',
    chooseOptionsValueFrom: 'userId',
    options: [],
    placeholder: "دانشجو را انتخاب کنید",

  },
  {
    title: "هواپیما",
    slug: 'plane',
    type: "select",

    chooseOptionsFromApi: true,
    path: '/Planes/Plane',
    key: 'planes',
    chooseOptionsLabelFrom: 'name',
    chooseOptionsValueFrom: 'id',
    options: [],
    placeholder: "هواپیما را انتخاب کنید",

  },
  {
    title: "مکان",
    slug: 'place',
    type: "text",
  },
  {
    title: "نوع پرواز",
    slug: 'type',
    type: "select",

    chooseOptionsFromApi: true,
    path: '/Settings/Setting?page=1&limit=10&sort=createdAt&sortType=ASC&slug=flightType',
    key: 'setting',
    chooseOptionsLabelFrom: 'description',
    chooseOptionsValueFrom: 'code',
    options: [],
    placeholder: "نوع پرواز را انتخاب کنید",

  },
]

export const tableStructure = [
  {
    title: "شناسه",
    slug: 'id',
    useFarsiNumber: true
  },
  {
    title: "تاریخ",
    slug: 'date',
    useJalaliFormat: true,
    useFarsiNumber: true
  },
  {
    title: "مدت پرواز",
    slug: 'duration',
    useFarsiNumber: true
  },
  {
    title: "استاد خلبان",
    slug: 'pilotFullname',
  },
  {
    title: "دانشجو",
    slug: 'coPilotFullname',
  },
  // {
  //   title: "هواپیما",
  //   slug: 'plane',
  // },
  {
    title: "مکان",
    slug: 'place',
  },
  {
    title: "نوع پرواز",
    slug: 'typeTitle',
  },
  {
    title: "هزینه",
    slug: 'pilotPrice',
    useFarsiNumber: true
  },
  {
    title: "درآمد",
    slug: 'coPilotPrice',
    useFarsiNumber: true
  },
  {
    useActionsButton: true, //use delete-item class to automatic implement the removing item.
    slug: '',
    actions: [
      {
        title: "ویرایش پرواز",
        slug: "edit-flight",
        icon: <TbEdit size={18} color={"#526484"}/>,

        useRoute: true,
        route: "/flight-edit/:id",
        roles: ["Admin"],
      },
      {
        title: "حذف پرواز",
        slug: 'delete-flight',
        icon: <RiDeleteBinLine size={18} color={"#526484"}/>,
        roles: ["Admin"],
      },
    ]
  },
]

export const formStructure = [
  [
    {
      title: "تاریخ",
      slug: 'date',
      type: "date",
      isJalali: true,
      placeholder: "تاریخ پرواز را انتخاب کنید",
      isRequired: true,
    },
    {
      title: "مدت پرواز (دقیقه)",
      slug: 'duration',
      type: "number",
      placeholder: "مدت زمان پرواز را وارد کنید",
      isRequired: true,
    },
  ],
  [
    {
      title: "استاد خلبان",
      slug: 'pilot',
      type: "select",

      chooseOptionsFromApi: true,
      path: '/Persons/Search/Teacher',
      key: 'results',
      chooseOptionsLabelFrom: 'fullname',
      chooseOptionsValueFrom: 'userId',
      options: [],
      placeholder: "استاد خلبان را انتخاب کنید",
      isRequired: true,
    },
    {
      title: "دانشجو",
      slug: 'coPilot',
      type: "select",

      chooseOptionsFromApi: true,
      path: '/Persons/Search/Student',
      key: 'results',
      chooseOptionsLabelFrom: 'fullname',
      chooseOptionsValueFrom: 'userId',
      options: [],
      placeholder: "دانشجو را انتخاب کنید",
      isRequired: true,
    }
  ],
  [
    {
      title: "هواپیما",
      slug: 'plane',
      type: "select",

      chooseOptionsFromApi: true,
      path: '/Planes/Search/Plane',
      key: 'results',
      chooseOptionsLabelFrom: 'name',
      chooseOptionsValueFrom: 'userId',
      options: [],
      placeholder: "هواپیما را انتخاب کنید",
      isRequired: true,
    },
    {
      title: "مکان",
      slug: 'place',
      type: "text",
      placeholder: "مکان پرواز را وارد کنید",
      isRequired: true,
    },
  ],
  [
    {
      title: "هزینه استاد خلبان",
      slug: 'pilotPrice',
      type: "number",
      placeholder: "هزینه استاد خلبان را وارد کنید",
      isRequired: true,
    },
    {
      title: "هزینه دانشجو",
      slug: 'coPilotPrice',
      type: "number",
      placeholder: "هزینه دانشجو را وارد کنید",
      isRequired: true,
    },
  ],
  [
    {
      title: "نوع پرواز",
      slug: 'type',
      type: "select",

      chooseOptionsFromApi: true,
      path: '/Settings/Setting?page=1&limit=10&sort=createdAt&sortType=ASC&slug=flightType',
      key: 'setting',
      chooseOptionsLabelFrom: 'description',
      chooseOptionsValueFrom: 'code',
      options: [],
      placeholder: "نوع پرواز را انتخاب کنید",
      isRequired: true,
    },
    {
      isEmpty: true
    },
  ],
]

