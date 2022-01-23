import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { uri } from "../api.json";
import JoditEditor from "jodit-react";
import { useParams, useHistory } from "react-router-dom";
import Alert from "../components/Alerts/Alert";

const BrandDetail = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState([]);
  //success modal

  const [alertTitle, setAlertTitle] = useState('')
  const [alertType, setAlertType] = useState('')
  const [alertMessage, setAlertMessage] = useState('')

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    if (alertType === 'success'){
    history.push("/admin/brands");
    }
  };
  const handleShow = () => setShow(true);
  //success modal states end
  const history = useHistory();
  const { id: brandId } = useParams();
  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };
  const onChangeDescription = (value) => {
    setDescription(value);
  };

  const updateBrand = (event) => {
    event.preventDefault();
    if ((title === "" && description === "") || title === "" || description === "") {
      handleShow();
      setAlertTitle("Error")
      setAlertMessage("Please fill in all of the fields")
      setAlertType("failure")
      return;
      //we will add toastify here
    }
    const body = {
      name: title,
      description: description,
      deleteFlag: false,
    };
    axios
      .put(`${uri}/brand/${brand._id}`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        handleShow();
        handleShow();
        setAlertTitle("Success")
        setAlertMessage("The brand was succesfuly updated")
        setAlertType("success")
      })
      .catch((err) => {
        setAlertTitle("Error")
        setAlertMessage("Error occured, please try again later")
        setAlertType("failure")
        setShow(true);
      });
  };

  useEffect(() => {
    const getBrandById = async (id) => {
      try {
        const res = await axios.get(`${uri}/brand/${id}`);
        setBrand(res.data.brand);
        setTitle(res.data.brand.name);
        setDescription(res.data.brand.description);
      } catch (err) {
        console.log(err);
      }
    };
    getBrandById(brandId);
  }, [brandId]);

  return (
    <div>
      <Alert
        title= {alertTitle}
        message= {alertMessage}
        show={show}
        variant={alertType === "success" ? "success" : "failure"}
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
              <h1 style={{ fontSize: 24, color: "black" }}>
                {brand === undefined ? "" : brand.name}
              </h1>
            </div>

            <div class="mb-3" style={{ paddingTop: 25 }}>
              <label class="form-label" style={{ color: "black" }}>
                Title
              </label>
              <input
                class="form-control"
                value={title}
                style={{ backgroundColor: "white", color: "black" }}
                onChange={onChangeTitle}
                required
              />
            </div>
            <div class="mb-3">
              <div>
                <label
                  class="form-label"
                  style={{ color: "black", paddingTop: 25 }}
                >
                  Description
                </label>

                <JoditEditor
                  value={brand.description}
                  tabIndex={1} // tabIndex of textarea
                  onBlur={newContent => setDescription(newContent)}
                  onChange={newContent => {}}
                  
                />
              </div>
            </div>
            <button
              class="btn btn-success"
              style={{ width: "25%", backgroundColor: '#3B8AC4' }}
              onClick={(e) => updateBrand(e)}
            >
              Update Brand
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BrandDetail;
