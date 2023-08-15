import amqplib, { Channel, Connection, Message } from "amqplib";

export class RabbitMQ {
  private connection: Connection;
  private channel: Channel | null = null;

  constructor(private readonly url: string) {}

  async connect() {
    this.connection = await amqplib.connect(this.url);
    this.channel = await this.connection.createChannel();
  }

  async consume(queue: string, callback: (message: Message) => void) {
    if (!queue) return;
    return this.channel?.consume(queue, (message) => {
      if (message) {
        callback(message);
        this.channel?.ack(message);
      }
    });
  }
}
