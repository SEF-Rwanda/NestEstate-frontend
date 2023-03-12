import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseAPIUrl = "http://localhost:5000/api/v1";
const token = localStorage.getItem("token");

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const updateProperty = createAsyncThunk(
  "user/updatProperty",

  async (
    {
      title,
      category,
      section,
      price,
      size,
      upi,
      description,
      mainImage,
      otherImages,
      bedrooms,
      bathrooms,
      masterPlanUse,
      masterPlanLevel,
      streetAddress,
      geoLocation,
      tank,
      furnished,
      internet,
      parking,
    },
    thuknAPI
  ) => {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const propid = sessionStorage.getItem("propid");
      const response = await axios.put(
        `${baseAPIUrl}/properties/${propid}`,
        {
          title,
          category,
          section,
          price,
          size,
          upi,
          description,
          mainImage,
          otherImages,
          bedrooms,
          bathrooms,
          masterPlanUse,
          masterPlanLevel,
          streetAddress,
          geoLocation,
          tank,
          furnished,
          internet,
          parking,
        },
        config
      );
      return response.data;
    } catch (err) {
      return thuknAPI.rejectWithValue(err.response.data);
    }
  }
);
export const addProduct = createAsyncThunk(
  "properties/addProperties",
  async (newProductData) => {
    const response = await axios.post(
      `${baseAPIUrl}/properties`,
      newProductData,
      config
    );
    const token = response.data.data.token;
    localStorage.setItem("verificationToken", token);
    return response.data;
  }
);

export const propertySlice = createSlice({
  name: "property",
  initialState: {
    propertyUpdated: {},
    isAddingProductLoading: false,
    isAddingProductSuccess: false,
    isAddingProductFailed: false,
    addingProductError: "",
    isUpdatingPropertyLoading: false,
    isUpdatingPropertySuccess: false,
    isUpdatingPropertyFailed: false,
    updatingPropertyError: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateProperty.pending, (state) => {
        state.updateProperty = {};
        state.isUpdatingPropertyLoading = true;
        state.isUpdatingPropertySuccess = false;
        state.isUpdatingPropertyFailed = false;
        state.updatingPropertyError = "";
      })
      .addCase(updateProperty.fulfilled, (state, action) => {
        state.updateProperty = action.payload;
        state.isUpdatingPropertyLoading = false;
        state.isUpdatingPropertySuccess = true;
        state.isUpdatingPropertyFailed = false;
        state.updatingPropertyError = "";
      })
      .addCase(updateProperty.rejected, (state, action) => {
        state.updateProperty = {};
        state.isUpdatingPropertyLoading = false;
        state.isUpdatingPropertySuccess = false;
        state.isUpdatingPropertyFailed = true;
        state.updatingPropertyError = action.error.message;
      })
      .addCase(addProduct.pending, (state) => {
        state.isAddingProductLoading = true;
        state.isAddingProductSuccess = false;
        state.addingProductError = "";
        state.isAddingProductFailed = false;
      })
      .addCase(addProduct.fulfilled, (state) => {
        state.isAddingProductLoading = false;
        state.isAddingProductSuccess = true;
        state.addingProductError = "";
        state.isAddingProductFailed = false;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isAddingProductLoading = false;
        state.isAddingProductSuccess = false;
        state.addingProductError = action.error.message;
        state.isAddingProductFailed = true;
      });
  },
});

export const selectUpdated = (state) => state.property.updateProperty;
export const selectError = (state) => state.propert.error;

export default propertySlice.reducer;
