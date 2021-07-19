import React from 'react';
import { useHistory } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@material-ui/core';

interface Props {
  showFavorites: () => void;
}

function Bar({ showFavorites }: Props) {
  const history = useHistory();
  return (
    <AppBar position="fixed">
      <Toolbar style={{ justifyContent: 'space-between' }}>
        Finn.no Price Reduction
        <div>
          <Button onClick={showFavorites}>Vis favoritter</Button>
          <Button
            onClick={() => {
              history.push('/');
              localStorage.clear();
            }}
          >
            Logg ut
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Bar;
