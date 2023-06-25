import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

import Layout from '../components/organisms/Layout';
import { RootState } from '../store';
import ProductInfomationGrid from '../features/listProduct/ProductInfomationGrid';
import CategoryList from '../features/listProduct/CategoryList';
import ListActions from '../features/listProduct/ListActions';
import ProductInfomationTable from '../features/listProduct/ProductInfomationTable';
import Paging from '../components/organisms/Paging';
import { LITMIT_PRODUCT } from '../utils/constant';

export default function ListProduct() {
    const navigate = useNavigate();
    const loginState = useSelector((state: RootState) => state.login);
    const { products } = useSelector((state: RootState) => state.listProduct);
    const [listStatus, setListStatus] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    let totalPage = 2;
    // check login status
    useEffect(() => {
        const emailLocalStorage = localStorage.getItem('email') || '';
        if (!emailLocalStorage) {
            navigate(`/`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loginState.email]);

    const handleChangStatusList = (value: boolean) => {
        setListStatus(value);
    };
    return (
        <Layout>
            <div
                className='row'
                style={{ marginTop: '4%', marginRight: '0', minHeight: '74vh' }}
            >
                <CategoryList />
                <div className='col-lg-10'>
                    <ListActions
                        handleChangStatusList={handleChangStatusList}
                    />
                    {listStatus ? (
                        <ProductInfomationTable
                            currentPage={currentPage}
                            limit={LITMIT_PRODUCT}
                        />
                    ) : (
                        <ProductInfomationGrid
                            currentPage={currentPage}
                            limit={LITMIT_PRODUCT}
                        />
                    )}
                </div>
            </div>
            {products.length > 0 ? (
                <Paging
                    currentPage={currentPage}
                    totalPage={totalPage}
                    setCurrentPage={(page) => {
                        setCurrentPage(page);
                    }}
                />
            ) : (
                <></>
            )}
        </Layout>
    );
}
