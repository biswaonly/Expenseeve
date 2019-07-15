import * as React from "react";
import { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import { setAlert } from "../../actions/alert";

interface LoginProps {
  isAuthenticated: boolean;
  login: any;
  setAlert: any;
}
interface IState {
  email: string;
  password: string;
}

const Login: React.SFC<LoginProps> = ({ login, isAuthenticated, setAlert }) => {
  // Set State
  const [formData, setFormData] = useState<IState>({
    email: "",
    password: ""
  });
  const { email, password } = formData;

  // Setting Input Field Data
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit Form
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setAlert("Enter your Email", "danger");
    }
    if (!password) {
      setAlert("Enter your Password", "danger");
    }

    login(email, password);
  };

  // Alert Set
  const googleLogin = () => {
    setAlert("Google LogIn Still in progress", "danger");
  };

  // Redirect if Logged in
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      <h1>Sign In</h1>
      <p> Sign Into Your Account</p>
      <form onSubmit={e => onSubmit(e)}>
        <div>
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={e => onChange(e)}
            // required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e => onChange(e)}
            // minLength="6"
          />
        </div>
        <input type="submit" value="Login" />
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
      <p>or</p>
      <p>
        Sign in with
        <button onClick={googleLogin}>Google</button>
      </p>
    </Fragment>
  );
};

const mapStateToProps = (state: any) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login, setAlert }
)(Login);
