export default function CategoryList() {
    return (
        <div className="col-lg-2">
            <h4 className="mb-4"> All product categories</h4>
            <div className="list-group">
                <p className="list-group-item active" role="button">
                    Clothes
                </p>
                <p className="list-group-item" role="button">
                    Shoes
                </p>
                <p className="list-group-item" role="button">
                    Accessory
                </p>
            </div>
        </div>
    );
}
