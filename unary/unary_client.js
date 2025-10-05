const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const packageDef = protoLoader.loadSync("unary.proto");
const grpcObj = grpc.loadPackageDefinition(packageDef);
const demo = grpcObj.demo;

const client = new demo.HelloService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

client.SayHello({ name: "Tuấn Dev" }, (err, res) => {
  if (err) {
    console.error("RPC Error:", err);
    return;
  }
  console.log("Server trả về:", res.message);
});
