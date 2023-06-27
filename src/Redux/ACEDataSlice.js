const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  userData: {},
  token: "",
  fixtureId: "",
};

const ACEData = createSlice({
  name: "data",
  initialState,
  reducers: {
    userData: (state, action) => {
      state.userData = action.payload;
      console.log("3rd time", action.payload);
      // AsyncStorage.setItem('companyData', JSON.stringify(state.value));
    },
    login: (state, action) => {
      state.token = action.payload;
      //console.log("token", action.payload);
    },
    logOut: (state, action) => {
      state.userData = {};
    },
    AddFixtureId: (state, action) => {
      state.fixtureId = action.payload;
    },
  },
});

export const { userData, login, logOut, AddFixtureId } = ACEData.actions;
export default ACEData.reducer;
