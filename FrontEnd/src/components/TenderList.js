import "./TenderList.css";
import React, { useState, useEffect } from "react";
import { Table, Button, Alert, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { fetchTenders } from "../services/api";

const TenderList = () => {
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getTenders = async () => {
      try {
        const fetchedTenders = await fetchTenders();
        setTenders(fetchedTenders);
      } catch (err) {
        setError("Failed to fetch tenders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getTenders();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <Alert variant="danger">{error}</Alert>
      </div>
    );
  }

  return (
    <div className="table-responsive table-class">
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Tender Reference</th>
            <th>Customer Name</th>
            <th>Issue Date</th>
            <th>Closing Date</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {tenders.map((tender) => (
            <tr key={tender.id}>
              <td>{tender.tender_reference}</td>
              <td>{tender.customer_name}</td>
              <td>{tender.issue_date}</td>
              <td>{tender.closing_date}</td>
              <td>
                <Button
                  size="sm"
                  variant="dark"
                  onClick={() => navigate(`/tenders/${tender.id}`)}>
                  View Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TenderList;
