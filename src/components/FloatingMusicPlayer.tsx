import { useEffect, useMemo, useRef, useState } from "react";

const tracks = [
  {
    title: "微笑再美(塔菲版)",
    artist: "漂移的人（Drifting Man）",
    src: "/audio/smile-drifting-man.flac",
    type: "audio/flac",
    tag: "站长推荐",
  },
  {
    title: "So Cold",
    artist: "The Good Wife Trailer",
    src: "/audio/so-cold.mp3",
    type: "audio/mpeg",
    tag: "站长喜欢",
  },
  {
    title: "毒苹果",
    artist: "本地收藏",
    src: "/audio/poison-apple.mp3",
    type: "audio/mpeg",
    tag: "站长喜欢",
  },
  {
    title: "命运",
    artist: "本地收藏",
    src: "/audio/destiny.mp3",
    type: "audio/mpeg",
    tag: "站长喜欢",
  },
  {
    title: "无心斗艳",
    artist: "本地收藏",
    src: "/audio/wuxin-douyan.mp3",
    type: "audio/mpeg",
    tag: "站长喜欢",
  },
  {
    title: "If I were a boy",
    artist: "本地收藏",
    src: "/audio/if-i-were-a-boy.mp3",
    type: "audio/mpeg",
    tag: "站长喜欢",
  },
];

const MINIMIZED_STORAGE_KEY = "cmao2.musicPlayer.minimized";

