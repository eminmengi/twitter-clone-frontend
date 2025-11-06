import { useState } from "react";
import axiosClient from "../api/axiosClient";

/**
 * Tweet kompoz alanı — üstte, X'e benzer minimal alan.
 */
export default function NewTweet({ onTweetAdded }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    try {
      setLoading(true);
      const res = await axiosClient.post("/tweet", { content });
      onTweetAdded?.(res.data);
      setContent("");
    } catch {
      alert("Gönderilemedi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-b border-xborder px-4 py-3">
      <form onSubmit={submit} className="flex gap-3">
        <div className="w-10 h-10 rounded-full bg-[#16181c]" />
        <div className="flex-1">
          <textarea
            className="w-full bg-transparent outline-none placeholder-xmuted text-xl resize-none"
            rows="2"
            placeholder="Neler oluyor?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="flex justify-end">
            <button
              disabled={loading}
              className="bg-xblue hover:brightness-110 disabled:opacity-60 text-white rounded-full px-4 py-2 font-semibold"
            >
              {loading ? "Gönderiliyor…" : "Gönderi yayınla"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
