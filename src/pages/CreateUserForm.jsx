import { Component } from "react";
import { Button, Form, Row, Col, Modal } from "react-bootstrap";
import validatePhonenumber, {
  validateEmail,
  validateName,
  validateRegistrationNumber,
} from "./Validations";
class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phonenumber: "",
      email: "",
      address: "",
      registrationNumber: "",
      userRole: this.props.role === "ROLE_SALESPERSON"?"ROLE_PATIENT":"ROLE_SELECT",
      bloodType: "BLOODTYPE",
      userSex: "sex",
      isNameEmpty: false,
      isNameValid: true,
      isPhoneNumberEmpty: false,
      isPhoneNumberValid: true,
      isEmailEmpty: false,
      isEmailValid: true,
      isAddressEmpty: false,
      isAddressValid: true,
      isRegistrationNumberEmpty: false,
      isRegistrationNumberValid: true,
      isSexSelected: true,
      isBloodTypeSelected: true,
      showSuccess: false,
      showFailure: false,
      failureMessage: "",
    };
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  createUser = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `${this.props.authToken}`);
    myHeaders.append("Content-Type", "application/json");
    console.log(myHeaders);
    var raw = JSON.stringify({
      phoneNumber: `${this.state.phonenumber}`,
      role: `${this.state.userRole}`,
      gender: `${this.state.userSex}`,
      registrationNumber: `${this.state.registrationNumber}`,
      name: `${this.state.name}`,
      experience: "1",
      bloodType:
        this.state.bloodType === "U" ? null : `${this.state.bloodType}`,
      email: `${this.state.email}`,
    });

    console.log("ROLE IS: " + this.state.userRole);

    let url = process.env.REACT_APP_API_URL + "/createuser/cnm";
    console.log(
      ["ROLE_DOCTOR", "ROLE_NURSE"].some((role) => role === this.state.userRole)
    );
    if (
      ["ROLE_DOCTOR", "ROLE_NURSE"].some((role) => role === this.state.userRole)
    )
      url = process.env.REACT_APP_API_URL + "/createuser/dnr";

    console.log("url: " + url);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(url, requestOptions)
      .then((response) => {
        console.log(response.ok);
        if (response.ok) {
          return null;
        } else {
          return response.json();
        }
      })
      .then((jsonBody) => {
        if (!jsonBody) this.handleSuccessShow();
        else {
          this.setState(
            { failureMessage: jsonBody.errors[0]["errorMessage"] },
            () => console.error(jsonBody.errors[0]["errorMessage"])
          );

          this.handleFailureShow();
        }
      })
      .catch((error) => {
        this.setState({ failureMessage: "Failed to Create user" });
        this.handleFailureShow();
      });
  };
  handleSuccessShow = () => {
    this.setState({
      showSuccess: true,
    });
  };
  handleFailureShow = () => {
    this.setState({ showFailure: true });
  };
  handleSuccessClose = () => {
    this.setState({
      showSuccess: false,
      name: "",
      phonenumber: "",
      email: "",
      address: "",
      registrationNumber: "",
      userRole: "ROLE_SELECT",
      bloodType: "BLOODTYPE",
      userSex: "sex",
      isSexSelected: true,
      isBloodTypeSelected: true,
    });
  };
  handleFailureClose = () => {
    this.setState({ showFailure: false });
  };
  handleOnSubmit = (event) => {
    event.preventDefault();
    let validationFlag = true;
    this.setState({ errorMessage: "" });

    if (!this.state.name.trim()) {
      validationFlag = false;
      this.setState({ isNameEmpty: true, isNameValid: true }, () =>
        console.error("Name is empty")
      );
    } else if (!validateName(this.state.name)) {
      validationFlag = false;
      this.setState({ isNameValid: false, isNameEmpty: false }, () =>
        console.error("Name is not of valid format")
      );
    } else {
      this.setState({ isNameValid: true, isNameEmpty: false }, () =>
        console.log("Name is valid")
      );
    }
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
        () => console.log("Phone Number is not valid")
      );
    } else {
      this.setState(
        { isPhoneNumberEmpty: false, isPhoneNumberValid: true },
        () => console.log("Phone Number is valid")
      );
    }

    if (!this.state.email.trim()) {
      validationFlag = false;
      this.setState({ isEmailEmpty: true, isEmailValid: true }, () =>
        console.error("Email is Empty")
      );
    } else if (!validateEmail(this.state.email)) {
      validationFlag = false;
      this.setState({ isEmailEmpty: false, isEmailValid: false }, () =>
        console.error("Email is not valid")
      );
    } else {
      this.setState({ isEmailEmpty: false, isEmailValid: true }, () =>
        console.log("Valid Email")
      );
    }
    if (!this.state.address.trim()) {
      validationFlag = false;
      this.setState({ isAddressEmpty: true, isAddressValid: true }, () =>
        console.error("Address is Empty")
      );
    } else {
      this.setState({ isAddressEmpty: false, isAddressValid: true }, () =>
        console.log("Address is Valid")
      );
    }
    if (
      (this.state.userRole === "ROLE_DOCTOR") |
      (this.state.userRole === "ROLE_NURSE")
    ) {
      if (!this.state.registrationNumber.trim()) {
        validationFlag = false;
        this.setState(
          { isRegistrationNumberEmpty: true, isRegistrationNumberValid: true },
          () => console.error("Registration Number is Empty")
        );
      } else if (!validateRegistrationNumber(this.state.registrationNumber)) {
        validationFlag = false;
        this.setState(
          {
            isRegistrationNumberEmpty: false,
            isRegistrationNumberValid: false,
          },
          () => console.error("Registraion Number is of not valid format")
        );
      } else {
        this.setState(
          { isRegistrationNumberEmpty: false, isRegistrationNumberValid: true },
          () => console.log("Registration Number is Valid")
        );
      }
    }
    if (this.state.userSex === "sex") {
      validationFlag = false;
      this.setState({ isSexSelected: false }, () =>
        console.error("Sex needs to be selected")
      );
    } else {
      this.setState({ isSexSelected: true }, () =>
        console.log("Sex is selected")
      );
    }
    if (this.state.bloodType === "BLOODTYPE") {
      validationFlag = false;
      this.setState({ isBloodTypeSelected: false }, () =>
        console.error("BloodType needs to be selected")
      );
    } else {
      this.setState({ isBloodTypeSelected: true }, () =>
        console.log("BloodType is Selected")
      );
    }
    if (validationFlag) {
      this.createUser();
    }
  };

  render() {
    return (
      <Form
        className="d-flex h-100 flex-column align-items-center mr-5"
        onSubmit={this.handleOnSubmit}
      >
        <Row className="mt-4">
          <Form.Group as={Col}>
            <Form.Text>
              <h2>Create User Form</h2>
            </Form.Text>
          </Form.Group>
        </Row>
        <Row className="pb-3">
          <Form.Group as={Col}>
            <Form.Select
              onChange={this.handleChange}
              value={this.state.userRole}
              autoFocus
              name="userRole"
            >
              {this.props.role === "ROLE_HR" && (
                <>
                  <option value="ROLE_SELECT">Select Role</option>
                  <option value="ROLE_DOCTOR">DOCTOR</option>
                  <option value="ROLE_NURSE">NURSE</option>
                  <option value="ROLE_CAREMANAGER">CLINICALCOORDINATOR</option>
                  <option value="ROLE_CAREGIVER">CAREGIVER</option>

                  <option value="ROLE_SALESGUY">SALESPERSON</option>
                </>
              )}
              {this.props.role === "ROLE_SALESPERSON" && (
                <>
                  <option value="ROLE_PATIENT">PATIENT</option>
                </>
              )}
            </Form.Select>
          </Form.Group>
        </Row>
        {this.state.userRole !== "ROLE_SELECT" && (
          <Row className="pb-3">
            <Form.Group as={Col} controlId="formBasicName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                onChange={this.handleChange}
                name="name"
                placeholder="Enter Full Name"
                value={this.state.fullname}
              />
              {this.state.isNameEmpty && (
                <Form.Text className="text-danger">
                  Name should not be empty
                </Form.Text>
              )}
              {!this.state.isNameValid && (
                <Form.Text className="text-danger">
                  Name is of not valid format
                </Form.Text>
              )}
            </Form.Group>
          </Row>
        )}
        {this.state.userRole !== "ROLE_SELECT" && (
          <Row className="pb-3">
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
        )}
        {this.state.userRole !== "ROLE_SELECT" && (
          <Row className="pb-3">
            <Form.Group as={Col} controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                onChange={this.handleChange}
                name="email"
                placeholder="Enter Email"
                value={this.state.email}
              />
              {this.state.isEmailEmpty && (
                <Form.Text className="text-danger">
                  Email should not be empty
                </Form.Text>
              )}
              {!this.state.isEmailValid && (
                <Form.Text className="text-danger">
                  Email is of not valid format
                </Form.Text>
              )}
            </Form.Group>
          </Row>
        )}

        {(this.state.userRole === "ROLE_DOCTOR" ||
          this.state.userRole === "ROLE_NURSE") && (
          <Row className="pb-3">
            <Form.Group as={Col} controlId="formBasicRegistrationNumber">
              <Form.Label>Registration Number</Form.Label>
              <Form.Control
                type="text"
                onChange={this.handleChange}
                name="registrationNumber"
                placeholder="Enter Registration Number"
                value={this.state.registrationNumber}
              />
              {this.state.isRegistrationNumberEmpty && (
                <Form.Text className="text-danger">
                  Registration Number should not be empty
                </Form.Text>
              )}
              {!this.state.isRegistrationNumberValid && (
                <Form.Text className="text-danger">
                  Registration Number is of not valid format
                </Form.Text>
              )}
            </Form.Group>
          </Row>
        )}
        {this.state.userRole !== "ROLE_SELECT" && (
          <Row className="pb-3">
            <Form.Group as={Col} controlId="formBasicSex">
              <Form.Select
                onChange={this.handleChange}
                autoFocus
                name="userSex"
              >
                <option value="sex">Sex</option>
                <option value="F">Female</option>
                <option value="M">Male</option>
              </Form.Select>
              {!this.state.isSexSelected && (
                <Form.Text className="text-danger">Please select Sex</Form.Text>
              )}
            </Form.Group>
            <Form.Group as={Col} controlId="formBasicBloodType">
              <Form.Select
                onChange={this.handleChange}
                autoFocus
                name="bloodType"
              >
                <option value="BLOODTYPE">Blood Type</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="U">Unknown</option>
              </Form.Select>
              {!this.state.isBloodTypeSelected && (
                <Form.Text className="text-danger">
                  Please select Blood Type
                </Form.Text>
              )}
            </Form.Group>
          </Row>
        )}
        {this.state.userRole !== "ROLE_SELECT" && (
          <Row className="pb-3">
            <Form.Group as={Col} controlId="formBasicAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={this.state.address}
                onChange={this.handleChange}
                name="address"
              />
              {this.state.isAddressEmpty && (
                <Form.Text className="text-danger">
                  Address should not be empty
                </Form.Text>
              )}
              {!this.state.isAddressValid && (
                <Form.Text className="text-danger">
                  Address is of not valid format
                </Form.Text>
              )}
            </Form.Group>
          </Row>
        )}

        {this.state.userRole !== "ROLE_SELECT" && (
          <>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Modal
              show={this.state.showSuccess}
              onHide={this.handleSuccessClose}
              animation={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Usesr Created</Modal.Title>
              </Modal.Header>
              <Modal.Body className="text-success">
                User Details Saved
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={this.handleSuccessClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>

            <Modal
              show={this.state.showFailure}
              onHide={this.handleFailureClose}
              animation={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Failed</Modal.Title>
              </Modal.Header>
              <Modal.Body className="text-danger">
                {this.state.failureMessage}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={this.handleFailureClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        )}
      </Form>
    );
  }
}
export default CreateUser;
