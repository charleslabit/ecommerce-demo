import { ProductForm } from "@/component/Product/ProductForm";
import { ProductTable } from "@/component/Product/ProductTable";
import {
  useCreateProduct,
  useDeleteProduct,
  useProducts,
  useUpdateProduct,
} from "@/hooks";
import { FileProps, Product } from "@/types";
import { Button, Group, Modal, Stack, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";

const PAGE_SIZE = 15;

export const AdminProducts = () => {
  const { products, isLoading, isError } = useProducts({ categoryId: "" });
  const { mutate: createProduct } = useCreateProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  const { mutate: deleteProduct } = useDeleteProduct();
  const [previewImage, setPreviewImage] = useState<FileProps | null>(null);

  const [page, setPage] = useState(1);
  const [records, setRecords] = useState<Product[]>([]);
  const [modal, setModal] = useState<{
    open: boolean;
    action: "view" | "edit" | "delete" | "create" | null;
    product: Product | null;
  }>({ open: false, action: null, product: null });

  useEffect(() => {
    if (products) {
      setRecords(products.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE));
    }
  }, [page, products]);

  if (isError) return <Text color="red">Failed to load products.</Text>;

  const handleImageChange = (file: FileProps) => {
    if (!file) return;
    setPreviewImage(file);
  };

  return (
    <Stack>
      <Group justify="right" mb={20}>
        <Button
          leftSection={<IconPlus />}
          onClick={() =>
            setModal({ open: true, action: "create", product: null })
          }
        >
          Create Product
        </Button>
      </Group>
      <ProductTable
        records={records}
        page={page}
        pageSize={PAGE_SIZE}
        totalRecords={products?.length}
        isLoading={isLoading}
        onPageChange={setPage}
        openModal={(action, product) => {
          setModal({ open: true, action, product });
          setPreviewImage(null);
        }}
      />
      <Modal
        opened={modal.open}
        onClose={() => setModal({ open: false, action: null, product: null })}
        title={
          modal.action === "create"
            ? "Create Product"
            : modal.action === "edit"
            ? "Edit Product"
            : modal.action === "delete"
            ? "Delete Product"
            : "Product Details"
        }
        centered
      >
        {/* VIEW PRODUCT (Read-Only Form) */}
        {modal.action === "view" && modal.product && (
          <Stack>
            <ProductForm
              initialValues={modal.product}
              onSubmit={() => {}}
              previewImage={modal.product.imageUrls[0]} // Set previewImage
              readOnly
              handleImageChange={() => {}}
            />

            <Group justify="right">
              <Button
                variant="outline"
                onClick={() =>
                  setModal({ open: false, action: null, product: null })
                }
              >
                Close
              </Button>
            </Group>
          </Stack>
        )}

        {/* CREATE PRODUCT */}
        {modal.action === "create" && (
          <ProductForm
            initialValues={{
              categoryId: "",
              name: "",
              description: "",
              imageUrls: [],
              stock: 0,
              price: 0,
            }}
            onSubmit={(values) => {
              createProduct(values, {
                onSuccess: () => {
                  setModal({ open: false, action: null, product: null });
                  notifications.show({
                    title: "Success",
                    message: "Product created successfully.",
                  });
                },
              });
            }}
            previewImage={previewImage}
            handleImageChange={handleImageChange}
            onCancel={() =>
              setModal({ open: false, action: null, product: null })
            }
          />
        )}

        {/* EDIT PRODUCT */}
        {modal.action === "edit" && modal.product && (
          <ProductForm
            initialValues={modal.product}
            onSubmit={(values) => {
              updateProduct(
                { ...modal.product, ...values },
                {
                  onSuccess: () => {
                    setModal({ open: false, action: null, product: null });
                    notifications.show({
                      title: "Success",
                      message: "Product updated successfully.",
                    });
                  },
                }
              );
            }}
            previewImage={
              previewImage ? previewImage : modal.product.imageUrls[0]
            }
            handleImageChange={handleImageChange}
            onCancel={() =>
              setModal({ open: false, action: null, product: null })
            }
          />
        )}

        {/* DELETE PRODUCT */}
        {modal.action === "delete" && modal.product && (
          <Stack>
            <Text fz={18}>Are you sure you want to delete this product?</Text>
            <Group justify="right">
              <Button
                variant="outline"
                onClick={() =>
                  setModal({ open: false, action: null, product: null })
                }
              >
                Cancel
              </Button>
              <Button
                color="red"
                onClick={() => {
                  deleteProduct(modal.product!.id, {
                    onSuccess: () => {
                      const updatedTotal = (products?.length || 1) - 1;
                      const lastPage = Math.ceil(updatedTotal / PAGE_SIZE) || 1;
                      setPage((prevPage) =>
                        prevPage > lastPage ? lastPage : prevPage
                      );

                      setModal({ open: false, action: null, product: null });
                      notifications.show({
                        title: "Success",
                        message: "Product deleted successfully.",
                      });
                    },
                  });
                }}
              >
                Delete
              </Button>
            </Group>
          </Stack>
        )}
      </Modal>
    </Stack>
  );
};
