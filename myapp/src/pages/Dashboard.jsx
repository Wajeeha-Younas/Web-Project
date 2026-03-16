  import Box from "@mui/material/Box";
  import Drawer from "@mui/material/Drawer";
  import CssBaseline from "@mui/material/CssBaseline";
  import AppBar from "@mui/material/AppBar";
  import Toolbar from "@mui/material/Toolbar";
  import List from "@mui/material/List";
  import Typography from "@mui/material/Typography";
  import Divider from "@mui/material/Divider";
  import ListItem from "@mui/material/ListItem";
  import ListItemButton from "@mui/material/ListItemButton";
  import ListItemIcon from "@mui/material/ListItemIcon";
  import ListItemText from "@mui/material/ListItemText";
  import Button from "@mui/material/Button";
  import IconButton from "@mui/material/IconButton";
  import MenuIcon from "@mui/icons-material/Menu";

  import FingerprintIcon from "@mui/icons-material/Fingerprint";
  import GroupIcon from "@mui/icons-material/Group";
  import SettingsIcon from "@mui/icons-material/Settings";
  import BuildIcon from "@mui/icons-material/Build";
  import ImageIcon from "@mui/icons-material/Image";

  import { useState } from "react";
  import FormControl from "@mui/material/FormControl";
  import Select from "@mui/material/Select";
  import MenuItem from "@mui/material/MenuItem";
  import TextField from "@mui/material/TextField";

  import Table from "@mui/material/Table";
  import TableBody from "@mui/material/TableBody";
  import TableCell from "@mui/material/TableCell";
  import TableContainer from "@mui/material/TableContainer";
  import TableHead from "@mui/material/TableHead";
  import TableRow from "@mui/material/TableRow";
  import Paper from "@mui/material/Paper";
  import NorthIcon from '@mui/icons-material/North';
  import SouthIcon from '@mui/icons-material/South';
  import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
  import ChevronRightIcon from "@mui/icons-material/ChevronRight";
  import logo from "../assets/react.svg";
  import CreateBrand from "../components/createBrand";
  import { useEffect} from "react";
  import { getBrands } from "../services/brandService";
  import FreebieBrandsDialog from "../components/FreebieBrandDialog";
  import SponsoredBrandsDialog from "../components/SponsoredBrandDialog";
  import { getSponsoredBrands } from "../services/sponsoredBrandService";
