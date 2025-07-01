import { useState } from "react";
import { LuSend } from "react-icons/lu";

const IELTSBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;
    const userMessage = { sender: "user", text: input };
    const botMessage = { sender: "bot", text: "Thanks for your message!" };
    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="flex flex-col items-center p-4 h-full w-full">
      <div
        className="relative flex flex-col w-full flex-grow bg-white rounded-lg shadow p-4 overflow-y-auto mb-4"
        style={{ height: "400px" }}
      >
        <img
          src="IELTSLogo.png"
          alt="IELTS Logo"
          className="absolute inset-0 w-72 h-72 opacity-30 m-auto"
          style={{ pointerEvents: "none", zIndex: 0 }}
        />
        <div className="relative z-10 flex flex-col">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 p-2 rounded max-w-[80%] ${
                msg.sender === "user"
                  ? "bg-blue-200 self-end"
                  : "bg-gray-300 self-start"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-full">
        <input
          className="flex-1 border border-[#003366] rounded-none px-4 py-2 focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
        />
        <button
          className="bg-[#003366] text-white px-4 rounded-r flex items-center justify-center"
          onClick={handleSend}
        >
          <LuSend className="text-lg" />
        </button>
      </div>
    </div>
  );
};

export default IELTSBot;
