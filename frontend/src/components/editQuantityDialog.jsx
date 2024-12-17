// EditQuantity.js

import React, { useState, useContext } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select
} from '@mui/material';

import { GlobalState } from '../globalState.jsx';

const EditQuantityDialog = ({ open, handleClose, productId, productSizes, currentSize, currentQuantity, handleUpdate }) => {

  // const state = useContext(GlobalState);
  // const {updateCart} = state.cartAPI.updateCart;
  const {cartAPI} = useContext(GlobalState);
  const {updateCart} = cartAPI;

  const [newSize, setNewSize] = useState(currentSize);
  const [newQuantity, setNewQuantity] = useState(currentQuantity);

  const updateData = {
    newSize: newSize,
    newQuantity: newQuantity
  };
  console.log(updateData);

  const handleUpdateQuantity = () => {
    updateCart(productId, updateData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Chỉnh sửa số lượng</DialogTitle>
      <DialogContent>
        <FormControl variant="outlined" fullWidth style={{ marginTop: '10px' }}>
          <InputLabel id="size-label">Size</InputLabel>
          <Select
            labelId="size-label"
            value={newSize}
            onChange={(e) => setNewSize(e.target.value)}
            label="Category"
            size='small'
            required
          >
            {
                productSizes && productSizes.map((size) => {
                    return (
                      <MenuItem key={size._id} value={size.size}>
                        {size.size}
                      </MenuItem>
                    );
                })  
            }
          </Select>
        </FormControl>
        <TextField
            label="Số lượng"
            type="number"
            value={newQuantity}
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => setNewQuantity(parseInt(e.target.value, 10))}
            InputProps={{
              inputProps: {
                min: 1,
                max: 100,
              },
            }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleUpdateQuantity} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditQuantityDialog;
