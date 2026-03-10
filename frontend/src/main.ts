const API_URL = import.meta.env.VITE_API_URL;

const app = document.querySelector<HTMLDivElement>('#app')!;

app.innerHTML = `
  <div style="max-width:600px;margin:40px auto;font-family:sans-serif">
    <h2>Chat Demo</h2>
    <div id="chatBox" style="border:1px solid #ccc;padding:10px;height:300px;overflow-y:auto;margin-bottom:10px"></div>
    <input id="messageInput" type="text" placeholder="Nhập tin nhắn..." style="width:75%;padding:8px" />
    <button id="sendBtn" style="padding:8px 12px">Gửi</button>
  </div>
`;

const chatBox = document.getElementById("chatBox")!;
const input = document.getElementById("messageInput") as HTMLInputElement;
const button = document.getElementById("sendBtn")!;

function addMessage(sender: string, text: string) {
  const div = document.createElement("div");
  div.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
  const message = input.value.trim();
  if (!message) return;

  addMessage("Bạn", message);
  input.value = "";

  const res = await fetch(`${API_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  const data = await res.json();
  addMessage("Bot", data.reply);
}

button.addEventListener("click", sendMessage);

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});