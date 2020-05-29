import React from "react";

import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";

import Movies from "./components/movies";
import NavBar from "./components/common/navbar";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";

function App() {
  return (
    <>
      <NavBar />
      <main className="container" style={{ paddingTop: 20 }}>
        {/* <Switch> */}
        <Route path="/movies" component={Movies} />
        <Route path="/customers" component={Customers} />
        <Route path="/rentals" component={Rentals} />
        <Route path="/" exact component={Movies} />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="not-found" />
        {/* </Switch> */}
      </main>
    </>
  );
}

export default App;
