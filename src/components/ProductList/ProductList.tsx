import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../store";
import { fetchProducts } from "../../store/products/actions";

export const ProductList = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(
    (state: AppState) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts() as any);
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div>
      <h2>Products</h2>
      <ul>
        {items.map((product) => (
          <li key={product.id}>
            {product.description} - ${product.price} (Stock: {product.stock})
          </li>
        ))}
      </ul>
    </div>
  );
};
