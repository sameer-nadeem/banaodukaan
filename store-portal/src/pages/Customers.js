import { Card, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const Customers = () => {
    return (
        <div style={{ width: "100%" }}>
          <Card style={{ height: "100%" }}>
            <div style={{ display: "flex" }}>
              <div style={{ flex: 1, justifyContent: "flex-start", padding: 20 }}>
                <h1 style={{ fontSize: 24 }}>Customers</h1>
              </div>
              <div style={{ justifyContent: "flex-end", padding: 20 }}>
                <Link to="/admin/customers/new">
                  <Button
                    variant="outlined"
                    style={{ backgroundColor: "#12824C", color: "#FFFFFF" }}
                  >
                    Add Customer
                  </Button>
                </Link>
              </div>
            </div>
            {/* customer table comes here brother */}
          </Card>
        </div>
      );
};

export default Customers;