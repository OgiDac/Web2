import { TableContainer, Paper, Table, TableHead, TableRow, TableBody, Button, TableCell } from "@mui/material";
import adminService from "../../../../services/adminService";
import { tableColumns } from "../../../../helpers/helpers";

const TableWaiting = ({ users, refresh }) => {
  const verify = (id, status) => {
    adminService.postVerifyUser({ id: id, verificationStatus: status }).then((res) => refresh());
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {Object.keys(users[0]).map((key, index) => (
              <TableCell key={index}>{key}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={index}>
              {Object.keys(user).map((key, index) => (
                <TableCell key={index}>{tableColumns(key, user)}</TableCell>
              ))}
              <TableCell>
                <Button color="success" onClick={(e) => verify(user.id, 1)}>
                  Confirm
                </Button>
              </TableCell>
              <TableCell>
                <Button color="error" onClick={(e) => verify(user.id, 2)}>
                  Reject
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableWaiting;
