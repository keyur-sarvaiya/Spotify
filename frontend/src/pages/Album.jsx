import { useEffect } from "react";
import Layout from "../components/Layout";
import { SongData } from "../context/Song";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { UserData } from "../context/User";
import { FaBookmark, FaPlay, FaPause, FaRegBookmark } from "react-icons/fa";

const Album = () => {
  const {
    fetchAlbumSong,
    albumSong,
    albumData,
    selectedSong,
    isPlaying,
    handlePlayPauseSong
  } = SongData();

  const params = useParams();
  const { addToPlaylist, user } = UserData();

  useEffect(() => {
    fetchAlbumSong(params.id);
  }, [params.id]);

  const playList = user?.playlist || [];

  const savetoPlaylistHandler = (songId) => {
    addToPlaylist(songId);
  };


  return (
    <Layout>
      {albumData && (
        <>
          <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-center">
            {albumData.thumbnail && (
              <img
                src={albumData.thumbnail.url}
                className="w-48 rounded"
                alt=""
              />
            )}

            <div className="flex flex-col">
              <p>Playlist</p>
              <h2 className="text-3xl font-bold mb-4 md:text-5xl">
                {albumData.title} PlayList
              </h2>
              <h4>{albumData.description}</h4>
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
          {albumSong &&
            albumSong.map((e, i) => {
              const isActive = selectedSong === e._id && isPlaying;

              return (
                <div
                  key={i}
                  className={`grid grid-cols-2 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7] cursor-pointer
                    ${isActive
                      ? "bg-[#ffffff2b]"
                      : "hover:bg-[#5221212b]"
                    }
                  `}
                >
                  <p className={`text-white flex items-center`}>
                    <b className="mr-4 text-[#a7a7a7]">{i + 1}</b>
                    <img
                      src={e.thumbnail.url}
                      className="inline w-10 mr-5 rounded"
                      alt=""
                    />
                    {e.title}
                  </p>
                  <p className="text-[15px] hidden sm:flex items-center">{e.singer}</p>
                  <p className="text-[15px] hidden sm:flex items-center">
                    {e.description.slice(0, 20)}...
                  </p>
                  <div className="flex justify-end sm:justify-center mr-2 sm:mr-0 items-center gap-5">
                    <span
                      className="text-[15px] text-center cursor-pointer"
                      onClick={() => savetoPlaylistHandler(e._id)}
                    >
                      {playList.includes(e._id) ? <FaBookmark /> : <FaRegBookmark />}
                    </span>

                    <span
                      className="text-[15px] text-center cursor-pointer flex items-center justify-center"
                      onClick={() => handlePlayPauseSong(e._id)}
                    >
                      {isActive ? <FaPause /> : <FaPlay />}
                    </span>
                  </div>
                </div>
              );
            })}
        </>
      )}
    </Layout>
  );
};

export default Album;

