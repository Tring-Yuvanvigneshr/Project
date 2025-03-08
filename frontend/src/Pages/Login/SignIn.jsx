import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/authSlice";
import { SIGN_IN } from "../../graphQl/mutation/userMutation";
import { notify } from "../../utils/CreateToast";
import "./SignIn.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [signIn, { loading }] = useMutation(SIGN_IN, {
    onCompleted: (data) => {
      if (data.signIn) {
        const { token, user } = data.signIn;
        dispatch(setUser({ token, user }));

        if (user.role === "customer") {
          navigate("/dashboard");
        } else if (user.role === "worker") {
          navigate("/wdashboard");
        } else {
          setError("Invalid role!");
        }
        notify({ message: "login successfully", type: "success" });
      }
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      await signIn({ variables: { email, password } });
    } catch (error) {
      console.log("SignIn Error: ", error);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <div className="login-box">
          <h2 className="loginHeadder">Sign In</h2>
          {error && <p className="error">{error}</p>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button id="login-btn" type="submit" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
          <p>
            Don't have an account?{" "}
            <span>
              <Link to="/signUp">Sign Up</Link>
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
