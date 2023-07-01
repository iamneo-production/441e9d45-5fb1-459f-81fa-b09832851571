import { Button,Form, Input,Card, CardBody, CardHeader, Col, Container, FormGroup, Label, Row } from "reactstrap";
import { useState } from "react";
import { toast } from "react-toastify";
const Login=()=> {
    const[loginDetail,setLoginDetail]=useState({
        username:'',
        password:'',
    })

const handleChange=(event,field)=>{
    let actualValue=event.target.value
    setLoginDetail({
        ...loginDetail,
        [field]:actualValue
    });
};


const handleReset=()=>{
    setLoginDetail({
    username: '',
    password: '',
    });
};

const handleFormSubmit=(event)=>{
    event.preventDefault();
    console.log(loginDetail);

    //validation
    if(loginDetail.username.trim()=='' || loginDetail.password.trim()==''){
        toast.error("Username or Password is required")
        return;

    }

    //Submitting data to generate token

}

    return (
        <Container>
        <Row className="mt-4">
        <Col sm={{size:6,offset:3}}>
        <Card color="dark" outline>
        <CardHeader>Login Page</CardHeader>
        <CardBody>
            <Form onSubmit={handleFormSubmit}>
                <FormGroup>
                <Label for="email">Enter email</Label>
                <Input type="email"
                id="email"
                value={loginDetail.username}
                onChange={(e)=>handleChange(e,'username')}
                />

                </FormGroup>
                <FormGroup>
                <Label for="password">Enter password</Label>
                <Input type="password"
                id="password"
                value={loginDetail.password}
                onChange={(e)=>handleChange(e,'password')}
                />
                
                </FormGroup>

                <Container className="text-center">
                <Button color="dark" outline>
                Login
                </Button>
                <Button onClick={handleReset} color="dark" outline type="reset" className="ms-2">
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