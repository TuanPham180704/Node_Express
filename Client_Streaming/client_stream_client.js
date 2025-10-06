const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const packageDef = protoLoader.loadSync("client_stream.proto");
const grpcObj = grpc.loadPackageDefinition(packageDef);
const demo = grpcObj.demo;

const client = new demo.UploadServie(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

const call = client.UploadLogs((err, res) => {
  if (err) return console.error("Upload error:", err);
  console.log("Server trả tổng số logs nhận được:", res.total);
});
call.write({ message: "Log 1 - Khởi động" });
call.write({ message: "Log 2 - User đăng nhập" });
call.write({ message: "Log 3 - Upload file" });

call.end();
