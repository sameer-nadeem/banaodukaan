import * as React from "react";
import { useState } from "react";
import JoditEditor from "jodit-react";
import axios from "axios";
import { uri } from "../../api.json";
import { useHistory } from "react-router-dom";
import { Button } from '@material-ui/core'
import Alert from "../Alerts/Alert";
import BackspaceRoundedIcon from '@mui/icons-material/BackspaceRounded';
const AddCollections = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  let history = useHistory();

  const [alertTitle, setAlertTitle] = useState('')
  const [alertType, setAlertType] = useState('')
  const [alertMessage, setAlertMessage] = useState('')

  // add collection handler
  const handleSubmit = (e) => {
    e.preventDefault()
    if (title === "" || description === "") {
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

  // alert states and functions start here
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    if (alertType === 'success') {
      history.push("/admin/collections");
    }
  };
  const handleShow = () => setShow(true);
  // alert states and functions end here

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
      <div style={{ display: "flex", justifyContent: "center", padding: 45 }}>
        <div
          className="card form-card"
          style={{
            padding: 40,
            paddingTop: 25,
            width: "85%",
            backgroundColor: "white",
          }}
        >
          <div class = "d-flex flex-row"> 
            <div class="p2" style = {{marginRight: 20}}>
              <BackspaceRoundedIcon style = {{fill: '#345DA7', cursor: 'pointer', }}  onClick={() => history.push('/admin/collections')} />
            </div>
            <div class="p2">
              <h1 style={{ fontSize: 24, fontWeight: 'bold', color: "black" }}>Add Collection</h1>
            </div>
          </div>
          
          <form style={{ paddingTop: 25 }} onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" style={{ color: "black", fontWeight: '600' }}>
                Title
              </label>
              <input
                className="form-control"
                style={{ backgroundColor: "white", color: "black" }}
                onChange={onChangeTitle}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" style={{ color: "black", fontWeight: '600'}}>
                Description
              </label>
              <JoditEditor
                value={description}
                tabIndex={1} // tabIndex of textarea
                onBlur={newContent => setDescription(newContent)}
                onChange={newContent => { }}
              />
            </div>
            <Button
              variant="outlined"
              style={{ width: "15%", backgroundColor: "#3B8AC4", color: "#FFFFFF", boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)', fontWeight: 500 }}
            >
              Save
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCollections;
