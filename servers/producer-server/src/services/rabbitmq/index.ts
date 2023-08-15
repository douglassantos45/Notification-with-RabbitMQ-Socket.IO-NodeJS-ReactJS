import amqplib, { Channel, Connection, Message } from "amqplib";

export class RabbitMQ {
  private connection: Connection;
  private channel: Channel | null = null;

  constructor(private readonly url: string) {}

  async connect() {
    this.connection = await amqplib.connect(this.url);
    this.channel = await this.connection.createChannel();
  }

  async publishInQueue(queue: string, payload: any) {
    return this.channel?.sendToQueue(
      queue,
      Buffer.from(JSON.stringify(payload))
    );
  }
}
