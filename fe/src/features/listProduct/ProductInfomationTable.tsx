import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { AppDispatch, RootState } from '../../store';
import { getProductAsync } from './slices';

type ProductFieldName = {
    _id: String;
    name: String;
    price: Number;
    brand: String;
    category: String;
    color: Object;
    createdAt: String;
    description: String;
    image: Array<String>;
    quantity: Number;
    quantitySolded: Number;
    size: Array<Number>;
    status: String;
};

export default function ProductInfomationTable() {
    const { products, searchQuery } = useSelector(
        (state: RootState) => state.listProduct
    );
    const dispatch: AppDispatch = useDispatch();
    console.log('data tại list:', searchQuery);
    useEffect(() => {
        dispatch(getProductAsync());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="row">
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Quantity Solded</th>
                        <th>Description</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product: ProductFieldName, index) => {
                        return (
                            <tr onClick={() => {}}>
                                <td>{++index}</td>
                                <td>{product.name}</td>
                                <td>{product.price.toString()}</td>
                                <td>{product.quantity.toString()}</td>
                                <td>{product.quantitySolded.toString()}</td>
                                <td>{product.description}</td>
                                <td>{product.createdAt}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
