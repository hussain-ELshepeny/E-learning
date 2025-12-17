import axios from "axios"

const api = axios.create({
  baseURL: "https://edu-master-psi.vercel.app",
  headers: {
    "Content-Type": "application/json",
    // هنا لا نضع التوكن بشكل ثابت، بل نتركه للـ Interceptor
  },
})

// =========================================================
// 🚀 إضافة Request Interceptor لإرسال التوكن في مفتاح "token"
// =========================================================

api.interceptors.request.use(
  (config) => {
    // 1. جلب التوكن من التخزين المحلي
    const token = localStorage.getItem("token")

    // 2. التحقق من وجود التوكن
    if (token) {
      // 3. إضافة التوكن إلى الهيدر باستخدام المفتاح المخصص 'token'
      // هذا يحاكي ما كنت تفعله يدوياً في كل طلب
      config.headers.token = token
    }

    // 4. إرجاع إعدادات الطلب المعدلة
    return config
  },
  (error) => {
    // معالجة أي أخطاء تحدث أثناء إعداد الطلب
    return Promise.reject(error)
  }
)

export default api
