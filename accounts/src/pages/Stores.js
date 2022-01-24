import { Card, Button, Menu } from "@material-ui/core";
import { MenuItem } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../actions/auth";
import MenuDropdown from "../components/Menu/MenuDropdown";
import StoresTable from "../components/Tables/StoresTable";
const Stores = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    history("/my-profile");
    setAnchorEl(null);
  };
  return (
    <div style={{ width: 600 }}>
      <div style={{ height: "100%" }}>
        <Card style={{ height: "100vh" }}>
          <div style={{ display: "flex" }}>
            <div
              style={{
                flex: 1,
                justifyContent: "flex-start",
                padding: 20,
                paddingTop: 80,
                paddingLeft: 40,
              }}
            >
              <img
                width="200"
                height="50"
                src={process.env.PUBLIC_URL + "/banaodukaan_logo_text.png"}
                alt=""
              />
            </div>
            <div
              style={{
                justifyContent: "flex-end",
                paddingTop: 80,
                paddingRight: 40,
              }}
            >
              <MenuDropdown />
              {/* <i
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                style={{
                  color: "#345EA9",
                  borderRadius: "50%",
                  cursor: "pointer"
                }}
                className="fa-2x fas fa-user"></i>

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={() => dispatch(logout())}>Logout</MenuItem>
              </Menu> */}
            </div>
          </div>
          <div style={{ display: "flex", paddingTop: 40 }}>
            <div
              style={{ flex: 1, justifyContent: "flex-start", paddingLeft: 40 }}
            >
              <h1
                style={{
                  fontSize: "1.8rem",
                  fontWeight: "600",
                }}
              >
                My Stores
              </h1>
            </div>
            <div style={{ justifyContent: "flex-end", paddingRight: 40 }}>
              <Link style={{ textDecoration: "none" }} to="/my-stores/new/">
                <Button
                  variant="outlined"
                  style={{ backgroundColor: "#3B8AC4", color: "#FFFFFF" }}
                >
                  Create a Store
                </Button>
              </Link>
            </div>
          </div>
          <hr style={{ margin: 45, color: "#6d7175" }} />
          <StoresTable />
        </Card>
      </div>
    </div>
  );
};
export default Stores;
