import Layout from "../components/Layout";
import { SongData } from "../context/Song";
import AlbumItem from "../components/AlbumItem";
import SongItem from "../components/SongItem";

const Home = () => {
  const { songs, albums } = SongData();

  // Group songs by album ID
  const songsByAlbum = albums.map(album => ({
    album,
    songs: songs.filter(song => song.album === album._id),
  }));

  return (
    <Layout>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
        <div className="flex overflow-auto">
          {albums.map((e, i) => (
            <AlbumItem
              key={i}
              image={e.thumbnail.url}
              name={e.title}
              desc={e.description}
              id={e._id}
            />
          ))}
        </div>  
      </div>

      {/* Songs grouped by album */}
      {songsByAlbum.map(({ album, songs }, idx) => (
        <div key={idx} className="mb-8">
          <h2 className="my-3 font-semibold text-xl">{album.title}</h2>
          <div className="flex overflow-auto">
            {songs.map((song, i) => (
              <SongItem
                key={i}
                image={song.thumbnail.url}
                name={song.title}
                desc={song.description}
                id={song._id}
              />
            ))}
          </div>
        </div>
      ))}
    </Layout>
  );
};

export default Home;
