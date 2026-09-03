const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.className = `message ${sender}`;
  msg.innerText = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function handleSend() {
  const text = userInput.value.trim();
  if (!text) return;

  addMessage(text, "user");
  userInput.value = "";

  setTimeout(() => {
    let response = "GKEDIT AI సర్వర్‌లు ఆన్‌లైన్‌లో ఉన్నాయి!";
    const lower = text.toLowerCase();

    if (lower.includes("hello") || lower.includes("హలో")) {
      response = "నమస్కారం! GKEDIT AI మీ సేవలో ఉంది.";
    } else if (lower.includes("status")) {
      response = "సిస్టమ్ హెల్త్: 100% ఆప్టిమల్. కోర్ ఆన్‌లైన్.";
    } else if (lower.includes("who are you") || lower.includes("నువ్వు ఎవరు")) {
      response = "నేను GKEDIT AI, మీ పర్సనల్ ఇంటెలిజెంట్ అసిస్టెంట్.";
    }

    addMessage(response, "ai");
  }, 600);
}

sendBtn.addEventListener("click", handleSend);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleSend();
});
