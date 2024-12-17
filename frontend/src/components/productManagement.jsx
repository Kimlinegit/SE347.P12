
import React, { useState} from 'react';
import {Button, Typography} from '@mui/material';
// import ExistedProductsTable from './existedProductsTable.jsx';
import ExistedProductsTable from './existedProductsTable.jsx';
import AddProductDialog from './addProductDialog.jsx';



const ProductManagement = () => {

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleOpenAddDialog = () => {
    setIsAddDialogOpen(true);
  };

  const handleCloseAddDialog = () => {
    setIsAddDialogOpen(false);
  };

  return (
    <div>
      <Typography variant="h5" align="center" gutterBottom sx={{ mt: 2, fontWeight: 'bold' }}>
        Quản trị sản phẩm
      </Typography>
      {/* Table to display existing products */}
      <ExistedProductsTable/>
      <Button 
        variant="contained" 
        color="primary" 
        style={{ marginTop: '10px' }}
        onClick={handleOpenAddDialog}>
        Thêm sản phẩm
      </Button>
      {/* Dialog for adding new product */}
      {isAddDialogOpen && (
        <AddProductDialog isAddDialogOpen={isAddDialogOpen} onClose={handleCloseAddDialog} />
      )}
    </div>
  );
};

export default ProductManagement;




