import { Button } from "@astryxdesign/core/Button";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";

export const Home = () => {
  return (
    <VStack as="section" gap={4} hAlign="start">
      <VStack gap={1}>
        <Heading level={1}>Home</Heading>
        <Text as="p" color="secondary">
          TODO!
        </Text>
      </VStack>
      <Button label="Click Me!" />
    </VStack>
  );
};
