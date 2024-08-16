import {
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilBuilding,
  UilSetting,
  UilSignOutAlt,
  UilPackage,
} from "@iconscout/react-unicons";

export const SideBarData = [
  {
    icon: UilEstate,
    heading: "Home",
    link: "/dashboard/Home",
  },
  {
    icon: UilClipboardAlt,
    heading: "Activity",
    link: "/dashboard/Activity",
  },
  {
    icon: UilUsersAlt,
    heading: "Users",
    link: "/dashboard/Users",
  },
  {
    icon: UilClipboardAlt,
    heading: "Categories",
    link: "/dashboard/Categories",
  },
  {
    icon: UilBuilding,
    heading: "Notifications",
    link: "/dashboard/Notifications",
  },
  {
    icon: UilPackage,
    heading: "Products & Orders",
    link: "/dashboard/products",
  },
  {
    icon: UilSetting,
    heading: "Settings",
    link: "/dashboard/settings",
  },
  {
    icon: UilSignOutAlt,
    heading: "Logout",
    link: "/dashboard/logout",
  },
];
