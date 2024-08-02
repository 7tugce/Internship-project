import React, { useEffect, useState } from 'react';
import { getRequests } from '../../services/requestservice';
import RequestCard from '../../components/Requests/RequestCard';
import { Link } from 'react-router-dom';
import { HOME_ROUTE } from '../../routes';

const Requests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    getRequests().then(response => {
      const sortedRequests = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setRequests(sortedRequests);
      console.log(sortedRequests);
    });
  }, []);

  return (
    <div>
      <Link to={HOME_ROUTE}>Ana Sayfa</Link>
      <h2>Daha önceki talepler</h2>
      <ul>
        {requests.map(request => (
          <RequestCard
            key={request.id}
            date={request.date}
            submittedBy={request.submittedBy}
            role={request.role}
            requirement={request.requirement}
            history={request.history}
            limitations={request.limitations}
            approach={request.approach}
            gains={request.gains}
            sketch={request.sketch}
          />
        ))}
      </ul>
    </div>
  );
};

export default Requests;
