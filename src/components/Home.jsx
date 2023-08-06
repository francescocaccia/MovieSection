import React, { useState, useRef, useEffect } from "react";
import film from "../film.svg";
import DeNiro from "../Goodfellas.mp4";
import "../App.css";
import { Button, Container, FormControl } from "react-bootstrap";
import { VscUnmute } from "react-icons/vsc";
import { IoVolumeMuteOutline } from "react-icons/io5";

const Home = () => {
  const API_KEY = "979f3094";
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    // Imposta lo stato iniziale di isMuted in base al valore muted del video
    setIsMuted(videoRef.current.muted);
  }, []);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
      );
      const data = await response.json();
      console.log(data);
      if (data.Search) {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleAudio = () => {
    const video = videoRef.current;
    if (video) {
      // Inverti il valore di muted direttamente sul video
      video.muted = !video.muted;
      // Imposta lo stato isMuted in base al valore attuale di muted del video
      setIsMuted(video.muted);
    }
  };

  return (
    <>
      <div className="header">
        <div className="preview-container d-flex align-items-center">
          <video
            ref={videoRef}
            autoPlay
            muted={isMuted}
            loop
            className="video-bg"
          >
            <source src={DeNiro} type="video/mp4" />
          </video>
          <div id="preview-overlay">
            <div id="preview-details">
              <img
                src={film}
                width={80}
                height={80}
                alt="Film Icon"
                className="opacityCentral"
              />
              <h1 className="opacityCentral">Movie Section</h1>
              <div className="d-flex opacityCentral">
                <FormControl
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter movie title..."
                  className="form-control form-control-custom"
                />
                <Button onClick={handleSearch} className="btn btn-danger ml-2">
                  Search
                </Button>
                <Button
                  variant="outline-light"
                  onClick={handleToggleAudio}
                  className="btn ml-2"
                >
                  {isMuted ? <VscUnmute /> : <IoVolumeMuteOutline />}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* fine header */}
      <div className="cardContainer">
        <div className="row row-cols-1 row-cols-md-3">
          {movies.map((movie) => (
            <div key={movie.imdbID} className="col mb-4">
              <div className="card h-100 movie-card">
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className="card-img-top movie-image"
                />
                <div className="card-body text-center">
                  <h5 className="card-title movie-title">{movie.Title}</h5>
                  <p className="card-text movie-year">Year: {movie.Year}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
