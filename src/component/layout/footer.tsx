import { type CSSProperties } from "react";
import { Box, Group, Text } from "@mantine/core";
import LogoIcon from "@/assets/icons/logo";

export default function Footer() {
  const containerStyles: CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    margin: "0 auto",
    padding: "10px",
    borderTop: "0.5px solid var(--white-200)"
  };

  const leftGroupStyles: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 4,
    color: "var(--black-100)",
  };

  const rightTextStyles: CSSProperties = {
    fontSize: 10,
    color: "var(--black-200)",
    fontWeight: 500,
  };

  const logoTextStyles: CSSProperties = {
    fontSize: 12,
    color: "var(--black-200)",
    fontWeight: 600,
    textDecoration: "none",
  };

  const linkStyles: CSSProperties = {
    color: "var(--black-300)",
    textDecoration: "none",
  };

  return (
    <Box px="md" style={containerStyles}>
      <Group style={leftGroupStyles}>
        <LogoIcon width={16} height={16} />
        <a
          href="https://www.krea.ai/"
          target="_blank"
          rel="noopener noreferrer"
          style={logoTextStyles}
        >
          Krea AI
        </a>
      </Group>

      <Text style={rightTextStyles}>
        Curated by{" "}
        <a
          href="https://github.com/globaltechgirl"
          target="_blank"
          rel="noopener noreferrer"
          style={linkStyles}
        >
          GlobalTechGirl
        </a>
      </Text>
    </Box>
  );
}
