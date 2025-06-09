import { useEffect, useState } from "react";
import { FaBookmark, FaPlay, FaRegBookmark, FaPause } from "react-icons/fa";
import { UserData } from "../context/User";
import { SongData } from "../context/Song";

const SongItem = ({ image, name, desc, id }) => {
  const [saved, setSaved] = useState(false);

  const { addToPlaylist, user } = UserData();
  const { isPlaying, selectedSong, handlePlayPauseSong } = SongData();

  const playList = user?.playlist || [];

  useEffect(() => {
    if (playList.includes(id)) {
      setSaved(true);
    }
  }, [user, id, playList]);

  const savetoPlaylistHandler = () => {
    setSaved(!saved);
    addToPlaylist(id);
  };

  // Determine if this song is the currently selected song AND is playing
  const isActive = selectedSong === id && isPlaying;

  return (
    <div
      className={`min-w-[160px] max-w-[160px] p-2 rounded cursor-pointer 
        ${isActive ? "bg-[#ffffff26]" : "hover:bg-[#ffffff26]"}
      `}
    >
      <div className="relative group">
        <img src={image} className="rounded w-full h-auto" alt={name} />
        <div className="flex gap-2">
          <button
            className={`absolute bottom-2 right-14 bg-green-500 text-black p-3 rounded-full
              transition-opacity duration-300
              ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
            `}
            onClick={() => handlePlayPauseSong(id)}
          >
            {isActive ? <FaPause /> : <FaPlay />}
          </button>
          <button
            className={`absolute bottom-2 right-2 bg-green-500 text-black p-3 rounded-full
              transition-opacity duration-300
              ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
            `}
            onClick={savetoPlaylistHandler}
          >
            {saved ? <FaBookmark /> : <FaRegBookmark />}
          </button>
        </div>
      </div>
      <p className="font-bold mt-2 mb-1 line-clamp-2" title={name}>
        {name}
      </p>
      <p className="text-slate-200 text-sm line-clamp-3" title={desc}>
        {desc}
      </p>
    </div>
  );
};

export default SongItem;
