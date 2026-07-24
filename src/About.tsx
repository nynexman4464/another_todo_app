import { Heading } from "@astryxdesign/core/Heading";
import { Link } from "@astryxdesign/core/Link";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { useTranslator } from "@astryxdesign/core/i18n";

export const About = () => {
  const t = useTranslator();
  return (
    <VStack as="section" height="100%" hAlign="start" justify="between">
      <VStack gap={6} hAlign="start">
        <VStack gap={2} hAlign="start">
          <Heading level={1}>{t("@app.about.heading")}</Heading>
          <Text as="p" color="secondary" type="large">
            {t("@app.about.body")}
          </Text>
        </VStack>

        <VStack gap={2} hAlign="start">
          <Link href="https://github.com/nynexman4464/another_todo_app" isExternalLink isStandalone>
            {t("@app.about.repoLink")}
          </Link>
        </VStack>
      </VStack>

      <Text as="p" color="secondary" type="supporting">
        {t("@app.about.copyright")}
      </Text>
    </VStack>
  );
};
