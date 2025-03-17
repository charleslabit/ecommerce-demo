import { UploadImage } from "@/component/";
import {
  useCategories,
  useCreateCategory,
  useDeleteCategory,
  useUpdateCategory,
} from "@/hooks";
import { Category, FileProps } from "@/types";
import { getImageSrc } from "@/util";
import {
  ActionIcon,
  Alert,
  Box,
  Button,
  Center,
  Group,
  Modal,
  Stack,
  TableTd,
  TableTr,
  Text,
  TextInput,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  IconEdit,
  IconEye,
  IconGripVertical,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import { DataTable } from "mantine-datatable";
import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";

// 🟢 Import DnD-Kit utilities
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useQueryClient } from "@tanstack/react-query";

const PAGE_SIZE = 15;

export const AdminCategories = () => {
  const queryClient = useQueryClient();
  const { data: categories, isLoading, isError } = useCategories();
  const { mutate: mutateCreateCategory } = useCreateCategory();
  const { mutate: mutateUpdateCategory } = useUpdateCategory();
  const { mutate: mutateDeleteCategory } = useDeleteCategory();

  const [page, setPage] = useState(1);
  const [records, setRecords] = useState<Category[]>([]);
  const [modal, setModal] = useState<{
    open: boolean;
    action: "view" | "edit" | "delete" | "create" | null;
  }>({
    open: false,
    action: null,
  });
  const [category, setCategory] = useState<Category | null>(null);
  const [previewImage, setPreviewImage] = useState<FileProps | null>(null);
  // 🟢 Setup sensors for dragging
  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    if (categories) {
      setRecords(categories.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE));
    }
  }, [page, categories]);

  if (isError) return <Alert color="red">Failed to load categories.</Alert>;

  const openModal = (
    action: "view" | "edit" | "delete" | "create",
    category?: Category
  ) => {
    setModal({ open: true, action });

    if (action === "create") {
      setCategory({ id: "", name: "", imageUrl: "" }); // ✅ Initialize an empty category
      setPreviewImage(null);
    } else if (category) {
      setCategory(category);
      setPreviewImage(category.imageUrl || "/default/user-default.png");
    }
  };

  const closeModal = () => {
    setModal({ open: false, action: null });
    setCategory(null);
    setPreviewImage(null);
  };

  const handleImageChange = (file: FileProps) => {
    if (!file) return;
    setPreviewImage(file);
    setCategory((prev) =>
      prev
        ? {
            ...prev,
            imageUrl: URL.createObjectURL(file as Blob),
            imageFile: file,
          }
        : null
    );
  };

  const handleSaveChanges = () => {
    if (!category) return;
    // Ensure the image is provided
    if (!category.imageUrl)
      return notifications.show({
        title: "Error",
        message: "Image is required.",
        color: "red",
      });

    mutateUpdateCategory(category, {
      onSuccess: (updatedCategory) => {
        setRecords((prev) =>
          prev.map((cat) =>
            cat.id === updatedCategory.id ? updatedCategory : cat
          )
        );
        notifications.show({
          title: "Success",
          message: "Category updated successfully.",
          color: "green",
        });
        closeModal();
      },
      onError: (error) => {
        notifications.show({
          title: "Error",
          message: error?.message || "Failed to update category.",
          color: "red",
        });
      },
    });
  };

  const handleDeleteCategory = () => {
    if (!category) return;
    mutateDeleteCategory(category.id, {
      onSuccess: () => {
        setRecords((prev) => prev.filter((cat) => cat.id !== category.id));
        notifications.show({
          title: "Success",
          message: "Category deleted successfully.",
          color: "green",
        });
        closeModal();
      },
      onError: (error) => {
        notifications.show({
          title: "Error",
          message: error?.message || "Failed to delete category.",
          color: "red",
        });
      },
    });
  };

  const handleCreateCategory = () => {
    if (!category) return;
    mutateCreateCategory(category, {
      onSuccess: (newCategory) => {
        setRecords((prev) => [newCategory, ...prev]);
        notifications.show({
          title: "Success",
          message: "Category created successfully.",
          color: "green",
        });
        closeModal();
      },
      onError: (error) => {
        notifications.show({
          title: "Error",
          message: error?.message || "Failed to create category.",
          color: "red",
        });
      },
    });
  };

  // 🟢 Handle reordering after drag
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    queryClient.setQueryData(
      ["categories"],
      (oldData: Category[] | undefined) => {
        if (!oldData) return oldData;

        const oldIndex = oldData.findIndex((item) => item.id === active.id);
        const newIndex = oldData.findIndex((item) => item.id === over.id);

        if (oldIndex === -1 || newIndex === -1) return oldData; // Prevents errors

        return arrayMove(oldData, oldIndex, newIndex); // ✅ Updates the cached data
      }
    );
  };

  return (
    <Stack>
      <Group justify="right" mb={20}>
        <Button leftSection={<IconPlus />} onClick={() => openModal("create")}>
          Create Category
        </Button>
      </Group>
      <Modal
        opened={modal.open}
        onClose={closeModal}
        title="Category Details"
        centered
      >
        {modal.action === "create" || modal.action === "edit" ? (
          <Stack>
            <Center mt={15}>
              <UploadImage file={previewImage} setFile={handleImageChange} />
            </Center>
            <TextInput
              defaultValue={category?.name}
              label="Category Name"
              onBlur={(e) => {
                setCategory((prev) =>
                  prev ? { ...prev, name: e.target.value } : null
                );
              }}
            />
            <Group mt="md" justify="end">
              <Button variant="default" onClick={closeModal}>
                Cancel
              </Button>
              <Button
                color="blue"
                onClick={
                  modal.action === "create"
                    ? handleCreateCategory
                    : handleSaveChanges
                }
              >
                Save
              </Button>
            </Group>
          </Stack>
        ) : modal.action === "delete" ? (
          <Stack>
            <Text fz={18}>
              Are you sure you want to delete {category?.name}?
            </Text>
            <Group mt="md" justify="end">
              <Button variant="default" onClick={closeModal}>
                Cancel
              </Button>
              <Button color="red" onClick={handleDeleteCategory}>
                Delete
              </Button>
            </Group>
          </Stack>
        ) : modal.action === "view" && category ? (
          <>
            <Center>
              <Image
                alt={category.name}
                height={100}
                width={100}
                src={category.imageUrl || "/default/user-default.png"}
              />
            </Center>
            <Text fz={18}>ID: {category.id}</Text>
            <Text fz={18}>Name: {category.name}</Text>
          </>
        ) : null}
      </Modal>
      {/* 🟢 DndContext manages drag events */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={records.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          <DataTable
            withColumnBorders
            withTableBorder
            columns={[
              // add empty header column for the drag handle
              { accessor: "", hiddenContent: true, width: 30 },
              { accessor: "id" },
              { accessor: "name" },
              {
                accessor: "imageUrl",
                title: "Image",
                render: (category) => (
                  <Image
                    alt={category.name}
                    height={100}
                    width={100}
                    src={getImageSrc(category?.imageUrl)}
                  />
                ),
              },
              {
                accessor: "actions",
                title: <Box mr={6}>Actions</Box>,
                textAlign: "center",
                width: 110,
                render: (category) => (
                  <Group gap={4} justify="right" wrap="nowrap">
                    <ActionIcon
                      variant="subtle"
                      color="green"
                      onClick={() => openModal("view", category)}
                    >
                      <IconEye />
                    </ActionIcon>
                    <ActionIcon
                      variant="subtle"
                      color="blue"
                      onClick={() => openModal("edit", category)}
                    >
                      <IconEdit />
                    </ActionIcon>
                    <ActionIcon
                      variant="subtle"
                      color="red"
                      onClick={() => openModal("delete", category)}
                    >
                      <IconTrash />
                    </ActionIcon>
                  </Group>
                ),
              },
            ]}
            records={records}
            fetching={isLoading}
            totalRecords={categories?.length}
            recordsPerPage={PAGE_SIZE}
            page={page}
            onPageChange={setPage}
            rowFactory={({ record, index, children }) => (
              <SortableRow key={index} row={record}>
                {children}
              </SortableRow>
            )}
          />
        </SortableContext>
      </DndContext>
    </Stack>
  );
};
// 🟢 Sortable Row Component
const SortableRow = ({
  row,
  children,
}: {
  row: Category;
  children: ReactNode;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: row.id });
  return (
    <TableTr
      ref={setNodeRef}
      style={{
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
        transition,
      }}
    >
      {/* 🟢 Drag Handle (Only This Part is Draggable) */}
      <TableTd
        {...attributes}
        {...listeners}
        style={{ cursor: "grab", width: 30 }}
      >
        <IconGripVertical />
      </TableTd>
      {children}
    </TableTr>
    // <tr
    //   ref={setNodeRef}
    //   {...attributes}
    //   {...listeners}
    //   style={{
    //     transform: transform
    //       ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
    //       : undefined,
    //     transition,
    //     cursor: "grab",
    //   }}
    // >
    //   {children}
    // </tr>
  );
};
