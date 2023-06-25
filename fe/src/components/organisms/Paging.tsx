import { useState } from 'react';
import './paging.css';

type Props = {
    currentPage: number;
    totalPage: number;
    setCurrentPage: (numberPage: number) => void;
};

export const onChange = () => {};

export default function Paging({
    currentPage = 1,
    totalPage = 5,
    setCurrentPage,
}: Props) {
    //use curPage state to render component
    const [curPage, setCurPage] = useState(currentPage);
    const nextPage = () => {
        let tempCurPage = curPage;
        if (++tempCurPage <= totalPage) {
            setCurrentPage(tempCurPage);
            setCurPage(tempCurPage);
        }
    };
    const backPage = () => {
        let tempCurPage = curPage;
        if (--tempCurPage >= 1) {
            setCurrentPage(tempCurPage);
            setCurPage(tempCurPage);
        }
    };
    return (
        <nav aria-label='Page navigation example' style={{ marginLeft: '50%' }}>
            <ul className='pagination'>
                <li
                    className='page-item'
                    onClick={() => {
                        backPage();
                    }}
                >
                    <button className='btn page-button' aria-label='Previous'>
                        <span aria-hidden='true'>&laquo;</span>
                        <span className='sr-only'>Previous</span>
                    </button>
                </li>
                {Array.from({ length: totalPage }).map((_, index) => {
                    let numPage = ++index;
                    return (
                        <li
                            className={`page-item ${
                                currentPage === numPage ? 'btn-primary' : ''
                            }`}
                            onClick={() => {
                                setCurrentPage(numPage);
                                setCurPage(numPage);
                            }}
                        >
                            <button
                                className={`btn page-button ${
                                    currentPage === numPage ? 'btn-primary' : ''
                                }`}
                            >
                                {numPage}
                            </button>
                        </li>
                    );
                })}
                <li
                    className='page-item'
                    onClick={() => {
                        nextPage();
                    }}
                >
                    <button className='btn page-button' aria-label='Next'>
                        <span aria-hidden='true'>&raquo;</span>
                        <span className='sr-only'>Next</span>
                    </button>
                </li>
            </ul>
        </nav>
    );
}
