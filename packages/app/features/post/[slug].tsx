import { Button, Paragraph, YStack } from "@my/ui";
import { ChevronLeft } from "@tamagui/lucide-icons";
import { trpc } from "app/utils/trpc";
import React from "react";
import { createParam } from "solito";
import { useLink } from "solito/link";

const { useParam } = createParam<{ slug: string }>();

export const PostDetailScreen: React.FC<{ slug: string }> = () => {
  const [slug] = useParam("slug");
  const linkPropsBack = useLink({ href: "/" });

  const { data, error } = trpc.post.bySlug.useQuery({ slug: slug as string });

  if (error) {
    return <Paragraph>{error.message}</Paragraph>;
  }

  return (
    <YStack f={1} jc="center" ai="center" space>
      <Paragraph>{JSON.stringify(data, null, 2)}</Paragraph>
      <Button {...linkPropsBack} icon={ChevronLeft} theme="gray">
        Go Home
      </Button>
    </YStack>
  );
};
