const Hapi = require("hapi");
const good = require("good");

//creating server with a host and port

const server = Hapi.server({
  host: "localhost",
  port: 8000
});

const routes = {};
routes.tasks = require("./routes/tasks");

//Adding a route

server.route({
  method: "GET",
  path: "/",
  handler: (request, h) => {
    return { message: "hello from hapi" };
  }
});
// loading other routes
server.route(routes.tasks);
const options = {
  ops: {
    interval: 100000
  },
  reporters: {
    consoleReporters: [{ module: "good-console" }, "stdout"]
  }
};

const init = async () => {
  await server.register({
    plugin: require("good"),
    options
  });

  //starting the server
  await server.start();
  console.log(`Server is running at: ${server.info.uri}`);
};

process.on("unhandledRejection", err => {
  console.log(err);
  process.exit(1);
});

init();
