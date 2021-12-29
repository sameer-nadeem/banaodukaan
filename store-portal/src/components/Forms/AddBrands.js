import * as React from "react";
import { useState } from "react";
import axios from "axios";
import { uri } from "../../api.json";
import { useHistory } from "react-router-dom";
import Alert from "../Alerts/Alert";
import JoditEditor from "jodit-react";

const AddBrands = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  let history = useHistory();

  //success modal
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    history.push("/admin/brands");
  };
  const handleShow = () => setShow(true);
  //success modal states end

  const addBrand = (e) => {
    if (title === "" && description === "") {
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const onChangeDescription = (value) => {
    setDescription(value);
  };
  return (
    <div>
      <Alert
        title="Brand Added"
        message="The brand was succesfuly added to the store"
        show={show}
        variant="success"
        handleClose={handleClose}
        handleShow={handleShow}
      />
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
          <div style={{ display: "flex" }}>
            <h1 style={{ fontSize: 22, color: "black" }}>Create Brand</h1>
          </div>
          <form style={{ paddingTop: 25 }} onSubmit={(e) => addBrand(e)}>
            <div class="mb-3">
              <label class="form-label" style={{ color: "black" }}>
                Title
              </label>
              <input
                class="form-control"
                style={{ backgroundColor: "white", color: "black" }}
                onChange={onChangeTitle}
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
            <button
              type="submit"
              class="btn btn-success"
              style={{ width: "12%" }}
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBrands;
