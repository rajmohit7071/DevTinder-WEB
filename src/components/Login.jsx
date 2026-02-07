import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

const Login = () => {

    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [error, setError] = useState("");
    const [isLoginForm, setIsLoginForm] = useState(true);

    const dispatch = useDispatch();
    const navigate =  useNavigate();


    const handleLogin = async()=>{
        try{

        const res = await axios.post(BASE_URL+"/login", {emailId,password},{withCredentials: true});

        // adding to redux store
        dispatch(addUser(res.data));
        console.log(res);
        localStorage.setItem("token", res.data.cookies);

        navigate("/");
        

        }catch(err){
            setError(err.response.data)
          //  console.log("Error:" , err.response.data);
            
        } 
    }

    const handleSignUP = async() =>{
        try{
            console.log("in signup");
              const res = await axios.post(BASE_URL + "/signUp", {firstName,lastName: lastName || "N/A",emailId,password}, {withCredentials:true});
        
        dispatch(addUser(res.data.data));
        navigate("/profile");
        }
        catch(err) {
            setError(err.response.data);
        }
      
    }

    const handleLoginLogout = () =>{
        setIsLoginForm(!isLoginForm);
    }


    return (
        <>
            <div className="flex  justify-center my-20">
                <div className="card card-border bg-base-300 w-96">
                    <div className="card-body">
                        <h2 className="card-title justify-center ">{ isLoginForm ? "Login" : "Sign UP"}</h2>
                        <div>
                            <fieldset className="fieldset">
                              {!isLoginForm &&   <>
                                <legend className="fieldset-legend">FirstName </legend>
                                <input type="text" value={firstName} className="input" required placeholder="FirstName" onChange={(e)=> setFirstName(e.target.value.trim())}/>
                                <legend className="fieldset-legend">LastName</legend>
                                <input type="text" value={lastName} className="input" placeholder="LastName" onChange={(e)=> setLastName(e.target.value.trim())}/>
                                </> }
                                <legend className="fieldset-legend">Email Id </legend>
                                <input type="email" value={emailId} className="input" required placeholder="Email Id" onChange={(e)=> setEmailId(e.target.value.trim())}/>
                                <legend className="fieldset-legend">Password</legend>
                                <input type="password" value={password} className="input" required placeholder="Password" onChange={(e) => setPassword(e.target.value.trim())}/>
                            </fieldset>
                        </div>
                        <p className="text-red-500">{error}</p>
                        <div className="card-actions flex justify-between m-4">
                            <button className="btn btn-primary " onClick={isLoginForm ?handleLogin: handleSignUP}>{ isLoginForm ? "Login" : "Sign UP"}</button>
                            {isLoginForm && <Link to="/passwordReset" className="text-sm text-primary hover:underline"> Forget Password </Link> }
                        </div>
                        <p className=" mx-18 cursor-pointer" onClick={handleLoginLogout}>{isLoginForm ? "New User? Please SignUP " : "Already a user ? Please Login"}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;