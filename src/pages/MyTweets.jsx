import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import NewTweet from "../components/NewTweet";
import TweetCard from "../components/TweetCard";
import { useAuth } from "../context/AuthContext";

export default function MyTweets() {
  const { user } = useAuth();
  const [tweets, setTweets] = useState([]);

  const fetchTweets = async () => {
    if (!user?.userName) return;
    const res = await axiosClient.get(`/tweet/findByUserName/${user.userName}`);
    setTweets(res.data);
  };

  useEffect(() => {
    fetchTweets();
  }, [user?.userName]);

  // 🔁 RT sonrası yeni tweet'i profil listesine ekle
  const handleRetweet = (newRetweet) => {
    setTweets((prev) => [newRetweet, ...prev]);
  };

  return (
    <div>
      <header className="px-4 py-3 text-xl font-bold sticky top-0 bg-black/80 backdrop-blur border-b border-xborder">
        Profil (@{user?.userName})
      </header>

      <NewTweet onTweetAdded={(t) => setTweets((prev) => [t, ...prev])} />

      {tweets.map((t) => (
        <TweetCard
          key={t.id}
          tweet={t}
          onRetweet={handleRetweet} // ✅ eklendi
        />
      ))}
    </div>
  );
}
