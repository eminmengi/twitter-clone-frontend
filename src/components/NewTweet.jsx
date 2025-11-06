// src/components/NewTweet.jsx
import { useState } from "react";
import axiosClient from "../api/axiosClient";

export default function NewTweet({ onTweetAdded }) {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      // ✅ Tweet atma isteği
      const res = await axiosClient.post("/tweet", { content: text.trim() });
      onTweetAdded?.(res.data);
      setText("");
    } catch (err) {
      console.error("Tweet gönderilirken hata:", err);
      alert("Tweet gönderilemedi 😔");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-b border-gray-700 p-3">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Neler oluyor?"
        rows={3}
        className="w-full bg-transparent outline-none resize-none text-white placeholder-gray-400"
      />
      <div className="flex justify-end mt-2">
        <button
          type="submit"
          className="bg-sky-500 hover:bg-sky-600 px-4 py-1.5 rounded-full font-semibold text-white"
        >
          Tweetle
        </button>
      </div>
    </form>
  );
}
