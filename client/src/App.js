import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import PokeDetail from "./components/PokeDetail/PokeDetail";
import CreatePoke from "./components/CreatePoke/CreatePoke";
import NavBar from "./components/NavBar/NavBar";

const App = () => {
  return (
    <>
      <Route exact path="/" component={Landing} /> 
      <Route path="/main" component={NavBar} />
      <Route exact path="/main" component={Home} />
      <Route exact path="/main/detail/:id" component={PokeDetail} /> 
      <Route exact path="/main/create_poke" component={CreatePoke} />
    </>
  );
};

export default App;
