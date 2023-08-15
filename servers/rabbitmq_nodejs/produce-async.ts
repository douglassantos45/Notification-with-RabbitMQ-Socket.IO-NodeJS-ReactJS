import client, { Connection } from "amqplib";
(async () => {
  const connection: Connection = await client.connect(
    "amqp://username:password@localhost:5672"
  );
  const channel = await connection.createChannel();
  await channel.assertQueue("react-app");
  channel.sendToQueue(
    "react-app",
    Buffer.from(
      JSON.stringify({
        message: "Enviando mensagem por meio de um serviço externo",
      })
    )
  );
  console.log("Mensagem enviada");
})();
