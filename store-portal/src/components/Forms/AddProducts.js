import { useState, useEffect, useRef } from "react";
import { Button } from '@material-ui/core'
import axios from "axios";
import { uri } from "../../api.json";
import { useHistory } from "react-router-dom";
// import Alert from "../Alerts/Alert";
import Alert from '@mui/material/Alert';
import AlertDialog from "../Alerts/AlertDialog";
import { ProgressBar } from "react-bootstrap";
import JoditEditor from "jodit-react";
import BackspaceRoundedIcon from '@mui/icons-material/BackspaceRounded';
const AddProducts = () => {
  const topRef = useRef(null)
  const [alertType, setAlertType] = useState('')
  const [alertMessage, setAlertMessage] = useState('')

  const [alertDialogShow, setAlertDialogShow] = useState(false)
  const handleShow = () => setAlertDialogShow(true)
  const handleClose = () => {
    setAlertDialogShow(false)
    history.push('/admin/products')
  }

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

  // function to get collections from the backend
  const getCollections = async () => {
    try {
      const res = await axios.get(`${uri}/collection`);
      setFetchedCollections(res.data.collections);
    } catch (err) {
      console.log(err);
    }
  };

  // function to get brands from backend
  const getBrands = async () => {
    try {
      const res = await axios.get(`${uri}/brand`);
      setFetchedBrands(res.data.brands);
    } catch (err) {
      console.log(err);
    }
  };

  // use effect to get collections and brands when page loads
  useEffect(() => {
    getCollections();
    getBrands();
  }, []);

  // add products handler
  const addProducts = async (event) => {
    event.preventDefault();
    if (
      title === "" ||
      description === "" ||
      brand === "" ||
      collection === "" ||
      status === ""
    ) {
      setAlertMessage("Please fill in all of the fields")
      setAlertType("error")
      topRef.current.scrollIntoView()
      return;
    } else if (!buttonCheck || image.length === 0) {
      setAlertMessage("Upload Image First")
      setAlertType("error")
      topRef.current.scrollIntoView()
    } else {
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

        handleShow()
      } catch (err) {
        setAlertMessage("Error occured, please try again later")
        setAlertType("error")
        topRef.current.scrollIntoView()
      }
    }
  };

  // upload images handler
  const uploadImages = async (event) => {
    event.preventDefault();

    if (image.length === 0) {

      setAlertMessage("Please select the image first")
      setAlertType("error")
      topRef.current.scrollIntoView()

    } else {
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
    <div ref={topRef}>
      <AlertDialog
        handleClose={handleClose}
        handleShow={handleShow}
        show={alertDialogShow}
        title={'Success'}
        message={"Product was successfuly added"}
        variant={'success'}
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
            <div class="d-flex flex-row">
              <div class="p2" style={{ marginRight: 20 }}>
                <BackspaceRoundedIcon style={{ fill: '#345DA7', cursor: 'pointer', }} onClick={() => history.push('/admin/products')} />
              </div>
              <div class="p2">
                <h1 style={{ fontSize: 24, fontWeight: 'bold', color: "black" }}>Add Product</h1>
              </div>
            </div>
            <Alert severity={alertType}>{alertMessage}</Alert>
            <div className="mb-3" style={{ paddingTop: 25 }}>
              <label className="form-label" style={{ color: "black", fontWeight: '600' }}>
                Title
              </label>
              <input
                className="form-control"
                style={{ backgroundColor: "white", color: 'black' }}
                onChange={onChangeTitle}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label" style={{ color: "black", fontWeight: '600' }}>
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
                    <label className="form-label" style={{ color: "black", fontWeight: '600' }}>
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
                      <Button
                        variant="outlined"
                        style={{ width: '50%', backgroundColor: "#3B8AC4", color: "#FFFFFF", boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)', fontWeight: 500 }}
                        onClick={(e) => uploadImages(e)}
                      >
                        Upload
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <label className="form-label" style={{ color: "black", fontWeight: '600' }}>
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
                  <label className="form-label" style={{ color: "black", fontWeight: '600' }}>
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
                  <label className="form-label" style={{ color: "black", fontWeight: '600' }}>
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
                  <label className="form-label" style={{ color: "black", fontWeight: '600' }}>
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
                  <label className="form-label" style={{ color: "black", fontWeight: '600' }}>
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
            <Button
              variant="outlined"
              style={{ width: "25%", backgroundColor: "#3B8AC4", color: "#FFFFFF", boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)', fontWeight: 500 }}
              onClick={(e) => addProducts(e)}
            >
              Add Product
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProducts;
