const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const packageDef = protoLoader.loadSync("bidi.proto");
const grpcObj = grpc.loadPackageDefinition(packageDef);
const demo = grpcObj.demo;

const client = new demo.ChatService("localhost:50051", grpc.credentials.createInsecure());

const call = client.Chat();

call.on("data", (msg) => {
  console.log("Server:", msg.text);
});

call.on("end", () => {
  console.log("Server đã kết thúc stream");
});

call.on("error", (err) => {
  console.error("Stream error:", err);
});


call.write({ user: "Tuấn", text: "Xin chào server!" });
call.write({ user: "Tuấn", text: "Bạn khỏe không?" });
call.write({ user: "Tuấn", text: "Test gRPC bidi" });

setTimeout(() => call.end(), 1000);
