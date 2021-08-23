import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrUpdateUser } from "../../functions/auth";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    let intended = history.location.state;
    if (intended) {
      return;
    } else {
      if (user && user.token) history.push("/");
    }
  }, [user, history]);

  let dispatch = useDispatch();

  const roleBasedRedirect = (res) => {
    // check if intended
    let intended = history.location.state;
    if (intended) {
      history.push(intended.from);
    } else {
      if (res.data.role === "admin") {
        history.push("/admin/dashboard");
      } else {
        history.push("/");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.table(email, password);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      // console.log(result);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              coins: res.data.coins,
              _id: res.data._id,
            },
          });
          roleBasedRedirect(res);
        })
        .catch((err) => console.log(err));

      // history.push("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                coins: res.data.coins,
                _id: res.data._id,
              },
            });
            roleBasedRedirect(res);
          })
          .catch((err) => console.log(err));
        // history.push("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          autoFocus
        />
      </div>

      <div className="form-group">
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
        />
      </div>

      <br />
      <Button
        onClick={handleSubmit}
        type="primary"
        className="mb-3"
        block
        shape="round"
        icon={<MailOutlined />}
        size="large"
        disabled={!email || password.length < 6}
      >
        Login with Email/Password
      </Button>
    </form>
  );

  return (
    <div>
      <div className="container p-5" style = {{marginBottom: "200px"}}>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Login</h4>
          )}
          {loginForm()}

          <Button
            onClick={googleLogin}
            type="danger"
            className="mb-3"
            block
            shape="round"
            icon={<GoogleOutlined />}
            size="large"
          >
            Login with Google
          </Button>

          <Link to="/forgot/password" className="float-right text-danger">
            Forgot Password
          </Link>
          <Link to="/register/complete" className="float-left">
            New User? Sign Up here.
          </Link>
        </div>
      </div>
    </div>
    <div className="footer-container">
          <div className="footer-box row">
            <div className="footer-section col-md- 3">
              <div className="get-app-container">
                <div className="app-image">
                  <img className="image-real" src = "https://i.im.ge/2021/08/12/jjUpM.png"/>
                </div>
                  <div className="app-heading margin-top">
                    Marketed By
                  </div>
                  <p className = "branding-text">VYOMAN CLAIRE PVT LTD.</p>
                  <p className = "branding-text">GSTIN: 07AAHCV4657N1ZM</p>
              </div>
            </div>
            <div className="footer-section col-md- 3">
              <div className="get-app-container">
                <div className="app-heading">Get Our App</div>
                <div className="app-image">
                  <img className="image-real" src = "https://i.im.ge/2021/08/12/j57rF.png"/>
                  <img className="image-real" src = "https://i.im.ge/2021/08/12/j5sV6.png"/>
                </div>
              </div>
            </div>
            <div className="footer-section col-md- 3">
              <div className="get-app-container">
              <div className="app-heading">Shop Our Range</div>
                <a href = "/category/6-months" style = {{color: 'white'}}><p className = "branding-text mt-2">6 &nbsp; Months</p></a>
                <a href = "/category/3-months" style = {{color: 'white'}}><p className = "branding-text mt-2">3 &nbsp; Months</p></a>
                <a href = "/category/1-month" style = {{color: 'white'}}><p className = "branding-text mt-2">1 &nbsp; Month</p></a>
                <a href = "/category/1-day" style = {{color: 'white'}}><p className = "branding-text mt-2">1 &nbsp; Day</p></a>
              </div>
            </div>
            <div className="footer-section col-md- 3">
            <div className="get-app-container">
              <div className="app-heading">Our Policies</div>
                <a href = "/privacypolicy" style = {{color: 'white'}}><p className = "branding-text mt-2">Privacy and Policy</p></a>
                <a href = "/returnpolicy" style = {{color: 'white'}}><p className = "branding-text mt-2">Return Policy</p></a>
                <a href = "/tandc" style = {{color: 'white'}}><p className = "branding-text mt-2">Terms & Conditions</p></a>
              </div>
            </div>
            <p className = "copyright">© skycosmeticlenses.com All Rights Reserved.</p>
          </div>
        </div>
    </div>
  );
};

export default Login;
