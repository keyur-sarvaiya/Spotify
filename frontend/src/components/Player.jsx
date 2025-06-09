import React, { useEffect, useRef, useState } from "react";
import { SongData } from "../context/Song";
import { GrChapterNext, GrChapterPrevious } from "react-icons/gr";
import { FaPause, FaPlay } from "react-icons/fa";

const Player = () => {
  const {
    song,
    fetchSingleSong,
    selectedSong,
    isPlaying,
    setIsPlaying,
    nextMusic,
    prevMusic
  } = SongData();

  const audioRef = useRef(null);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (selectedSong && song?._id !== selectedSong) {
      fetchSingleSong();
    }
  }, [selectedSong]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleTimeUpdate = () => setProgress(audio.currentTime);
    const handleEnded = () => nextMusic(); // Auto play next song

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [song]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }, [isPlaying, song]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleProgressChange = (e) => {
    const newProgress = parseFloat(e.target.value);
    const newTime = (newProgress / 100) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setProgress(newTime);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black text-white h-auto sm:h-24 w-full flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 gap-3 sm:gap-0 pb-2 pt-3 md:pt-0">
      {/* Left - Song Info */}
      <div className="flex items-center gap-3 w-full sm:w-1/3 min-w-0">
        <img
          src={
            song.thumbnail?.url ||
            "https://plus.unsplash.com/premium_photo-1734545294150-3d6c417c5cfb?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          className="w-12 h-12 md:w-14 md:h-14 object-cover rounded-md flex-shrink-0"
          alt="thumbnail"
        />
        <div className="block min-w-0">
          <p className="text-sm font-semibold truncate max-w-[140px] sm:max-w-full">{song.title}</p>
          <p className="text-xs text-gray-400 truncate max-w-[140px] sm:max-w-full">
            {song.description?.slice(0, 30)}...
          </p>
        </div>
      </div>

      {/* Center - Controls */}
      <div className="flex flex-col-reverse sm:flex-col items-center justify-center w-full sm:w-1/3 gap-1 sm:gap-2 max-w-full px-2 sm:px-0">
        {song.audio && <audio ref={audioRef} src={song.audio.url} autoPlay={false} />}

        <div className="flex items-center gap-6 pb-2 md:pb-0 flex-wrap justify-center">
          <button onClick={prevMusic} className="text-xl hover:text-green-400 transition">
            <GrChapterPrevious />
          </button>
          <button
            className="bg-white text-black rounded-full p-3 hover:scale-105 transition"
            onClick={handlePlayPause}
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button onClick={nextMusic} className="text-xl hover:text-green-400 transition">
            <GrChapterNext />
          </button>
        </div>

        <div className="flex items-center gap-2 w-full max-w-md min-w-0">
          <span className="text-xs text-gray-400 flex-shrink-0">{formatTime(progress)}</span>
          <input
            type="range"
            min="0"
            max="100"
            value={(progress / duration) * 100 || 0}
            onChange={handleProgressChange}
            className="w-full accent-green-400"
          />
          <span className="text-xs text-gray-400 flex-shrink-0">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Right - Volume */}
      <div className="hidden sm:flex items-center justify-end sm:w-1/3 pr-4">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="md:w-32 sm:w-20 accent-green-400"
        />
      </div>
    </div>
  );
};

export default Player;