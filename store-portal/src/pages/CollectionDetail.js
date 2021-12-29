import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { uri } from "../api.json";
import JoditEditor from "jodit-react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import Alert from "../components/Alerts/Alert";

const CollectionDetail = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [collection, setCollection] = useState([]);
  const { id: collectionId } = useParams();
  const history = useHistory();
  //success modal
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    history.push("/admin/collections");
  };
  const handleShow = () => setShow(true);
  //success modal states end
  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };
  const onChangeDescription = (value) => {
    setDescription(value);
  };

  const updateCollection = async (event) => {
    event.preventDefault();
    const body = {
      name: title,
      description: description,
      deleteFlag: false,
    };
    try {
      await axios.put(`${uri}/collection/${collection._id}`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      handleShow();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getCollection = async (id) => {
      try {
        const res = await axios.get(`${uri}/collection/${id}`);
        setCollection(res.data.collection);
        setTitle(res.data.collection.name);
        setDescription(res.data.collection.description);
      } catch (err) {
        console.log(err);
      }
    };
    getCollection(collectionId);
  }, [collectionId]);

  return (
    <div>
      <Alert
        title="Collection Updated"
        message="The collection was succesfuly updated."
        show={show}
        variant="success"
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
                {collection === undefined ? "" : collection.name}
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
                  value={collection.description}
                  tabIndex={1} // tabIndex of textarea
                  onChange={onChangeDescription}
                />
              </div>
            </div>
            <button
              class="btn btn-success"
              style={{ width: "25%" }}
              onClick={(e) => updateCollection(e)}
            >
              Update Collection
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CollectionDetail;
