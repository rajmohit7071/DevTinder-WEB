import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requestSlice";
import UserCard from "./UserCard";

const Request = () =>{
   

    const dispatch = useDispatch();
    const requests = useSelector((store) => store.request);
 

    const getRequest = async()=>{
        try{
           
            const res =  await axios.get(BASE_URL+ "/user/request/received", {withCredentials:true});
            // console.log(res);
            dispatch(addRequest(res?.data?.data));

        }catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
       
        getRequest();
    },[])

    if(!requests) return;

   if(requests.length ===0){
    return <h1 className="font-bold flex justify-center text-2xl my-16">No New Requests</h1>
   }


    return(<>
    {requests && 
        <div className="flex flex-col items-center my-16">
            <h1 className="text-4xl font-bold my-10">Requests</h1>
            <div className="flex flex-wrap">
            {requests.map((request) => <UserCard key={ request._id} user={request.fromUserId} requestId={request._id}/>)}
            </div>
        </div>  }

    </>)
}

export default Request;