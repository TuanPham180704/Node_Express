# 🐳 TỔNG QUAN DOCKER TÌM HIỂU 

## 📘 Giới thiệu

**Docker** là nền tảng container hóa (containerization platform) giúp **đóng gói (package), phân phối (ship)** và **chạy (run)** ứng dụng một cách nhất quán trên mọi môi trường.  
Thay vì "chạy được trên máy tôi nhưng lỗi trên server", Docker đảm bảo ứng dụng **chạy giống nhau ở mọi nơi**.

---

## 🧱 I. KIẾN TRÚC VÀ THÀNH PHẦN CƠ BẢN

### ⚙️ Kiến trúc Docker

| Thành phần     | Mô tả                                      |
| -------------- | ------------------------------------------ |
| **Image**      | Mẫu (template) chứa app và môi trường chạy |
| **Container**  | Bản chạy (instance) của Image              |
| **Registry**   | Kho lưu trữ Image (như Docker Hub)         |
| **Dockerfile** | File mô tả cách build Image                |
| **Volume**     | Dữ liệu được lưu trữ bền vững              |
| **Network**    | Giao tiếp giữa các container               |

---

## 🐳 II. DOCKERFILE — XÂY DỰNG IMAGE RIÊNG

### 🧩 1. Dockerfile là gì?

> Là file mô tả **các bước để Docker build ra image** cho ứng dụng của bạn.

### 📄 2. Ví dụ cơ bản (Node.js)

```dockerfile
# Base image
FROM node:18

# Thư mục làm việc
WORKDIR /app

# Copy file package.json
COPY package*.json ./

# Cài dependencies
RUN npm install

# Copy toàn bộ mã nguồn
COPY . .

# Mở port
EXPOSE 3000

# Lệnh khởi chạy app
CMD ["npm", "start"]

docker build -t my-node-app .
docker run -p 3000:3000 my-node-app
```

