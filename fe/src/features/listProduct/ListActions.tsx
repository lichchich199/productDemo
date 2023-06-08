import { ChangeEvent, KeyboardEvent, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { faList, faTable } from '@fortawesome/fontawesome-free-solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { AppDispatch, RootState } from '../../store';
import { getProductAsync, setFormValue } from './slices';

type FormFieldName = 'name';

export default function ActionsList() {
    const { searchQuery } = useSelector(
        (state: RootState) => state.listProduct
    );
    const dispatch: AppDispatch = useDispatch();
    console.log('data tại list:', searchQuery);
    useEffect(() => {
        dispatch(getProductAsync());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // dispatch action to change value of state
    const dispatchSetFormValue = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        dispatch(setFormValue({ name: name as FormFieldName, value }));
    };
    // dispatch action to search product
    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            dispatch(getProductAsync());
        }
    };
    return (
        <div className="row mb-3">
            <div className="col-6">
                <span>Sort By : </span>
                <button type="button">Price Tăng Dần</button>
                <button type="button">Price Giảm Dần</button>
                <button type="button">Date Tăng Dần</button>
                <button type="button">Date Giảm Dần</button>
            </div>
            <div className="col-5 d-flex justify-content-between">
                <input
                    id="q"
                    aria-label="Search Product"
                    placeholder="Search By Name"
                    type="search"
                    name="name"
                    defaultValue={''}
                    onChange={dispatchSetFormValue}
                    onKeyDown={handleKeyDown}
                />
                <button type="submit">New</button>
            </div>
            <div className="col-1">
                <div className="d-flex" style={{ marginLeft: 'auto' }}>
                    <div
                        style={{ margin: '0 10px', cursor: 'pointer' }}
                        onClick={() => {}}
                    >
                        <FontAwesomeIcon icon={faList as any} />
                    </div>
                    <div style={{ cursor: 'pointer' }} onClick={() => {}}>
                        <FontAwesomeIcon icon={faTable as any} />
                    </div>
                </div>
            </div>
        </div>
    );
}
