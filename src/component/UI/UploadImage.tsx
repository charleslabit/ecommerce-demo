import { FileProps } from "@/types";
import {
  ActionIcon,
  Box,
  Center,
  FileButton,
  Group,
  Image,
  Paper,
  UnstyledButton,
} from "@mantine/core";
import { IconCircleX, IconPhotoPlus } from "@tabler/icons-react";
import { useMemo } from "react";
import classes from "./UploadImage.module.css";

export const UploadImage = ({
  file,
  setFile,
  height = 120,
}: {
  file: FileProps; // File or URL
  setFile: (file: FileProps) => void;
  height?: number | string;
}) => {
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
  };

  const renderImage = (src: string) => (
    <Box className="cursor-pointer" pos="relative" h={height}>
      <Image height="100%" src={src} fit="contain" />
      <ActionIcon
        pos="absolute"
        top={-15}
        right={-15}
        color="red"
        variant="transparent"
        onClick={handleRemove}
        className={classes.close}
      >
        <IconCircleX color="red" />
      </ActionIcon>
    </Box>
  );

  const ImageDisplay = useMemo(() => {
    if (file instanceof File) return renderImage(URL.createObjectURL(file));
    if (file) return renderImage(file);
    return (
      <UnstyledButton>
        <Paper withBorder bg="#F8F9FA">
          <Center w={120} h={120}>
            <IconPhotoPlus strokeWidth={0.5} size={48} />
          </Center>
        </Paper>
      </UnstyledButton>
    );
  }, [file]);

  return (
    <Group className="cursor-pointer">
      <FileButton onChange={setFile} accept="image/png,image/jpeg">
        {(fileProps) => (
          <Box {...fileProps} id="FileUpload">
            {ImageDisplay}
          </Box>
        )}
      </FileButton>
    </Group>
  );
};
