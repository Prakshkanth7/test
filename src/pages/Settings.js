import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Pagination from "@mui/material/Pagination";
import * as AiIcons from "react-icons/ai";
import styles from "./styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#EEEEEE",
    color: "#000000",
  },
  fontSize: 18,
}));

function Settings() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [role, setRole] = useState("Admin");
  const [currentItems, setCurrentItems] = useState([]);
  const [count, setCount] = useState(0);
  const userDetails = localStorage.getItem("userDetails");

  const [page, setPage] = React.useState(1);

  useEffect(() => {
    if (userDetails) {
      setCount(Math.ceil(JSON.parse(userDetails).length / 5));
      const existingUserDetails = JSON.parse(userDetails);
      const lastItemIndex = page * 5;
      const firstItemIndex = lastItemIndex - 5;
      const currentItems = existingUserDetails.slice(
        firstItemIndex,
        lastItemIndex
      );
      setCurrentItems(currentItems);
    }
  }, [page, userDetails]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleClickOpen = () => {
    setEmail("");
    setRole("Admin");
    setOpen(true);
  };

  const handleRemoveAll = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handleRemoveUser = ({ item, index }) => {
    const existingUserDetails = JSON.parse(userDetails);
    existingUserDetails.splice(index, 1);
    localStorage.setItem("userDetails", [JSON.stringify(existingUserDetails)]);
    if (!existingUserDetails?.length) localStorage.clear();
    window.location.reload();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddUser = () => {
    let existingUserDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (existingUserDetails == null) existingUserDetails = [];
    const time = new Date().toLocaleTimeString();
    const id = Math.floor(Math.random() * 100);
    const details = {
      id: id,
      email: email,
      time: time,
      role: role,
    };
    localStorage.setItem("details", JSON.stringify(details));
    existingUserDetails.push(details);
    localStorage.setItem("userDetails", [JSON.stringify(existingUserDetails)]);
    handleClose();
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setIsValidEmail(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value)
    );
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const renderDialog = () => {
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <div style={styles.dialigContainer}>
            <div style={styles.dialogSideBar}>
              <AiIcons.AiOutlineUserAdd color="fff" size={150} />
              <span style={styles.dialogSideBarText}>
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. It has survived
                not only five centuries, but also the leap into electronic
                essentially unchanged.{" "}
              </span>
            </div>
            <div style={styles.dialogFormContainer}>
              <span style={styles.dialogFormHeader}>User Information</span>
              <span style={styles.dialogFormLabel}>Email Id of User</span>
              <OutlinedInput
                placeholder="Email"
                value={email}
                style={styles.emailInput}
                onChange={handleEmailChange}
              />
              {email.length > 1 && !isValidEmail && (
                <span style={styles.emailWarning}>
                  Please enter valid email
                </span>
              )}

              <span style={styles.dialogFormLabel}>Role</span>
              <Select
                value={role}
                label="Role"
                style={styles.dropDown}
                onChange={handleRoleChange}
              >
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Owner">Owner</MenuItem>
                <MenuItem value="Sales">Sales</MenuItem>
              </Select>
              <div style={styles.actionContainer}>
                <Button onClick={handleClose} style={styles.cancelButton}>
                  Cancel
                </Button>
                <Button
                  onClick={handleAddUser}
                  disabled={!isValidEmail}
                  style={styles.addButton}
                >
                  Add
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div style={styles.settingsPageActions}>
      <button onClick={handleClickOpen} style={styles.buttonStyle}>
        ADD USER
      </button>
      <button onClick={handleRemoveAll} style={styles.buttonStyle}>
        REMOVE ALL
      </button>

      {currentItems.length ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Id</StyledTableCell>
                <StyledTableCell>User</StyledTableCell>
                <StyledTableCell>Last Signed in</StyledTableCell>
                <StyledTableCell>Role</StyledTableCell>
                <StyledTableCell>Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItems.map((item, index) => (
                <TableRow key={item.id}>
                  <StyledTableCell component="th" scope="row">
                    {item.id}
                  </StyledTableCell>
                  <StyledTableCell>{item.email}</StyledTableCell>
                  <StyledTableCell>{item.time}</StyledTableCell>
                  <StyledTableCell>{item.role}</StyledTableCell>
                  <StyledTableCell>
                    <div style={styles.deleteIcon}>
                      <AiIcons.AiFillDelete
                        onClick={() => handleRemoveUser({ item, index })}
                        color="fff"
                      />
                    </div>
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination
            style={{ padding: "20px" }}
            count={count}
            page={page}
            onChange={handlePageChange}
          />
        </TableContainer>
      ) : (
        <div style={styles.initialMsgContainer}>
          <span>No Users added yet , Please add User</span>
        </div>
      )}
      {renderDialog()}
    </div>
  );
}

export default Settings;
