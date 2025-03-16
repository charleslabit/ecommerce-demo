import { Button, Container, Text, Title } from "@mantine/core";

export const ErrorComponent = ({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) => {
  return (
    <Container className="flex flex-col items-center justify-center min-h-screen text-center">
      <Title order={2} className="text-red-500">
        Something went wrong 😞
      </Title>
      <Text size="lg" className="mt-2 text-gray-600">
        {error.message || "An unexpected error occurred."}
      </Text>
      <Button className="mt-4 bg-blue-500" onClick={reset}>
        Try Again
      </Button>
    </Container>
  );
};
