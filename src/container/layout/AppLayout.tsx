"use client";
import { AppShell, Stack } from "@mantine/core";
import { Session } from "next-auth";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function Layout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  return (
    <AppShell
      padding="md"
      header={{
        height: 120,
      }}
    >
      <AppShell.Header p={"md"}>
        <Header session={session} />
      </AppShell.Header>

      <AppShell.Main maw={1440} m="Auto">
        <Stack gap={100} mb={100}>
          {children}
        </Stack>
      </AppShell.Main>
      <AppShell.Footer p="md" pos="relative">
        <Footer />
      </AppShell.Footer>
    </AppShell>
  );
}
