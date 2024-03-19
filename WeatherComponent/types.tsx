//types.tsx

export interface IWeatherData {
    date: Date;
    day: String;
    temperature: number;
    weatherType: WeatherType;
    // eslint-disable-next-line no-undef
    image: JSX.Element;
  }
  
  export enum WeatherType {
    Sunny,
    Snow,
    RainSnow,
    Cloudy,
    PartlyCloudyDay
  }