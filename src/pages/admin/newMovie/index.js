import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { gql, useMutation } from '@apollo/client';
import TitlePage from "../../../components/UI/Title/TitlePage";
import { CREATE_MOVIE } from "../../../graphql/queries/movies";
import InputSignup from "../../../components/UI/InputSignup/InputSignup";
import styles from "./index.module.scss";
import withAdmin from "../../../HOC/withAdmin";
import CategoryAdmin from "../../../components/category/categoryAdmin/CategoryAdmin"
import AddActor from "../../../components/actor/AddActor";


const Index = () => {
  const router = useRouter();
  const [movie, setMovie] = useState({});
  const [superSub, setSuperSub] = useState();
  const [categId, setCategId] = useState([])
  const [categName, setCategName] = useState([])
  const [actors, setActors] = useState([]);

  const AddActor = (e) => {
    e.preventDefault();
    if (!actors.includes(e.target.actor.value)) {
      setActors([...actors, e.target.actor.value])
    }
  }

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

  const deleteActor = (actor) => {
    setActors(actors.filter(name => name != actor));
  }

  return (
    <div className={styles.form__movie}>
      <h1 className="text-center">
        Ajouter un film au catalogue.
      </h1>
      <form className={styles.form} onSubmit={e => {
        e.preventDefault();
        createMovie({
          variables: {
            name: movie.name,
            time: movie.time,
            image: movie.image,
            video: movie.video,
            description: movie.description,
            year: movie.year,
            superSub: superSub,
            category: categId,
            actor: actors
          }
        });
      }}
      >
        <InputSignup
          type="checkbox"
          label="Premium"
          id="superSub"
          name="superSub"
          onChange={() => {
            setSuperSub(!superSub);
          }}
        />
        <InputSignup
          type="number"
          placeholder="Année"
          id="year"
          name="year"
          required={true}
          onChange={(e) => {
            setMovie({ ...movie, year: parseInt(e.target.value) });
          }}
        />
        <InputSignup
          type="text"
          id="name"
          name="name"
          placeholder="Nom"
          required={true}
          onChange={(e) => {
            setMovie({ ...movie, name: e.target.value });
          }}
        />
        <InputSignup
          type="number"
          id="time"
          name="time"
          placeholder="Durée"
          required={true}
          onChange={(e) => {
            setMovie({ ...movie, time: parseInt(e.target.value) });
          }}
        />
        <InputSignup
          type="url"
          id="image"
          name="image"
          placeholder="Couverture"
          required={true}
          onChange={(e) => {
            setMovie({ ...movie, image: e.target.value });
          }}
        />
        <InputSignup
          type="url"
          id="video"
          name="video"
          placeholder="Teaser"
          required={true}
          onChange={(e) => {
            setMovie({ ...movie, video: e.target.value });
          }}
        />
        <InputSignup
          type="text"
          id="description"
          name="description"
          placeholder="Description"
          required={true}
          onChange={(e) => {
            setMovie({ ...movie, description: e.target.value });
          }}
        />
        <div className={styles.list__item}>
          {
            categName.map((item) => (
              <div key={item}>
                <p>{item} </p>
                <p onClick={() => deleteCateg(item)}>❌</p>
              </div>
            ))
          }
        </div>
        <CategoryAdmin onChange={(e) => {
          addCateg(e.target.value)
        }} />
        <div className={styles.submit__movie}>
          <button className="btn btn-red-long" type="submit" >Ajouter film</button>
        </div>

      </form>
      <div>
        {actors && (
          <div className={styles.list__item}>
            {
              actors.map((actor) => (
                <div key={actor}>
                  <p>{actor}</p>
                  <p onClick={() => deleteActor(actor)}>❌</p>
                </div>
              ))
            }
          </div>
        )
        }
        <form onSubmit={AddActor}>
          <InputSignup
            type="text"
            placeholder="Acteurs"
            id="actor"
            name="actor"
            required={true}
          />
          <button className="btn btn-muted" type="submit">Ajouter acteur</button>
        </form>
      </div>
    </div>
  );
};

export default withAdmin(Index);