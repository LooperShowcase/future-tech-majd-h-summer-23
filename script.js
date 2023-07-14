//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

const question_img = document.getElementById("question");

const hiddenDiv = document.getElementById("hidden-div");

// ✅ Show hidden DIV on hover
question_img.addEventListener("mouseover", function handleMouseOver() {
  hiddenDiv.style.display = "block";
});

// ✅ (optionally) Hide DIV on mouse out
question_img.addEventListener("mouseout", function handleMouseOut() {
  hiddenDiv.style.display = "none";

  // 👇️ if you used visibility property to hide the div
  // hiddenDiv.style.visibility = 'hidden';
});

let open_response;

let chat = [
  { role: "user", content: "Hi" },
  { role: "assistant", content: "Hello my child, How can I help you" },
];

async function Chatuseradd(Emotion, Question) {
  chat.push({
    role: "user",
    content:
      "My happiness from 0-10 is " + Emotion + ". My input is: " + Question,
  });
}
function ChatAssistantAdd(res) {
  chat.push({ role: "assistant", content: res });
}
async function OpenAI_test() {
  let url = "https://api.openai.com/v1/chat/completions";
let part1 = "sk";
let part2 = "-5bpxzQt9pRMB76Vl0GXRT3B";
let part3 = "lbkFJJcrNpEhBx1KMnMPG7tjH";

let allParts = part1 + part2 + part3;

  let data = {
    model: "gpt-3.5-turbo",
    messages: chat,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${allParts}`,
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
        const responseData = await response.json();
        const message = responseData.choices[0].message.content;
    
        ChatAssistantAdd(message);
    
        const speech = new SpeechSynthesisUtterance(message);
        speechSynthesis.speak(speech);
        return message;
      }
  } catch (error) {
    console.log("Oops an error: " + error);
  }


}
