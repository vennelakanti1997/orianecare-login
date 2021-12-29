import { Component } from "react";
import { Button, Form, Row, Col} from "react-bootstrap";
import CreateUser from "./CreateUserForm";
import validatePhonenumber from "./Validations";


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phonenumber: "",
      password: "",
      role: "",
      isSuccess: false,
      authToken: "",
      isPhoneNumberEmpty: false,
      isPhoneNumberValid: true,
      isPasswordEmpty: false,
      errorMessage: "",
    };
  }
  componentDidMount(){
    
  }
  sendLoginRequest = (userName, password) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var url = process.env.REACT_APP_API_URL+"/login";
    var raw = JSON.stringify({
      phoneNumber: `${userName}`,
      password: `${password}`,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) =>
        result["status"] === "200"
          ? this.setState(
              {
                isSuccess: true,
                role: result["role"],
                authToken: result["Authorization"],
              },
              () => console.log("Login Successfull")
            )
          : this.setState(
              {
                isSuccess: false,
                role: "",
                authToken: "",
                errorMessage: "Login Failed",
              },
              () => console.error("Login UnSuccessfull")
            )
      )
      .catch((error) => {
        console.error(error);
        alert(error.message);
      });
  };

  getWelcomeMessage = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `${this.state.authToken}`);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };
    var url = process.env.REACT_APP_API_URL +"/api/doctor"
    fetch(url, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleOnSubmit = (event) => {
    event.preventDefault();
    let validationFlag = true;
    this.setState({ errorMessage: "" });
    if (!this.state.phonenumber.trim()) {
      validationFlag = false;
      this.setState(
        { isPhoneNumberEmpty: true, isPhoneNumberValid: true },
        () => console.error("PhoneNumber is Empty")
      );
    } else if (!validatePhonenumber(this.state.phonenumber)) {
      validationFlag = false;
      this.setState(
        { isPhoneNumberValid: false, isPhoneNumberEmpty: false },
        () => console.error("Phone Number is not valid")
      );
    } else{
      
      this.setState(
        { isPhoneNumberValid: true, isPhoneNumberEmpty: false },
        () => console.log("Phone Number is valid")
      );
    }
    if (!this.state.password.trim()) {
      validationFlag = false;
      this.setState({ isPasswordEmpty: true }, () =>
        console.error("Password is Empty")
      );
    } else{
      this.setState({ isPasswordEmpty: false }, () =>
        console.log("Password is valid")
      );
    }
    if (validationFlag)
      this.sendLoginRequest(this.state.phonenumber, this.state.password);
  };
  render() {
    if (!this.state.isSuccess)
      return (
        <Form
          className="d-flex h-100 flex-column align-items-center mr-5 pt-5"
          onSubmit={this.handleOnSubmit}
        >
          <Row>
            <Form.Group>
              <Form.Text className="text-danger">
                {this.state.errorMessage}
              </Form.Text>
            </Form.Group>
          </Row>

          <Row className="pb-3 mt-5 pt-5">
            <Form.Group as={Col} controlId="formBasicPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                onChange={this.handleChange}
                name="phonenumber"
                placeholder="Enter Phone Number"
                value={this.state.phonenumber}
              />
              {this.state.isPhoneNumberEmpty && (
                <Form.Text className="text-danger">
                  Phone Number should not be empty
                </Form.Text>
              )}
              {!this.state.isPhoneNumberValid && (
                <Form.Text className="text-danger">
                  Phone Number is of not valid format
                </Form.Text>
              )}
            </Form.Group>
          </Row>

          <Row className="pb-3">
            <Form.Group as={Col} controlId="formBasicPassword">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
                name="password"
                placeholder="Password"
              />
              {this.state.isPasswordEmpty && (
                <Form.Text className="text-danger">
                  Password should not be empty
                </Form.Text>
              )}
            </Form.Group>
          </Row>

          

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      );
    else if (["ROLE_SALESPERSON", "ROLE_HR"].some((role) => role === this.state.role ))
      return (
        <CreateUser authToken={this.state.authToken} role={this.state.role}/>
      );
    else
      return (
        <div>
          <p>UnAuthorized</p>
        </div>
      );
  }
}

export default Login;
