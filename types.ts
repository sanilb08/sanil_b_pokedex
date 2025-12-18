export interface Place {
  name: string;
  location: string;
  image: string;
}

export interface TourStep {
  title: string;
  script: string;
  location_description: string;
}

export interface TourGuide {
  title: string;
  intro_script: string;
  tour_steps: TourStep[];
}

export interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}

export interface GeolocationCoordinates {
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  speed: number | null;
}

export interface GroundingSource {
    uri: string;
    title: string;
}

export interface City {
  name: string;
  places: Place[];
}
export interface Country {
  name: string;
  cities: City[];
}
export interface Continent {
  name: string;
  countries: Country[];
}
export type RegionalData = Continent[];