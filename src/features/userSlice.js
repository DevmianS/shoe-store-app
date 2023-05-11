const {createSlice} = require('@reduxjs/toolkit');

const initialState = {
  jwt: '',
  userData: {
    id: 0,
    username: '',
    email: '',
    provider: '',
    confirmed: true,
    blocked: false,
    createdAt: '',
    updatedAt: '',
    phoneNumber: '',
    firstName: '',
    lastName: '',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: user => {
      if (user?.jwt) {
        localStorage.setItem('user', user);
        return user;
      }
    },
  },
});

export const {setUser} = userSlice.actions;
export default userSlice.reducer;
