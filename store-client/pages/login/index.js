import styles from "../../styles/Login.module.css";

export default function Login() {
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
          <div className="card">
            <div className={styles.cardInside}>
              <h2 className={styles.h2}>Login</h2>
              <form classname={styles.form}>
                <div classname={styles.p}>
                  <label for="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    name = 'emailLogin'
                  />
                  <div id="emailHelp" className="form-text">
                    We'll never share your email with anyone else.
                  </div>
                </div>
                <div className="mb-3">
                  <label for="password" className="form-label mt-3">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    name = 'passwordLogin'
                  />
                </div>
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                  />
                  <label className="form-check-label" for="exampleCheck1">
                    Remember me
                  </label>
                </div>
                <button className={styles.login} type="submit">
                  Login
                </button>

                <p className="woocommerce-LostPassword lost_password">
                  <a href="https://cartsy.redq.io/furniture/my-account/lost-password/">
                    Lost your password?
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card">
            <div className={styles.cardInside}>
              <h2 className={styles.h2}>Register</h2>
              <form classname={styles.form}>
                <div classname={styles.p}>
                    <div className="col">
                      <label className="form-label">Full Name</label>
                      <input type="text" 
                      className="form-control"
                      name = 'fullName'></input>
                    </div>

                    
                
                  <label for="exampleInputEmail1" className="form-label mt-3">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    
                    aria-describedby="emailHelp"
                    name = 'emailRegister'
                  />

                  <div id="emailHelp" className="form-text"></div>

                  <div className="mb-3">
                    <label for="password" className="form-label mt-3">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      
                      name = 'passwordRegister'
                    />
                  </div>

                  <div className="mb-3">
                    <label for="password" className="form-label mt-3">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      name = 'passwordRegister2'
                    />
                  </div>
                </div>
                <div className="mt-3" style={{ marginTop: "10%" }}></div>
                <button className={styles.login} type="submit">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
