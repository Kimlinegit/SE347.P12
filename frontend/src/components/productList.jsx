
// import React, {useContext, useEffect, useState} from 'react';   
// import { Grid2, Container, Typography, Box } from '@mui/material';
// import ProductCard from './productCard.jsx';





// const ProductList = ({ products }) => {

  
//   return (
//     <Container style={{marginTop: '20px'}}>
//       <Box sx={{ flexGrow: 1 }}>
//         <Grid2 container spacing={2}>
//           {products.map((product) => (
//             <Grid2 key={product._id} item="true" xs={12} sm={6} md={3}>
//               <ProductCard product={product} />
//             </Grid2>
//           ))}
//         </Grid2>
//       </Box>
//     </Container>
//   );
// }

// export default ProductList;






import React from 'react';
import { Grid2, Container, Typography, Box } from '@mui/material';
import ProductCard from './productCard.jsx';
import Filter from './filter.jsx';

const ProductList = ({ products }) => {
  return (
    <Container sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#333' }}>
        Danh sách sản phẩm
      </Typography>
      <Filter/>
      <Box sx={{ flexGrow: 1, py: 4 }}>
        <Grid2 container spacing={4} justifyContent="center">
          {products.map((product) => (
            <Grid2 key={product._id} item="true" xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} />
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </Container>
  );
}

export default ProductList;
