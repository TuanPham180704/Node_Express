import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";

const packageDef = protoLoader.loadSync("proto/helloworld.proto");
const grpcObject = grpc.loadPackageDefinition(packageDef);
const greeter = grpcObject.helloworld.Greeter;

const server = new grpc.Server();

// Cài đặt hàm RPC
server.addService(greeter.service, {
  SayHello: (call, callback) => {
    const name = call.request.name;
    callback(null, { message: `Xin chào, ${name}!` });
  },
});

// Chạy server
server.bindAsync(
  "0.0.0.0:50051",
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log("✅ gRPC server đang chạy tại port 50051");
    server.start();
  }
);
