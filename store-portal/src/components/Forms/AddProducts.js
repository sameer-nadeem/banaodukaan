import { useState, useEffect } from "react";
import axios from "axios";
import { uri } from "../../api.json";
import { useHistory } from "react-router-dom";
import Alert from "../Alerts/Alert";
import { ProgressBar } from "react-bootstrap";
import JoditEditor from "jodit-react";
const AddProducts = () => {
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
  const [buttonCheck, setButtonCheck] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const history = useHistory();
  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };
  // const onChangeDescription = (value) => {
  //   setDescription(value);
  // };
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

  const getCollections = async () => {
    try {
      const res = await axios.get(`${uri}/collection`);
      setFetchedCollections(res.data.collections);
    } catch (err) {
      console.log(err);
    }
  };

  const getBrands = async () => {
    try {
      const res = await axios.get(`${uri}/brand`);
      setFetchedBrands(res.data.brands);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCollections();
    getBrands();
  }, []);

  const addProducts = async (event) => {
    if (
      image.length === 0 ||
      title === "" ||
      description === "" ||
      brand === "" ||
      collection === "" ||
      status === ""
    ) {
      //event.preventDefault();
      //alert("Please Check Fields");
      handleShow();
      setAlertTitle("Error")
      setAlertMessage("Please fill in all of the fields")
      setAlertType("failure")
      return;
    } else if (!buttonCheck) {
      event.preventDefault();
      //alert("Upload Image First");
      handleShow();
      setAlertTitle("Error")
      setAlertMessage("Upload Image First")
      setAlertType("failure")
    } else {
      event.preventDefault();
      const data = {
        title: title,
        price: price,
        stock: quantity,
        description: description,
        brandId: brand,
        collectionId: collection,
        status: status,
        image: path,
      };
      try {
        await axios.post(`${uri}/product`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        handleShow();
        setAlertTitle("Success")
        setAlertMessage("The product was succesfuly added to the store")
        setAlertType("success")
      } catch (err) {
        setAlertTitle("Error")
        setAlertMessage("Error occured, please try again later")
        setAlertType("failure")
        setShow(true);
      }
    }
  };

  const uploadImages = async (event) => {
    event.preventDefault();

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
        onUploadProgress: (progressEvent) => {
          const percentage = (progressEvent.loaded * 100) / progressEvent.total;
          if (percentage < 100) setUploadPercentage(Math.floor(percentage));
          console.log(percentage);
        },
      };
      try {
        const res = await axios.post(
          `${uri}/upload/product/image`,
          formData,
          config
        );
        // alert("File has been uploaded successfully.");
        handleShow();
        setAlertTitle("Success")
        setAlertMessage("File has been uploaded successfully")
        setAlertType("successs")
        setButtonCheck(true);
        setPath(res.data);
        setUploadPercentage(
          100,
          setTimeout(() => {
            setUploadPercentage(0);
          }, 1000)
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <Alert
        title={alertTitle}
        message={alertMessage}
        show={show}
        variant={alertType === "success" ? "success" : "failure"}
        handleClose={handleClose}
        handleShow={handleShow}
      />
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
              <h1 style={{ fontSize: 24, color: "black" }}>Add Products</h1>
            </div>

            <div className="mb-3" style={{ paddingTop: 25 }}>
              <label className="form-label" style={{ color: "black" }}>
                Title
              </label>
              <input
                className="form-control"
                style={{ backgroundColor: "white", color: "black" }}
                onChange={onChangeTitle}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label" style={{ color: "black" }}>
                Description
              </label>
              {/* <Editor
                toolbarClassNameName="toolbarClassNameName"
                wrapperClassNameName="wrapperClassNameName"
                editorClassNameName="editorClassNameName"
                onChange={onChangeDescription}
              /> */}
              <JoditEditor
                value={description}
                tabIndex={1} // tabIndex of textarea
                onBlur={newContent => setDescription(newContent)}
                onChange={newContent => { }}
              />
            </div>
            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <form>
                    <label className="form-label" style={{ color: "black" }}>
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
                    {uploadPercentage > 0 && (
                      <ProgressBar
                        striped
                        now={uploadPercentage}
                        label={`${uploadPercentage}%`}
                      />
                    )}
                    <div style={{ marginTop: 5 }}>
                      <button
                        className="btn btn-success"
                        style={{ width: "100%", backgroundColor: '#3B8AC4' }}
                        onClick={(e) => uploadImages(e)}
                      >
                        Upload
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <label className="form-label" style={{ color: "black" }}>
                    Price
                  </label>
                  <input
                    className="form-control"
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
                    <option value="">Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>
            </div>
            <button
              className="btn btn-success"
              style={{ width: "25%", backgroundColor: '#3B8AC4' }}
              onClick={(e) => addProducts(e)}
            >
              Add Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProducts;
