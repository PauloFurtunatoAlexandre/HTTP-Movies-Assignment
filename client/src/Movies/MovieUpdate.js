import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialValue = {
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

const MovieUpdate = (props) => {
  const { push } = useHistory();
  const { id } = useParams();
  console.log(id);
  const [movie, setMovie] = useState(initialValue);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        console.log(res);
        setMovie(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    e.preventDefault();
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then((res) => {
        console.log(res);
				setMovie(res.data);
				push("/");
				window.location.reload();
      })
      .catch((err) => console.log(`${err.response}`));
  };

  return (
    <div className="update-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={movie.title}
          placeholder="Movie Title"
          onChange={handleChange}
        />
        <input
          type="text"
          name="director"
          value={movie.director}
          placeholder="Movie Director"
          onChange={handleChange}
        />
        <input
          type="number"
          name="metascore"
          value={movie.title}
          placeholder="100"
          onChange={handleChange}
        />
        <input
          type="text"
          name="stars"
          value={movie.stars}
          placeholder="Movie Stars"
          onChange={handleChange}
        />
        <button className="update-movies-btn">Update</button>
      </form>
    </div>
  );
};

export default MovieUpdate;
