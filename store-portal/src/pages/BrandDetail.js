import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { uri } from "../api.json";
import JoditEditor from "jodit-react";
import { useParams, useHistory } from "react-router-dom";
import Alert from "../components/Alerts/Alert";
import { Button } from '@material-ui/core'
import BackspaceRoundedIcon from '@mui/icons-material/BackspaceRounded';

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
    if (alertType === 'success') {
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

  // update brand handler function
  const updateBrand = (event) => {
    event.preventDefault();
    if ((title === "" && description === "") || title === "" || description === "") {
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

  // useEffect to get brand details from brand id 
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
            <div class = "d-flex flex-row"> 
              <div class="p2" style = {{marginRight: 20}}>
                <BackspaceRoundedIcon style = {{fill: '#345DA7', cursor: 'pointer', }}  onClick={() => history.push('/admin/brands')} />
              </div>
              <div class="p2">
                <h1 style={{ fontSize: 24, fontWeight: 'bold', color: "black" }}>{brand === undefined ? "" : brand.name}</h1>
              </div>
            </div>
            {/* <i style={{ cursor: "pointer" }} onClick={() => history.push('/admin/brands')} className="fas mb-5 fa-2x fa-arrow-left"></i>

            <div>
              <h1 style={{ fontSize: 24, color: "black" }}>
                {brand === undefined ? "" : brand.name}
              </h1>
            </div> */}

            <div className="mb-3" style={{ paddingTop: 25 }}>
              <label className="form-label" style={{ color: "black", fontWeight: '600'}}>
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
                  value={brand.description}
                  tabIndex={1} // tabIndex of textarea
                  onBlur={newContent => setDescription(newContent)}
                  onChange={newContent => { }}

                />
              </div>
            </div>
            <Button
              variant = "outlined"
              style={{ width: "25%", backgroundColor: "#3B8AC4", color: "#FFFFFF", boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)', fontWeight: 500 }}
              onClick={(e) => updateBrand(e)}
            >
              Update Brand
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BrandDetail;
