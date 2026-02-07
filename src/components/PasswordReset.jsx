import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constant";
import { useNavigate } from "react-router-dom";

const PasswordReset = () => {

    const [oldPass, setOldPass] = useState("");
    const [emailId, setEmailId] = useState("");
    const [newPass, setNewPass] = useState("");
    const [error, setError] = useState("");
    const [showToast, setShowToast] = useState(false);
    const navigate = useNavigate();


    const resetPassword = async () => {
        // clearing existing error if any
        setError("");
        try {

            if (!emailId || !oldPass || !newPass) {
                setError("All fields are required");
                return; // stop execution
            }

            const res = await axios.patch(BASE_URL + "/profile/password", { emailId, oldPass, newPass }, { withCredentials: true });

            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
                navigate("/login");
            }, 3000);
        }
        catch (err) {
            console.log(err.response);

            setError(err.response.data.message || "Something went wrong");
        }

    }
    return (
        <>
            <div className="flex  justify-center my-20">
                <div className="card card-border bg-base-300 w-96">
                    <div className="card-body">
                        <div>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Email Id </legend>
                                <input type="email" value={emailId} className="input" placeholder="Email Id" required onChange={(e) => setEmailId(e.target.value) } />
                                <legend className="fieldset-legend">Old Password </legend>
                                <input type="email" value={oldPass} className="input" placeholder="Old Password" required onChange={(e) => setOldPass(e.target.value)} />
                                <legend className="fieldset-legend"> New Password</legend>
                                <input type="password" value={newPass} className="input" placeholder="New Password"  required onChange={(e) => setNewPass(e.target.value)} />
                            </fieldset>
                        </div>
                        <p className="text-red-500">{error}</p>
                        <div className="card-actions justify-center m-4">
                            <button className="btn btn-primary "
                                onClick={resetPassword}
                                disabled={!emailId || !oldPass || !newPass}>Reset Password</button>
                                <button className="btn btn-primary "
                                onClick={() =>navigate("/login")}>Back to Login Page</button>
                        </div>
                    </div>
                </div>
            </div>
            {showToast && <div className="toast toast-top toast-end">
                <div className="alert alert-success">
                    <span>Password Updated successfully... Please wait we are redirecting you to login page</span>
                </div>
            </div>}
        </>
    )
}

export default PasswordReset;