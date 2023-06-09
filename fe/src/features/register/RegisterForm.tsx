import { ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import './registerForm.css';
import * as Constant from '../../utils/constant';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { registerAsync, setFormValue } from './slices';
import { useSelector } from 'react-redux';

type FormFieldName =
    | 'firstName'
    | 'lastName'
    | 'email'
    | 'password'
    | 'phoneNumber'
    | 'city'
    | 'building'
    | 'district'
    | 'status';

export default function RegisterForm() {
    const registerState = useSelector((state: RootState) => state.register);
    var errorMsg = registerState.error;
    console.log('stateErr Msg', errorMsg);
    const dispatch: AppDispatch = useDispatch();
    // validate shcema login form
    const validateSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('First Name is required')
            .max(255, 'Max length is 255 character'),
        lastName: Yup.string()
            .required('"Last Name is required"')
            .max(255, 'Max length is 255 character'),
        email: Yup.string()
            .required(Constant.MESSAGE_VALIDATE_REQUIRED_EMAIL)
            .email(Constant.MESSAGE_VALIDATE_INVALID_EMAIL),
        password: Yup.string()
            .required(Constant.MESSAGE_VALIDATE_REQUIRED_PASSWORD)
            .min(6, 'Password must be at least 6 characters'),
        confirmPassword: Yup.string()
            .required(Constant.MESSAGE_VALIDATE_REQUIRED_PASSWORD)
            .oneOf([Yup.ref('password')], 'Password is incorrect'),
        phoneNumber: Yup.string()
            .required('Phone Number is required')
            .matches(/^\d{11}$/, 'Phone Number is invalid'),
        city: Yup.string().max(255, 'Max length is 255 character'),
        district: Yup.string().max(255, 'Max length is 255 character'),
        building: Yup.string().max(255, 'Max length is 255 character'),
        agreeTerm: Yup.boolean().oneOf(
            [true],
            'You must to agree to the terms'
        ),
    });
    const formOptions = { resolver: yupResolver(validateSchema) };
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    // dispatch action to change value of state
    const dispatchSetFormValue = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch(setFormValue({ name: name as FormFieldName, value }));
    };
    //todo xử lí token authentication để lấy được thông tin login

    // dispatch login action
    const dispatchRegisterAsync = () => {
        dispatch(registerAsync());
    };
    return (
        <form onSubmit={handleSubmit(dispatchRegisterAsync)}>
            {errorMsg && <div className="invalid-register">{errorMsg}</div>}
            <div className="form-outline mb-4">
                <input
                    type="text"
                    {...register('firstName')}
                    className={`form-control ${
                        errors.firstName ? 'is-invalid' : ''
                    }`}
                    placeholder="First name"
                    onChange={dispatchSetFormValue}
                />
                <div className="invalid-feedback">
                    {errors?.firstName?.message?.toString()}
                </div>
            </div>

            <div className="form-outline mb-4">
                <input
                    type="text"
                    {...register('lastName')}
                    className={`form-control ${
                        errors.lastName ? 'is-invalid' : ''
                    }`}
                    placeholder="Last name"
                    onChange={dispatchSetFormValue}
                />
                <div className="invalid-feedback">
                    {errors?.lastName?.message?.toString()}
                </div>
            </div>

            <div className="form-outline mb-4">
                <input
                    type="text"
                    {...register('email')}
                    className={`form-control ${
                        errors.email || errorMsg ? 'is-invalid' : ''
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

            <div className="form-outline mb-4">
                <input
                    type="confirmPassword"
                    {...register('confirmPassword')}
                    className={`form-control ${
                        errors.confirmPassword ? 'is-invalid' : ''
                    }`}
                    placeholder="Confirm password"
                    onChange={dispatchSetFormValue}
                />
                <div className="invalid-feedback">
                    {errors?.confirmPassword?.message?.toString()}
                </div>
            </div>

            <div className="form-outline mb-4">
                <input
                    type="text"
                    {...register('phoneNumber')}
                    className={`form-control ${
                        errors.phoneNumber ? 'is-invalid' : ''
                    }`}
                    placeholder="Phone number"
                    onChange={dispatchSetFormValue}
                />
                <div className="invalid-feedback">
                    {errors?.phoneNumber?.message?.toString()}
                </div>
            </div>

            <div className="form-outline mb-4">
                <input
                    type="text"
                    {...register('city')}
                    className={`form-control ${
                        errors.city ? 'is-invalid' : ''
                    }`}
                    placeholder="City"
                    onChange={dispatchSetFormValue}
                />
                <div className="invalid-feedback">
                    {errors?.city?.message?.toString()}
                </div>
            </div>

            <div className="form-outline mb-4">
                <input
                    type="text"
                    {...register('district')}
                    className={`form-control ${
                        errors.district ? 'is-invalid' : ''
                    }`}
                    placeholder="District"
                    onChange={dispatchSetFormValue}
                />
                <div className="invalid-feedback">
                    {errors?.district?.message?.toString()}
                </div>
            </div>

            <div className="form-outline mb-4">
                <input
                    type="text"
                    {...register('building')}
                    className={`form-control ${
                        errors.building ? 'is-invalid' : ''
                    }`}
                    placeholder="Building"
                    onChange={dispatchSetFormValue}
                />
                <div className="invalid-feedback">
                    {errors?.building?.message?.toString()}
                </div>
            </div>

            <div className="invalid-feedback">
                {errors?.agreeTerm?.message?.toString()}
            </div>
            <div className="form-check d-flex justify-content-center mb-4">
                <input
                    className="form-check-input me-2"
                    type="checkbox"
                    {...register('agreeTerm')}
                    onChange={dispatchSetFormValue}
                />
                <label className="form-check-label" htmlFor="agreeTerm">
                    I have read and agree to the terms
                </label>
            </div>

            <button type="submit" className="btn btn-primary btn-block mb-3">
                Submit
            </button>
        </form>
    );
}
