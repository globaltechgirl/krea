import React, { useState, useEffect, type CSSProperties, type ReactNode } from "react";
import { Box, Group, Text, Avatar } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";

import NavMenu from "@/component/header/navMenu";
import { ROUTES } from "@/utils/constants";

import LogoIcon from "@/assets/icons/logo";
import HomeIcon from "@/assets/icons/home";
import ImageIcon from "@/assets/icons/image";
import VideoIcon from "@/assets/icons/video";
import EnhancerIcon from "@/assets/icons/enhancer";
import RealtimeIcon from "@/assets/icons/realtime";
import EditIcon from "@/assets/icons/edit";
import AssetsIcon from "@/assets/icons/assets";
import SupportIcon from "@/assets/icons/support";
import BellIcon from "@/assets/icons/bell";
import SunIcon from "@/assets/icons/sun";
import MoonIcon from "@/assets/icons/moon";
import ProfileIcon from "@/assets/profile.svg";

export interface NavItem {
  icon: ReactNode;
  label: string;
  path: string;
}

interface TooltipProps {
  label: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ label }) => {
  const tooltipStyles: CSSProperties = {
    position: "absolute",
    top: "135%",
    backgroundColor: "var(--white-200)",
    borderRadius: 8,
    padding: "2px 6px",
    whiteSpace: "nowrap",
    zIndex: 20,
  };

  const textStyles: CSSProperties = {
    color: "var(--black-100)",
    fontSize: 9,
    fontWeight: 500,
  };

  return (
    <Box style={tooltipStyles}>
      <Text style={textStyles}>{label}</Text>
    </Box>
  );
};

const Header: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme ? "dark" : "light");
    localStorage.setItem("darkMode", String(newTheme));
  };

  const handleBellClick = () => {
    setShowNotif(true);
    setTimeout(() => setShowNotif(false), 4000);
  };

  const navItems: NavItem[] = [
    { icon: <HomeIcon width={14} height={14} />, label: "Home", path: ROUTES.HOME },
    { icon: <ImageIcon width={14} height={14} />, label: "Image", path: ROUTES.IMAGE },
    { icon: <VideoIcon width={14} height={14} />, label: "Video", path: ROUTES.VIDEO },
    { icon: <EnhancerIcon width={14} height={14} />, label: "Enhancer", path: ROUTES.ENHANCER },
    { icon: <RealtimeIcon width={14} height={14} />, label: "Realtime", path: ROUTES.REALTIME },
    { icon: <EditIcon width={14} height={14} />, label: "Edit", path: ROUTES.EDIT },
    { icon: <AssetsIcon width={14} height={14} />, label: "Assets", path: ROUTES.ASSETS },
  ];

  const iconTextBox: CSSProperties = {
    backgroundColor: "var(--white-200)",
    padding: "4px 8px",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    gap: 5,
    height: 24,
    color: "var(--black-100)",
  };

  const iconSquareBox: CSSProperties = {
    ...iconTextBox,
    padding: "4px 6px",
    cursor: "pointer",
  };

  const iconCircleBox: CSSProperties = {
    backgroundColor: "var(--white-200)",
    width: 24,
    height: 24,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  };

  return (
    <Box
      h={60}
      px="md"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      <Group gap="sm">
        <LogoIcon width={22} height={22} color="var(--black-100)" />
        <Box style={iconTextBox}>
          <Avatar size={16} radius="50%" src={ProfileIcon} />
          <Box style={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Text style={{ fontSize: 9.5, fontWeight: 500, color: "var(--black-100)" }}>
              OnyinyeOfili
            </Text>
            <IconChevronDown size={11} />
          </Box>
        </Box>
      </Group>

      <Box style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
        <NavMenu navItems={navItems} Tooltip={Tooltip} />
      </Box>

      <Group gap={6}>
        <Box style={iconTextBox}>
          <ImageIcon width={12} height={12} />
          <Text style={{ fontSize: 9.5, fontWeight: 500, color: "var(--black-100)" }}>Gallery</Text>
        </Box>

        <Box style={iconTextBox}>
          <SupportIcon width={10} height={10} />
          <Text style={{ fontSize: 9.5, fontWeight: 500, color: "var(--black-100)" }}>Support</Text>
        </Box>

        <Box style={iconSquareBox} onClick={handleBellClick}>
          <BellIcon width={12} height={12} />
        </Box>

        <Box style={iconSquareBox} onClick={toggleTheme}>
          {darkMode ? (
            <MoonIcon width={14} height={14} color="var(--black-100)" />
          ) : (
            <SunIcon width={12} height={12} color="var(--black-100)" />
          )}
        </Box>

        <Box style={iconCircleBox}>
          <Avatar size={20} radius="50%" src={ProfileIcon} />
        </Box>
      </Group>

      <Box
        style={{
          position: "fixed",
          bottom: 10,
          right: 10,
          transform: showNotif ? "translateX(0)" : "translateX(300px)",
          transition: "transform 0.4s ease-in-out",
          width: 250,
          backgroundColor: "var(--white-200)",
          border: `0.5px solid var(--white-300)`,
          borderRadius: 8,
          padding: "10px 12px",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          gap: 8,
          boxShadow: "0px 2px 6px rgba(0,0,0,0.2)",
        }}
      >
        <Box
          style={{
            backgroundColor: "var(--white-300)",
            borderRadius: "50%",
            padding: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <BellIcon width={12} height={12} color="var(--black-300)" />
        </Box>

        <Box>
          <Text style={{ fontWeight: 500, fontSize: 9.5, color: "var(--black-300)" }}>
            Code by GlobalTechGirl
          </Text>
          <Text style={{ fontSize: 8.5, fontWeight: 500, color: "var(--black-300)", opacity: 0.6 }}>
            Cartolinks Solution LTD
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
