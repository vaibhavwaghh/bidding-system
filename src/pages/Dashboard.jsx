import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Dashboard() {
  return (
    <Row type="horizontal">
      <Heading as="h1">Dashboard</Heading>
      <p>TEST</p>
    </Row>
  );
}

export default Dashboard;
// import { useState, useEffect } from "react";
// import io from "socket.io-client";

// const Dashboard = () => {
//   const [messages, setMessages] = useState([]);
//   const [messageInput, setMessageInput] = useState("");
//   const socket = io();

//   useEffect(() => {
//     // socket.on("chat message", (message) => {
//     //   setMessages((prevMessages) => [...prevMessages, message]);
//     // });
//     socket.on("countdown", (message) => {
//       setMessages((prevMessages) => [...prevMessages, message]);
//     });
//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (messageInput.trim() !== "") {
//       socket.emit("chat message", messageInput);
//       setMessageInput("");
//     }
//   };

//   return (
//     <div>
//       <ul id="messages">
//         {messages.map((message, index) => (
//           <li key={index}>{message}</li>
//         ))}
//       </ul>
//       <form id="form" onSubmit={handleSubmit}>
//         <input
//           id="input"
//           autoComplete="off"
//           value={messageInput}
//           onChange={(e) => setMessageInput(e.target.value)}
//         />
//         <button type="submit">Send</button>
//       </form>
//     </div>
//   );
// };

// export default Dashboard;
// import { useState, useEffect } from "react";
// import io from "socket.io-client";

// const Dashboard = () => {
//   const [countdown, setCountdown] = useState(60); // Initial countdown value
//   const [messageInput, setMessageInput] = useState("");
//   const socket = io();

//   useEffect(() => {
//     socket.on("countdown", (countdownValue) => {
//       setCountdown(countdownValue);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (messageInput.trim() !== "") {
//       socket.emit("chat message", messageInput);
//       setMessageInput("");
//     }
//   };

//   return (
//     <div>
//       <div>{`${countdown < 10 ? "0" + countdown : countdown}:00`}</div>
//       <form id="form" onSubmit={handleSubmit}>
//         <input
//           id="input"
//           autoComplete="off"
//           value={messageInput}
//           onChange={(e) => setMessageInput(e.target.value)}
//         />
//         <button type="submit">Send</button>
//       </form>
//     </div>
//   );
// };

// export default Dashboard;
