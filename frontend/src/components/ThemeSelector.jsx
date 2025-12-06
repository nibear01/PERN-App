import { PaletteIcon } from "lucide-react";
import { THEMES } from "../constants/index.js";
import { useThemeStore } from "../store/useThemeStore";

const ThemeSelector = () => {
  const { setTheme } = useThemeStore();

  return (
    <div className="dropdown dropdown-end">
      {/* DROPDOWN TRIGGER */}

      <button tabIndex={0} className="btn btn-primary btn-circle">
        <PaletteIcon className="size-5" />
      </button>

      <div
        tabIndex={0}
        className="dropdown-content mt-2 p-1 shadow-2xl bg-base-100 rounded-box w-56"
      >
        {THEMES.map((theme) => (
          <button
            key={theme.name}
            onClick={() => setTheme(theme.name)}
            className={`w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-colors
              ${
                theme === theme.name
                  ? " bg-primary/10"
                  : "hover:bg-base-content/5"
              }
              `}
          >
            <PaletteIcon className="size-5" />
            <span className="font-medium text-sm">{theme.label}</span>
            <div className="flex gap-1">
              {theme.colors.map((color) => (
                <div
                  key={color}
                  style={{ backgroundColor: color }}
                  className="w-4 h-4 rounded-full border"
                ></div>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
