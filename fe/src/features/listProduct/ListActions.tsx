import { ChangeEvent, KeyboardEvent, MouseEvent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { faList, faTable } from '@fortawesome/fontawesome-free-solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { AppDispatch } from '../../store';
import {
    getProductAsync,
    setCustomSortParam,
    setFormValue,
    SortParamKey,
} from './slices';

type FormFieldName = 'name';
interface ActionsListProps {
    handleChangStatusList: (value: boolean) => void;
}

export default function ActionsList({
    handleChangStatusList,
}: ActionsListProps) {
    const dispatch: AppDispatch = useDispatch();
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
    return (
        <div className="row mb-3">
            <div className="col-6">
                <span>Sort By : </span>
                <button
                    type="button"
                    name="price"
                    value="DESC"
                    onClick={(e) => handleSort(e)}
                >
                    Price Tăng Dần
                </button>
                <button
                    type="button"
                    name="price"
                    value="ASC"
                    onClick={(e) => handleSort(e)}
                >
                    Price Giảm Dần
                </button>
                <button
                    type="button"
                    name="createdAt"
                    value="DESC"
                    onClick={(e) => handleSort(e)}
                >
                    Date Tăng Dần
                </button>
                <button
                    type="button"
                    name="createdAt"
                    value="ASC"
                    onClick={(e) => handleSort(e)}
                >
                    Date Giảm Dần
                </button>
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
