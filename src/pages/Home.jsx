import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { add } from '../features/track/trackSlice';
import '../App.css';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Grid from '@mui/joy/Grid';
import Typography from '@mui/joy/Typography';

import axios from '../axios';
import TrackList from '../components/TrackList';
import { useNavigate } from 'react-router-dom';

const Home = (props) => {
  const [isrc, setIsrc] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createTrack = async () => {
    try {
      const response = await axios.post(`/createTrack?isrc=${isrc}`);
      const { id } = response.data;
      props.handleOpen('success');
      dispatch(add({ id, isrc }));
      navigate(`/track/${isrc}`);
      setIsrc('');
    } catch (error) {
      console.error(error);
      props.handleOpen('danger');
    }
  };

  return (
    <>
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
