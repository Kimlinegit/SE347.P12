
import React, {useContext, useEffect, useState} from 'react';
import { Container, Paper} from '@mui/material';
import ProductList from '../components/productList.jsx';
import { GlobalState } from '../globalState.jsx';


const Product = () => {


  const state = useContext(GlobalState);
  const [products] = state.productAPI.products;

  return (
    <Container style={{padding: 30, marginTop: 50}}>
        <Paper sx={{ my: 6, p: 4, borderRadius: 2, boxShadow: 4}}>
          <ProductList products={products}/>
        </Paper>
    </Container>
  );
};

export default Product;


