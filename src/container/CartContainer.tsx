import { Checkout, HorizontalCounter } from "@/component";
import useCartStore from "@/store/cart";
import { FormattedNumber } from "@/util";
import {
  Button,
  Card,
  Grid,
  Group,
  Image,
  Stack,
  Text,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState } from "react";

const STATIC_SHIPPING_FEE = 45;
const STATIC_VOUCHER_CODE = "ILOVECK";

export const CartContainer = () => {
  const { cartItems, updateCartItem } = useCartStore();
  // Initialize quantities with cart data
  const [quantities, setQuantities] = useState(
    cartItems.reduce((acc, item) => {
      acc[item.productId] = item.quantity; // Pre-fill with initial quantities
      return acc;
    }, {} as Record<string, number>)
  );
  const [code, setCode] = useState("");
  const [hasEnableVoucher, setHasEnableVoucher] = useState(false);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
  // Handle quantity changes
  const handleQuantityChange = (productId: string, value: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: value,
    }));

    // Optional: Update the cart store immediately (if needed)
    updateCartItem(productId, value);
  };

  const onApply = () => {
    if (code !== STATIC_VOUCHER_CODE)
      return (
        notifications.show({ title: "Error", message: "Invalid code." }),
        setHasEnableVoucher(false)
      );
    notifications.show({ title: "Success", message: "Applied successfully." });
    setHasEnableVoucher(true);
  };

  const onReset = () => {
    setCode("");
    setHasEnableVoucher(false);
  };

  return (
    <Grid columns={3}>
      <Grid.Col span={2} style={{ overflowY: "auto", maxHeight: "100vh" }}>
        <Stack>
          {cartItems?.map((cart, i) => {
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
                    <Stack key={i} w={400}>
                      <Text fw="bold">{cart?.name}</Text>
                      <Text mt={10} fz={18}>
                        Description
                      </Text>
                    </Stack>
                  </Group>
                  <Group>
                    <Text c="orange">₱{FormattedNumber(cart?.price)}</Text>
                    <HorizontalCounter
                      value={quantities[cart.productId] || 0}
                      onChange={(value) => {
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
              <Tooltip
                label={`Use ${STATIC_VOUCHER_CODE} to get free shipping`}
              >
                <TextInput
                  value={code}
                  disabled={hasEnableVoucher}
                  placeholder="Enter Voucher Code"
                  onChange={(e) => setCode(e.target.value)}
                />
              </Tooltip>
              {hasEnableVoucher ? (
                <Button onClick={onReset}>Reset</Button>
              ) : (
                <Button onClick={onApply}>Apply</Button>
              )}
            </Group>
            <Group justify="space-between">
              <Text fz={18}>Shipping Fee</Text>
              <Text
                c="orange"
                td={hasEnableVoucher ? "line-through" : undefined}
                fz={18}
              >
                P{STATIC_SHIPPING_FEE.toFixed(2)}
              </Text>
            </Group>

            <Group justify="space-between">
              <Text fz={18}>Total</Text>
              <Text c="orange" fz={18}>
                P
                {FormattedNumber(
                  totalPrice + (hasEnableVoucher ? 0 : STATIC_SHIPPING_FEE)
                )}
              </Text>
            </Group>
            <Checkout />
          </Stack>
        </Card>
      </Grid.Col>
    </Grid>
  );
};
