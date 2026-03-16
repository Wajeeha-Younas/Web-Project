    import { useEffect, useState } from "react";
    import { useParams } from "react-router-dom";
    import {
    Box,
    Typography,
    Paper,
    Grid,
    Avatar,
    Button,
    Select,
    MenuItem
    } from "@mui/material";

    import { getBrandById, updateBrand } from "../services/brandService";
    import { useNavigate } from "react-router-dom";

    export default function BrandDetails() {

    const { id } = useParams();

    const [brand, setBrand] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState("");
    const [imageFile, setImageFile] = useState(null);
     
    const navigate = useNavigate();
        const fetchBrand = async () => {
            try {
              const res = await getBrandById(id);
              setBrand(res.data);
              setStatus(res.data.status);
            } catch (error) {
              console.error("Error fetching brand:", error);
            }
          };

          useEffect(() => {
            fetchBrand();
          }, [id]);


          const handleSave = async () => {
            try {
          
              const formData = new FormData();
              formData.append("status", status);
          
              if (imageFile) {
                formData.append("brandProfileImage", imageFile);
              }
          
              await updateBrand(id, formData);
          
              setEditMode(false);
              setImageFile(null);
          
              navigate("/dashboard"); 
          
            } catch (error) {
              console.error("Update failed:", error);
            }
          };





    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleImageUpload = async () => {

        try {

        const formData = new FormData();
        formData.append("brandProfileImage", imageFile);

        await updateBrand(id, formData);

        setImageFile(null);
        fetchBrand();

        } catch (error) {
        console.error("Image upload failed:", error);
        }
    };

    const handleStatusUpdate = async (newStatus) => {
        try {
        await updateBrand(id, { status: newStatus });
        setStatus(newStatus);  
        
        setEditMode(false);    
        fetchBrand();        
        } catch (error) {
        console.error("Status update failed:", error);
        }
    };

    if (!brand) {
        return (
        <Box p={3}>
            <Typography>Loading brand details...</Typography>
        </Box>
        );
    }
    return (
    <Box sx={{ background: "#F6F6F9", minHeight: "100vh", p: 3 }}>


        <Box display="flex" alignItems="center" mb={2}>
        <Typography fontSize={14} color="gray">
            Brand /
        </Typography>

        <Typography fontSize={14} ml={1} fontWeight={500}>
            {brand.brandName}
        </Typography>
        </Box>

        <Typography fontSize={12} color="gray" mb={2}>
        View Details
        </Typography>

    
        <Paper sx={{ p: 4, borderRadius: 3 }}>

        <Box display="flex" justifyContent="space-between" mb={3}>
            <Typography fontSize={18} fontWeight={600}>
            {brand.brandName}
            </Typography>

            <Button
variant="contained"
sx={{
  bgcolor: "#7B5FFF",
  borderRadius: "20px",
  textTransform: "none",
  px: 3,
}}
onClick={() => {
  if (editMode) {
    handleSave(); 
  } else {
    setEditMode(true); 
  }
}}
>
{editMode ? "Save" : "Edit"}
</Button>
        </Box>

        <Typography fontWeight={600} mb={2}>
            Details
        </Typography>

        <Grid container spacing={4}>

            <Grid item xs={12} md={4}>
            <Paper
                variant="outlined"
                sx={{
                p: 3,
                borderRadius: 2
                }}
            >
              <Box display="flex" justifyContent="space-between">
  <Typography fontSize={14}>
    Brand Profile Image
  </Typography>

  {imageFile ? (
    <Button
      size="small"
      variant="contained"
      sx={{
        bgcolor: "#7B5FFF",
        borderRadius: "20px",
        textTransform: "none",
        ml: 9
      }}
      onClick={handleImageUpload}
    >
      Save
    </Button>
  ) : (
    <Button
      size="small"
      variant="contained"
      component="label"
      sx={{
        bgcolor: "#7B5FFF",
        borderRadius: "20px",
        textTransform: "none",
        ml: 9
      }}
    >
      Edit
      <input hidden type="file" onChange={handleImageChange} />
    </Button>
  )}
</Box>

<Avatar
  src={
    imageFile
      ? URL.createObjectURL(imageFile)
      : `http://localhost:5000/${brand.brandProfileImage}`
  }
  sx={{ width: 150, height: 150 }}
/>

              
            </Paper>
            </Grid>
    </Grid>
            {/* Right Details Section */}
            <Grid item xs={12} md={8} sx={{ mt: 4 }}> 
            <Grid container spacing={15}>

                <Grid item xs={4} >
                <Typography fontSize={12} color="gray">Brand Name</Typography>
                <Typography>{brand.brandName}</Typography>
                </Grid>

                <Grid item xs={4}>
                <Typography fontSize={12} color="gray">Address Line 1</Typography>
                <Typography>{brand.addressLine1}</Typography>
                </Grid>

                <Grid item xs={4}>
                <Typography fontSize={12} color="gray">Address Line 2</Typography>
                <Typography>{brand.addressLine2}</Typography>
                </Grid>

                <Grid item xs={4}>
                <Typography fontSize={12} color="gray">City</Typography>
                <Typography>{brand.city}</Typography>
                </Grid>

                <Grid item xs={4}>
                <Typography fontSize={12} color="gray">State</Typography>
                <Typography>{brand.state}</Typography>
                </Grid>

                <Grid item xs={4}>
                <Typography fontSize={12} color="gray">Zip Code</Typography>
                <Typography>{brand.zipCode}</Typography>
                </Grid>

                <Grid item xs={4}>
                <Typography fontSize={12} color="gray">Country</Typography>
                <Typography>{brand.country}</Typography>
                </Grid>

                <Grid item xs={4}>
                <Typography fontSize={12} color="gray">Email Address</Typography>
                <Typography>{brand.emailAddress}</Typography>
                </Grid>

                <Grid item xs={4}>
                <Typography fontSize={12} color="gray">Website</Typography>
                <Typography color="#7B5FFF">{brand.website}</Typography>
                </Grid>

                <Grid item xs={4}>
                <Typography fontSize={12} color="gray">Industry</Typography>
                <Typography>{brand.industry || "-"}</Typography>
                </Grid>

                <Grid item xs={4}>
                <Typography fontSize={12} color="gray">Low Price Range</Typography>
                <Typography>{brand.lowPriceRange || "-"}</Typography>
                </Grid>

                <Grid item xs={4}>
                <Typography fontSize={12} color="gray">High Price Range</Typography>
                <Typography>{brand.highPrice || "-"}</Typography>
                </Grid>

                <Grid item xs={4}>
                <Typography fontSize={12} color="gray">Social Links</Typography>
                <Typography>{brand.socialLink || "-"}</Typography>
                </Grid>

                <Grid item xs={4}>
                <Typography fontSize={12} color="gray">New User Sign Ups</Typography>
                <Typography>{brand.newUserSignUps || 0}</Typography>
                </Grid>
            
                <Grid item xs={4}>
                <Typography fontSize={12} color="gray">Status</Typography>
                <Box display="flex" width="fit-content" borderRadius="50px" overflow="hidden" border="1px solid #D0BFFF">
                <Button
    size="small"
    onClick={() => editMode && setStatus("active")}
    sx={{
        borderRadius: "50px",
        textTransform: "none",
        px: 3,
        bgcolor: status === "active" ? "#7B5FFF" : "#EDE9FE",
        color: status === "active" ? "#fff" : "#7B5FFF",
        "&:hover": {
        bgcolor: status === "active" ? "#7B5FFF" : "#D0BFFF",
        },
        cursor: editMode ? "pointer" : "default",
        
    }}
    >
    Active
    </Button>

    <Button
    size="small"
    onClick={() => editMode && setStatus("inactive")}
    sx={{
        borderRadius: "50px",
        textTransform: "none",
        px: 3,
        bgcolor: status === "inactive" ? "#7B5FFF" : "#EDE9FE",
        color: status === "inactive" ? "#fff" : "#7B5FFF",
        "&:hover": {
        bgcolor: status === "inactive" ? "#7B5FFF" : "#D0BFFF",
        },
        cursor: editMode ? "pointer" : "default",
    }}
    >
    Inactive
    </Button>
    </Box>
    </Grid>
    </Grid>
    </Grid>
        </Paper>
    </Box>
    );
    }
            