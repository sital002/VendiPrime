import { Product } from "../db/models/ProductModel.js";
import { deleteImage, uploadImage } from "../utils/cloudinary.js";

export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      products,
    });
  } catch (err) {
    return next(new Error(err));
  }
};

export const createProduct = async (req, res, next) => {
  const { name, description, price, stock } = req.body;
  if (!name || !description || !price || !stock) {
    return next(new Error("All fields are required"));
  }
  if(!req.file) return new Error("Product Image is required")
  try {
    const result = await uploadImage(req.file);
    if(!result) return new Error("Something went wrong")
    const product = await Product.create({
      name,
      description,
      price,
      stock,
      image:{
        public_id:result.public_id,
        url:result.url
      },
    });
    return res.status(201).json({
      success: true,
      product,
    });
  } catch (err) {
    return next(new Error(err));
  }
};

export const getProductDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    return res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    return next(new Error(err));
  }
};

export const filterProduct = async (req, res,next) => {
  try{
    const products = await Product.find({name:{$regex: new RegExp(req.query.name, "i")}});
    if(!products) return next(new Error("No Products Found"))
    res.status(200).json({
      query: req.query,
      products,
    });
  }
  catch(err){
    return next(new Error(err))
  }
};


export const deleteProduct = async(req,res,next)=>{
  const {id} = req.params;
  if(!id) return next(new Error("Product Id is required"));
  try{
    const product = await Product.findByIdAndDelete(id);
    await deleteImage(product.image.public_id);
    const products = await Product.find()
    res.status(200).json({
      success:true,
      products,
      msg:'Product deleted successfully'
    });
  }
  catch(err){
    return next(new Error(err.message))
  }

}
