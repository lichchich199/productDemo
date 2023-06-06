import { useEffect, useState } from "react";
import LoginForm from "../features/login/LoginForm";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import RegisterForm from "../features/register/RegisterForm";

export default function Login() {
  const [isLoginTab, setIsLoginTab] = useState(true);
  const navigate = useNavigate()
  const { email } = useSelector((state : RootState) => state.login)
  const emailLocalStorage = localStorage.getItem("email")
  useEffect(() => {
    if (emailLocalStorage) {
      navigate(`/product/list`);
    }
  }, [email, emailLocalStorage])
  return (

<section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center h-100" style={{paddingTop: '10%'}}>
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Sample"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 ">
            <ul
              className="nav nav-pills nav-justified mb-3 md-4"
              id="ex1"
              role="tablist"
            >
              <li className={`nav-item ${isLoginTab ? 'activeTab' : ''}`} role="presentation" onClick={() => {setIsLoginTab(true)}}>
                  Login
              </li>
              <li className={`nav-item ${!isLoginTab ? 'activeTab' : ''}`} role="presentation" onClick={() => {setIsLoginTab(false)}}>
                  Register
              </li>
            </ul>
            <div className="tab-content">
              <div
                className={`tab-pane fade ${isLoginTab ? 'show active' : ''}`}
                id="pills-login"
                role="tabpanel"
                aria-labelledby="tab-login"
              >
                  <LoginForm/>
              </div>
              <div
                className={`tab-pane fade ${!isLoginTab ? 'show active' : ''}`}
                id="pills-register"
                role="tabpanel"
                aria-labelledby="tab-register"
              >
                <RegisterForm/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
  );
}
