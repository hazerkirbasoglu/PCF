import * as React from 'react';
import { useState, useEffect } from "react";
import { DefaultPalette, Stack, IStackStyles, IStackTokens, Label, Text } from '@fluentui/react';
import { Icon } from '@fluentui/react/lib/Icon';



const itemStyles: React.CSSProperties = {
  background: DefaultPalette.white,
  color: DefaultPalette.black,
  height: 250,
  width: 150,
  borderWidth: 2, 
  borderColor: DefaultPalette.black,
  borderStyle: 'solid',
  margin:5
};
const stackStyles: IStackStyles = {
  root: {
    alignItems: 'center',
    display: 'flex',
    justifyContent:'center',
    background: DefaultPalette.white,
    
  },
};
const stackTokens: IStackTokens = { childrenGap: 5 };


interface IWeatherData {
  date: Date;
  day: String;
  temperature: number;
  weatherType: WeatherType;
  // eslint-disable-next-line no-undef
  image: JSX.Element;
}

enum WeatherType {
  Sunny,
    Snow,
    RainSnow,
    Cloudy,
    PartlyCloudyDay
}

const WeatherGallery: React.FC = () => { 

  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const [weatherData, setWeatherData] = useState<IWeatherData[]>([]);
  useEffect(() => {
    // Hava durumu verilerini oluştur ve setWeatherData ile state'i güncelle
    const data = generateWeatherData();
    setWeatherData(data);
}, []);

const generateWeatherData = (): IWeatherData[] => {
  let startDate = new Date();
  let weatherData: IWeatherData[] = [];
  for (let i = 0; i < 5; i++) {
      let date = new Date();
      date.setDate(startDate.getDate() + i);
      let temperature = Math.floor(Math.random() * 51) - 25;
      let weatherType: WeatherType = WeatherType.Sunny;
      if (temperature <= -5)
          weatherType = WeatherType.Snow;
      else if (temperature >= -5 && temperature <= 5)
          weatherType = WeatherType.RainSnow;
      else if (temperature >= 5 && temperature <= 10)
          weatherType = WeatherType.Cloudy;
      else if (temperature >= 10 && temperature <= 20)
          weatherType = WeatherType.PartlyCloudyDay;
      else if (temperature >= 20)
          weatherType = WeatherType.Sunny;
      weatherData.push({
          date: date,
          day: weekday[date.getDay()],
          temperature: temperature,
          weatherType: weatherType,
          image: <Icon iconName={WeatherType[weatherType]} />
      });
  }
  return weatherData;
};
    return (
      <Stack  tokens={stackTokens}>
      <Stack  horizontal horizontalAlign="space-around" styles={stackStyles}>
        {weatherData.map((data, index) => 
        <div  key= {index} style={itemStyles}>
            <p><Text variant='large'>{data.day}</Text></p>
                <p>{data.date.toLocaleDateString()}</p>
                <div style={{fontSize:"xx-large"}}>{data.image}</div>
                <p>{data.temperature}°C</p>
                <p>{WeatherType[data.weatherType]}</p>
        </div>
        )}
        
      </Stack>
      </Stack>
    )
  }

  export default WeatherGallery;

