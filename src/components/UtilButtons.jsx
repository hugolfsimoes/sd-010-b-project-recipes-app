import React from 'react';
import ShareBtn from './ShareBtn';
import FavoriteBtn from './FavoriteBtn';

function UtilButton({ id,}) {
  return (
    <>
      <FavoriteBtn
        id={ id }
        type={ type === 'comida' }
        currentRecipe={ el }
        setShouldUpdate={ setShouldUpdate }
        shouldUpdate={ shouldUpdate }
      />
      <ShareBtn
        showCopiedMsg={ setWasCopied }
        type={ `${type}s` }
        id={ id }
        route="receitas-favoritas"
        testId={ `${idx}-horizontal-share-btn` }
        variant={ idx }
      />
    </>
  );
}

export default UtilButton;
