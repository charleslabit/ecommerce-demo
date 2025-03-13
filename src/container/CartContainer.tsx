import { Checkout, HorizontalCounter } from "@/component";
import useCartStore from "@/store/cart";
import { FormattedNumber } from "@/util";
import {
  Button,
  Card,
  Checkbox,
  Grid,
  Group,
  Image,
  Stack,
  Text,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

//  Define CartItem Type
interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

const STATIC_SHIPPING_FEE = 45;
const STATIC_VOUCHER_CODE = "ILOVECK";

export const CartContainer = () => {
  const router = useRouter();
  const { cartItems, updateCartItem, removeCartItems } = useCartStore();

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>(
    Object.fromEntries(cartItems.map((item) => [item.productId, item.quantity]))
  );
  const [code, setCode] = useState<string>("");
  const [hasEnableVoucher, setHasEnableVoucher] = useState<boolean>(false);

  const totalPrice: number = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  const handleQuantityChange = (productId: string, value: number) => {
    setQuantities((prev) => ({ ...prev, [productId]: value }));
    updateCartItem(productId, value);
  };

  const toggleSelectItem = (productId: string) => {
    setSelectedItems((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleSelectAll = () => {
    setSelectedItems(
      selectedItems.length === cartItems.length
        ? []
        : cartItems.map((item) => item.productId)
    );
  };

  const removeSelectedItems = () => {
    if (!selectedItems.length) {
      return notifications.show({
        title: "Error",
        message: "No items selected.",
      });
    }
    modals.openConfirmModal({
      title: "Please confirm",
      children: "Do you want to remove selected items?",
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onConfirm: () => {
        removeCartItems(selectedItems);
        setSelectedItems([]);
        notifications.show({
          title: "Success",
          message: "Selected items removed.",
        });
      },
    });
  };

  const applyVoucher = () => {
    if (code !== STATIC_VOUCHER_CODE) {
      notifications.show({ title: "Error", message: "Invalid code." });
      return setHasEnableVoucher(false);
    }
    notifications.show({ title: "Success", message: "Voucher applied." });
    setHasEnableVoucher(true);
  };

  const continueShopping = () => router.push("/");

  return (
    <Grid columns={3}>
      <Grid.Col
        span={cartItems.length > 0 ? 2 : 3}
        style={{ overflowY: "auto", maxHeight: "100vh" }}
      >
        <Stack>
          {cartItems.length > 0 ? (
            <>
              <Group justify="space-between">
                <Checkbox
                  label="Select All"
                  checked={selectedItems.length === cartItems.length}
                  indeterminate={
                    selectedItems.length > 0 &&
                    selectedItems.length < cartItems.length
                  }
                  onChange={toggleSelectAll}
                />
                <Button
                  rightSection={<IconTrash />}
                  color="red"
                  onClick={removeSelectedItems}
                  disabled={!selectedItems.length}
                >
                  Remove Selected
                </Button>
              </Group>

              {cartItems.map((cart) => (
                <CartItemCard
                  key={cart.productId}
                  cart={cart}
                  isSelected={selectedItems.includes(cart.productId)}
                  onSelect={toggleSelectItem}
                  quantity={quantities[cart.productId] || 0}
                  onQuantityChange={handleQuantityChange}
                />
              ))}
            </>
          ) : (
            <Stack align="center" mt={50}>
              <Text size="xl" fw="bold" c="gray">
                There are no items in this cart.
              </Text>
              <Button size="lg" onClick={continueShopping}>
                Continue Shopping
              </Button>
            </Stack>
          )}
        </Stack>
      </Grid.Col>

      <Grid.Col span={1}>
        {cartItems.length > 0 && (
          <OrderSummary
            totalPrice={totalPrice}
            shippingFee={STATIC_SHIPPING_FEE}
            hasEnableVoucher={hasEnableVoucher}
            onApplyVoucher={applyVoucher}
            onResetVoucher={() => {
              setCode("");
              setHasEnableVoucher(false);
            }}
            voucherCode={code}
            setVoucherCode={setCode}
          />
        )}
      </Grid.Col>
    </Grid>
  );
};

// ✅ Extracted CartItemCard Component with Types
interface CartItemCardProps {
  cart: CartItem;
  isSelected: boolean;
  onSelect: (productId: string) => void;
  quantity: number;
  onQuantityChange: (productId: string, value: number) => void;
}

const CartItemCard: React.FC<CartItemCardProps> = ({
  cart,
  isSelected,
  onSelect,
  quantity,
  onQuantityChange,
}) => {
  return (
    <Card withBorder m="auto" w="100%">
      <Group justify="space-between">
        <Group>
          {/* Checkbox */}
          <Checkbox
            checked={isSelected}
            onChange={() => onSelect(cart.productId)}
          />

          {/* Product Image */}
          <Card w={100} ta="center" m="auto">
            <Image
              className="fade-in hover-effect cursor-pointer"
              radius="25%"
              height={100}
              src={cart.imageUrl}
              alt={cart.name}
              loading="lazy"
            />
          </Card>

          {/* Product Info */}
          <Stack w={400}>
            <Text fw="bold">{cart.name}</Text>
            <Text mt={10} fz={18}>
              Description
            </Text>
          </Stack>
        </Group>

        {/* Price & Counter */}
        <Group>
          <Text c="orange">₱{FormattedNumber(cart.price)}</Text>
          <HorizontalCounter
            value={quantity}
            onChange={(value) => onQuantityChange(cart.productId, value)}
            numberInputProps={{ min: 0, max: 99 }}
          />
        </Group>
      </Group>
    </Card>
  );
};

// ✅ Extracted OrderSummary Component with Types
interface OrderSummaryProps {
  totalPrice: number;
  shippingFee: number;
  hasEnableVoucher: boolean;
  onApplyVoucher: () => void;
  onResetVoucher: () => void;
  voucherCode: string;
  setVoucherCode: (code: string) => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  totalPrice,
  shippingFee,
  hasEnableVoucher,
  onApplyVoucher,
  onResetVoucher,
  voucherCode,
  setVoucherCode,
}) => {
  return (
    <Card h="100%" withBorder>
      <Stack>
        <Text fw={"bold"} fz={20}>
          Order Summary
        </Text>

        {/* Voucher Code */}
        <Group>
          <Tooltip label={`Use ${STATIC_VOUCHER_CODE} to get free shipping`}>
            <TextInput
              value={voucherCode}
              disabled={hasEnableVoucher}
              placeholder="Enter Voucher Code"
              onChange={(e) => setVoucherCode(e.target.value)}
            />
          </Tooltip>
          {hasEnableVoucher ? (
            <Button onClick={onResetVoucher}>Reset</Button>
          ) : (
            <Button onClick={onApplyVoucher}>Apply</Button>
          )}
        </Group>

        {/* Shipping Fee */}
        <Group justify="space-between">
          <Text fz={18}>Shipping Fee</Text>
          <Text
            c="orange"
            td={hasEnableVoucher ? "line-through" : undefined}
            fz={18}
          >
            P{shippingFee.toFixed(2)}
          </Text>
        </Group>

        {/* Total Price */}
        <Group justify="space-between">
          <Text fz={18}>Total</Text>
          <Text c="orange" fz={18}>
            P
            {FormattedNumber(totalPrice + (hasEnableVoucher ? 0 : shippingFee))}
          </Text>
        </Group>

        {/* Checkout */}
        <Checkout />
      </Stack>
    </Card>
  );
};
