import { useState } from 'react';
import '../App.css';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Snackbar from '@mui/joy/Snackbar';
import Grid from '@mui/joy/Grid';

import axios from '../axios';

const Home = () => {
  const [isrc, setIsrc] = useState('');
  const [metadata, setMetadata] = useState();
  const [cover, setCover] = useState();

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
      handleOpen('success');
    } catch (error) {
      console.error(error);
      handleOpen('danger');
    }
  };

  const getCover = async () => {
    const response = await axios.get(`/cover/${isrc}`);
    setCover(response.data);
  };

  const getTrackMetadata = async () => {
    const response = await axios.get(`/getTrackMetadata/${isrc}`);
    setMetadata(response.data);
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

      <Grid
        container
        direction='column'
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Button onClick={getTrackMetadata}>Get metadata</Button>
        {metadata && <pre>{JSON.stringify(metadata, null, 2)}</pre>}
      </Grid>

      <Grid
        container
        direction='column'
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Button onClick={getCover}>Get cover</Button>
        {cover && <img src={'http://localhost:8080/codechallenge/cover/USMC18620549'} alt='' />}
      </Grid>
    </>
  );
};

export default Home;
