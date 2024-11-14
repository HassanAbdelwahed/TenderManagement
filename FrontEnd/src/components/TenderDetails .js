import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchTenderById } from "../services/api";
import { Card, Button, Spinner, Alert } from "react-bootstrap";

const TenderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tender, setTender] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTenderDetails = async () => {
      try {
        const fetchedTender = await fetchTenderById(id);
        setTender(fetchedTender);
      } catch (err) {
        setError("Failed to fetch tender details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getTenderDetails();
  }, [id]);

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
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <Card style={{ width: "100%", maxWidth: "800px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Tender Details</h2>
          <p>
            <strong>Tender Reference:</strong> {tender.tender_reference}
          </p>
          <p>
            <strong>Customer Name:</strong> {tender.customer_name}
          </p>
          <p>
            <strong>Description:</strong> {tender.description}
          </p>
          <p>
            <strong>Issue Date:</strong> {tender.issue_date}
          </p>
          <p>
            <strong>Closing Date:</strong> {tender.closing_date}
          </p>

          <div className="d-flex justify-content-center">
            <Button variant="secondary" onClick={() => navigate("/")}>
              Back to List
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default TenderDetails;
