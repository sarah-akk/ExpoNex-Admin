import { Outlet } from "react-router-dom";
import "./dashboard.css";
import LeftSide from "../Home/LeftSide/LeftSide";
import SearchBar from "../../components/SearchBar/SearchBar";
import MainDash from "../Home/MainDash/MainDash";
import ProfileSection from "../Home/ProfileSection/ProfileSection";

const Dashboard = () => {
  return (
    <>
    <div className="AppGlass">
     <LeftSide/>
     <div>
     <Outlet />
     </div>
      </div>
    </>
  );
};

export default Dashboard;
