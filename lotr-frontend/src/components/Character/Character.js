import React from 'react';

import {Card, CardContent, CardMedia, CardActions, Button} from '@material-ui/core';

import axios from 'axios';

function Character(props) {
  const url = 'http://localhost:8081/up_vote';

  async function upVote(id, title) {
    try {
      const {data} = await axios.put(`${url}/${id}`);
      if (data === 'OK') {
        alert(`You voted for ${title}!`);
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      alert('There was an error');
    }
  }

  return (
    <Card>
      <CardMedia component="img" image={props.img} />
      <CardContent>
        <h3>{props.title}</h3>
      </CardContent>
      <CardActions style={{justifyContent: 'center'}}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            upVote(props.id, props.title);
          }}
        >
          Up Vote
        </Button>
      </CardActions>
    </Card>
  );
}

export default Character;
