/**
 * Tek tweet kartı — X görünümü: koyu panel, ince border, muted meta.
 */
export default function TweetCard({ tweet }) {
  return (
    <div className="px-4 py-3 hover:bg-[#0b0e12] border-b border-xborder transition">
      <div className="flex gap-3">
        {/* Avatar placeholder */}
        <div className="w-10 h-10 rounded-full bg-[#16181c]" />
        <div className="flex-1">
          <div className="text-sm">
            <span className="font-semibold">{tweet.userName}</span>{" "}
            <span className="text-xmuted">@{tweet.userName}</span>{" "}
            <span className="text-xmuted">· {new Date(tweet.createdAt).toLocaleTimeString()}</span>
          </div>
          <div className="mt-1 leading-6">{tweet.content}</div>
          {/* Aksiyon satırı (dummy) */}
          <div className="mt-2 flex justify-between text-xmuted text-sm max-w-sm">
            <span>💬 0</span><span>🔁 0</span><span>❤️ 0</span><span>↗️</span>
          </div>
        </div>
      </div>
    </div>
  );
}
