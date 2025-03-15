import { Center, Image } from "@mantine/core";

export const Empty = () => {
  return (
    <Center h={300}>
      <Image h={300} src={"/default/notfound.webp"} alt="Empty Data" />
    </Center>
  );
};
