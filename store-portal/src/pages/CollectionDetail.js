import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { uri } from "../api.json";
import JoditEditor from "jodit-react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import Alert from "../components/Alerts/Alert";
import BackspaceRoundedIcon from '@mui/icons-material/BackspaceRounded';
import { Button } from '@material-ui/core'

const CollectionDetail = () => {
  const [title, setTitle] = useState("");
  const [path, setPath] = useState("");
  const [description, setDescription] = useState("");
  const [collection, setCollection] = useState([]);
  const { id: collectionId } = useParams();
  const history = useHistory();
  //success modal
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    if (alertType === 'success') {
      history.push("/admin/collections");
    }
  };
  const handleShow = () => setShow(true);


  //success modal states end

  const [alertTitle, setAlertTitle] = useState('')
  const [alertType, setAlertType] = useState('')
  const [alertMessage, setAlertMessage] = useState('')
  const [image, setImage] = useState([]);


  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };
  const onChangeImage = (event) => {
    setImage(event.target.files[0]);
  };
  // function that handles the update collection button click
  const updateCollection = async (event) => {
    event.preventDefault();
    if (title === "" || description === "") {
      handleShow();
      setAlertTitle("Error")
      setAlertMessage("Please fill in all of the fields")
      setAlertType("failure")
      return;
    }

    const body = {
      name: title,
      description: description,
      deleteFlag: false,
      image: path
    };
    try {
      await axios.put(`${uri}/collection/${collection._id}`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      handleShow();
      setAlertTitle("Success")
      setAlertMessage("The collection was succesfuly updated")
      setAlertType("success")
    } catch (err) {
      setAlertTitle("Error")
      setAlertMessage("Error occured, please try again later")
      setAlertType("failure")
    }
  };

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
          `${uri}/upload/collection/image`,
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


  // use effect to get collection details from its id
  useEffect(() => {
    const getCollection = async (id) => {
      try {
        const res = await axios.get(`${uri}/collection/${id}`);
        setCollection(res.data.collection);
        setTitle(res.data.collection.name);
        setDescription(res.data.collection.description);
        setPath(res.data.collection.image);
      } catch (err) {
        console.log(err);
      }
    };
    getCollection(collectionId);
  }, [collectionId]);

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
            <div class="d-flex flex-row">
              <div class="p2" style={{ marginRight: 20 }}>
                <BackspaceRoundedIcon style={{ fill: '#345DA7', cursor: 'pointer', }} onClick={() => history.push('/admin/collections')} />
              </div>
              <div class="p2">
                <h1 style={{ fontSize: 24, fontWeight: 'bold', color: "black" }}>{collection === undefined ? "" : collection.name}</h1>
              </div>
            </div>
            {/* <i style={{ cursor: "pointer" }} onClick={() => history.push('/admin/collections')} className="fas mb-5 fa-2x fa-arrow-left"></i>

            <div>
              <h1 style={{ fontSize: 24, color: "black" }}>
                {collection === undefined ? "" : collection.name}
              </h1>
            </div> */}

            <div className="mb-3" style={{ paddingTop: 25 }}>
              <label className="form-label" style={{ color: "black", fontWeight: '600' }}>
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
                  style={{ color: "black", paddingTop: 25, fontWeight: '600' }}
                >
                  Description
                </label>

                <JoditEditor
                  value={collection.description}
                  tabIndex={1} // tabIndex of textarea
                  onBlur={newContent => setDescription(newContent)}
                  onChange={newContent => { }}
                />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
              
                <div className="col">
                  <h1 style={{ fontSize: 24, color: "black", fontWeight: 'bold' }}>Media</h1>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <img
                      src={`${path === "" ? collection.image : path}`}
                      width="400"
                      height="400"
                      alt=""
                    />
                  </div>
                  <div className="mb-3">
                    <form>
                      <label
                        className="form-label"
                        style={{ color: "black", padding: 5, fontWeight: '600' }}
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
                        <Button
                          variant="outlined"
                          style={{ width: "14%", backgroundColor: "#3B8AC4", color: "#FFFFFF", boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)', fontWeight: 500 }}
                          onClick={(e) => uploadImages(e)}
                        >
                          Upload
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
            </div>
            <Button
              variant="outlined"
              style={{ width: "25%", backgroundColor: "#3B8AC4", color: "#FFFFFF", boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)', fontWeight: 500 }}
              onClick={(e) => updateCollection(e)}
            >
              Update Collection
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CollectionDetail;
