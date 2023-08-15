import express from "express";
import cors from "cors";

import { RabbitMQ } from "./services/rabbitmq";

const app = express();

app.use(cors({ origin: "*" }));

app.use(express.json());

app.post("/producer", async (req, res) => {
  const { queue, payload } = req.body;
  const rabbitMQ = new RabbitMQ("amqp://username:password@localhost:5672");
  await rabbitMQ.connect();
  await rabbitMQ.publishInQueue(queue, { message: payload });
  return res.json();
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
