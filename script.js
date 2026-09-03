const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

// GKEDIT AI API Key
const API_KEY = "AQ.Ab8RN6J-o8IOf7XRK9DbfuCgL20YbtCXHAZ6JqRhoJRpUIdWRg";

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.className = `message ${sender}`;
  msg.innerText = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
  return msg;
}

async function handleSend() {
  const text = userInput.value.trim();
  if (!text) return;

  addMessage(text, "user");
  userInput.value = "";

  const loadingMsg = addMessage("GKEDIT AI ఆలోచిస్తోంది...", "ai");

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `నువ్వు GKEDIT AI అనే పవర్ ఫుల్ పర్సనల్ అసిస్టెంట్‌వి. యూజర్ అడిగిన ప్రశ్నలకు స్పష్టంగా, సరళంగా మరియు ఉపయోగపడేలా సమాధానం ఇవ్వు. యూజర్ ప్రశ్న: ${text}`
          }]
        }]
      })
    });

    const data = await response.json();
    
    if (data.candidates && data.candidates[0].content && data.candidates[0].content.parts[0].text) {
      loadingMsg.innerText = data.candidates[0].content.parts[0].text;
    } else if (data.error) {
      loadingMsg.innerText = `ఎర్రర్: ${data.error.message}`;
    } else {
      loadingMsg.innerText = "సమాధానం తీసుకురావడంలో సమస్య వచ్చింది. దయచేసి మళ్లీ ప్రయత్నించండి.";
    }
  } catch (error) {
    loadingMsg.innerText = "ఇంటర్నెట్ లేదా సర్వర్ కనెక్షన్ సమస్య ఏర్పడింది.";
  }
}

sendBtn.addEventListener("click", handleSend);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleSend();
});
