import React from "react";
import "./RequestCard.css";

const RequestCard = ({
  date,
  submittedBy,
  role,
  requirement,
  history,
  limitations,
  approach,
  gains,
  sketch,
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
        <div>
          <label>Requirement:</label> <p>{requirement}</p>
        </div>
        <div>
          <label>History:</label> <p>{history}</p>
        </div>
        <div>
          <label>Limitations:</label> <p>{limitations}</p>
        </div>
        <div>
          <label>Approach:</label> <p>{approach}</p>
        </div>
        <div>
          <label>Gains:</label> <p>{gains}</p>
        </div>
      </div>
      <div className="card-image-section" />
      <div>
        <label>Sketch:</label>
      </div>
      <img src={sketch} alt="Sketch" />
    </div>
  );
};

export default RequestCard;
