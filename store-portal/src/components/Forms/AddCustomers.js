import { useState, useEffect } from "react";
import axios from "axios";
import { uri } from "../../api.json";
import { useHistory } from "react-router-dom";
import Alert from "../Alerts/Alert";
import { ProgressBar } from "react-bootstrap";
import JoditEditor from "jodit-react";

const AddCustomers = () => {
    //success modal
    const [show, setShow] = useState(false);
    const handleClose = () => {
    setShow(false);
    history.push("/admin/products");
    };
    const handleShow = () => setShow(true);
    //success modal states end

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState([]);
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [brand, setBrand] = useState("");
    const [fetchBrands, setFetchedBrands] = useState([]);
    const [collection, setCollection] = useState("");
    const [fetchCollections, setFetchedCollections] = useState([]);
    const [status, setStatus] = useState("");
    const [path, setPath] = useState("");
    const [buttonCheck, setButtonCheck] = useState(false);
    const [uploadPercentage, setUploadPercentage] = useState(0);

    const history = useHistory();
    const onChangeTitle = (event) => {
    setTitle(event.target.value);
    };
    const onChangeDescription = (value) => {
    setDescription(value);
    };
    const onChangeImage = (event) => {
    setImage(event.target.files[0]);
    };
    const onChangePrice = (event) => {
    setPrice(event.target.value);
    };
    const onChangeQuantity = (event) => {
    setQuantity(event.target.value);
    };
    const onChangeBrand = (event) => {
    setBrand(event.target.value);
    };
    const onChangeCollection = (event) => {
    setCollection(event.target.value);
    };
    const onChangeStatus = (event) => {
    setStatus(event.target.value);
    };
    return (
        <div>
        <Alert
            title="Product Added"
            message="The product was succesfuly added to the store"
            show={show}
            variant="success"
            handleClose={handleClose}
            handleShow={handleShow}
        />
        <form style={{ paddingTop: 25 }}>
            <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
            <div
                class="card"
                style={{
                padding: 40,
                paddingTop: 25,
                width: "85%",
                backgroundColor: "white",
                }}
            >
                <div>
                <h1 style={{ fontSize: 24, color: "black" }}>Add Customers</h1>
                </div>

                <div class="mb-3" style={{ paddingTop: 25 }}>
                <label class="form-label" style={{ color: "black" }}>
                    Title
                </label>
                <input
                    class="form-control"
                    style={{ backgroundColor: "white", color: "black" }}
                    onChange={onChangeTitle}
                    required
                />
                </div>
                <div class="mb-3">
                <label class="form-label" style={{ color: "black" }}>
                    Description
                </label>
                <JoditEditor
                    value={description}
                    tabIndex={1} // tabIndex of textarea
                    onChange={onChangeDescription}
                />
                </div>
                <div class="row">
                <div class="col">
                    <div class="mb-3">
                    </div>
                </div>
                <div class="col">
                    <div class="mb-3">
                    <label class="form-label" style={{ color: "black" }}>
                        Price
                    </label>
                    <input
                        class="form-control"
                        type="number"
                        style={{ backgroundColor: "white", color: "black" }}
                        onChange={onChangePrice}
                        required
                    />
                    </div>
                </div>
                <div class="col">
                    <div class="mb-3">
                    <label class="form-label" style={{ color: "black" }}>
                        Quantity
                    </label>
                    <input
                        class="form-control"
                        type="number"
                        style={{ backgroundColor: "white", color: "black" }}
                        onChange={onChangeQuantity}
                        required
                    />
                    </div>
                </div>
                </div>
            </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
            <div
                class="card"
                style={{
                padding: 40,
                paddingTop: 25,
                width: "85%",
                backgroundColor: "white",
                }}
            >
                <div class="row">
                <div class="col">
                    <div class="mb-3">
                    <label class="form-label" style={{ color: "black" }}>
                        Brand
                    </label>
                    <select
                        class="form-select"
                        style={{ backgroundColor: "white", color: "black" }}
                        onChange={onChangeBrand}
                        required
                    >
                        <option value="">Pick a Brand</option>
                        {fetchBrands.map((b) =>
                        b.deleteFlag === false ? (
                            <option value={b._id} key={b._id}>
                            {b.name}
                            </option>
                        ) : null
                        )}
                    </select>
                    </div>
                </div>
                <div class="col">
                    <div class="mb-3">
                    <label class="form-label" style={{ color: "black" }}>
                        Collection
                    </label>
                    <select
                        class="form-select"
                        style={{ backgroundColor: "white", color: "black" }}
                        onChange={onChangeCollection}
                        required
                    >
                        <option value="">Pick a Collection</option>
                        {fetchCollections.map((c) =>
                        c.deleteFlag === false ? (
                            <option value={c._id} key={c._id}>
                            {c.name}
                            </option>
                        ) : null
                        )}
                    </select>
                    </div>
                </div>
                </div>
                <div class="row">
                <div class="col">
                    <div class="mb-3">
                    <label class="form-label" style={{ color: "black" }}>
                        Status
                    </label>
                    <select
                        class="form-select"
                        style={{ backgroundColor: "white", color: "black" }}
                        onChange={onChangeStatus}
                        required
                    >
                        <option value="">Select Status</option>
                        <option value="Active">Active</option>
                        <option value="Draft">Draft</option>
                    </select>
                    </div>
                </div>
                </div>
                <button
                class="btn btn-success"
                style={{ width: "25%" }}
                // onClick={}
                >
                Add Product
                </button>
            </div>
            </div>
        </form>
    </div>
    );
};

export default AddCustomers;