const socket = new WebSocket(`ws://${window.location.host}`);
// 여기 소켓은 서버로의 련결을 뜻함

function handleOpen(){
    console.log("Connected to Server ✅");
}

socket.addEventListener("open", handleOpen);

socket.addEventListener("message",(message) => {
    console.log("New message : ", message.data);
});

socket.addEventListener("close", () => {
    console.log("Disconnected to Server ❌");
});

setTimeout(() => {
    socket.send("hello from the brower!");
}, 10000 );