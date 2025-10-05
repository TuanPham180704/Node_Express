const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const packageDef = protoLoader.loadSync("server_stream.proto");
const grpcObj = grpc.loadPackageDefinition(packageDef);
const demo = grpcObj.demo;

const server = new grpc.Server();

// Handler cho server streaming: server sẽ write nhiều lần rồi end()
function GetNews(call) {
  const topic = call.request.topic || "Chung";
  const items = [
    `${topic} - Bản tin 1`,
    `${topic} - Bản tin 2`,
    `${topic} - Bản tin 3`,
  ];

 
  items.forEach((t, idx) => {
    setTimeout(() => {
      call.write({ title: t }); 
    }, idx * 1000);
  });


  setTimeout(() => {
    call.end(); 
  }, items.length * 1000 + 50);
}

server.addService(demo.NewsService.service, { GetNews });

server.bindAsync("0.0.0.0:50051", grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) return console.error(err);
  console.log("Server streaming gRPC server running on port", port);
  server.start();
});
