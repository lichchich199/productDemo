import { useForm } from 'react-hook-form';
import Select, { MultiValue } from 'react-select';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { AppDispatch } from '../../store';
import { useDispatch } from 'react-redux';
import { addProductAsync } from './slices';
// import { addProductAsync } from './slices';

type Props = {
    valuesEdit: string;
    mode: string;
    titleButton: string;
    onSubmit: (data: object) => void;
};

interface OptionType {
    value: string;
    label: string;
}

type formAddType = {
    name: string;
    price: number;
    brand: string;
    category: string;
    image: string[];
    color: string[];
    size: number[];
    quantity: number;
    description: string;
};

// form add edit project
export default function AddForm(props: Props) {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    // validate
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        price: Yup.string().required('Price is required'),
        brand: Yup.string().required('Brand is required'),
        category: Yup.string().required('Category is required'),
        image: Yup.string().required('Image is required'),
        color: Yup.array().min(1, 'Color is required'),
        size: Yup.string().required('Size is required'),
        quantity: Yup.string().required('Quantity is required'),
        description: Yup.string().max(255, 'Max length is 255 character'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };
    // values default

    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    const handleSelectChange = (selectedOptions: MultiValue<OptionType>) => {
        const selectedValues = selectedOptions.map((option) => option.value);
        const fakeEvent = {
            target: {
                name: 'color',
                value: selectedValues,
            },
        };
        console.log('data select:', selectedValues);
        register('color').onChange(fakeEvent);
    };

    const dispatchAddProduct = (data: formAddType) => {
        dispatch(addProductAsync(data));
    };

    console.log('errors', errors);
    return (
        <form
            onSubmit={handleSubmit((data) => {
                console.log(data);
                // dispatchAddProduct(data)
                // props.onSubmit(data);
            })}
        >
            <div className="form-row d-flex justify-content-between">
                <div className="form-group col-5">
                    <label>Name</label>
                    <input
                        type="text"
                        {...register('name')}
                        className={`form-control ${
                            errors.name ? 'is-invalid' : ''
                        }`}
                    />
                    <div className="invalid-feedback">
                        {errors?.name?.message?.toString()}
                    </div>
                </div>
                <div className="form-group col-5">
                    <label>Price</label>
                    <input
                        type="number"
                        {...register('price')}
                        className={`form-control ${
                            errors.price ? 'is-invalid' : ''
                        }`}
                    />
                    <div className="invalid-feedback">
                        {errors.price?.message?.toString()}
                    </div>
                </div>
            </div>

            <div className="form-row">
                <div className="form-group col">
                    <label>Brand</label>
                    <select
                        className={`form-control ${
                            errors.brand ? 'is-invalid' : ''
                        }`}
                        {...register('brand')}
                        aria-label="Default select example"
                    >
                        <option value="">Choose brand...</option>
                        <option value="1">Krik</option>
                        <option value="2">SecondHand</option>
                        <option value="3">Bee</option>
                    </select>
                    <div className="invalid-feedback">
                        {errors.brand?.message?.toString()}
                    </div>
                </div>
            </div>

            <div className="form-row">
                <div className="form-group col">
                    <label>Category</label>
                    <select
                        className={`form-control ${
                            errors.category ? 'is-invalid' : ''
                        }`}
                        {...register('category')}
                        aria-label="Default select example"
                    >
                        <option value="">Choose category...</option>
                        <option value="1">Clothes</option>
                        <option value="2">Shoes</option>
                        <option value="3">Accessory</option>
                    </select>
                    <div className="invalid-feedback">
                        {errors.category?.message?.toString()}
                    </div>
                </div>
            </div>

            <div className="form-row">
                <div className="form-group col">
                    <label>Image</label>
                    <input
                        type="text"
                        {...register('image')}
                        className={`form-control ${
                            errors.image ? 'is-invalid' : ''
                        }`}
                    />
                    <div className="invalid-feedback">
                        {errors.image?.message?.toString()}
                    </div>
                </div>
            </div>

            <div className="form-row">
                <div className="form-group col">
                    <label>Color</label>
                    <Select
                        {...register('color')}
                        isMulti
                        options={[
                            { value: 'black', label: 'Black' },
                            { value: 'white', label: 'White' },
                            { value: 'mix', label: 'Mix' },
                        ]}
                        onChange={handleSelectChange}
                    />
                    <input
                        type="hidden"
                        className={`${errors.color ? 'is-invalid' : ''}`}
                    ></input>
                    <div className="invalid-feedback">
                        {errors.color?.message?.toString()}
                    </div>
                </div>
            </div>

            <div className="form-row">
                <div className="form-group col">
                    <label>Size</label>
                    <input
                        type="text"
                        {...register('size')}
                        className={`form-control ${
                            errors.size ? 'is-invalid' : ''
                        }`}
                    />
                    <div className="invalid-feedback">
                        {errors.size?.message?.toString()}
                    </div>
                </div>
            </div>

            <div className="form-row">
                <div className="form-group col">
                    <label>Quantity</label>
                    <input
                        type="number"
                        {...register('quantity')}
                        className={`form-control ${
                            errors.quantity ? 'is-invalid' : ''
                        }`}
                    />
                    <div className="invalid-feedback">
                        {errors.quantity?.message?.toString()}
                    </div>
                </div>
            </div>

            <div className="form-row">
                <div className="form-group col">
                    <label>Desctiption</label>
                    <input
                        type="text"
                        {...register('description')}
                        className={`form-control ${
                            errors.description ? 'is-invalid' : ''
                        }`}
                    />
                    <div className="invalid-feedback">
                        {errors.description?.message?.toString()}
                    </div>
                </div>
            </div>

            <div className="d-flex mt-4 justi">
                <div className="form-group">
                    <button type="submit" className="btn btn-primary mr-1">
                        {props.titleButton}
                    </button>
                </div>
                <div className="form-group">
                    <button
                        type="button"
                        className="btn btn-secondary mr-1"
                        onClick={() => {
                            navigate(-1);
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </form>
    );
}
