import { Button, Paragraph, YStack } from "@my/ui";
import { ChevronLeft } from "@tamagui/lucide-icons";
import { trpc } from "app/utils/trpc";
import React from "react";
import { createParam } from "solito";
import { useLink } from "solito/link";

const { useParam } = createParam<{ id: string }>();

export function UserDetailScreen() {
  const [id] = useParam("id");
  const linkPropsBack = useLink({ href: "/" });

  const { data } = trpc.user.current.useQuery();

  console.log("data", data);

  return (
    <YStack f={1} jc="center" ai="center" space>
      <Paragraph ta="center" fow="800">{`User ID: ${id}`}</Paragraph>
      <Paragraph>{JSON.stringify(data, null, 2)}</Paragraph>
      <Button {...linkPropsBack} icon={ChevronLeft} theme="gray">
        Go Home
      </Button>
    </YStack>
  );
}
