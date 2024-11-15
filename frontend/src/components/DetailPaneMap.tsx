import React, { useState, useEffect } from 'react';
 
import { Map, AdvancedMarker,APIProvider} from '@vis.gl/react-google-maps';
import ErrorAlert from './ErrorAlert';
 

interface DetailPaneMapProps {
  latitude: number;
  longitude: number;
}

const DetailPaneMap: React.FC<DetailPaneMapProps> = ({ latitude, longitude}) => {
  const [apiKey, setApiKey] = useState<string | null>(null);

  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const response = await fetch('http://localhost:8001/google-maps-api-key');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
       
        setApiKey(data.apikey);
      } catch (error) {
        console.error('Error fetching Google Maps API key:', error);
      }
    };

    fetchApiKey();
  }, []);

  if (!apiKey) {
    return <ErrorAlert />;
  }

  return (
    <div className='mb-2'>
        <APIProvider apiKey={apiKey}>
            <Map
            mapId={'DEMO-MAP'}
            style={{ width: '100%', height: '100vh' }}
            defaultCenter={{ lat: latitude, lng: longitude}}
            defaultZoom={10}
            gestureHandling={'greedy'}
            key={`${latitude}-${longitude}`}
            >
            <AdvancedMarker position={{ lat: latitude, lng: longitude }} />
            </Map>
        </APIProvider>
    </div>
  );
};

export default DetailPaneMap;