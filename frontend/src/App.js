
import LinkTable from './LinkTable';
import Header from './Header';
import Login from './Login';
import Snackbar from '@material-ui/core/Snackbar';
import { useState, useEffect } from 'react';
import MuiAlert from '@material-ui/lab/Alert';

function App() {

  const [loginToken, setloginToken] = useState("");
  const [snackbarState, setSnackbarState] = useState("");
  const [snackbarText, setSnackbarText] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const domain="https://s.fg-inf.de/";

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  useEffect(() => {
    const fetch = async () => {
      const resp = await fetchAPI_GET("authenticated")
      if (resp.code === 200) {
        console.log("Restored session")
        setloginToken("Old session")
      }
    }
    fetch()

  }, []);

  const openSnackbar = (text, state) => {
    setSnackbarState(state);
    setSnackbarText(text);
    setSnackbarOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false)
  };

  const fetchAPI_GET = async (url) => {
    const userInput = await fetch(domain + url,
      {
        credentials: 'include',
        method: "GET",
        headers: { "Content-type": "application/json", "Access-Control-Allow-Origin":  "*" },
      });

    const status_code = userInput.status

    if (status_code === 200) {
      const userJson = await userInput.json();

      return { code: status_code, content: userJson }
    } else if (status_code === 403) {
      if (loginToken !== "") {
        openSnackbar("Token invalid", "error")
        setloginToken("")
      }
      return { code: status_code }
    } else {
      return { code: status_code }
    }
  }

  const fetchAPI_POST = async (url, body) => {

    const resp = await fetch(domain + url,
      {
        credentials: 'include',
        method: "POST",
        headers: { "Content-type": "application/json", "Access-Control-Allow-Origin":  "/*" },
        body: JSON.stringify(body)
      });
    const status_code = resp.status
    if (status_code === 200) {
      const userJson = await resp.json();

      return { code: status_code, content: userJson }
    } else if (status_code === 403) {
      openSnackbar("Token invalid", "error")
      setloginToken("")
      return { code: status_code }
    } else {
      return { code: status_code }
    }
  }

  const logoutCallback = () => {
    const fetch = async () => {
      const resp = await fetchAPI_POST("logout")
      if (resp.code === 200) {
        setloginToken("");
        console.log("Logged out")
      }else{
        openSnackbar("Logout unsuccessfull", "error")
      }
    }
    fetch()
    
  };

  return (
    <div>
      <Header onLogOut={logoutCallback}/>
      {loginToken === "" ?
        <Login domain={domain} snackbar={openSnackbar} onLogIn={setloginToken} />
        :
        <LinkTable  getRequest={fetchAPI_GET} postRequest={fetchAPI_POST} snackbar={openSnackbar}/>
      }
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snackbarState}>
          {snackbarText}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
