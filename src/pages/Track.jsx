import { useParams, useNavigate } from 'react-router-dom';
import axios from '../axios';
import { useEffect, useState } from 'react';

import Button from '@mui/joy/Button';

const Track = () => {
  const { isrc } = useParams();
  const [track, setTrack] = useState();
  const [cover, setCover] = useState();

  const navigate = useNavigate();

  const loadMetadata = async () => {
    try {
      const response = await axios.get(`/getTrackMetadata/${isrc}`);
      setTrack(response.data);
      console.log(response.data);
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
      <Button variant='plain' onClick={() => navigate('/')}>
        Back
      </Button>
      <h2>Track {isrc}</h2>

      {track && cover && (
        <>
          <img width={150} src={cover} />
          <p>Name: {track.name}</p>
          <p>Artist: {track.artistName}</p>
          <p>Album: {track.albumName}</p>
          <p>Explict: {track.isExplicit ? 'yes' : 'no'}</p>
          <p>Seconds: {track.playbackSeconds}</p>
        </>
      )}
    </>
  );
};

export default Track;
