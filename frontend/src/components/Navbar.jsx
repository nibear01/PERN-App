import { ShoppingBagIcon } from "lucide-react";
import { useResolvedPath } from "react-router-dom";
import ThemeSelector from "./ThemeSelector";
import { useThemeStore } from "../store/useThemeStore";

const Navbar = () => {
  const { pathname } = useResolvedPath();
  const isHomePage = pathname === "/";

  const { theme } = useThemeStore();

  return (
    <div className="sticky top-0 z-50 shadow-lg  text-white" data-theme={theme}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between w-full py-2">
          {/* logo */}
          <div className="flex items-center">
            <img src="/assets/logo.png" className="h-10" alt="Logo" />
          </div>

          {/* nav items */}
          <div className="flex items-center gap-4">
            <ThemeSelector />

            {isHomePage && (
              <div className="indicator">
                <div className="p-2 rounded-full cursor-pointer">
                  <ShoppingBagIcon className="size-5" />
                  <span className="badge badge-sm badge-primary indicator-item">
                    1
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
