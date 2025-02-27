import { useParams } from 'react-router-dom';

const Track = () => {
  const { isrc } = useParams();

  return <h1>Track for {isrc}</h1>;
};

export default Track;
