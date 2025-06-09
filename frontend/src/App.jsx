import React from "react";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { UserData } from "./context/User";
import Loading from "./components/Loading";
import Admin from "./pages/Admin";
import PlayList from "./pages/PlayList";
import Album from "./pages/Album";
import Player from "./components/Player";
import { SongData } from "./context/Song";

const App = () => {
  const { loading, user, isAuth } = UserData();
  const { selectedSong } = SongData()
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={isAuth ? <Home /> : <Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {isAuth && (
              <>
                <Route path="/playlist" element={<PlayList user={user} />} />
                <Route path="/album/:id" element={<Album user={user} />} />
                <Route path="/admin" element={<Admin />} />
              </>
            )}
          </Routes>

          {isAuth && selectedSong && <Player />}
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
