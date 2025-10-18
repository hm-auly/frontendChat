import React from "react";

const MessageBox = ({ message, role }) => {
  const isUser = message.sender === role;

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}>
      <div className={`p-2 rounded ${isUser ? "bg-green-200" : "bg-gray-300"}`}>
        {message.content && <p>{message.content}</p>}
        {message.image && <img src={`https://backendchat-877x.onrender.com${message.image}`} className="max-w-xs mt-1 rounded" />}
        {message.video && <video controls src={`https://backendchat-877x.onrender.com${message.video}`} className="max-w-xs mt-1 rounded" />}
        {message.voice && <audio controls src={`https://backendchat-877x.onrender.com${message.voice}`} className="mt-1" />}
      </div>
    </div>
  );
};

export default MessageBox;








// import React, { useState, useRef } from "react";
// import axios from "axios";

// const MessageBox = ({ message, role }) => {
//   const [showMenu, setShowMenu] = useState(false);
//   const [editing, setEditing] = useState(false);
//   const [editedText, setEditedText] = useState(message.content);
//   const timerRef = useRef(null);

//   // 🟢 মাউস ধরে রাখলে ৫০০ms পর Edit/Delete দেখা যাবে
//   const handleMouseDown = () => {
//     timerRef.current = setTimeout(() => setShowMenu(true), 500);
//   };

//   const handleMouseUp = () => {
//     clearTimeout(timerRef.current);
//   };

//   // 🔴 ডিলিট ফাংশন
//   const handleDelete = async () => {
//     await axios.delete(`http://localhost:5000/api/messages/${message._id}`);
//     setShowMenu(false);
//   };

//   // ✏️ এডিট ফাংশন
//   const handleEdit = async () => {
//     await axios.put(`http://localhost:5000/api/messages/${message._id}`, { content: editedText });
//     setEditing(false);
//     setShowMenu(false);
//   };

//   // কে পাঠিয়েছে (ডান বা বাম)
//   const isOwn = message.sender === role;

//   return (
//     <div
//       onMouseDown={handleMouseDown}
//       onMouseUp={handleMouseUp}
//       className={`flex ${isOwn ? "justify-end" : "justify-start"} relative my-1`}
//     >
//       <div
//         className={`p-2 rounded-lg max-w-[70%] ${
//           isOwn ? "bg-blue-500 text-white" : "bg-gray-200"
//         }`}
//       >
//         {editing ? (
//           <div className="flex gap-2">
//             <input
//               value={editedText}
//               onChange={(e) => setEditedText(e.target.value)}
//               className="border rounded p-1 text-black"
//             />
//             <button
//               onClick={handleEdit}
//               className="bg-green-500 text-white px-2 rounded"
//             >
//               ✅
//             </button>
//           </div>
//         ) : (
//           <>
//             {message.file && message.file.endsWith(".webm") && (
//               <audio controls src={message.file}></audio>
//             )}
//             {message.file && message.file.match(/\.(jpg|jpeg|png|gif)$/) && (
//               <img src={message.file} alt="img" className="max-w-[200px] rounded" />
//             )}
//             {message.file && message.file.match(/\.(mp4|webm)$/) && (
//               <video controls className="max-w-[200px] rounded">
//                 <source src={message.file} />
//               </video>
//             )}
//             {message.content && <p>{message.content}</p>}
//           </>
//         )}
//       </div>

//       {showMenu && isOwn && (
//         <div className="absolute top-0 right-0 flex gap-2 bg-white border rounded p-1 shadow">
//           <button
//             onClick={() => {
//               setEditing(true);
//               setShowMenu(false);
//             }}
//             className="text-blue-500 font-bold"
//           >
//             ✏️ Edit
//           </button>
//           <button
//             onClick={handleDelete}
//             className="text-red-500 font-bold"
//           >
//             🗑️ Delete
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MessageBox;