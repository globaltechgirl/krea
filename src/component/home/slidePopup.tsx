import { Box, Group, Stack, Text } from "@mantine/core";
import { useClickOutside } from "@mantine/hooks";
import { type CSSProperties } from "react";

interface Slide {
  src: string;
  top: string;
  bottomLeft: {
    title: string;
    subtitle: string;
  };
  bottomRight: string;
}

interface SlidePopupProps {
  slide: Slide;
  onClose: () => void;
}

export default function SlidePopup({ slide, onClose }: SlidePopupProps) {
  const ref = useClickOutside(onClose);

  const wrapperStyle: CSSProperties = {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  };

  const contentStyle: CSSProperties = {
    background: "var(--white-200)",
    borderRadius: 12,
    padding: 12,
    maxWidth: 600,
    width: "90%",
    display: "flex",
    flexDirection: "column",
    gap: 12,
    position: "relative",
  };

  const imageStyle: CSSProperties = {
    width: "100%",
    borderRadius: 8,
    objectFit: "cover",
    display: "block",
  };

  const titleStyle: CSSProperties = {
    color: "var(--black-100)",
    fontSize: 22,
    fontWeight: 600,
  };

  const subtitleStyle: CSSProperties = {
    color: "var(--black-300)",
    fontSize: 12,
    fontWeight: 500,
  };

  const buttonStyle = (bgColor: string, textColor: string): CSSProperties => ({
    background: bgColor,
    color: textColor,
    padding: "3px 6px",
    borderRadius: 6,
    fontSize: 9.5,
    fontWeight: 500,
    cursor: "pointer",
  });

  return (
    <Box style={wrapperStyle}>
      <Box ref={ref} style={contentStyle}>
        <img src={slide.src} alt={slide.bottomLeft.title} style={imageStyle} />

        <Stack gap={4}>
          <Text style={titleStyle}>{slide.bottomLeft.title}</Text>
          <Text style={subtitleStyle}>{slide.bottomLeft.subtitle}</Text>
        </Stack>

        <Group justify="flex-end" style={{ gap: 8 }}>
          <Text onClick={onClose} style={buttonStyle("var(--popup-100)", "var(--black-100)")}>
            Cancel
          </Text>
          <Text style={buttonStyle("var(--black-100)", "var(--popup-100)")}>
            {slide.bottomRight}
          </Text>
        </Group>
      </Box>
    </Box>
  );
}