import { getFreebieBrands } from "../services/freebieBrandService";
import { useNavigate } from "react-router-dom";

  const drawerWidth = 240;

  const menuItems = [
    { label: "Brands", icon: <FingerprintIcon /> },
    { label: "Content Creators", icon: <GroupIcon /> },
    { label: "Campagins", icon: <ImageIcon /> },
    { label: "Admin Team", icon: <BuildIcon /> },
    { label: "System Settings", icon: <SettingsIcon /> },
  ];

  const columns = [
    { label: "Brand Name", field: "brandName" },
    { label: "Email Address", field: "emailAddress" },
    { label: <>Primary Representative <br />Phone Number</>, field: "primaryRepresentative.phone" },
    { label: "Primary Representative", field: "primaryRepresentative.name" },
    { label: "Website", field: "website" },
    { label: "New User Sign Ups", field: "newUserSignUps" },
    { label: "Review Status", field: "reviewStatus" },
  ];

  //   {
  //     brandName: "Brand A",
  //     emailAddress: "brandA@example.com",
  //     primaryRepresentativePhoneNumber: "+1-555-1234",
  //     primaryRepresentative: "Wajeeha",
  //     website: "www.brandA.com",
  //     newUserSignUps: 120,
  //     reviewStatus: "Approved",
  //   },
  //   {
  //     brandName: "Brand B",
  //     emailAddress: "brandB@example.com",
  //     primaryRepresentativePhoneNumber: "+1-555-5678",
  //     primaryRepresentative: "Fatima",
  //     website: "www.brandB.com",
  //     newUserSignUps: 75,
  //     reviewStatus: "Approved",
  //   },
  //   {
  //     brandName: "Brand C",
  //     emailAddress: "brandC@example.com",
  //     primaryRepresentativePhoneNumber: "+1-555-9012",
  //     primaryRepresentative: "Aizal",
  //     website: "www.brandC.com",
  //     newUserSignUps: 200,
  //     reviewStatus: "Approved",
  //   },
  // ];

  export default function Dashboard() {
    const [activeTab, setActiveTab] = useState("All");
  //  const [page, setPage] = useState(1);
    const [openBrandModal, setOpenBrandModal] = useState(false);
    const [brands, setBrands] = useState([]);
    const [openSponsoredModal, setOpenSponsoredModal] = useState(false);

    const [sponsoredBrands, setSponsoredBrands] = useState([]);
    const [freebieBrands, setFreebieBrands] = useState([]);
  //  const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const handleOpenSponsored = () => setOpenSponsoredModal(true);
   const handleCloseSponsored = () => setOpenSponsoredModal(false);
   //const [rowsPerPage, setRowsPerPage] = useState(5);

   const [page, setPage] = useState(1);
   const [rowsPerPage, setRowsPerPage] = useState(5);
   const [searchTerm, setSearchTerm] = useState("");
   const [sortBy, setSortBy] = useState("createdAt");
   const [order, setOrder] = useState("desc");
   const [totalPages, setTotalPages] = useState(1);
   const [total, setTotal] = useState(0);


   const fetchBrands = async () => {
     try {
       const res = await getBrands({
         page,
         limit: rowsPerPage,
         search: searchTerm,
         sortBy,
         order,
       });
   
       setBrands(res.data);        
       setTotalPages(res.totalPages);
       setTotal(res.total);
   
     } catch (error) {
       console.error("Error fetching brands:", error);
     }
   };


  useEffect(() => {
    fetchBrands();
  }, [page, rowsPerPage, searchTerm, sortBy, order]);


      const fetchSponsoredBrands = async () => {
        try {
          const res = await getSponsoredBrands();
          setSponsoredBrands(res.data || []);
        } catch (error) {
          console.error("Error fetching sponsored brands:", error);
        }
      };
      
      const fetchFreebieBrands = async () => {
        try {
          const res = await getFreebieBrands();
          setFreebieBrands(res.data || []);
        } catch (error) {
          console.error("Error fetching freebie brands:", error);
        }
      };
      
   useEffect(() => {
   fetchSponsoredBrands();
   fetchFreebieBrands();
}, []);


      const handleOpenBrand = () => {
        setOpenBrandModal(true);
      };
      
      const handleCloseBrand = () => {
        setOpenBrandModal(false);
      };


      const [openFreebieModal, setOpenFreebieModal] = useState(false);

      const handleOpenFreebie = () => {
        setOpenFreebieModal(true);
      };
      
      const handleCloseFreebie = () => {
        setOpenFreebieModal(false);
      };


    return (
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

    
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            bgcolor: "#7B5FFF",
            ml: `${drawerWidth}px`,
          }}
        >
          <Toolbar>
            <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>

            <Typography sx={{ flexGrow: 1 }} />

            <Button color="inherit">Tahir Zahid</Button>
          </Toolbar>
        </AppBar>

  
        <Drawer
    variant="permanent"
    anchor="left"
    sx={{
      width: drawerWidth,
      flexShrink: 0,
      "& .MuiDrawer-paper": {
        width: drawerWidth,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
      },
    }}
  >
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        p: 2,
        justifyContent: "center",
      }}
    >
      <img src={logo} alt="Logo" style={{ width: 40, height: 40 }} />
      <Typography variant="h6">Trenzy</Typography>
    </Box>
  
    <Divider />
  
    <List>
      {menuItems.map((item) => (
        <ListItem key={item.label} disablePadding>
          <ListItemButton
            sx={{
              color: "#555",
              "&:hover": {
                bgcolor: "#f3e8ff",
                color: "#7B5FFF",
              },
            }}
          >
            <ListItemIcon sx={{ color: "#555" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  

    <Box sx={{ mt: "auto", p: 2, textAlign: "center" }}>
      <Typography variant="caption" color="text.secondary">
        Privacy Policy | Terms & Conditions
      </Typography>
    </Box>
  </Drawer>


        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: "background.default",
            p: 3,
            width: `calc(100% - ${drawerWidth}px)`,
          }}
        >
          <Toolbar />

    
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold">
              Brand Users
            </Typography>

            <Typography variant="subtitle1" color="text.secondary">
              Brands / Brand Users
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <FormControl sx={{ minWidth: 250 }}>
          <Select
  size="small"
  value={rowsPerPage}
  onChange={(e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }}
>
    <MenuItem value={5}>Show 5</MenuItem>
    <MenuItem value={10}>Show 10</MenuItem>
    <MenuItem value={20}>Show 20</MenuItem>
    <MenuItem value={50}>Show 50</MenuItem>
  </Select>
</FormControl>

<TextField
  size="small"
  placeholder="Search Brands"
  value={searchTerm}
  onChange={(e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  }}
  sx={{ ml: 3, width: 450 }}
/>

            <Box sx={{ ml: "auto", display: "flex", gap: 2 }}>
            <Button
  variant="outlined"
  onClick={handleOpenFreebie}
  sx={{
    borderRadius: "20px",
    width: 250,
    height: 35,
    color: "purple",
    fontSize: "10px",
    borderColor: "purple",
  }}
>
  Add Freebie Sponsored Brand
</Button>

<Button
  variant="outlined"
  onClick={handleOpenSponsored}
  sx={{
    borderRadius: "20px",
    width: 200,
    height: 35,
    color: "purple",
    fontSize: "10px",
    borderColor: "purple",
  }}
>
  Add Sponsored Brand
</Button>
              <Button
            variant="outlined"
            onClick={handleOpenBrand}
            sx={{
              borderRadius: "20px",
              width: 120,
              height: 35,
              color: "purple",
              fontSize: "10px",
              borderColor: "purple",
            }}
          >
            Add Brand
          </Button>
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: 17, mt: 3 }}>
    {["Active", "Inactive", "Sponsored Brands", "Freebie Sponsored Brands"].map(
      (item) => (
        <Typography
          key={item}
          onClick={() => setActiveTab(item)}
          sx={{
            cursor: "pointer",
            fontWeight: 800,
            color: activeTab === item ? "#7B5FFF" : "#555",
            borderBottom: activeTab === item ? "2px solid #7B5FFF" : "none",
            pb: 1,
          }}
        >
          {item}
        </Typography>
      )
    )}
  </Box>

          <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table>
            
            <TableHead>
            <TableRow>
  {columns.map((col) => (
    <TableCell
      key={col.field}
      sx={{
        fontWeight: "bold",
        cursor: "pointer",
        bgcolor: "#f5f5f5",
      }}
      onClick={() => {
        if (sortBy === col.field) {
          setOrder(order === "asc" ? "desc" : "asc");
        } else {
          setSortBy(col.field);
          setOrder("asc");
        }
        setPage(1);
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 0 }}>
        {col.label}
        <Box sx={{ display: "flex", flexDirection: "column", ml: 2 }}>
       
        <NorthIcon
    sx={{
      fontSize: 10,
      color: sortBy === col.field && order === "asc" ? "#7B5FFF" : "#333", 
      ml: 0.5,
    }}
  />
  <SouthIcon
    sx={{
      fontSize: 10,
      color: sortBy === col.field && order === "desc" ? "#7B5FFF" : "#333", 
    }}
  />
        </Box>
      </Box>
    </TableCell>
  ))}
</TableRow>
</TableHead>

<TableBody>
  {brands
    .filter((brand) => {
      if (activeTab === "Active") return brand.status === "active";
      if (activeTab === "Inactive") return brand.status === "inactive";
      if (activeTab === "Sponsored Brands") {
        return sponsoredBrands.some((b) => b.brand === brand._id);
      }
      if (activeTab === "Freebie Sponsored Brands") {
        return freebieBrands.some((b) => b.brand === brand._id);
      }
      return true; 
    })
    .map((row) => (
      <TableRow
        key={row._id}
        hover
        sx={{ cursor: "pointer" }}
        onClick={() => navigate(`/brands/${row._id}`)}
      >
        <TableCell>{row.brandName}</TableCell>
        <TableCell>{row.emailAddress}</TableCell>
        <TableCell>{row.primaryRepresentative?.phone}</TableCell>
        <TableCell>{row.primaryRepresentative?.name}</TableCell>
        <TableCell sx={{ color: "#7B5FFF" }}>{row.website}</TableCell>
        <TableCell>{row.newUserSignUps}</TableCell>
        <TableCell>
          <Box
            sx={{
              px: 0.7,
              py: 0.5,
              borderRadius: "11px",
              bgcolor: "#7B5FFF",
              color: "#fff",
              fontSize: "10px",
              textTransform: "capitalize",
              display: "inline-block",
            }}
          >
            {row.reviewStatus}
          </Box>
        </TableCell>
      </TableRow>
    ))}
</TableBody>
            </Table>
          </TableContainer>

          <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      mt: 2,
    }}
  >

