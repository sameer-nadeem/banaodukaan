import { Card, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import ProductsTable from "../components/Tables/ProductsTable";

const Products = () => {
  return (
    <div style={{ width: "100%" }}>
      <Card style={{ height: "100%" }}>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1, justifyContent: "flex-start", padding: 20 }}>
            <h1 style={{ fontSize: 24 }}>Products</h1>
          </div>
          <div style={{ justifyContent: "flex-end", padding: 20 }}>
            <Link to="/admin/products/new">
              <Button
                variant="outlined"
                style={{ backgroundColor: "#3B8AC4", color: "#FFFFFF" }}
              >
                Add Product
              </Button>
            </Link>
          </div>
        </div>
        <ProductsTable />
      </Card>
    </div>
  );
};
export default Products;
