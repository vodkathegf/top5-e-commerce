import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Col, Form, Input, Label, Table, Row } from "reactstrap";
import { postUser } from "../features/signInSlice";

const SignIn = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleChangeUserId = (event) => {
    setUserId(event.target.value);
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
    } else {
      dispatch(postUser({ userId, email, password }));
    }
    return(
      <div>
        
      </div>
    )
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Table style={{ display: "flex", flexDirection: "column" }}>
          <Col xs="3">
            <Row>
              <Label>
                user ID:
                <Input
                  type="text"
                  placeholder="your user ID"
                  onChange={handleChangeUserId}
                ></Input>
              </Label>
            </Row>
            <Row>
              <Label>
                e-mail:
                <Input
                  type="email"
                  placeholder="your e-mail address..."
                  onChange={handleChangeEmail}
                ></Input>
              </Label>
            </Row>
            <Row>
              <Label>
                password:
                <Input
                  type="password"
                  placeholder="your password"
                  value={password}
                  onChange={handleChangePassword}
                ></Input>
              </Label>
            </Row>
            <Row>
              <Button type="submit">Sign In</Button>
              {error && <Label>{error}</Label>}
            </Row>
          </Col>
        </Table>
      </Form>
    </div>
  );
};

export default SignIn;
