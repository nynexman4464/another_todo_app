import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";

export const About = () => {
  return (
    <VStack as="section" gap={1} hAlign="start">
      <Heading level={1}>About</Heading>
      <Text as="p" color="secondary">
        TODO!
      </Text>
    </VStack>
  );
};
