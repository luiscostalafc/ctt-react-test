import { ProductForm } from "./components/ProductForm/ProductForm";
import { ProductList } from "./components/ProductList/ProductList";

const App = () => {
  return (
    <div>
      <h1 style={{ color: "#DF0024" }}>CTT - Products</h1>
      <ProductForm />
      <ProductList />
    </div>
  );
};

export default App;
