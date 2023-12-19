export const tableHeading = {
  title: "مدیریت کاربران",
  description: "شما از این بخش میتوانید تمامی تمرین های مورد نظر خود را ثبت کرده و در بخش ایجاد برنامه به آن ها دسترسی داشته باشید.",
  addNewItemButtonLink: 'user-add-2'
}
export const itemAddHeader = {
  title: "ایجاد کاربر",
  description: "شما از این بخش میتوانید تمامی تمرین های مورد نظر خود را ثبت کرده و در بخش ایجاد برنامه به آن ها دسترسی داشته باشید.",

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
    title: "عنوان",
    slug: 'title',
    useImage: true,
  },
  // {
  //   title: "شناسه",
  //   slug: '_id',
  // },
  {
    title: "سطح",
    slug: 'level',
    useTranslate: true
  },
  {
    title: "دسته بندی",
    slug: 'category',
    useTranslate: true,
  },
  {
    title: "تاریخ ایجاد",
    slug: 'createdAt',
    useJalaliFormat: true,
    useFarsiNumber: true
  },
  {
    useActionsButton: true, //use delete-item class to automatic implement the removing item.
    actions: [
      {
        title: "ویرایش تمرین",
        slug: 'edit',
        icon: "edit",
      },
      {
        title: "حذف تمرین",
        slug: 'delete',
        icon: "trash",
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
      placeholder: "لطفا عنوان تمرین را وارد کنید",
      regex: /^[A-Za-z\u0600-\u06FF\s]+$/,
      isRequired: true,
      alert: 'مقدار عنوان تمرین باید شامل حروف انگلیسی یا فارسی یا عدد باشد ',
      value: "",
    },

    {
      title: "شناسه تمرین",
      slug: 'slug',
      type: "text",
      isRequired: true,
      regex: /^[A-Za-z0-9_]+$/,
      alert: 'مقدار شناسه تمرین باید شامل عدد، حروف و underline باشد.',
      value: "",
    },
  ],
  [

    {
      title: "سطح تمرین",
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
      title: "دسته بندی تمرین",
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
      title: "ویدیو تمرین",
      slug: 'video',
      type: "video",
      value: "",
    },
  ],
  [
    {
      title: "عکس تمرین",
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
