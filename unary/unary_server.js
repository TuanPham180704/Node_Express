const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const packageDef = protoLoader.loadSync("unary.proto", {
  keepCase: false,
  longs: String,
  enums: String,
  defaults: String,
  oneofs: true,
});

const grpcObj = grpc.loadPackageDefinition(packageDef);
const demo = grpcObj.demo;

const server = new grpc.Server();

function SayHello(call, callback) {
  const name = call.request.name;
  const reply = { message: `Xin chào ${name}!` };

  callback(null, reply);
}

server.addService(demo.HelloService.service, { SayHello });

// 6. bind và start server trên port 50051
server.bindAsync(
  "0.0.0.0:50051",
  grpc.ServerCredentials.createInsecure(), // insecure: không dùng TLS trong ví dụ dev
  (err, port) => {
    if (err) {
      console.error("Bind error:", err);
      return;
    }
    console.log("Unary gRPC server running on port", port);
    server.start();
  }
);
