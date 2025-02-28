import { Routes, Route } from 'react-router';
import Home from './pages/Home';
import Track from './pages/Track';
import { Snackbar } from '@mui/joy';
import { useState } from 'react';

const App = () => {
  const [snackbarMessage, setSnackbarMessage] = useState();

  const [snackbarState, setSnackbarState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'right',
    color: 'primary',
  });

  const { vertical, horizontal, open } = snackbarState;

  const handleSnackbarState = (action) => {
    if (action === 'success') setSnackbarMessage('✅ Track successfully created');
    else setSnackbarMessage('❌ Could not create Track');

    setSnackbarState({ ...snackbarState, open: true, color: action });
  };

  const handleClose = () => {
    setSnackbarState({ ...snackbarState, open: false });
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={5000}
        open={open}
        onClose={handleClose}
        variant='soft'
        key={vertical + horizontal}
        color={snackbarState.color}>
        {snackbarMessage}
      </Snackbar>
      <Routes>
        <Route index element={<Home handleOpen={handleSnackbarState} />} />
        <Route path='track/:isrc' element={<Track />} />
      </Routes>
    </>
  );
};

export default App;
