const http = require("http");
const main = require("./main");

const server = http.createServer(main.handler);

server.listen("3000");
