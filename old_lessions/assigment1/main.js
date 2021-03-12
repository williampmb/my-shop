const main = (request, response) => {
  const url = request.url;
  if (url === "/") {
    response.setHeader("Content-type", "text/html");
    response.write("<html>");
    response.write("<head><title>Users</title></head>");
    response.write(`<body>
      <h2>Hi There!</h2>
      <form action="/create-user" method="POST">
      <input type="text" name="username"/>
      <button type="submit">Create User</button>
      </form>
      </body>`);
    response.write("</html>");
    return response.end();
  }
  if (url === "/create-user") {
    const body = [];
    request.on("data", (chuckUser) => {
      body.push(chuckUser);
    });
    return request.on("end", () => {
      const username = Buffer.concat(body).toString().split("=")[1];
      console.log(username);
      response.statusCode = 302;
      return response.setHeader("Location", "/");
    });
  }
  if (url === "/users") {
    response.write(`<html>
          <head><title>users</title></head>
          <ul>
          <li>User1</li>
          <li>User2</li>
          </ul>
          </html>`);
    response.end();
  }
};

module.exports = { handler: main };
