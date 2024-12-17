
// import React, { useState, useContext, useEffect } from 'react';
// import {
//   Container,
//   Paper,
//   Typography,
//   Tab,
//   Tabs,
//   Grid,
//   Button,
//   Chip,
//   TextField,
//   Rating,
//   Box,
//   Avatar,
//   Divider,
//   CircularProgress 
// } from '@mui/material';
// import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
// import { useParams } from 'react-router-dom';
// import { GlobalState } from '../globalState';

// const ProductDetail = () => {
//   const { productId } = useParams();
//   const {productAPI, cartAPI} = useContext(GlobalState);
//   const { products, createProductReview } = productAPI;
//   const {addToCart} = cartAPI;


  



//   const product = products.find((p) => p._id === String(productId));

//   const currentProduct = product;

//   // Tìm các sản phẩm có cùng danh mục với sản phẩm hiện tại
//   const similarProducts = products.filter(
//     (product) =>
//       product._id !== currentProduct._id && // Loại bỏ sản phẩm hiện tại khỏi danh sách tương tự
//       product.category._id === currentProduct.category._id
//   );

//   console.log(products);
//   console.log(currentProduct);
//   console.log(similarProducts);

  

//   const [activeTab, setActiveTab] = useState(0);

//   const [selectedSize, setSelectedSize] = useState('');
//   const [userRating, setUserRating] = useState(0);
//   const [userComment, setUserComment] = useState('');
//   const [comments, setComments] = useState([]);

//   const handleChangeTab = (event, newValue) => {
//     setActiveTab(newValue);
//   };

//   const handleSizeClick = (size) => {
//     setSelectedSize(size);
//   };

//   const handleAddToCart = () => {
//     if (selectedSize) {
//       // Thêm logic để thêm sản phẩm vào giỏ hàng với size đã chọn
//       console.log(`Added ${product.name} (Size: ${selectedSize}) to the cart.`);
//       const size = {size: selectedSize};
//       console.log(size)
//       addToCart(productId, size);
//     } else {
//       alert('Vui lòng chọn kích thước để thêm sản phẩm vào giỏ hàng!');
//     }
//   };

//   const handleStarClick = (value) => {
//     setUserRating(value);
//   };

//   const newComment = {
//     rating: userRating,
//     comment: userComment,
//   };

//   console.log(newComment);

//   const handleSubmitComment = () => {
//     const newComment = {
//       rating: userRating,
//       comment: userComment,
//     };
//     createProductReview(product._id, newComment);
//     setUserRating(0);
//     setUserComment('');
//   };

//   const calculateAverageRating = () => {
//     const totalRating = comments.reduce((sum, comment) => sum + comment.rating, 0);
//     return comments.length === 0 ? 0 : totalRating / comments.length;
//   };

//   if (!product) { 
//     // Nếu product chưa được tải xong, hiển thị một CircularProgress hoặc thông báo đợi
//     return <CircularProgress />;
//   }

//   console.log(product);

