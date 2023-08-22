import { TableContainer, Paper, Table, TableHead, TableRow, TableBody, TableCell, styled } from "@mui/material";
import { tableColumns } from "../../../../helpers/helpers";
import { useEffect, useState } from "react";
import { tableCellClasses } from '@mui/material/TableCell';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#2d5b9326',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const CustomTable = ({users}) => {

    return (
      <div>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {Object.keys(users[0]).map((key, index) => (
                <StyledTableCell key={index}>{key}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <StyledTableRow key={index}>
                {Object.keys(user).map((key, index) => (
                  <StyledTableCell key={index}>{tableColumns(key, user)}</StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
    )
}

export default CustomTable;