import { useState } from 'react';
import '../App.css';
import Button from '@mui/joy/Button';
import Grid from '@mui/joy/Grid';

import axios from '../axios';
import { Input } from '@mui/joy';

const Home = () => {
  const [isrc, setIsrc] = useState('');
  const [metadata, setMetadata] = useState();
  const [cover, setCover] = useState();

  const createTrack = async () => {
    const response = await axios.post(`/createTrack?isrc=${isrc}`);
    console.log(response);
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
