const WebSocket = require("ws");
const matrix = require("@matrix-io/matrix-lite");
const https = require("http");

const ws = new WebSocket("ws://localhost:12101/api/events/intent");
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

  if ("Led" === data.intent.name) {
    matrix.led.set(data.slots["color"]);
    say("Device changed to: " + data.slots["color"]);
  }
});

// Text to speech for string argument
function say(text) {
  const options = {
    hostname: "localhost",
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
