import React from 'react';

import {AppBar, Container, Toolbar, Typography} from '@material-ui/core';

import Characters from './components/Characters/Characters';

import './App.css';

function App() {
  return (
    <>
      <AppBar className="navbar" position="static">
        <Toolbar>
          <Typography variant="h5">Lord Of The Rings Mini-Project</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Characters></Characters>
      </Container>
    </>
  );
}

export default App;
