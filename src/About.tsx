import { Heading } from "@astryxdesign/core/Heading";
import { Link } from "@astryxdesign/core/Link";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";

export const About = () => {
  return (
    <VStack as="section" height="100%" hAlign="start" justify="between">
      <VStack gap={6} hAlign="start">
        <VStack gap={2} hAlign="start">
          <Heading level={1}>About</Heading>
          <Text as="p" color="secondary" type="large">
            A toy todo app for testing UI frameworks.
          </Text>
        </VStack>

        <VStack gap={2} hAlign="start">
          <Link href="https://github.com/nynexman4464/another_todo_app" isExternalLink isStandalone>
            GitHub repository
          </Link>
        </VStack>
      </VStack>

      <Text as="p" color="secondary" type="supporting">
        Copyright (c) 2026, nynexman4464
      </Text>
    </VStack>
  );
};
