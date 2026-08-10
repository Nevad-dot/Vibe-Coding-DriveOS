export type ThemeMode = "light" | "dark" | "system";

export const STORAGE_KEY = "driveos_theme_mode";

export function getSavedThemeMode(): ThemeMode {
  if (typeof window === "undefined") return "system";
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "light" || saved === "dark" || saved === "system") {
    return saved;
  }
  return "system"; // Default to System on first visit / login
}

export function applyDriveOSTheme(mode?: ThemeMode): { mode: ThemeMode; isDark: boolean } {
  if (typeof window === "undefined") return { mode: mode || "system", isDark: false };

  const currentMode = mode !== undefined ? mode : getSavedThemeMode();
  localStorage.setItem(STORAGE_KEY, currentMode);

  let isDark = false;

  if (currentMode === "dark") {
    isDark = true;
    document.documentElement.classList.add("dark");
  } else if (currentMode === "light") {
    isDark = false;
    document.documentElement.classList.remove("dark");
  } else {
    // Follow System OS setting
    isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  return { mode: currentMode, isDark };
}
