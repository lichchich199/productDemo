import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./loginForm.css";
import * as Constant from "../../untils/constant";
import { useSelector, useDispatch } from "react-redux";
import { loginAsync, setFormValue } from "./slices";
import { RootState, AppDispatch } from "../../store";

export default function LoginForm() {
    
  const {} = useSelector((state : RootState) => state.login)
  const dispatch: AppDispatch = useDispatch();
  // validate shcema login form
  const validateSchema = Yup.object().shape({
    email: Yup.string()
      .required(Constant.MESSAGE_VALIDATE_REQUIRED_EMAIL)
      .email(Constant.MESSAGE_VALIDATE_INVALID_EMAIL),
    password: Yup.string().required(
      Constant.MESSAGE_VALIDATE_REQUIRED_PASSWORD
    ),
  });
  const formOptions = { resolver: yupResolver(validateSchema) };

  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const dispatchLoginAsync = (data: any) => {
    console.log(data);
    dispatch(loginAsync());
  };

  const dispatchSetFormValue = (e : any) => {
    const { name, value } = e.target
    dispatch(setFormValue({ name, value }))
  }

  //todo xử lí token authentication để lấy được thông tin login

  return (
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
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
              <li className="nav-item" role="presentation">
                <a
                  className="nav-link active"
                  id="tab-login"
                  data-mdb-toggle="pill"
                  href="#pills-login"
                  role="tab"
                  aria-controls="pills-login"
                  aria-selected="true"
                >
                  Login
                </a>
              </li>
              <li className="nav-item" role="presentation">
                <a
                  className="nav-link"
                  id="tab-register"
                  data-mdb-toggle="pill"
                  href="#pills-register"
                  role="tab"
                  aria-controls="pills-register"
                  aria-selected="false"
                >
                  Register
                </a>
              </li>
            </ul>
            <div className="tab-content">
              <div
                className="tab-pane fade show active "
                id="pills-login"
                role="tabpanel"
                aria-labelledby="tab-login"
              >
                <form onSubmit={handleSubmit(dispatchLoginAsync)}>
                  <div className="text-center mb-3">
                    <h6>Please login to your account</h6>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      {...register("email")}
                      className={`form-control ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      placeholder="Email"
                      onChange={dispatchSetFormValue}
                    />
                    <div className="invalid-feedback">
                      {errors?.email?.message?.toString()}
                    </div>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      {...register("password")}
                      className={`form-control ${
                        errors.password ? "is-invalid" : ""
                      }`}
                      placeholder="Password"
                    />
                    <div className="invalid-feedback">
                      {errors?.password?.message?.toString()}
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-md-6 d-flex ">
                      <div className="form-check mb-3 mb-md-0">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="loginCheck"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="loginCheck"
                        >
                          {" "}
                          Remember me{" "}
                        </label>
                      </div>
                    </div>

                    <div className="col-md-6 d-flex justify-content-end">
                      <a href="#!">Forgot password?</a>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-block mb-4"
                  >
                    Sign in
                  </button>

                  <div className="text-center">
                    <p className="small mt-2 pt-1 mb-0">
                      Don't have an account?{" "}
                      <a href="#!" className="link-danger">
                        Register
                      </a>
                    </p>
                  </div>
                </form>
              </div>
              <div
                className="tab-pane fade "
                id="pills-register"
                role="tabpanel"
                aria-labelledby="tab-register"
              >
                <form>
                  <div className="text-center mb-3"></div>

                  <p className="text-center"></p>

                  <div className="form-outline mb-4 mt-4">
                    <input
                      type="text"
                      id="registerName"
                      className="form-control"
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      id="registerUsername"
                      className="form-control"
                    />
                    <label className="form-label" htmlFor="registerUsername">
                      Username
                    </label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="registerEmail"
                      className="form-control"
                    />
                    <label className="form-label" htmlFor="registerEmail">
                      Email
                    </label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="registerPassword"
                      className="form-control"
                    />
                    <label className="form-label" htmlFor="registerPassword">
                      Password
                    </label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="registerRepeatPassword"
                      className="form-control"
                    />
                    <label
                      className="form-label"
                      htmlFor="registerRepeatPassword"
                    >
                      Repeat password
                    </label>
                  </div>

                  <div className="form-check d-flex justify-content-center mb-4">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      value=""
                      id="registerCheck"
                      defaultChecked
                      aria-describedby="registerCheckHelpText"
                    />
                    <label className="form-check-label" htmlFor="registerCheck">
                      I have read and agree to the terms
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-block mb-3"
                  >
                    Sign in
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
