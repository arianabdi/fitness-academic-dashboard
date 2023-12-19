export const tableStatics = {
  title: "تراکنش ها",
  description: "",
}
export const formStatics = {
  title: "شارژ کیف پول",
  editTitle: "",
  description: "از این صفحه میتوانید اقدام به شارژ کیف پول حساب دانشجو کنید",
  editDescription: "",
  submitText: "شارژ کیف پول",
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
      title: "دانشجو",
      slug: 'student',
      type: "select",

      chooseOptionsFromApi: true,
      path: '/Persons/Search/Student',
      key: 'results',
      chooseOptionsLabelFrom: 'fullname',
      chooseOptionsValueFrom: 'userId',
      options: [],
      placeholder: "دانشجو را انتخاب کنید",
      isRequired: true,
    }
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
      placeholder: "مبلغ شارژ را وارد کنید",
      isRequired: true,
    },
  ],
  [
    {
      title: "تخفیف (ریال)",
      slug: 'discount',
      type: "number",
      isJalali: true,
      placeholder: "مبلغ تخفیف را وارد کنید",
    }
  ],
  [
    {
      title: "توضیحات",
      slug: 'description',
      type: "textarea",
      placeholder: "توضیحات  را وارد کنید",
    }
  ]
]

