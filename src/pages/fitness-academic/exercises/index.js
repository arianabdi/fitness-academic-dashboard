import { TbEdit } from "react-icons/tb";
import { RiDeleteBinLine } from "react-icons/ri";

export const tableStatics = {
  title: "تمرینها",
  description: "",
  addNewItemButtonLink: '/exercise-add'
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
    path: '/api/category/exercise',
    key: 'categories',
    chooseOptionsLabelFrom: 'title',
    chooseOptionsValueFrom: '_id',
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
        route: "/exercise-edit/:_id"
      },
      {
        title: "حذف تمرین",
        slug: 'delete-exercise',
        icon: <RiDeleteBinLine size={18} color={"#526484"}/>,

        useYesOrNoModal: true,
        modalCancelText: 'بستن پنجره',
        modalType: "delete",
        modalPath: '/api/exercise/:_id',
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
      title: "عنوان تمرین",
      slug: 'title',
      type: "text",
      placeholder: "عنوان تمرین را وارد کنید",
      isRequired: true,
    },
    {
      title: "شناسه تمرین",
      slug: 'slug',
      type: "text",
      placeholder: "شناسه تمرین را وارد کنید",
      isRequired: true,
    },
  ],
  [
    {
      title: "سطح تمرین",
      slug: 'level',
      type: "select",
      isJalali: true,
      placeholder: "سطح تمرین را انتخاب کنید",
      options: [
        {label: 'مبتدی', value: 'beginner'},
        {label: 'حرفه ای', value: 'professional'},
      ],
      isRequired: true,

    },
    {
      title: "دسته بندی تمرین",
      slug: 'categoryId',
      isRequired: true,
      type: "select",

      chooseOptionsFromApi: true,
      path: '/api/category/exercise',
      key: 'categories',
      chooseOptionsLabelFrom: 'title',
      chooseOptionsValueFrom: '_id',
      options: [],
      placeholder: "دسته بندی تمرین را انتخاب کنید",
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
      title: "عکس تمرین",
      slug: 'imagePreview',
      type: "image-preview",
      placeholder: "عکس تمرین را انتخاب کنید",
    },
    {
      isEmpty: true
    },
  ],
  [
    {
      title: "عکس تمرین",
      slug: 'imageHolder',
      type: "file-upload",
      placeholder: "عکس تمرین را انتخاب کنید",
    },
    {
      isEmpty: true
    },
  ]
]
