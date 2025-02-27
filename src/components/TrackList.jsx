import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { add } from '../features/track/trackSlice';
import Typography from '@mui/joy/Typography';
import AspectRatio from '@mui/joy/AspectRatio';
import Grid from '@mui/joy/Grid';

import axios from '../axios';
import { useNavigate } from 'react-router-dom';

const TrackList = () => {
  const tracks = useSelector((state) => state.tracks);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showDetails = (isrc) => navigate(`/track/${isrc}`);

  const loadAllMetadata = async () => {
    try {
      const response = await axios.get(`/getAllTrackMetadata`);
      response.data.forEach(({ id, isrc }) => dispatch(add({ id, isrc }))); //todo create addAll
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadAllMetadata();
  }, []);

  return tracks.length <= 0 ? (
    <Typography level='p'>No tracks added</Typography>
  ) : (
    <Grid
      container
      direction='column'
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        mt: 8,
        mb: 3,
      }}>
      <Grid item>
        <Typography level='h4'>Tracks created:</Typography>
      </Grid>

      <Grid
        container
        direction='row'
        columnSpacing={{ xs: 3, sm: 2, md: 3 }}
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          mt: 1,
          mb: 3,
        }}>
        {tracks.map((track) => (
          <Grid
            item
            key={track.id}
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              mt: 1,
              mb: 1,
            }}>
            <AspectRatio sx={{ width: 200 }} onClick={() => showDetails(track.isrc)}>
              <Typography level='p' component='div'>
                {track.isrc}
              </Typography>
            </AspectRatio>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default TrackList;
