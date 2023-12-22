import { TbEdit } from "react-icons/tb";
import { RiDeleteBinLine } from "react-icons/ri";


export const tableStatics = {
  title: "درگاه پرداخت",
  description: "شما از این بخش میتوانید تمامی درگاه های پرداخت نظر خود را ثبت کرده و در لیست زیر به آن ها دسترسی داشته باشید.",
  addNewItemButtonLink: '/payment-gateway-add'
}



export const formStatics = {
  title: "ایجاد درگاه پرداخت",
  editTitle: "ویرایش درگاه پرداخت",
  description: "از اینجا میتوانید اقدام به ایجاد درگاه پرداخت کنید",
  editDescription: "از اینجا میتوانید اقدام به ویرایش درگاه پرداخت کنید",
  submitText: "ایجاد درگاه پرداخت",
  editSubmitText: "ویرایش درگاه پرداخت",
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
    title: "نام درگاه",
    slug: 'name',
    useImage: true,
  },
  {
    title: "شناسه درگاه",
    slug: 'slug',
    useTranslate: true
  },
  {
    title: "وضعیت",
    slug: 'status',
    useTranslate: true
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
        title: "ویرایش درگاه پرداخت",
        slug: "edit-payment-gateway",
        icon: <TbEdit size={18} color={"#526484"}/>,

        useRoute: true,
        route: "/payment-gateway-edit/:_id"
      },
      {
        title: "حذف درگاه پرداخت",
        slug: 'delete-payment-gateway',
        icon: <RiDeleteBinLine size={18} color={"#526484"}/>,

        useYesOrNoModal: true,
        modalCancelText: 'بستن پنجره',
        modalType: "delete",
        modalPath: '/api/payment-gateway/:_id',
        modalSubmitText: 'حذف درگاه پرداخت',
        modalTitle: 'حذف درگاه پرداخت',
        modalContent: 'ایا از حذف این درگاه پرداخت اطمینان دارید؟ با حذف این درگاه پرداخت داده های او دیگر در دسترس نخواهند بود',

      },
    ]
  },
]



export const formStructure = [
  [

    {
      title: "نام درگاه",
      slug: 'name',
      type: "text",
      placeholder: "نام درگاه را وارد کنید",
      isRequired: true,
    },
    {
      title: "شناسه درگاه",
      slug: 'slug',
      type: "text",
      placeholder: "شناسه درگاه را وارد کنید",
      isRequired: true,
    },

  ],
  [

    {
      title: "تصویر درگاه",
      slug: 'image',
      type: "text",
      placeholder: "تصویر درگاه را وارد کنید",
      isRequired: true,
    },
    {
      title: "وب هوک",
      slug: "url",
      type: "text",
      placeholder: "وب هوک درگاه را وارد کنید",
      isRequired: true,
    },

  ],
  [

    {
      title: "وضعیت",
      slug: 'status',
      type: "select",
      placeholder: "وضعیت درگاه را وارد کنید",
      options: [
        {label: 'فعال', value: 'active'},
        {label: 'غیر فعال', value: 'inactive'},
      ],
      isRequired: true,
    },
    {
      isEmpty: true
    },

  ],

  [
    {
      title: "توضیحات درگاه",
      slug: 'description',
      type: "textarea",
      placeholder: "توضیحات درگاه را وارد کنید",
      isRequired: true,
    },
  ],

]

