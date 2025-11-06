import TweetCard from "../components/TweetCard";
import NewTweet from "../components/NewTweet";
import { useState } from "react";

export default function Home() {
  const [tweets, setTweets] = useState([]);

  return (
    <div>
      <header className="px-4 py-3 text-xl font-bold sticky top-0 bg-black/80 backdrop-blur border-b border-xborder">
        Sana Özel
      </header>

      <NewTweet onTweetAdded={(t) => setTweets((p) => [t, ...p])} />

      {tweets.length === 0 ? (
        <div className="text-center text-xmuted py-10">Henüz gönderi yok.</div>
      ) : (
        tweets.map((t) => <TweetCard key={t.id} tweet={t} />)
      )}
    </div>
  );
}
