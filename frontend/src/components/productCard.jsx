
import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Rating
} from '@mui/material';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <Card sx={{
      width: 200,
      height: 400,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.3s ease-in-out',
      '&:hover': {
        transform: 'scale(1.05)',
      }
    }}>
      <CardActionArea
        component={Link}
        to={`/products/${product._id}`}
        sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
      >
        <CardMedia
          component="img"
          height="200"
          image={product.images[0]?.url || '/placeholder-image.png'}
          alt={product.name}
          sx={{
            objectFit: 'cover',
            borderBottom: '1px solid #e0e0e0'
          }}
        />
        <CardContent sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flexGrow: 1,
          padding: 2,
          textAlign: 'center'
        }}>
          <Box display="flex" alignItems="center" justifyContent="center" mb={1}>
            <Rating value={product.avgRating} precision={0.5} readOnly size="small" />
            <Typography variant="body2" color="textSecondary" component="span" sx={{ ml: 0.5 }}>
              ({product.numReviews})
            </Typography>
          </Box>
          <Typography variant="h6" component="div" noWrap sx={{ fontWeight: 'medium' }}>
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            Danh mục: {product.category?.name || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            Trong kho: {product.inStock}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            Đã bán: {product.sold}
          </Typography>
          <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold', mt: 1 }}>
            Giá: ${product.price.toFixed(2)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ProductCard;

