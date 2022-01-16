import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@mui/material/MenuItem';
import { Menu } from '@material-ui/core';
import { logout } from '../../actions/auth'
import { useDispatch, useSelector } from 'react-redux'
const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar style={{}} position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Banaodukaan
        </Typography>
        {
          isAuthenticated && (<i
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            style={{
              color: "white",
              borderRadius: "50%",
              cursor: "pointer"
            }}
            className="fa-2x far fa-user"></i>)
        }
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
        </Menu>
      </Toolbar>
    </AppBar >
  );
};

export default Navbar;
