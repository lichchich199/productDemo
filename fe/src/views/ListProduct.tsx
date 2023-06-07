import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { faList, faTable } from '@fortawesome/fontawesome-free-solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Layout from '../components/organisms/Layout'
import { AppDispatch, RootState } from '../store'
import { getProductAsync } from '../features/listProduct/slices'

export default function ListProduct() {
    const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch();

    const loginState = useSelector((state : RootState) => state.login)

    // check login status
    useEffect(() => {
        const emailLocalStorage = localStorage.getItem("email")
        if (!emailLocalStorage) {
          navigate(`/`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [loginState.email])
    useEffect(() => {
        dispatch(getProductAsync())
    })
  return (
    <Layout>
        <div>
            <div className="row" style={{marginTop: '4%', marginRight: '0'}}>

                <div className="col-lg-2">

                    <div className="list-group">
                        <p className="list-group-item">Category 1</p>
                        <p className="list-group-item">Category 2</p>
                        <p className="list-group-item">Category 3</p>
                    </div>

                </div>

                <div className="col-lg-10">
                <div className="row mb-3">
                    <div className='col-6'>
                        <span>Sort By : </span>
                        <button type="button">Price Tăng Dần</button>
                        <button type="button">Price Giảm Dần</button>
                        <button type="button">Date Tăng Dần</button>
                        <button type="button">Date Giảm Dần</button>
                    </div>
                    <div className='col-5'>
                        <input
                            id="q"
                            aria-label="Search contacts"
                            placeholder="Search By Name"
                            type="search"
                            name="q"
                            defaultValue={''}
                        />
                        <button type="submit">New</button>
                    </div>
                    <div className='col-1'>
                        <div className='d-flex' style={{marginLeft: 'auto'}}>
                        <div style={{margin: '0 10px', cursor:'pointer'}} onClick={() => {}}>
                            <FontAwesomeIcon icon={faList as any}/>    
                        </div>
                        <div style={{ cursor:'pointer'}} onClick={() => {}}>
                            <FontAwesomeIcon icon={faTable as any}/>
                        </div>
                </div>
                    </div>
                </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-6 mb-4">
                            <div className="card h-100">
                                <p><img className="card-img-top" src="assets/img/placeholder_700x400.png" alt=""/></p>
                                <div className="card-body">
                                    <h4 className="card-title">
                                        <p>Sản phẩm One</p>
                                    </h4>
                                    <h5>$24.99</h5>
                                    <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet
                                        numquam aspernatur!</p>
                                </div>
                                <div className="card-footer">
                                    <small className="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}
