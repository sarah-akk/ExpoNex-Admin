import MainDash from "./MainDash/MainDash";
import ProfileSection from "./ProfileSection/ProfileSection";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./Home.css";

function Home() {

  return (
    <div className="body">
      <div>
      <SearchBar/>
      <MainDash/>
      </div>
      <div>
      <ProfileSection/>
      </div>
    </div>
  );
}

export default Home;
