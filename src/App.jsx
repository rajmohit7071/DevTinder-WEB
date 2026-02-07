import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Profile from "./components/Profile";
import Login from "./components/Login";
import appStore from "./utils/appStore";
import { Provider } from "react-redux";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Request from "./components/Request";
import PasswordReset from "./components/PasswordReset";


function App() {

  return (
    <>
    <Provider store={appStore}>
     <BrowserRouter basename="/">
        
        <Routes>

          <Route path="/" element = {<Body/>}>
             <Route path="/" element = {<Feed/>} />
             <Route path="/login" element = {<Login/>}/>
             <Route path= "/profile" element = {<Profile/>} />
             <Route path= "/connections" element = {<Connections/>} />
             <Route path= "/requests" element = {<Request/>} />
             <Route path= "/passwordReset" element = {<PasswordReset/>} />
          </Route>

        </Routes>
     
     </BrowserRouter>
     </Provider>
    </>
   
  )
}


export default App;
