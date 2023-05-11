const {createSlice} = require('@reduxjs/toolkit');

const initialState = [
  {
    id: 1,
    name: 'Jordan 1',
    price: 99.9,
  },
  {
    id: 2,
    name: 'Jordan 2',
    price: 99.9,
  },
];

const bagSlice = createSlice({
  name: 'bag',
  initialState: initialState,
  reducers: {
    addProduct: (state, action) => {
      const product = action.payload;
      if (product?.name) {
        state.push(product);
      }
    },
    deleteProduct: (state, action) => {
      const foundProduct = state.find(product => product.id === action.payload);
      if (foundProduct) {
        state.splice(state.indexOf(foundProduct), 1);
      }
    },
  },
});

export const {addProduct, deleteProduct} = bagSlice.actions;
export default bagSlice.reducer;
