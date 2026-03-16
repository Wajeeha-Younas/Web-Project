import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { createBrand } from "../services/brandService"; 

export default function CreateBrandDialog({ open, handleClose, refreshBrands }) {
  const [form, setForm] = useState({
    brandName: "",
    country: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    emailAddress: "",
    industry: "",
    website: "",
    socialLink: "",
    lowPriceRange: "",
    highPrice: "",
    primaryRepresentative: { name: "", phone: "", email: "" },
    secondaryRepresentative: { name: "", phone: "", email: "" },
    tertiaryRepresentative: { name: "", phone: "", email: "" },
    status: "active",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e, repType, field) => {
    const { name, value } = e.target;

    if (repType) {
      setForm((prev) => ({
        ...prev,
        [repType]: {
          ...prev[repType],
          [field]: value,
        },
      }));
      setErrors((prev) => ({ ...prev, [repType]: { ...prev[repType], [field]: "" } }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!form.brandName) newErrors.brandName = "Brand name must be entered";
    if (!form.country) newErrors.country = "Country must be selected";
    if (!form.addressLine1) newErrors.addressLine1 = "Address Line 1 must be entered";
    if (!form.city) newErrors.city = "City must be entered";
    if (!form.state) newErrors.state = "State must be selected";
    if (!form.zipCode) newErrors.zipCode = "Zip Code must be entered";
    if (!form.emailAddress) {
      newErrors.emailAddress = "Email must be entered";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.emailAddress)) {
        newErrors.emailAddress = "Enter a valid email address";
      }
    }
    if (!form.industry) newErrors.industry = "Industry must be entered";
    if (!form.lowPriceRange) newErrors.lowPriceRange = "Low price must be entered";
    if (!form.highPrice) newErrors.highPrice = "High price must be entered";

    newErrors.primaryRepresentative = {};
    if (!form.primaryRepresentative.phone) {
      newErrors.primaryRepresentative.phone = "Phone must be entered";
    } else {
      const phoneRegex = /^[0-9]+$/; 
      if (!phoneRegex.test(form.primaryRepresentative.phone)) {
        newErrors.primaryRepresentative.phone = "Phone must contain only numbers";
      }
    }
    if (!form.primaryRepresentative.email) newErrors.primaryRepresentative.email = "Email must be entered";


    if (
      !newErrors.primaryRepresentative.name &&
      !newErrors.primaryRepresentative.phone &&
      !newErrors.primaryRepresentative.email
    ) {
      delete newErrors.primaryRepresentative;
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = async () => {
    if (!validate()) return;

    try {
      const data = await createBrand(form);
      refreshBrands();
      handleClose();
    } catch (err) {
      console.error("Error creating brand:", err.message);
      alert(err.message);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth PaperProps={{ sx: { width: "800px", height: "90vh", borderRadius: "12px" } }}>
      <DialogTitle>Create a Brand</DialogTitle>
      <DialogContent sx={{ overflowY: "auto" }}>
        <Grid container spacing={3}>
          {/* Brand Name */}
          <Grid item xs={12}>
            <Typography fontSize={14} mb={0.5}>
              Brand Name <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              name="brandName"
              value={form.brandName}
              onChange={handleChange}
              size="small"
              placeholder="Enter brand name"
              sx={{ width: "350px" }}
              error={!!errors.brandName}
              helperText={errors.brandName}
            />
          </Grid>

          {/* Country */}
          <Grid item xs={6}>
            <Typography fontSize={14} mb={0.5}>
              Country <span style={{ color: "red" }}>*</span>
            </Typography>
            <FormControl fullWidth size="small" error={!!errors.country}>
              <Select
                name="country"
                value={form.country || ""}
                onChange={(e) => handleChange(e)}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Select Country
                </MenuItem>
                <MenuItem value="Pakistan">Pakistan</MenuItem>
                <MenuItem value="USA">USA</MenuItem>
              </Select>
              {errors.country && <Typography color="error" fontSize={12}>{errors.country}</Typography>}
            </FormControl>
          </Grid>

          {/* Address Line 1 */}
          <Grid item xs={6}>
            <Typography fontSize={14} mb={0.5}>
              Address Line 1 <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              name="addressLine1"
              value={form.addressLine1}
              onChange={handleChange}
              size="small"
              placeholder="Enter address line 1"
              sx={{ width: "350px" }}
              error={!!errors.addressLine1}
              helperText={errors.addressLine1}
            />
          </Grid>

          {/* Address Line 2 */}
          <Grid item xs={6}>
            <Typography fontSize={14} mb={0.5}>
              Address Line 2
            </Typography>
            <TextField
              name="addressLine2"
              value={form.addressLine2}
              onChange={handleChange}
              size="small"
              placeholder="Enter address line 2"
              sx={{ width: "350px" }}

            />
          </Grid>

          {/* City */}
          <Grid item xs={6}>
            <Typography fontSize={14} mb={0.5}>
              City <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              name="city"
              value={form.city}
              onChange={handleChange}
              size="small"
              placeholder="Enter city"
              sx={{ width: "350px" }}
              error={!!errors.city}
              helperText={errors.city}
            />
          </Grid>

     {/* State */}
<Grid item xs={6}>
  <Typography fontSize={14} mb={0.5}>
    State <span style={{ color: "red" }}>*</span>
  </Typography>

  <FormControl fullWidth size="small">
    <Select
      name="state"
      value={form.state || ""}
      onChange={(e) => setForm({ ...form, state: e.target.value })}
      displayEmpty
    >
      <MenuItem value="" disabled>
        Select State
      </MenuItem>
      <MenuItem value="Punjab">Punjab</MenuItem>
      <MenuItem value="Sindh">Sindh</MenuItem>
      <MenuItem value="KPK">KPK</MenuItem>
      <MenuItem value="Balochistan">Balochistan</MenuItem>
      
    </Select>
    {errors.state && <Typography color="error" fontSize={12}>{errors.state}</Typography>}
  </FormControl>
</Grid>

          {/* Zip Code */}
          <Grid item xs={6}>
            <Typography fontSize={14} mb={0.5}>
              Zip Code <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              name="zipCode"
              value={form.zipCode}
              onChange={handleChange}
              size="small"
              placeholder="Enter zip code"
              sx={{ width: "350px" }}
              error={!!errors.zipCode}
              helperText={errors.zipCode}
            />
          </Grid>

          <Grid item xs={6}>
            <Typography fontSize={14} mb={0.5}>
              Email Address <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              name="emailAddress"
              value={form.emailAddress}
              onChange={handleChange}
              size="small"
              placeholder="Enter email address"
              sx={{ width: "350px" }}
              error={!!errors.emailAddress}
              helperText={errors.emailAddress}
            />
          </Grid>

          <Grid item xs={6}>
            <Typography fontSize={14} mb={0.5}>
              Industry <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              name="industry"
              value={form.industry}
              onChange={handleChange}
              size="small"
              placeholder="Enter industry"
              sx={{ width: "350px" }}
              error={!!errors.industry}
              helperText={errors.industry}
            />
          </Grid>

  
          <Grid item xs={6}>
            <Typography fontSize={14} mb={0.5}>
              Website
            </Typography>
            <TextField
              name="website"
              value={form.website}
              onChange={handleChange}
              size="small"
              placeholder="Enter website"
              sx={{ width: "350px" }}
            />
          </Grid>

  
          <Grid item xs={6}>
            <Typography fontSize={14} mb={0.5}>
              Social Link
            </Typography>
            <TextField
              name="socialLink"
              value={form.socialLink}
              onChange={handleChange}
              size="small"
              placeholder="Enter social link"
              sx={{ width: "350px" }}
            />
          </Grid>

       
          <Grid item xs={6}>
            <Typography fontSize={14} mb={0.5}>
              Low Price Range <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
  name="lowPriceRange"
  type="number"
  value={form.lowPriceRange}
  onChange={handleChange}
  size="small"
  placeholder="Enter low price"
  sx={{ width: "350px" }}
/>
          </Grid>

          <Grid item xs={6}>
            <Typography fontSize={14} mb={0.5}>
              High Price <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
  name="highPrice"
  type="number"
  value={form.highPrice}
  onChange={handleChange}
  size="small"
  placeholder="Enter high price"
  sx={{ width: "350px" }}
/>
          </Grid>

       
          <Grid item xs={6}>
            <Typography fontSize={14} mb={0.5}>
              Primary Representative Name <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              value={form.primaryRepresentative.name}
              onChange={(e) => handleChange(e, "primaryRepresentative", "name")}
              size="small"
              placeholder="Enter name"
              sx={{ width: "350px" }}
              error={!!errors.primaryRepresentative?.name}
              helperText={errors.primaryRepresentative?.name}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography fontSize={14} mb={0.5}>
              Primary Representative Phone <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              value={form.primaryRepresentative.phone}
              onChange={(e) => handleChange(e, "primaryRepresentative", "phone")}
              size="small"
              placeholder="Enter phone"
              sx={{ width: "350px" }}
              error={!!errors.primaryRepresentative?.phone}
              helperText={errors.primaryRepresentative?.phone}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography fontSize={14} mb={0.5}>
              Primary Representative Email <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              value={form.primaryRepresentative.email}
              onChange={(e) => handleChange(e, "primaryRepresentative", "email")}
              size="small"
              placeholder="Enter email"
              sx={{ width: "350px" }}
              error={!!errors.primaryRepresentative?.email}
              helperText={errors.primaryRepresentative?.email}
            />
          </Grid>

          {/* Secondary Representative */}
          <Grid item xs={6}>
            <Typography fontSize={14} mb={0.5}>
              Secondary Representative Name
            </Typography>
            <TextField
              value={form.secondaryRepresentative.name}
              onChange={(e) => handleChange(e, "secondaryRepresentative", "name")}
              size="small"
              placeholder="Enter name"
              sx={{ width: "350px" }}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography fontSize={14} mb={0.5}>
              Secondary Representative Phone
            </Typography>
            <TextField
              value={form.secondaryRepresentative.phone}
              onChange={(e) => handleChange(e, "secondaryRepresentative", "phone")}
              size="small"
              placeholder="Enter phone"
              sx={{ width: "350px" }}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography fontSize={14} mb={0.5}>
              Secondary Representative Email
            </Typography>
            <TextField
              value={form.secondaryRepresentative.email}
              onChange={(e) => handleChange(e, "secondaryRepresentative", "email")}
              size="small"
              placeholder="Enter email"
              sx={{ width: "350px" }}
            />
          </Grid>

          {/* Tertiary Representative */}
          <Grid item xs={6}>
            <Typography fontSize={14} mb={0.5}>
              Tertiary Representative Name
            </Typography>
            <TextField
              value={form.tertiaryRepresentative.name}
              onChange={(e) => handleChange(e, "tertiaryRepresentative", "name")}
              size="small"
              placeholder="Enter name"
              sx={{ width: "350px" }}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography fontSize={14} mb={0.5}>
              Tertiary Representative Phone
            </Typography>
            <TextField
              value={form.tertiaryRepresentative.phone}
              onChange={(e) => handleChange(e, "tertiaryRepresentative", "phone")}
              size="small"
              placeholder="Enter phone"
              sx={{ width: "350px" }}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography fontSize={14} mb={0.5}>
              Tertiary Representative Email
            </Typography>
            <TextField
              value={form.tertiaryRepresentative.email}
              onChange={(e) => handleChange(e, "tertiaryRepresentative", "email")}
              size="small"
              placeholder="Enter email"
              sx={{ width: "350px" }}
            />
          </Grid>
        </Grid>

        {/* Buttons */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4, gap: 2 }}>
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{ borderRadius: "20px", borderColor: "#7B5FFF", color: "#7B5FFF" }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            sx={{ bgcolor: "#7B5FFF", borderRadius: "20px", px: 4 }}
            onClick={handleCreate}
          >
            Create
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}