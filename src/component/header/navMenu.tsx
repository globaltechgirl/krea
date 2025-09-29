import { useRef, useLayoutEffect, useState, type ReactNode, type CSSProperties } from "react";
import { Box, Anchor } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";

interface NavItem {
  icon: ReactNode;
  label: string;
  path: string;
}

interface NavMenuProps {
  navItems: NavItem[];
  Tooltip: React.FC<{ label: string }>;
}

interface BackgroundStyle {
  left: number;
  top: number;
  width: number;
  height: number;
}

const PADDING_X = 3;
const PADDING_Y = 3;

const NavMenu: React.FC<NavMenuProps> = ({ navItems, Tooltip }) => {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const navRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [activeStyle, setActiveStyle] = useState<BackgroundStyle>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });
  const [hoverStyle, setHoverStyle] = useState<BackgroundStyle | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const activeIndex = navItems.findIndex((item) => item.path === location.pathname);
    if (activeIndex === -1) return;

    const activeEl = navRefs.current[activeIndex];
    if (!activeEl) return;

    const containerRect = container.getBoundingClientRect();
    const activeRect = activeEl.getBoundingClientRect();

    setActiveStyle({
      left: activeRect.left - containerRect.left - PADDING_X,
      top: activeRect.top - containerRect.top - PADDING_Y,
      width: activeRect.width + PADDING_X * 2,
      height: activeRect.height + PADDING_Y * 2,
    });
  }, [location.pathname, navItems]);

  const navAnchorBase: CSSProperties = {
    color: "var(--black-100)",
    borderRadius: 8,
    padding: "7px 9px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    transition: "color 0.25s ease-in-out",
  };

  const handleMouseEnter = (index: number) => {
    setHoveredNav(navItems[index].label);

    const container = containerRef.current;
    const hoverEl = navRefs.current[index];
    if (!container || !hoverEl) return;

    const containerRect = container.getBoundingClientRect();
    const hoverRect = hoverEl.getBoundingClientRect();

    setHoverStyle({
      left: hoverRect.left - containerRect.left - PADDING_X,
      top: hoverRect.top - containerRect.top - PADDING_Y,
      width: hoverRect.width + PADDING_X * 2,
      height: hoverRect.height + PADDING_Y * 2,
    });
  };

  const handleMouseLeave = () => {
    setHoveredNav(null);
    setHoverStyle(null);
  };

  return (
    <Box
      ref={containerRef}
      style={{
        position: "relative",
        display: "flex",
        gap: 10,
        padding: 7,
        borderRadius: 12,
        backgroundColor: "var(--white-200)",
      }}
    >
      <Box
        style={{
          position: "absolute",
          top: activeStyle.top,
          left: activeStyle.left,
          width: activeStyle.width,
          height: activeStyle.height,
          backgroundColor: "var(--white-100)",
          borderRadius: 8,
          boxShadow: "0 0px 5px rgba(0,0,0,0.15)",
          transition: "all 0.3s ease-in-out",
          zIndex: 0,
        }}
      />

      {hoverStyle && (
        <Box
          style={{
            position: "absolute",
            top: hoverStyle.top,
            left: hoverStyle.left,
            width: hoverStyle.width,
            height: hoverStyle.height,
            backgroundColor: "var(--white-300)",
            borderRadius: 8,
            transition: "all 0.2s ease-in-out",
            zIndex: 0,
          }}
        />
      )}

      {navItems.map(({ icon, label, path }, index) => (
        <Anchor
          key={label}
          component={Link}
          to={path}
          ref={(el) => {
            navRefs.current[index] = el; 
          }}
          style={{ ...navAnchorBase, zIndex: 1 }}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          {icon}
          {hoveredNav === label && <Tooltip label={label} />}
        </Anchor>
      ))}
    </Box>
  );
};

export default NavMenu;
