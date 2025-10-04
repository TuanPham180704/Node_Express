import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";

const packageDef = protoLoader.loadSync("proto/helloworld.proto");
const grpcObject = grpc.loadPackageDefinition(packageDef);
const greeter = grpcObject.helloworld.Greeter;

// Kết nối tới server
const client = new greeter("localhost:50051", grpc.credentials.createInsecure());

// Gọi hàm RPC
client.SayHello({ name: "Tuấn Dev" }, (err, response) => {
  if (err) console.error(err);
  else console.log("Phản hồi từ server:", response.message);
});
