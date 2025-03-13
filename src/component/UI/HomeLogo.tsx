import { Badge } from "@mantine/core";
import { useRouter } from "next/navigation";

export const HomeLogo = () => {
  const router = useRouter();

  const onClickHome = () => {
    router.push("/");
  };
  return (
    <Badge size="xl" onClick={onClickHome} className="cursor-pointer">
      CK Mart
    </Badge>
  );
};
