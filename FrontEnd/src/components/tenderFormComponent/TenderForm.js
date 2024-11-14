import "./TenderForm.css";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { createTender } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import {
  Container,
  Card,
  Form as BootstrapForm,
  Button,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const TenderForm = () => {
  const navigate = useNavigate();

  const initialValues = {
    tender_reference: "",
    customer_name: "",
    description: "",
    issue_date: "",
    closing_date: "",
  };

  const validationSchema = Yup.object({
    tender_reference: Yup.string().required(
      "Tender Reference Number is required"
    ),
    customer_name: Yup.string().required("Customer Name is required"),
    description: Yup.string().required("Description is required"),
    issue_date: Yup.date().required("Issue Date is required"),
    closing_date: Yup.date().required("Closing Date is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    try {
      await createTender(values);
      toast.success("Tender created successfully!");
      resetForm();
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      toast.error("Failed to create tender. Please try again.");
    }
    setSubmitting(false);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <ToastContainer />
      <Card style={{ width: "100%", maxWidth: "600px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Create Tender</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form className="mt-3">
                <BootstrapForm.Group
                  controlId="tender_reference"
                  className="mb-2">
                  <BootstrapForm.Label>
                    Tender Reference Number
                  </BootstrapForm.Label>
                  <Field
                    type="text"
                    name="tender_reference"
                    className="form-control custom-input"
                  />
                  <ErrorMessage
                    name="tender_reference"
                    component="div"
                    className="text-danger"
                  />
                </BootstrapForm.Group>

                <BootstrapForm.Group controlId="customer_name" className="mb-2">
                  <BootstrapForm.Label>Customer Name</BootstrapForm.Label>
                  <Field
                    type="text"
                    name="customer_name"
                    className="form-control custom-input"
                  />
                  <ErrorMessage
                    name="customer_name"
                    component="div"
                    className="text-danger"
                  />
                </BootstrapForm.Group>

                <BootstrapForm.Group controlId="description" className="mb-2">
                  <BootstrapForm.Label>Description</BootstrapForm.Label>
                  <Field
                    as="textarea"
                    name="description"
                    className="form-control custom-input"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-danger"
                  />
                </BootstrapForm.Group>

                <BootstrapForm.Group controlId="issue_date" className="mb-2">
                  <BootstrapForm.Label>Issue Date</BootstrapForm.Label>
                  <Field
                    type="date"
                    name="issue_date"
                    className="form-control custom-input"
                  />
                  <ErrorMessage
                    name="issue_date"
                    component="div"
                    className="text-danger"
                  />
                </BootstrapForm.Group>

                <BootstrapForm.Group controlId="closing_date" className="mb-3">
                  <BootstrapForm.Label>Closing Date</BootstrapForm.Label>
                  <Field
                    type="date"
                    name="closing_date"
                    className="form-control custom-input"
                  />
                  <ErrorMessage
                    name="closing_date"
                    component="div"
                    className="text-danger"
                  />
                </BootstrapForm.Group>

                <Button
                  type="submit"
                  variant="dark"
                  disabled={isSubmitting}
                  className="w-100 mt-3">
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TenderForm;
