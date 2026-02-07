import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Editprofile = ({ user }) => {

    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(user.age || "");
    const [gender, setGender] = useState(user.gender || "");
    const [photoUrl, setPHotoUrl] = useState(user.photoUrl);
    const [about, setAbout] = useState(user.about);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const [showToast, setShowToast] = useState(false);

    const saveProfile = async () => {
        // clearing existing error if any
        setError("");
        try {
            const res = await axios.patch(BASE_URL + "/profile/edit", {
                firstName, lastName, gender, about, photoUrl, age
            }, { withCredentials: true });
            console.log(res);

            dispatch(addUser(res?.data?.data));
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
        }
        catch (err) {
            console.log(err.response);

            setError(err.response.data);
        }
    }

    return (
        <div className="flex justify-center my-20">
            <div className="flex justify-center mx-10">
                <div className="card card-border bg-base-300 w-96">
                    <div className="card-body">
                        <h2 className="card-title">Edit profile</h2>
                        <div>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">FirstName : </legend>
                                <input type="text" value={firstName} className="input" placeholder="FirstName" onChange={(e) => setFirstName(e.target.value)} maxLength={50} />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">LastName : </legend>
                                <input type="text" value={lastName} className="input" placeholder="LastName" onChange={(e) => setLastName(e.target.value)} maxLength={20} />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">PhotoUrl : </legend>
                                <input type="text" value={photoUrl} className="input" placeholder="PhotoUrl" onChange={(e) => setPHotoUrl(e.target.value)} />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Age : </legend>
                                <input type="number" value={age} className="input" placeholder="Age" onChange={(e) => setAge(e.target.value)} min={0} />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Gender : </legend>
                                <input type="text" value={gender} className="input" placeholder="Gender" onChange={(e) => setGender(e.target.value)} />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">About : </legend>
                                 <textarea className="textarea" value={about} placeholder="About" onChange={(e) => setAbout(e.target.value)}></textarea>
                            </fieldset>

                        </div>
                        <p className="text-red-500">{error}</p>
                        <div className="card-actions justify-center m-4">
                            <button className="btn btn-primary " onClick={saveProfile} >Save Profile</button>
                        </div>
                    </div>
                </div>
            </div>
            <UserCard user={{ firstName, lastName, gender, about, photoUrl, age }} />
            {showToast && <div className="toast toast-top toast-end">
                <div className="alert alert-success">
                    <span>Profile Saved successfully.</span>
                </div>
            </div>}
        </div>
    )
}

export default Editprofile;