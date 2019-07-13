import * as React from "react";
import { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect, RouteComponentProps } from "react-router-dom";
import { register } from "../../actions/auth";
import { setAlert } from "../../actions/alert";

interface Props extends RouteComponentProps<any> {
  isAuthenticated: boolean;
  register: any;
  setAlert: any;
}
interface IState {
  name: string;
  email: string;
  password: string;
  password2: string;
}

const Register: React.SFC<Props> = ({
  history,
  setAlert,
  isAuthenticated,
  register
}) => {
  // Set State
  const [formData, setFormData] = useState<IState>({
    name: "",
    email: "",
    password: "",
    password2: ""
  });
  const { name, email, password, password2 } = formData;

  // Setting Input Field Data
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit Form
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Set Alert
    if (password !== password2) {
      setAlert("Passwords Do Not Match", "danger");
    } else {
      register(name, email, password, history);
    }
  };

  // Redirect if Logged in
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <Fragment>
      <h1>Sign Up</h1>
      <p> Create Your Account</p>
      <form onSubmit={e => onSubmit(e)}>
        <div>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={e => onChange(e)}
            // required
          />
        </div>
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
        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={e => onChange(e)}
            // minLength="6"
          />
        </div>
        <input type="submit" value="Register" />
      </form>
      <p>
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

const mapStateToProps = (state: any) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { register, setAlert }
)(Register);
