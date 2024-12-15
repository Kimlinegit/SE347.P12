import Product from "../models/productModel.js";
import Cart from "../models/cartModel.js";


const addProductToCart = async (req, res) => {
    try {
        const productId = req.params.productId;
        const userId = req.user.id;
        const size = req.body.size;

        // Kiểm tra người dùng đã đăng nhập chưa
        if (!req.user) {
            // return res.status(401).json({ message: "Unauthorized. Please log in." });
            return res.status(401).json({ message: "Vui lòng đăng nhập hoặc đăng ký tài khoản để mua hàng!" });
        }

        // Kiểm tra xem người dùng đã có giỏ hàng chưa, nếu không thì tạo mới
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({
                user: userId,
                items: [],
            });
        }

        // Kiểm tra sản phẩm có tồn tại không
        const product = await Product.findById(productId);
        if (!product) {
            // return res.status(404).json({ message: "Product not found" });
            return res.status(404).json({ message: "Không tìm thấy sản phẩm!" });
        }

        // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
        const existingCartItem = cart.items.find(item => item.product.toString() === productId);

        if (!existingCartItem) {
            // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới vào giỏ hàng
            cart.items.push({
                product: productId,
                size: size.toString()
            });
        } else {
            // return res.status(400).json({message: "Product is already in your cart!"})
            return res.status(400).json({message: "Sản phẩm đã tồn tại trong giỏ hàng!"});
        }

        // Lưu giỏ hàng sau khi cập nhật
        await cart.save();


        // res.status(200).json({ message: "Product added to cart successfully", cart });
        res.status(200).json({ message: "Đã thêm sản phẩm vào giỏ hàng!", cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteProductFromCart = async (req, res) => {
    try {
        const productId = req.params.productId;

        // Kiểm tra người dùng đã đăng nhập chưa
        if (!req.user) {
            // return res.status(401).json({ message: "Unauthorized. Please log in." });
            return res.status(401).json({ message: "Vui lòng đăng nhập hoặc đăng ký tài khoản!!" });
        }

        // Kiểm tra xem người dùng có giỏ hàng không
        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            // return res.status(404).json({ message: "Cart not found" });
            return res.status(404).json({ message: "Không tìm thấy giỏ hàng!" });
        }

        // Kiểm tra xem sản phẩm có trong giỏ hàng không
        const existingCartItemIndex = cart.items.findIndex(item => item.product.toString() == productId);

        if (existingCartItemIndex === -1) {
            // return res.status(404).json({ message: "Product not found in cart" });
            return res.status(404).json({ message: "Sản phẩm không tồn tại trong giỏ hàng!" });
        }

        // Xóa sản phẩm khỏi giỏ hàng
        cart.items.splice(existingCartItemIndex, 1);

        // Lưu giỏ hàng sau khi cập nhật
        await cart.save();

        // res.status(200).json({ message: "Product removed from cart successfully", cart });
        res.status(200).json({ message: "Đã xóa sản phẩm khỏi giỏ hàng!", cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCartItems = async (req, res) => {
    try {
        const userId = req.user.id
        // Kiểm tra người dùng đã đăng nhập chưa
        if (!req.user) {
            // return res.status(401).json({ message: "Unauthorized. Please log in." });
            return res.status(401).json({ message: "Vui lòng đăng nhập hoặc đăng ký tài khoản!" });
        }

        // Kiểm tra xem người dùng có giỏ hàng không
        const cart = await Cart.findOne({ user: userId }).populate({
          path: "items.product",
          model: "Product",
          populate: {
            path: "category",
            model: "Category"
          }
        });

        if (!cart) {
            // return res.status(404).json({ message: "Cart not found" });
            return res.status(404).json({ message: "Không tìm thấy giỏ hàng!" });
        }

        // Lấy thông tin của tất cả sản phẩm trong giỏ hàng
        const cartItems = await cart.items


        res.status(200).json({ cartItems });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateCartItemQuantity = async (req, res) => {
    try {
      const userId = req.user.id;
      const productId = req.params.productId;
    //   const newQuantity = req.body.quantity; // Định dạng request để gửi số lượng mới
      const {newSize, newQuantity} = req.body; 

      // Kiểm tra người dùng đã đăng nhập chưa
      if (!req.user) {
        // return res.status(401).json({ message: "Unauthorized. Please log in." });
        return res.status(401).json({ message: "Vui lòng đăng nhập hoặc đăng ký tài khoản!" });
      }
  
      // Tìm giỏ hàng của người dùng
      const cart = await Cart.findOne({ user: userId });
  
      if (!cart) {
        // return res.status(404).json({ message: "Cart not found" });
        return res.status(404).json({ message: "Không tìm thấy giỏ hàng!" });
      }
  
      // Tìm sản phẩm trong giỏ hàng dựa trên productId
      const cartItem = cart.items.find(item => item.product.toString() === productId);
  
      if (!cartItem) {
        // return res.status(404).json({ message: "Product not found in the cart" });
        return res.status(404).json({ message: "Sản phẩm không tồn tại trong giỏ hàng!" });
      }

      if (newSize && typeof newSize !== 'string') {
        // return res.status(400).json({ message: "Invalid size value" });
        return res.status(400).json({ message: "Giá trị kích thước không hợp lệ!" });
      }

      if (newQuantity && (!Number.isInteger(newQuantity) || newQuantity < 1)) {
        // return res.status(400).json({ message: "Invalid quantity value" });
        return res.status(400).json({ message: "Giá trị số lượng không hợp lệ!" });
      }
    
      // Cập nhật quantity của sản phẩm
      if(newQuantity){
        cartItem.quantity = newQuantity;
      }

      // Cập nhật size của sản phẩm
      if(newSize){
        cartItem.size = newSize
      }
      
      // Lưu giỏ hàng sau khi cập nhật
      await cart.save();
  
      // return res.status(200).json({ message: "Cart updated successfully", cart });
      return res.status(200).json({ message: "Cập nhật giỏ hàng thành công!", cart });
    } catch (error) {
      console.error("Error updating quantity:", error.message);
      return res.status(500).json({ message: error.message });
    }
  };


export {
    addProductToCart,
    deleteProductFromCart,
    getCartItems,
    updateCartItemQuantity
}

