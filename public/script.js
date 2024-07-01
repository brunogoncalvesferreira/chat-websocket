const webSocket = new WebSocket("http://localhost:8080")

const messagesDiv = document.querySelector("#messages")
const messageInput = document.querySelector("input")
const sendButton = document.querySelector("#send-button")

sendButton.addEventListener("click", () => {
  if (messageInput.value) {
    webSocket.send(messageInput.value)
    messageInput.value = ""
  }
})

webSocket.onmessage = (event) => {
  const message = document.createElement("div")

  if (event.data instanceof Blob) {
    const reader = new FileReader()

    reader.onload = () => {
      message.textContent = reader.result
      messagesDiv.appendChild(message)
      messagesDiv.scrollTop = messagesDiv.scrollHeight
    }

    reader.readAsText(event.data)
  } else {
    message.textContent = event.data
    messagesDiv.appendChild(message)
    messagesDiv.scrollTop = messagesDiv.scrollHeight
  }
}

messageInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    sendButton.click()
  }
})
