import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
import { removeUser } from "../utils/userSlice";


const Navbar = () => {

  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async() =>{
    await axios.post(BASE_URL + "/logout", {},{withCredentials: true});
    navigate("/login");
    dispatch(removeUser());
  }

  const handleHomeButton = () =>{
    if(user){
      navigate("/");
    }
    else{
      navigate("/login");
    }
  }

  return (
    <>
      <div className="navbar bg-base-300 shadow-sm fixed top-0 left-0 w-full z-50">
        
        <div className="flex-1">
          <button className="btn btn-ghost text-xl" onClick={handleHomeButton}>DevTinder </button>
        </div> 
        {user &&
          <div className="flex gap-2">

            <div className="dropdown dropdown-end flex">
              <p className="px-4"> Welcome, {user.firstName}</p>
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">

                  <img
                    alt="user photo"
                    src={user.photoUrl} />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li>
                  <Link to={"/profile"} className="justify-between">
                    Profile
                  </Link>
                </li>
                <li><Link to={"/connections"}>Connections</Link></li>
                <li><Link to={"/requests"}>Requests</Link></li>
                <li><a onClick={handleLogout}>Logout</a></li>
              </ul>
            </div>
          </div>}
      </div>
    </>

  );
}

export default Navbar;