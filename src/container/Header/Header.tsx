import useCartStore from "@/store/cart";
import {
  ActionIcon,
  Center,
  Flex,
  Group,
  Indicator,
  Text,
  TextInput,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Spotlight, SpotlightActionData, spotlight } from "@mantine/spotlight";
import {
  IconDashboard,
  IconFileText,
  IconHome,
  IconSearch,
  IconShoppingCart,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";

const actions: SpotlightActionData[] = [
  {
    id: "home",
    label: "Home",
    description: "Get to home page",
    onClick: () => console.log("Home"),
    leftSection: <IconHome size={24} stroke={1.5} />,
  },
  {
    id: "dashboard",
    label: "Dashboard",
    description: "Get full information about current system status",
    onClick: () => console.log("Dashboard"),
    leftSection: <IconDashboard size={24} stroke={1.5} />,
  },
  {
    id: "documentation",
    label: "Documentation",
    description: "Visit documentation to lean more about all features",
    onClick: () => console.log("Documentation"),
    leftSection: <IconFileText size={24} stroke={1.5} />,
  },
];

export const Header = () => {
  const isMobile = useMediaQuery("(max-width: 900px)");
  const router = useRouter();
  const { cartItems } = useCartStore();

  const onClickHome = () => router.push("/"); // Resets URL to base path
  const onClickCart = () => router.push("/cart");

  return (
    <Center h="100%">
      <Spotlight
        actions={actions}
        nothingFound="Nothing found..."
        highlightQuery
        searchProps={{
          leftSection: <IconSearch size={20} stroke={1.5} />,
          placeholder: "Search...",
        }}
      />
      <Flex justify="space-between" align={"center"} w={900}>
        <Text onClick={onClickHome} className="cursor-pointer">
          Lazapee
        </Text>
        <Group>
          {isMobile ? (
            <ActionIcon
              variant="transparent"
              size="lg"
              onClick={spotlight.open}
            >
              <IconSearch />
            </ActionIcon>
          ) : (
            <TextInput
              onClick={spotlight.open}
              placeholder="Search for items"
              w={700}
              rightSection={<IconSearch />}
            />
          )}
          <Indicator label={cartItems?.length}>
            <ActionIcon variant="transparent" onClick={onClickCart}>
              <IconShoppingCart size={100} />
            </ActionIcon>
          </Indicator>
        </Group>
      </Flex>
    </Center>
  );
};
