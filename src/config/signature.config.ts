export interface SocialNetwork {
  name: string;
  url: string;
  icon: string;
}

export const signatureConfig = {
  institution: {
    name: "IFOD",
    // fullName: "Institution Financière pour les Œuvres de Développement",
    address: "81, Avenue Tabu Ley, Gombe, Kinshasa",
    website: "https://www.ifodsa.cd",
    slogan: "Au service de tous.",
  },

  socialNetworks: [
    {
      name: "WhatsApp",
      url: "https://whatsapp.com/channel/0029Vb7GuVr4SpkLooHjQy1g",
      icon: "/assets/icons/whatsapp.png",
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/ifodsacommunication",
      icon: "/assets/icons/facebook.png",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/smf_ifod_sa/",
      icon: "/assets/icons/instagram.png",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/106736798/admin/page-posts/published/",
      icon: "/assets/icons/linkedin.png",
    },
    {
      name: "X",
      url: "https://x.com/ifodsa73234",
      icon: "/assets/icons/x.png",
    },
    {
      name: "TikTok",
      url: "https://www.tiktok.com/tiktokstudio/content",
      icon: "/assets/icons/tiktok.png",
    },
    {
      name: "YouTube",
      url: "https://youtube.com/@smfifodsa?si=76tEc34kWwrf_U1T",
      icon: "/assets/icons/youtube.png",
    },
  ] satisfies SocialNetwork[],
};