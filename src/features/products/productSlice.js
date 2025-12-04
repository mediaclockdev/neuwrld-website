import { createSlice } from "@reduxjs/toolkit";
import shirt from "../../assets/Images/shirt.jpg";
import pant from "../../assets/Images/pant.jpg";
import jacket from "../../assets/Images/jacket.jpg";
import sneakers from "../../assets/Images/sneakers.jpg";

const initialProducts = {
  men: [
    {
      id: 1,
      name: "Classic Denim Jacket",
      price: "$89.99",
      img: jacket,
      images: [jacket, shirt, pant, sneakers],
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      material: "100% Cotton",
      shippingAndReturns:
        "Free shipping on orders over $50. 30-day return policy.",
    },
    {
      id: 2,
      name: "Cotton Casual Shirt",
      price: "$45.99",
      img: shirt,
      images: [jacket, shirt, pant, sneakers],
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      material: "100% Cotton",
      shippingAndReturns:
        "Free shipping on orders over $50. 30-day return policy.",
    },
    {
      id: 3,
      name: "Slim Fit Chinos",
      price: "$69.99",
      img: pant,
      images: [jacket, shirt, pant, sneakers],
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      material: "100% Cotton",
      shippingAndReturns:
        "Free shipping on orders over $50. 30-day return policy.",
    },
    {
      id: 4,
      name: "White Sneakers",
      price: "$129.99",
      img: sneakers,
      images: [jacket, shirt, pant, sneakers],
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      material: "100% Cotton",
      shippingAndReturns:
        "Free shipping on orders over $50. 30-day return policy.",
    },
  ],
  women: [
    {
      id: 5,
      name: "Floral Summer Dress",
      price: "$79.99",
      img: jacket,
      images: [jacket, shirt, pant, sneakers],
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      material: "100% Cotton",
      shippingAndReturns:
        "Free shipping on orders over $50. 30-day return policy.",
    },
    {
      id: 6,
      name: "Silk Blouse",
      price: "$95.99",
      img: shirt,
      images: [jacket, shirt, pant, sneakers],
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      material: "100% Cotton",
      shippingAndReturns:
        "Free shipping on orders over $50. 30-day return policy.",
    },
    {
      id: 7,
      name: "High-Waist Jeans",
      price: "$89.99",
      img: pant,
      images: [jacket, shirt, pant, sneakers],
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      material: "100% Cotton",
      shippingAndReturns:
        "Free shipping on orders over $50. 30-day return policy.",
    },
    {
      id: 8,
      name: "Block Heels",
      price: "$149.99",
      img: sneakers,
      images: [jacket, shirt, pant, sneakers],
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      material: "100% Cotton",
      shippingAndReturns:
        "Free shipping on orders over $50. 30-day return policy.",
    },
  ],
};

const productSlice = createSlice({
  name: "products",
  initialState: initialProducts,
  reducers: {},
});

export default productSlice.reducer;