//   return (
//     <Container>
//       <Grid container spacing={1}>
//         <Grid item xs={12} md={5}>
//           <Paper elevation={3} sx={{ padding: 3, marginTop: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', height:'63vh'}}>
//             <img
//               src={product.images[activeTab].url}
//               alt={`Product Image ${activeTab + 1}`}
//               style={{ width: '300px', height: '300px', marginBottom: 2 }}
//             />
//             <Tabs value={activeTab} onChange={handleChangeTab} indicatorColor="primary">
//               {product.images.map((image, index) => (
//                 <Tab key={index} label={<img src={image.url} alt={`Thumbnail ${index + 1}`} style={{ width: '50px', height: '50px' }} />} />
//               ))}
//             </Tabs>
//           </Paper>
//         </Grid>
//         <Grid item xs={12} md={7}>
//           <Paper elevation={3} sx={{ padding: 3, marginTop: 3, display: 'flex', flexDirection: 'column', height:'63vh'}}>
//             <Typography variant="h4" gutterBottom>
//               {product.name}
//             </Typography>
//             <Typography variant="subtitle1" gutterBottom>
//               {/* Category: {product.category.name} */}
//               Danh mục: {product.category.name}
//             </Typography>
//             <Typography variant="h6" component="div" sx={{ marginTop: 2 }}>
//               {/* Available Sizes: */}
//               Sản phẩm sẵn có
//             </Typography>
//             <div 
//               style={{
//                 background: '#c2c2c2',
//                 width: '250px', 
//                 maxHeight: '85px', 
//                 overflowY: 'auto', 
//                 textAlign: 'center',
//                 padding: '5px' 
//               }}
//             >
//               {product.sizes.map((sizeInfo, index) => (
//                 <Chip
//                   key={index}
//                   variant="outlined" 
//                   // label={`Size: ${sizeInfo.size}, Instock: ${sizeInfo.quantity}`}
//                   label={`Kích thước: ${sizeInfo.size}, Số lượng: ${sizeInfo.quantity}`}
//                   sx={{
//                     margin: '5px',  
//                     cursor: 'pointer',
//                     backgroundColor: sizeInfo.size === selectedSize ? 'primary.main' : 'background.default',
//                     color: sizeInfo.size === selectedSize ? 'common.white' : 'text.primary',
//                   }}
//                   onClick={() => handleSizeClick(sizeInfo.size)}
//                 />
//               ))}
//             </div>
//             <Typography variant="subtitle1" gutterBottom>
//               {/* {selectedSize && `Selected Size: ${selectedSize}`} */}
//               {selectedSize && `Kích thước đã chọn: ${selectedSize}`}
//             </Typography>
//             <Typography variant="subtitle1" gutterBottom>
//               {/* Price: ${product.price} */}
//               Trong kho: {product.inStock}
//             </Typography>
//             <Typography variant="subtitle1" gutterBottom>
//               {/* Price: ${product.price} */}
//               Đã bán: {product.sold}
//             </Typography>
//             <Typography variant="subtitle1" gutterBottom>
//               {/* Price: ${product.price} */}
//               Giá: ${product.price}
//             </Typography>
//             <div style={{textAlign: "center"}}>
//               <Button
//                 variant="contained"
//                 size="small"
//                 width="250px"
//                 color="primary"
//                 startIcon={<AddShoppingCartIcon />}
//                 onClick={handleAddToCart}
//                 sx={{ marginTop: 2 }}
//               >
//                 {/* Add to Cart */}
//                 Thêm vào giỏ hàng
//               </Button>
//             </div>
//           </Paper>
//         </Grid>
//         <Grid item xs={12}>
//           <Paper elevation={3} sx={{ padding: 3, marginTop: 3, display: 'flex', flexDirection: 'column' }}>
//           <Typography variant="h6" gutterBottom sx={{ marginTop: 2 }}>
//               {/* Description */}
//               Mô tả
//             </Typography>
//             <Typography variant="body1" paragraph>
//               {product.description}
//             </Typography>
//           </Paper>
//         </Grid>
//         <Grid item xs={12}>
//           <Paper elevation={3} sx={{ padding: 3, marginTop: 3, display: 'flex', flexDirection: 'column' }}>
//             <Typography variant="h6" gutterBottom sx={{ marginTop: 2 }}>
//               Số sao trung bình:
//               <Box display="flex" alignItems="center" mt={1}>
//                 <Rating value={product.avgRating} precision={0.5} readOnly />
//                 <Typography variant="body2" color="textSecondary" component="span">
//                   ({product.numReviews})
//                 </Typography>
//               </Box>
//             </Typography>
//             <Typography variant="h6" gutterBottom sx={{ marginTop: 2 }}>
//               {/* User Comments */}
//               Đánh giá của người dùng
//             </Typography>
//             <Paper elevation={3} sx={{ padding: 3, marginTop: 3, display: 'flex', flexDirection: 'column', maxHeight: '50vh', overflowY: 'auto' }}>
//               {product.numReviews > 0 ? (
//                 product.reviews.map((review) => (
//                   <Paper key={review._id} elevation={3} sx={{ padding: 2, marginTop: 2, display: 'flex', flexDirection: 'column', maxWidth: '50%' }}>
//                     <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
//                       <Avatar src={review.user.avatar.url} alt={review.user.userName} sx={{ marginRight: 1 }} />
//                       <div>
//                         <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
//                           {review.user.userName}
//                         </Typography>
//                         <Rating 
//                           value={review.rating}
//                           precision={1} 
//                           onChange={(event, newValue) => handleStarClick(newValue)} sx={{ marginBottom: 2 }}
//                         />
//                         <Typography variant="body1">{review.comment}</Typography>
//                       </div>
//                     </Box>
//                   </Paper>
//                 ))
//               ) : (
//               <Typography variant="h6" gutterBottom sx={{ marginTop: 2 }}>
//                 Chưa có đánh giá nào!
//               </Typography>
//               )}
//             </Paper>
//             <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
//             <Typography variant="h6" gutterBottom sx={{ marginTop: 2 }}>
//               {/* Add Your Comment */}
//               Thêm đánh giá
//             </Typography>
//             <Rating
//               name="userRating"
//               value={userRating}
//               precision={1}
//               onChange={(event, newValue) => handleStarClick(newValue)}
//               sx={{ marginBottom: 2 }}
//             />
//             <TextField
//               // label="Your Comment"
//               label="Đánh giá của bạn"
//               multiline
//               fullWidth
//               rows={4}
//               value={userComment}
//               onChange={(event) => setUserComment(event.target.value)}
//               size="small"
//               sx={{ marginBottom: 2 }}
//             />
//             <div style={{textAlign: "center"}}>
//               <Button
//                 variant="contained"
//                 // width="500px"
//                 size="small"
//                 color="primary"
//                 onClick={handleSubmitComment}
//                 sx={{ marginTop: 2 }}
//               >
//                 {/* Submit Comment */}
//                 Đánh giá
//               </Button>
//             </div>
//           </Paper>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default ProductDetail;








