import { useEffect, useState } from "react";
import adminService from "../../../services/adminService"
import classes from "./Verifications.module.css";

import CustomTable from "./CustomTable/CustomTable"
import TableWaiting from "./TableWaiting/TableWaiting";

const Verifications = () => {

    const [waitingUsers, setWaitingUsers] = useState([]);
    const [verifiedUsers, setVerifiedUsers] = useState([]);
    const [declinedUsers, setDeclinedUsers] = useState([]);
    const [buyers, setBuyers] = useState([]);

    const getData = () => {
        adminService.getWaitingUsers().then((res) => {
            setWaitingUsers(res);
          });
      
          adminService.getVerifiedUsers().then((res) => {
            setVerifiedUsers(res);
          });
      
          adminService.getDeclinedUsers().then((res) => {
            setDeclinedUsers(res);
          });
      
          adminService.getBuyers().then((res) => {
            setBuyers(res);
          });

    }

    useEffect(() => {
        getData();        
    }, [])

    return (
        <div>
            {waitingUsers && waitingUsers.length !== 0 && (
        <>
          <h2 className={classes.heading}>Users waiting to be verified</h2>
          <TableWaiting users={waitingUsers} refresh={getData} />
          <br />
        </>
      )}
            {verifiedUsers && verifiedUsers.length !== 0 && (
        <>
          <h2 className={classes.heading}>Verified users</h2>
          <CustomTable users={verifiedUsers} />
          <br />
        </>
      )}
      {declinedUsers && declinedUsers.length !== 0 && (
        <>
          <h2 className={classes.heading}>Declined users</h2>
          <CustomTable users={declinedUsers} />
        </>
      )}
      {buyers && buyers.length !== 0 && (
        <>
          <h2 className={classes.heading}>Buyers</h2>
          <CustomTable users={buyers} />
        </>
      )}
        </div>
    )
}

export default Verifications;