import { useState, useEffect } from 'react';
import { GeolocationCoordinates } from '../types';

const useGeolocation = () => {
  const [location, setLocation] = useState<GeolocationCoordinates | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setIsLoading(false);
      return;
    }

    const handleSuccess = (position: GeolocationPosition) => {
      setLocation(position.coords);
      setIsLoading(false);
    };

    const handleError = (error: GeolocationPositionError) => {
      setError(error.message);
      setIsLoading(false);
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
    });

  }, []);

  return { location, error, isLoading };
};

export default useGeolocation;