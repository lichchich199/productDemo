import { useState } from "react"
import "./header.css"
import { useDispatch } from "react-redux";
import { logout } from "../../features/login/slices";
import { useNavigate } from "react-router";

export default function Header() {
    const [isShowSetting, setIsShowSetting] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const dispatchLogout = () => {
        dispatch(logout());
        navigate('/')
    }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    <div className="container-fluid">
        <p className="navbar-brand mt-2 mt-lg-0">
            <h5 className="pt-1">LVN</h5>
        </p>
        <button className="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <i className="fas fa-bars"></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <p className="nav-link">Statistics</p>
                </li>
                <li className="nav-item">
                    <p className="nav-link">Projects</p>
                </li>
            </ul>

            <div className="d-flex align-items-center justify-content-start">
                <div className={`dropdown`}>
                    <p className="dropdown-toggle d-flex align-items-center hidden-arrow" id="navbarDropdownMenuAvatar" role="button" data-mdb-toggle="dropdown" aria-expanded="false" onClick={() => {setIsShowSetting(!isShowSetting)}}>
                        <img src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" className="rounded-circle" height="25" alt="Black and White Portrait of a Man" loading="lazy" />
                    </p>
                    <ul className={`dropdown-menu dropdown-menu-end  ${isShowSetting ? 'poupUser' : ''}`} aria-labelledby="navbarDropdownMenuAvatar">
                        <li>
                            <button className="dropdown-item" >My profile</button>
                        </li>
                        <li>
                            <button className="dropdown-item" >Settings</button>
                        </li>
                        <li>
                            <button className="dropdown-item" onClick={() => dispatchLogout()} >Logout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</nav>
  )
}
