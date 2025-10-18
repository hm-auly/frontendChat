// import React, { useState, useEffect, useRef } from "react";
// import { io } from "socket.io-client";
// import axios from "axios";
// import MessageBox from "../components/MessageBox";
// import MessageInput from "../components/MessageInput";

// const socket = io("http://localhost:5000");

// const Dashboard = () => {
//   const [messages, setMessages] = useState([]);
//   const [role, setRole] = useState("");
//   const messagesEndRef = useRef(null);

//   const fetchMessages = async () => {
//     const res = await axios.get("http://localhost:5000/api/messages");
//     setMessages(res.data);
//   };

//   // Auto-scroll function
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//  useEffect(() => {
//     fetchMessages();

//     // Bind listener only once
//     socket.off("receiveMessage"); // Prevent duplicate events
//     socket.on("receiveMessage", (msg) => {
//       setMessages(prev => [...prev, msg]);
//     });

//   }, []);



//   ///
// // 🔹 সার্ভার থেকে মেসেজ রিসিভ করা
//   useEffect(() => {
//     const handleReceive = (message) => {
//       setMessages((prev) => [...prev, message]);
//     };

//     //socket.off("receiveMessage"); // আগের লিসেনার মুছে দিচ্ছে (ডুপ্লিকেট ঠেকাতে)
//     socket.on("receiveMessage", handleReceive);

//     // Cleanup
//     return () => {
//       socket.off("receiveMessage", handleReceive);
//     };
//   }, []);
//   ///


//   useEffect(() => {
//     scrollToBottom(); // Scroll whenever messages update
//   }, [messages]);

//   if(!role){
//     return (
//       <div className="flex flex-col items-center justify-center h-screen gap-4">
//         <h1>Enter Role (0080=User,0070=Admin)</h1>
//         <input type="text" className="border p-2" onKeyDown={e=> e.key==="Enter" && setRole(e.target.value)}/>
//       </div>
//     )
//   }


//   return (
//     <div className="flex flex-col h-screen p-4">
//       <div className="flex-1 overflow-y-auto mb-2">
//         {messages.map(msg  => <MessageBox key={msg._id} message={msg} role={role} />)}
//         <div ref={messagesEndRef}></div>
//       </div>
//       <MessageInput role={role} socket={socket}/>
//     </div>
//   );
// };

// export default Dashboard;









// import React, { useState, useEffect, useRef } from "react";
// import { io } from "socket.io-client";
// import axios from "axios";

// const Dashboard = ({ isAdmin = false }) => {
//   const [messages, setMessages] = useState([]);
//   const [role, setRole] = useState("");
//   const [text, setText] = useState("");
//   const [file, setFile] = useState(null);
//   const [recording, setRecording] = useState(false);
//   const mediaRecorderRef = useRef(null);
//   const audioChunksRef = useRef([]);
//   const messagesEndRef = useRef(null);

//   const socketRef = useRef(null);
//   if (!socketRef.current) socketRef.current = io("http://localhost:5000");
//   const socket = socketRef.current;

//   // Fetch messages
//   useEffect(() => {
//     const fetchMessages = async () => {
//       const res = await axios.get("http://localhost:5000/api/messages");
//       setMessages(res.data);
//     };
//     fetchMessages();
//   }, []);

//   // Socket listener
//   useEffect(() => {
//     const handleReceive = (msg) => setMessages((prev) => [...prev, msg]);
//     socket.on("receiveMessage", handleReceive);
//     return () => socket.off("receiveMessage", handleReceive);
//   }, [socket]);

//   useEffect(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), [messages]);

//   // Send message (text/file)
//   const sendMessage = async (e) => {
//     e.preventDefault();
//     if (!text.trim() && !file) return;

//     let payload = { sender: role, content: text || "", image: "", video: "", voice: "" };

