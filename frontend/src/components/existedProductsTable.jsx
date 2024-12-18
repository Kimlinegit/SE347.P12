import React, { useState, useContext } from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, CardMedia, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditProductDialog from './editProductDialog.jsx';
import { GlobalState } from '../globalState.jsx';

const ExistedProductsTable = () => {

  const state = useContext(GlobalState);
  const [products] = state.productAPI.products;
  const deleteProduct = state.productAPI.deleteProduct;


  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setEditDialogOpen(true);
  };

  const handleDeleteProduct = (productId) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xóa sản phẩm này?");
    if (confirmDelete) {
      deleteProduct(productId);
    }
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };

  return (
    <div>
      <TableContainer component={Paper} style={{ marginTop: '20px', height: '52vh', overflowY: 'auto' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Ảnh</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell>Giá</TableCell>
              <TableCell>Danh mục</TableCell>
              <TableCell>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.length > 0 ? (
              products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>{product._id}</TableCell>
                  <TableCell>
                    <CardMedia
                      component="img"
                      // src={product.images[0].url} 
                      src={product.images && product.images[0] ? product.images[0].url : '/placeholder-image.png'}
                      alt={product.name} 
                      sx={{ width: 100, height: 100 }} 
                      style={{height: '50px', width: '50px', objectFit: 'cover'}} 
                    />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  {/* <TableCell>{product.category.name}</TableCell> */}
                  <TableCell>{product.category ? product.category.name : 'N/A'}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditProduct(product)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteProduct(product._id)} style={{color: 'red'}}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))):(
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Không tìm thấy sản phẩm
                  </TableCell>
                </TableRow>
              )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Render EditProductDialog if open */}
      {isEditDialogOpen && (
        <EditProductDialog product={selectedProduct} onClose={handleCloseEditDialog} />
      )}
    </div>
  );
};

export default ExistedProductsTable;
