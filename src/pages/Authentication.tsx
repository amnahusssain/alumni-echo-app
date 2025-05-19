
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/App";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

const Authentication = () => {
  const { selectedCampus, setIsAuthenticated, setUserData } = useAppContext();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  // Get the email extension for the selected campus
  const getEmailExtension = () => {
    switch (selectedCampus) {
      case "Islamabad Campus":
        return "@cuiislamabad.edu.pk";
      case "Lahore Campus":
        return "@cuilahore.edu.pk";
      case "Wah Campus":
        return "@cuiwah.edu.pk";
      case "Vehari Campus":
        return "@cuivehari.edu.pk";
      case "Sahiwal Campus":
        return "@cuisahiwal.edu.pk";
      case "Attock Campus":
        return "@cuiattok.edu.pk";
      case "Abbottabad Campus":
        return "@cuiabbottabad.edu.pk";
      default:
        return "@comsats.edu.pk";
    }
  };

  const validateEmail = (email: string) => {
    const extension = getEmailExtension();
    return email.endsWith(extension);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate email format
    if (!validateEmail(email)) {
      toast({
        title: "Invalid Email",
        description: `Please use a valid ${selectedCampus} email address ending with ${getEmailExtension()}`,
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    // For signup, validate password match
    if (!isLogin && password !== confirmPassword) {
      toast({
        title: "Passwords Don't Match",
        description: "Please make sure your passwords match",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    // Simulate API call with timeout
    setTimeout(() => {
      setIsAuthenticated(true);
      
      // Update user data if signing up
      if (!isLogin && name) {
        setUserData((prev: any) => ({
          ...prev,
          name,
          email,
        }));
      }
      
      toast({
        title: isLogin ? "Logged In Successfully" : "Account Created Successfully",
        description: "Welcome to COMSATS University App",
      });
      
      navigate("/home");
      setLoading(false);
    }, 1500);
  };

  if (!selectedCampus) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-lg shadow-lg p-8"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-comsats-blue">{selectedCampus}</h1>
          <p className="text-gray-500 mt-2">
            {isLogin ? "Sign in to your account" : "Create a new account"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="auth-input"
                placeholder="Enter your full name"
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="auth-input"
              placeholder={`example${getEmailExtension()}`}
            />
            <p className="text-xs text-gray-500 mt-1">
              Use your {selectedCampus} email address
            </p>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="auth-input"
              placeholder="Enter your password"
            />
          </div>

          {!isLogin && (
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required={!isLogin}
                className="auth-input"
                placeholder="Confirm your password"
              />
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-comsats-blue hover:bg-comsats-blue/90"
            disabled={loading}
          >
            {loading
              ? "Processing..."
              : isLogin
              ? "Sign In"
              : "Create Account"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-comsats-green hover:underline"
          >
            {isLogin
              ? "Need an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Authentication;
