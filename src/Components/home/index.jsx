import { Link, useNavigate } from "react-router-dom";
import "./home.css";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="wrapper">
      <h3>Fyn mobility Assignment Demo</h3>
      <div className="btn-wrapper">
        <div onClick={() => navigate("/list")} className="btn">
          Sortable List Demo
        </div>
        <div onClick={() => navigate("/gallery")} className="btn">
          Infinite Scroll gallery Demo
        </div>
      </div>
    </div>
  );
};

export default HomePage;
