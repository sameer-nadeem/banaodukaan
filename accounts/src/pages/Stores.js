import { Card, Button } from "@material-ui/core";
import { Link, useParams } from "react-router-dom";
import StoresTable from "../components/Tables/StoresTable";

const Stores = () => {

  const { id: user_ID } = useParams();
  return (
    <div style = {{width: 600}}>
      <div style = {{height: '100%'}}>
        <Card style = {{height: '100vh'}}>
          <div style={{ display: "flex" }}>
            <div style={{ flex: 1, justifyContent: "flex-start", padding: 20, paddingTop: 80, paddingLeft: 40 }}>
              <img
              width="200"
              height="50"
              src={process.env.PUBLIC_URL + "/banaodukaan_logo_text.png"}
              alt = ""
              />
            </div>
            <div style = {{justifyContent: 'flex-end', paddingTop: 80, paddingRight: 40 }}>
              <h1>
                {/* here comes the component for the profile blabla */}
              </h1>
            </div>
          </div>
          <div style = {{ display: 'flex', paddingTop: 40}}>
            <div style = {{flex: 1, justifyContent: 'flex-start', paddingLeft: 40}}>
              <h1
                style={{
                  fontSize: "1.8rem",
                  fontWeight: "600",
                }}
              >
                My Stores
              </h1>
            </div>
            <div style={{ justifyContent: "flex-end", paddingRight: 40 }}>
             <Link to="/my-stores/new/" state = {{userID: user_ID}}>
               <Button
                 variant="outlined"
                 style={{ backgroundColor: "#3B8AC4", color: "#FFFFFF" }}
               >
                Create a Store
               </Button>
             </Link>
            </div>
          </div>
          <hr style = {{margin: 45, color: '#6d7175'}} />
          <StoresTable />
        </Card>
      </div>
    </div>
  );
};
export default Stores;
