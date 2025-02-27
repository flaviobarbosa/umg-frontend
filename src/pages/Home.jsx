import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { add } from '../features/track/trackSlice';
import '../App.css';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Snackbar from '@mui/joy/Snackbar';
import Grid from '@mui/joy/Grid';

import axios from '../axios';
import TrackList from '../components/TrackList';

const Home = () => {
  const [isrc, setIsrc] = useState('');

  const dispatch = useDispatch();

  const [snackbarState, setSnackbarState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'right',
    color: 'primary',
  });

  const { vertical, horizontal, open } = snackbarState;

  const handleOpen = (action) => {
    setSnackbarState({ ...snackbarState, open: true, color: action });
  };

  const handleClose = () => {
    setSnackbarState({ ...snackbarState, open: false });
  };

  const createTrack = async () => {
    try {
      const response = await axios.post(`/createTrack?isrc=${isrc}`);
      const { id } = response.data;
      dispatch(add({ id, isrc }));
      handleOpen('success');
    } catch (error) {
      console.error(error);
      handleOpen('danger');
    }
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={5000}
        open={open}
        onClose={handleClose}
        variant='solid'
        key={vertical + horizontal}
        color={snackbarState.color}>
        {snackbarState.color === 'primary'
          ? 'Track successfully created ☑️'
          : 'Could not create Track'}
      </Snackbar>
      <Grid
        container
        direction='column'
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Input placeholder='Type the ISCR' value={isrc} onChange={(e) => setIsrc(e.target.value)} />
        <Button onClick={createTrack}>Create</Button>
      </Grid>
      <TrackList />
    </>
  );
};

export default Home;
