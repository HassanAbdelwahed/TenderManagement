import "./Tender.css";
import { Button, Container } from "react-bootstrap";
import TenderList from "../components/TenderList";
import { Link } from "react-router-dom";

const Tender = () => {
  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-2 mt-5 list-header">
        <h2 className="tender-header">Tenders</h2>
        <Link to="/addTender">
          <Button variant="dark">Add New Tender</Button>
        </Link>
      </div>
      <TenderList />
    </Container>
  );
};

export default Tender;
