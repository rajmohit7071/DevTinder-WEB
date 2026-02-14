import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeRequest } from "../utils/requestSlice";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user, requestId }) => {

  if (!user) return null;

  const location = useLocation();
  const dispatch = useDispatch();


  const { firstName, lastName, gender, about, photoUrl, age } = user;

  const reviewRequest = async(status) =>{
    try{
      const res = await axios.post(BASE_URL+ "/request/review/" + status + "/"+ requestId,{},{withCredentials:true});
      dispatch(removeRequest(requestId));
    }
    catch(err){

    }
  }

  const handleSendRequest = async (status) => {
    try{
      const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + user._id, {},{withCredentials:true});

      dispatch(removeUserFromFeed(user._id));
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <>
      <div className="card bg-base-300 w-100 shadow-sm mx-4 ">
        <figure className="w-100 h-100 overflow-hidden">
  <img
    src={photoUrl}
    alt="photo"
    className="w-full h-full object-cover"
  />
</figure>

        <div className="card-body">
          <div className="flex justify-between items-center">
            <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && gender &&  <h2 className="card-title">{age + " , " + gender}</h2>}
          </div>

          <p className="w-full overflow-x-auto break-words resize-y">{about} </p>
         {location.pathname.startsWith("/requests") && <div className="card-actions justify-center">
            <button className="btn btn-primary mx-2" onClick={() =>reviewRequest("rejected")}>Ignore</button>
            <button className="btn btn-secondary" onClick={() =>reviewRequest("accepted")}>Interested</button>
          </div>}
          {location.pathname === "/" && <div className="card-actions justify-center">
            <button className="btn btn-primary mx-2" onClick={() =>handleSendRequest("ignored")}>Ignore</button>
            <button className="btn btn-secondary" onClick={() =>handleSendRequest("interested")}>Interested</button>
          </div>}
        </div>
      </div>

    </>
  )
}

export default UserCard;
