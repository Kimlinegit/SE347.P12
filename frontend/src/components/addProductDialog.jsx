import React, { useState, useRef, useContext, useEffect } from 'react';
import { Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, IconButton, Grid, Card, CardMedia, CardContent, FormControl,
  InputLabel,
  Select, 
  MenuItem, } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';
import axios from 'axios';
import { GlobalState } from '../globalState';


const AddProductDialog = ({ isAddDialogOpen, onClose }) => {

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(isAddDialogOpen);
  }, [isAddDialogOpen]);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const state = useContext(GlobalState)
  const [categories] = state.categoryAPI.categories;
  const createProduct = state.productAPI.createProduct;


  const [focusedSizeIndex, setFocusedSizeIndex] = useState(null);

  const scrollRef = useRef(null);

  const sizeInputRefs = useRef([]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: '',
    images: [],
    sizes: [],
    description: ''
  });

  const [imagesReview, setImagesReview] = useState([]);
  const [sizesAddNewProduct, setSizesAddNewProduct] = useState([])

  const handleAddImage = async (index, file) => {
    try {
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (file && file.type.startsWith('image/')) {
            // Cập nhật imagesReview
            // setImagesReview(reader.result);
            const newImageArray = [...imagesReview];
            newImageArray[index] = reader.result;
            setImagesReview(newImageArray);
          } else {
            alert('Please choose a valid image file.');
          }         
        };
        reader.readAsDataURL(file);
        let formData = new FormData();
        formData.append('file', file);
        const res = await axios.post("/api/image/upload", formData);
        console.log(res.data);
        const { public_id, url } = res.data;
        // check exist image after update state
        if (public_id && url) {
          setNewProduct((prevProduct) => ({
            ...prevProduct,
            images: [...prevProduct.images, { public_id, url }],
          }));
        }
      }
    } catch (error) {
      console.error('Error uploading image:', error.response?.data?.message || 'Unknown error');
    }
  }

  const handleAddSizeNewProduct = () => {
    // Create a new size with default values
    const newSize = { size: '', quantity: '' };

    if(sizesAddNewProduct) {
      setSizesAddNewProduct([...sizesAddNewProduct, newSize])
      // update sizes in `newProduct`
      setNewProduct((prevProduct) => ({ ...prevProduct, sizes: [...prevProduct.sizes, newSize] }));
    }
    // Set the focused index to the newly added size
    setFocusedSizeIndex(sizesAddNewProduct.length);
  }

  const handleSizeChangeAddNewProduct = (sizeIndex, field, value) => {
    const updatedSizes = sizesAddNewProduct.map((size, index) =>
      index === sizeIndex ? { ...size, [field]: value } : size
    );

    setSizesAddNewProduct(updatedSizes);
    setNewProduct((prevProduct) => ({ ...prevProduct, sizes: updatedSizes }));
  };

  const handleDeleteSizeAddNewProduct = (sizeIndex) => {
    const updatedSizesAddNewProduct = sizesAddNewProduct.filter((_, index) => index !== sizeIndex);
    if (sizesAddNewProduct.length > 1) {
      setSizesAddNewProduct(updatedSizesAddNewProduct);
      setNewProduct((prevProduct) => ({ ...prevProduct, sizes: updatedSizesAddNewProduct }));
    } else {
      alert('Cannot delete the last size.');
    }
  }


  console.log(newProduct);

  const handleAddProduct = async () => {
    // Perform add product action
    await createProduct(newProduct);
    onClose();
  };

  const handleCloseAddDialog = () => {
    onClose();
  }

  useEffect(() => {
    // Scroll to the last child when the component updates
    if (scrollRef.current && scrollRef.current.lastChild) {
      scrollRef.current.lastChild.scrollIntoView({ behavior: 'smooth' });
    }
  }, [sizesAddNewProduct]);


  useEffect(() => {
    // Focus vào ô văn bản chỉ khi index đã được cập nhật
    if (focusedSizeIndex !== null && sizeInputRefs.current.length > 0) {
      sizeInputRefs.current[focusedSizeIndex].focus();
      // Đặt lại index để tránh việc focus lại khi component được render lại
      setFocusedSizeIndex(null);
    }
  }, [sizesAddNewProduct, focusedSizeIndex]);


  console.log(imagesReview);

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Thêm mới sản phẩm</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={6} style={{ marginTop: '10px', textAlign: 'center', justifyContent: 'center' }}>
              <Grid container spacing={1}>
                {
                  [1, 2, 3, 4].map((image, index) => (
                    <Grid item xs={6} key={index}>
                      <Card style={{height: '150px', padding: '5px'}}>
                        <CardMedia
                          component="img"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          image={imagesReview[index]} 
                          alt={`Image ${index + 1}`}
                        />
                      </Card>
                      <input
                        accept='image/*'
                        style={{ display: 'none' }}
                        id={`image-upload-input-${index}`}
                        type='file'
                        onChange={(e) => handleAddImage(index, e.target.files[0])}
                      />
                      <label htmlFor={`image-upload-input-${index}`}>
                        <Button
                          variant="outlined"
                          component="span"
                          fullWidth
                          size='small'
                          startIcon={<PhotoCameraOutlinedIcon />}
                          sx={{ marginTop: 1 }}
                          style={{marginBottom: '20px'}}
                        >
                          Upload
                        </Button>
                      </label>
                    </Grid>
                  ))
                }
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <TextField
                  label="Name"
                  fullWidth
                  size='small'
                  style={{ marginTop: '10px' }}
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />
              <TextField
                  label="Price"
                  fullWidth
                  size='small'
                  style={{ marginTop: '10px' }}
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              />
              <FormControl variant="outlined" fullWidth style={{ marginTop: '10px' }}>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value})}
                  label="Category"
                  size='small'
                  required
                >
                  {
                      categories && categories.map((category) => {
                          return (
                            <MenuItem key={category.id} value={category._id}>
                              {category.name}
                            </MenuItem>
                          );
                      })  
                  }
                </Select>
              </FormControl>
              <Grid item xs={6}>
                <Typography variant="h6" gutterBottom>
                  Sizes
                </Typography>
                <div ref={scrollRef} style={{ background: '#c2c2c2', width: '200px', height: '150px', overflowY: 'auto', marginBottom: '10px', textAlign: 'center' }}>
                  {sizesAddNewProduct &&
                    sizesAddNewProduct.map((size, index) => (
                      <Paper key={index} style={{ background: '#f7f7f7', margin: '10px', padding: '10px', height: '115px' }}>
                        <TextField
                          label={`Size ${index + 1}`}
                          size="small"
                          style={{ marginBottom: '5px' }}
                          value={size.size}
                          onChange={(e) => handleSizeChangeAddNewProduct(index, 'size', e.target.value)}
                          inputRef={(inputRef) => (sizeInputRefs.current[index] = inputRef)}
                        />
                        <TextField
                          key={`size-${index}-quantity`}
                          label="Quantity"
                          size="small"
                          style={{ marginTop: '5px' }}
                          value={size.quantity}
                          onChange={(e) => handleSizeChangeAddNewProduct(index, 'quantity', e.target.value)}
                        />
                        <IconButton onClick={() => handleDeleteSizeAddNewProduct(index)} style={{ color: 'red' }}>
                          <DeleteIcon />
                        </IconButton>
                      </Paper>
                    ))
                  }
                </div>
                <Button size='small' variant="contained" color="primary" onClick={handleAddSizeNewProduct}>
                  Thêm Size
                </Button>
              </Grid>
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={4}
                style={{marginTop: '10px'}}
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog}>Hủy</Button>
          <Button variant="contained" color="primary" onClick={handleAddProduct}>
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddProductDialog;
