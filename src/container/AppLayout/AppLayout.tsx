"use client";
import { AppShell, Stack } from "@mantine/core";
import { Footer } from "../Footer";
import { Header } from "../Header";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      padding="md"
      header={{
        height: 120,
      }}
    >
      <AppShell.Header p={"md"}>
        <Header />
      </AppShell.Header>

      <AppShell.Main maw={1440} m="Auto">
        <Stack gap={100} mb={100}>
          {children}
        </Stack>
      </AppShell.Main>
      <AppShell.Footer p="md">
        <Footer />
      </AppShell.Footer>
    </AppShell>
  );
}
