import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const MovieUpdate = (props) => {
  const { id } = useParams();
  const { movieList, setMovieList } = useState({
    title: "",
    director: "",
    metascore: 0,
    stars: [],
  });
  const { push, goBack } = useHistory();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        setMovieList(res.data);
      })
      .catch((err) =>
        console.error("Something went wrong here: ", err.message)
      );
  }, [id]);

  const handleChange = (e) => {
    e.preventDefault();
    setMovieList({
      ...movieList,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/movies/${id}`, movieList)
      .then((res) => {
        props.setMovieList(res.data);
        goBack();
      })
      .catch((err) => console.error("Something went wrong: ", err.message));
  };

  return (
    <div className="update-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={movieList.title}
          placeholder="Movie Title"
          onChange={handleChange}
        />
        <input
          type="text"
          name="director"
          value={movieList.director}
          placeholder="Movie Director"
          onChange={handleChange}
        />
        <input
          type="number"
          name="metascore"
          value={movieList.title}
          placeholder="100"
          onChange={handleChange}
        />
        <input
          type="text"
          name="stars"
          value={movieList.stars}
          placeholder="Movie Stars"
          onChange={handleChange}
        />
        <button className="update-movies-btn">Update</button>
      </form>
    </div>
  );
};

export default MovieUpdate;
