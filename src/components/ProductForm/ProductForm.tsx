import React, { useState } from "react";

import { useProductDispatch } from "../../hooks/useProductDispatch";
import { createProduct } from "../../store/products/actions";

import "./productForm.css";

export const ProductForm = () => {
  const dispatch = useProductDispatch();
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [categories, setCategories] = useState("");

  const clearForm = () => {
    setDescription("");
    setPrice(0);
    setStock(0);
    setCategories("");
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();

    const categoryArray = categories.split(",").map((cat) => cat.trim());

    dispatch(
      createProduct({
        description,
        price,
        stock,
        categories: categoryArray,
      })
    );

    clearForm();
  };

  return (
    <form onSubmit={handleCreate} className="formContainer">
      <h2 className="formHeader">Add Product</h2>
      <div className="formGroup">
        <label htmlFor="description">Description:</label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="formGroup">
        <label htmlFor="price">Price:</label>
        <input
          id="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          required
        />
      </div>
      <div className="formGroup">
        <label htmlFor="stock">Stock:</label>
        <input
          id="stock"
          type="number"
          value={stock}
          onChange={(e) => setStock(parseInt(e.target.value))}
          required
        />
      </div>
      <div className="formGroup">
        <label htmlFor="categories">Categories (comma separated):</label>
        <input
          id="categories"
          type="text"
          value={categories}
          onChange={(e) => setCategories(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="submitButton">
        Add Product
      </button>
    </form>
  );
};
