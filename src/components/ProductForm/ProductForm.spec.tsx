import { render, screen, fireEvent } from "@testing-library/react";
import { useDispatch } from "react-redux";

import { ProductForm } from "./ProductForm";
import { createProduct } from "../../store/products/actions";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

jest.mock("../../store/products/actions", () => ({
  createProduct: jest.fn(),
}));

describe("ProductForm", () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should update the fields and call the createProduct action with the correct data when submitting the form", () => {
    render(<ProductForm />);

    const descriptionInput = screen.getByLabelText(/Description:/i);
    const priceInput = screen.getByLabelText(/Price:/i);
    const stockInput = screen.getByLabelText(/Stock:/i);
    const categoriesInput = screen.getByLabelText(
      /Categories \(comma separated\):/i
    );

    fireEvent.change(descriptionInput, { target: { value: "New Product" } });
    fireEvent.change(priceInput, { target: { value: "50.5" } });
    fireEvent.change(stockInput, { target: { value: "20" } });
    fireEvent.change(categoriesInput, { target: { value: "cat1, cat2" } });

    const submitButton = screen.getByRole("button", { name: /Add Product/i });
    fireEvent.click(submitButton);

    expect(createProduct).toHaveBeenCalledWith({
      description: "New Product",
      price: 50.5,
      stock: 20,
      categories: ["cat1", "cat2"],
    });

    expect(mockDispatch).toHaveBeenCalled();

    expect((descriptionInput as HTMLInputElement).value).toBe("");
    expect((priceInput as HTMLInputElement).value).toBe("0");
    expect((stockInput as HTMLInputElement).value).toBe("0");
    expect((categoriesInput as HTMLInputElement).value).toBe("");
  });
});
