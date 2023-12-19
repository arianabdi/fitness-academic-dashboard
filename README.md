


# نصب پروژه
```agsl
bash <(curl -Ls https://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@raw.githubusercontent.com/arianabdi/asoo-dashboard/main/scripts/installation.sh --ipv4)
```


# روش استفاده از کامپوننت Form اختصاصی
برای استفاده از این کامپوننت نیاز به یک آرایه به شکل زیر داریم. دقت کنید شما میتونید در هر سطر تا ۴ فیلد را جا بدین. اینجوری برای موبایل هم فرم بهم نمیریزه 
```
[
    [
        {
            title: "فیلد ۱",
            ...
        },
        {
            title: "فیلد ۲",
            ...
        },
    ],
    [
        {
            title: "فیلد ۳",
            ...
        },
    ]
]
```







# تغییر تم 
برای تغییر تم، متغییر های درون فایل زیر را تغییر دهید

```agsl
E:\Desktop\Projects\arian\fouladyar\fouladyar-dashboard\src\layout\provider\Theme.js
```




# روش Build گرفتن از پروژه 
```agsl
npm run build
```

سپس دستور زیر را وارد کنید
```agsl
serve build
```
