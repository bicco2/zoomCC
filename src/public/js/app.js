const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");
const socket = new WebSocket(`ws://${window.location.host}`);
// 여기 소켓은 서버로의 련결을 뜻함

function makeMessage(type, payload){
    const msg = {type, payload}; 
    return JSON.stringify(msg) //string 으로 변환하는 것 
}
// 받아오는 메세지를 type 과 payload로 구별해서 할 수 있도록 나눠주기 
// 왜?? 메세지가 들어오는데 nickname과 message가 있음 근데 그 둘을 구분하기 위해서 json을 쓴다
// json의 구조가 type, payload로 이루어져 있기때문에 

function handleOpen(){
    console.log("Connected to Server ✅");
}

socket.addEventListener("open", handleOpen);
// const socket에 이벤트 다는 거임 즉 socket이 실행될때 실행됨 

socket.addEventListener("message",(message) => {
    //메세지 입력됐을때 실행되는 이벤트 
    const li = document.createElement("li");
    //li 요소 생성하고 
    li.innerText = message.data;
    //거기에 message로 들어오는 데이터 삽입 즉, 웹사이트에 메세지 입력하는거 보이게하겠다는 것
    messageList.append(li);
    //그리고 li를 여기서 생성했으니까 messagelist(ul)안에 li 삽입 (추가)
});

socket.addEventListener("close", () => {
    console.log("Disconnected to Server ❌");
});


function handleSubmit(event){
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(makeMessage("new_message", input.value)); 
    // 백앤드로 메세지 보내는 코드
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

//둘다 form이니까 submit 이 실행되면 함수 실행
messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);
