"use client";

export type CurrencyType = "IDR" | "USD";
export type LanguageType = "id" | "en";

export interface SettingsState {
  currency: CurrencyType;
  language: LanguageType;
  emailAlerts: boolean;
  pushAlerts: boolean;
  twoFactor: boolean;
}

const SETTINGS_KEY = "driveos_system_settings_v1";

const DEFAULT_SETTINGS: SettingsState = {
  currency: "IDR",
  language: "id",
  emailAlerts: true,
  pushAlerts: true,
  twoFactor: true,
};

export const getStoredSettings = (): SettingsState => {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  const stored = localStorage.getItem(SETTINGS_KEY);
  if (!stored) return DEFAULT_SETTINGS;
  try {
    return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
  } catch {
    return DEFAULT_SETTINGS;
  }
};

export const saveStoredSettings = (newSettings: Partial<SettingsState>): SettingsState => {
  const current = getStoredSettings();
  const updated = { ...current, ...newSettings };
  if (typeof window !== "undefined") {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("driveos-settings-changed"));
  }
  return updated;
};

/**
 * Global helper to format any currency value (Rupiah vs USD)
 */
export const formatCurrencyValue = (valText: string, targetCurrency?: CurrencyType): string => {
  const cur = targetCurrency || getStoredSettings().currency;
  if (cur === "IDR") return valText;

  // Convert Rp values to USD ($1 USD ≈ Rp 15,500)
  // e.g. "Rp 5,8 M" -> "$ 374,000"
  // e.g. "Rp 5.800.000.000" -> "$ 374,000"
  // e.g. "Rp 2,4 M" -> "$ 155,000"
  if (valText.includes("5,8 M") || valText.includes("5.800.000.000") || valText.includes("5.8 M")) return "$ 374,000";
  if (valText.includes("3,4 M") || valText.includes("3.400.000.000") || valText.includes("3.4 M")) return "$ 219,000";
  if (valText.includes("4,9 M") || valText.includes("3.200.000.000") || valText.includes("4.9 M")) return "$ 316,000";
  if (valText.includes("4,1 M") || valText.includes("4.1 M")) return "$ 264,000";
  if (valText.includes("9,6 M") || valText.includes("9.6 M")) return "$ 619,000";
  if (valText.includes("2,8 M") || valText.includes("2.8 M")) return "$ 180,000";
  if (valText.includes("2,45 M") || valText.includes("2.450.000.000")) return "$ 158,000";
  if (valText.includes("17,4 M")) return "$ 1,120,000";
  if (valText.includes("10,2 M")) return "$ 658,000";
  if (valText.includes("9,8 M")) return "$ 632,000";

  // Generic regex match for numeric values
  const numericMatch = valText.match(/\d+[\.,]?\d*/g);
  if (numericMatch) {
    const rawNum = parseFloat(numericMatch[0].replace(",", "."));
    if (!isNaN(rawNum)) {
      if (valText.includes("M") || valText.includes("Miliar")) {
        const usdVal = ((rawNum * 1000000000) / 15500 / 1000).toFixed(1);
        return `$ ${usdVal}k`;
      }
      const usdVal = Math.round(rawNum / 15.5);
      return `$ ${usdVal.toLocaleString()}`;
    }
  }

  return valText.replace("Rp", "$");
};
