import React from 'react';

import { getCategories } from "../../../graphql/queries/categories";
import { useQuery } from "@apollo/react-hooks";
import styles from './Category.module.scss'


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
        <select className={styles.category__admin} name="categories" id="categories-select" onChange={props.onChange} >
            
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