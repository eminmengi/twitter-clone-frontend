import { useEffect, useState } from "react";
import TweetCard from "../components/TweetCard";
import NewTweet from "../components/NewTweet";
import axiosClient from "../api/axiosClient";

export default function Home() {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTweets = async () => {
    try {
      const res = await axiosClient.get("/tweet");
      setTweets(res.data);
    } catch (err) {
      console.error("Tweetler yüklenirken hata:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  const handleTweetAdded = (newTweet) => {
    setTweets((prev) => [newTweet, ...prev]);
  };

  const handleTweetDeleted = (deletedId) => {
    setTweets((prev) => prev.filter((t) => t.id !== deletedId));
  };

  // 🔁 RT sonrası yeni tweet'i feed'e ekle
  const handleRetweet = (newRetweet) => {
    setTweets((prev) => [newRetweet, ...prev]);
  };

  return (
    <div>
      <header className="px-4 py-3 text-xl font-bold sticky top-0 bg-black/80 backdrop-blur border-b border-xborder">
        Sana Özel
      </header>

      <NewTweet onTweetAdded={handleTweetAdded} />

      {loading ? (
        <div className="text-center text-xmuted py-10">Yükleniyor...</div>
      ) : tweets.length === 0 ? (
        <div className="text-center text-xmuted py-10">Henüz gönderi yok.</div>
      ) : (
        tweets.map((t) => (
          <TweetCard
            key={t.id}
            tweet={t}
            onDelete={handleTweetDeleted}
            onRetweet={handleRetweet} // ✅ eklendi
          />
        ))
      )}
    </div>
  );
}
