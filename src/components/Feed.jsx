import axios from "axios";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserToFeed } from "../utils/feedSlice";

const Feed = () => {

    const feed = useSelector((store) => store.feed);
    const dispatch = useDispatch();

    const feedData = async () => {
        
        try {

           if (!feed) return;
            const res = await axios.get(BASE_URL + "/feed", { withCredentials: true })
          //  console.log(res);
            dispatch(addUserToFeed(res.data));
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        
        feedData();
    }, []);

    if(!feed) return;

    if(feed.length ===0){
        
        return <h1 className="font-bold flex justify-center text-2xl my-20">No New User Found</h1> 
    }

    return (
        <>
            {feed &&
                <div className="flex justify-center my-16">
                    <UserCard user={feed[0]} />
                </div>
            }

        </>
    );
}

export default Feed;