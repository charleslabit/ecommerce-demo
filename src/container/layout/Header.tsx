import { HomeLogo, Search, ThemeSettings } from "@/component";
import useCartStore from "@/store/cart";
import { ActionIcon, Center, Flex, Group, Indicator } from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();
  const { cartItems } = useCartStore();

  const onClickCart = () => router.push("/cart");

  return (
    <Center h="100%">
      <Flex justify="space-between" align={"center"} w={900}>
        <HomeLogo />

        <Group>
          <Search />
          <Indicator
            disabled={cartItems?.length < 1}
            label={cartItems?.length}
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
