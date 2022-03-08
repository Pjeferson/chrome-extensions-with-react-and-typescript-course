console.log("helelo context");

const texts = [];

const aTags = document.getElementsByTagName("a");

for (const tag of aTags) {
  texts.push(tag.textContent);
}

chrome.runtime.sendMessage(null, texts, (response) => {
  console.log("I am from response", response);
})


chrome.runtime.onMessage.addListener((message, sender, sendResponde) => {
  console.log(message);
  console.log(sender);
});
