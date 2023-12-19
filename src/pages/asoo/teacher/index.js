import { TbEdit } from "react-icons/tb";
import { RiDeleteBinLine } from "react-icons/ri";
import { LuUser } from "react-icons/lu";

export const tableStatics = {
  title: "استادها",
  description: "",
  addNewItemButtonLink: '/teacher-add'
}
export const formStatics = {
  title: "ایجاد استاد",
  editTitle: "ویرایش استاد",
  description: "از اینجا میتوانید اقدام به ایجاد استاد کنید",
  editDescription: "از اینجا میتوانید اقدام به ویرایش استاد کنید",
  submitText: "ایجاد استاد",
  editSubmitText: "ویرایش استاد",
}


export const filterStructure = [
  {
    title: "نام",
    slug: 'firstName',
    type: "text",
    value: "",
    selected: false
  },
  {
    title: "نام خانوادگی",
    slug: 'lastName',
    type: "text",
    value: "",
    selected: false
  },
  {
    title: "شماره تماس",
    slug: 'lastName',
    type: "text",
    value: "",
    selected: false
  },
  {
    title: "کد استاد",
    slug: 'systemCode',
    type: "text",
    value: "",
    selected: false
  }
]

export const tableStructure = [
  {
    title: "شناسه",
    slug: 'id',
  },
  {
    title: "نام استاد",
    slug: 'fullname',
  },
  {
    title: "کد ملی",
    slug: 'nationalCode',
    useFarsiNumber: true,
  },
  {
    title: "کد استاد",
    slug: 'systemCode',
    useFarsiNumber: true,
  },
  {
    title: "تلفن همراه",
    slug: 'mobilePhoneNumber',
    useFarsiNumber: true,
  },
  {
    title: "تاریخ تولد",
    slug: 'birthDate',
    useJalaliFormat: true,
    useFarsiNumber: true,
    showDateTime: false
  },
  {
    title: "تاریخ گواهینامه",
    slug: 'licenceDate',
    useJalaliFormat: true,
    useFarsiNumber: true
  },
  {
    title: "تاریخ مدیکال",
    slug: 'medicalDate',
    useJalaliFormat: true,
    useFarsiNumber: true
  },
  {
    useActionsButton: true, //use delete-item class to automatic implement the removing item.
    slug: '',
    actions: [
      {
        title: "ویرایش استاد",
        slug: "edit-teacher",
        icon: <TbEdit size={18} color={"#526484"}/>,

        useRoute: true,
        route: "/teacher-edit/:id"
      },
      {
        title: "مشاهده پروفایل",
        slug: "profile",
        icon: <LuUser size={18} color={"#526484"}/>,

        useRoute: true,
        route: "/profile/Teacher/:id"
      },
      {
        title: "حذف استاد",
        slug: 'delete-teacher',
        icon: <RiDeleteBinLine size={18} color={"#526484"}/>,

        useYesOrNoModal: true,
        modalCancelText: 'بستن پنجره',
        modalSubmitText: 'حذف کاربر',
        modalTitle: 'حذف استاد',
        modalContent: 'ایا از حذف این کاربر اطمینان دارید؟ با حذف این استاد در صورت نیاز بایداطلاعات جدید وارد کنید',


      },
    ]
  },
]

export const formStructure = [
  [
    {
      title: "نام",
      slug: 'firstName',
      type: "text",
      isJalali: true,
      placeholder: "نام استاد را انتخاب کنید",
      isRequired: true,
    },
    {
      title: "نام خانوادگی",
      slug: 'lastName',
      type: "text",
      placeholder: "نام خانوادگی استاد را وارد کنید",
      isRequired: true,
    },
  ],
  [
    {
      title: "کد ملی",
      slug: 'nationalCode',
      type: "text",
      placeholder: "کد ملی استاد را انتخاب کنید",
      isRequired: true,
    },
    {
      title: "کد استاد",
      slug: 'systemCode',
      type: "text",
      placeholder: "کد استاد استاد را وارد کنید",
      isRequired: true,
    },
  ],
  [
    {
      title: "آدرس",
      slug: 'address',
      type: "text",
      placeholder: "آدرس استاد را وارد کنید",
      isRequired: true,
    },
    {
      title: "تلفن ثابت",
      slug: 'telePhoneNumber',
      type: "text",
      regex: /^[A-Za-z\u0600-\u06FF\s]+$/,
      placeholder: "تلفن ثابت استاد را وارد کنید",
      isRequired: true,
    },
  ],
  [
    {
      title: "شماره موبایل",
      slug: 'mobilePhoneNumber',
      type: "text",
      placeholder: "شماره موبایل استاد را وارد کنید",
      isRequired: true,
    },
    {
      title: "آدرس ایمیل",
      slug: 'email',
      type: "text",
      placeholder: "آدرس ایمیل استاد را وارد کنید",
      isRequired: true,
    },
  ],
  [
    {
      title: "تاریخ گواهینامه",
      slug: 'licenceDate',
      type: "date",
      isJalali: true,
      placeholder: "تاریخ گواهینامه استاد را وارد کنید",
      isRequired: true,
    },
    {
      title: "شماره گواهینامه",
      slug: 'licenceNumber',
      type: "text",
      placeholder: "شماره گواهینامه استاد را وارد کنید",
      isRequired: true,
    }
  ],
  [
    {
      title: "تاریخ مدیکال",
      slug: 'medicalDate',
      type: "date",
      isJalali: true,
      placeholder: "تاریخ مدیکال استاد را وارد کنید",
      isRequired: true,
    },
    {
      title: "شماره مدیکال",
      slug: 'medicalNumber',
      type: "text",
      placeholder: "شماره مدیکال استاد را وارد کنید",
      isRequired: true,
    }
  ],
  [
    {
      title: "تاریخ تولد",
      slug: 'birthDate',
      type: "date",
      isJalali: true,
      placeholder: "تاریخ تولد استاد را وارد کنید",
      isRequired: true,
    },
    {
      isEmpty: true
    },
  ],
  [
    {
      title: "پیش نمایش عکس پرسنلی ",
      slug: 'personalImagePreview',
      type: "image-preview",
      placeholder: "عکس پرسنلی را انتخاب کنید",
    },
    {
      title: "پیش نمایش اجازه نامه پرواز ",
      slug: 'nationalCardImagePreview',
      type: "image-preview",
      placeholder: "تصویر اجازه نامه پرواز را انتخاب کنید",
    },
  ],
  [
    {
      title: "تصویر پرسنلی",
      slug: 'personalImage',
      type: "file-upload",
      placeholder: "تصویر اجازه نامه پرواز را انتخاب کنید",
    },
    {
      title: "تصویر کارت ملی",
      slug: 'nationalCardImage',
      type: "file-upload",
      placeholder: "تصویر اجازه نامه پرواز را انتخاب کنید",
    }
  ],
  [
    {
      title: "پیش نمایش تصویر کارت تردد ",
      slug: 'entryCardImagePreview',
      type: "image-preview",
      placeholder: "عکس کارت تردد را انتخاب کنید",
    },
    {
      isEmpty: true
    }
  ],
  [
    {
      title: "تصویر کارت تردد",
      slug: 'entryCardImage',
      type: "file-upload",
      placeholder: "تصویر اجازه نامه پرواز را انتخاب کنید",
    },
    {
      isEmpty: true
    }
  ],

]

