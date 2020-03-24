import React from 'react';

import {AppBar, Container, Toolbar, Typography, Button} from '@material-ui/core';

import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import Characters from './components/Characters/Characters';

import './App.css';

function App() {
  const home_url = 'http://localhost:8081/characters';
  const lotr_url = 'http://localhost:8081/lotr';
  const hobb_url = 'http://localhost:8081/hobbit';
  const silm_url = 'http://localhost:8081/silmarillion';

  return (
    <>
      <Router>
        <AppBar className="navbar" position="static">
          <Toolbar>
            <Typography variant="h5">Lord Of The Rings Mini-Project</Typography>
            <Button component={Link} to={'/'} color="inherit">
              Home
            </Button>
            <Button component={Link} to={'/lotr'} color="inherit">
              LOTR Characters
            </Button>
            <Button component={Link} to={'/hobbit'} color="inherit">
              Hobbit Characters
            </Button>
            <Button component={Link} to={'/silmarillion'} color="inherit">
              Silmarillion Characters
            </Button>
          </Toolbar>
        </AppBar>

        <Container>
          <Switch>
            <Route path="/lotr">
              <Characters url={lotr_url}></Characters>
            </Route>
            <Route path="/hobbit">
              <Characters url={hobb_url}></Characters>
            </Route>
            <Route path="/silmarillion">
              <Characters url={silm_url}></Characters>
            </Route>
            <Route path="/">
              <Characters url={home_url}></Characters>
            </Route>
          </Switch>
        </Container>
      </Router>
    </>
  );
}

export default App;
