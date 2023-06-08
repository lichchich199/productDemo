import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

import Layout from '../components/organisms/Layout';
import { RootState } from '../store';
import ProductInfomationGrid from '../features/listProduct/ProductInfomationGrid';
import CategoryList from '../features/listProduct/CategoryList';
import ListActions from '../features/listProduct/ListActions';
import ProductInfomationTable from '../features/listProduct/ProductInfomationTable';

export default function ListProduct() {
    const navigate = useNavigate();
    const loginState = useSelector((state: RootState) => state.login);
    const [listStatus, setListStatus] = useState(true);

    // check login status
    useEffect(() => {
        const emailLocalStorage = localStorage.getItem('email') || '';
        if (!emailLocalStorage) {
            navigate(`/`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loginState.email]);
    return (
        <Layout>
            <div className="row" style={{ marginTop: '4%', marginRight: '0' }}>
                <CategoryList />
                <div className="col-lg-10">
                    <ListActions />
                    {listStatus ? (
                        <ProductInfomationGrid />
                    ) : (
                        <ProductInfomationTable />
                    )}
                </div>
            </div>
        </Layout>
    );
}