function formatTime(value: number) {
  if (!Number.isFinite(value)) {
    return "0:00";
  }

  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${seconds}`;
}

function PlayIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5.8v12.4c0 .7.8 1.1 1.4.7l9.3-6.2c.5-.3.5-1.1 0-1.4L9.4 5.1C8.8 4.7 8 5.1 8 5.8Z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 5.8c0-.5.4-.8.8-.8h2.4c.5 0 .8.4.8.8v12.4c0 .5-.4.8-.8.8H7.8a.8.8 0 0 1-.8-.8V5.8Zm6 0c0-.5.4-.8.8-.8h2.4c.5 0 .8.4.8.8v12.4c0 .5-.4.8-.8.8h-2.4a.8.8 0 0 1-.8-.8V5.8Z" />
    </svg>
  );
}

function NextIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M5 6.2c0-.8.9-1.3 1.6-.8l7.3 5.1c.6.4.6 1.4 0 1.8l-7.3 5.1c-.7.5-1.6 0-1.6-.8V6.2Zm11-.2c0-.6.4-1 1-1h1c.6 0 1 .4 1 1v12c0 .6-.4 1-1 1h-1c-.6 0-1-.4-1-1V6Z" />
    </svg>
  );
}

function PrevIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 17.8c0 .8-.9 1.3-1.6.8l-7.3-5.1a1.1 1.1 0 0 1 0-1.8l7.3-5.1c.7-.5 1.6 0 1.6.8v10.4ZM8 18c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1V6c0-.6.4-1 1-1h1c.6 0 1 .4 1 1v12Z" />
    </svg>
  );
}

function HideIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
    </svg>
  );
}

function MusicIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 3.7c0-.6-.6-1-1.2-.8L9.3 5.1c-.4.1-.7.5-.7 1v8.1a3.7 3.7 0 1 0 1.8 3.2V8.1l5.8-1.7v5.9a3.7 3.7 0 1 0 1.8 3.2V3.7Z" />
    </svg>
  );
}

export default function FloatingMusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [message, setMessage] = useState("");
  const currentTrack = tracks[currentTrackIndex];

  const progress = useMemo(() => {
    if (!duration) {
      return 0;
    }

    return Math.min(100, Math.round((currentTime / duration) * 100));
  }, [currentTime, duration]);

  useEffect(() => {
    const savedValue = window.localStorage.getItem(MINIMIZED_STORAGE_KEY);
    setIsMinimized(savedValue === "true");

    function syncMinimizedState(event: StorageEvent) {
      if (event.key === MINIMIZED_STORAGE_KEY) {
        setIsMinimized(event.newValue === "true");
      }
    }

    window.addEventListener("storage", syncMinimizedState);

    return () => {
      window.removeEventListener("storage", syncMinimizedState);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    function syncTime() {
      setCurrentTime(audio.currentTime);
    }

    function syncDuration() {
      setDuration(audio.duration || 0);
    }

    function handleEnded() {
      playTrack((currentTrackIndex + 1) % tracks.length, true);
    }

    audio.addEventListener("timeupdate", syncTime);
    audio.addEventListener("loadedmetadata", syncDuration);
    audio.addEventListener("durationchange", syncDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", syncTime);
      audio.removeEventListener("loadedmetadata", syncDuration);
      audio.removeEventListener("durationchange", syncDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentTrackIndex]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.load();
    setCurrentTime(0);
    setDuration(0);

    if (isPlaying) {
      audio.play().catch(() => {
        setIsPlaying(false);
        setMessage("浏览器拦截了自动播放，请手动点一下。");
      });
    }
  }, [currentTrackIndex]);

  async function togglePlayback() {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
        setMessage("");
      } catch {
        setMessage("这首歌暂时没能播放，换一首试试。");
      }
      return;
    }

    audio.pause();
    setIsPlaying(false);
  }

  function playTrack(index: number, shouldPlay = isPlaying) {
    setCurrentTrackIndex(index);
    setMessage("");

    if (shouldPlay) {
      setIsPlaying(true);
    }
  }

  function nextTrack() {
    playTrack((currentTrackIndex + 1) % tracks.length);
  }

  function prevTrack() {
    playTrack((currentTrackIndex - 1 + tracks.length) % tracks.length);
  }

  function seek(value: string) {
    const audio = audioRef.current;

    if (!audio || !duration) {
      return;
    }

    const nextTime = (Number(value) / 100) * duration;
    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  }

  function updateMinimizedState(nextValue: boolean) {
    setIsMinimized(nextValue);
    window.localStorage.setItem(MINIMIZED_STORAGE_KEY, String(nextValue));

    if (nextValue) {
      setIsExpanded(false);
    }
  }

  return (
    <aside
      className={`fixed bottom-4 right-4 z-50 text-white transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] md:bottom-6 md:right-6 ${
        isMinimized
          ? "w-16 translate-x-1"
          : "w-[min(380px,calc(100vw-24px))] translate-x-0"
      }`}
    >
      <audio ref={audioRef} preload="metadata">
        <source src={currentTrack.src} type={currentTrack.type} />
      </audio>

      <button
        type="button"
        onClick={() => updateMinimizedState(false)}
        aria-label="展开音乐窗口"
        title="展开音乐窗口"
        className={`absolute bottom-0 right-0 grid h-14 w-14 place-items-center rounded-lg border border-cyan-200/20 bg-[#07111f]/95 text-cyan-50 shadow-2xl shadow-black/45 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-0.5 hover:border-cyan-100/45 focus:outline-none focus:ring-2 focus:ring-cyan-200/50 ${
          isMinimized ? "translate-x-0 scale-100 opacity-100" : "pointer-events-none translate-x-8 scale-90 opacity-0"
        }`}
      >
        <span className={`absolute inset-2 rounded-md bg-cyan-300/12 ${isPlaying ? "animate-pulse" : ""}`} />
        <span className="relative grid h-9 w-9 place-items-center rounded-lg bg-[radial-gradient(circle_at_35%_30%,rgba(103,232,249,0.46),rgba(20,184,166,0.22)_40%,rgba(15,23,42,0.9)_76%)]">
          <MusicIcon />
        </span>
      </button>

      <div
        className={`overflow-hidden rounded-lg border border-cyan-200/15 bg-[#07111f]/92 shadow-2xl shadow-black/45 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
          isMinimized
            ? "pointer-events-none translate-x-8 scale-95 opacity-0"
            : "translate-x-0 scale-100 opacity-100"
        }`}
      >
      <div className="bg-[linear-gradient(135deg,rgba(6,182,212,0.18),rgba(168,85,247,0.14),rgba(16,185,129,0.1))] p-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={togglePlayback}
            aria-label={isPlaying ? "暂停音乐" : "播放音乐"}
            title={isPlaying ? "暂停" : "播放"}
            className="grid h-12 w-12 shrink-0 place-items-center rounded-lg border border-cyan-200/25 bg-[radial-gradient(circle_at_35%_30%,rgba(103,232,249,0.45),rgba(20,184,166,0.24)_38%,rgba(15,23,42,0.86)_75%)] text-cyan-50 shadow-lg shadow-cyan-950/40 transition hover:scale-105 hover:border-cyan-100/45 focus:outline-none focus:ring-2 focus:ring-cyan-200/50"
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="rounded-md border border-cyan-200/15 bg-cyan-200/10 px-2 py-0.5 text-[11px] text-cyan-100">
                {currentTrack.tag}
              </span>
              <button
                type="button"
                onClick={() => setIsExpanded((value) => !value)}
                className="ml-auto rounded-md border border-white/10 bg-black/15 px-2 py-1 text-xs text-slate-100 transition hover:bg-white/10"
              >
                {isExpanded ? "收起" : "歌单"}
              </button>
              <button
                type="button"
                onClick={() => updateMinimizedState(true)}
                aria-label="隐藏音乐窗口"
                title="隐藏音乐窗口"
                className="grid h-7 w-7 place-items-center rounded-md border border-white/10 bg-black/15 text-slate-100 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-200/45"
              >
                <HideIcon />
              </button>
            </div>
            <p className="mt-2 truncate text-sm font-bold">{currentTrack.title}</p>
            <p className="truncate text-xs text-slate-300">{currentTrack.artist}</p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            onClick={prevTrack}
            aria-label="上一首"
            title="上一首"
            className="grid h-8 w-8 place-items-center rounded-lg border border-cyan-200/15 bg-black/25 text-cyan-100 transition hover:bg-cyan-200/10"
          >
            <PrevIcon />
          </button>

          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(event) => seek(event.currentTarget.value)}
            aria-label="播放进度"
            className="h-1.5 min-w-0 flex-1 accent-cyan-300"
          />

          <button
            type="button"
            onClick={nextTrack}
            aria-label="下一首"
            title="下一首"
            className="grid h-8 w-8 place-items-center rounded-lg border border-cyan-200/15 bg-black/25 text-cyan-100 transition hover:bg-cyan-200/10"
          >
            <NextIcon />
          </button>
        </div>

        <div className="mt-1 flex justify-between text-xs text-slate-300">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        {message && <p className="mt-2 text-xs text-amber-100">{message}</p>}
      </div>

      {isExpanded && (
        <div className="max-h-64 overflow-y-auto border-t border-cyan-200/10 bg-[#050b14]/96 p-2">
          {tracks.map((track, index) => (
            <button
              key={track.src}
              type="button"
              onClick={() => playTrack(index, true)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition ${
                index === currentTrackIndex ? "bg-cyan-300/14" : "hover:bg-white/8"
              }`}
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-cyan-200/15 bg-cyan-200/8 text-xs text-cyan-100">
                {index + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold">{track.title}</span>
                <span className="block truncate text-xs text-slate-400">{track.artist}</span>
              </span>
              <span className="rounded-md border border-white/10 px-2 py-1 text-[11px] text-slate-300">
                {track.tag}
              </span>
            </button>
          ))}
        </div>
      )}
      </div>
    </aside>
  );
}
