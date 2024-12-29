import React, { useState, useRef, useEffect, useContext } from 'react';
import { Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Paper, IconButton, Grid, Card, CardMedia, FormControl,
  InputLabel,
  Select, 
  MenuItem, } from '@mui/material';
  import DeleteIcon from '@mui/icons-material/Delete';
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';
import axios from 'axios';
import { GlobalState } from '../globalState';

const EditProductDialog = ({ product, onClose }) => {

  const state = useContext(GlobalState);
  const [categories] = state.categoryAPI.categories;
  const updateProduct = state.productAPI.updateProduct;


  const [focusedSizeIndex, setFocusedSizeIndex] = useState(null);

  const scrollRef = useRef(null);

  const sizeInputRefs = useRef([]);

  const [editedProduct, setEditedProduct] = useState(product);
  console.log(editedProduct);
  const [imagesReview, setImagesReview] = useState(product.images);
  const [sizesEditedProduct, setSizesEditedProduct] = useState(product.sizes)
 
  
  const handleImageChange = async (index, file) => {
    try {
      if (file) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          if (file && file.type.startsWith('image/')) {
            const imageIndex = imagesReview.findIndex((image, i) => i === index);
  
            if (imageIndex !== -1) {
              setImagesReview((prevImages) => {
                const updatedImages = [...prevImages];
                updatedImages[imageIndex] = { public_id: 'temporary_id', url: reader.result };
                return updatedImages;
              });
  
              setEditedProduct((prevProduct) => ({
                ...prevProduct,
                images: prevProduct.images.map((image, i) =>
                  i === index ? { public_id: 'temporary_id', url: reader.result } : image
                ),
              }));
            } else {
              alert('Image not found in the existing array.');
            }
          } else {
            alert('Please choose a valid image file.');
          }
        };
        reader.readAsDataURL(file);
  
        let formData = new FormData();
        formData.append('file', file);
        const res = await axios.post("/image/upload", formData);
        console.log(res.data);
        const { public_id, url } = res.data;
        if (public_id && url) {
          setEditedProduct((prevProduct) => ({
            ...prevProduct,
            images: prevProduct.images.map((image, i) =>
              i === index ? { public_id, url } : image
            ),
          }));
        }
      }
    } catch (error) {
      console.error('Error uploading image:', error.response?.data?.message || 'Unknown error');
    }
  };
  
  

  const handleSizeChange = (sizeIndex, field, value) => {
    setSizesEditedProduct((prevSizes) => {
      const updatedSizes = [...prevSizes];
      updatedSizes[sizeIndex] = { ...updatedSizes[sizeIndex], [field]: value };
      return updatedSizes;
    });
  
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      sizes: prevProduct.sizes.map((size, index) =>
        index === sizeIndex ? { ...size, [field]: value } : size
      ),
    }));
  };
  

  const handleAddSizeEditProduct = () => {
    const newSize = { size: '', quantity: '' };
  
    setSizesEditedProduct((prevSizes) => [...prevSizes, newSize]);
  
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      sizes: [...prevProduct.sizes, newSize],
    }));
  
    setFocusedSizeIndex(sizesEditedProduct.length);
  };

  const handleDeleteSizeEditProduct = (sizeIndex) => {
    if (editedProduct.sizes.length > 1) {
      setSizesEditedProduct((prevSizes) =>
        prevSizes.filter((_, index) => index !== sizeIndex)
      );
  
      setEditedProduct((prevProduct) => ({
        ...prevProduct,
        sizes: prevProduct.sizes.filter((_, index) => index !== sizeIndex),
      }));
    } else {
      alert('Cannot delete the last size.');
    }
  };

  const handleEditProduct = async () => {
    await updateProduct(editedProduct, product._id);
    onClose();
  };

  const handleCloseEditDialog = () => {
    onClose();
  }

  const handleCategoryChange = (event) => {
    const selectedCategoryId = event.target.value;
    const selectedCategory = categories.find((category) => category._id === selectedCategoryId);
    
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      category: selectedCategory,
    }));
  };

  useEffect(() => {
    if (scrollRef.current && scrollRef.current.lastChild) {
      scrollRef.current.lastChild.scrollIntoView({ behavior: 'smooth' });
    }
  }, [sizesEditedProduct]);


  useEffect(() => {
    if (focusedSizeIndex !== null && sizeInputRefs.current.length > 0) {
      sizeInputRefs.current[focusedSizeIndex].focus();
      setFocusedSizeIndex(null);
    }
  }, [sizesEditedProduct, focusedSizeIndex]);

  console.log(editedProduct.category);
  console.log(categories);

  return (
    <div>
      <Dialog open={true} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={6} style={{ marginTop: '10px', textAlign: 'center', justifyContent: 'center' }}>
              <Grid container spacing={1}>
                {imagesReview.map((image, index) => (
                  <Grid item xs={6} key={index}>
                    <Card style={{height: '150px', padding: '5px'}}>
                      <CardMedia
                        component="img"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        image={image.url}
                        alt={`Image ${index + 1}`}
                      />
                    </Card>
                    <input
                      accept="image/*"
                      style={{ display: 'none' }}
                      id={`image-upload-input-${index}`}
                      type="file"
                      onChange={(e) => handleImageChange(index, e.target.files[0])}
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
                ))}
              </Grid>
            </Grid>

            <Grid item xs={6}>
              <TextField
                  label="Name"
                  fullWidth
                  size='small'
                  style={{ marginTop: '10px' }}
                  value={editedProduct.name}
                  onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
              />
              <TextField
                  label="Price"
                  fullWidth
                  size='small'
                  style={{ marginTop: '10px' }}
                  type="number"
                  value={editedProduct.price}
                  onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })}
              />
              <FormControl variant="outlined" fullWidth style={{ marginTop: '10px' }}>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  value={editedProduct.category ? editedProduct.category._id : ''}
                  onChange={handleCategoryChange}
                  label="Category"
                  size='small'
                  required
                >
                  {
                      categories && categories.map((category) => {
                          return (
                            <MenuItem key={category._id} value={category._id}>
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
                  {sizesEditedProduct.map((size, index) => (
                    <Paper key={index} style={{ background: '#f7f7f7', margin: '10px', padding: '10px', height: '115px' }}>
                      <TextField
                        label={`Size ${index + 1}`}
                        size='small'
                        style={{ marginBottom: '5px' }}
                        value={size.size}
                        onChange={(e) => handleSizeChange(index, 'size', e.target.value)}
                        inputRef={(inputRef) => (sizeInputRefs.current[index] = inputRef)}
                        
                      />
                      <TextField
                        key={`size-${index}-quantity`} 
                        label="Quantity"
                        size='small'
                        style={{ marginTop: '5px' }}
                        value={size.quantity}
                        onChange={(e) => handleSizeChange(index, 'quantity', e.target.value)}
                      />
                      <IconButton onClick={() => handleDeleteSizeEditProduct(index)} style={{color: "red"}}>
                        <DeleteIcon />
                      </IconButton>
                    </Paper>
                  ))}
                </div>
                <Button size='small' variant="contained" color="primary" onClick={handleAddSizeEditProduct}>
                  Add Size
                </Button>
              </Grid>
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={4}
                style={{ marginTop: '10px' }}
                value={editedProduct.description}
                onChange={(e) => setEditedProduct({ ...editedProduct, description: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleEditProduct}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditProductDialog;
