const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const packageDef = protoLoader.loadSync("bidi.proto");
const grpcObj = grpc.loadPackageDefinition(packageDef);
const demo = grpcObj.demo;

const server = new grpc.Server();

function Chat(call) {
  call.on("data", (msg) => {
    console.log(`${msg.user}: ${msg.text}`);
    call.write({ user: "Server", text: `Server đã nhận: "${msg.text}"` });
  });
  call.on("end", () => {
    console.log("Client đã kết thúc chat");
    call.end(); 
  });

  call.on("error", (err) => {
    console.error("Chat stream error:", err);
  });
}

server.addService(demo.ChatService.service, { Chat });

server.bindAsync("0.0.0.0:50051", grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) return console.error(err);
  console.log("Bidirectional gRPC server running on port", port);
  server.start();
});