//     if (file) {
//       const formData = new FormData();
//       formData.append("file", file);
//       const res = await axios.post("http://localhost:5000/api/messages", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//         params: { sender: role, content: text },
//       });
//       setFile(null);
//       setText("");
//       return;
//     }

//     // Text only
//     await axios.post("http://localhost:5000/api/messages", payload);
//     setText("");
//   };

//   // Voice recording
//   const startRecording = async () => {
//     setRecording(true);
//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//     const mediaRecorder = new MediaRecorder(stream);
//     mediaRecorderRef.current = mediaRecorder;
//     audioChunksRef.current = [];

//     mediaRecorder.ondataavailable = (e) => audioChunksRef.current.push(e.data);
//     mediaRecorder.start();
//   };

//   const stopRecording = async () => {
//     setRecording(false);
//     const mediaRecorder = mediaRecorderRef.current;
//     mediaRecorder.stop();
//     mediaRecorder.onstop = async () => {
//       const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
//       const file = new File([blob], `voice-${Date.now()}.webm`, { type: "audio/webm" });

//       const formData = new FormData();
//       formData.append("file", file);
//       await axios.post("http://localhost:5000/api/messages", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//         params: { sender: role, content: "" },
//       });
//     };
//   };

//   if (!role) {
//     return (
//       <div className="flex flex-col items-center justify-center h-screen gap-4">
//         <h1>Enter Role (0080=User,0070=Admin)</h1>
//         <input type="text" className="border p-2" onKeyDown={e => e.key==="Enter" && setRole(e.target.value)} />
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col h-screen p-4">
//       <div className="flex-1 overflow-y-auto mb-2">
//         {messages.map((msg) => {
//           const isOwn = (isAdmin ? msg.sender === "Admin" : msg.sender === role);
//           return (
//             <div key={msg._id || Math.random()} className={`p-2 my-1 rounded max-w-xs ${isOwn ? "bg-blue-200 self-end" : "bg-gray-200 self-start"}`}>
//               <strong>{msg.sender}:</strong> {msg.content}
//               {msg.image && <img src={`http://localhost:5000${msg.image}`} className="max-w-xs mt-1" />}


// {msg.video && <video controls src={`http://localhost:5000${msg.video}`} className="max-w-xs mt-1" />}
//               {msg.voice && <audio controls src={`http://localhost:5000${msg.voice}`} className="mt-1" />}
//             </div>
//           );
//         })}
//         <div ref={messagesEndRef}></div>
//       </div>

//       {/* Input + File + Voice */}
//       <form onSubmit={sendMessage} className="flex gap-2">
//         <textarea  value={text} onChange={e=>setText(e.target.value)} placeholder="Type message..." className="border p-2 flex-1 max-h-[100px] " >
         
//         </textarea>
        
//         <input type="file"  onChange={e=>setFile(e.target.files[0])} />
//         {recording ? (
//           <button type="button" onClick={stopRecording} className="bg-red-500 text-white p-2 rounded">Stop</button>
//         ) : (
//           <button type="button" onClick={startRecording} className="bg-green-500 text-white p-2 rounded">Voice</button>
//         )}
//         <button type="submit" className="bg-blue-500 text-white p-2 rounded">Send</button>
//       </form>
//     </div>
//   );
// };

// export default Dashboard;













import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { IoMdSend } from "react-icons/io";
import { MdKeyboardVoice } from "react-icons/md";
import { MdFilePresent } from "react-icons/md";
import Navber from "../aders/Navber";

const socket = io(`https://backendchat-877x.onrender.com`);

