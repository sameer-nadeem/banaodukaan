import * as React from "react";
import { useState } from "react";
import axios from "axios";
import { uri } from "../../api.json";
import { useHistory } from "react-router-dom";
import Alert from "../Alerts/Alert";
import JoditEditor from "jodit-react";
import BackspaceRoundedIcon from '@mui/icons-material/BackspaceRounded';
import { Button } from '@material-ui/core'
const AddBrands = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  let history = useHistory();

  const [alertTitle, setAlertTitle] = useState('')
  const [alertType, setAlertType] = useState('')
  const [alertMessage, setAlertMessage] = useState('')
  //success modal
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    if (alertType === 'success') {
      history.push("/admin/brands");
    }
  };
  const handleShow = () => setShow(true);
  //success modal states end

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  // add brand handler
  const addBrand = (e) => {
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
      .post(`${uri}/brand`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        handleShow();
        handleShow();
        setAlertTitle("Success")
        setAlertMessage("The brand was succesfuly added to the store")
        setAlertType("success")
      })
      .catch((err) => {
        setAlertTitle("Error")
        setAlertMessage("Error occured, please try again later")
        setAlertType("failure")
        setShow(true);
      });
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
              <BackspaceRoundedIcon style = {{fill: '#345DA7', cursor: 'pointer', }}  onClick={() => history.push('/admin/brands')} />
            </div>
            <div class="p2">
              <h1 style={{ fontSize: 24, fontWeight: 'bold', color: "black" }}>Create Brand</h1>
            </div>
          </div>

          {/* <i style={{ cursor: "pointer" }} onClick={() => history.push('/admin/brands')} className="fas mb-5 fa-2x fa-arrow-left"></i>

          <div style={{ display: "flex" }}>
            <h1 style={{ fontSize: 22, color: "black" }}>Create Brand</h1>
          </div> */}
          <form style={{ paddingTop: 25 }} onSubmit={(e) => addBrand(e)}>
            <div className="mb-3">
              <label className="form-label" style={{ color: "black", fontWeight: '600'}}>
                Title
              </label>
              <input
                className="form-control"
                style={{ backgroundColor: "white", color: "black" }}
                onChange={onChangeTitle}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" style={{ color: "black", fontWeight: '600' }}>
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

export default AddBrands;
