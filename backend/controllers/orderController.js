import Cart from "../models/cartModel.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";



const createOrders = async (req, res) => {
  try {
      const userId = req.user.id;
      const {shippingAddress, paymentMethod} = req.body;
      const cart = await Cart.findOne({user: userId}).populate('items.product');

      if(!cart) {
          return res.status(400).json({message: "Giỏ hàng không tồn tại"})
      }

      const cartPrice = cart.items.reduce((total, item) => {
          const productPrice = item.product.price || 0;
          const itemPrice = productPrice * item.quantity;
          return total + itemPrice;
        }, 0);


      // const shippingCost = Math.floor(Math.random() * 50001);
      const shippingCost = Math.floor(Math.random() * 5) + 1;


      console.log(cart.items);

      const newOrder = new Order({
          user: userId,
          cart: cart.items,
          shippingAddress: shippingAddress,
          cartPrice: cartPrice,
          shippingCost: shippingCost,
          totalPrice: cartPrice + shippingCost,
          paymentMethod: paymentMethod
      })

      // Lặp qua từng mục trong cart để tính toán lại số lượng theo từng size
    for (const cartItem of cart.items) {
      const productId = cartItem.product._id;
      const size = cartItem.size;
      const quantity = cartItem.quantity;

      // Tìm sản phẩm và cập nhật số lượng theo từng size
      const product = await Product.findById(productId);

      if (product) {
        const updatedSizes = product.sizes.map((productSize) => {
          if (productSize.size === size) {
            // Giảm số lượng theo đơn hàng
            productSize.quantity -= quantity;
          }
          return productSize;
        });

        // Cập nhật mảng sizes của sản phẩm
        product.sizes = updatedSizes;

        // Cập nhật giá trị sold cho sản phẩm
        product.sold += quantity;

  
        await product.save();
      }
    }

      await newOrder.save();

      await newOrder
      .populate("user")
      .populate(
        {
          path: "cart.product",
          model: "Product",
          populate: {
            path: "category",
            model: "Category"
          }
        }
      );

      // Xóa giỏ hàng sau khi đã tạo đơn hàng
      // await Cart.findOneAndDelete({ user: userId });


      res.status(200).json({ message: "Tạo đơn hàng thành công!", newOrder });

  } catch (error) {
      return res.status(500).json({message: error.message});
  }
}

const cancelOrders = async (req, res) => {
  try {
    const orderId = req.params.orderId; // Lấy orderId từ đường dẫn URL
    const userId = req.user.id;

    // Kiểm tra xem đơn đặt hàng có tồn tại không
    const order = await Order.findOne({ _id: orderId, user: userId });

    if (!order) {
      // return res.status(404).json({ message: "The order does not exist!" });
      return res.status(404).json({ message: "Đơn hàng không tồn tại!" });
    }

    // Kiểm tra xem đơn đặt hàng có thể hủy không
    if (order.status !== "pending") {
      return res.status(400).json({ message: "Đơn hàng đang được xử lý, không thể hủy!" });
    }

    // Thực hiện hủy đơn đặt hàng
    order.status = "cancelled";
    await order.save();

    // res.status(200).json({ message: "The order has been successfully canceled!", cancelledOrder: order });
    res.status(200).json({ message: "Đơn hàng đã được hủy thành công!", cancelledOrder: order });
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

const adminDeleteOrders = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId);

    if(!order) {
      return res.status(404).json({message: "Đơn hàng không tồn tại!"});
    }

    if(order.status == "delivered" || order.status == "cancelled") {
      await Order.findByIdAndDelete(orderId);
      return res.status(200).json({message: "Đã xóa đơn hàng thành công!"});
    } else {
      return res.status(403).json({message: "Đơn hàng đang được xử lý, không thể xóa!"});
    }

    
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
}


const userDeleteOrders = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const userId = req.user.id;
    const order = await Order.findOne({_id: orderId, user: userId});

    if(!order) {
      // return res.status(404).json({message: "The order does not exist!"});
      return res.status(404).json({message: "Đơn hàng không tồn tại!"});
    }

    if(order.status !== "delivered" || order.status !== "cancelled") {
      return res.status(403).json({message: "Đơn hàng đang được xử lý, không thể xóa!"});
    }

    await Order.findByIdAndDelete(orderId);
    res.status(200).json({message: "Đã xóa đơn hàng thành công!"});
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
}


const detailOrders = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const myOrder = await Order.findById(orderId);
        res.status(200).json(myOrder);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getUserOrderHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({user: userId});
    const populatedOrders = await Order.populate(orders, [
      { path: 'cart.product', model: 'Product', populate: { path: 'category', model: 'Category' } },
      { path: 'user', model: 'User' },
    ]);
    
    res.status(200).json(populatedOrders);

  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
        .populate("user")
        .populate({
          path: "cart.product",
          model: "Product",
        })
        res.status(200).json({orders});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


const updateOrderStatus = async (req, res) => {
    try {
      const orderId = req.params.orderId;
      let { newStatus } = req.body;

      // chuyển sang chữ thường
      newStatus = newStatus.toLowerCase();
  
      // Kiểm tra xem đơn đặt hàng có tồn tại không
      const order = await Order.findOne({ _id: orderId });
  
      if (!order) {
        // return res.status(404).json({ message: "The order does not exist!" });
        return res.status(404).json({ message: "Đơn hàng không tồn tại!" });
      }
  
      // Kiểm tra trạng thái mới có hợp lệ không
      const validStatus = ["pending", "processing", "shipped", "delivered", "cancelled"];
      if (!validStatus.includes(newStatus)) {
        // return res.status(400).json({ message: "Invalid order status!" });
        return res.status(400).json({ message: "Trạng thái không hợp lệ!" });
      }
  
      // Kiểm tra xem trạng thái có thay đổi không
      if (order.status === newStatus) {
        // return res.status(400).json({ message: "Order status is already set to the requested status." });
        return res.status(400).json({ message: "Trạng thái đơn hàng đã được thay đổi" });
      }
  
      // Cập nhật trạng thái đơn đặt hàng
      order.status = newStatus;
      await order.save();
  
      // res.status(200).json({ message: "Order status has been updated successfully!", updatedOrder: order });
      res.status(200).json({ message: "Đã cập nhật trạng thái đơn hàng thành công!", updatedOrder: order });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};


const orderStatistics = async (req, res) => {
  try {
    // Lấy tất cả các đơn đặt hàng từ cơ sở dữ liệu
    const allOrders = await Order.find();

    // Thống kê các thông tin cần thiết
    const totalOrders = allOrders.length;
    const totalRevenue = allOrders.reduce((acc, order) => acc + order.totalPrice, 0);
    const pendingOrders = allOrders.filter(order => order.status === "pending").length;
    const processingOrders = allOrders.filter(order => order.status === "processing").length;
    const shippedOrders = allOrders.filter(order => order.status === "shipped").length;
    const deliveredOrders = allOrders.filter(order => order.status === "delivered").length;
    const cancelledOrders = allOrders.filter(order => order.status === "cancelled").length;

    // Gửi kết quả về cho admin
    res.status(200).json({
      totalOrders,
      totalRevenue,
      pendingOrders,
      processingOrders,
      shippedOrders,
      deliveredOrders,
      cancelledOrders
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export {
    createOrders,
    cancelOrders,
    detailOrders,
    getAllOrders,
    updateOrderStatus,
    orderStatistics,
    getUserOrderHistory,
    userDeleteOrders,
    adminDeleteOrders
};