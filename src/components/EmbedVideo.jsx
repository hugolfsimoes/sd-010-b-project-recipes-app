import React, { useContext } from 'react';
import RecipeContext from '../context';

const BASE_URL_YOUTUBE = 'https://www.youtube.com/embed/watch?v=';

function EmbedVideo() {
  const size = {
    width: '420px',
    height: '315px',
  };
  const { recipes } = useContext(RecipeContext);
  const { strYoutube } = recipes[0];

  function embedVideo() {
    const idYoutube = strYoutube ? strYoutube.split('=')[1] : '';
    return `${BASE_URL_YOUTUBE}${idYoutube}`;
  }

  return (
    <embed data-testid="video" title="Video" style={ size } src={ embedVideo() } />
  );
}

export default EmbedVideo;
