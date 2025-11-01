
import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { IoMdSend } from "react-icons/io";
import { MdKeyboardVoice } from "react-icons/md";
import { MdFilePresent } from "react-icons/md";
import { Link } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";

const socket = io(`https://backendchat-877x.onrender.com`);

const Dashboard = ({ isAdminPage = false }) => {
  const [activ, setActiv] = useState(false);
  const [messages, setMessages] = useState([]);
  const [text1, setText1] = useState("");
  const textareaRef = useRef(null);
  const [role, setRole] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const messagesEndRef = useRef(null);

  //
   useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // আগে reset করি
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`; 
      // 200px হলো max height, এটা চাওয়া অনুযায়ী পরিবর্তন করা যাবে
    }
  }, [text]);

  //
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

  //

    const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile ) {
      setFile(selectedFile);
    } else {
      setFile(null);
    }
  };

  

  //
                                                     
  return (
  
    <div className="flex flex-col w-screen h-screen overflow-hidden bg-fixed px-2  ">
      <div className="flex   pt-2 pl-2  ">
        {/* <Navber /> */}
        <div className="font-bold pt-3">
         <Link to="/" ><FaArrowLeftLong className="flex" /></Link>
        </div>
        <div className="h-14 ">
            <div className=" px-5">
              <div>
              <p className="">শাহজাদী</p>
              </div>
              {activ === false &&  file === null && text === "" ? 
              <p></p> : <p className="text-xs">Typing...</p>
}
            </div>
        </div>
      </div>
      <div className="flex-1 overflow-auto mb-2 w-[330px]  ">
        {messages.map((msg) => (
          <div key={msg._id || Math.random()} className={` p-2 my-1 rounded max-w-xs ${getAlignment(msg.sender)}`}>
            {/* <strong>{msg.sender === "0080" ? "User" : "admin"}:</strong>*/} <strong className="font-[600] text-gray-800 text-lg max-w-[330px] break-words overflow-auto ">{msg.content}</strong>  
            {msg.image && <div className=" h-auto overflow-hidden"> <img src={`https://backendchat-877x.onrender.com${msg.image}`} className="w-full h-full object-cover" /> </div>}
            {msg.video && <video controls src={`https://backendchat-877x.onrender.com${msg.video}`} className="max-w-xs mt-1 overflow-hidden" />}
            {msg.voice && <audio controls src={`https://backendchat-877x.onrender.com${msg.voice}`} className="mt-1  w-[245px] " />}
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>

       {/* Input + File + Voice */}
      <form onSubmit={sendMessage} className="flex gap-2 items-end  w-[330px] ">
        <div className="flex justify-between items-end bg-gray-700 text-gray-200 font-[500] overflow-auto rounded-md w-full "> 
 <textarea
          type="text"
          onFocus={() => setActiv(true)}
          onBlur={() => setActiv(false)}
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={file ? `${file.name}`: 'your message typing...'}
          //disabled={!file && !text}
          className="border border-none w-full px-2  outline-none resize-none overflow-auto"
        />
        <label htmlFor="fileUpload" className="  p-2 rounded  ">
          <MdFilePresent  className="text-2xl"/>
        </label>
        </div>
      

                <input type="file"  id="fileUpload"  className="hidden" onChange={handleFileChange} />

        
          <div>
     {activ === false &&  file === null && text === "" ? <div> 
         {recording ? (
          <button type="button" onClick={stopRecording} className="bg-blue-500 text-white p-2 rounded-full h-[45px] w-[45px] flex justify-center items-center  ">
         
              <IoMdSend className="text-4xl" />
           
          </button>
        ) : ( 

          <button type="button" onClick={startRecording} className="bg-blue-500 text-white p-2  rounded-full text-2xl">
          <i className="fa-solid fa-microphone "></i>
          </button>
        )} </div>: <div className="flex items-end"> 
         <button type="submit" onSubmit={sendMessage} className="bg-blue-500 text-white pl-1 rounded-full h-[45px] w-[45px]  flex items-center justify-center " >
           <IoMdSend className="text-3xl" />
        </button>  </div>
    }
          </div>
            

       </form> 

    </div>
  );
};

export default Dashboard;











