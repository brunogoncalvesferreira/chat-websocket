import express from "express"
import http from "node:http"
import WebSocket, { WebSocketServer } from "ws"

const app = express()
const server = http.createServer(app)
const wss = new WebSocketServer({ server })

app.use(express.static("public"))

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message)
      }
    })
  })
})

server.listen(8080, () => console.log("Servidor ligado na porta 8080"))
