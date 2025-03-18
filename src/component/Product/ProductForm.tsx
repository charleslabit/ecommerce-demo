import { UploadImage } from "@/component";
import { useCategories } from "@/hooks";
import { FileProps, ProductInput } from "@/types";
import {
  Button,
  Center,
  Group,
  NumberInput,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import Image from "next/image";

type ProductFormProps = {
  initialValues: ProductInput;
  onSubmit: (values: ProductInput) => void;
  previewImage: FileProps | null;
  handleImageChange: (file: FileProps) => void;
  onCancel?: () => void;
  readOnly?: boolean;
};

export const ProductForm = ({
  initialValues,
  onSubmit,
  previewImage,
  handleImageChange,
  onCancel,
  readOnly,
}: ProductFormProps) => {
  const { data: categories } = useCategories();
  const form = useForm<ProductInput>({
    initialValues,
  });
  const imageSrc =
    typeof previewImage === "string"
      ? previewImage
      : previewImage
      ? URL.createObjectURL(previewImage)
      : null;
  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack>
        <Center mt={15}>
          {readOnly ? (
            imageSrc ? (
              <Image
                src={imageSrc}
                alt="Product Image"
                height={120}
                width={120}
              />
            ) : (
              <Text>No image available</Text>
            )
          ) : (
            <UploadImage file={previewImage} setFile={handleImageChange} />
          )}
        </Center>
        <TextInput
          label="Name"
          {...form.getInputProps("name")}
          required
          disabled={readOnly}
        />
        <Select
          label="Category"
          {...form.getInputProps("categoryId")}
          data={categories?.map((category) => ({
            value: category?.id,
            label: category?.name,
          }))}
          searchable
          clearable
          required
          disabled={readOnly}
        />
        <TextInput
          label="Description"
          {...form.getInputProps("description")}
          disabled={readOnly}
        />
        <NumberInput
          label="Stock"
          {...form.getInputProps("stock")}
          disabled={readOnly}
        />
        <NumberInput
          label="Price"
          {...form.getInputProps("price")}
          disabled={readOnly}
        />
        {!readOnly && (
          <Group mt="md" justify="end">
            <Button variant="default" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </Group>
        )}
      </Stack>
    </form>
  );
};
