import * as React from 'react'; 
import { Button, Menu, MenuItem } from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles"
import { Link } from "react-router-dom"

const useStyle = makeStyles({
    btn: {
        color: "white"
    }
})

function Dropdown() {
    const classes = useStyle();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className={classes.btn}
      >
        Projects
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleClose}><Link to="/create-project" style={{textDecoration: "none", color: "black"}}>Create Project</Link></MenuItem>
        <MenuItem onClick={handleClose}><Link to="/view-project" style={{textDecoration: "none", color: "black"}}>View Project</Link></MenuItem>
        {/* <MenuItem onClick={handleClose}>Logout</MenuItem> */}
      </Menu>
    </div>
  );
}

export default Dropdown;