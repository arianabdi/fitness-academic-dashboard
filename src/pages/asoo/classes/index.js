import { TbEdit } from "react-icons/tb";
import { RiDeleteBinLine } from "react-icons/ri";

export const tableStatics = {
  title: "کلاس ها",
  description: "",
  addNewItemButtonLink: '/course-class-add'
}
export const formStatics = {
  title: "ایجاد کلاس",
  editTitle: "ویرایش کلاس",
  description: "از اینجا میتوانید اقدام به ایجاد کلاس کنید",
  editDescription: "از اینجا میتوانید اقدام به ویرایش کلاس کنید",
  submitText: "ایجاد کلاس",
  editSubmitText: "ویرایش کلاس",
}


export const filterStructure = [
  {
    title: "عنوان کلاس",
    slug: 'title',
    type: "text",
    placeholder: "نام دانشجو را وارد کنید",
  },
  {
    title: "عنوان دوره",
    slug: 'course',
    type: "select",

    chooseOptionsFromApi: true,
    path: '/Courses/Course?page=1&limit=100&sort=createdAt&sortType=ASC',
    key: 'courses',
    chooseOptionsLabelFrom: 'title',
    chooseOptionsValueFrom: 'id',
    options: [],

    placeholder: "عنوان دوره را انتخاب کنید",
    isRequired: true,
  },
  {
    title: "استاد",
    slug: 'teacher',
    type: "select",

    chooseOptionsFromApi: true,
    path: '/Persons/Search/Teacher',
    key: 'results',
    chooseOptionsLabelFrom: 'fullname',
    chooseOptionsValueFrom: 'userId',
    options: [],

    placeholder: "استاد این کلاس را انتخاب کنید",
    isRequired: true,
  },
]

export const tableStructure = [
  {
    title: "شناسه کلاس",
    slug: 'id',
    useFarsiNumber: true
  },
  {
    title: "عنوان کلاس",
    slug: 'title',
  },
  {
    title: "عنوان دوره",
    slug: 'course.title',
    useFarsiNumber: true
  },
  {
    title: "مدرس",
    slug: 'teacherFullname',
    useFarsiNumber: true
  },
  {
    title: "تاریخ شروع",
    slug: 'date',
    useJalaliFormat: true,
    useFarsiNumber: true
  },
  {
    title: "ساعت کلاس",
    slug: 'time',
    useFarsiNumber: true
  },
  {
    title: "هزینه تدریس",
    slug: 'teacherPrice',
    useFarsiNumber: true
  },
  {
    useActionsButton: true, //use delete-item class to automatic implement the removing item.
    slug: '',
    actions: [
      {
        title: "ویرایش کلاس",
        slug: "edit",
        icon: <TbEdit size={18} color={"#526484"}/>,


        useRoute: true,
        route: "/course-class-edit/:id",
        roles: ["Admin"],
      },
      {
        title: "حضور و غیاب",
        slug: "edit",
        icon: <TbEdit size={18} color={"#526484"}/>,


        useRoute: true,
        route: "/course-class-presence/:course.id/:id",
        roles: ["Admin", "Teacher"],




      },
      {
        title: "حذف کلاس",
        slug: 'delete',
        icon: <RiDeleteBinLine size={18} color={"#526484"}/>,
        roles: ["Admin"],
      },
    ]
  },
]

export const formStructure = [
  [
    {
      title: "عنوان کلاس",
      slug: 'title',
      type: "text",
      placeholder: "نام دانشجو را وارد کنید",
      isRequired: true,
    },
    {
      title: "تاریخ شروع کلاس",
      slug: 'date',
      type: "date",
      isJalali: true,
      placeholder: "تاریخ شروع کلاس را وارد کنید",
      isRequired: true,
    },
  ],
  [
    {
      title: "استاد",
      slug: 'teacher',
      type: "select",

      chooseOptionsFromApi: true,
      path: '/Persons/Search/Teacher',
      key: 'results',
      chooseOptionsLabelFrom: 'fullname',
      chooseOptionsValueFrom: 'userId',
      options: [],

      placeholder: "استاد این کلاس را انتخاب کنید",
      isRequired: true,
    },
    {
      title: "هزینه تدریس (به ازای ار ساعت)",
      slug: 'teacherPrice',
      type: "number",
      placeholder: "هزینه تدریس را وارد کنید",
      isRequired: true,
    },
  ],
  [
    {
      title: "عنوان دوره",
      slug: 'course',
      type: "select",

      chooseOptionsFromApi: true,
      path: '/Courses/Course?page=1&limit=100&sort=createdAt&sortType=ASC',
      key: 'courses',
      chooseOptionsLabelFrom: 'title',
      chooseOptionsValueFrom: 'id',
      options: [],

      placeholder: "عنوان دوره را انتخاب کنید",
      isRequired: true,
    },
    {
      title: "ساعت کلاس",
      slug: 'time',
      type: "text",
      placeholder: "ساعت کلاس را وارد کنید",
      isRequired: true,
    },
  ]
]

