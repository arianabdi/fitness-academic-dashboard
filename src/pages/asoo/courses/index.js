import { TbEdit, TbPlus } from "react-icons/tb";
import { RiDeleteBinLine } from "react-icons/ri";

export const tableStatics = {
  title: "دوره ها",
  description: "",
  addNewItemButtonLink: '/course-add'
}
export const formStatics = {
  title: "ایجاد دوره",
  editTitle: "ویرایش دوره",
  description: "از اینجا میتوانید اقدام به ایجاد دوره جدید کنید",
  editDescription: "از اینجا میتوانید اقدام به ویرایش دوره کنید",
  submitText: "ایجاد دوره",
  editSubmitText: "ویرایش دوره",
}


export const filterStructure = [
  {
    title: "نام دوره",
    slug: 'title',
    type: "text",
    value: "",
    selected: false
  }
]

export const tableStructure = [
  {
    title: "نام دوره",
    slug: 'title',
    useFarsiNumber: true
  },
  {
    title: "تاریخ شروع دوره",
    slug: 'startDate',
    useJalaliFormat: true,
    useFarsiNumber: true
  },
  {
    title: "هزینه دوره",
    slug: 'studentPrice',
    useFarsiNumber: true
  },
  {
    title: "مجموع ساعات",
    slug: 'totalHours',
    useFarsiNumber: true
  },
  {
    useActionsButton: true, //use delete-item class to automatic implement the removing item.
    slug: '',
    actions: [
      {
        title: "ایجاد کلاس از دوره",
        slug: 'class-add',
        icon: <TbPlus  size={18} color={"#526484"}/>,
        useRoute: true,
        route: "/course-class-add",
        roles: ["Admin"]
      },
      {
        title: "افزودن دانشجو به دوره",
        slug: 'add-student',
        icon: <TbPlus  size={18} color={"#526484"}/>,
        useRoute: true,
        route: "/course-students/:id",
        roles: ["Admin"]
      },
      {
        title: "ویرایش دوره",
        slug: "edit",
        icon: <TbEdit size={18} color={"#526484"}/>,
        useRoute: true,
        route: "/course-edit/:id",
        roles: ["Admin"]
      },
      {
        title: "حذف دوره",
        slug: 'delete',
        icon: <RiDeleteBinLine size={18} color={"#526484"}/>,
        roles: ["Admin"]
      },
    ]
  },
]



export const formStructure = [
  [

    {
      title: "عنوان دوره",
      slug: 'title',
      type: "text",
      placeholder: "نام دانشجو را وارد کنید",
      isRequired: true,
    },
    {
      title: "تاریخ شروع کلاس",
      slug: 'startDate',
      type: "date",
      isJalali: true,
      placeholder: "تاریخ شروع کلاس را وارد کنید",
      isRequired: true,
    },
  ],
  [
    {
      title: "هزینه شرکت در کلاس (به ازای هر ساعت)",
      slug: 'teacherPrice',
      type: "number",
      placeholder: "هزینه شرکت در کلاس را وارد کنید",
      isRequired: true,
    },
    {
      title: "هزینه تدریس ",
      slug: 'studentPrice',
      type: "number",
      placeholder: "هزینه تدریس را وارد کنید",
      isRequired: true,
    },
  ],
  [
    {
      title: "جمع کل ساعات کلاس",
      slug: 'totalHours',
      type: "number",
      placeholder: "جمع کل ساعات کلاس را وارد کنید",
      isRequired: true,
    },
    {
      isEmpty: true
    },
  ]
]

