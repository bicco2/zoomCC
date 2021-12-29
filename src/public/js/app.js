const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");
const socket = new WebSocket(`ws://${window.location.host}`);
// 여기 소켓은 서버로의 련결을 뜻함

function makeMessage(type, payload){
    const msg = {type, payload}; 
    return JSON.stringify(msg) //string 으로 변환하는 것 

}


function handleOpen(){
    console.log("Connected to Server ✅");
}

socket.addEventListener("open", handleOpen);

socket.addEventListener("message",(message) => {
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.append(li);
});

socket.addEventListener("close", () => {
    console.log("Disconnected to Server ❌");
});


function handleSubmit(event){
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(makeMessage("new_message", input.value)); // 백앤드로 메세지 보내는 코드
    input.value = "";
}
//메세지를 fe로 보내는 함수 근데 javascript로 보내는 건 안좋다 왜냐
//백앤드의 서버가 자바인지 아닌지 모르는데 그걸 그냥 js로 보내면 오류 확률 높아짐
//따라서 string으로 보내야한다 .

function handleNickSubmit(event){
    event.preventDefault();
    const input = nickForm.querySelector("input");
    socket.send(makeMessage("nickname", input.value));
}
//닉네임을 be로 보내는 함수

messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);