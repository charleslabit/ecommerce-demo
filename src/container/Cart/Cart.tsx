import { HorizontalCounter } from "@/component";
import useCartStore from "@/store/cart";
import {
  Button,
  Card,
  Grid,
  Group,
  Image,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useState } from "react";

export const Cart = () => {
  const { cartItems, updateCartItem } = useCartStore();
  // Initialize quantities with cart data
  const [quantities, setQuantities] = useState(
    cartItems.reduce((acc, item) => {
      acc[item.productId] = item.quantity; // Pre-fill with initial quantities
      return acc;
    }, {} as Record<string, number>)
  );
  console.log(quantities);
  // Handle quantity changes
  const handleQuantityChange = (productId: string, value: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: value,
    }));

    // Optional: Update the cart store immediately (if needed)
    updateCartItem(productId, value);
  };
  console.log(cartItems);

  return (
    <Grid columns={3}>
      <Grid.Col span={2}>
        <Stack>
          {cartItems?.map((cart, i) => {
            console.log("mapp", quantities[cart.productId]);
            return (
              <Card key={cart?.productId} withBorder m="auto" w="100%">
                <Group justify="space-between">
                  <Group>
                    <Card w={100} ta="center" m="auto">
                      <Image
                        className="fade-in hover-effect cursor-pointer"
                        radius="25%"
                        height={100}
                        src={cart?.imageUrl}
                        alt={cart?.productId}
                        loading="lazy"
                      />
                    </Card>
                    <Stack key={i} w={500}>
                      <Text fw="bold">{cart?.name}</Text>
                      <Text mt={10} fz={18}>
                        Descriprion
                      </Text>
                    </Stack>
                  </Group>
                  <Group>
                    <Text c="orange">₱{cart?.price?.toFixed(2)}</Text>
                    <HorizontalCounter
                      value={quantities[cart.productId] || 0}
                      onChange={(value) => {
                        console.log("setting", value);
                        handleQuantityChange(cart.productId, value);
                      }}
                      numberInputProps={{
                        min: 0,
                        max: 99,
                      }}
                    />
                  </Group>
                </Group>
              </Card>
            );
          })}
        </Stack>
      </Grid.Col>
      <Grid.Col span={1}>
        <Card h="100%" withBorder>
          <Stack>
            <Text fw={"bold"} fz={20}>
              Order Summary
            </Text>
            <Group>
              <TextInput placeholder="Enter Voucher Code" />
              <Button>Apply</Button>
            </Group>
            <Group justify="space-between">
              <Text fz={18}>Shipping Fee</Text>
              <Text c="orange" fz={18}>
                P45.00
              </Text>
            </Group>

            <Group justify="space-between">
              <Text fz={18}>Total</Text>
              <Text c="orange" fz={18}>
                P339.29
              </Text>
            </Group>
            <Button>Proceed to Checkout</Button>
          </Stack>
        </Card>
      </Grid.Col>
    </Grid>
  );
};
