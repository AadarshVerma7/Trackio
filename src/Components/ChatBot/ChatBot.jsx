import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext.jsx";
import { marked } from "marked";
import DOMPurify from "dompurify";

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: "bot", text: "Hi there! What brings you here today?" }
    ]);
    const [userInput, setUserInput] = useState("");
    const [showOptions, setShowOptions] = useState(true);
    const [isTyping, setIsTyping] = useState(false);

    const [tempId] = useState(() => {
        const saved = localStorage.getItem("chat_user_id");
        if (saved) return saved;

        const newId = crypto.randomUUID();
        localStorage.setItem("chat_user_id", newId);
        return newId;
    });

    const options = [
        "I have questions about pricing",
        "I have questions about my invoice",
        "I'm looking for support",
        "I am a developer trying to learn more",
        "Something else"
    ];

    const { backendUrl } = useContext(AppContext);

    async function sendMessageToAI(message) {
        try {
            const res = await fetch(`${backendUrl}/api/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: tempId,
                    message: message
                })
            });

            const data = await res.json();
            return data.reply;
        } catch {
            return "Something went wrong. Please try again.";
        }
    }

    async function handleUserMessage(text) {
        const userMsg = { sender: "user", text };
        setMessages((prev) => [...prev, userMsg]);
        setShowOptions(false);
        setIsTyping(true);

        const reply = await sendMessageToAI(text);

        setIsTyping(false);
        const botMsg = { sender: "bot", text: reply };
        setMessages((prev) => [...prev, botMsg]);
    }

    async function handleSend() {
        if (!userInput.trim()) return;
        const text = userInput;
        setUserInput("");
        await handleUserMessage(text);
    }

    return (
        <>
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 w-16 h-16 bg-orange-400 text-white rounded-full shadow-xl flex items-center justify-center text-3xl hover:scale-110 transition-transform z-50 cursor-pointer"
                >
                    💬
                </button>
            )}

            {isOpen && (
                <div className="fixed inset-0 bg-black/5 flex justify-end items-end p-4 z-50">
                    {/* Added text-black here to force dark text inside the modal regardless of theme */}
                    <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl flex flex-col overflow-hidden relative text-black">

                        <button
                            className="absolute top-3 right-4 text-2xl text-red-500 hover:text-red-600 cursor-pointer"
                            onClick={() => setIsOpen(false)}
                        >
                            <i className="fas fa-times"></i>
                        </button>

                        <div className="p-4 bg-orange-50 text-orange-700 font-semibold border-b text-xl">
                            Track-Bot
                        </div>

                        <div className="flex-1 p-4 overflow-y-auto max-h-[450px] space-y-3">
                            {messages.map((msg, i) => {
                                const html = DOMPurify.sanitize(marked(msg.text));

                                return (
                                    <div
                                        key={i}
                                        // Added text-black specifically to messages to be safe
                                        className={`p-3 rounded-xl max-w-[80%] text-black ${msg.sender === "user"
                                                ? "ml-auto bg-orange-100"
                                                : "bg-gray-100"
                                            }`}
                                        dangerouslySetInnerHTML={{ __html: html }}
                                    ></div>
                                );
                            })}

                            {isTyping && (
                                // Added text-black here
                                <div className="p-3 rounded-xl bg-gray-200 max-w-[60%] text-black">
                                    <span className="animate-pulse">TrackBot is typing...</span>
                                </div>
                            )}

                            {showOptions && (
                                <div className="space-y-2 mt-4">
                                    {options.map((opt, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleUserMessage(opt)}
                                            // Added text-black to options
                                            className="w-full py-2 px-4 bg-orange-50 hover:bg-orange-100 rounded-xl border text-left text-black"
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>


                        <div className="p-3 border-t flex gap-2 bg-white">
                            <input
                                // Added text-black and bg-white explicitly to input
                                className="flex-1 p-2 border rounded-xl text-black bg-white"
                                placeholder="Type a message..."
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            />
                            <button
                                onClick={handleSend}
                                className="px-4 py-2 bg-orange-600 text-white rounded-xl cursor-pointer"
                            >
                                Send
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
}