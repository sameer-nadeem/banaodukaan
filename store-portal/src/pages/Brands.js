import { Card, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import BrandsTable from "../components/Tables/BrandsTable";

const Brands = () => {

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Card style={{ height: "100%" , marginTop: 100, backgroundColor: '#3B8AC4'}}>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1, justifyContent: "flex-start", padding: 20 }}>
            <h1 style={{ fontSize: 26, fontWeight: 'bold', color: '#FFFFFF'}}>Brands</h1>
          </div>
          <div style={{ justifyContent: "flex-end", padding: 20 }}>
            <Link to="/admin/brands/new">
              <Button
                variant="outlined"
                style={{ backgroundColor: "#296089", color: "#FFFFFF", boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)', fontWeight: 500   }}
              >
                Create Brands
              </Button>
            </Link>
          </div>
        </div>
        <div>
          <BrandsTable />
        </div>
      </Card>
    </div>
  );
};
export default Brands;
