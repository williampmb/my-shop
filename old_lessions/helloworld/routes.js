const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.setHeader("Content-type", "text/html");
    res.write("<html>");
    res.write("<head><title>Button form</title></head>");
    res.write(
      `<body><form method="POST" action="/message">
            <input type="text" name="myInputField" />
            <button type="submit">Send</button>
            </form></body>`
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chuck) => {
      console.log("MyData", chuck);
      body.push(chuck);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const inputTxt = parsedBody.split("=")[1];
      fs.writeFile("myfile.txt", inputTxt, (error) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
  res.setHeader("Content-type", "text/html");
  res.write("<html>");
  res.write("<head><title>mypage</title></head>");
  res.write("<body>My first not really node</body>");
  res.write("</html>");
  res.end();
};

module.exports = { handler: requestHandler };
//exports.handler = requestHandler;
//module.exports = requestHandler;
//module.exports = requestHandler;
