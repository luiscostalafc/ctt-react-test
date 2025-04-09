import { useEffect, useState, ChangeEvent } from "react";
import { useSelector } from "react-redux";

import { AppState } from "../../store";
import {
  fetchProducts,
  removeProduct,
  editProduct,
} from "../../store/products/actions";
import { useProductDispatch } from "../../hooks/useProductDispatch";
import { Product } from "../../store/products/types";

export const ProductList = () => {
  const dispatch = useProductDispatch();
  const { items, loading, error } = useSelector(
    (state: AppState) => state.products
  );

  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editedProduct, setEditedProduct] = useState({
    description: "",
    price: 0,
    stock: 0,
    categories: "",
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const clearProduct = () => {
    setEditedProduct({
      description: "",
      price: 0,
      stock: 0,
      categories: "",
    });
  };

  const handleRemoveProduct = (id: string) => {
    dispatch(removeProduct(id));
  };

  const handleEditClick = (product: Product) => {
    setEditingProductId(product.id);
    setEditedProduct({
      description: product.description,
      price: product.price,
      stock: product.stock,
      categories: product.categories.join(", "),
    });
  };

  const handleEditProduct = () => {
    if (!editingProductId) return;

    const updatedProduct = {
      id: editingProductId,
      description: editedProduct.description,
      price: editedProduct.price,
      stock: editedProduct.stock,
      categories: editedProduct.categories
        .split(",")
        .map((cat: string) => cat.trim()),
    };

    dispatch(editProduct(updatedProduct));
    setEditingProductId(null);
    clearProduct();
  };

  const handleCancelEditProduct = () => {
    setEditingProductId(null);
    clearProduct();
  };

  const handleChangeProduct = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Products</h2>
      <table border={1} cellPadding={5} cellSpacing={0}>
        <thead>
          <tr>
            <th>Description</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Categories</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((product) => (
            <tr key={product.id}>
              {editingProductId === product.id ? (
                <>
                  <td>
                    <input
                      type="text"
                      name="description"
                      value={editedProduct.description}
                      onChange={handleChangeProduct}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="price"
                      value={editedProduct.price}
                      onChange={handleChangeProduct}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="stock"
                      value={editedProduct.stock}
                      onChange={handleChangeProduct}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="categories"
                      value={editedProduct.categories}
                      onChange={handleChangeProduct}
                    />
                  </td>
                  <td>
                    <button onClick={handleEditProduct}>Save</button>
                    <button onClick={handleCancelEditProduct}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{product.description}</td>
                  <td>${product.price}</td>
                  <td>{product.stock}</td>
                  <td>{product.categories.join(", ")}</td>
                  <td>
                    <button onClick={() => handleEditClick(product)}>
                      Edit
                    </button>
                    <button onClick={() => handleRemoveProduct(product.id)}>
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
