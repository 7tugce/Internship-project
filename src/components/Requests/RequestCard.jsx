import React from "react";
import "./RequestCard.css";
import { Link } from "react-router-dom";

const RequestCard = ({
  date,
  submittedBy,
  role,id,
 
}) => {
  return (
    <div className="request-card">
      <div className="card-from-sections">
        <div>
          <label>Date</label> <p>{new Date(date).toLocaleString()}</p>
        </div>
        <div>
          <label>Submitted By:</label> <p>{submittedBy}</p>
        </div>
        <div>
          <label>Role:</label> <p>{role}</p>
        </div>
        </div> 
       <Link to={`/request/${id}`}> <button className="request-detail-btn">Detay</button> </Link>
    </div>
  );
};

export default RequestCard;
