import {
  Button,
  Card,
  Container,
  Grid,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconBox, IconCategory } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

interface AdminCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  route: string;
}

const AdminCard = ({ title, description, icon, route }: AdminCardProps) => {
  const router = useRouter();

  const handleNavigation = () => router.push(route);

  return (
    <Grid.Col span={{ base: 12, sm: 6 }}>
      <Card
        className="cursor-pointer"
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        h="100%"
        onClick={handleNavigation}
      >
        <Stack h="100%">
          <Group>
            {icon}
            <Title order={3}>{title}</Title>
          </Group>
          <Text mt="sm" c="dimmed">
            {description}
          </Text>
          <Button fullWidth mt="auto" variant="filled">
            Manage {title}
          </Button>
        </Stack>
      </Card>
    </Grid.Col>
  );
};

export const AdminContainer = () => {
  return (
    <Container size="md" py="xl">
      <Title order={2} ta="center" mb="xl">
        Admin Dashboard
      </Title>

      <Grid>
        <AdminCard
          title="Category Management"
          description="Manage product categories efficiently."
          icon={<IconCategory size={40} />}
          route="/admin/categories"
        />
        <AdminCard
          title="Product Management"
          description="Add, edit, or remove products easily."
          icon={<IconBox size={40} />}
          route="/admin/products"
        />
      </Grid>
    </Container>
  );
};
