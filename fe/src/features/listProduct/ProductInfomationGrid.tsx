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

export default function ProductInfomation() {
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
            {products.map((product: ProductFieldName, index) => {
                return (
                        <div key={index} className="col-lg-2 col-md-6 mb-4">
                            <div className="card h-100">
                                <div className="card-body" role="button">
                                    <div>
                                        <p>
                                            <img
                                                className="card-img-top"
                                                src={
                                                    product.image.length > 0
                                                        ? product.image[0].toString()
                                                        : ''
                                                }
                                                alt=""
                                            />
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="card-title">
                                            <p>{product.name || ''}</p>
                                        </h4>
                                        <h5>{product.price.toString()} đ</h5>
                                        <p className="card-text">
                                            {product.description}
                                        </p>
                                    </div>
                                </div>
                                <div className="card-footer d-flex justify-content-between">
                                    <small className="text-muted">
                                        Sold:{' '}
                                        {product.quantitySolded.toString()}
                                    </small>
                                    <small className="text-muted">
                                        &#9733; &#9733; &#9733; &#9733; &#9734;
                                    </small>
                                </div>
                            </div>
                        </div>
                );
            })}
        </div>
    );
}
