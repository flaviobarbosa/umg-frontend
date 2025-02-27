import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { add } from '../features/track/trackSlice';
import '../App.css';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Snackbar from '@mui/joy/Snackbar';
import Grid from '@mui/joy/Grid';
import Typography from '@mui/joy/Typography';

import axios from '../axios';
import TrackList from '../components/TrackList';

const Home = () => {
  const [isrc, setIsrc] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState();

  const [snackbarState, setSnackbarState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'right',
    color: 'primary',
  });

  const dispatch = useDispatch();

  const { vertical, horizontal, open } = snackbarState;

  const handleOpen = (action) => {
    if (action === 'success') setSnackbarMessage('✅ Track successfully created');
    else setSnackbarMessage('❌ Could not create Track');

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
        variant='soft'
        key={vertical + horizontal}
        color={snackbarState.color}>
        {snackbarMessage}
      </Snackbar>

      <Typography level='h2'>Track Metadata</Typography>
      <Grid
        container
        direction='row'
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          mt: 3,
          mb: 3,
        }}>
        <Grid item>
          <Input
            placeholder='Type the ISCR'
            value={isrc}
            onChange={(e) => setIsrc(e.target.value)}
          />
        </Grid>
        <Grid item>
          <Button onClick={createTrack}>Create</Button>
        </Grid>
      </Grid>
      <Grid item>
        <TrackList />
      </Grid>
    </>
  );
};

export default Home;