const Dashboard = ({ isAdminPage = false }) => {
  const [messages, setMessages] = useState([]);
  const [role, setRole] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const messagesEndRef = useRef(null);

  // Fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      const res = await axios.get("https://backendchat-877x.onrender.com/api/messages");
      setMessages(res.data);
    };
    fetchMessages();
  }, []);

  // Socket listener
  useEffect(() => {
    const handleReceive = (msg) => setMessages((prev) => [...prev, msg]);
    socket.on("receiveMessage", handleReceive);
    return () => socket.off("receiveMessage", handleReceive);
  }, []);

  useEffect(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), [messages]);

  // Send message (text/file)
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !file) return;

    const formData = new FormData();
    formData.append("sender", role);
    formData.append("content", text);

    if (file) formData.append("file", file);

    try {
      await axios.post("https://backendchat-877x.onrender.com/api/messages", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setText("");
      setFile(null);
    } catch (err) {
      console.error(err);
    }
  };

  // Voice recording
  const startRecording = async () => {
    setRecording(true);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (e) => audioChunksRef.current.push(e.data);
    mediaRecorder.start();
  };

  const stopRecording = async () => {
    setRecording(false);
    const mediaRecorder = mediaRecorderRef.current;
    mediaRecorder.stop();
    mediaRecorder.onstop = async () => {
      const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      const file = new File([blob], `voice-${Date.now()}.webm`, { type: "audio/webm" });

      const formData = new FormData();
      formData.append("sender", role);
      formData.append("content", "");
      formData.append("file", file);

      try {
        await axios.post("https://backendchat-877x.onrender.com/api/messages", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } catch (err) {
        console.error(err);
      }
    };
  };

  // Role input
  if (!role) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <h1>Enter Role (0080=User,0070=Admin)</h1>
        <input
          type="text"
          className="border p-2"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const val = e.target.value.trim();
              if (val === "0080" || val === "0070") setRole(val);
              else alert("Invalid Role! Only 0080 or 0070 allowed.");
            }
          }}
        />
      </div>
    );
  }

  const getAlignment = (msgSender) => {
    if (isAdminPage) return msgSender === "0070" ? "self-end bg-blue-200" : "self-start bg-gray-200";
    else return msgSender === "0080" ? "self-end bg-blue-200 mr-14 " : "self-start bg-gray-200 ml-14 my-2";
  };

  return (
  
    <div className="flex flex-col h-screen p-4  ">
      <div>
        <Navber />
      </div>
      <div className="flex-1 overflow-auto mb-2 w-[330px]  ">
        {messages.map((msg) => (
          <div key={msg._id || Math.random()} className={` p-2 my-1 rounded max-w-xs ${getAlignment(msg.sender)}`}>
            {/* <strong>{msg.sender === "0080" ? "User" : "admin"}:</strong>*/} <strong className="font-[600] text-gray-800 text-lg max-w-[330px] break-words overflow-auto ">{msg.content}</strong>  
            {msg.image && <div className=" h-auto overflow-hidden"> <img src={`https://backendchat-877x.onrender.com${msg.image}`} className="w-full h-full object-cover" /> </div>}
            {msg.video && <video controls src={`https://backendchat-877x.onrender.com${msg.video}`} className="max-w-xs mt-1" />}
            {msg.voice && <audio controls src={`https://backendchat-877x.onrender.com${msg.voice}`} className="mt-1  w-[245px] " />}
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>

       {/* Input + File + Voice */}
      <form onSubmit={sendMessage} className="flex gap-2 items-center">
        <textarea
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type message..."
          className="border p-2 flex-1 rounded h-[70px]"
        />
        <label htmlFor="fileUpload" className="bg-blue-500 text-white p-2 rounded">
          <MdFilePresent  className="text-2xl"/>
        </label>
        <input id="fileUpload" type="file" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
        
         
        {recording ? (
          <button type="button" onClick={stopRecording} className="bg-blue-500 text-white p-2 rounded">
           
              <IoMdSend className="text-2xl" />
           
          </button>
        ) : (

          <button type="button" onClick={startRecording} className="bg-blue-500 text-white p-2 rounded">
                
          <i className="fa-solid fa-microphone"></i>
                 
          </button>
        )} 



 
         <button type="submit" className="bg-blue-500 text-white p-2 rounded" >
           <IoMdSend className="text-2xl" />
        </button>   
      </form>

    </div>
  );
};

export default Dashboard;