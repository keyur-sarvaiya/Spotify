import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../utils/axios.js"

const SongContext = createContext();

// eslint-disable-next-line react/prop-types
export const SongProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [songLoading] = useState(true);

  const [selectedSong, setSelectedSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  async function fetchSongs() {
    try {
      const { data } = await axiosInstance.get("/api/song/all");

      setSongs(data);
      // setSelectedSong(data[0]._id);
      setIsPlaying(false);
    } catch (error) {
      console.log(error);
    }
  }

  const [song, setSong] = useState([]);

  async function fetchSingleSong() {
    try {
      const { data } = await axiosInstance.get("/api/song/single/" + selectedSong);

      setSong(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function addAlbum(formData, setTitle, setDescription, setFile) {
    setLoading(true);
    try {
      const { data } = await axiosInstance.post("/api/song/album/new", formData);
      toast.success(data.message);
      setLoading(false);
      fetchAlbums();
      setTitle("");
      setDescription("");
      setFile(null);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  }

  async function addSong(
    formData,
    setTitle,
    setDescription,
    setFile,
    setSinger,
    setAlbum
  ) {
    setLoading(true);
    try {
      const { data } = await axiosInstance.post("/api/song/new", formData);
      toast.success(data.message);
      setLoading(false);
      fetchSongs();
      setTitle("");
      setDescription("");
      setFile(null);
      setSinger("");
      setAlbum("");
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  }

  async function addThumbnail(id, formData, setFile) {
    setLoading(true);
    try {
      const { data } = await axiosInstance.post("/api/song/" + id, formData);
      toast.success(data.message);
      setLoading(false);
      fetchSongs();
      setFile(null);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  }

  const [albums, setAlbums] = useState([]);

  async function fetchAlbums() {
    try {
      const { data } = await axiosInstance.get("/api/song/album/all");

      setAlbums(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteSong(id) {
    try {
      const { data } = await axiosInstance.delete("/api/song/" + id);

      toast.success(data.message);
      fetchSongs();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    fetchSongs();
    fetchAlbums();
  }, []);

  const [index, setIndex] = useState(0);

  function nextMusic() {
    if (index === songs.length - 1) {
      setIndex(0);
      setSelectedSong(songs[0]._id);
    } else {
      setIndex(index + 1);
      setSelectedSong(songs[index + 1]._id);
    }
  }
  function prevMusic() {
    if (index === 0) {
      return null;
    } else {
      setIndex(index - 1);
      setSelectedSong(songs[index - 1]._id);
    }
  }

  const [albumSong, setAlbumSong] = useState([]);
  const [albumData, setAlbumData] = useState([]);

  async function fetchAlbumSong(id) {
    try {
      const { data } = await axiosInstance.get("/api/song/album/" + id);
      setAlbumSong(data.songs);
      setAlbumData(data.album);
    } catch (error) {
      console.log(error);
    }
  }

  const handlePlayPauseSong = (id) => {
    if (selectedSong !== id) {
      setSelectedSong(id);
      setIsPlaying(true);
    } else {
      setIsPlaying(prev => !prev);
    }
  };

  useEffect(() => {
    if (selectedSong && songs.length > 0) {
      const newIndex = songs.findIndex((song) => song._id === selectedSong);
      if (newIndex !== -1) {
        setIndex(newIndex);
      }
    }
  }, [selectedSong, songs]);


  return (
    <SongContext.Provider
      value={{
        songs,
        addAlbum,
        loading,
        songLoading,
        albums,
        addSong,
        addThumbnail,
        deleteSong,
        fetchSingleSong,
        song,
        setSelectedSong,
        isPlaying,
        setIsPlaying,
        selectedSong,
        nextMusic,
        prevMusic,
        fetchAlbumSong,
        albumSong,
        albumData,
        fetchSongs,
        fetchAlbums,
        handlePlayPauseSong
      }}
    >
      {children}
    </SongContext.Provider>
  );
};

export const SongData = () => useContext(SongContext);
