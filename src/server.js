import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views",__dirname+ "/views");
app.use("/public", express.static(__dirname +"/public"));
app.get("/",(req,res)=> res.render("home"));
app.get("/*",(req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app); //이건 http 서버임 
//웹소켓을 위해 꼭 필요한 부분 
const wss = new WebSocket.Server({ server });
//이건 웹 소켓인데 http 위에 만들어진 웹소켓임 

// function onSocketMessage(message){
//     socket.send(message.toString('utf8'));
// }

function onSocketClose(){
    console.log(console.log("Disconnected to Server ❌"));
}

const sockets = [];

wss.on("connection", (socket) => {
    sockets.push(socket);
    socket["nickname"] = "Anon";
    console.log("Connected to Browser ✅");
    socket.on("close", onSocketClose);
    socket.on("message", (msg) => {
      const message = JSON.parse(msg);
      switch (message.type) {
        case "new_message":
          sockets.forEach((aSocket) =>
            aSocket.send(`${socket.nickname}: ${message.payload}`)
          );
        case "nickname":
          socket["nickname"] = message.payload;
      }
    });
  });

server.listen(3000, handleListen);
