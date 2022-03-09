import { useEffect } from "react";
import { useSelector } from "react-redux";
import ProfileForm from "../../components/Forms/ProfileForm";
import PasswordForm from "../../components/Forms/PasswordForm";
import { useRouter } from "next/router";
import styles from "../../styles/Login.module.css";

export default function Profile() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const router = useRouter();
  useEffect(() => {
    if (!isAuth) router.push("/");
  }, [isAuth]);

  return (
    <>
        {/* <link
          rel="stylesheet"
          id="cartsy-main-style-css"
          href="https://t5f2p5h8.stackpathcdn.com/wp-content/themes/cartsy/dist/cartsy-main-style.css?ver=1.8.3-b-modified-1643447084"
          type="text/css"
          media="all"
        /> */}
      {/* <div class="cartsy-page-title image">
        <div class="cartsy-page-thumb-area">
          <img
            src="https://d1rn6kzjmi8824.cloudfront.net/wp-content/uploads/sites/4/2020/09/01125810/my-account.jpg"
            alt="Shop"
          />
        </div>
        <div class="cartsy-page-title-content">
          <span>Profile</span>
          <h1>My account</h1>
        </div>
      </div> */}
      <div className="row">
        <div className="col">
          <ProfileForm />
        </div>
        <div className="col">
          <PasswordForm />
        </div>
      </div>
    </>
  );
}
