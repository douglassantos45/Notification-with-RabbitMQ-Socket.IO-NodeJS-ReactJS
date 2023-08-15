import { Server } from "socket.io";
import express from "express";
import http from "http";
import cors from "cors";

import { RabbitMQ } from "./services/rabbitmq";

const app = express();

const server = http.createServer(app);
const socketIO = new Server(server, {
  cors: { origin: "*" },
});
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.post("/consume", async (req, res) => {
  const queue = req.body.queue;
  const rabbitMQ = new RabbitMQ("amqp://username:password@localhost:5672");
  await rabbitMQ.connect();
  await rabbitMQ.consume(queue, async (message) => {
    if (message) {
      socketIO.emit("message", message.content.toString());
    }
  });
  return res.json({ ok: true });
});

server.listen(3001, () => {
  console.log("Server listening on port 3001");
});
