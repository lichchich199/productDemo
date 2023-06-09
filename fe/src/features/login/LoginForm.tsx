import { ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import './loginForm.css';
import * as Constant from '../../utils/constant';
import { useSelector, useDispatch } from 'react-redux';
import { loginAsync, setFormValue } from './slices';
import { RootState, AppDispatch } from '../../store';

type FormFieldName =
    | 'email'
    | 'password'
    | 'userId'
    | 'accessToken'
    | 'timestamp'
    | 'isAdminUser'
    | 'status';

export default function LoginForm() {
    const loginState = useSelector((state: RootState) => state.login);
    var errorMsg = loginState.error;
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

    // dispatch login action
    const dispatchLoginAsync = () => {
        dispatch(loginAsync());
    };

    // dispatch action to change value of state
    const dispatchSetFormValue = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch(setFormValue({ name: name as FormFieldName, value }));
    };
    //todo xử lí token authentication để lấy được thông tin login

    return (
        <form onSubmit={handleSubmit(dispatchLoginAsync)}>
            <div className="text-center mb-3">
                <h6>Please login to your account</h6>
            </div>

            {errorMsg && <div className="invalid-login">{errorMsg}</div>}
            <div className="form-outline mb-4">
                <input
                    type="text"
                    {...register('email')}
                    className={`form-control ${
                        errors.email ? 'is-invalid' : ''
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
                    type="password"
                    {...register('password')}
                    className={`form-control ${
                        errors.password ? 'is-invalid' : ''
                    }`}
                    placeholder="Password"
                    onChange={dispatchSetFormValue}
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
                            {' '}
                            Remember me{' '}
                        </label>
                    </div>
                </div>

                <div className="col-md-6 d-flex justify-content-end">
                    <a href="#!">Forgot password?</a>
                </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block mb-4">
                Sign in
            </button>

            <div className="text-center">
                <p className="small mt-2 pt-1 mb-0">Don't have an account?</p>
            </div>
        </form>
    );
}
