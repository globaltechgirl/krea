import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Box, Image, Group, Stack, Text, ActionIcon } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import SlidePopup from "@/component/home/slidePopup";

import Image1 from "@/assets/image1.webp";
import Image2 from "@/assets/image2.png";
import Image3 from "@/assets/image3.png";
import Image4 from "@/assets/image4.webp";
import Image5 from "@/assets/image5.png";
import Image6 from "@/assets/image6.png";
import PlayIcon from "@/assets/icons/play";
import PauseIcon from "@/assets/icons/pause";

const SLIDE_INTERVAL = 2000;

interface Slide {
  src: string;
  top: string;
  bottomLeft: {
    title: string;
    subtitle: string;
  };
  bottomRight: string;
}

const slides: Slide[] = [
  {
    src: Image1,
    top: "NEW IMAGE MODEL",
    bottomLeft: {
      title: "WAN 2.2 Image generation",
      subtitle:
        "Generate complex images with the brand new and powerful WAN 2.2 model. Exceptional prompt adherence and ultra-realistic textures.",
    },
    bottomRight: "Try WAN 2.2",
  },
  {
    src: Image2,
    top: "NEW IMAGE MODEL",
    bottomLeft: {
      title: "FLUX.1 Krea",
      subtitle:
        "We're making the weights to our FLUX.1 Krea model open-source. Download and run our model weights, read the technical report, or generate with it in Krea Image.",
    },
    bottomRight: "Read Report",
  },
  {
    src: Image3,
    top: "NEW IMAGE MODEL",
    bottomLeft: {
      title: "Realtime Video – Open Beta",
      subtitle:
        "Our ground-breaking Realtime Video is now accessible to all paid plans. Try it in the Realtime tool.",
    },
    bottomRight: "Try Realtime Video",
  },
  {
    src: Image4,
    top: "NEW IMAGE MODEL",
    bottomLeft: {
      title: "Seedream 4.0",
      subtitle:
        "Try the brand new and record-breaking image generation model Seedream 4.0 by ByteDance.",
    },
    bottomRight: "Start Generating",
  },
  {
    src: Image5,
    top: "NEW IMAGE MODEL",
    bottomLeft: {
      title: "Real-Time Video Generation",
      subtitle:
        "Announcing Realtime Video. Generate videos in real-time. Fully frame-consistent, controllable video clips.",
    },
    bottomRight: "Try Now",
  },
  {
    src: Image6,
    top: "NEW IMAGE MODEL",
    bottomLeft: {
      title: "Introducing Motion Transfer",
      subtitle:
        "Bring motion into your characters. Upload any image, record a video of yourself, and make your characters smile, talk, and dance. Powered by Runway Act 2.",
    },
    bottomRight: "Try Now",
  },
];

const extendedSlides = [...slides, slides[0]];

