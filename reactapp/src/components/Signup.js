import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const isValidEmail = (email) => {
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailPattern.test(email);
  };

  const handleChange = (event, field) => {
    setData({ ...data, [field]: event.target.value });
  };

  const resetData = () => {
    setData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const validateForm = () => {
    const errors = {};
    let isError = false;

    if (!data.name.trim()) {
      errors.name = "Name is required";
      isError = true;
    }else if (data.name.trim().length < 4 || data.name.trim().length > 20) {
        errors.name = "Name should be between 4 and 20 characters";
        isError = true;
    }

    if (!data.email.trim()) {
      errors.email = "Email is required";
      isError = true;
    } else if (!isValidEmail(data.email)) {
      errors.email = "Invalid email format";
      isError = true;
    }

    if (!data.password.trim()) {
        errors.password = "Password is required";
        isError = true;
      } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,12}$/.test(data.password.trim())) {
        errors.password = "Password should be between 7 and 12 characters and contain at least one capital letter, one small letter, one number, and one special character (@$!%*?&)";
        isError = true;
      }

    if (!data.confirmPassword.trim()) {
        errors.confirmPassword = "Confirm Password is required";
        isError = true;
      }
  
      if (data.password.trim() !== data.confirmPassword.trim()) {
        errors.confirmPassword = "Passwords do not match";
        isError = true;
      }

    setError(errors);
    return !isError;
  };

  const navigate = useNavigate(); 

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      // Send a request to the backend for registration
      axios
        .post("https://8080-aabbafaeecebdfaddeebcaddacebceecbecadec.project.examly.io/users/signup", data)
        .then((response) => {
          console.log(response.data);
          setData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
          alert("Signup Successful");
          navigate("/login");
        })
        .catch((error) => {
            console.error(error);
  
            if (error.response && error.response.status === 409) {
              alert("User already registered.");
            } else if (error.response && error.response.status === 400) {
                alert("User already registered.");
            }else if (error.response && error.response.status === 500) {
                alert("User already registered.");
            }else {
              alert("User already registered");
            }
          });
    }
  };

  return (
    <Container>
      <Row className="mt-4">
        <Col sm={{ size: 6, offset: 3 }}>
          <Card color="dark" outline>
            <CardHeader>
              <h3>Sign Up</h3>
            </CardHeader>
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="Name">Enter Name</Label>
                  <Input
                    type="text"
                    placeholder="Enter here"
                    id="name"
                    onChange={(e) => handleChange(e, "name")}
                    value={data.name}
                    invalid={error.name !== ""}
                  />
                  {error.name && <span className="text-danger">{error.name}</span>}
                </FormGroup>

                <FormGroup>
                  <Label for="Email">Enter email</Label>
                  <Input
                    type="email"
                    placeholder="Enter here"
                    id="email"
                    onChange={(e) => handleChange(e, "email")}
                    value={data.email}
                    invalid={error.email !== ""}
                  />
                  {error.email && <span className="text-danger">{error.email}</span>}
                </FormGroup>

                <FormGroup>
                  <Label for="Password">Enter password</Label>
                  <Input
                    type="password"
                    placeholder="Enter here"
                    id="password"
                    onChange={(e) => handleChange(e, "password")}
                    value={data.password}
                    invalid={error.password !== ""}
                  />
                  {error.password && <span className="text-danger">{error.password}</span>}
                </FormGroup>

                <FormGroup>
                  <Label for="ConfirmPassword">Confirm password</Label>
                  <Input
                    type="password"
                    placeholder="Enter here"
                    id="confirmPassword"
                    onChange={(e) => handleChange(e, "confirmPassword")}
                    value={data.confirmPassword}
                    invalid={error.confirmPassword !== ""}
                  />
                  {error.confirmPassword && (
                    <span className="text-danger">{error.confirmPassword}</span>
                  )}
                </FormGroup>    

                <Container className="text-center">
                  <Button outline color="dark">
                    Register
                  </Button>
                  <Button onClick={resetData} outline color="dark" className="ms-2" type="reset">
                    Reset
                  </Button>
                </Container>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
