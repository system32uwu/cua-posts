import { trpc } from "app/utils/trpc";
import { useEffect, useState } from "react";
import {
  Button,
  Form,
  H4,
  Input,
  Label,
  Spinner,
  TextArea,
  YStack,
} from "tamagui";

export function NewPostForm() {
  const { mutateAsync, error } = trpc.post.create.useMutation();

  const [status, setStatus] = useState<"Off" | "Submitting" | "Submitted">(
    "Off"
  );

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (status === "Submitting") {
      const timer = setTimeout(() => setStatus("Off"), 2000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [status]);

  return (
    <Form
      alignItems="center"
      minWidth={300}
      space
      borderWidth={1}
      borderRadius="$4"
      backgroundColor="$background"
      borderColor="$borderColor"
      padding="$8"
    >
      <H4>{status === "Off" ? "Create new Post" : status}</H4>
      <YStack>
        <Label>Title</Label>
        <Input value={title} onChangeText={(t) => setTitle(t)} />
      </YStack>

      <YStack>
        <Label>Content</Label>
        <TextArea value={content} onChangeText={(t) => setContent(t)} />
      </YStack>

      {Object.keys(error?.data?.zodError?.fieldErrors || {}).map((key) => (
        <Label color={"$red10Dark"} key={key}>
          {key}:{" "}
          {error?.data?.zodError?.fieldErrors[key]
            ?.toString()
            .replace("String", "")}
        </Label>
      ))}

      <Button
        disabled={status === "Submitting"}
        icon={status === "Submitting" ? () => <Spinner /> : undefined}
        theme={"blue"}
        onClick={async () => {
          setStatus("Submitting");
          await mutateAsync({ title, content });
          setStatus("Submitted");
        }}
      >
        Submit
      </Button>
    </Form>
  );
}
