import * as React from "react";
import { useState } from "react";
import JoditEditor from "jodit-react";
import axios from "axios";
import { uri } from "../../api.json";
import { useHistory } from "react-router-dom";
import Alert from "../Alerts/Alert";
const AddCollections = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  let history = useHistory();

  const [alertTitle, setAlertTitle] = useState('')
  const [alertType, setAlertType] = useState('')
  const [alertMessage, setAlertMessage] = useState('')


  const handleSubmit = (e) => {
    e.preventDefault()
    if (title === "" && description === "" || title === "" || description === "") {
      handleShow();
      setAlertTitle("Error")
      setAlertMessage("Please fill in all of the fields")
      setAlertType("failure")
      return;
      //we will add toastify here

    
    }
    e.preventDefault();
    const body = {
      name: title,
      description: description,
    };
    //post request here

    axios
      .post(`${uri}/collection`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        handleShow();
        setAlertTitle("Success")
        setAlertMessage("The collection was succesfuly added to the store")
        setAlertType("success")
      })
      .catch((err) => {
        setAlertTitle("Error")
        setAlertMessage("Error occured, please try again later")
        setAlertType("failure")
      });
  };

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const onChangeDescription = (value) => {
    setDescription(value);
  };

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    if (alertType === 'success'){
    history.push("/admin/collections");
    }
  };
  const handleShow = () => setShow(true);

  return (
    <div>
      <Alert
        title={alertTitle}
        message= {alertMessage}
        show={show}
        variant={alertType === "success" ? "success" : "failure"}
        handleClose={handleClose}
        handleShow={handleShow}
      />
      <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
        <div
          className="card"
          style={{
            padding: 40,
            paddingTop: 25,
            width: "85%",
            backgroundColor: "white",
          }}
        >
          <i style={{ cursor: "pointer" }} onClick={() => history.push('/admin/collections')} class="fas mb-5 fa-2x fa-arrow-left"></i>

          <div style={{ display: "flex" }}>
            <h1 style={{ fontSize: 22, color: "black" }}>Create Collection</h1>
          </div>
          <form style={{ paddingTop: 25 }} onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" style={{ color: "black" }}>
                Title
              </label>
              <input
                className="form-control"
                style={{ backgroundColor: "white", color: "black" }}
                onChange={onChangeTitle}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" style={{ color: "black" }}>
                Description
              </label>
              <JoditEditor
                value={description}
                tabIndex={1} // tabIndex of textarea
                onBlur={newContent => setDescription(newContent)}
                onChange={newContent => {}}
              />
            </div>
            <button
              type="submit"
              className="btn btn-success"
              style={{ width: "12%", backgroundColor: '#3B8AC4'}}
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCollections;
