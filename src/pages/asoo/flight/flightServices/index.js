export const tableStatics = {
  title: "خدمات پرواز",
  description: "",
  addNewItemButtonLink: '/flight-add'
}
export const formStatics = {
  title: "ایجاد خدمات پرواز",
  editTitle: "ویرایش خدمات پرواز",
  description: "از اینجا میتوانید اقدام به ایجاد خدمات پرواز کنید",
  editDescription: "از اینجا میتوانید اقدام به ویرایش خدمات پرواز کنید",
  submitText: "ایجاد خدمات پرواز",
  editSubmitText: "ویرایش خدمات پرواز",
}


export const filterStructure = [
  {
    title: "اسم",
    slug: 'name',
    type: "text",
    value: "",
    selected: false
  },
  {
    title: "شماره رجیستر",
    slug: 'registerNumber',
    type: "text",
    value: "",
    selected: false
  },
  {
    title: "سطح",
    slug: 'level',
    type: "select",
    options: [
      {label: 'مبتدی', value: 'beginner'},
      {label: 'حرفه ای', value: 'professional'},
    ],
    value: "",
    selected: false
  },
]

export const tableStructure = [
  {
    title: "شناسه",
    slug: 'id',
  },
  // {
  //   title: "تاریخ",
  //   slug: 'date',
  //   useJalaliFormat: true,
  //   useFarsiNumber: true
  // },
  {
    title: "مدت خدمات پرواز",
    slug: 'duration',
  },
  {
    title: "استاد خلبان",
    slug: 'pilot',
  },
  {
    title: "دانشجو",
    slug: 'coPilot',
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
    title: "نوع خدمات پرواز",
    slug: 'typeTitle',
  },
  {
    title: "هزینه",
    slug: 'pilotPrice',
  },
  {
    title: "درآمد",
    slug: 'coPilotPrice',
  },
  {
    useActionsButton: true, //use delete-item class to automatic implement the removing item.
    slug: '',
    actions: [
      {
        title: "ویرایش خدمات پرواز",
        slug: "edit-flight",
        icon: "edit",

        useRoute: true,
        route: "/flight-edit/:id"
      },
      {
        title: "حذف خدمات پرواز",
        slug: 'delete-flight',
        icon: "trash",
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
      placeholder: "تاریخ خدمات پرواز را انتخاب کنید",
      isRequired: true,
    },
    {
      title: "مدت خدمات پرواز (دقیقه)",
      slug: 'duration',
      type: "number",
      placeholder: "مدت زمان خدمات پرواز را وارد کنید",
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
      path: '/Planes/Plane',
      key: 'planes',
      chooseOptionsLabelFrom: 'name',
      chooseOptionsValueFrom: 'id',
      options: [],
      placeholder: "هواپیما را انتخاب کنید",
      isRequired: true,
    },
    {
      title: "مکان",
      slug: 'place',
      type: "text",
      placeholder: "مکان خدمات پرواز را وارد کنید",
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
      title: "نوع خدمات پرواز",
      slug: 'type',
      type: "select",

      chooseOptionsFromApi: true,
      path: '/Settings/Setting?page=1&limit=10&sort=createdAt&sortType=ASC&slug=flightType',
      key: 'setting',
      chooseOptionsLabelFrom: 'description',
      chooseOptionsValueFrom: 'id',
      options: [],
      placeholder: "نوع خدمات پرواز را انتخاب کنید",
      isRequired: true,
    },
    {
      isEmpty: true
    },
  ],
]

