import React from 'react';

import {Card, CardContent, CardMedia} from '@material-ui/core';

function Character(props) {
  return (
    <Card>
      <CardMedia component="img" image={props.img} />
      <CardContent>
        <h3>{props.title}</h3>
      </CardContent>
    </Card>
  );
}

export default Character;
