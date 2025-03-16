"use client";

import { HomeLogo, Search, ThemeSettings } from "@/component";
import { guestLogin, login, logout } from "@/lib/auth";
import useCartStore from "@/store/cart";
import {
  ActionIcon,
  Box,
  Button,
  Center,
  Flex,
  Group,
  Indicator,
  Menu,
  Text,
} from "@mantine/core";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconLogout2,
  IconShoppingCart,
  IconUser,
} from "@tabler/icons-react";
import { Session, User } from "next-auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DEFAULT_AVATAR =
  "https://img.freepik.com/free-vector/fresh-purple-eggplant_24877-82136.jpg?ga=GA1.1.484030290.1741493567&semt=ais_hybrid";

export const Header = ({ session }: { session: Session | null }) => {
  const router = useRouter();
  const { cartItems } = useCartStore();
  const [guestSession, setGuestSession] = useState<{ user: User } | null>(null);
  const currentUser = guestSession || session; // Use guest session if available

  const handleLogin = async (provider: string) => {
    await login(provider);
  };

  const handleGuestLogin = async () => {
    const guest = await guestLogin();
    setGuestSession(guest); // Store guest session
  };

  const handleLogout = async () => {
    setGuestSession(null);
    await logout();
  };

  const onClickCart = () => router.push("/cart");

  return (
    <Center h="100%">
      <Box pos="absolute" right={10} top={0}>
        {!currentUser ? (
          <LoginMenu onLogin={handleLogin} onGuestLogin={handleGuestLogin} />
        ) : (
          <UserMenu user={currentUser.user} onLogout={handleLogout} />
        )}
      </Box>
      <Flex justify="space-between" align="center" w={900}>
        <HomeLogo />
        <Group>
          <Search />
          <Indicator
            disabled={cartItems.length < 1}
            label={cartItems.length}
            size={15}
          >
            <ActionIcon
              variant="transparent"
              onClick={onClickCart}
              mt={5}
              data-testid="cart-icon"
            >
              <IconShoppingCart size={100} />
            </ActionIcon>
          </Indicator>
          <ThemeSettings />
        </Group>
      </Flex>
    </Center>
  );
};

//  Extracted Login Menu for cleaner JSX
const LoginMenu = ({
  onLogin,
  onGuestLogin,
}: {
  onLogin: (provider: string) => void;
  onGuestLogin: () => void;
}) => (
  <Menu shadow="md" width={200} trigger="click-hover">
    <Menu.Target>
      <Button variant="transparent">Sign In</Button>
    </Menu.Target>
    <Menu.Dropdown>
      <Menu.Item
        leftSection={<IconBrandGithub />}
        onClick={() => onLogin("github")}
      >
        Sign in with GitHub
      </Menu.Item>
      <Menu.Item
        leftSection={<IconBrandGoogle />}
        onClick={() => onLogin("google")}
      >
        Sign in with Google
      </Menu.Item>
      <Menu.Item leftSection={<IconUser />} onClick={onGuestLogin}>
        Sign in as Guest
      </Menu.Item>
    </Menu.Dropdown>
  </Menu>
);

// Extracted User Menu for better readability
const UserMenu = ({
  user,
  onLogout,
}: {
  user: User | undefined;
  onLogout: () => void;
}) => (
  <Menu shadow="md" width={200} trigger="click-hover">
    <Menu.Target>
      <Group gap={0} align="end" className="cursor-pointer">
        <Text fz={18} mr={10}>
          {user?.name ?? "User"}
        </Text>
        <Image
          src={user?.image || DEFAULT_AVATAR}
          alt="User Profile"
          height={35}
          width={35}
          objectFit="contain"
        />
      </Group>
    </Menu.Target>
    <Menu.Dropdown>
      <Menu.Item leftSection={<IconLogout2 />} onClick={onLogout}>
        Logout
      </Menu.Item>
    </Menu.Dropdown>
  </Menu>
);
