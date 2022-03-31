import { Card } from "@material-ui/core";
import ProductsTable from "../components/Tables/ProductsTable";

const Inventory = () => {
  return (
    <div style={{ width: "100%" }}>
      <Card
        style={{ height: "100%", marginTop: 100, backgroundColor: "#3B8AC4" }}
      >
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1, justifyContent: "flex-start", padding: 20 }}>
            <h1 style={{ fontSize: 26, fontWeight: "bold", color: "#FFFFFF" }}>
              Inventory
            </h1>
          </div>
        </div>
        <ProductsTable />
      </Card>
    </div>
  );
};

export default Inventory;
