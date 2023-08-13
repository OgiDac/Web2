import { Snackbar, IconButton, Alert } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import React, { createContext, useContext, useEffect, useState } from "react";


const AlertContext = createContext()

export const AlertContextProvider = (props) => {
    const [severity, setSeverity] = useState('info');
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };

    return (
        <AlertContext.Provider value={{setOpen: setOpen, setSeverity: setSeverity, setMessage: setMessage}}>
            {
                props.children
            }
            <Snackbar open={open} autoHideDuration={3000} message={message} action={<IconButton
              aria-label="close"
              color="inherit"
              sx={{ p: 0.5 }}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>} >
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {message}
        </Alert>
            </Snackbar>
        </AlertContext.Provider>
    )
}

export default AlertContext;