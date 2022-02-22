import React from 'react';

import { getCategories } from "../../../graphql/queries/categories";
import { useQuery } from "@apollo/react-hooks";


const CategoryAdmin = (props) => {
    const { loading, error, data } = useQuery(getCategories);
    if (loading) {
        return "";
    }

    if (error) {
        console.log(error);
        return null;
    }
    return (
        <select name="categories" id="categories-select" onChange={props.onChange} >
            <option>
                Choix Catégories
            </option>
            {
                data.getCategories.map((category) => (
                    <option value={JSON.stringify(category)} key={category.id}>
                        {category.name}
                    </option>
                ))
            }
        </select >
    );
};

export default CategoryAdmin;