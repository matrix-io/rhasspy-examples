const WebSocket = require("ws");
const https = require("http");
const IP = "192.168.1.35";

const ws = new WebSocket("ws://" + IP + ":12101/api/events/intent");
console.log("**Started Web Socket Client**");

ws.on("open", function open() {
  console.log("\n**Connected**\n");
});

ws.on("close", function close() {
  console.log("\n**Disconnected**\n");
});

// Intents are passed through here
ws.on("message", function incoming(data) {
  data = JSON.parse(data);

  console.log("**Captured New Intent**");
  console.log(data);

  if ("Time" === data.intent.name) {
    let today = new Date();
    say("Right now it's " + today.getHours() + " " + today.getMinutes());
  }
});

// Text to speech for string argument
function say(text) {
  const options = {
    hostname: IP,
    port: 12101,
    path: "/api/text-to-speech",
    method: "POST"
  };

  const req = https.request(options);

  req.on("error", error => {
    console.error(error);
  });

  req.write(text);
  req.end();
}
