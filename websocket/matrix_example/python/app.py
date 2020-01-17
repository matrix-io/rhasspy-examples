import websocket
import requests
import json
from matrix_lite import led

def say(text):
    url = "http://localhost:12101/api/text-to-speech"
    requests.post(url, text)

# Intents are passed through here
def on_message(ws, message):
    data = json.loads(message)
    print("**Captured New Intent**")
    print(data)

    if ("Led" == data["intent"]["name"]):
        led.set(data["slots"]["color"])
        say("Device changed to: " + data["slots"]["color"])

def on_error(ws, error):
    print(error)

def on_close(ws):
    print("\n**Disconnected**\n")

def on_open(ws):
    print("\n**Connected**\n")

# Start web socket client
if __name__ == "__main__":
    ws = websocket.WebSocketApp("ws://localhost:12101/api/events/intent",
                              on_message = on_message,
                              on_error = on_error,
                              on_close = on_close)
    ws.on_open = on_open
    ws.run_forever()
