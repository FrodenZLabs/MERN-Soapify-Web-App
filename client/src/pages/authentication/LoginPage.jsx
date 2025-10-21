import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import LoginImage from "../../assets/images/authentication/login.jpg";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../redux/reducers/authSlice";
import { loginUser } from "../../services/authService";
import { toast } from "react-toastify";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { RingLoader } from "react-spinners";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.authentication);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); // Toggle password visibility
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(signInStart());

    try {
      const data = await loginUser(email, password);
      dispatch(signInSuccess(data));
      toast.success(data.message);

      navigate("/");
    } catch (err) {
      dispatch(signInFailure(err));
      console.log(err);
      toast.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 lg:h-screen lg:gap-y-12">
      {/* Full-screen loader */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/75 z-50">
          <RingLoader color="#4A90E2" size={100} />
        </div>
      )}

      <Card
        horizontal
        imgSrc={LoginImage}
        imgAlt=""
        className="w-full md:max-w-4xl md:*:w-full md:*:p-16 [&>img]:hidden md:[&>img]:w-80 md:[&>img]:p-0 lg:[&>img]:block"
      >
        <h1 className="mb-3 text-2xl font-bold md:text-3xl">
          Sign in to platform
        </h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4 flex flex-col gap-y-3">
            <Label htmlFor="email">Your email</Label>
            <TextInput
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              type="email"
            />
          </div>
          <div className="mb-6 flex flex-col gap-y-3 relative">
            <Label htmlFor="password">Your password</Label>
            <TextInput
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              type={showPassword ? "text" : "password"}
            />
            <button
              type="button"
              className="absolute right-3 top-[60%] transform"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <MdVisibilityOff className="h-5 w-5 text-gray-500" />
              ) : (
                <MdVisibility className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-x-3">
              <Checkbox id="rememberMe" name="rememberMe" />
              <Label htmlFor="rememberMe">Remember me</Label>
            </div>
            <a
              href="#"
              className="w-1/2 text-right text-sm text-primary-600 dark:text-primary-300"
            >
              Forgot Password?
            </a>
          </div>
          <div className="mb-6">
            <Button
              type="submit"
              className="w-full lg:w-auto bg-blue-500 hover:bg-green-500"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login to your account"}
            </Button>
          </div>

          <p className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
