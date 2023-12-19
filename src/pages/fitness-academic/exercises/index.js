import { TbEdit } from "react-icons/tb";
import { RiDeleteBinLine } from "react-icons/ri";

export const tableStatics = {
  title: "تمرینها",
  description: "",
  addNewItemButtonLink: '/plane-add'
}
export const formStatics = {
  title: "ایجاد تمرین",
  editTitle: "ویرایش تمرین",
  description: "از اینجا میتوانید اقدام به ایجاد تمرین کنید",
  editDescription: "از اینجا میتوانید اقدام به ویرایش تمرین کنید",
  submitText: "ایجاد تمرین",
  editSubmitText: "ویرایش تمرین",
}


export const filterStructure = [
  {
    title: "عنوان",
    slug: 'title',
    type: "text",
  },
  {
    title: "سطح",
    slug: 'level',
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
    title: "دسته بندی",
    slug: 'category',
    type: "select",

    chooseOptionsFromApi: true,
    path: '/Persons/Search/Student',
    key: 'results',
    chooseOptionsLabelFrom: 'fullname',
    chooseOptionsValueFrom: 'userId',
    options: [],
    placeholder: "دانشجو را انتخاب کنید",
  },
]

export const tableStructure = [
  {
    title: "شناسه",
    slug: '_id',
  },
  {
    title: "عنوان",
    slug: 'title',
  },
  {
    title: "سطح",
    slug: 'level',
  },
  {
    title: "دسته بندی",
    slug: 'category'
  },
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
        title: "ویرایش تمرین",
        slug: "edit-exercise",
        icon: <TbEdit size={18} color={"#526484"}/>,

        useRoute: true,
        route: "/exercise-edit/:id"
      },
      {
        title: "حذف تمرین",
        slug: 'delete-exercise',
        icon: <RiDeleteBinLine size={18} color={"#526484"}/>,

        useYesOrNoModal: true,
        modalCancelText: 'بستن پنجره',
        modalSubmitText: 'حذف تمرین',
        modalTitle: 'حذف تمرین',
        modalContent: 'ایا از حذف این تمرین اطمینان دارید؟ با حذف این تمرین داده ها دیگر در دسترس نخواهند بود',

      },
    ]
  },
]

export const formStructure = [
  [
    {
      title: "اسم",
      slug: 'name',
      type: "text",
      placeholder: "نام تمرین را وارد کنید",
      isRequired: true,
    },
    {
      title: "شماره رجیستر",
      slug: 'registerNumber',
      type: "text",
      placeholder: "شماره رجییستر تمرین را وارد کنید",
      isRequired: true,
    },
  ],
  [
    {
      title: "سال ساخت",
      slug: 'buildDate',
      type: "date",
      isJalali: true,
      placeholder: "سال ساخت تمرین را وارد کنید",
      isRequired: true,
    },
    {
      title: "ساعت پرواز",
      slug: 'flightHours',
      type: "number",
      placeholder: "نام تمرین را وارد کنید",
      isRequired: true,
    },
  ],
  [
    {
      title: "تاریخ اورهال موتور",
      slug: 'engineOverhaulDate',
      type: "date",
      isJalali: true,
      placeholder: "تاریخ اورهال موتور را وارد کنید",
      isRequired: true,
    },
    {
      title: "ساعت اورهال موتور",
      slug: 'engineOverhaulHours',
      type: "number",
      placeholder: "ساعت اورهال موتور را وارد کنید",
      isRequired: true,
    },
  ],
  [
    {
      title: "تاریخ اورهال ملخ",
      slug: 'propellerOverhaulDate',
      type: "date",
      isJalali: true,
      placeholder: "تاریخ اورهال ملخ را وارد کنید",
      isRequired: true,
    },
    {
      title: "ساعت اورهال ملخ",
      slug: 'propellerOverhaulHours',
      type: "number",
      placeholder: "ساعت اورهال ملخ را وارد کنید",
      isRequired: true,
    }
  ],
  [
    {
      title: "مجوز پرواز",
      slug: 'flightPermitDate',
      type: "date",
      isJalali: true,
      placeholder: "مجوز پرواز را وارد کنید",
      isRequired: true,
    },
    {
      title: "ساعت سرویس بعدی",
      slug: 'overallServicesHours',
      type: "number",
      isJalali: true,
      placeholder: "ساعت سرویس کلی را وارد کنید",
      isRequired: true,
    },

  ],
  [
    {
      title: "شماره بیمه",
      slug: 'insuranceNumber',
      type: "text",
      placeholder: "شماره بیمه را وارد کنید",
      isRequired: true,
    },
    {
      title: "تاریخ بیمه",
      slug: 'insuranceDate',
      type: "date",
      isJalali: true,
      placeholder: "تاریخ بیمه را وارد کنید",
      isRequired: true,
    },
  ],
  [
    {
      title: "توضیحات",
      slug: 'description',
      type: "textarea",
      placeholder: "توضیحات تمرین را وارد کنید",
    }
  ],
  [
    {
      title: "تصویر اجازه نامه پرواز",
      slug: 'flightPermitImagePreview',
      type: "image-preview",
      placeholder: "تصویر اجازه نامه پرواز را انتخاب کنید",
    },
    {
      title: "تصویر بیمه نامه",
      slug: 'insuranceImagePreview',
      type: "image-preview",
      placeholder: "تصویر بیمه نامه را انتخاب کنید",
    },
  ],
  [
    {
      title: "تصویر اجازه نامه پرواز",
      slug: 'flightPermitImage',
      type: "file-upload",
      placeholder: "تصویر اجازه نامه پرواز را انتخاب کنید",
    },
    {
      title: "تصویر بیمه نامه",
      slug: 'insuranceImage',
      type: "file-upload",
      placeholder: "تصویر بیمه نامه را انتخاب کنید",
    },
  ]
]
