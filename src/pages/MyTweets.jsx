import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import NewTweet from "../components/NewTweet";
import TweetCard from "../components/TweetCard";
import { useAuth } from "../context/AuthContext";

export default function MyTweets() {
  const { user } = useAuth(); // ✅ user.userName buradan
  const [tweets, setTweets] = useState([]);

  const fetchTweets = async () => {
    if (!user?.userName) return;
    const res = await axiosClient.get(`/tweet/findByUserName/${user.userName}`);
    setTweets(res.data);
  };

  useEffect(() => { fetchTweets(); }, [user?.userName]);

  return (
    <div>
      <header className="px-4 py-3 text-xl font-bold sticky top-0 bg-black/80 backdrop-blur border-b border-xborder">
        Profil (@{user?.userName})
      </header>

      {/* Yeni gönderi oluşturma */}
      <NewTweet onTweetAdded={(t) => setTweets(prev => [t, ...prev])} />

      {/* Gönderiler */}
      {tweets.map(t => <TweetCard key={t.id} tweet={t} />)}
    </div>
  );
}
