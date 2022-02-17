import { useEffect } from "react";
import styles from "../../styles/Login.module.css";
import { useSelector } from 'react-redux'
import LoginForm from '../../components/Forms/LoginForm'
import RegisterForm from '../../components/Forms/RegisterForm'
import { useRouter } from 'next/router'

export default function Login() {
  const isAuth = useSelector(state => state.auth.isAuthenticated)
  const router = useRouter()
  useEffect(() => {
    if (isAuth) router.push('/')
  }, [isAuth])

  return (
    <div className>
      <div>
        <div className="cartsy-page-thumb-area">
          <img
            className={styles.img}
            src="https://d1rn6kzjmi8824.cloudfront.net/wp-content/uploads/sites/4/2020/09/01125810/my-account.jpg"
            alt="Shop"
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <LoginForm />
        </div>
        <div className="col">
          <RegisterForm></RegisterForm>
        </div>
      </div>
    </div>
  )
}
