import { Button, YStack } from "@my/ui";
import { ChevronLeft } from "@tamagui/lucide-icons";
import React from "react";
import { useLink } from "solito/link";
import { NewPostForm } from "./form";

export function NewPost() {
  const linkPropsBack = useLink({ href: "/" });

  return (
    <YStack f={1} jc="center" ai="center" space>
      <NewPostForm />

      <Button {...linkPropsBack} icon={ChevronLeft} theme="gray">
        Go Home
      </Button>
    </YStack>
  );
}
