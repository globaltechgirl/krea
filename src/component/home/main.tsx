import { Stack } from "@mantine/core";
import Features from "@/component/home/features";
import Generate from "@/component/home/generate";
import Gallery from "@/component/home/gallery";

const Main = () => {
  return (
    <Stack gap={30} py={120}>
      <Features />
      <Generate />
      <Gallery />
    </Stack>
  );
};

export default Main;
