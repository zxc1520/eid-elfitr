import React, { useState, useEffect, useRef } from "react";

// ─── CONFIG ────────────────────────────────────────────────────────────────
const WA_NUMBER = "6285100361329"; // Ganti dengan nomor WA kamu

// 🎵 URL audio takbiran online (bisa diganti dengan URL lain atau path lokal "takbir.mp3")
const AUDIO_SRC = "takbir.mp3";
// Untuk pakai file lokal, ganti dengan: const AUDIO_SRC = "takbir.mp3";

// ─── DECORATIVE COMPONENTS ─────────────────────────────────────────────────

function Ketupat({ color = "#059669", delay = "0s" }) {
  return (
    <div className="animate-[sway_4s_ease-in-out_infinite] inline-block" style={{ animationDelay: delay, transformOrigin: "top center" }}>
      <svg width="32" height="64" viewBox="0 0 40 80" fill="none">
        <line x1="20" y1="0" x2="20" y2="15" stroke={color} strokeWidth="1.5" />
        <path d="M20 15 L38 33 L20 51 L2 33 Z" fill={color} fillOpacity="0.85" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M11 24 L29 42 M29 24 L11 42 M20 15 L20 51 M2 33 L38 33" stroke="#fde68a" strokeWidth="1" opacity="0.5" />
        <path d="M20 51 Q15 65 10 75" fill="none" stroke="#fbbf24" strokeWidth="1.5" />
        <path d="M20 51 Q25 65 30 75" fill="none" stroke="#fbbf24" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

function Moon() {
  return (
    <svg width="64" height="64" viewBox="0 0 80 80" className="animate-[float_4s_ease-in-out_infinite]">
      <circle cx="40" cy="40" r="28" fill="#fbbf24" />
      <circle cx="52" cy="30" r="24" fill="#064e3b" />
      <polygon points="65,20 67,24 71,24 68,27 69,31 65,28 61,31 62,27 59,24 63,24" fill="#fde68a" />
    </svg>
  );
}

function StarField() {
  const stars = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 3,
    dur: Math.random() * 2 + 2,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-yellow-100"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            animation: `sparkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

// ─── MUSIC TOGGLE BUTTON ────────────────────────────────────────────────────

function MusicToggle({ isPlaying, onToggle }) {
  return (
    <button
      onClick={onToggle}
      title={isPlaying ? "Matikan Musik" : "Nyalakan Musik"}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-emerald-800/90 hover:bg-emerald-700 text-emerald-50 text-xs font-medium px-4 py-2.5 rounded-full shadow-lg border border-emerald-600/40 backdrop-blur-sm transition-all active:scale-95"
    >
      {/* Animated music icon */}
      <span className="relative flex items-end gap-[2px] h-4 w-5">
        {[1, 2, 3].map((bar) => (
          <span
            key={bar}
            className="block w-[4px] rounded-sm bg-yellow-400"
            style={{
              height: isPlaying ? undefined : "8px",
              animation: isPlaying ? `musicBar${bar} 0.8s ease-in-out infinite alternate` : "none",
            }}
          />
        ))}
      </span>
      <style>{`
        @keyframes musicBar1 { from { height: 4px } to { height: 14px } }
        @keyframes musicBar2 { from { height: 10px } to { height: 6px } }
        @keyframes musicBar3 { from { height: 6px } to { height: 14px } }
      `}</style>
      {isPlaying ? "Musik Aktif" : "Musik Mati"}
    </button>
  );
}

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [showContent, setShowContent] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (hasEntered) {
      const timer = setTimeout(() => setShowContent(true), 100);
      return () => clearTimeout(timer);
    }
  }, [hasEntered]);

  // ✅ Autoplay: dijalankan SETELAH hasEntered true & audio element sudah ada di DOM
  useEffect(() => {
    if (hasEntered && audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.log("Audio play blocked by browser:", err);
          setIsPlaying(false);
        });
    }
  }, [hasEntered]);

  const handleOpenInvitation = (e) => {
    e.preventDefault();
    const name = guestName.trim() || "Saudara/i";
    setGuestName(name);
    setHasEntered(true); // ← useEffect di atas akan otomatis memicu play
  };

  const handleToggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Audio play blocked:", err));
    }
  };

  const handleWA = () => {
    const waMessage = encodeURIComponent(`Wa'alaikumsalam! Minal Aidin wal Faizin, mohon maaf lahir dan batin juga ya \n\nSalam hangat,\n*${guestName}*`);
    window.open(`https://wa.me/${WA_NUMBER}?text=${waMessage}`, "_blank");
  };

  // ─── WELCOME SCREEN (POPUP) ───
  if (!hasEntered) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-emerald-950 px-4 relative overflow-hidden">
        <StarField />
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl max-w-sm w-full text-center border border-white/10 shadow-2xl relative z-10">
          <Moon />
          <h2 className="text-2xl text-emerald-50 mt-6 mb-2 font-serif tracking-wide">Idul Fitri 1447 H</h2>
          <p className="text-emerald-200/80 mb-2 text-sm font-light">Silakan masukkan nama Anda untuk membuka ucapan.</p>

          <form onSubmit={handleOpenInvitation}>
            <input
              type="text"
              placeholder="Masukkan nama Anda..."
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full px-5 py-3 rounded-xl mb-6 bg-white/5 border border-emerald-400/30 text-emerald-50 placeholder-emerald-200/50 focus:outline-none focus:border-yellow-400 focus:bg-white/10 transition-all"
              autoFocus
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-yellow-950 font-semibold py-3 rounded-xl transition-all hover:shadow-lg hover:shadow-yellow-500/20 active:scale-95"
            >
              Buka Ucapan
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ─── MAIN INVITATION ───
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-emerald-950 font-sans text-emerald-900">
      {/* Audio element — src bisa diganti file lokal */}
      <audio ref={audioRef} src={AUDIO_SRC} loop />

      {/* Floating music toggle */}
      <MusicToggle isPlaying={isPlaying} onToggle={handleToggleMusic} />

      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#064e3b_0%,_#022c22_80%)]" />
      <StarField />

      {/* Tali Ketupat */}
      <div className={`relative z-10 flex items-start justify-center pt-2 gap-6 sm:gap-10 transition-all duration-1000 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"}`}>
        <div className="absolute top-[14px] left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-700/50 to-transparent" />
        <Ketupat color="#059669" delay="0s" />
        <Ketupat color="#d97706" delay="0.5s" />
        <Ketupat color="#047857" delay="0.2s" />
        <Ketupat color="#b45309" delay="0.7s" />
        <Ketupat color="#059669" delay="0.3s" />
      </div>

      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <div className={`w-full max-w-md transition-all duration-1000 delay-300 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <div className="bg-[#fdfbf7] rounded-3xl overflow-hidden shadow-2xl border border-emerald-900/10">
            {/* Header Card */}
            <div className="relative bg-emerald-800 px-6 pt-10 pb-12 text-center overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_#fbbf24_0%,_transparent_70%)]" />
              <div className="flex justify-center mb-4 relative z-10">
                <Moon />
              </div>
              <p className="text-yellow-200/90 text-2xl mb-1 font-serif tracking-wide relative z-10">السَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ</p>
              <p className="text-emerald-200/70 text-xs tracking-widest uppercase relative z-10">Assalamu'alaikum Warahmatullahi Wabarakatuh</p>
            </div>

            {/* Scallop edge separator */}
            <div className="relative -mt-6 overflow-hidden h-6 bg-[#fdfbf7] rounded-t-[50%] border-t border-emerald-800/10" />

            {/* Content Body */}
            <div className="px-8 pb-10 pt-2 text-center">
              <p className="text-emerald-600/80 text-xs tracking-[0.2em] uppercase mb-2 font-semibold">Kami Keluarga</p>
              <p className="text-emerald-900 text-xl font-serif mb-1">Almarhum Yonni Muhazir</p>
              <p className="text-emerald-900 text-lg font-serif mb-6">mengucapkan</p>

              <div className="flex items-center justify-center gap-2 mb-6 opacity-60">
                <div className="h-px w-12 bg-emerald-300" />
                <span className="text-yellow-500 text-lg">✧</span>
                <div className="h-px w-12 bg-emerald-300" />
              </div>

              <h1 className="text-3xl sm:text-4xl font-serif font-bold leading-tight mb-2 text-emerald-900">Minal 'Aidin</h1>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold leading-tight mb-8 text-emerald-900">wal-Faizin</h1>

              {/* Dynamic Guest Name */}
              <div className="inline-block bg-emerald-50 border border-emerald-100 rounded-full px-6 py-2 mb-8">
                <p className="text-emerald-800 text-sm">
                  Teruntuk: <span className="font-semibold font-serif text-base">{guestName}</span>
                </p>
              </div>

              <p className="text-emerald-800/80 text-base leading-relaxed mb-6 font-light">
                Selamat Hari Raya Idul Fitri 1447 H.
                <br />
                Mohon maaf lahir dan batin 🙏
              </p>

              <p className="text-emerald-600/70 text-xs italic leading-relaxed mb-8">
                Taqabbalallahu minna wa minkum,
                <br />
                semoga amal ibadah kita diterima Allah SWT.
              </p>

              {/* Action Button */}
              <button onClick={handleWA} className="w-full group relative overflow-hidden rounded-xl bg-emerald-800 hover:bg-emerald-700 text-emerald-50 py-4 px-6 font-medium tracking-wide transition-all active:scale-[0.98]">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Balas via WhatsApp
                </span>
              </button>
            </div>

            {/* Bottom Trim */}
            <div className="h-2 bg-gradient-to-r from-emerald-800 via-emerald-600 to-emerald-800" />
          </div>
        </div>
      </main>

      <footer className={`relative z-10 text-center py-6 px-4 transition-all duration-1000 delay-700 ${showContent ? "opacity-100" : "opacity-0"}`}>
        <p className="text-emerald-500/60 text-xs tracking-widest uppercase">Idul Fitri 1447 H</p>
      </footer>
    </div>
  );
}
