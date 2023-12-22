import { TbEdit } from "react-icons/tb";
import { RiDeleteBinLine } from "react-icons/ri";

export const tableStatics = {
  title: "مقاله ها",
  description: "",
  addNewItemButtonLink: '/post-add'
}
export const formStatics = {
  title: "ایجاد مقاله",
  editTitle: "ویرایش مقاله",
  description: "از اینجا میتوانید اقدام به ایجاد مقاله کنید",
  editDescription: "از اینجا میتوانید اقدام به ویرایش مقاله کنید",
  submitText: "ایجاد مقاله",
  editSubmitText: "ویرایش مقاله",
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
    options: [
      {label: 'مبتدی', value: 'beginner'},
      {label: 'حرفه ای', value: 'professional'},
    ],
    placeholder: "سطح مقاله را انتخاب کنید",
  },
  {
    title: "دسته بندی",
    slug: 'category',
    type: "select",

    chooseOptionsFromApi: true,
    path: '/api/category/exercise',
    key: 'categories',
    chooseOptionsLabelFrom: 'title',
    chooseOptionsValueFrom: '_id',
    options: [],
    placeholder: "دسته بندی مقاله را انتخاب کنید",
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
    title: "دسته بندی",
    slug: 'category',
  },
  {
    title: "نویسنده",
    slug: 'author'
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
        title: "ویرایش مقاله",
        slug: "edit-post",
        icon: <TbEdit size={18} color={"#526484"}/>,

        useRoute: true,
        route: "/post-edit/:_id"
      },
      {
        title: "حذف مقاله",
        slug: 'delete-post',
        icon: <RiDeleteBinLine size={18} color={"#526484"}/>,

        useYesOrNoModal: true,
        modalCancelText: 'بستن پنجره',
        modalType: "delete",
        modalPath: '/api/post/:_id',
        modalSubmitText: 'حذف مقاله',
        modalTitle: 'حذف مقاله',
        modalContent: 'ایا از حذف این مقاله اطمینان دارید؟ با حذف این مقاله داده ها دیگر در دسترس نخواهند بود',

      },
    ]
  },
]

export const formStructure = [
  [
    {
      title: "عنوان مقاله",
      slug: 'title',
      type: "text",
      placeholder: "عنوان مقاله را وارد کنید",
      isRequired: true,
    },
    {
      title: "شناسه مقاله",
      slug: 'slug',
      type: "text",
      placeholder: "شناسه مقاله را وارد کنید",
      isRequired: true,
    },
  ],
  [
    {
      title: "سطح مقاله",
      slug: 'level',
      type: "select",
      isJalali: true,
      placeholder: "سطح مقاله را انتخاب کنید",
      options: [
        {label: 'مبتدی', value: 'beginner'},
        {label: 'حرفه ای', value: 'professional'},
      ],
      isRequired: true,

    },
    {
      title: "دسته بندی مقاله",
      slug: 'categoryId',
      isRequired: true,
      type: "select",

      chooseOptionsFromApi: true,
      path: '/api/category/exercise',
      key: 'categories',
      chooseOptionsLabelFrom: 'title',
      chooseOptionsValueFrom: '_id',
      options: [],
      placeholder: "دسته بندی مقاله را انتخاب کنید",
    },
  ],
  [
    {
      title: "توضیحات",
      slug: 'description',
      type: "textarea",
      placeholder: "توضیحات مقاله را وارد کنید",
    }
  ],
  [
    {
      title: "عکس مقاله",
      slug: 'imagePreview',
      type: "image-preview",
      placeholder: "عکس مقاله را انتخاب کنید",
    },
    {
      isEmpty: true
    },
  ],
  [
    {
      title: "عکس مقاله",
      slug: 'imageHolder',
      type: "file-upload",
      placeholder: "عکس مقاله را انتخاب کنید",
    },
    {
      isEmpty: true
    },
  ]
]
