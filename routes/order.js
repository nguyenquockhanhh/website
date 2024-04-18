var express = require('express');
var router = express.Router();
const orderModel = require('../schemas/order')
const InvoiceItemModel = require('../schemas/invoiceitem');
var responseReturn = require('../helper/ResponseHandle')



//localhost:3000/order
/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    const orderdata = await orderModel.find().populate('invoice_items'); // Sử dụng populate để lấy thông tin của invoice_items
    // res.json(userdata);
    responseReturn.ResponseSend(res, true, 200, orderdata)

  } catch (error) {
    console.error(error); // Log lỗi nếu có
    res.status(500).send('Server Error'); // Trả về lỗi 500 nếu có lỗi xảy ra
  }
});


router.put('Capnhatdonhang/:orderId', async function(req, res, next) {
  const { orderId } = req.params;
  const { newStatus } = req.body;

  try {
    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.status(404).send('Order not found');
    }

    // Kiểm tra nếu newStatus là 'Done' hoặc 'Loading'
    if (newStatus !== 'Done...' && newStatus !== 'Loading...') {
      return res.status(400).send('Invalid status');
    }

    // Cập nhật trạng thái mới
    order.status = newStatus;
    await order.save();

    res.status(200).send('Order status updated successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});


router.get('/byUserId/:userId', async function(req, res, next) {
  try {
    const userId = req.params.userId; // Lấy userId từ request params

    const orderdata = await orderModel.find({ user_id: userId }).populate('invoice_items'); // Tìm kiếm đơn hàng với userId và sử dụng populate để lấy thông tin của invoice_items
    responseReturn.ResponseSend(res, true, 200, orderdata);
  } catch (error) {
    console.error(error); // Log lỗi nếu có
    res.status(500).send('Server Error'); // Trả về lỗi 500 nếu có lỗi xảy ra
  }
});


// Lấy dữ liệu sản phẩm dựa trên id
router.get("/:id", async function (req, res, next) {
  const orderId = req.params.id; // Lấy id từ request params
  try {
    const product = await orderModel.findById(orderId).populate('invoice_items');;

    if (!product) {
      // Kiểm tra nếu không tìm thấy sản phẩm
      return res.status(404).json({ message: "Product not found" });
    }
    responseReturn.ResponseSend(res, true, 200, product)
   
  } catch (error) {
    console.error(error); // Log lỗi nếu có
    res.status(500).send("Server Error"); // Trả về lỗi 500 nếu có lỗi xảy ra
  }
});
// Thêm dữ liệu mới
router.post('/checkout', async (req, res) => {
  try {
      const { invoice_date, customer_name, phone, total, status, addrress,invoice_items , user_id} = req.body;
      console.log(req.body);
      // Tạo một mảng các đối tượng invoice_items từ req.body
      const invoiceItems = req.body.invoice_items.map(item => ({
          product_id: item.product_id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          itemTotal: item.itemTotal
         
      }));

      // Lưu mảng invoiceItems vào collection invoiceItems
      const savedInvoiceItems = await InvoiceItemModel.insertMany(invoiceItems);

       // Tạo một mảng các đối tượng invoice_items để lưu vào collection Order
       const invoiceItemsIds = savedInvoiceItems.map(item => item._id);

      const newOrder = new orderModel({
          invoice_date,
          user_id,
          customer_name,
          phone,
          total,
          status,
          addrress,
          invoice_items: invoiceItemsIds  // Gán mảng invoiceItems vào invoice_items
      });

      // Lưu đơn hàng mới vào cơ sở dữ liệu
      const savedOrder = await newOrder.save();

      res.status(201).json(savedOrder);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

// Cập nhật dữ liệu
router.put("/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    const { title,description, price, linkImg ,categoryName  } = req.body;
    const updatedProduct = await sanphamModel.findByIdAndUpdate(id, {
      title,
      description,
      price,
      linkImg,
      category: {
        name: categoryName // lưu tên danh mục trong trường category của sản phẩm
      }
      
    }, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Xóa dữ liệu
router.delete("/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    const deletedProduct = await sanphamModel.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
