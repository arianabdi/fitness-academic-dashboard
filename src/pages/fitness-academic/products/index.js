import { TbEdit } from "react-icons/tb";
import { RiDeleteBinLine } from "react-icons/ri";

export const tableStatics = {
  title: "محصول ها",
  description: "",
  addNewItemButtonLink: '/products-add'
}

export const tableStaticsOfCategories = {
  title: "دسته بندی محصول ها",
  description: "",
  addNewItemButtonLink: '/products-category-add'
}
export const formStatics = {
  title: "ایجاد محصول",
  editTitle: "ویرایش محصول",
  description: "از اینجا میتوانید اقدام به ایجاد محصول کنید",
  editDescription: "از اینجا میتوانید اقدام به ویرایش محصول کنید",
  submitText: "ایجاد محصول",
  editSubmitText: "ویرایش محصول",
}
export const formStaticsOfCategories = {
  title: "ایجاد دسته بندی محصول",
  editTitle: "ویرایش دسته بندی محصول",
  description: "از اینجا میتوانید اقدام به ایجاد دسته بندی محصول کنید",
  editDescription: "از اینجا میتوانید اقدام به ویرایش دسته بندی محصول کنید",
  submitText: "ایجاد دسته بندی محصول",
  editSubmitText: "ویرایش دسته بندی محصول",
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
    placeholder: "سطح محصول را انتخاب کنید",
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
    placeholder: "دسته بندی محصول را انتخاب کنید",
  },
]

export const tableStructure = [
  {
    title: "شناسه",
    slug: '_id',
  },
  {
    title: "نام محصول",
    slug: 'name',
  },
  {
    title: "شناسه محصول",
    slug: 'slug',
  },
  {
    title: "قیمت محصول",
    slug: 'price',
    useFarsiNumber: true
  },
  {
    title: "دسته بندی محصول",
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
        title: "ویرایش محصول",
        slug: "edit-product",
        icon: <TbEdit size={18} color={"#526484"}/>,

        useRoute: true,
        route: "/products-edit/:_id"
      },
      {
        title: "حذف محصول",
        slug: 'delete-product',
        icon: <RiDeleteBinLine size={18} color={"#526484"}/>,

        useYesOrNoModal: true,
        modalCancelText: 'بستن پنجره',
        modalType: "delete",
        modalPath: '/api/product/:_id',
        modalSubmitText: 'حذف محصول',
        modalTitle: 'حذف محصول',
        modalContent: 'ایا از حذف این محصول اطمینان دارید؟ با حذف این محصول داده ها دیگر در دسترس نخواهند بود',

      },
    ]
  },
]
export const formStructure = [
  [
    {
      title: "نام محصول",
      slug: 'name',
      type: "text",
      placeholder: "عنوان محصول را وارد کنید",
      isRequired: true,
    },
    {
      title: "شناسه محصول",
      slug: 'slug',
      type: "text",
      placeholder: "شناسه محصول را وارد کنید",
      isRequired: true,
    },
  ],
  [
    {
      title: "دسته بندی محصول",
      slug: 'categoryId',
      type: "select",

      chooseOptionsFromApi: true,
      path: '/api/category/product?page=1&limit=100&sort=createdAt&sortType=ASC',
      key: 'categories',
      chooseOptionsLabelFrom: 'title',
      chooseOptionsValueFrom: '_id',
      options: [],

      placeholder: "دسته بندی محصول را انتخاب کنید",
      isRequired: true,

    },
    {
      title: "قیمت محصول",
      slug: 'price',
      type: "text",
      placeholder: "قیمت محصول را وارد کنید",
      isRequired: true,
    },
  ],
  [
    {
      title: "توضیحات",
      slug: 'description',
      type: "textarea",
      placeholder: "توضیحات محصول را وارد کنید",
    }
  ],
]

export const filterStructureOfCategories = [
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
    placeholder: "سطح محصول را انتخاب کنید",
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
    placeholder: "دسته بندی محصول را انتخاب کنید",
  },
]

export const tableStructureOfCategories = [
  {
    title: "شناسه",
    slug: '_id',
  },
  {
    title: "عنوان",
    slug: 'title',
  },
  {
    title: "شناسه دسته",
    slug: 'slug',
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
        title: "ویرایش دسته بندی",
        slug: "edit-exercise-category",
        icon: <TbEdit size={18} color={"#526484"}/>,

        useRoute: true,
        route: "/products-category-edit/:_id"
      },
      {
        title: "حذف دسته بندی",
        slug: 'delete-exercise-category',
        icon: <RiDeleteBinLine size={18} color={"#526484"}/>,

        useYesOrNoModal: true,
        modalCancelText: 'بستن پنجره',
        modalType: "delete",
        modalPath: '/api/category/product/:_id',
        modalSubmitText: 'حذف دسته بندی',
        modalTitle: 'حذف دسته بندی',
        modalContent: 'ایا از حذف این دسته بندی اطمینان دارید؟ با حذف این دسته بندی داده ها دیگر در دسترس نخواهند بود',

      },
    ]
  },
]
export const formStructureOfCategories = [
  [
    {
      title: "عنوان دسته بندی محصول",
      slug: 'title',
      type: "text",
      placeholder: "عنوان دسته بندی محصول را وارد کنید",
      isRequired: true,
    },
    {
      title: "شناسه محصول",
      slug: 'slug',
      type: "text",
      placeholder: "شناسه دسته بندی محصول را وارد کنید",
      isRequired: true,
    },
  ],
  [
    {
      title: "توضیحات",
      slug: 'description',
      type: "textarea",
      placeholder: "توضیحات دسته بندی محصول را وارد کنید",
    }
  ],
]
