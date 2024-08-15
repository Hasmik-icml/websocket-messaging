

const statusOfConnection = document.getElementById("status");
const messages = document.getElementById("messages");
const form = document.getElementById("form");
const input = document.getElementById("input");
console.log(statusOfConnection);

const ws = new WebSocket("ws://localhost:3011");

form.addEventListener('submit', (e) => {
    e.preventDefault();

    ws.send(input.value);
    input.value = "";
})


function setStatus(value) {
    console.log(value);
    statusOfConnection.innerHTML = value;
}

function viewMessage(value) {
    const li = document.createElement("li");

    li.innerHTML = value;
    messages.appendChild(li);
}

ws.onopen = () => setStatus('Online');
ws.onclose = () => setStatus('Disconnected');
ws.onmessage = (res) => {
    console.log(res.data);
    viewMessage(res.data);
}
ws.onerror = (error) => {
    console.error('WebSocket Error:', error);
}
