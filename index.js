const http = require("http");
const app = require("./app");
const port = process.env.PORT || 9002;
  
//create server
const server = http.createServer(app);
  
//listening port
server.listen(port, () => {
console.log("server running on port " + port);

});
  
