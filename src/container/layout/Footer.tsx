import { HomeLogo } from "@/component";
import {
  ActionIcon,
  Card,
  Center,
  Grid,
  Group,
  Image,
  Stack,
  Text,
} from "@mantine/core";
import {
  IconBrandFacebookFilled,
  IconBrandGithubFilled,
  IconBrandLinkedinFilled,
  IconFileCv,
} from "@tabler/icons-react";

export const Footer = () => {
  return (
    <Center mb={50}>
      <Grid columns={3} w={1440}>
        <Grid.Col span={{ md: 2, sm: 3 }}>
          <Stack>
            <HomeLogo />
            <Text fz={18}>Contact Me</Text>
            <Group>
              <ActionIcon
                variant="transparent"
                component="a"
                href="/default/Charles-Kenneth-Labit-CV.pdf"
                target="_blank"
              >
                <IconFileCv />
              </ActionIcon>
              <ActionIcon
                variant="transparent"
                component="a"
                href="https://www.github.com/charleslabit"
                target="_blank"
              >
                <IconBrandGithubFilled />
              </ActionIcon>
              <ActionIcon
                variant="transparent"
                component="a"
                href="https://www.linkedin.com/in/charleslabit/"
                target="_blank"
              >
                <IconBrandLinkedinFilled />
              </ActionIcon>
              <ActionIcon
                variant="transparent"
                component="a"
                href="https://www.facebook.com/charleskieeeee"
                target="_blank"
              >
                <IconBrandFacebookFilled />
              </ActionIcon>
            </Group>

            <Text fz={18}>We Accept</Text>
            <Group w={300}>
              <Card h={70} w={100} ta="center" m="auto">
                <Image
                  className="fade-in hover-effect cursor-pointer"
                  radius="25%"
                  h={"100%"}
                  w={"100%"}
                  src={"/payment-methods/mastercard.svg"}
                  alt={"master card logo"}
                  loading="lazy"
                  fit="contain"
                />
              </Card>

              <Card h={70} w={100} ta="center" m="auto">
                <Image
                  className="fade-in hover-effect cursor-pointer"
                  radius="25%"
                  src={"/payment-methods/gcash.svg"}
                  alt={"gcash logo"}
                  loading="lazy"
                  h={"100%"}
                  w={"100%"}
                  fit="contain"
                />
              </Card>

              <Card h={70} w={100} ta="center" m="auto">
                <Image
                  className="fade-in hover-effect cursor-pointer"
                  radius="25%"
                  h={"100%"}
                  w={"100%"}
                  src={"/payment-methods/visa.svg"}
                  alt={"visa logo"}
                  loading="lazy"
                  fit="contain"
                />
              </Card>
              <Card h={70} w={100} ta="center" m="auto">
                <Image
                  className="fade-in hover-effect cursor-pointer"
                  radius="25%"
                  h={"100%"}
                  w={"100%"}
                  src={"/payment-methods/maya.png"}
                  alt={"maya logo"}
                  loading="lazy"
                  fit="contain"
                />
              </Card>
            </Group>
            <Text fz={18}>
              © {new Date().getFullYear()} CK Mart. All rights reserved. | For
              demonstration purposes only.
            </Text>
          </Stack>
        </Grid.Col>
        <Grid.Col span={1}>
          <Text>CK Mart is now available!</Text>
          <Group mb={40} w={300}>
            <Image src={"/app/AppStore.svg"} alt="Appstore Logo" />
            <Image src={"/app/GooglePlay.svg"} alt="Googleplay Logo" />
          </Group>
        </Grid.Col>
      </Grid>
    </Center>
  );
};
