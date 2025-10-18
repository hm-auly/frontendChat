// import React, { useState, useRef } from "react";
// import axios from "axios";

// const VoiceRecorder = ({ role, socket }) => {
//   const [recording, setRecording] = useState(false);
//   const mediaRecorderRef = useRef();
//   const audioChunksRef = useRef([]);

//   const startRecording = async () => {
//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//     mediaRecorderRef.current = new MediaRecorder(stream);
//     audioChunksRef.current = [];

//     mediaRecorderRef.current.ondataavailable = e => {
//       audioChunksRef.current.push(e.data);
//     };

//     mediaRecorderRef.current.onstop = async () => {
//       const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
//       const file = new File([blob], `voice-${Date.now()}.webm`);
//       const formData = new FormData();
//       formData.append("sender", role);
//       formData.append("file", file);

//       await axios.post("http://localhost:5000/api/messages", formData, {
//         headers: { "Content-Type": "multipart/form-data" }
//       });

//       // Emit socket for real-time
//       socket.emit("sendMessage", { sender: role, voice: URL.createObjectURL(blob) });
//     };

//     mediaRecorderRef.current.start();
//     setRecording(true);
//   };

//   const stopRecording = () => {
//     mediaRecorderRef.current.stop();
//     setRecording(false);
//   };

//   return (
//     <div className="my-2">
//       <button
//         onMouseDown={startRecording}    // Press to record
//         onMouseUp={stopRecording}       // Release to stop and send
//         className={`px-4 py-2 rounded ${recording ? "bg-red-500 text-white" : "bg-gray-300"}`}
//       >
//         {recording ? "Recording..." : "Hold to Record Voice"}
//       </button>
//     </div>
//   );
// };

// export default VoiceRecorder;