import { Card, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import BrandsTable from "../components/Tables/BrandsTable";

const Brands = () => {

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Card style={{ height: "100%" }}>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1, justifyContent: "flex-start", padding: 20 }}>
            <h1 style={{ fontSize: 24 }}>Brands</h1>
          </div>
          <div style={{ justifyContent: "flex-end", padding: 20 }}>
            <Link to="/admin/brands/new">
              <Button
                variant="outlined"
                style={{ backgroundColor: "#12824C", color: "#FFFFFF" }}
              >
                Create Brands
              </Button>
            </Link>
          </div>
        </div>
        <div style={{ padding: "2%" }}>
          <BrandsTable />
        </div>
      </Card>
    </div>
  );
};
export default Brands;
