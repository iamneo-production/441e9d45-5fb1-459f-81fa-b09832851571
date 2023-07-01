import { Row,Col,Button, Card, CardBody, CardHeader, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const Signup=()=> {
    const [data,setData]=useState({
        name: '',
        email:'',
        password:'',
        dob:'',
    })

    const [error,setError]=useState({
        errors:{},
        isError:false
    })

    useEffect(()=>{
      
    },[data]);

    //handle Change
    function handleChange(event,field) {

        setData({ ...data, [field]: event.target.value });
    }
    
    //resetting data
    const resetData=()=>{
     setData({
        name: '',
        email:'',
        password:'',
        dob:'',
     })    
    }

    //submitting the form
    const submitForm=(event)=>{
        event.preventDefault()
        //data validation

        //call server api to send data
            toast.success("User Reistered Successfully")
            setData({
                name: '',
                email:'',
                password:'',
                dob:'', 
        })
    }


    return (
            <Container>
                <Row className="mt-4">

               {/*{JSON.stringify(data)}*/}
                <Col sm={{size:6,offset:3}}>
                
                <Card color="dark" outline>
                    <CardHeader>
                        <h3>Fill Information to register</h3>    
                    </CardHeader>
                <CardBody>
                    {/*Creating signup form*/}
                    <Form onSubmit={submitForm}>
                      
                    
                        <FormGroup>
                            <Label for="Name">Enter Name</Label>
                            <Input
                            type="text"
                            placeholder="Enter here"
                            id="name"
                            onChange={(e)=>handleChange(e,'name')}
                            value={data.name}
                            />
                        
                        </FormGroup>

                        <FormGroup>
                            <Label for="Email">Enter email</Label>
                            <Input
                            type="email"
                            placeholder="Enter here"
                            id="email"
                            onChange={(e)=>handleChange(e,'email')}
                            value={data.email}
                            />
                        
                        </FormGroup>

                        <FormGroup>
                            <Label for="Password">Enter password</Label>
                            <Input
                            type="password"
                            placeholder="Enter here"
                            id="password"
                            onChange={(e)=>handleChange(e,'password')}
                            value={data.password}
                            />
                        </FormGroup>

                         <div>
                         <Label for="DOB">DOB</Label>
                        <Input
                            type="date"
                            placeholder="Format:ddmmyyyy"
                            id="dob"
                            onChange={(e)=>handleChange(e,'dob')}
                            value={data.dob}
                        />
                        </div>

                    
               

            <FormGroup>
            <Label for="exampleSelect">
              Gender
            </Label>
            <Input
              id="exampleSelect"
              name="select"
              type="select"
            >
              <option>
                Male
              </option>
              <option>
                Female
              </option>
              <option>
                Others
              </option>
              </Input>
            </FormGroup>

                        <Container className="text-center">
                        <Button outline color="dark">Register</Button>
                        <Button onClick={resetData} outline color="dark" className="ms-2" type="reset">Reset</Button>
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