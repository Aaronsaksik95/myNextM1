import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { gql, useMutation } from '@apollo/client';
import Input from "../../../components/UI/Input/Input";
import styles from "./index.module.scss";
import withAdmin from "../../../HOC/withAdmin";
import { CREATE_CATEGORY } from "../../../graphql/queries/categories";

const Index = () => {
  const router = useRouter();
  const [category, setCategory] = useState({});

  const [createCategory, { data, loading, error }] = useMutation(CREATE_CATEGORY);

  return (
    <div className="page__register">
      <p className="text-center">
        Ajouter une catégorie.
      </p>
      <form className={styles.form__movie} onSubmit={e => {
        e.preventDefault();
        createCategory({
          variables: {
            name: category.name
          }
        });
      }}
      >
        <Input
          type="text"
          label="Nom"
          id="name"
          name="name"
          placeholder="Nom de la catégorie"
          required={true}
          onChange={(e) => {
            setCategory({ ...category, name: e.target.value });
          }}
        />
        <input className="btn btn-black" type="submit" value="Ajouter" />
      </form>
    </div>
  );
};

export default withAdmin(Index);
