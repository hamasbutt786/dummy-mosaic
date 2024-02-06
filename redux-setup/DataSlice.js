const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  hamburger: false,
  firstdata: "firstdata",
  showDropdown: false,
  selected: 0,
  selected2: 0,
  themeType: "",
  themeChange: "",
  localVariable: {}
};
const dataSlice = createSlice({
  name: "dataSlice",
  initialState,
  reducers: {
    setfirstdata: (state, action) => {
      state.firstdata = action.payload;
    },
    setShowDropdown: (state, action) => {
      state.showDropdown = action.payload;
    },
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
    setSelected2: (state, action) => {
      state.selected2 = action.payload;
    },
    setThemeType: (state, action) => {
      state.themeType = action.payload;
    },
    setHamburger: (state, action) => {
      state.hamburger = action.payload;
    },
    setThemeChange: (state, action) => {
      state.themeChange = action.payload;
    },
    setLocalVariable: (state, action) => {
      state.localVariable = action.payload;
    },
  },
});
export const {
  setfirstdata,
  setShowDropdown,
  setSelected,
  setSelected2,
  setThemeType,
  setHamburger,
  setThemeChange,
  setLocalVariable
} = dataSlice.actions;
export default dataSlice.reducer;
