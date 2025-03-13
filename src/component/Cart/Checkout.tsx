import { Button } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";

export const Checkout = () => {
  const openModal = () =>
    modals.openConfirmModal({
      title: "Please confirm",
      children: "Do you want to checkout?",
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onConfirm: () =>
        notifications.show({
          title: "Success",
          message: "Thank you for your purchase.",
        }),
    });
  return <Button onClick={openModal}>Proceed to Checkout</Button>;
};
