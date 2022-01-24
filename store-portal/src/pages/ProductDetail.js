import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { uri } from "../api.json";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import Alert from "../components/Alerts/Alert";
import JoditEditor from "jodit-react";

const ProductDetail = () => {
  //success modal
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    if (alertType === 'success') {
      history.push("/admin/products");
    }
  };
  const handleShow = () => setShow(true);
  //success modal states end

  const [alertTitle, setAlertTitle] = useState('')
  const [alertType, setAlertType] = useState('')
  const [alertMessage, setAlertMessage] = useState('')



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
  const [product, setProduct] = useState([]);

  const { id: productId } = useParams();

  const history = useHistory();

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
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
    console.log(event.target.value)
    setCollection(event.target.value);
  };
  const onChangeStatus = (event) => {
    setStatus(event.target.value);
  };
  
  // use effect to get collections
  useEffect(() => {
    const getCollections = async () => {
      try {
        const res = await axios.get(`${uri}/collection`);
        setFetchedCollections(res.data.collections);
      } catch (err) {
        console.log(err);
      }
    };
    getCollections();
  }, []);

  // use effect to get brands
  useEffect(() => {
    const getBrands = async () => {
      try {
        const res = await axios.get(`${uri}/brand`);
        setFetchedBrands(res.data.brands);
      } catch (err) {
        console.log(err);
      }
    };
    getBrands();
  }, []);

  // useEffect to get product details of a certain product and setting the variables accordingly
  useEffect(() => {
    const getProductById = async (id) => {
      try {
        const res = await axios.get(`${uri}/product/${productId}`);
        console.log(res);
        setProduct(res.data.product);
        setTitle(res.data.product.title);
        setDescription(res.data.product.description);
        setPrice(res.data.product.price);
        setQuantity(res.data.product.stock);
        setBrand(res.data.product.brandId);
        setCollection(res.data.product.collectionId);
        setStatus(res.data.product.status);
        setPath(res.data.product.image);
      } catch (err) {
        console.log(err);
      }
    };

    getProductById();
  }, [productId]);

  // update products function
  const updateProducts = async (event) => {
    event.preventDefault();
    if (
      title === "" ||
      description === "" ||
      brand === "" ||
      collection === "" ||
      status === ""
    ) {

      //alert("Please Check Fields");
      handleShow();
      setAlertTitle("Error")
      setAlertMessage("Please fill in all of the fields")
      setAlertType("failure")
      return;
    } else {
      event.preventDefault();
      const data = {
        title: title,
        price: price,
        stock: quantity,
        description: description,
        brandId: brand,
        collectionId: collection,
        deleteFlag: false,
        status: status,
        image: path,
      };

      try {
        await axios.put(`${uri}/product/${product._id}`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        handleShow();
        setAlertTitle("Success")
        setAlertMessage("Product updated successfully!")
        setAlertType("success")
      } catch (err) {
        console.log(err);
      }
    }
  };

  // upload image handler
  const uploadImages = async (event) => {
    if (image.length === 0) {
      handleShow();
      setAlertTitle("Error")
      setAlertMessage("Please select the image first")
      setAlertType("failure")
    } else {
      console.log(image);
      event.preventDefault();
      const formData = new FormData();
      formData.append("myImage", image);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };

      try {
        const res = await axios.post(
          `${uri}/upload/product/image`,
          formData,
          config
        );

        handleShow();
        setAlertTitle("Success")
        setAlertMessage("Image has been uploaded successfully")
        setAlertType("successs")
        setPath(res.data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <div>
        <Alert
          title={alertTitle}
          message={alertMessage}
          show={show}
          variant={alertType === "success" ? "success" : "failure"}
          handleClose={handleClose}
          handleShow={handleShow}
        />
      </div>
      <form style={{ paddingTop: 25 }}>
        <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
          <div
            className="card form-card"
            style={{
              padding: 40,
              paddingTop: 25,
              width: "85%",
              backgroundColor: "white",
            }}
          >
            <i style={{ cursor: "pointer" }} onClick={() => history.push('/admin/products')} className="fas mb-5 fa-2x fa-arrow-left"></i>

            <div>
              <h1 style={{ fontSize: 24, color: "black" }}>
                {product === undefined ? "" : product.title}
              </h1>
            </div>

            <div className="mb-3" style={{ paddingTop: 25 }}>
              <label className="form-label" style={{ color: "black" }}>
                Title
              </label>
              <input
                className="form-control"
                value={title}
                style={{ backgroundColor: "white", color: "black" }}
                onChange={onChangeTitle}
                required
              />
            </div>
            <div className="mb-3">
              <div>
                <label
                  className="form-label"
                  style={{ color: "black", paddingTop: 25 }}
                >
                  Description
                </label>
                <JoditEditor
                  value={description}
                  tabIndex={1} // tabIndex of textarea
                  onBlur={newContent => setDescription(newContent)}
                  onChange={newContent => { }}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <label className="form-label" style={{ color: "black" }}>
                    Price
                  </label>
                  <input
                    className="form-control"
                    value={price}
                    type="number"
                    style={{ backgroundColor: "white", color: "black" }}
                    onChange={onChangePrice}
                    required
                  />
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <label className="form-label" style={{ color: "black" }}>
                    Quantity
                  </label>
                  <input
                    className="form-control"
                    value={quantity}
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
            className="card form-card"
            style={{
              padding: 40,
              paddingTop: 25,
              width: "85%",
              backgroundColor: "white",
            }}
          >
            <div className="col">
              <h1 style={{ fontSize: 20, color: "black" }}>Media</h1>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src={`${path === "" ? product.image : path}`}
                  width="400"
                  height="400"
                  alt=""
                />
              </div>
              <div className="mb-3">
                <form>
                  <label
                    className="form-label"
                    style={{ color: "black", padding: 5 }}
                  >
                    Image
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    name="myImage"
                    style={{ backgroundColor: "white", color: "black" }}
                    onChange={onChangeImage}
                    required
                  />
                  <div style={{ marginTop: 5 }}>
                    <button
                      className="btn btn-success"
                      style={{ width: "14%", backgroundColor: '#3B8AC4' }}
                      onClick={(e) => uploadImages(e)}
                    >
                      Upload
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
          <div
            className="card form-card"
            style={{
              padding: 40,
              paddingTop: 25,
              width: "85%",
              backgroundColor: "white",
            }}
          >
            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <label className="form-label" style={{ color: "black" }}>
                    Brand
                  </label>
                  <select
                    className="form-select"
                    style={{ backgroundColor: "white", color: "black" }}
                    onChange={onChangeBrand}
                    required
                  >
                    <option
                      selected
                      value={brand === undefined ? "" : brand._id}
                    >
                      {brand === undefined ? "Pick a Brand" : brand.name}
                    </option>
                    {fetchBrands.map((b) => (
                      <option value={b._id} key={b._id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <label className="form-label" style={{ color: "black" }}>
                    Collection
                  </label>
                  <select
                    className="form-select"
                    style={{ backgroundColor: "white", color: "black" }}
                    onChange={onChangeCollection}
                    required
                  >
                    <option
                      selected
                      value={collection === undefined ? "" : collection._id}
                    >
                      {collection === undefined
                        ? "Pick a Collection"
                        : collection.name}
                    </option>
                    {fetchCollections.map((c) => (
                      <option value={c._id} key={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <label className="form-label" style={{ color: "black" }}>
                    Status
                  </label>
                  <select
                    className="form-select"
                    style={{ backgroundColor: "white", color: "black" }}
                    onChange={onChangeStatus}
                    required
                  >
                    <option selected value={status}>
                      {status}
                    </option>
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>
            </div>
            <button
              className="btn btn-success"
              style={{ width: "25%", backgroundColor: '#3B8AC4' }}
              onClick={(e) => updateProducts(e)}
            >
              Update Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductDetail;
