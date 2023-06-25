import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { AppDispatch, RootState } from '../../store';
import { getProductAsync, setError, setSelectedProduct } from './slices';
import { sortCommon } from '../../utils/sortCommon';

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

type Props = {
    currentPage: number;
    limit: number;
};

export default function ProductInfomation({
    currentPage = 1,
    limit = 1,
}: Props) {
    const {
        products,
        productListSortParams,
        selectedProduct,
        error,
        statusDelete,
    } = useSelector((state: RootState) => state.listProduct);
    const dispatch: AppDispatch = useDispatch();
    useEffect(() => {
        dispatch(getProductAsync());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [statusDelete]);
    var productList = sortCommon(products, productListSortParams);
    productList = productList.slice(
        limit * (currentPage - 1),
        limit * (currentPage - 1) + limit
    );
    const dispatchSelectedProduct = (id: string) => {
        dispatch(setSelectedProduct({ id: id }));
    };
    console.log('selected:', selectedProduct);
    return (
        <div className='row'>
            {error && <p>{error}</p>}
            {productList.map((product: ProductFieldName, index) => {
                return (
                    <div
                        key={index}
                        className='col-lg-2 col-md-6 mb-4'
                        onClick={() => {
                            dispatchSelectedProduct(product._id.toString());
                            dispatch(setError({ message: '' }));
                        }}
                    >
                        <div
                            className={`card h-100 ${
                                selectedProduct[0] === product._id.toString()
                                    ? 'bg-info'
                                    : ''
                            }`}
                        >
                            <div className='card-body' role='button'>
                                <div>
                                    <p>
                                        <img
                                            className='card-img-top'
                                            src={
                                                product.image.length > 0
                                                    ? product.image[0].toString()
                                                    : ''
                                            }
                                            alt=''
                                        />
                                    </p>
                                </div>
                                <div>
                                    <h4 className='card-title'>
                                        <p>{product.name || ''}</p>
                                    </h4>
                                    <h5>{product.price.toString()} đ</h5>
                                    <p className='card-text'>
                                        {product.description}
                                    </p>
                                </div>
                            </div>
                            <div className='card-footer d-flex justify-content-between'>
                                <small className='text-muted'>
                                    Sold: {product.quantitySolded.toString()}
                                </small>
                                <small className='text-muted'>
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
