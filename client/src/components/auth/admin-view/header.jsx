import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import { AlignJustify, LogOut } from "lucide-react";
import { logoutUser } from "@/store/auth-slice";

const AdminHeader = ({ setOpen }) => {

  const dispatch = useDispatch()

  const handleLogout = () => {
    console.log("logout button clicked")
    dispatch(logoutUser())
  }

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <Button onClick={() => setOpen(true)} className="lg:hidden sm:block">
        <AlignJustify />
        <span className="sr-only">Toggle menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button className="inline-flex gap-2 items-center rounded-md  px-4 py-2 text-sm font-medium shadow">
          <LogOut className="block" onClick={handleLogout}/>
          Logout
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
