import { useState, type CSSProperties } from "react";
import { Box, Text, ActionIcon, Group } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

import QuickImg1Icon from "@/assets/quick-img1.webp";
import QuickImg2Icon from "@/assets/quick-img2.webp";
import QuickImg3Icon from "@/assets/quick-img3.webp";
import QuickImg4Icon from "@/assets/quick-img4.webp";
import QuickImg5Icon from "@/assets/quick-img5.webp";
import QuickImg6Icon from "@/assets/quick-img6.webp";
import QuickImg7Icon from "@/assets/quick-img7.webp";
import QuickImg8Icon from "@/assets/quick-img8.webp";
import QuickImg9Icon from "@/assets/quick-img9.webp";

interface GalleryItem {
  image: string;
  title: string;
  subtitle: string;
}

const galleryItems: GalleryItem[] = [
  { image: QuickImg1Icon, title: "Text Remover", subtitle: "Remove text or titles with AI technology." },
  { image: QuickImg2Icon, title: "AI Hairstyle", subtitle: "Try new hairstyles with AI for free." },
  { image: QuickImg3Icon, title: "Object Remover", subtitle: "Remove unwanted objects from any images." },
  { image: QuickImg4Icon, title: "Change Lighting", subtitle: "Dim the lights or change the time of day." },
  { image: QuickImg5Icon, title: "Cartoonify", subtitle: "Turn any photo into a cartoon with AI generator." },
  { image: QuickImg6Icon, title: "Colorize", subtitle: "Turn sketches or doodles into colorful pictures." },
  { image: QuickImg7Icon, title: "Clothes Changer", subtitle: "Try on different outfits with AI virtual tool." },
  { image: QuickImg8Icon, title: "Image Editor", subtitle: "Free AI photo editing with Nano Banana." },
  { image: QuickImg9Icon, title: "Product Photo", subtitle: "Create professional photo with products with AI." },
];

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const visibleCount = 4;

  const isFirstSlide = index === 0;
  const isLastSlide = index >= galleryItems.length - visibleCount;

  const containerStyles: CSSProperties = { 
    width: "95%", 
    margin: "0 auto", 
    marginTop: 20,
    marginBottom: "-70px",
  };

  const headerStyles: CSSProperties = { 
    display: "flex", 
    justifyContent: "space-between", 
    marginBottom: 20 
  };

  const gridStyles: CSSProperties = {
    display: "flex",
    transition: "transform 0.3s ease",
    transform: `translateX(-${(100 / visibleCount) * index}%)`,
    gap: 10,
  };

  const cardStyles: CSSProperties = {
    flex: `0 0 calc(100% / ${visibleCount})`,
    borderRadius: 12,
    overflow: "hidden",
    cursor: "pointer",
    position: "relative",
    background: "var(--white-200)",
    height: 200,
    padding: 4,
  };

  const imageStyles: CSSProperties = { 
    width: "100%", 
    height: "100%", 
    objectFit: "cover", 
    borderRadius: 8 
  };

  const overlayStyles: CSSProperties = {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "var(--white-100)",
    opacity: 0,
    transition: "opacity 0.3s ease",
    textAlign: "center",
    padding: 10,
  };

  const textBoxStyles: CSSProperties = { 
    display: "flex", 
    flexDirection: "column", 
    gap: 6 
  };

  return (
    <Box style={containerStyles}>
      <Group style={headerStyles}>
        <Text style={{ fontSize: 16, fontWeight: 600, color: "var(--black-100)" }}>Gallery</Text>
        <Group gap={6}>
          <ActionIcon
            size={20}
            radius={6}
            onClick={() => !isFirstSlide && setIndex(index - 1)}
            style={{
              background: "var(--white-200)",
              opacity: isFirstSlide ? 0.5 : 1,
              pointerEvents: isFirstSlide ? "none" : "auto",
            }}
          >
            <IconChevronLeft size={12} color="var(--black-100)" />
          </ActionIcon>
          <ActionIcon
            size={20}
            radius={6}
            onClick={() => !isLastSlide && setIndex(index + 1)}
            style={{
              background: "var(--white-200)",
              opacity: isLastSlide ? 0.5 : 1,
              pointerEvents: isLastSlide ? "none" : "auto",
            }}
          >
            <IconChevronRight size={12} color="var(--black-100)" />
          </ActionIcon>
        </Group>
      </Group>

      <Box style={{ overflow: "hidden" }}>
        <Box style={gridStyles}>
          {galleryItems.map((item, idx) => (
            <Box
              key={idx}
              style={cardStyles}
              onMouseEnter={(e) => {
                const overlay = e.currentTarget.querySelector<HTMLDivElement>(".overlay");
                if (overlay) overlay.style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                const overlay = e.currentTarget.querySelector<HTMLDivElement>(".overlay");
                if (overlay) overlay.style.opacity = "0";
              }}
            >
              <img src={item.image} alt={item.title} style={imageStyles} />
              <Box className="overlay" style={overlayStyles}>
                <Box style={textBoxStyles}>
                  <Text style={{ fontSize: 12, fontWeight: 500 }}>{item.title}</Text>
                  <Text style={{ fontSize: 9.5, fontWeight: 500 }}>{item.subtitle}</Text>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
