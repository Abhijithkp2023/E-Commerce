import { imageUploadUtil } from "../../helpers/cloudinary.js";
import Product from "../../models/Product.js";

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    // const url = "data:" + req.file.mimetype + ";base64" + b64;
    const url = `data:${req.file.mimetype};base64,${b64}`; // Corrected formatting
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured",
    });
  }
};

//add a new product

const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const newlyCreatedProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });

    await newlyCreatedProduct.save();
    res.status(201).json({
      success: true,
      data: newlyCreatedProduct,
    });
  } catch (error) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//fetch all products

const fetchAllProducts = async (req, res) => {
  try {
    const listOfProducts = await Product.find({});
    res.status(201).json({
      success: true,
      data: listOfProducts,
    });
  } catch (error) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//edit product

const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const findProduct = await Product.findById(id);
    if (!findProduct)
      return res.status(404).json({
        success: false,
        message: "Product not Found",
      });

    Product.title = title || findProduct.title;
    Product.description = description || findProduct.description;
    Product.category = category || findProduct.category;
    Product.brand = brand || findProduct.brand;
    Product.price = price || findProduct.price;
    Product.salePrice = salePrice || findProduct.salePrice;
    Product.totalStock = totalStock || findProduct.totalStock;
    Product.image = image || findProduct.image;

    await findProduct.save();
    res.status(201).json({
      success: true,
      data: findProduct,
    });

  } catch (error) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//delete product

const deleteProduct = async (req, res) => {
  try {

    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id)
    if(!product) return res.status(404).json({
      success : false,
      message :"Product not found"
    })

    res.status(200).json({
      success : true,
      message : "Product deleted successfully"
    })


  } catch (error) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

export { handleImageUpload, addProduct, fetchAllProducts, editProduct, deleteProduct };
