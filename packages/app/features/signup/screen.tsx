import { OAuthStrategy } from "@clerk/types";
import { YStack } from "@my/ui";
import { SignUpSignInComponent } from "@my/ui/src/components/SignUpSignIn";
import { useSignUp } from "app/utils/clerk";
import { useRouter } from "solito/router";

export function SignUpScreen() {
  const { push } = useRouter();

  const { isLoaded, signUp, setSession } = useSignUp();

  if (!setSession || !isLoaded) return null;

  const handleOAuthSignUpWithPress = async (strategy: OAuthStrategy) => {
    push("/signup/sso-oauth/" + strategy);
  };

  return (
    <YStack f={1} jc="center" ai="center" space>
      <SignUpSignInComponent
        type="sign-up"
        handleOAuthWithPress={handleOAuthSignUpWithPress}
      />
    </YStack>
  );
}