export default function Features() {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const [transitioning, setTransitioning] = useState(true);
  const [selectedSlide, setSelectedSlide] = useState<Slide | null>(null);

  const timerRef = useRef<number | null>(null);

  const displayedSlides = isPlaying ? extendedSlides : slides;

  const isFirstSlide = index === 0;
  const isLastSlide = index === slides.length - 1;

  const [slideFlex, setSlideFlex] = useState("calc(100% / 1.5)");

  useEffect(() => {
    if (!isPlaying || paused) return;

    timerRef.current = window.setInterval(nextSlide, SLIDE_INTERVAL);

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [isPlaying, paused]);


  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setSlideFlex("calc(100% / 0.8)");
      } else if (width < 1200) {
        setSlideFlex("calc(100% / 1.2)");
      } else {
        setSlideFlex("calc(100% / 1.5)");
      }
    };

    handleResize(); 
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setTransitioning(true);
    setIndex((i) => i + 1);
  };

  const handleTransitionEnd = () => {
    if (isPlaying && index === slides.length) {
      setTransitioning(false);
      setIndex(0);
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (timerRef.current) window.clearInterval(timerRef.current);
    } else {
      if (index === slides.length - 1) setIndex(0);
      setIsPlaying(true);
    }
  };

  const prev = () => {
    if (!isFirstSlide) {
      setTransitioning(true);
      setIndex((i) => i - 1);
      setIsPlaying(false);
    }
  };

  const next = () => {
    if (!isLastSlide) {
      setTransitioning(true);
      setIndex((i) => i + 1);
      setIsPlaying(false);
    }
  };

  const goTo = (i: number) => {
    setTransitioning(false);
    setIndex(i);
    setIsPlaying(false);
  };

  const containerStyles: CSSProperties = {
    maxWidth: "100%",
    margin: "0 auto",
    marginLeft: 30,
    overflow: "hidden",
  };

  const slidesWrapper: CSSProperties = {
    display: "flex",
    gap: 30,
    transition: transitioning ? "transform 0.5s ease" : "none",
    transform: `translateX(-${index * (100 / 1.5)}%)`,
  };

  const slideStyles: CSSProperties = {
    flex: `0 0 ${slideFlex}`,
    borderRadius: 12,
    background: "var(--white-200)",
    padding: 9,
    position: "relative",
    overflow: "hidden",
    cursor: "pointer",
  };

  const imageStyles: CSSProperties = {
    width: "100%",
    height: "clamp(280px, 100vh, 450px)",
    objectFit: "cover",
    borderRadius: 8,
    display: "block",
  };

  return (
    <Box
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={containerStyles}
    >
      <Box style={slidesWrapper} onTransitionEnd={handleTransitionEnd}>
        {displayedSlides.map((slide, i) => (
          <Box
            key={i}
            style={slideStyles}
            onClick={() => setSelectedSlide(slide)}
          >
            <Image src={slide.src} alt={`Slide ${i + 1}`} style={imageStyles} />
            <Group
              style={{
                position: "absolute",
                top: 10,
                left: 10,
                right: 0,
                padding: 10,
                justifyContent: "flex-start",
              }}
            >
              <Text
                style={{
                  color: "var(--white-100)",
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {slide.top}
              </Text>
            </Group>

            <Group
              style={{
                position: "absolute",
                bottom: 20,
                left: 10,
                right: 10,
                padding: "0 16px",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <Stack gap={4} style={{ maxWidth: "60%" }}>
                <Text
                  style={{
                    color: "var(--white-100)",
                    fontSize: 30,
                    fontWeight: 600,
                  }}
                >
                  {slide.bottomLeft.title}
                </Text>
                <Text
                  style={{
                    color: "var(--white-100)",
                    fontSize: 12,
                    fontWeight: 550,
                  }}
                >
                  {slide.bottomLeft.subtitle}
                </Text>
              </Stack>
              <Text
                style={{
                  background: "var(--white-100)",
                  padding: "2px 6px",
                  borderRadius: 8,
                  fontSize: 9.5,
                  fontWeight: 500,
                }}
              >
                {slide.bottomRight}
              </Text>
            </Group>
          </Box>
        ))}
      </Box>

      {selectedSlide && (
        <SlidePopup slide={selectedSlide} onClose={() => setSelectedSlide(null)} />
      )}

      <Group justify="space-between" style={{ marginTop: 10, width: "100%" }}>
        <Box style={{ width: 24 }} />
        <Group gap={6}>
          {slides.map((_, i) => (
            <Box
              key={i}
              onClick={() => goTo(i)}
              role="button"
              tabIndex={0}
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background:
                  i === index ? "var(--black-100)" : "var(--white-300)",
                transition: "all 220ms ease",
                cursor: "pointer",
              }}
            />
          ))}
        </Group>
        <Group gap={6} style={{ marginRight: 10 }}>
          <ActionIcon
            size={20}
            radius="6"
            onClick={prev}
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
            radius="6"
            onClick={next}
            style={{
              background: "var(--white-200)",
              opacity: isLastSlide ? 0.5 : 1,
              pointerEvents: isLastSlide ? "none" : "auto",
            }}
          >
            <IconChevronRight size={12} color="var(--black-100)" />
          </ActionIcon>
          <ActionIcon
            size={20}
            radius="6"
            onClick={togglePlayPause}
            style={{ background: "var(--white-200)" }}
          >
            {isPlaying ? (
              <PauseIcon width={11} height={11} color="var(--black-100)" />
            ) : (
              <PlayIcon width={11} height={11} color="var(--black-100)" />
            )}
          </ActionIcon>
        </Group>
      </Group>
    </Box>
  );
}
