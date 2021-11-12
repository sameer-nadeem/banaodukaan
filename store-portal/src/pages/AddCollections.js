import * as React from "react";
import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "axios";
import { uri } from "../api.json";
import { useHistory } from "react-router-dom";
import Alert from "../components/Alerts/Alert"
const AddCollections = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  let history = useHistory();

  const handleSubmit = (e) => {
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
      .post(`${uri}/collection`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        handleShow()
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const onChangeDescription = (editorState) => {
    setDescription(editorState.blocks[0].text);
  };

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false)
    history.push('/collections')
  }
  const handleShow = () => setShow(true);

  return (
    <div>
      <Alert
        title="Collection Added"
        message="The collection was succesfuly added to the store"
        show={show}
        variant="success"
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
              <Editor
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onChange={onChangeDescription}
              />
            </div>
            <button
              type="submit"
              className="btn btn-success"
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

export default AddCollections;
