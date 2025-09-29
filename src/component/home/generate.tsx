import React, { useState, useRef, useEffect, type CSSProperties } from "react";
import { Box, Group, Stack, Text } from "@mantine/core";

import ImageIcon from "@/assets/icons/image";
import VideoIcon from "@/assets/icons/video";
import RealtimeIcon from "@/assets/icons/realtime";
import EnhancerIcon from "@/assets/icons/enhancer";
import FilterIcon from "@/assets/icons/filter";
import EditIcon from "@/assets/icons/edit";
import LipsyncIcon from "@/assets/icons/lipsync";
import MotionIcon from "@/assets/icons/motion";
import ThreeDIcon from "@/assets/icons/3d";
import RestyleIcon from "@/assets/icons/restyle";

interface GenerateItem {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  isNew?: boolean;
  bgColor?: string;
}

const generateItems: GenerateItem[] = [
  { icon: <ImageIcon width={20} height={20} />, title: "Image", subtitle: "Generate images with custom styles in Flux and ideogram.", isNew: true, bgColor: "var(--box-100)" },
  { icon: <VideoIcon width={20} height={20} />, title: "Video", subtitle: "Generate videos with Pica, Hellium, Luma, and more.", isNew: true, bgColor: "var(--box-200)" },
  { icon: <RealtimeIcon width={20} height={20} />, title: "Realtime", subtitle: "Realtime AI rendering on a canvas with instant feedback loops.", bgColor: "var(--box-300)" },
  { icon: <EnhancerIcon width={20} height={20} />, title: "Enhancer", subtitle: "Upscale and enhance images and videos up to 22K.", bgColor: "var(--box-400)" },
  { icon: <EditIcon width={20} height={20} />, title: "Edit", subtitle: "Add photos, change styles, or expand photos and generations.", isNew: true, bgColor: "var(--box-500)" },
  { icon: <LipsyncIcon width={20} height={20} />, title: "Video Lipsync", subtitle: "Lip sync any video to any audio.", isNew: true, bgColor: "var(--box-600)" },
  { icon: <MotionIcon width={20} height={20} />, title: "Motion Transfer", subtitle: "Transfer motion to images and animate characters.", bgColor: "var(--box-700)" },
  { icon: <RestyleIcon width={20} height={20} />, title: "Video Restyle", subtitle: "Restyle videos with new looks, filters, and effects.", bgColor: "var(--box-800)" },
  { icon: <ThreeDIcon width={20} height={20} />, title: "3D Objects", subtitle: "Create and enhance 3D models for images and videos.", bgColor: "var(--box-900)" },
];

type FilterType = "filter" | "open" | "new";

const dropdownOptions: { value: FilterType; label: string }[] = [
  { value: "filter", label: "show filter" },
  { value: "open", label: "show open" },
  { value: "new", label: "show new" },
];

export default function Generates() {
  const [filter, setFilter] = useState<FilterType>("filter");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(4);

  const filteredItems = generateItems.filter((item, i) => {
    if (filter === "new") return item.isNew;
    if (filter === "open") return true;
    if (filter === "filter") return i < 8;
    return true;
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setColumns(1); 
      } else if (width < 1200) {
        setColumns(2); 
      } else {
        setColumns(4);
      }
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  const containerStyles: CSSProperties = { 
    display: "flex", 
    flexDirection: "column", 
    width: "93%", 
    margin: "0 auto",
    marginTop: "20px",
  };
  
  const gridStyles: CSSProperties = { 
    display: "grid", 
    gridTemplateColumns: `repeat(${columns}, 1fr)`, 
    gap: 10, 
    marginTop: 20 
  };

  const cardStyles: CSSProperties = {
    background: "var(--grid-200)",
    borderRadius: 12,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    cursor: "pointer",
    height: "100%",
  };

  const wrapperStyles: CSSProperties = { 
    background: "var(--white-200)", 
    borderRadius: 12,
    padding: 4, 
    display: "flex", 
    flexDirection: "column", 
    flex: 1,
  };

  const contentStyles: CSSProperties = {
    background: "var(--grid-100)",
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 8,
    padding: 16,
    flex: 1,
  };

  const topStyles: CSSProperties = {
    display: "flex",
    alignItems: "flex-start",
    gap: 2,
  };

  const iconWrapperStyle = (bgColor?: string): CSSProperties => ({
    backgroundColor: bgColor || "var(--white-100)",
    color: "var(--white-100)",
    padding: 8,
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  });

  const filterBadgeStyle: CSSProperties = {
    color: "var(--black-300)",
    fontSize: 8,
    fontWeight: 500,
    background: "var(--grid-100)",
    border: "0.5px solid var(--grid-300)",
    padding: "3px 6px",
    borderRadius: 6,
    flexShrink: 0,
  };

  return (
    <Box style={containerStyles}>
      <Group style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
        <Text style={{ color: "var(--black-100)", fontSize: 16, fontWeight: 600 }}>Generate</Text>

        <Box style={{ position: "relative" }} ref={dropdownRef}>
          <Box
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              background: "var(--grid-200)",
              color: "var(--black-100)",
              padding: "4px 6px",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 9.5,
              fontWeight: 500,
              width: 80,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
            }}
          >
            <FilterIcon width={10} height={10} />
            {dropdownOptions.find((o) => o.value === filter)?.label}
          </Box>

          {dropdownOpen && (
            <Box
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                marginTop: 4,
                background: "var(--grid-100)",
                border: "0.5px solid var(--grid-300)",
                color: "var(--black-100)",
                padding: "2px 2px 0 2px",
                borderRadius: 12,
                zIndex: 10,
                overflow: "hidden",
              }}
            >
              {dropdownOptions.map((option) => (
                <Box
                  key={option.value}
                  onClick={() => {
                    setFilter(option.value);
                    setDropdownOpen(false);
                  }}
                  style={{
                    padding: "4px 12px",
                    borderRadius: 8,
                    fontSize: 9.5,
                    fontWeight: 450,
                    color: "var(--black-100)",
                    cursor: "pointer",
                    marginBottom: 2,
                    background: option.value === filter ? "var(--grid-200)" : "transparent",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--grid-200)")}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = option.value === filter ? "var(--grid-200)" : "transparent")
                  }
                >
                  {option.label}
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Group>

      <Box style={gridStyles}>
        {filteredItems.map((item, index) => (
          <Box key={index} style={cardStyles}>
            <Box style={wrapperStyles}>
              <Box style={contentStyles}>
                <Box style={topStyles}>
                  <Box style={iconWrapperStyle(item.bgColor)}>{item.icon}</Box>
                  <Stack gap={2} style={{ marginLeft: 8, flex: 1 }}>
                    <Text style={{ color: "var(--black-100)", fontSize: 12, fontWeight: 500 }}>{item.title}</Text>
                    <Text style={{ color: "var(--black-300)", fontSize: 9.5, fontWeight: 500 }}>{item.subtitle}</Text>
                  </Stack>
                  </Box>
                <Box style={filterBadgeStyle}>{filter === "new" ? "New" : "Open"}</Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
