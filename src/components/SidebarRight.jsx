export default function SidebarRight() {
  const trends = ["#UCL", "#SabriSarıoğlu", "#OkanBuruk"];

  return (
    <div className="space-y-4 mt-4">
      <div className="bg-[#16181c] rounded-2xl p-3">
        <input
          className="w-full bg-transparent outline-none text-sm placeholder-xmuted"
          placeholder="Ara"
        />
      </div>

      <div className="bg-[#16181c] rounded-2xl overflow-hidden">
        <div className="px-4 py-3 font-extrabold text-lg border-b border-xborder">
          Neler oluyor?
        </div>
        {trends.map((t, i) => (
          <div
            key={i}
            className="px-4 py-3 hover:bg-[#0f1419] transition cursor-pointer border-b border-xborder"
          >
            <div className="text-sm text-xmuted">Gündem · Türkiye</div>
            <div className="font-semibold">{t}</div>
            <div className="text-sm text-xmuted">12,4 B gönderi</div>
          </div>
        ))}
      </div>
    </div>
  );
}
