export const tableStatics = {
  title: "تراکنش ها",
  description: "",
}
export const formStatics = {
  title: "ایجاد تراکنش",
  editTitle: "ویرایش تراکنش",
  description: "از اینجا میتوانید اقدام به ایجاد تراکنش جدید کنید",
  editDescription: "از اینجا میتوانید اقدام به ویرایش تراکنش کنید",
  submitText: "ایجاد تراکنش",
  editSubmitText: "ویرایش تراکنش",
}


export const filterStructure = [
  {
    title: "نام تراکنش",
    slug: 'name',
    type: "text",
    value: "",
    selected: false
  },
  {
    title: "تاریخ ایجاد",
    slug: 'registerNumber',
    type: "text",
    value: "",
    selected: false
  },
  {
    title: "مجموع ساعات",
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
    title: "شناسه تراکنش",
    slug: 'id',
    useFarsiNumber: true
  },
  {
    title: "مبلغ",
    slug: 'amount',
    useFarsiNumber: true
  },
  {
    title: "تاریخ تراکنش",
    slug: 'date',
    useJalaliFormat: true,
    useFarsiNumber: true
  },
  {
    title: "وضعیت تراکنش",
    slug: 'status',
    ifItsTrue: 'انجام شده',
    ifItsFalse: 'نا موفق',
  },
  {
    title: "نوع تراکنش",
    slug: 'typeTitle',
  },
  {
    title: "دسته بندی تراکنش",
    slug: 'categoryTitle',
  },
  {
    useActionsButton: true, //use delete-item class to automatic implement the removing item.
    slug: '',
    actions: [
      {
        title: "",
        slug: '',
        icon: "",
      },
    ]
  },
]



export const formStructure = [
  [

    {
      title: "عنوان تراکنش",
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
      slug: 'defaultStudentPrice',
      type: "number",
      placeholder: "هزینه شرکت در کلاس را وارد کنید",
      isRequired: true,
    },
    {
      title: "هزینه تدریس (به ازای ار ساعت)",
      slug: 'defaultTeacherPrice',
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
export const actionsStructure = [
  {
    title: "عنوان",
    slug: 'title',
    useImage: true,
  },
]
