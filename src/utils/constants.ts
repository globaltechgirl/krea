export const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const ROUTES = {
  HOME: "/home",
  IMAGE: "/image",
  VIDEO: "/video",
  ENHANCER: "/enhancer",
  REALTIME: "/realtime",
  EDIT: "/edit",
  ASSETS: "/assets",
  PROFILE: "/profile",
};

export const NavLinks = [
  {
    label: "Home",
    link: ROUTES.HOME,
  },
  {
    label: "Image",
    link: ROUTES.IMAGE,
  },
  {
    label: "Video",
    link: ROUTES.VIDEO,
  },
  {
    label: "Enhancer",
    link: ROUTES.ENHANCER,
  },
  {
    label: "Realtime",
    link: ROUTES.REALTIME,
  },
  {
    label: "Edit",
    link: ROUTES.EDIT,
  },
  {
    label: "Assets",
    link: ROUTES.ASSETS,
  },
];
