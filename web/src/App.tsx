/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { socketClient } from "./socket-client";
import "./App.css";
import toast from "react-hot-toast";

function App() {
  const [socketState] = useState(() => socketClient);

  (async () => {
    await fetch("http://localhost:3001/consume", {
      method: "POST",
      body: JSON.stringify({ queue: "react-app" }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  })();

  const setMessage = async () => {
    await fetch("http://localhost:3000/producer", {
      method: "POST",
      body: JSON.stringify({
        queue: "react-app",
        payload: "Enviando uma mensagem por meio da aplicação react",
      }),
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    });
  };

  useEffect(() => {
    socketState.on("message", (msg) => {
      if (msg) toast.success(JSON.parse(msg)?.message);
    });
    return () => {
      socketClient.off("message");
    };
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Socket-io.svg/1200px-Socket-io.svg.png"
            className="logo socketio"
            alt="Vite logo"
          />
        </a>
        <a href="https://vitejs.dev" target="_blank">
          <img
            src="https://cdn.freebiesupply.com/logos/large/2x/rabbitmq-logo-png-transparent.png"
            className="logo rabbitmq"
            alt="Vite logo"
          />
        </a>
        <a href="https://vitejs.dev" target="_blank">
          <img
            src="https://images.g2crowd.com/uploads/product/image/large_detail/large_detail_f0b606abb6d19089febc9faeeba5bc05/nodejs-development-services.png"
            className="logo node"
            alt="Vite logo"
          />
        </a>
      </div>
      <h1>SocketIO + RabbitMQ + NodeJS </h1>

      <div>
        <a href="https://react.dev" target="_blank">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Socket-io.svg/1200px-Socket-io.svg.png"
            className="logo socketio"
            alt="React logo"
          />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="logo react animation"
            alt="React logo"
          />
        </a>
      </div>
      <h1>SocketIO Client + ReactJS</h1>

      <p className="read-the-docs">
        Recebendo mensagens recebidas pelo socketIO após notificação do rabbitmq
      </p>
      <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <button onClick={setMessage}>Enviar Mensagem</button>
      </div>
    </>
  );
}

export default App;
