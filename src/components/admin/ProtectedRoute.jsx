import { useEffect , useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
    const [user, setUser] = useState(null); // State to store user data
    const [loading, setLoading] = useState(true); // Loading state
    const navigate = useNavigate();

    // Check user status by making an API request to your backend
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get("http://localhost:8081/api/auth/me", { // Replace with your backend endpoint
                    withCredentials: true // Assuming you are using cookies for authentication
                });

                if (response.status === 200) {
                    const currentUser = response.data;
                    setUser(currentUser);

                    // Redirect if the user is not a recruiter
                    if (currentUser.role !== 'recruiter') {
                        navigate("/companies/create");
                    }
                } else {
                    // If no user found or error occurred, navigate to login or create page
                    navigate("/login");
                }
            } catch (error) {
                console.error("Error fetching user:", error);
                navigate("/login"); // If there's an error, navigate to login page
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [navigate]);

    // If loading or user not yet fetched, you can show a loading spinner or nothing
    if (loading) {
        return <div>Loading...</div>;
    }

    // Render children if user is authenticated and authorized
    return <>{user ? children : null}</>;
};

export default ProtectedRoute;
