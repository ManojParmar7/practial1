import React, { useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.js'
const App = () => {
  const [bitcoinPrice, setBitcoinPrice] = useState(null);
  const [previousPrice, setPreviousPrice] = useState(null);
  const [showPreviousPrice, setShowPreviousPrice] = useState(false);
  const [buttonText, setButtonText] = useState('Get Bitcoin Price');
  const [buttonColor, setButtonColor] = useState('primary');

  const fetchBitcoinPrice = async () => {
    try {
      const response = await axios.get('https://random-data-api.com/api/address/random_address?size=3');
      const zipCode = response.data[0]?.zip_code;
      if (zipCode) {
        setPreviousPrice(bitcoinPrice);
        setBitcoinPrice(zipCode);
        setShowPreviousPrice(true);
        setButtonText('Refresh Bitcoin Price');
        setButtonColor('secondary');
      }
    } catch (error) {
      console.error('Error fetching Bitcoin price:', error);
    }
  };

  return (
    <div className='inline mt-5'>
      <Button
        variant="contained"
        color={buttonColor}
        onClick={fetchBitcoinPrice}
      >
        {buttonText}
      </Button>
      {bitcoinPrice && (
        <TextField
          label="Current price"
          value={bitcoinPrice}
          variant="outlined"
          disabled
        />
      )}
      {showPreviousPrice && previousPrice && (
        <TextField
          label="Previous price"
          value={previousPrice}
          variant="outlined"
          disabled
        />
      )}
    </div>
  );
};

export default App;
