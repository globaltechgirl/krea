import { AppShell } from "@mantine/core";
import { Outlet } from "react-router-dom";
import Header from "@/component/layout/header"; 
import Footer from "@/component/layout/footer"; 

const PrivateLayout = () => {
  return (
    <AppShell
      header={{ height: 60 }}
      styles={{
        main: {
          minHeight: "100vh",
          padding: 0,
          backgroundColor: "var(--background)",
        },
        header: {
          backgroundColor: "transparent",
          borderBottom: "none",
          boxShadow: "none",
        },
        footer: {
          backgroundColor: "var(--background)",
          border: "none",
          position: "relative",
        },
      }}
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>

      <AppShell.Footer>
        <Footer />
      </AppShell.Footer>
    </AppShell>
  );
};

export default PrivateLayout;
