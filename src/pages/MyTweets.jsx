import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import NewTweet from "../components/NewTweet";
import TweetCard from "../components/TweetCard";

/**
 * Profil timeline — login olan kullanıcının tweetleri.
 * İlk aşamada userName sabit olabilir; JWT decode ile dinamikleyeceğiz.
 */
export default function MyTweets() {
  const [tweets, setTweets] = useState([]);

  const fetchTweets = async () => {
    const userName = localStorage.getItem("username") || "eminm";
    const res = await axiosClient.get(`/tweet/findByUserName/${userName}`);
    setTweets(res.data);
  };

  useEffect(() => { fetchTweets(); }, []);

  return (
    <div>
      <header className="px-4 py-3 text-xl font-bold sticky top-0 bg-xbg/80 backdrop-blur border-b border-xborder">
        Profil
      </header>

      <NewTweet onTweetAdded={(t) => setTweets((p) => [t, ...p])} />

      {tweets.map((t) => <TweetCard key={t.id} tweet={t} />)}
    </div>
  );
}
