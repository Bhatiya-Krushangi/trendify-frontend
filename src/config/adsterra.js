/**
 * Adsterra Active Ad Units Configuration for nextrendx.in
 * Website ID: 6146404
 */

export const ADSTERRA_CONFIG = {
  website: "nextrendx.in",
  websiteId: "6146404",
  // Live ads enabled
  showDesignBlocks: false,

  units: {
    // 1. Native Banner
    nativeBanner: {
      id: "31895008",
      name: "NativeBanner_1",
      type: "native",
      format: "Native Banner (Responsive)",
      containerId: "container-6a17f189610dfbc150d4df64ca32284f",
      scriptUrl: "https://bauval.org/21/6a17f189610dfbc150d4df64ca32284f",
    },

    // 2. Banner 300x250
    banner300x250: {
      id: "31895009",
      name: "300x250_1",
      type: "banner_300x250",
      width: 300,
      height: 250,
      format: "300 x 250 (Medium Rectangle)",
      key: "9b04e9e23f373672e3ca351a8ceb12e9",
      scriptUrl: "https://bauval.org/22/9b04e9e23f373672e3ca351a8ceb12e9",
    },

    // 3. Social Bar
    socialBar: {
      id: "31895010",
      name: "SocialBar_1",
      type: "social_bar",
      format: "Social Bar (Interactive Notification / Push)",
      scriptUrl: "https://bauval.org/14/3c8ae44b90c975fe8b1eeb28911c8c59",
    },

    // 4. Popunder
    popunder: {
      id: "31895011",
      name: "Popunder_1",
      type: "popunder",
      format: "Popunder (On-click full tab ad)",
      scriptUrl: "https://abscloud.org/1/1a9ffd68cff8c36c43e771f07f1af353",
    },

    // 5. Banner 320x50
    banner320x50: {
      id: "31895012",
      name: "320x50_1",
      type: "banner_320x50",
      width: 320,
      height: 50,
      format: "320 x 50 (Mobile Leaderboard)",
      key: "dcd5b367fda2101b6499b67f66c6679d",
      scriptUrl: "https://bauval.org/22/dcd5b367fda2101b6499b67f66c6679d",
    },
  },
};
