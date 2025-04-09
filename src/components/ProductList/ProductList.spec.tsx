import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ProductList } from "./ProductList";
import { useSelector } from "react-redux";
import { useProductDispatch } from "../../hooks/useProductDispatch";
import {
  fetchProducts,
  removeProduct,
  editProduct,
} from "../../store/products/actions";
import { Product } from "../../store/products/types";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

jest.mock("../../hooks/useProductDispatch", () => ({
  useProductDispatch: jest.fn(),
}));

jest.mock("../../store/products/actions", () => ({
  fetchProducts: jest.fn(() => ({ type: "FETCH_PRODUCTS" })),
  removeProduct: jest.fn((id: string) => ({
    type: "REMOVE_PRODUCT",
    payload: id,
  })),
  editProduct: jest.fn((product: Product) => ({
    type: "EDIT_PRODUCT",
    payload: product,
  })),
}));

const fakeProducts: Product[] = [
  {
    id: "a3bb189e-8bf9-3888-9912-ace4e6543002",
    description: "Product 1",
    price: 10,
    stock: 5,
    categories: ["cat1"],
  },
  {
    id: "b3bb189e-8bf9-3888-9912-ace4e6543003",
    description: "Product 2",
    price: 20,
    stock: 10,
    categories: ["cat2"],
  },
];

describe("ProductList Component", () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useProductDispatch as jest.Mock).mockReturnValue(mockDispatch);
  });

  const setupState = (state: {
    loading: boolean;
    error: string | null;
    items: Product[];
  }) => {
    (useSelector as unknown as jest.Mock).mockImplementation((callback) =>
      callback({ products: state })
    );
  };

  it("should calls fetchProducts on mount", () => {
    setupState({ loading: false, error: null, items: [] });
    render(<ProductList />);
    expect(fetchProducts).toHaveBeenCalledTimes(1);
  });

  it("should display Loading... when loading is true", () => {
    setupState({ loading: true, error: null, items: [] });
    render(<ProductList />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it("should display error message when error is set", () => {
    setupState({ loading: false, error: "Erro de teste", items: [] });
    render(<ProductList />);
    expect(screen.getByText(/Error: Erro de teste/i)).toBeInTheDocument();
  });

  it("should renders the list of productss", () => {
    setupState({ loading: false, error: null, items: fakeProducts });
    render(<ProductList />);

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
    expect(screen.getAllByText("Edit")).toHaveLength(fakeProducts.length);
    expect(screen.getAllByText("Delete")).toHaveLength(fakeProducts.length);
  });

  it("should triggers removeProduct when clicking Delete", () => {
    setupState({ loading: false, error: null, items: fakeProducts });
    render(<ProductList />);

    const deleteButtons = screen.getAllByText("Delete");
    fireEvent.click(deleteButtons[0]);
    expect(removeProduct).toHaveBeenCalledWith(
      "a3bb189e-8bf9-3888-9912-ace4e6543002"
    );
    expect(mockDispatch).toHaveBeenCalledWith(
      removeProduct("a3bb189e-8bf9-3888-9912-ace4e6543002")
    );
  });

  it("should enters edit mode when clicking Edit, allows changes and triggers editProduct when saving", async () => {
    setupState({ loading: false, error: null, items: fakeProducts });
    render(<ProductList />);

    fireEvent.click(screen.getAllByText("Edit")[0]);

    const descriptionInput = screen.getByDisplayValue("Product 1");
    const priceInput = screen.getByDisplayValue("10");
    const stockInput = screen.getByDisplayValue("5");
    const categoriesInput = screen.getByDisplayValue("cat1");

    expect(descriptionInput).toBeInTheDocument();
    expect(priceInput).toBeInTheDocument();
    expect(stockInput).toBeInTheDocument();
    expect(categoriesInput).toBeInTheDocument();

    fireEvent.change(descriptionInput, {
      target: { value: "Product 1 Updated" },
    });
    fireEvent.change(priceInput, { target: { value: "15" } });
    fireEvent.change(stockInput, { target: { value: "8" } });
    fireEvent.change(categoriesInput, { target: { value: "cat1, cat3" } });

    fireEvent.click(screen.getByText("Save"));

    await waitFor(() => {
      expect(editProduct).toHaveBeenCalledWith({
        id: "a3bb189e-8bf9-3888-9912-ace4e6543002",
        description: "Product 1 Updated",
        price: 15,
        stock: 8,
        categories: ["cat1", "cat3"],
      });
    });

    expect(mockDispatch).toHaveBeenCalledWith(
      editProduct({
        id: "a3bb189e-8bf9-3888-9912-ace4e6543002",
        description: "Product 1 Updated",
        price: 15,
        stock: 8,
        categories: ["cat1", "cat3"],
      })
    );
  });

  it("should cancels edit mode by clicking Cancel", () => {
    setupState({ loading: false, error: null, items: fakeProducts });
    render(<ProductList />);

    fireEvent.click(screen.getAllByText("Edit")[0]);
    expect(screen.getByDisplayValue("Product 1")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Cancel"));

    expect(screen.queryByDisplayValue("Product 1")).not.toBeInTheDocument();
    expect(screen.getByText("Product 1")).toBeInTheDocument();
  });
});
