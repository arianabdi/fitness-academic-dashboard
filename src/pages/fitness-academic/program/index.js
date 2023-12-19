import { TbEdit } from "react-icons/tb";
import { RiDeleteBinLine } from "react-icons/ri";

export const tableStatics = {
  title: "برنامه ها",
  description: "",
  addNewItemButtonLink: '/exercise-add'
}
export const formStatics = {
  title: "ایجاد برنامه",
  editTitle: "ویرایش برنامه",
  description: "از اینجا میتوانید اقدام به ایجاد برنامه کنید",
  editDescription: "از اینجا میتوانید اقدام به ویرایش برنامه کنید",
  submitText: "ایجاد برنامه",
  editSubmitText: "ویرایش برنامه",
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
    placeholder: "سطح برنامه را انتخاب کنید",
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
    placeholder: "دسته بندی برنامه را انتخاب کنید",
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
        title: "ویرایش برنامه",
        slug: "edit-exercise",
        icon: <TbEdit size={18} color={"#526484"}/>,

        useRoute: true,
        route: "/exercise-edit/:_id"
      },
      {
        title: "حذف برنامه",
        slug: 'delete-exercise',
        icon: <RiDeleteBinLine size={18} color={"#526484"}/>,

        useYesOrNoModal: true,
        modalCancelText: 'بستن پنجره',
        modalType: "delete",
        modalPath: '/api/exercise/:_id',
        modalSubmitText: 'حذف برنامه',
        modalTitle: 'حذف برنامه',
        modalContent: 'ایا از حذف این برنامه اطمینان دارید؟ با حذف این برنامه داده ها دیگر در دسترس نخواهند بود',

      },
    ]
  },
]

export const formStructure = [
  [
    {
      title: "عنوان برنامه",
      slug: 'title',
      type: "text",
      placeholder: "عنوان برنامه را وارد کنید",
      isRequired: true,
    },
    {
      title: "شناسه برنامه",
      slug: 'slug',
      type: "text",
      placeholder: "شناسه برنامه را وارد کنید",
      isRequired: true,
    },
  ],
  [
    {
      title: "سطح برنامه",
      slug: 'level',
      type: "select",
      isJalali: true,
      placeholder: "سطح برنامه را انتخاب کنید",
      options: [
        {label: 'مبتدی', value: 'beginner'},
        {label: 'حرفه ای', value: 'professional'},
      ],
      isRequired: true,

    },
    {
      title: "دسته بندی برنامه",
      slug: 'categoryId',
      isRequired: true,
      type: "select",

      chooseOptionsFromApi: true,
      path: '/api/category/exercise',
      key: 'categories',
      chooseOptionsLabelFrom: 'title',
      chooseOptionsValueFrom: '_id',
      options: [],
      placeholder: "دسته بندی برنامه را انتخاب کنید",
    },
  ],
  [
    {
      title: "توضیحات",
      slug: 'description',
      type: "textarea",
      placeholder: "توضیحات برنامه را وارد کنید",
    }
  ],
  [
    {
      title: "عکس برنامه",
      slug: 'imagePreview',
      type: "image-preview",
      placeholder: "عکس برنامه را انتخاب کنید",
    },
    {
      isEmpty: true
    },
  ],
  [
    {
      title: "عکس برنامه",
      slug: 'imageHolder',
      type: "file-upload",
      placeholder: "عکس برنامه را انتخاب کنید",
    },
    {
      isEmpty: true
    },
  ]
]
