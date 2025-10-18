import React, { useState, useRef } from "react";
import axios from "axios";

const MessageInput = ({ role, socket }) => {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunks.current = [];

      mediaRecorderRef.current.ondataavailable = e => {
        audioChunks.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const blob = new Blob(audioChunks.current, { type: "audio/webm" });
        const voiceFile = new File([blob], `voice_${Date.now()}.webm`, { type: "audio/webm" });
        await sendMessage(voiceFile);
      };

      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (err) {
      console.error("Microphone access denied", err);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  const sendMessage = async (voiceFile = null) => {
    if (!text.trim() && !file && !voiceFile) return;

    const formData = new FormData();
    formData.append("sender", role);
    if (text) formData.append("content", text);
    if (file) formData.append("file", file);
    if (voiceFile) formData.append("file", voiceFile);

    const res = await axios.post("https://backendchat-877x.onrender.com/api/messages", formData, { headers: { "Content-Type": "multipart/form-data" } });

    // Emit real-time event
    socket.emit("sendMessage", res.data);

    setText("");
    setFile(null);
  };

  return (
    <div className="flex flex-col gap-2">
      <textarea
        className="border p-2 rounded resize-none"
        rows={1}
        value={text}
        placeholder="Type a message..."
        onChange={e => setText(e.target.value)}
      />
      <div className="flex gap-2">
        <input type="file" onChange={e => setFile(e.target.files[0])} accept="image/*,video/*" />
        <button
          className={`px-4 py-2 ${recording ? 'bg-red-500' : 'bg-blue-500'} text-white rounded`}
          onMouseDown={startRecording}
          onMouseUp={stopRecording}
        >
          {recording ? "Recording..." : "Hold to Record"}
        </button>
        <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={() => sendMessage()}>
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageInput;