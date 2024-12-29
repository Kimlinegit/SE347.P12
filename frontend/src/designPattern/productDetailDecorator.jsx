import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Tab,
  Tabs,
  Grid,
  Button,
  Chip,
  TextField,
  Rating,
  Box,
  Avatar,
  Divider,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ProductCard from '../components/productCard.jsx';


// Component
class ProductDetailInterface {
  render() {}
}

// ConcreteComponent
class ConcreteProductDetail extends ProductDetailInterface {
  constructor(product, activeTab, selectedSize, userRating, userComment, setUserComment, handleAddToCart, handleSizeClick, handleChangeTab, handleStarClick, handleSubmitComment) {
    super();
    this.product = product;
    this.activeTab = activeTab;
    this.selectedSize = selectedSize;
    this.userRating = userRating;
    this.userComment = userComment;
    this.setUserComment = setUserComment;
    this.handleAddToCart = handleAddToCart;
    this.handleSizeClick = handleSizeClick;
    this.handleChangeTab = handleChangeTab;
    this.handleStarClick = handleStarClick;
    this.handleSubmitComment = handleSubmitComment;
  }
  render() {
    return (
      <Container style={{padding: 50, marginTop: 50}}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={5}>
            <Paper elevation={3} sx={{ padding: 3, marginTop: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', height:'63vh'}}>
              <img
                src={this.product.images[this.activeTab].url}
                alt={`Product Image ${this.activeTab + 1}`}
                style={{ width: '300px', height: '300px', marginBottom: 2 }}
              />
              <Tabs value={this.activeTab} onChange={this.handleChangeTab} indicatorColor="primary">
                {this.product.images.map((image, index) => (
                  <Tab key={index} label={<img src={image.url} alt={`Thumbnail ${index + 1}`} style={{ width: '50px', height: '50px' }} />} />
                ))}
              </Tabs>
            </Paper>
          </Grid>
          <Grid item xs={12} md={7}>
            <Paper elevation={3} sx={{ padding: 3, marginTop: 3, display: 'flex', flexDirection: 'column', height:'63vh'}}>
              <Typography variant="h4" gutterBottom>
                {this.product.name}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Danh mục: {this.product.category.name}
              </Typography>
              <Typography variant="h6" component="div" sx={{ marginTop: 2 }}>
                Sản phẩm sẵn có
              </Typography>
              <div 
                style={{
                  background: '#c2c2c2',
                  width: '300px', 
                  maxHeight: '85px', 
                  overflowY: 'auto', 
                  textAlign: 'center',
                  padding: '5px', 
                  borderRadius: '5px'
                }}
              >
                {this.product.sizes.map((sizeInfo, index) => (
                  <Chip
                    key={index}
                    variant="outlined" 
                    label={`Kích thước: ${sizeInfo.size}, Số lượng: ${sizeInfo.quantity}`}
                    sx={{
                      margin: '5px',  
                      cursor: 'pointer',
                      backgroundColor: sizeInfo.size === this.selectedSize ? 'primary.main' : 'background.default',
                      color: sizeInfo.size === this.selectedSize ? 'common.white' : 'text.primary',
                    }}
                    onClick={() => this.handleSizeClick(sizeInfo.size)}
                  />
                ))}
              </div>
              <Typography variant="subtitle1" gutterBottom>
                {this.selectedSize && `Kích thước đã chọn: ${this.selectedSize}`}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Trong kho: {this.product.inStock}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Đã bán: {this.product.sold}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Giá: ${this.product.price}
              </Typography>
              <div style={{textAlign: "center"}}>
                <Button
                  variant="contained"
                  size="small"
                  width="250px"
                  color="primary"
                  startIcon={<AddShoppingCartIcon />}
                  onClick={this.handleAddToCart}
                  sx={{ marginTop: 2 }}
                >
                  {/* Add to Cart */}
                  Thêm vào giỏ hàng
                </Button>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ padding: 3, marginTop: 3, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom sx={{ marginTop: 2 }}>
                Mô tả
              </Typography>
              <Typography variant="body1" paragraph>
                {this.product.description}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ padding: 3, marginTop: 3, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" gutterBottom sx={{ marginTop: 2 }}>
                Số sao trung bình:
                <Box display="flex" alignItems="center" mt={1}>
                  <Rating value={this.product.avgRating} precision={0.5} readOnly />
                  <Typography variant="body2" color="textSecondary" component="span">
                    ({this.product.numReviews})
                  </Typography>
                </Box>
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ marginTop: 2 }}>
                {/* User Comments */}
                Đánh giá của người dùng
              </Typography>
              <Paper elevation={3} sx={{ padding: 3, marginTop: 3, display: 'flex', flexDirection: 'column', maxHeight: '50vh', overflowY: 'auto' }}>
                {this.product.numReviews > 0 ? (
                  this.product.reviews.map((review) => (
                    <Paper key={review._id} elevation={3} sx={{ padding: 2, marginTop: 2, display: 'flex', flexDirection: 'column' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                        <Avatar src={review.user.avatar.url} alt={review.user.userName} sx={{ marginRight: 1 }} />
                        <div>
                          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            {review.user.userName}
                          </Typography>
                          <Rating 
                            value={review.rating}
                            precision={1} 
                            onChange={(event, newValue) => this.handleStarClick(newValue)} sx={{ marginBottom: 2 }}
                          />
                          <Typography variant="body1">{review.comment}</Typography>
                        </div>
                      </Box>
                    </Paper>
                  ))
                ) : (
                <Typography variant="h6" gutterBottom sx={{ marginTop: 2 }}>
                  Chưa có đánh giá nào!
                </Typography>
                )}
              </Paper>
              <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
              <Typography variant="h6" gutterBottom sx={{ marginTop: 2 }}>
                Thêm đánh giá
              </Typography>
              <Rating
                name="userRating"
                value={this.userRating}
                precision={1}
                onChange={(event, newValue) => this.handleStarClick(newValue)}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Đánh giá của bạn"
                multiline
                fullWidth
                rows={4}
                value={this.userComment}
                onChange={(event) => this.setUserComment(event.target.value)}
                size="small"
                sx={{ marginBottom: 2 }}
              />
              <div style={{textAlign: "center"}}>
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  onClick={this.handleSubmitComment}
                  sx={{ marginTop: 2 }}
                >
                  Đánh giá
                </Button>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }
}


// Decorator
class ProductDetailDecorator extends ProductDetailInterface {
  constructor(productDetail) {
    super();
    this.productDetail = productDetail;
  }

  render() {
    return this.productDetail.render();
  }
}

// ConcreteDecorator
class SimilarProductDecorator extends ProductDetailDecorator {
  constructor(productDetail, similarProducts) {
    super(productDetail);
    this.similarProducts = similarProducts;
  }

  render() {
    const baseRender = super.render();
    // Thêm thông tin SimilarProduct
    return (
      <>
        {baseRender}
        <Container style={{padding: 20}}>
          <Paper elevation={3} sx={{ padding: 3, margin: 4, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom sx={{ marginTop: 2 }}>
              Sản phẩm tương tự
            </Typography>
            <Container style={{ marginTop: '20px' }}>
              {this.similarProducts && this.similarProducts.length > 0 && (
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={2}>
                    {this.similarProducts.map((product) => (
                      <Grid key={product._id} item xs={12} sm={6} md={3}>
                        <ProductCard product={product} />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
            </Container>
          </Paper>
        </Container>
      </>
    );
  }
}

export {
  ConcreteProductDetail,
  SimilarProductDecorator
}




