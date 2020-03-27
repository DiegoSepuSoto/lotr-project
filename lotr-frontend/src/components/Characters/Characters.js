import React, {useState, useEffect} from 'react';

import {Grid} from '@material-ui/core';

import axios from 'axios';

import Character from '../Character/Character';

require('dotenv').config();

function Characters(props) {
  const [characters, setCharacters] = useState();
  const [loading, setLoading] = useState(true);

  function renderCharacters(characters) {
    let charactersItems = [];
    for (let i = 0; i < characters.length; i++) {
      charactersItems.push(
        <Grid item xs={12} sm={3} lg={2} key={i}>
          <Character
            id={characters[i].id}
            link={characters[i].link}
            img={characters[i].image}
            title={characters[i].title}
          ></Character>
        </Grid>,
      );
    }
    return charactersItems;
  }

  useEffect(() => {
    async function fetchCharacters() {
      const {data} = await axios.get(props.url);
      setCharacters(data);
      setLoading(false);
    }

    fetchCharacters();
  }, [props.url]);

  return (
    <Grid container spacing={2}>
      {loading ? 'Loading...' : renderCharacters(characters)}
    </Grid>
  );
}

export default Characters;
