import { Card, Button } from "@material-ui/core";
import { Link, useParams } from "react-router-dom";
import StoresTable from "../components/Tables/StoresTable";

const Stores = () => {

  const { id: user_ID } = useParams();
  return (
    <div style={{ width: "100%" }}>
      <Card style={{ height: "100%" }}>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1, justifyContent: "flex-start", padding: 20 }}>
            <h1 style={{ fontSize: 24 }}>My Stores</h1>
          </div>
          <div style={{ justifyContent: "flex-end", padding: 20 }}>
            <Link to="/my-stores/new/" state = {{userID: user_ID}}>
              <Button
                variant="outlined"
                style={{ backgroundColor: "#12824C", color: "#FFFFFF" }}
              >
                Add Store
              </Button>
            </Link>
          </div>
        </div>
        <StoresTable />
      </Card>
    </div>
  );
};
export default Stores;
