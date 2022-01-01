import http from "http";
import SocketIO from "socket.io";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views",__dirname+ "/views");
app.use("/public", express.static(__dirname +"/public"));
app.get("/",(req,res)=> res.render("home"));
app.get("/*",(req, res) => res.redirect("/"));
//서버 연결 코드임 . 여긴 아직 공부 필요 


const httpServer = http.createServer(app); //이건 http 서버임 
//웹소켓을 위해 꼭 필요한 부분 
const wsServer = SocketIO(httpServer);

wsServer.on("connection", (socket) => {
  //console.log(socket);
  socket.on("enter_room", (roomName, done) => {
     socket.join(roomName);
     done();
     socket.to(roomName).emit("welcome"); 
  });

  socket.on("disconnecting", () => {
    socket.rooms.forEach((room) => socket.to(room).emit("bye"));
  });

  socket.on("new_message",(msg, room, done) => {
    socket.to(room).emit("new_message", msg);
    done();
  });
});
/* 
const wss = new WebSocket.Server({ server });
//이건 웹 소켓인데 http 위에 만들어진 웹소켓임 

// function onSocketMessage(message){
//     socket.send(message.toString('utf8'));
// }


function onSocketClose(){
    console.log(console.log("Disconnected to Server ❌"));
}

const sockets = [];
//다른 브라우저가 추가 됐을 때 소켓이 하나만 돌아가면 안되기 때문에 배열로 만들어서 추가하는 형식 

wss.on("connection", (socket) => {
    //wss는 소켓 connection은 소켓이 연결됐을때 라는 뜻 그리고 socket이라는 매개변수를 갖는다 
    sockets.push(socket);
    //이건 아까 말한 소켓 배열임 들어오는 소켓들을 추가해주는 코드
    socket["nickname"] = "Anon";
    //닉네임 설정안하고 익명으로할때 필요한 것
    console.log("Connected to Browser ✅");
    
    socket.on("close", onSocketClose);

    socket.on("message", (msg) => {
        //메세지 들어왔을때 실행되는 메소드같은거 msg는 들어온 메세지 객체 ex.hello!!
        // app.js에서 submit을 통해 넘어온 메세지를 말한다.
      const message = JSON.parse(msg);
      //그 msg를 닉네임인지 메세지인지 파악하기 위해 json.parse를 사용함 
      switch (message.type) {
        case "new_message":
          sockets.forEach((aSocket) =>
            aSocket.send(`${socket.nickname}: ${message.payload}`)
          );
        case "nickname":
          socket["nickname"] = message.payload;
      }
    });
  }); */
  
const handleListen = () => console.log(`Listening on http://localhost:3000`);

httpServer.listen(3000, handleListen);
