import { Card, Button } from "@material-ui/core";
import CollectionsTable from "../components/Tables/CollectionsTable";
import { Link } from "react-router-dom";

const Collections = () => {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Card style={{ height: "100%" }}>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1, justifyContent: "flex-start", padding: 20 }}>
            <h1 style={{ fontSize: 24 }}>Collections</h1>
          </div>
          <div style={{ justifyContent: "flex-end", padding: 20 }}>
            <Link to="/admin/collections/new">
              <Button
                variant="outlined"
                style={{ backgroundColor: "#12824C", color: "#FFFFFF" }}
              >
                Create Collections
              </Button>
            </Link>
          </div>
        </div>
        <div style={{ padding: "2%" }}>
          <CollectionsTable />
        </div>
      </Card>
    </div>
  );
};
export default Collections;
