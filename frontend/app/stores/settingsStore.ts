import type { Settings } from "~/types/settings";

export const useSettingsStore = defineStore('settingsStore', () => {
  const settings = ref<Settings>({
    bookingPaymentTimeSeconds: 0,
  });

  function setSettings(value: Settings) {
    settings.value = value;
  }

  return {
    settings,
    setSettings,
  }
})