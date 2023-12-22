import { TbEdit } from "react-icons/tb";
import { RiDeleteBinLine } from "react-icons/ri";


export const tableStatics = {
  title: "کاربران سیستم",
  description: "شما از این بخش میتوانید تمامی کاربر های مورد نظر خود را ثبت کرده و در بخش ایجاد برنامه به آن ها دسترسی داشته باشید.",
  addNewItemButtonLink: '/user-system-add'
}



export const formStatics = {
  title: "ایجاد کاربر سیستم",
  editTitle: "ویرایش کاربر سیستم",
  description: "از اینجا میتوانید اقدام به ایجاد کاربر سیستم کنید",
  editDescription: "از اینجا میتوانید اقدام به ویرایش کاربر سیستم کنید",
  submitText: "ایجاد کاربر سیستم",
  editSubmitText: "ویرایش کاربر سیستم",
}

export const filterStructure = [
  {
    title: "عنوان",
    slug: 'title',
    type: "text",
    selected: false
  },

  {
    title: "نام و نام خانوادگی",
    slug: 'full_name',
    type: "text",
    selected: false
  },
  {
    title: "ایمیل",
    slug: 'email',
    type: "text",
    selected: false
  },
  {
    title: "شماره تماس",
    slug: 'mobile',
    type: "text",
    selected: false
  },
]

export const tableStructure = [
  {
    title: "شناسه",
    slug: '_id',
  },
  {
    title: "نام و نام خانوادگی",
    slug: 'full_name',
    useImage: true,
  },
  {
    title: "ایمیل",
    slug: 'email',
    useTranslate: true
  },
  {
    title: "شماره تماس",
    slug: 'mobile',
    useTranslate: true,
    useFarsiNumber: true
  },
  // {
  //   title: "نقش ها",
  //   slug: 'roles',
  //   useTranslate: true
  // },
  {
    title: "تاریخ ایجاد",
    slug: 'createdAt',
    useJalaliFormat: true,
    useFarsiNumber: true
  },
  {
    useActionsButton: true, //use delete-item class to automatic implement the removing item.
    slug: '',
    actions: [
      {
        title: "ویرایش کاربر سیستم",
        slug: "edit-system-user",
        icon: <TbEdit size={18} color={"#526484"}/>,

        useRoute: true,
        route: "/user-system-edit/:_id"
      },
      {
        title: "حذف کاربر سیستم",
        slug: 'delete-system-user',
        icon: <RiDeleteBinLine size={18} color={"#526484"}/>,

        useYesOrNoModal: true,
        modalCancelText: 'بستن پنجره',
        modalType: "delete",
        modalPath: '/api/user/:_id',
        modalSubmitText: 'حذف کاربر سیستم',
        modalTitle: 'حذف کاربر سیستم',
        modalContent: 'ایا از حذف این کاربر اطمینان دارید؟ با حذف این کاربر داده های او دیگر در دسترس نخواهند بود',

      },
    ]
  },
]



export const formStructure = [
  [

    {
      title: "نام",
      slug: 'first_name',
      type: "text",
      placeholder: "نام کاربر را وارد کنید",
      isRequired: true,
    },
    {
      title: "نام خانوادگی",
      slug: 'last_name',
      type: "text",
      placeholder: "نام خانوادگی کاربر را وارد کنید",
      isRequired: true,
    },

  ],
  [
    {
      title: "جنسیت",
      slug: "gender",
      type: "select",
      options: [
        {label: 'خانم', value: 'female'},
        {label: 'آقا', value: 'male'},
      ],
      value: "",
    },
    {
      title: "نقش",
      slug: "role",
      type: "select",
      options: [
        {label: 'ادمین', value: 'admin'},
        {label: 'سوپر ادمین', value: 'super-admin'},
      ],
      value: "",
    },

  ],
  [
    {
      title: "کد ملی",
      slug: 'nationalCode',
      type: "text",
      placeholder: "کد ملی کاربر را وارد کنید",
      isRequired: true,
    },
    {
      title: "پسورد",
      slug: 'password',
      type: "password",
      placeholder: "پسورد کاربر را وارد کنید",
      isRequired: true,
    },
  ],
  [
    {
      title: "ایمیل",
      slug: 'email',
      type: "text",
      placeholder: "ایمیل کاربر را وارد کنید",
      isRequired: true,
    },
    {
      title: "شماره موبایل",
      slug: 'mobile',
      type: "text",
      placeholder: "شماره موبایل کاربر را وارد کنید",
      isRequired: true,
    },
  ],
  [
    {
      title: "کشور",
      slug: 'country',
      type: "text",
      placeholder: "کشور کاربر را وارد کنید",
      isRequired: true,
    },
    {
      title: "شهر",
      slug: 'city',
      type: "text",
      placeholder: "شهر کاربر را وارد کنید",
      isRequired: true,
    },
  ],
  [
    {
      title: "آدرس کامل",
      slug: 'address',
      type: "text",
      placeholder: "آدرس کاربر را وارد کنید",
      isRequired: true,
    },
  ],
]

