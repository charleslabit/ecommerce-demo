import { Product } from "@/types";
import { getImageSrc } from "@/util";
import { ActionIcon, Box, Group } from "@mantine/core";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { DataTable } from "mantine-datatable";
import Image from "next/image";

type ProductTableProps = {
  records: Product[];
  page: number;
  pageSize: number;
  totalRecords?: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;
  openModal: (action: "view" | "edit" | "delete", product: Product) => void;
};

export const ProductTable = ({
  records,
  page,
  pageSize,
  totalRecords,
  isLoading,
  onPageChange,
  openModal,
}: ProductTableProps) => (
  <DataTable
    withColumnBorders
    withTableBorder
    columns={[
      { accessor: "id" },
      { accessor: "name" },
      {
        accessor: "imageUrl",
        title: "Image",
        render: (product) => (
          <Image
            alt={product.name}
            height={100}
            width={100}
            src={getImageSrc(product.imageUrls[0])}
          />
        ),
      },
      {
        accessor: "actions",
        title: <Box mr={6}>Actions</Box>,
        textAlign: "center",
        width: 110,
        render: (product) => (
          <Group gap={4} justify="right" wrap="nowrap">
            <ActionIcon
              variant="subtle"
              color="green"
              onClick={() => openModal("view", product)}
            >
              <IconEye />
            </ActionIcon>
            <ActionIcon
              variant="subtle"
              color="blue"
              onClick={() => openModal("edit", product)}
            >
              <IconEdit />
            </ActionIcon>
            <ActionIcon
              variant="subtle"
              color="red"
              onClick={() => openModal("delete", product)}
            >
              <IconTrash />
            </ActionIcon>
          </Group>
        ),
      },
    ]}
    records={records}
    fetching={isLoading}
    totalRecords={totalRecords}
    recordsPerPage={pageSize}
    page={page}
    onPageChange={onPageChange}
  />
);
