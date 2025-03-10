import { ActionIcon, Modal, TextInput } from "@mantine/core";
import { useDebouncedCallback, useMediaQuery } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { useQueryState } from "nuqs";
import { useState } from "react";

export const Search = () => {
  const isMobile = useMediaQuery("(max-width: 900px)");
  const [search, setSearch] = useQueryState("search", {
    defaultValue: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);
  const handleSearch = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
    },
    250
  );
  return (
    <>
      <Modal opened={isOpen} onClose={onClose} withCloseButton={false}>
        <TextInput
          defaultValue={search}
          placeholder="Search"
          onChange={handleSearch}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              onClose();
            }
          }}
          rightSection={<IconSearch />}
        />
      </Modal>

      {isMobile ? (
        <ActionIcon variant="transparent" size="lg" onClick={onOpen}>
          <IconSearch />
        </ActionIcon>
      ) : (
        <TextInput
          onClick={onOpen}
          value={search}
          placeholder="Search"
          onChange={handleSearch}
          rightSection={<IconSearch />}
          readOnly
        />
      )}
    </>
  );
};
