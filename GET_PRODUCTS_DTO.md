# DTO روت `GET /products`

این سند مربوط به روت زیر است:

- `router.get('/products', productController.getAllProducts);`

این API محصول‌ها را برمی‌گرداند و از **Query String** برای فیلتر کردن استفاده می‌کند (Body ندارد).

---

### 1) DTO درخواست (Request)

#### 1.1) `GetProductsQueryDto`

پارامترهای Query که می‌توانید به صورت زیر ارسال کنید:

```text
GET /products?name=...&from_date=...&to_date=...
```

| فیلد | نوع | اجباری؟ | کارکرد | مقادیر/نکات |
|---|---|---:|---|---|
| `name` | `string` | خیر | جستجو داخل نام محصول | به صورت **Regex** و **غیر حساس به حروف بزرگ/کوچک** (`$options: "i"`) اعمال می‌شود. نمونه: `name=سیب` |
| `from_date` | `string (date)` | خیر | فیلتر تاریخ شروع روی `createdAt` محصول | به `new Date(from_date)` تبدیل می‌شود؛ بهتر است **ISO-8601** بفرستید مثل `2025-01-01T00:00:00.000Z` |
| `to_date` | `string (date)` | خیر | فیلتر تاریخ پایان روی `createdAt` محصول | به `new Date(to_date)` تبدیل می‌شود؛ بهتر است **ISO-8601** بفرستید مثل `2025-12-31T23:59:59.999Z` |

نکته‌ها:

- این API **صفحه‌بندی (pagination)**، `limit`، `skip`، `sort` و… ندارد (حداقل در کد فعلی).
- `from_date` و `to_date` روی فیلد `createdAt` محصول اعمال می‌شوند (نه روی تاریخ قیمت‌ها).

---

### 2) DTO پاسخ (Response)

#### 2.1) `200 OK`

بدنه پاسخ در حالت موفق، یک **آرایه** از آیتم‌هاست:

#### 2.2) `GetProductsResponseItemDto`

هر آیتم عملاً «سند محصول» است به‌علاوه‌ی دو فیلد join شده:

- `category`: اطلاعات دسته‌بندی (از کالکشن `categories`)
- `prices`: لیست قیمت‌ها (از کالکشن `prices`) مرتب‌شده با `createdAt` نزولی (جدیدترین اول)

| فیلد | نوع | کارکرد | مقادیر/نکات |
|---|---|---|---|
| `_id` | `string (ObjectId)` | شناسه محصول | نمونه: `"6772f1..."`
| `name` | `string` | نام محصول | (طبق مدل) اجباری است |
| `slug` | `string` | اسلاگ محصول | (طبق مدل) اجباری و یکتا است |
| `category_id` | `string (ObjectId)` | شناسه دسته محصول | در DB به `Category` اشاره می‌کند |
| `createdAt` | `string (ISO date)` | زمان ایجاد محصول | از `timestamps` مانگوس می‌آید |
| `updatedAt` | `string (ISO date)` | زمان آخرین تغییر محصول | از `timestamps` مانگوس می‌آید |
| `category` | `CategoryDto \| null` | اطلاعات دسته join شده | در کد `preserveNullAndEmptyArrays: true` است؛ پس اگر دسته موجود نباشد می‌تواند `null` شود |
| `prices` | `PriceDto[]` | قیمت‌های محصول | داخل pipeline با `createdAt: -1` مرتب می‌شود (جدیدترین اول) |

#### 2.3) `CategoryDto`

| فیلد | نوع | کارکرد | مقادیر/نکات |
|---|---|---|---|
| `_id` | `string (ObjectId)` | شناسه دسته |  |
| `name` | `string` | نام دسته | (طبق مدل) اجباری و یکتا |
| `slug` | `string` | اسلاگ دسته | (طبق مدل) اجباری و یکتا |
| `description` | `string \| undefined` | توضیحات دسته | اختیاری |
| `parent_id` | `string (ObjectId) \| null` | شناسه دسته والد | پیش‌فرض `null` |
| `source` | `string \| undefined` | منبع/آدرس دسته برای اسکرپ | اختیاری |
| `createdAt` | `string (ISO date)` | زمان ایجاد دسته | از `timestamps` |
| `updatedAt` | `string (ISO date)` | زمان آخرین تغییر دسته | از `timestamps` |

#### 2.4) `PriceDto`

| فیلد | نوع | کارکرد | مقادیر/نکات |
|---|---|---|---|
| `_id` | `string (ObjectId)` | شناسه رکورد قیمت |  |
| `product_id` | `string (ObjectId)` | ارجاع به محصول | ایندکس شده و اجباری |
| `wholesale_price` | `number` | قیمت عمده | اجباری |
| `retail_price` | `number` | قیمت خرده | اجباری |
| `createdAt` | `string (ISO date)` | زمان ثبت قیمت | از `timestamps` |
| `updatedAt` | `string (ISO date)` | زمان آخرین تغییر قیمت | از `timestamps` |

---

### 3) نمونه درخواست‌ها

#### 3.1) بدون فیلتر

```text
GET /products
```

#### 3.2) جستجو بر اساس نام

```text
GET /products?name=سیب
```

#### 3.3) فیلتر بازه تاریخ ایجاد محصول

```text
GET /products?from_date=2025-01-01T00:00:00.000Z&to_date=2025-12-31T23:59:59.999Z
```

---

### 4) پاسخ‌های خطا

| وضعیت | بدنه | توضیح |
|---:|---|---|
| `500` | `{ "message": "..." }` | هر خطای غیرمنتظره (مثلاً خطا در دیتابیس/aggregation) |


