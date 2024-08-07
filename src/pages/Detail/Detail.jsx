import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { REQUEST_ROUTE } from "../../routes";
import { getRequestById } from "../../services/requestservice";
import "./Detail.css"
const Detail = () => {
  const [request,setRequest]= useState("")
  const {id}= useParams()
  useEffect(() => {
    getRequestById(id).then(res=>{setRequest(res.data); console.log(res.data)})
  
    return () => {
    
    }
  }, [])
  
  return (
    <div>
      <Link to={REQUEST_ROUTE}>Geri</Link>
      <div>
        <div className="card-from-sections">
          <div>
            <label className="form-elements">Date</label> <p>{new Date(request.date).toLocaleString()}</p>
          </div>
          <div>
            <label className="form-elements">Submitted By:</label> <p>{request.submittedBy}</p>
          </div>
          <div>
            <label className="form-elements">Role:</label> <p>{request.role}</p>
          </div>
          <div>
            <label className="form-elements">Requirement:</label> <p>{request.requirement}</p>
          </div>
          <div>
            <label className="form-elements">History:</label> <p>{request.history}</p>
          </div>
          <div>
            <label className="form-elements">Limitations:</label> <p>{request.limitations}</p>
          </div>
          <div>
            <label className="form-elements">Approach:</label> <p>{request.approach}</p>
          </div>
          <div>
            <label className="form-elements">Gains:</label> <p>{request.gains}</p>
          </div>
        </div>
        <div className="card-image-section" />
        <div>
          <label className="form-elements">Sketch:</label>
        </div>
        <img src={request.sketch} alt="Sketch" />
      </div>
    </div>
  );
};

export default Detail;
