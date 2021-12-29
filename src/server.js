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

function onSocketMessage(message){
    console.log(message);
}

wss.on("connection", (socket)=> {
    console.log("Connected to Browser ✅");
    socket.on("close", () => console.log(console.log("Disconnected to Server ❌")));
    socket.on("message", onSocketMessage);
    socket.send("hello!!"); //백앤드에서 메세지를 보내면 프론트 앤트(app.js)에서 받아야한다. 
});

server.listen(3000, handleListen);
