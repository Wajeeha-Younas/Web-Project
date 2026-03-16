import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Typography,
    Box,
    TextField
  } from "@mui/material";
  import CloseIcon from "@mui/icons-material/Close";
  import { useState, useEffect } from "react";
  import { getBrands } from "../services/brandService";
  import {
    getSponsoredBrands,
    addSponsoredBrands,
    removeSponsoredBrand
  } from "../services/sponsoredBrandService";
  
  export default function SponsoredBrandsDialog({ open, handleClose, refreshSponsored }) {
    const [brands, setBrands] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
  
          const allBrands = await getBrands();
          setBrands(allBrands.data || []);
  
          const sponsored = await getSponsoredBrands();
          const sponsoredIds = sponsored.data.map((b) => b.brand);
          setSelectedBrands(sponsoredIds);
  
        } catch (error) {
          console.error("Failed to fetch brands:", error.message);
        } finally {
          setLoading(false);
        }
      };
  
      if (open) fetchData();
    }, [open]);
  
    const addBrandToSelection = (brand) => {
      if (selectedBrands.length >= 8) return;
  
      if (!selectedBrands.includes(brand._id)) {
        setSelectedBrands([...selectedBrands, brand._id]);
      }
    };
  
    const removeBrandFromSelection = async (brandId) => {
      try {
        const sponsored = await getSponsoredBrands();
        const doc = sponsored.data.find((b) => b.brand === brandId);
  
        if (doc) await removeSponsoredBrand(doc._id);
  
        setSelectedBrands(selectedBrands.filter((id) => id !== brandId));
      } catch (error) {
        console.error("Failed to remove brand:", error.message);
      }
    };
  
    const filteredBrands = brands.filter(
      (b) =>
        !selectedBrands.includes(b._id) &&
        b.brandName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    const handleSave = async () => {
      try {
        if (selectedBrands.length === 0) return;
  
        await addSponsoredBrands(selectedBrands);
  
       // alert("Sponsored brands saved successfully!");
       refreshSponsored(); 
        handleClose();
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    };
  
    return (
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
          Add Sponsored Brands
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
  
        <DialogContent>
  
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography fontWeight="bold">Sponsored Brands</Typography>
  
            <Typography sx={{ color: "purple" }}>
              {selectedBrands.length}/8 Brands selected
            </Typography>
          </Box>
  
          {/* Selected Brands */}
  
          <List>
            {selectedBrands.map((id) => {
              const brand = brands.find((b) => b._id === id);
  
              return (
                <ListItem
                  key={id}
                  secondaryAction={
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => removeBrandFromSelection(id)}
                      sx={{ bgcolor: "purple", color: "white", borderRadius: "16px" }}
                    >
                      Remove
                    </Button>
                  }
                >
                  <ListItemText primary={brand?.brandName || id} />
                </ListItem>
              );
            })}
          </List>
  
          <TextField
            fullWidth
            placeholder="Search"
            size="small"
            sx={{ mt: 2 }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
  
          {/* Available Brands */}
  
          <List>
            {filteredBrands.map((brand) => (
              <ListItem
                key={brand._id}
                secondaryAction={
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => addBrandToSelection(brand)}
                    sx={{ bgcolor: "purple", color: "white", borderRadius: "16px" }}
                  >
                    Add
                  </Button>
                }
              >
                <ListItemText primary={brand.brandName} />
              </ListItem>
            ))}
          </List>
  
          {filteredBrands.length === 0 && !loading && (
            <Typography align="center" mt={3}>
              No brands available
            </Typography>
          )}
  
          {loading && (
            <Typography align="center" mt={3}>
              Loading brands...
            </Typography>
          )}
  
        </DialogContent>
  
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: "purple" }}>
            Cancel
          </Button>
  
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={selectedBrands.length === 0}
            sx={{ bgcolor: "purple", color: "white", borderRadius: "16px" }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }