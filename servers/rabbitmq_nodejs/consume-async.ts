import client, { Channel, Connection, ConsumeMessage } from "amqplib";
const consume =
  (channel: Channel) =>
  (msg: ConsumeMessage | null): void => {
    if (msg) {
      console.log(msg.content.toString());
      channel.ack(msg);
    }
  };
(async () => {
  console.log("Aguardando mensagens");
  const connection: Connection = await client.connect(
    "amqp://username:password@localhost:5672"
  );
  const channel: Channel = await connection.createChannel();
  await channel.consume("react-app", consume(channel));
})();
