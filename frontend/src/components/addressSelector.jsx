
import React, { useState } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
  TextField,
  Menu
} from '@mui/material';

import { cities, districtsMap, wardsMap } from '../data/addressData.js';


const AddressSelector = ({userAddress, onAddressChange }) => {
  const [selectedCity, setSelectedCity] = useState(userAddress.city);
  const [selectedDistrict, setSelectedDistrict] = useState(userAddress.district);
  const [selectedWard, setSelectedWard] = useState(userAddress.ward);
  const [newStreet, setNewStreet] = useState(userAddress.street);

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    setSelectedCity(selectedCity);
    setSelectedDistrict('');
    setSelectedWard('');

    onAddressChange({ city: selectedCity, district: '', ward: '', street: newStreet }); // Gọi hàm callback để cập nhật state ở component cha
  };

  const handleDistrictChange = (event) => {
    const selectedDistrict = event.target.value;
    setSelectedDistrict(selectedDistrict);
    setSelectedWard('');
    onAddressChange({ city: selectedCity, district: selectedDistrict, ward: '', street: newStreet }); // Gọi hàm callback để cập nhật state ở component cha
  };

  const handleWardChange = (event) => {
    const selectedWard = event.target.value;
    setSelectedWard(selectedWard);
    onAddressChange({ city: selectedCity, district: selectedDistrict, ward: selectedWard, street: newStreet }); // Gọi hàm callback để cập nhật state ở component cha
  };

  const handleStreetChange = (event) => {
    const street = event.target.value;
    setNewStreet(street);
    onAddressChange({ city: selectedCity, district: selectedDistrict, ward: selectedWard, street: newStreet }); // Gọi hàm callback để cập nhật state ở component cha
  };

  return (
    <Grid container spacing={2} style={{marginTop: '5px'}}>
      <Grid item xs={4}>
        <FormControl fullWidth size='small'>
          <InputLabel id="province/city-label">Tỉnh/Thành phố</InputLabel>
          <Select 
            labelId='province/city-label' 
            label="Tỉnh/Thành phố" 
            value={selectedCity} 
            onChange={handleCityChange}
            MenuProps={{ style: { maxHeight: 250 } }}
          >   
            {cities.map((city, index) => (
              <MenuItem key={index} value={city}>
                {city}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={4}>
        <FormControl fullWidth size='small'>
          <InputLabel id="district-label">Quận/Huyện</InputLabel>
          <Select
            labelId= "district-label"
            label= "Quận/Huyện"
            value={selectedDistrict}
            onChange={handleDistrictChange}
            disabled={!selectedCity}
            MenuProps={{ style: { maxHeight: 250 } }}
          >
            {districtsMap[selectedCity] &&
              districtsMap[selectedCity].map((district, index) => (
                <MenuItem key={index} value={district}>
                  {district}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={4}>
        <FormControl fullWidth size='small'>
          <InputLabel id = "ward">Xã/Phường</InputLabel>
          <Select
            labelId='ward'
            label="Xã/Phường"
            value={selectedWard}
            onChange={handleWardChange}
            disabled={!selectedDistrict}
            MenuProps={{ style: { maxHeight: 250 } }}
          >
            {wardsMap[selectedDistrict] &&
              wardsMap[selectedDistrict].map((ward, index) => (
                <MenuItem key={index} value={ward}>
                  {ward}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          size='small'
          label="Số nhà/Đường"
          value={newStreet}
          onChange={handleStreetChange}
        />
      </Grid>

      <Grid item xs={12}>
        <Typography>
          Địa chỉ:{' '}
          {newStreet && selectedWard && selectedDistrict && selectedCity
            ? `${newStreet}, ${selectedWard}, ${selectedDistrict}, ${selectedCity}`
            : 'Chưa chọn đủ thông tin'}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default AddressSelector;
