import { TbEdit } from "react-icons/tb";
import { RiDeleteBinLine } from "react-icons/ri";

export const tableHeading = {
  title: "کاربران سیستم",
  description: "شما از این بخش میتوانید تمامی کاربر های مورد نظر خود را ثبت کرده و در بخش ایجاد برنامه به آن ها دسترسی داشته باشید.",
  addNewItemButtonLink: 'user-system-add'
}
export const itemAddHeader = {
  title: "ایجاد کاربر سیستم",
  description: "شما از این بخش میتوانید برای سیستم ادمین خود یک کاربر جدید ایجاد کنید",

}
export const filterStructure = [
  {
    title: "عنوان",
    slug: 'title',
    type: "text",
    value: "",
    selected: false
  },
  {
    title: "دسته بندی",
    slug: 'categoryId',
    type: "select",
    options: [
      {label: 'بازو', value: '6489c0bae32a24bcc407357f'},
      {label: 'پا', value: '6489c0dfe32a24bcc4073587'},
      {label: 'کمربند شانه ای', value: '64ac3caca19a70a65c8f4487'},
      {label: 'عضلات زیربغل', value: '64ac3cd2a19a70a65c8f4491'},
      {label: 'عضلات سینه ای', value: '64ac3c65a19a70a65c8f447d'},
      {label: 'عضلات چهار سر رانی و همسترینگ', value: '64ac3cf7a19a70a65c8f449b'},
      {label: 'عضلات شکمی', value: '64ac3d35a19a70a65c8f44a5'},
      {label: 'پا', value: '6489c0dfe32a24bcc4073587'},
    ],
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
  },
  {
    title: "نقش ها",
    slug: 'roles',
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
        title: "ویرایش کاربر سیستم",
        slug: "edit-system-user",
        icon: <TbEdit size={18} color={"#526484"}/>,

        useRoute: true,
        route: "/post-category-edit/:_id"
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
      title: "عنوان کاربر",
      slug: 'title',
      type: "text",
      placeholder: "لطفا عنوان کاربر را وارد کنید",
      regex: /^[A-Za-z\u0600-\u06FF\s]+$/,
      isRequired: true,
      alert: 'مقدار عنوان کاربر باید شامل حروف انگلیسی یا فارسی یا عدد باشد ',
      value: "",
    },

    {
      title: "شناسه کاربر",
      slug: 'slug',
      type: "text",
      isRequired: true,
      regex: /^[A-Za-z0-9_]+$/,
      alert: 'مقدار شناسه کاربر باید شامل عدد، حروف و underline باشد.',
      value: "",
    },
  ],
  [

    {
      title: "سطح کاربر",
      slug: 'level',
      type: "select",
      isRequired: true,
      options: [
        {label: 'مبتدی', value: 'beginner'},
        {label: 'حرفه ای', value: 'professional'},
      ],
      value: "",
    },
    {
      title: "دسته بندی کاربر",
      slug: 'categoryId',
      type: "select",
      isRequired: true,
      options: [
        {label: 'بازو', value: '6489c0bae32a24bcc407357f'},
        {label: 'پا', value: '6489c0dfe32a24bcc4073587'},
        {label: 'کمربند شانه ای', value: '64ac3caca19a70a65c8f4487'},
        {label: 'عضلات زیربغل', value: '64ac3cd2a19a70a65c8f4491'},
        {label: 'عضلات سینه ای', value: '64ac3c65a19a70a65c8f447d'},
        {label: 'عضلات چهار سر رانی و همسترینگ', value: '64ac3cf7a19a70a65c8f449b'},
        {label: 'عضلات شکمی', value: '64ac3d35a19a70a65c8f44a5'},
        {label: 'پا', value: '6489c0dfe32a24bcc4073587'},
      ],
      value: "",
    },

  ],
  [

    {
      title: "توضیحات",
      slug: 'description',
      type: "textarea",
      value: "",
    },
    {
      title: "جنسیت",
      slug: "gender",
      type: "radiobox",
      options: [
        {label: 'خانم', value: 'woman'},
        {label: 'آقا', value: 'man'},
      ],
      value: "",
    },
  ],
  [
    {
      title: "ویدیو کاربر",
      slug: 'video',
      type: "video",
      value: "",
    },
  ],
  [
    {
      title: "عکس کاربر",
      slug: 'image',
      type: "image",
      value: "",
    },
  ]
]
export const actionsStructure = [
  {
    title: "عنوان",
    slug: 'title',
    useImage: true,
  },
]
