import { useEffect, useMemo, useRef, useState } from "react";

const AUDIO_SRC = "/audio/smile-drifting-man.flac";

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

export default function FloatingMusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const progress = useMemo(() => {
    if (!duration) {
      return 0;
    }

    return Math.min(100, Math.round((currentTime / duration) * 100));
  }, [currentTime, duration]);

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
      setIsPlaying(false);
      setCurrentTime(0);
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
  }, []);

  async function togglePlayback() {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (audio.paused) {
      await audio.play();
      setIsPlaying(true);
      return;
    }

    audio.pause();
    setIsPlaying(false);
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

  return (
    <aside className="fixed bottom-5 right-5 z-50 w-[min(320px,calc(100vw-32px))] rounded-lg border border-white/15 bg-slate-950/90 p-4 text-white shadow-2xl shadow-black/35 backdrop-blur md:bottom-6 md:right-6">
      <audio ref={audioRef} preload="metadata">
        <source src={AUDIO_SRC} type="audio/flac" />
      </audio>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={togglePlayback}
          aria-label={isPlaying ? "暂停音乐" : "播放音乐"}
          title={isPlaying ? "暂停" : "播放"}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-emerald-400 text-slate-950 transition hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-200"
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">微笑再美(塔菲版)</p>
          <p className="truncate text-xs text-slate-300">漂移的人（Drifting Man）</p>
        </div>
      </div>

      <div className="mt-3">
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={(event) => seek(event.currentTarget.value)}
          aria-label="播放进度"
          className="h-1.5 w-full accent-emerald-300"
        />
        <div className="mt-1 flex justify-between text-xs text-slate-400">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </aside>
  );
}
