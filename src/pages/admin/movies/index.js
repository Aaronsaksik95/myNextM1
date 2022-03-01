import React from 'react';
import { getCategories } from "../../../graphql/queries/categories";
import { useQuery } from "@apollo/react-hooks";
import AdminGrid from '../../../components/grid/adminGrid/AdminGrid';
import styles from "./index.module.scss";
import { useRouter } from 'next/router';
import withAdmin from '../../../HOC/withAdmin';

const Index = () => {
    const router = useRouter()
    var params = router.query

    const { loading, error, data } = useQuery(getCategories);
    if (loading) {
        return "";
    }

    if (error) {
        console.log(error);
        return null;
    }
    return (
        <div>
            <AdminGrid category={params.category} />
        </div>
    );
}

export default withAdmin(Index);
