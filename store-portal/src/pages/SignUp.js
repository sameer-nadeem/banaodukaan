import { Card } from "@material-ui/core";
import logo from '../Logo/banaodukaan_logo_text.png'
import SignUpForm from '../components/Forms/SignUpForm';

const SignUp = () => {
    return (
        <div style={{ width: "100%" }}>
            <Card style={{ height: "100%", width: 520 }}>
                <div style={{ display: "flex" }}>
                    <div style={{ flex: 1, justifyContent: "flex-start", padding: 20, paddingTop: 80, paddingLeft: 40 }}>
                        <img src={logo} alt="Logo" width= "200" height= "50"/>
                        <div style = {{paddingTop: 60}}>
                            <h1 style={{ fontSize: "1.5rem", lineHeight: "1.2em", marginBottom: "0.25rem", fontWeight: 'bold'}}>Create a Banaodukaan ID</h1>
                            <h3 style = {{fontSize: "1rem", fontWeight: 400, margin: 0, lineHeight: "1.5rem", color: '#6d7175'}}>
                            The ecommerce platform made for you
                            </h3>
                            {/* SignUp Form here -- Component -> inside components/Forms */}
                            <SignUpForm />
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default SignUp;