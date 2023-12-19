import { TbEdit } from "react-icons/tb";
import { RiDeleteBinLine } from "react-icons/ri";

export const tableStatics = {
  title: "هواپیماها",
  description: "",
  addNewItemButtonLink: '/plane-add'
}
export const formStatics = {
  title: "ایجاد هواپیما",
  editTitle: "ویرایش هواپیما",
  description: "از اینجا میتوانید اقدام به ایجاد هواپیما کنید",
  editDescription: "از اینجا میتوانید اقدام به ویرایش هواپیما کنید",
  submitText: "ایجاد هواپیما",
  editSubmitText: "ویرایش هواپیما",
}


export const filterStructure = [
  {
    title: "اسم",
    slug: 'name',
    type: "text",
  },
  {
    title: "شماره رجیستر",
    slug: 'registerNumber',
    type: "text",
  },
]

export const tableStructure = [
  {
    title: "شناسه",
    slug: 'id',
  },
  {
    title: "اسم",
    slug: 'name',
  },
  {
    title: "شماره رجیستر",
    slug: 'registerNumber',
    useFarsiNumber: true
  },
  {
    title: "ساعت پرواز",
    slug: 'flightHours',
    useFarsiNumber: true
  },
  {
    title: "تاریخ موتور",
    slug: 'engineOverhaulDate',
    useJalaliFormat: true,
    useFarsiNumber: true
  },
  {
    title: "ساعت موتور",
    slug: 'engineOverhaulHours',
    useFarsiNumber: true
  },
  {
    title: "تاریخ ملخ",
    slug: 'propellerOverhaulDate',
    useJalaliFormat: true,
    useFarsiNumber: true
  },
  {
    title: "ساعت ملخ",
    slug: 'propellerOverhaulHours',
    useFarsiNumber: true
  },
  // {
  //   title: "ساعت سرویس بعدی",
  //   slug: 'title',
  // },
  {
    title: "بیمه",
    slug: 'insuranceNumber',
    useFarsiNumber: true
  },
  {
    title: "مجوز پرواز",
    slug: 'flightPermitDate',
    useJalaliFormat: true,
    useFarsiNumber: true
  },

  {
    useActionsButton: true, //use delete-item class to automatic implement the removing item.
    slug: '',
    actions: [
      {
        title: "ویرایش هواپیما",
        slug: "edit-plane",
        icon: <TbEdit size={18} color={"#526484"}/>,

        useRoute: true,
        route: "/plane-edit/:id"
      },
      {
        title: "حذف هواپیما",
        slug: 'delete-plane',
        icon: <RiDeleteBinLine size={18} color={"#526484"}/>,

        useYesOrNoModal: true,
        modalCancelText: 'بستن پنجره',
        modalSubmitText: 'حذف هواپیما',
        modalTitle: 'حذف هواپیما',
        modalContent: 'ایا از حذف این هواپیما اطمینان دارید؟ با حذف این هواپیما داده ها دیگر در دسترس نخواهند بود',

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
      placeholder: "نام هواپیما را وارد کنید",
      isRequired: true,
    },
    {
      title: "شماره رجیستر",
      slug: 'registerNumber',
      type: "text",
      placeholder: "شماره رجییستر هواپیما را وارد کنید",
      isRequired: true,
    },
  ],
  [
    {
      title: "سال ساخت",
      slug: 'buildDate',
      type: "date",
      isJalali: true,
      placeholder: "سال ساخت هواپیما را وارد کنید",
      isRequired: true,
    },
    {
      title: "ساعت پرواز",
      slug: 'flightHours',
      type: "number",
      placeholder: "نام هواپیما را وارد کنید",
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
      placeholder: "توضیحات هواپیما را وارد کنید",
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
