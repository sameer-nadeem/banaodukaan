import { useEffect } from "react";
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
    <>
      {/* <div class="cartsy-page-title image">
        <div class="cartsy-page-thumb-area">
          <img src="https://d1rn6kzjmi8824.cloudfront.net/wp-content/uploads/sites/4/2020/09/01125810/my-account.jpg" alt="Shop" />
        </div>

        <div class="cartsy-page-title-content">
          <span>explore</span>
          <h1>My account</h1>
        </div>
      </div> */}
      <div className="row mb-5">
        <div className="col">
          <LoginForm />
        </div>
        <div className="col">
          <RegisterForm></RegisterForm>
        </div>
      </div>
    </>
  )

}
