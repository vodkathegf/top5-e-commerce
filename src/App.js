import React from "react";
import Navigator from "./components/Navigator";
import { Container, Navbar } from "reactstrap";
import BigContainer from "./components/BigContainer";
import { Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import CartList from "./components/CartList";

const App = () => {
  return (
    <div>
      <Navbar>
        <Navigator />
      </Navbar>
      <Container>
        <Routes>
          <Route path="/" element={<BigContainer />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/cart" element={<CartList />}></Route>
        </Routes>
      </Container>
    </div>
  );
};

export default App;
