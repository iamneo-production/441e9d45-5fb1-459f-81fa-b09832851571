import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Container, FormGroup, Label, Row  ,Button, Form, Input  } from "reactstrap";
import { isLoggedInn } from "./Athentication";


const Login = () => {
  const [loginDetail, setLoginDetail] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginDetail((prevLoginDetail) => ({
      ...prevLoginDetail,
      [name]: value,
    }));
  };

  const resetLoginDetail = () => {
    setLoginDetail({
      email: "",
      password: "",
    });
  };

  const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInn());

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!loginDetail.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    }

    if (!loginDetail.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      // Send a request to the backend for login
      axios
        .post("https://8080-ebffcebdfaddeebcaddaceaeaadbdbabf.project.examly.io/users/login", loginDetail)
        .then((response) => {
          // Handle the login success here (e.g., store the token in local storage)
          alert("Login successful");
          console.log(response.data);
          setIsLoggedIn(true); // Set the state to true if the login is successful
          localStorage.setItem("isLoggedIn", "true");
          resetLoginDetail();

        })
        .catch((error) => {
          // Handle login failure or error
          alert("Login failed");
          console.error(error);
          alert("Login failed. Please check your credentials.");
        });
    }
  };

  

  // Conditional rendering based on isLoggedIn state
  if (isLoggedIn) {
    // Redirect to the home page ('Homes') if the user is logged in
    return <Navigate to={"/welcome"} />;
  }

  return (
    <Container>
      <Row className="mt-4">
        <Col sm={{ size: 6, offset: 3 }}>
          <Card color="dark" outline>
            <CardHeader>Login Page</CardHeader>
            <CardBody>
              <Form onSubmit={handleFormSubmit}>
                <FormGroup>
                  <Label for="email">Enter email</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={loginDetail.email}
                    onChange={handleChange}
                    invalid={!!errors.email}
                  />
                  {errors.email && <span className="text-danger">{errors.email}</span>}
                </FormGroup>
                <FormGroup>
                  <Label for="password">Enter password</Label>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    value={loginDetail.password}
                    onChange={handleChange}
                    invalid={!!errors.password}
                  />
                  {errors.password && <span className="text-danger">{errors.password}</span>}
                </FormGroup>
                <Container className="text-center">
                  <Button color="dark" outline>
                    Login
                  </Button>
                  <Button onClick={resetLoginDetail} color="dark" outline type="reset" className="ms-2">
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

export default Login;
