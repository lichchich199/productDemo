import Layout from '../components/organisms/Layout';
import AddForm from '../features/addProduct/AddForm';

export default function AddProduct() {
    return (
        <Layout>
            <div
                className="row"
                style={{ marginTop: '4%', marginRight: '0', minHeight: '74vh' }}
            >
                <div className="col-lg-2">
                    <h4 className="mb-4"> Add product</h4>
                </div>
                <div className="col-lg-8">
                    <AddForm
                        mode="add"
                        onSubmit={(data) => data}
                        titleButton="Add"
                        valuesEdit="true"
                    />
                </div>
            </div>
        </Layout>
    );
}
