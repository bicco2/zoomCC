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



function handleConnection(socket){ //여기서의 소켓은 연결된 브라우저를 뜻함 
    console.log(socket);
}

wss.on("connection", handleConnection)

server.listen(3000, handleListen);
