import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import ConnectionCard from "./ConnectionCard";



const Connections = () => {


    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connection);

    const getConnection = async () => {
        const res = await axios.get(BASE_URL + "/user/connection", { withCredentials: true })
        //   console.log(res);

        dispatch(addConnection(res.data.data));

    }



    useEffect(() => {
        getConnection();
    }, [])

    if (!connections) return;


    if (connections.length === 0) {
        return <h1 className="font-bold flex justify-center text-2xl my-10">No Connections </h1>
    }

    return (
        <>
            {connections &&
                <div className="flex flex-col items-center my-10">
                    <h1 className="text-4xl font-bold my-10">Connections</h1>
                    <div className="flex flex-wrap">
            {connections.map((connection) => <ConnectionCard key={connection._id} connection={connection}/>)}
            </div> 
            </div>}
       
        </>
    )
}

export default Connections;