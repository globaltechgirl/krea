import "@/App.css"; 
import { MantineProvider } from "@mantine/core";
import { RouterProvider } from "react-router-dom";
import router from "@/router/routes";

function App() {
  return (
    <MantineProvider defaultColorScheme="light">
      <RouterProvider router={router} />
    </MantineProvider>
  );
}

export default App;