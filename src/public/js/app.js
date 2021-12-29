const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");
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


function handleSubmit(event){
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(input.value);
    input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);