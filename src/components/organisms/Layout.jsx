import { Outlet } from "react-router-dom";
import { useAuth } from "@/layouts/Root";
import Button from "@/components/atoms/Button";

const Layout = () => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 relative">
      <Button 
        onClick={logout}
        className="absolute top-4 right-4 z-50"
        variant="outline"
      >
        Logout
      </Button>
      <Outlet />
    </div>
  );
};
export default Layout;