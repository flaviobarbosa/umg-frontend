import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { add } from '../features/track/trackSlice';

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
    <p>No tracks added</p>
  ) : (
    <>
      {tracks.map((track) => (
        <li key={track.id} onClick={() => showDetails(track.isrc)}>
          {track.isrc}
        </li>
      ))}
    </>
  );
};

export default TrackList;