<Typography variant="body2" color="text.secondary">
Showing {brands.length} of {total} results
</Typography>

    <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
      
      <Typography variant="body2">Go to Page : </Typography>

      <TextField
 size="small"
 type="number"
 value={page}
 onChange={(e) => {
   let value = Number(e.target.value);

   if (value < 1) value = 1;
   if (value > totalPages) value = totalPages;

   setPage(value);
 }}
 sx={{ width: 80, mr:3 }}
/>

  
      <IconButton
    sx={{ border: "0.3px solid #ddd", borderRadius: "6px" }}
    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
  >
    <ChevronLeftIcon />
  </IconButton>

  <Box
    sx={{
      border: "1px solid #ddd",
      px: 2,
      py: 1,
      fontWeight: 500,
      bgcolor: "#7B5FFF",  
      color: "#FFFFFF", 
      borderRadius: "6px"
    }}
  >
    {page}
  </Box>

  <IconButton
    sx={{ border: "1px solid #ddd", borderRadius: "6px" }}
    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
  >
    <ChevronRightIcon />
  </IconButton>

    </Box>
  </Box>



        </Box>
        <CreateBrand
    open={openBrandModal}
    handleClose={handleCloseBrand}
    refreshBrands={fetchBrands}
  />
<SponsoredBrandsDialog
  open={openSponsoredModal}
  handleClose={handleCloseSponsored}
  refreshSponsored={fetchSponsoredBrands}
/>

<FreebieBrandsDialog
  open={openFreebieModal}
  handleClose={handleCloseFreebie}
  refreshFreebies={fetchFreebieBrands}
/>

      </Box>

      
    );
  
  }
