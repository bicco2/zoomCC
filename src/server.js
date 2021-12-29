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

const sockets = [];

wss.on("connection", (socket)=> {
    sockets.push(socket);
     //다른 브라우저가 연결될 떄 소켓을 배열로 만들어서 다른 브라우저가 접속 됐을 때 마다 배열에 추가해서 관리해준다 .
    console.log("Connected to Browser ✅");
    socket.on("close", () => console.log(console.log("Disconnected to Server ❌")));
    socket.on("message", (message) => {
        sockets.forEach(aSocket => aSocket.send(message).toString('utf8'));
        //이렇게하면 어떤 브라우저에서 메세지를 보내도 배열안에있는 소켓 전부에게 메세지를 전달하게 된다.
    });
});

server.listen(3000, handleListen);
