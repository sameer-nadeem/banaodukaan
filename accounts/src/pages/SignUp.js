import { Card } from "@material-ui/core";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SignUpForm from '../components/Forms/SignUpForm';

const SignUp = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const navigate = useNavigate()
    useEffect(() => {
        if (isAuthenticated) navigate('/my-stores')
    }, [isAuthenticated, navigate])
    return (
        <div style={{
            width: "100%",
            padding: 70,
        }}>
            <Card style={{ height: "100%", width: 520 }}>
                <div style={{ display: "flex" }}>
                    <div style={{ flex: 1, justifyContent: "flex-start", padding: 20, paddingTop: 80, paddingLeft: 40 }}>
                        <img src={process.env.PUBLIC_URL + "/banaodukaan_logo_text.png"} alt="Logo" width="200" height="50" />
                        <div style={{ paddingTop: 60 }}>
                            <h1 style={{ fontSize: "1.5rem", lineHeight: "1.2em", marginBottom: "0.25rem", fontWeight: 'bold' }}>Create a Banaodukaan ID</h1>
                            <h3 style={{ fontSize: "1rem", fontWeight: 400, margin: 0, lineHeight: "1.5rem", color: '#6d7175' }}>
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