// ----------------------------Decorator-------------------------------------

import React, { useContext, useState } from 'react';
import {CircularProgress } from "@mui/material";
import { useParams } from 'react-router-dom';
import { GlobalState } from '../globalState.jsx';
import { ConcreteProductDetail, SimilarProductDecorator } from "../designPattern/productDetailDecorator.jsx";

const ProductDetail = () => {
  const { productId } = useParams();
  const state = useContext(GlobalState);
  const [products] = state.productAPI.products;
  const createProductReview = state.productAPI.createProductReview;
  const addToCart = state.cartAPI.addToCart;


  const [activeTab, setActiveTab] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState('');


  const product = products.find((p) => p._id === String(productId));

  const currentProduct = product;

  // Tìm các sản phẩm có cùng danh mục với sản phẩm hiện tại
  const similarProducts = products.filter(
    (product) =>
      product._id !== currentProduct._id &&
      product.category._id === currentProduct.category._id
  );

  if (!product) { 
    return <CircularProgress />;
  }

  const handleChangeTab = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    if (selectedSize) {
      const size = {size: selectedSize};
      console.log(size)
      addToCart(productId, size);
    } else {
      alert('Vui lòng chọn kích thước để thêm sản phẩm vào giỏ hàng!');
    }
  };

  const handleStarClick = (value) => {
    setUserRating(value);
  };

  const handleSubmitComment = async () => {
    const newComment = {
      rating: userRating,
      comment: userComment,
    };
    await createProductReview(product._id, newComment)
    setUserRating(0);
    setUserComment('');
  };


  const concreteProductDetail = new ConcreteProductDetail(product, activeTab, selectedSize, userRating, userComment, setUserComment, handleAddToCart, handleSizeClick, handleChangeTab, handleStarClick, handleSubmitComment);

  const productDetailWithSimilar = new SimilarProductDecorator(concreteProductDetail, similarProducts);
  return (
    <div>
      {productDetailWithSimilar.render(product)}
    </div>
  )
}


export default ProductDetail;


