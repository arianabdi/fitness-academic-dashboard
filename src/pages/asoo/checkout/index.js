export const tableStatics = {
  title: "تراکنش ها",
  description: "",
}
export const formStatics = {
  title: "تسویه حساب",
  editTitle: "",
  description: "از این صفحه میتوانید اقدام به تسویه حساب با استاد کنید",
  editDescription: "",
  submitText: "تسویه حساب",
  editSubmitText: "",
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




export const formStructure = [
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
      placeholder: "استاد را انتخاب کنید",
      isRequired: true,
    },
  ],
  [
    {
      title: "شیوه پرداخت",
      slug: 'paymentMethod',
      type: "select",

      chooseOptionsFromApi: true,
      path: '/Settings/Setting?slug=transactionMethod',
      key: 'setting',
      chooseOptionsLabelFrom: 'description',
      chooseOptionsValueFrom: 'code',
      options: [],
      placeholder: "شیوه پرداخت را انتخاب کنید",
      isRequired: true,
    },
  ],
  [
    {
      title: "مبلغ (ریال)",
      slug: 'amount',
      type: "number",
      disabled: true,
      placeholder: "مبلغ تسویه حساب را وارد کنید",
      isRequired: true,
    },
  ],
  [
    {
      title: "پاداش (ریال)",
      slug: 'reward',
      type: "number",
      isJalali: true,
      placeholder: "مبلغ پاداش را وارد کنید",
    }
  ],
  [
    {
      title: "توضیحات",
      slug: 'description',
      type: "textarea",
      placeholder: "توضیحات این تسویه حساب را وارد کنید",
    }
  ]
]
export const actionsStructure = [
  {
    title: "عنوان",
    slug: 'title',
    useImage: true,
  },
]
