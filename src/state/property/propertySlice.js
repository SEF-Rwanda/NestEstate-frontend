import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const token = localStorage.getItem("token");
const baseAPIUrl = "/api/v1";

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const updateProperty = createAsyncThunk(
  "properties/updateProperty",

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
    return response.data;
  }
);
export const fetchSingleProduct = createAsyncThunk(
  "properties/fetchSingleProduct",
  async (id) => {
    const response = await axios.get(`${baseAPIUrl}/properties/${id}`);
    return response.data.data;
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
    isFetchingPropertyLoading: false,
    isFetchingPropertySuccess: false,
    isFetchingPropertyFailed: false,
    fetchingPropertyError: "",
    fetchedProperty: null,
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
      })
      .addCase(fetchSingleProduct.pending, (state) => {
        state.isFetchingPropertyLoading = true;
        state.isFetchingPropertySuccess = false;
        state.isFetchingPropertyFailed = false;
        state.fetchingPropertyError = "";
        state.fetchedProperty = null;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.isFetchingPropertyLoading = false;
        state.isFetchingPropertySuccess = true;
        state.isFetchingPropertyFailed = false;
        state.fetchingPropertyError = "";
        state.fetchedProperty = action.payload;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.isFetchingPropertyLoading = false;
        state.isFetchingPropertySuccess = false;
        state.isFetchingPropertyFailed = true;
        state.fetchingPropertyError = "";
        state.fetchedProperty = action.error.message;
      });
  },
});

export const selectUpdated = (state) => state.property.updateProperty;
export const selectError = (state) => state.property.error;

export default propertySlice.reducer;
