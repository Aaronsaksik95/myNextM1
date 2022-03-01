import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from '@apollo/client';
import InputSignup from "../../../components/UI/InputSignup/InputSignup";
import styles from "./index.module.scss";
import withAdmin from "../../../HOC/withAdmin";
import { CREATE_CATEGORY } from "../../../graphql/queries/categories";

const Index = () => {
  const router = useRouter();
  const [category, setCategory] = useState({});

  const [createCategory, { data, loading, error }] = useMutation(CREATE_CATEGORY);

  return (
    <div className={styles.form__category}>
      <h1 className="text-center">
        Ajouter un film au catalogue.
      </h1>
      <form className={styles.form} onSubmit={e => {
        e.preventDefault();
        createCategory({
          variables: {
            name: category.name
          }
        });
      }}
      >
        <InputSignup
          type="text"
          id="name"
          name="name"
          placeholder="Nom"
          required={true}
          onChange={(e) => {
            setCategory({ ...category, name: e.target.value });
          }}
        />
        <div className={styles.submit__movie}>
          <button className="btn btn-red-long" type="submit" >Ajouter catégorie</button>
        </div>
      </form>
    </div>
  );
};

export default withAdmin(Index);
