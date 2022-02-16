import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { gql, useMutation } from '@apollo/client';
import TitlePage from "../../../components/UI/Title/TitlePage";
import { CREATE_MOVIE } from "../../../graphql/queries/movies";
import Input from "../../../components/UI/Input/Input";
import styles from "./index.module.scss";
import withAdmin from "../../../HOC/withAdmin";
import CategoryAdmin from "../../../components/category/categoryAdmin/CategoryAdmin"

const Index = () => {
  const router = useRouter();
  const [movie, setMovie] = useState({});
  const [categId, setCategId] = useState([])
  const [categName, setCategName] = useState([])

  const [createMovie, { data, loading, error }] = useMutation(CREATE_MOVIE);

  const addCateg = (value) => {
    const category = JSON.parse(value)
    if (!categId.includes(category.id)) {
      setCategId([...categId, category.id])
      setCategName([...categName, category.name])
    }
  }

  const deleteCateg = (item) => {
    const indexCateg = categName.indexOf(item)
    setCategName(categName.filter(name => name != item));
    const arrayId = [...categId];
    arrayId.splice(indexCateg, 1);
    setCategId(arrayId);
  }

  return (
    <div className="page__register">
      <TitlePage title="Film" />
      <p className="text-center">
        Ajouter un film au catalogue.
      </p>
      <form className={styles.form__movie} onSubmit={e => {
        e.preventDefault();
        createMovie({
          variables: {
            name: movie.name,
            time: movie.time,
            image: movie.image,
            video: movie.video,
            description: movie.description,
            year: movie.year,
            category: categId,
            actor: movie.actor
          }
        });
      }}
      >
        <Input
          type="text"
          label="Nom"
          id="name"
          name="name"
          placeholder="Nom du film"
          required={true}
          onChange={(e) => {
            setMovie({ ...movie, name: e.target.value });
          }}
        />
        <Input
          type="number"
          label="Durée"
          id="time"
          name="time"
          placeholder="Durée du film"
          required={true}
          onChange={(e) => {
            setMovie({ ...movie, time: parseInt(e.target.value) });
          }}
        />
        <Input
          type="url"
          label="Image"
          id="image"
          name="image"
          placeholder="Couverture"
          required={true}
          onChange={(e) => {
            setMovie({ ...movie, image: e.target.value });
          }}
        />
        <Input
          type="url"
          label="Video"
          id="video"
          name="video"
          placeholder="Teaser"
          required={true}
          onChange={(e) => {
            setMovie({ ...movie, video: e.target.value });
          }}
        />
        <Input
          type="text"
          label="Description"
          id="description"
          name="description"
          placeholdedescriptionr="Description du film"
          required={true}
          onChange={(e) => {
            setMovie({ ...movie, description: e.target.value });
          }}
        />
        <Input
          type="number"
          label="Année"
          id="year"
          name="year"
          required={true}
          onChange={(e) => {
            console.log(e.target.value)
            setMovie({ ...movie, year: parseInt(e.target.value) });
          }}
        />
        {
          categName.map((item) => (
            <div key={item}>
              <p>{item} </p>
              <p onClick={() => deleteCateg(item)}>Supprimer</p>
            </div>
          ))
        }

        <CategoryAdmin onChange={(e) => {
          addCateg(e.target.value)
        }} />
        <Input
          type="text"
          label="Acteur"
          id="actor"
          name="actor"
          required={true}
          onChange={(e) => {
            setMovie({ ...movie, actor: e.target.value });
          }}
        />
        <input className="btn btn-black" type="submit" value="Ajouter" />
      </form>
    </div>
  );
};

export default withAdmin(Index);
