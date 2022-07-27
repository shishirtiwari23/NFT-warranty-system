import { MainLayout } from "../../Layouts";
import styles from "./Services.module.scss";
import { Link } from "react-router-dom";
import { Button } from "../../components";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/services/api/manage");
  }, []);
  return (
    <div className={styles.container}>
      <h1>Warranty Card</h1>
      <h3>Get Your Business To Next Level</h3>
      <p>Create a digital Warranty card </p>
      <br />
      <br />
      <Link to="/services/api/manage">
        <Button>Services/api/manage</Button>{" "}
      </Link>
    </div>
  );
};

export default Services;
