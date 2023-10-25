import http, { request } from "http";
import { products } from "./products.js";
import { users } from "./users.js";

const server = http.createServer((req, res) => {
  console.log(req.url);
  //res.end('mi primer servidor');
  if (req.url === "/products") {
    res.end(JSON.stringify(products));
  }

  if (req.url === "/users") {
    res.end(JSON.stringify(users));
  }
});

server.listen(8080, () => console.log("Server en puerto 8080"));
