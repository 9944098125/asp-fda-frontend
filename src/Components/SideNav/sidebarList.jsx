// customer items ==> Home, Orders, Restaurants
// restaurant owner items ==> Home, Create Restaurant, Create Food Item
// Logout in both the perspectives
import HomeIcon from "@mui/icons-material/Home";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LunchDiningIcon from "@mui/icons-material/LunchDining";

export const customerItems = [
  {
    icon: <HomeIcon />,
    text: "Home",
    link: "/",
  },
  {
    icon: <RestaurantIcon />,
    text: "Restaurants",
    link: "/restaurants",
  },
];

export const restaurantOwnerItems = [
  {
    icon: <HomeIcon />,
    text: "Home",
    link: "/",
  },
  {
    icon: <AddCircleOutlineIcon />,
    text: "Create Restaurant",
    link: "/createRestaurant",
  },
  {
    icon: <LunchDiningIcon />,
    text: "Add Food Item",
    link: "/add-foodItem",
  },
];
