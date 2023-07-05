import React, { useEffect, useState } from 'react';
import LiquidBar from './components/bar';

const LedButton = () => {
  const [color, setColor] = useState('white');
  const [firstValue, setFirstValue] = useState(0);
  const [secondValue, setSecondValue] = useState(0);
  const [thirdValue, setThirdValue] = useState(0);

  useEffect(() => {
    // Simulating API call
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:3000/modbus-data");
        const data = await response.json();

        // Extracting the values from the API response
        const newFirstValue = await data.Register0;
        const newSecondValue = await data.Register1;
        const newThirdValue = await data.Register2;
        // Updating the color based on the values
        setFirstValue(newFirstValue);
        setSecondValue(newSecondValue);
        setThirdValue(newThirdValue);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Fetching data from the API every 5 seconds
    const interval = setInterval(fetchData, 1000);

    // Cleaning up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const updateColor = (firstValue, secondValue, thirdValue) => {
    let newColor = 'white';

    // Adjusting color based on value ranges


  function getColor(redValue, blueValue, greenValue) {
  // Ensure redValue and blueValue are within the valid range (0-100)
  greenValue = Math.max(0, Math.min(100, greenValue));
  redValue = Math.max(0, Math.min(100, redValue));
  blueValue = Math.max(0, Math.min(100, blueValue));
  // Convert the RGB values to hexadecimal color representation
  const redHex = Math.floor((redValue / 100) * 255).toString(16).padStart(2, '0');
  const greenHex = Math.floor((greenValue / 100) * 255).toString(16).padStart(2, '0');
  const blueHex = Math.floor((blueValue / 100) * 255).toString(16).padStart(2, '0');
  // Return the color in the format "#RRGGBB"
  console.log(`#${redHex}${greenHex}${blueHex}`);
  return `#${redHex}${greenHex}${blueHex}`;
}

newColor = getColor(firstValue, secondValue, thirdValue);


    setColor(newColor);
  };


useEffect(() => {
  updateColor(firstValue, secondValue, thirdValue);
}, [firstValue, secondValue, thirdValue]); 
  

  return (
    <div style={{display: 'flex', flexDirection: 'column-reverse', alignItems:"center"}}>
    <div>
      <LiquidBar value={firstValue} color={'red'} />
      <LiquidBar value={secondValue} color={'blue'} />
      <LiquidBar value={thirdValue} color={'green'} />
    </div>
    <div
      style={{
        margin: '20px',
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        backgroundColor: color,
      }}
    ></div>
    </div>
  );
};

export default LedButton;
