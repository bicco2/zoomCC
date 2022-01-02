const socket =io();
//io 가 알아서 서버 찾아서 해줌 
const welcome = document.getElementById("welcome");
const enterForm = welcome.querySelector("#roomTitle");
const room = document.getElementById("room");


room.hidden = true;

let roomName;

function addMessage(message){
    const ul = room.querySelector("ul");
    const li = document.createElement("li");
    li.innerText = message;
    ul.appendChild(li);
}

function handleMessageSubmit(event){
    event.preventDefault();
    const input = room.querySelector("#msg input");
    const value = input.value;
    socket.emit("new_message",input.value, roomName, () => {
        addMessage(`You: ${value}`);
    });
    input.value ="";
}

// function handleNicknameSubmit(event){
//     event.preventDefault();
//     const input = welcome.querySelector("#name input");
//     socket.emit("nickname", input.value);
// }

function showRoom(){
    welcome.hidden = true;
    room.hidden = false;
    const h3 = room.querySelector("h3");
    h3.innerText = `Room ${roomName}`;
    const msgForm = room.querySelector("#msg");
    //const nameForm = welcome.querySelector("#name");
    msgForm.addEventListener("submit", handleMessageSubmit);
    //nameForm.addEventListener("submit", handleNicknameSubmit);
}

function handleRoomSubmit(event){
    event.preventDefault();
    const input1 = enterForm.querySelector("input");
    const input2 = welcome.querySelector("#name input");
    socket.emit("nickname", input2.value);
    socket.emit("enter_room", input1.value, showRoom);
    roomName = input1.value;
    input1.value = "";
}

enterForm.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", (user, newCount) => {
    const h3 = room.querySelector("h3");
    h3.innerText = `Room ${roomName} (${newCount})`;
    addMessage(`${user} arrived!`);
});

socket.on("bye", (left, newCount) => {
    const h3 = room.querySelector("h3");

    h3.innerText = `Room ${roomName} (${newCount})`;
    const input2 = welcome.querySelector("#name input");
    if(input2 != null){
        addMessage(`${left} left ㅠㅠ`);
    }
});

socket.on("new_message", addMessage);


socket.on("room_change", (rooms) => {
    const roomList = welcome.querySelector("ul");
    roomList.innerHTML = "";
    if(rooms.length == 0){
        return;
    }
    rooms.forEach(room => {
        const li = document.createElement("li");
        li.innerText = room;
        roomList.append(li);
    });
});