const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const packageDef = protoLoader.loadSync("client_stream.proto");
const grpcObj = grpc.loadPackageDefinition(packageDef);
const demo = grpcObj.demo;

const server = new grpc.Server();

function UploadLogs(call, callback) {
  let count = 0;

  call.on("data", (req) => {
    console.log("Nhận log từ client", req.message);
    count++;
  });

  call.on("end", () => {
    callback(null, { total: count });
  });

  call.on("err", (err) => {
    console.log("Stream Err", err);
  });
}

server.addService(demo.UploadServie.service, { UploadLogs });

server.bindAsync(
  "0.0.0.0:50051",
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) return console.error(err);
    console.log("Client streaming gRPC server running on port", port);
    server.start();
  }
);
