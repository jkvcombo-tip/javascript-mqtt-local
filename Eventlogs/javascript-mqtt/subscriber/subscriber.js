let mqttClient;

window.addEventListener("load", (event) => {
  connectToBroker();

  const subscribeBtn = document.querySelector("#subscribe");
  subscribeBtn.addEventListener("click", function () {
    subscribeToTopic();
  });

  const unsubscribeBtn = document.querySelector("#unsubscribe");
  unsubscribeBtn.addEventListener("click", function () {
    unsubscribeToTopic();
  });
});

function connectToBroker() {
  const clientId = "client" + Math.random().toString(36).substring(7);

  // Change this to point to your MQTT broker
  const host = "ws://192.168.1.44:9001/mqtt";

  const options = {
    keepalive: 60,
    clientId: clientId,
    protocolId: "MQTT",
    protocolVersion: 4,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
  };

  mqttClient = mqtt.connect(host, options);

  mqttClient.on("error", (err) => {
    console.log("Error: ", err);
    mqttClient.end();
  });

  mqttClient.on("reconnect", () => {
    console.log("Reconnecting...");
  });

  mqttClient.on("connect", () => {
    console.log("Client connected:" + clientId);
  });

  // Received
  mqttClient.on("message", (topic, message, packet) => {
    console.log(
      "Received Message: " + message.toString() + "\nOn topic: " + topic
    );
    const messageTextArea = document.querySelector("#message");
    messageTextArea.value += message + "\r\n";
  });
}

// function connectToBroker() {
//   const clientId = "client" + Math.random().toString(36).substring(7);

//   // Change this to point to your MQTT broker
//   const host = "ac8458808c124f8db895569facdecfd7.s1.eu.hivemq.cloud";
//   const port = 8883;

//   const options = {
//     keepalive: 60,
//     clientId: clientId,
//     protocolId: "MQTTS", // Change protocolId to "MQTTS"
//     protocolVersion: 4,
//     clean: true,
//     reconnectPeriod: 1000,
//     connectTimeout: 30 * 1000,
//     port: port, // Set port to 8883
//     // Add SSL options
//     rejectUnauthorized: false, // You may need to adjust this based on your setup
//   };

//   mqttClient = mqtt.connect("wss://" + host, options); // Use wss:// for secure connection

//   mqttClient.on("error", (err) => {
//     console.log("Error: ", err);
//     mqttClient.end();
//   });

//   mqttClient.on("reconnect", () => {
//     console.log("Reconnecting...");
//   });

//   mqttClient.on("connect", () => {
//     console.log("Client connected:" + clientId);
//   });

//   // Received
//   mqttClient.on("message", (topic, message, packet) => {
//     console.log(
//       "Received Message: " + message.toString() + "\nOn topic: " + topic
//     );
//     const messageTextArea = document.querySelector("#message");
//     messageTextArea.value += message + "\r\n";
//   });
// }


function subscribeToTopic() {
  const status = document.querySelector("#status");
  const topic = document.querySelector("#topic").value.trim();
  console.log(`Subscribing to Topic: ${topic}`);

  mqttClient.subscribe(topic, { qos: 1 });
  status.style.color = "green";
  status.value = "SUBSCRIBED";
}

function unsubscribeToTopic() {
  const status = document.querySelector("#status");
  const topic = document.querySelector("#topic").value.trim();
  console.log(`Unsubscribing to Topic: ${topic}`);

  mqttClient.unsubscribe(topic, { qos: 0 });
  status.style.color = "red";
  status.value = "UNSUBSCRIBED";
}
