import { Card, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import CustomersTable from "../components/Tables/CustomersTable";

const Customers = () => {
    return (
        <div style={{ width: "100%" }}>
          <Card style={{ height: "100%", marginTop: 100, backgroundColor: '#3B8AC4' }}>
            <div style={{ display: "flex" }}>
              <div style={{ flex: 1, justifyContent: "flex-start", padding: 20 }}>
                <h1 style={{fontSize: 26, fontWeight: 'bold', color: '#FFFFFF'}}>Customers</h1>
              </div>
              <div style={{ justifyContent: "flex-end", padding: 20 }}>
                <Link to="/admin/customers/new">
                  <Button
                    variant="outlined"
                    style={{ backgroundColor: "#296089", color: "#FFFFFF", boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)', fontWeight: 500 }}
                  >
                    Add Customer
                  </Button>
                </Link>
              </div>
            </div>
            <CustomersTable/>
          </Card>
        </div>
      );
};

export default Customers;