import { ChangeEvent, KeyboardEvent, MouseEvent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
    faList,
    faTable,
    faSortDown,
    faSortUp,
} from '@fortawesome/fontawesome-free-solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { AppDispatch, RootState } from '../../store';
import {
    deleteProductAsync,
    getProductAsync,
    setCustomSortParam,
    setError,
    setFormValue,
    SortParamKey,
} from './slices';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

type FormFieldName = 'name';
interface ActionsListProps {
    handleChangStatusList: (value: boolean) => void;
}

export default function ActionsList({
    handleChangStatusList,
}: ActionsListProps) {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    var { productListSortParams, selectedProduct } = useSelector(
        (state: RootState) => state.listProduct
    );
    useEffect(() => {
        dispatch(getProductAsync());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // dispatch action to change value of state
    const dispatchSetFormValue = (event: ChangeEvent<HTMLInputElement>) => {
        var { name, value } = event.target;
        dispatch(setFormValue({ name: name as FormFieldName, value }));
    };
    // dispatch action to search product
    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            dispatch(getProductAsync());
        }
    };
    // handle sort
    const handleSort = (event: MouseEvent<HTMLButtonElement>) => {
        const { name, value } = event.currentTarget;
        dispatch(setCustomSortParam({ name: name as SortParamKey, value }));
    };
    // dispatch delete product
    const dispatchDeleteProduct = () => {
        if (selectedProduct.length > 0) {
            dispatch(deleteProductAsync(selectedProduct[0]));
            dispatch(setError({ message: '' }));
        } else {
            let errorMsg = 'Please select one product!';
            dispatch(setError({ message: errorMsg }));
        }
    };
    return (
        <div className='row mb-3'>
            <div className='col-6 d-flex'>
                <div style={{ flex: '1' }}>
                    <span>Price : </span>
                    <button
                        className={`btn ${
                            productListSortParams[0].orderBy === 'ASC' &&
                            productListSortParams[0].status
                                ? 'btn-primary'
                                : ''
                        }`}
                        type='button'
                        name='price'
                        value='ASC'
                        onClick={(e) => handleSort(e)}
                    >
                        <FontAwesomeIcon icon={faSortUp as any} />
                    </button>
                    <button
                        className={`btn ${
                            productListSortParams[0].orderBy === 'DESC' &&
                            productListSortParams[0].status
                                ? 'btn-primary'
                                : ''
                        }`}
                        type='button'
                        name='price'
                        value='DESC'
                        onClick={(e) => handleSort(e)}
                    >
                        <FontAwesomeIcon icon={faSortDown as any} />
                    </button>
                </div>
                <div style={{ flex: '3' }}>
                    <span>Created At : </span>
                    <button
                        className={`btn ${
                            productListSortParams[1].orderBy === 'ASC' &&
                            productListSortParams[1].status
                                ? 'btn-primary'
                                : ''
                        }`}
                        type='button'
                        name='createdAt'
                        value='ASC'
                        onClick={(e) => handleSort(e)}
                    >
                        <FontAwesomeIcon icon={faSortUp as any} />
                    </button>
                    <button
                        className={`btn ${
                            productListSortParams[1].orderBy === 'DESC' &&
                            productListSortParams[1].status
                                ? 'btn-primary'
                                : ''
                        }`}
                        type='button'
                        name='createdAt'
                        value='DESC'
                        onClick={(e) => handleSort(e)}
                    >
                        <FontAwesomeIcon icon={faSortDown as any} />
                    </button>
                </div>
            </div>
            <div className='col-5 d-flex justify-content-between'>
                <input
                    id='q'
                    aria-label='Search Product'
                    placeholder='Search By Name'
                    type='search'
                    name='name'
                    defaultValue={''}
                    onChange={dispatchSetFormValue}
                    onKeyDown={handleKeyDown}
                />
                <button
                    type='button'
                    onClick={() => {
                        dispatchDeleteProduct();
                    }}
                >
                    Delete
                </button>
                <button
                    type='button'
                    onClick={() => {
                        navigate(`/product/add`);
                    }}
                >
                    New
                </button>
            </div>
            <div className='col-1'>
                <div className='d-flex' style={{ marginLeft: 'auto' }}>
                    <div
                        style={{ margin: '0 10px', cursor: 'pointer' }}
                        onClick={() => {
                            handleChangStatusList(true);
                        }}
                    >
                        <FontAwesomeIcon icon={faList as any} />
                    </div>
                    <div
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            handleChangStatusList(false);
                        }}
                    >
                        <FontAwesomeIcon icon={faTable as any} />
                    </div>
                </div>
            </div>
        </div>
    );
}
