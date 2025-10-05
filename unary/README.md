# 🛰️ Unary RPC trong gRPC (Node.js)

---

## 🌐 Tổng quan

**Unary RPC** là kiểu giao tiếp cơ bản nhất trong **gRPC**.  
Trong mô hình này, **client gửi một request duy nhất** đến **server**,  
và **server phản hồi lại một response duy nhất**.

Cơ chế này tương tự như khi ta gọi một hàm bình thường trong lập trình.

---

## 🔁 Mô hình hoạt động

Client ---> Server
| |
|----Request--->|
|<---Response---|

---

## ⚙️ Đặc điểm của Unary RPC

- 🔹 Gửi **1 request** và nhận **1 response**.
- 🔹 Dữ liệu được truyền bằng **Protocol Buffers (.proto)**.
- 🔹 Sử dụng giao thức **HTTP/2** để tối ưu tốc độ và bảo mật.
- 🔹 Hỗ trợ **metadata**, **interceptor**, và **deadline**.
- 🔹 Dễ debug và triển khai, phù hợp cho các API đơn giản.

---

## 📘 Vai trò của `.proto` file

File `.proto` là trung tâm trong gRPC.  
Nó định nghĩa rõ:

- Cấu trúc dữ liệu (`message`) gửi và nhận.
- Các phương thức (`rpc`) mà server cung cấp cho client gọi.

Ví dụ:

- `HelloRequest` → Dữ liệu client gửi lên.
- `HelloResponse` → Dữ liệu server trả về.
- `SayHello` → Hàm RPC thực hiện xử lý.

---

## 🧩 Quy trình giao tiếp trong Unary RPC

1️⃣ **Client** tạo kết nối đến **Server** qua địa chỉ (host:port).  
2️⃣ Client gọi phương thức RPC được định nghĩa trong file `.proto`.  
3️⃣ Client gửi một **request message** lên Server.  
4️⃣ Server nhận request, xử lý logic bên trong.  
5️⃣ Server gửi **response message** trả về Client.  
6️⃣ Kết nối kết thúc sau khi phản hồi xong.

---

## 🧠 Ưu điểm của Unary RPC

- ⚡ Giao tiếp nhanh, sử dụng hiệu quả băng thông.
- 🔒 Sử dụng **HTTP/2**, hỗ trợ bảo mật tốt hơn HTTP/1.1.
- 📦 Dữ liệu nhỏ gọn nhờ **Protocol Buffers**.
- 🧩 Dễ tích hợp với hệ thống **microservices**.
- 💬 Giao tiếp kiểu “hàm gọi từ xa” – tự nhiên với lập trình viên.

---

## ⚠️ Hạn chế

- ❌ Không thích hợp cho **streaming data** (dữ liệu liên tục).
- ❌ Mỗi request chỉ có thể gửi một message → không tối ưu cho luồng dữ liệu lớn.

---

## 💡 Trường hợp sử dụng thực tế

- Đăng nhập / đăng ký tài khoản.
- Truy vấn dữ liệu (ví dụ: lấy thông tin người dùng).
- Thực hiện hành động đơn lẻ (ví dụ: gửi tin nhắn, đặt hàng).
- Các microservice backend cần phản hồi tức thời.

---

## 🧱 Kiến trúc cơ bản trong gRPC

| Thành phần           | Vai trò                      |
| -------------------- | ---------------------------- |
| **Client**           | Gửi request RPC đến Server   |
| **Server**           | Xử lý và trả về response     |
| **Protocol Buffers** | Ngôn ngữ định nghĩa dữ liệu  |
| **HTTP/2**           | Giao thức truyền thông chính |

---

## 🧩 Tổng kết

- 🔹 **Unary RPC** là hình thức cơ bản nhất của gRPC.
- 🔹 Cung cấp giao tiếp **1 request ↔ 1 response**.
- 🔹 Dễ cài đặt, hiệu năng cao, bảo mật tốt.
- 🔹 Là nền tảng để hiểu các kiểu nâng cao khác:  
  **Server Streaming**, **Client Streaming**, và **Bidirectional Streaming**.

---

> ✨ “Unary RPC là viên gạch đầu tiên của gRPC —  
> hiểu nó vững vàng, bạn sẽ dễ dàng làm chủ toàn bộ mô hình gRPC.”
