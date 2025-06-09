import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { SongData } from "../context/Song";
import { assets } from "../assets/assets";
import { FaBookmark, FaPlay, FaPause } from "react-icons/fa";
import { UserData } from "../context/User";

const PlayList = ({ user }) => {
  const {
    songs,
    handlePlayPauseSong,
    selectedSong,
    isPlaying,
  } = SongData();

  const [myPlaylist, setMyPlaylist] = useState([]);

  useEffect(() => {
    if (songs && user && Array.isArray(user.playlist)) {
      const filteredSongs = songs.filter((e) =>
        user.playlist.includes(e._id.toString())
      );
      setMyPlaylist(filteredSongs);
    }
  }, [songs, user]);

  const { addToPlaylist } = UserData();

  const savePlayListHandler = (id) => {
    addToPlaylist(id);
  };

  return (
    <Layout>
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-center">
        {myPlaylist && myPlaylist[0] ? (
          <img
            src={myPlaylist[0].thumbnail.url}
            className="w-48 rounded"
            alt=""
          />
        ) : (
          <img
            src="https://plus.unsplash.com/premium_photo-1734545294150-3d6c417c5cfb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8"
            className="w-48 rounded"
            alt=""
          />
        )}

        <div className="flex flex-col">
          <p>Playlist</p>
          <h2 className="text-3xl font-bold mb-4 md:text-5xl">
            {user.name} PlayList
          </h2>
          <h4>Your Favourite songs</h4>
          <p className="mt-1">
            <img
              src={assets.spotify_logo}
              className="inline-block w-6"
              alt=""
            />
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
        <p>
          <b className="mr-4">#</b>
        </p>
        <p className="hidden sm:block">Artist</p>
        <p className="hidden sm:block">Description</p>
        <p className="text-end sm:text-center mr-2 sm:mr-0">Actions</p>
      </div>
      <hr />

      {myPlaylist &&
        myPlaylist.map((e, i) => {
          const isActive = selectedSong === e._id && isPlaying;

          return (
            <div
              className="grid grid-cols-2 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer items-center"
              key={i}
            >
              <p className="text-white flex items-center">
                <b className="mr-4 text-[#a7a7a7]">{i + 1}</b>
                <img
                  src={e.thumbnail.url}
                  className="inline w-10 mr-5"
                  alt=""
                />
                {e.title}
              </p>
              <p className="text-[15px] hidden sm:block">{e.singer}</p>
              <p className="text-[15px] hidden sm:block">
                {e.description.slice(0, 20)}...
              </p>
              <div className="flex justify-end sm:justify-center items-center mr-2 sm:mr-0 gap-5">
                <span
                  className="text-[15px] text-center"
                  onClick={() => savePlayListHandler(e._id)}
                >
                  <FaBookmark />
                </span>
                <span
                  className="text-[15px] text-center"
                  onClick={() => handlePlayPauseSong(e._id)}
                >
                  {isActive ? <FaPause /> : <FaPlay />}
                </span>
              </div>
            </div>
          );
        })}
    </Layout>
  );
};

export default PlayList;
