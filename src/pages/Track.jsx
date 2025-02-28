import { useParams, useNavigate } from 'react-router-dom';
import axios from '../axios';
import { useEffect, useState } from 'react';

import Button from '@mui/joy/Button';
import { Box, Card, Grid, Typography } from '@mui/joy';

const Track = () => {
  const { isrc } = useParams();
  const [track, setTrack] = useState();
  const [cover, setCover] = useState();

  const navigate = useNavigate();

  const loadMetadata = async () => {
    try {
      const response = await axios.get(`/getTrackMetadata/${isrc}`);
      setTrack(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadCover = async () => {
    try {
      const response = await axios.get(`/cover/${isrc}`, {
        responseType: 'blob',
      });
      const url = URL.createObjectURL(response.data);
      setCover(url);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadMetadata();
    loadCover();
  }, [isrc]);

  return (
    <>
      {track && cover && (
        <Box sx={{ display: 'grid', justifyContent: 'center' }}>
          <Box sx={{ display: 'grid', justifyContent: 'start', mb: 1 }}>
            <Button variant='plain' onClick={() => navigate('/')}>
              ⬅️Back
            </Button>
          </Box>
          <Card sx={{ width: 320, justifyContent: 'center', alignItems: 'center' }}>
            <div>
              <Typography level='title-lg'>Track {isrc}</Typography>
            </div>

            <img width={250} src={cover} />

            <Grid
              container
              direction='column'
              sx={{
                justifyContent: 'center',
                alignItems: 'center',
                mt: 1,
                mb: 1,
                width: '100%',
              }}>
              <Grid
                item
                sx={{
                  justifyItems: 'start',
                  mt: 1,
                  width: '80%',
                }}>
                <Typography level='body-xs'>Name:</Typography>
                <Typography sx={{ fontSize: 'md', fontWeight: 'lg', textAlign: 'left' }}>
                  {track.name}
                </Typography>
              </Grid>
              <Grid
                item
                sx={{
                  justifyItems: 'start',
                  mt: 1,
                  width: '80%',
                }}>
                <Typography level='body-xs'>Artist:</Typography>
                <Typography sx={{ fontSize: 'md', fontWeight: 'lg', textAlign: 'left' }}>
                  {track.artistName}
                </Typography>
              </Grid>
              <Grid
                item
                sx={{
                  justifyItems: 'start',
                  mt: 1,
                  width: '80%',
                }}>
                <Typography level='body-xs'>Album:</Typography>
                <Typography sx={{ fontSize: 'md', fontWeight: 'lg', textAlign: 'left' }}>
                  {track.albumName}
                </Typography>
              </Grid>
              <Grid
                item
                sx={{
                  justifyItems: 'start',
                  mt: 1,
                  width: '80%',
                }}>
                <Typography level='body-xs'>Explicit:</Typography>
                <Typography sx={{ fontSize: 'md', fontWeight: 'lg', textAlign: 'left' }}>
                  {track.isExplicit ? 'Yes' : 'No'}
                </Typography>
              </Grid>
              <Grid
                item
                sx={{
                  justifyItems: 'start',
                  mt: 1,
                  width: '80%',
                }}>
                <Typography level='body-xs'>Seconds:</Typography>
                <Typography sx={{ fontSize: 'md', fontWeight: 'lg', textAlign: 'left' }}>
                  {track.playbackSeconds}
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Box>
      )}
    </>
  );
};

export default Track;
