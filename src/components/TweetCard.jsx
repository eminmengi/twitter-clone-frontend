import { Heart, Repeat2, MessageCircle, Trash2, Send } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import axiosClient from "../api/axiosClient";
import { useState, useEffect } from "react";

export default function TweetCard({ tweet, onDelete, onClick, showCommentsInitially = false }) {
  const { user } = useAuth();

  // 🧠 Başlangıç durumları
  const [liked, setLiked] = useState(tweet.likedByCurrentUser || false);
  const [likeCount, setLikeCount] = useState(tweet.totalLikes || 0);
  const [retweeted, setRetweeted] = useState(tweet.retweetedByCurrentUser || false);
  const [retweetCount, setRetweetCount] = useState(tweet.totalRetweets || 0);
  const [showCommentBox, setShowCommentBox] = useState(showCommentsInitially);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState(tweet.totalComments || 0);

  // 💬 Yorumları yükle
  const fetchComments = async () => {
    try {
      const res = await axiosClient.get(`/comment/tweet/${tweet.id}`);
      setComments(res.data);
    } catch (err) {
      console.error("❌ Yorumlar yüklenemedi:", err);
    }
  };

  useEffect(() => {
    if (showCommentBox) fetchComments();
  }, [showCommentBox]);

  // 🕓 Tarih biçimi
  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleString("tr-TR", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });

  // 🗑️ Tweet silme
  const handleDelete = async (e) => {
    e?.stopPropagation();
    if (!window.confirm("Bu tweeti silmek istediğine emin misin?")) return;
    try {
      await axiosClient.delete(`/tweet/${tweet.id}`);
      onDelete?.(tweet.id);
    } catch (err) {
      console.error("❌ Tweet silinirken hata:", err);
    }
  };

  // ❤️ Beğeni toggle
  const toggleLike = async (e) => {
    e.stopPropagation();
    try {
      if (!liked) {
        await axiosClient.post(`/like/${tweet.id}`);
        setLiked(true);
        setLikeCount((p) => p + 1);
      } else {
        await axiosClient.delete(`/like/${tweet.id}`);
        setLiked(false);
        setLikeCount((p) => p - 1);
      }
    } catch (err) {
      console.error("❌ Beğeni hatası:", err);
    }
  };

  // 🔁 Retweet toggle
  const toggleRetweet = async (e) => {
    e.stopPropagation();
    try {
      if (!retweeted) {
        await axiosClient.post(`/retweet/${tweet.id}`);
        setRetweeted(true);
        setRetweetCount((p) => p + 1);
      } else {
        await axiosClient.delete(`/retweet/${tweet.id}`);
        setRetweeted(false);
        setRetweetCount((p) => p - 1);
      }
    } catch (err) {
      console.error("❌ Retweet hatası:", err);
    }
  };

  // 💬 Yorum ekleme
  const handleAddComment = async () => {
    const trimmed = comment.trim();
    if (!trimmed) return;
    try {
      const res = await axiosClient.post(`/comment/${tweet.id}`, { content: trimmed });
      setComment("");
      setCommentCount((p) => p + 1);
      setComments((p) => [...p, res.data]);
    } catch (err) {
      console.error("❌ Yorum eklenirken hata:", err);
    }
  };

  // ⌨️ Enter ile gönderme
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAddComment();
    }
  };

  // 🗑️ Yorum silme
  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Bu yorumu silmek istiyor musun?")) return;
    try {
      await axiosClient.delete(`/comment/${commentId}`);
      setComments((p) => p.filter((c) => c.id !== commentId));
      setCommentCount((p) => p - 1);
    } catch (err) {
      console.error("❌ Yorum silinirken hata:", err);
    }
  };

  return (
    <div
      className="border-b border-xborder px-4 py-3 hover:bg-[#16181C] transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div className="flex gap-3">
        {/* Profil resmi */}
        <img
          src={
            tweet.avatar ||
            "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
          }
          alt="avatar"
          className="w-10 h-10 rounded-full object-cover"
        />

        <div className="flex-1">
          {/* Üst bilgi */}
          <div className="flex items-center justify-between">
            <div>
              <span className="font-semibold text-white mr-1">{tweet.userName}</span>
              <span className="text-gray-500">@{tweet.userName}</span>
              <span className="text-gray-500 ml-2 text-sm">· {formatDate(tweet.createdAt)}</span>
            </div>

            {user?.userName === tweet.userName && (
              <button
                onClick={handleDelete}
                className="text-gray-500 hover:text-red-500 transition"
                title="Tweet'i sil"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>

          {/* Tweet içeriği */}
          <p className="mt-1 text-[15px] text-gray-200 whitespace-pre-wrap break-words">
            {tweet.content}
          </p>

          {/* Aksiyonlar */}
          <div className="flex justify-between mt-3 text-gray-500 max-w-[300px]">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowCommentBox((p) => !p);
              }}
              className="hover:text-sky-500 transition flex items-center gap-1"
            >
              <MessageCircle size={16} /> <span className="text-sm">{commentCount}</span>
            </button>

            <button
              onClick={toggleRetweet}
              className={`transition flex items-center gap-1 ${
                retweeted ? "text-green-500" : "hover:text-green-400"
              }`}
            >
              <Repeat2 size={16} />
              <span className="text-sm">{retweetCount}</span>
            </button>

            <button
              onClick={toggleLike}
              className={`transition flex items-center gap-1 ${
                liked ? "text-pink-500" : "hover:text-pink-400"
              }`}
            >
              <Heart size={16} fill={liked ? "currentColor" : "none"} />
              <span className="text-sm">{likeCount}</span>
            </button>
          </div>

          {/* 💬 Yorum alanı */}
          {showCommentBox && (
            <div className="mt-3" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-2">
                <input
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Yanıt yaz..."
                  className="flex-1 bg-transparent border border-xborder rounded-full px-3 py-1 text-sm text-white placeholder-gray-500 focus:border-sky-500 outline-none"
                />
                <button
                  onClick={handleAddComment}
                  className="bg-sky-500 hover:bg-sky-600 text-white rounded-full p-2 transition"
                >
                  <Send size={16} />
                </button>
              </div>

              <div className="mt-3 space-y-2">
                {comments.length === 0 ? (
                  <p className="text-gray-500 text-sm">Henüz yorum yok.</p>
                ) : (
                  comments.map((c) => (
                    <div
                      key={c.id}
                      className="flex justify-between items-start bg-[#16181C] p-2 rounded-lg"
                    >
                      <div>
                        <span className="text-white font-medium">@{c.userName}</span>{" "}
                        <span className="text-gray-400 text-xs">{formatDate(c.createdAt)}</span>
                        <p className="text-gray-300 text-sm mt-1">{c.content}</p>
                      </div>

                      {user?.userName === c.userName && (
                        <button
                          onClick={() => handleDeleteComment(c.id)}
                          className="text-gray-500 hover:text-red-500 transition"
                          title="Yorumu sil"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
