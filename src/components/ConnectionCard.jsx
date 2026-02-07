const ConnectionCard = ({ connection}) =>{

    const {firstName, lastName,about,age,gender,photoUrl} = connection;

    return (
        <>
        <div className="flex mx-5 mb-10">
            <div className="card bg-base-300 w-92 shadow-sm">
                <figure>
                    <img
                        src= {photoUrl}
                        alt="photo" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title"> {firstName + " " +lastName}</h2>
                  {age && gender &&  <h2 className=""> {age + "  , " +gender}</h2> }
                    <p>{about}</p>
                    
                </div>
            </div>
            </div>
        </>
    )
}

export default ConnectionCard;