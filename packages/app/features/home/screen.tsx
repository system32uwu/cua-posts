import {
  Anchor,
  Button,
  H1,
  H3,
  Image,
  Paragraph,
  Separator,
  XStack,
  YStack,
} from "@my/ui";
import { FilePlus } from "@tamagui/lucide-icons";
import React, { useEffect } from "react";
import { useLink } from "solito/link";
import { SignedIn, SignedOut, useAuth } from "../../utils/clerk";
import { trpc } from "../../utils/trpc";

export function HomeScreen() {
  const { signOut, userId } = useAuth();
  const userLinkProps = useLink({
    href: `/user/${!userId ? "test" : userId.split("_")[1]}`,
  });
  const signInLinkProps = useLink({
    href: "/signin",
  });
  const signUpLinkProps = useLink({
    href: "/signup",
  });

  const linkPropsNewPost = useLink({ href: "/new-post" });

  const { data, isLoading, error } = trpc.post.all.useQuery();

  useEffect(() => {
    console.log(data);
  }, [isLoading]);
  /* 
  if (isLoading) {
    return <Paragraph>Loading...</Paragraph>
  } */

  if (error) {
    return <Paragraph>{error.message}</Paragraph>;
  }

  return (
    <YStack f={1} jc="center" ai="center" p="$4" space>
      <YStack space="$4" maw={600} px="$3">
        <XStack jc="center" ai="flex-end" fw="wrap" space="$2" mt="$-2">
          <Image
            src="https://raw.githubusercontent.com/chen-rn/CUA/main/apps/nextjs/public/favicon.ico"
            accessibilityLabel="create-universal-app logo"
            width={50}
            height={50}
            mt="$2"
          />
          <H1 ta="center" mt="$2">
            create-universal-app
          </H1>
        </XStack>
        <Paragraph ta="center">
          This is a demo for create-universal-app. To read more about the
          philosophy behind it, visit{" "}
          <Anchor
            color="$color12"
            href="https://github.com/chen-rn/create-universal-app"
            target="_blank"
          >
            https://github.com/chen-rn/create-universal-app
          </Anchor>{" "}
          (give it a ⭐️ if you like it!)
        </Paragraph>
        <Paragraph ta="center">
          This template uses Expo, Next, Solito, tRPC, Tamagui, Clerk, and
          Prisma. If you're a beginner and is a little overwhelmed, I've also
          made a{" "}
          <Anchor
            color="$color12"
            href="https://youtu.be/aTEv0-ZBbWk"
            target="_blank"
          >
            video
          </Anchor>{" "}
          explanation on how this template works and how to get started!
        </Paragraph>
        <Separator />
      </YStack>

      <H3 ta="center">User / Auth Demo</H3>

      <SignedOut>
        <XStack space ai="center">
          <Button {...signInLinkProps} theme={"gray"}>
            Sign In(Clerk)
          </Button>
          <Button {...signUpLinkProps} theme={"gray"}>
            Sign Up(Clerk)
          </Button>
        </XStack>
      </SignedOut>

      <SignedIn>
        <YStack space={"$2"}>
          <Button {...userLinkProps} theme={"gray"}>
            My profile
          </Button>
          <Button
            onPress={() => {
              signOut();
            }}
            theme={"red"}
          >
            Sign Out
          </Button>
        </YStack>
      </SignedIn>

      <H3 ta="center">Posts Demo</H3>

      <YStack p="$2">
        <Paragraph textAlign="center">Created Posts</Paragraph>
        {data?.length ? (
          data.map((post) => (
            <Anchor href={`/posts/${post.slug}`} key={post.id}>
              <i>{post.title}</i> - {post.author.name}
            </Anchor>
          ))
        ) : (
          <Paragraph>No posts yet, create one!</Paragraph>
        )}
      </YStack>

      <SignedIn>
        <XStack space>
          <Button {...linkPropsNewPost} icon={FilePlus} theme="gray">
            Create new post
          </Button>
        </XStack>
      </SignedIn>
    </YStack>
  );
}
