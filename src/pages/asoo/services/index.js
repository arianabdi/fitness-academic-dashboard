import { TbEdit } from "react-icons/tb";
import { RiDeleteBinLine } from "react-icons/ri";

export const tableStatics = {
  title: "سرویس ها",
  description: "",
  addNewItemButtonLink: '/service-add'
}
export const formStatics = {
  title: "ایجاد سرویس",
  editTitle: "ویرایش سرویس",
  description: "از اینجا میتوانید اقدام به ایجاد سرویس کنید",
  editDescription: "از اینجا میتوانید اقدام به ویرایش سرویس کنید",
  submitText: "ایجاد سرویس",
  editSubmitText: "ویرایش سرویس",
}


export const filterStructure = [

  {
    title: "نوع خدمات",
    slug: 'type',
    type: "select",

    chooseOptionsFromApi: true,
    path: '/Settings/Setting?page=1&limit=100&sort=createdAt&slug=serviceType',
    key: 'setting',
    chooseOptionsLabelFrom: 'description',
    chooseOptionsValueFrom: 'code',
    options: [],
    placeholder: "نوع خدمات را انتخاب کنید",
  },
  {
    title: "هزینه",
    slug: 'amount',
    type: "number",
    placeholder: "هزینه خدمات را وارد کنید",

  },
  {
    title: "هواپیما",
    slug: 'user',
    type: "select",

    chooseOptionsFromApi: true,
    path: '/Planes/Plane',
    key: 'planes',
    chooseOptionsLabelFrom: 'name',
    chooseOptionsValueFrom: 'userId',
    options: [],
    placeholder: "هواپیما را انتخاب کنید",

  },

]

export const tableStructure = [
  {
    title: "شناسه",
    slug: 'id',
    useFarsiNumber: true
  },
  {
    title: "نوع خدمات",
    slug: 'typeTitle',
  },
  {
    title: "هواپیما",
    slug: 'planeName',
    useFarsiNumber: true
  },
  {
    title: "تاریخ ایجاد",
    slug: 'createdAt',
    useJalaliFormat: true,
    useFarsiNumber: true
  },
  {
    title: "هزینه",
    slug: 'amount',
    useFarsiNumber: true
  },
  {
    title: "توضیحات",
    slug: 'description',
    useFarsiNumber: true
  },
  {
    useActionsButton: true, //use delete-item class to automatic implement the removing item.
    slug: '',
    actions: [
      {
        title: "ویرایش سرویس",
        slug: "edit",
        icon: <TbEdit size={18} color={"#526484"}/>,


        useRoute: true,
        route: "/service-edit/:id"
      },
      {
        title: "حذف سرویس",
        slug: 'delete',
        icon: <RiDeleteBinLine size={18} color={"#526484"}/>,

        useYesOrNoModal: true,
        modalCancelText: 'بستن پنجره',
        modalSubmitText: 'حذف سرویس',
        modalTitle: 'حذف سرویس',
        modalContent: 'ایا از حذف این سرویس اطمینان دارید؟ با حذف این سرویس داده ها دیگر در دسترس نخواهند بود',

      },
    ]
  },
]

export const formStructure = [
  [
    {
      title: "هزینه",
      slug: 'amount',
      type: "number",
      placeholder: "هزینه خدمات را وارد کنید",
      isRequired: true,
    },
    {
      title: "نوع خدمات",
      slug: 'type',
      type: "select",

      chooseOptionsFromApi: true,
      path: '/Settings/Setting?page=1&limit=100&sort=createdAt&slug=serviceType',
      key: 'setting',
      chooseOptionsLabelFrom: 'description',
      chooseOptionsValueFrom: 'code',
      options: [],

      placeholder: "نوع خدمات را انتخاب کنید",
      isRequired: true,
    },
  ],
  [
    {
      title: "هواپیما",
      slug: 'user',
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
      title: "لیتر",
      slug: 'value',
      type: "number",

      slugDependency: 'type',
      slugDependencyStatement: 2
    },
  ],
  [
    {
      title: "توضیحات",
      slug: 'description',
      type: "textarea",
      placeholder: "مدت زمان سرویس را وارد کنید",
      isRequired: true,
    },
  ]
]

