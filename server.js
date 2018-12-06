const Hapi = require("hapi");

//creating server with a host and port

const server = Hapi.server({
  host: "localhost",
  port: 8000
});

//Adding a route
server.route({
  method: "GET",
  path: "/",
  handler: (request, h) => {
    return { message: "hello from hapi" };
  }
});

//starting the server
const init = async () => {
  await server.start();
  console.log(`Server is running at: ${server.info.uri}`);
};

process.on("unhandledRejection", err => {
  console.log(err);
  process.exit(1);
});

init();
