const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const packageDef = protoLoader.loadSync("server_stream.proto");
const grpcObj = grpc.loadPackageDefinition(packageDef);
const demo = grpcObj.demo;

const client = new demo.NewsService("localhost:50051", grpc.credentials.createInsecure());


const call = client.GetNews({ topic: "Công nghệ" });

call.on("data", (newsItem) => {
  console.log("📰 Tin:", newsItem.title);
});


call.on("end", () => {
  console.log("✅ Server đã gửi xong tất cả tin");
});


call.on("error", (err) => {
  console.error("Stream error:", err);
});
