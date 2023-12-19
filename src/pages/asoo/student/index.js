import { TbEdit } from "react-icons/tb";
import { RiDeleteBinLine } from "react-icons/ri";
import { LuUser } from "react-icons/lu";

export const tableStatics = {
  title: "دانشجوها",
  description: "",
  addNewItemButtonLink: '/student-add'
}
export const formStatics = {
  title: "ایجاد دانشجو",
  editTitle: "ویرایش دانشجو",
  description: "از اینجا میتوانید اقدام به ایجاد دانشجو کنید",
  editDescription: "از اینجا میتوانید اقدام به ویرایش دانشجو کنید",
  submitText: "ایجاد دانشجو",
  editSubmitText: "ویرایش دانشجو",
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
  {
    title: "نام دانشجو",
    slug: 'fullname',
  },
  {
    title: "کد ملی",
    slug: 'nationalCode',
    useFarsiNumber: true,
  },
  {
    title: "کد دانشجو",
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
        title: "ویرایش دانشجو",
        slug: "edit-flight",
        icon: <TbEdit size={18} color={"#526484"}/>,

        useRoute: true,
        route: "/student-edit/:id"
      },
      {
        title: "مشاهده پروفایل",
        slug: "profile",
        icon: <LuUser size={18} color={"#526484"}/>,

        useRoute: true,
        route: "/profile/Student/:id"
      },
      {
        title: "حذف دانشجو",
        slug: 'delete-student',
        icon: <RiDeleteBinLine size={18} color={"#526484"}/>,

        useYesOrNoModal: true,
        modalCancelText: 'بستن پنجره',
        modalSubmitText: 'حذف کاربر',
        modalTitle: 'حذف کاربر',
        modalContent: 'ایا از حذف این کاربر اطمینان دارید؟ با حذف این دانشجو در صورت نیاز بایداطلاعات جدید وارد کنید',
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
      placeholder: "نام دانشجو را انتخاب کنید",
      isRequired: true,
    },
    {
      title: "نام خانوادگی",
      slug: 'lastName',
      type: "text",
      placeholder: "نام خانوادگی دانشجو را وارد کنید",
      isRequired: true,
    },
  ],
  [
    {
      title: "کد ملی",
      slug: 'nationalCode',
      type: "text",
      placeholder: "کد ملی دانشجو را انتخاب کنید",
      isRequired: true,
    },
    {
      title: "کد دانشجویی",
      slug: 'systemCode',
      type: "text",
      placeholder: "کد دانشجویی دانشجو را وارد کنید",
      isRequired: true,
    },
  ],
  [
    {
      title: "آدرس",
      slug: 'address',
      type: "text",
      placeholder: "آدرس دانشجو را وارد کنید",
      isRequired: true,
    },
    {
      title: "تلفن ثابت",
      slug: 'telePhoneNumber',
      type: "text",
      placeholder: "تلفن ثابت دانشجو را وارد کنید",
      isRequired: true,
    },
  ],
  [
    {
      title: "شماره موبایل",
      slug: 'mobilePhoneNumber',
      type: "text",
      placeholder: "شماره موبایل دانشجو را وارد کنید",
      isRequired: true,
    },
    {
      title: "آدرس ایمیل",
      slug: 'email',
      type: "text",
      placeholder: "آدرس ایمیل دانشجو را وارد کنید",
      isRequired: true,
    },
  ],
  [
    {
      title: "تاریخ گواهینامه",
      slug: 'licenceDate',
      type: "date",
      isJalali: true,
      placeholder: "تاریخ گواهینامه دانشجو را وارد کنید",
    },
    {
      title: "شماره گواهینامه",
      slug: 'licenceNumber',
      type: "text",
      placeholder: "شماره گواهینامه دانشجو را وارد کنید",
    }
  ],
  [
    {
      title: "تاریخ مدیکال",
      slug: 'medicalDate',
      type: "date",
      isJalali: true,
      placeholder: "تاریخ مدیکال دانشجو را وارد کنید",
    },
    {
      title: "شماره مدیکال",
      slug: 'medicalNumber',
      type: "text",
      placeholder: "شماره مدیکال دانشجو را وارد کنید",
    }
  ],
  [
    {
      title: "تاریخ تولد",
      slug: 'birthDate',
      type: "date",
      isJalali: true,
      placeholder: "تاریخ تولد دانشجو را وارد کنید",
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
      placeholder: "تصویر اجازه نامه پرواز را انتخاب کنید",
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
      placeholder: "تصویر کارت تردد را انتخاب کنید",
    },
    {
      isEmpty: true
    }
  ]
]

