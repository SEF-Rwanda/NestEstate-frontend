import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import jwt_decode from "jwt-decode";

const baseAPIUrl = "http://localhost:5000/api/v1";


export const updateProperty = createAsyncThunk(
  'user/updatProperty',
  
  async ({
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
    parking
    }, thuknAPI) => {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    console.log(title, category, section, price, size, upi, description, mainImage, otherImages, bedrooms, bathrooms, masterPlanUse,masterPlanLevel, streetAddress, geoLocation, tank, furnished, internet,parking);
    try{
        // 6408dc57cdb31e2a00c18d24 6407395882aa7065a6d20a00
    //   const response = await axios.put(`${baseAPIUrl}/properties/${property._id}`, {title, category, section, price, size, upi, description, mainImage, otherImages, bedrooms, bathrooms, masterPlanUse,masterPlanLevel, streetAddress, geoLocation, tank, furnished, internet},config);
    const response = await axios.put(`${baseAPIUrl}/properties/6408dc57cdb31e2a00c18d24`, {title, category, section, price, size, upi, description, mainImage, otherImages, bedrooms, bathrooms, masterPlanUse,masterPlanLevel, streetAddress, geoLocation, tank, furnished, internet, parking},config);
      return response.data; 
    }catch(err){
      return thuknAPI.rejectWithValue(err.response.data)
    }
  })

export const propertySlice = createSlice({
  name: "property",
  initialState: {
    propertyUpdated: {}
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateProperty.pending, (state) => {
        state.updateProperty={};
      })
      .addCase(updateProperty.fulfilled, (state,action) => {
        state.updateProperty=action.payload;
      })
      .addCase(updateProperty.rejected, (state,action) => {
        state.updateProperty={};
        state.error = action.error.message;
      })  
  },
});

export const selectUpdated = (state) => state.property.updateProperty;
export const selectError = (state) => state.propert.error;

export default propertySlice.reducer;
