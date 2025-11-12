# Twitter Clone Frontend

Bu proje, **React + Vite + TailwindCSS** kullanılarak geliştirilmiş bir Twitter arayüzüdür.  
Kullanıcılar tweet atabilir, beğenebilir, retweet ve yorum yapabilir.

---

## 🚀 Özellikler

- 🔐 **JWT ile Login / Register sistemi**
- 🏠 Anasayfa (tüm tweetler)
- 👤 “My Tweets” sayfası (kullanıcıya ait gönderiler)
- ❤️ Beğeni / Beğeniyi kaldırma
- 🔁 Retweet / Retweet kaldırma
- 💬 Yorum ekleme / silme
- 🗑️ Tweet silme
- 📱 Responsive tasarım (mobil + masaüstü)
- 🌙 Dark mode arayüz
- ⚡ Vite ile hızlı geliştirme

---

## 🧰 Kullanılan Teknolojiler

- **React 18**
- **Vite**
- **TailwindCSS**
- **Axios**
- **Lucide-React**
- **React Router DOM v6**
- **Context API (AuthContext)**
- **LocalStorage (JWT token saklama)**

---

## 📂 Klasör Yapısı

```
src/
 ├── api/
 │   └── axiosClient.js
 ├── components/
 │   ├── SidebarLeft.jsx
 │   ├── SidebarRight.jsx
 │   ├── TweetCard.jsx
 │   ├── NewTweet.jsx
 │   ├── ProtectedRoute.jsx
 │   └── MobileTabBar.jsx
 ├── context/
 │   └── AuthContext.jsx
 ├── pages/
 │   ├── Home.jsx
 │   ├── Login.jsx
 │   ├── Register.jsx
 │   └── MyTweets.jsx
 ├── App.jsx
 ├── main.jsx
 └── index.css
```

---

## ⚙️ Kurulum ve Çalıştırma

1. **Projeyi klonla**
   ```bash
   git clone https://github.com/kullaniciadi/twitter-clone-frontend.git
   cd twitter-clone-frontend
   ```

2. **Bağımlılıkları yükle**
   ```bash
   npm install
   ```

3. **Backend bağlantısını ayarla**
   `src/api/axiosClient.js` dosyasında:
   ```js
   baseURL: "http://localhost:8080/api"
   ```

4. **Uygulamayı başlat**
   ```bash
   npm run dev
   ```

5. **Varsayılan adres:**
   ```
   http://localhost:5173
   ```

---

## 🧭 Özelliklerin Özeti

| Özellik | Açıklama |
|----------|----------|
| 🏠 Home | Tüm tweetlerin listelendiği sayfa |
| ✍️ NewTweet | Yeni tweet oluşturma alanı |
| ❤️ Like | Tweet beğenme veya kaldırma |
| 🔁 Retweet | Retweet yapma veya kaldırma |
| 💬 Comment | Tweetlere yorum ekleme/silme |
| 👤 My Tweets | Kullanıcıya ait tweetlerin listesi |
| 🔐 Auth | Giriş / Kayıt (JWT) |
| 📱 Responsive | Mobil alt menü ve Sidebar desteği |

---

## ✅ Durum

> ✅ Frontend tamamen kararlı hale getirildi.  
> Backend ile entegre çalışıyor.  
> Tüm tweet, yorum, beğeni ve retweet akışları test edildi.

---

## 🧾 Lisans

Bu proje eğitim amaçlı hazırlanmıştır.
