import {useState} from "react";
import {FormattedMessage, FormattedNumber, IntlProvider, useIntl} from "react-intl";
import {Heading} from "@astryxdesign/core/Heading";
import {Text} from "@astryxdesign/core/Text";
import {VStack} from "@astryxdesign/core/VStack";
import {HStack} from "@astryxdesign/core/HStack";
import {StackItem} from "@astryxdesign/core/Stack";
import {Button} from "@astryxdesign/core/Button";
import {Card} from "@astryxdesign/core/Card";
import {Selector} from "@astryxdesign/core/Selector";
import {useAppLocale} from "./i18n/LocaleContext";

// A tiny catalog of the app's OWN strings, translated with react-intl.
// Astryx's own strings (Button aria labels, focus behavior, etc.) still
// flow through <InternationalizationProvider> at the root of the app.
// This page proves the two providers coexist happily.
const APP_MESSAGES: Record<string, Record<string, string>> = {
  en: {
    "pricing.heading": "Pricing",
    "pricing.tagline":
      "A tiny demo showing astryx components working alongside react-intl for consumer strings.",
    "pricing.plan.hobby": "Hobby",
    "pricing.plan.pro": "Pro",
    "pricing.plan.enterprise": "Enterprise",
    "pricing.plan.perMonth": "{price} / month",
    "pricing.plan.customPricing": "Custom pricing",
    "pricing.cta.choose": "Choose {plan}",
    "pricing.region.label": "Billing region",
    "pricing.region.na": "North America",
    "pricing.region.eu": "European Union",
    "pricing.region.uk": "United Kingdom",
    "pricing.region.apac": "Asia-Pacific",
    "pricing.note":
      "The plan names, prose, and prices are localized by react-intl. The buttons above and the Selector below are astryx components — their internal aria labels, search box placeholder, and \"Clear\" tooltip are localized by <InternationalizationProvider>.",
  },
  fr: {
    "pricing.heading": "Tarifs",
    "pricing.tagline":
      "Une petite démo qui montre des composants astryx aux côtés de react-intl pour les chaînes du consommateur.",
    "pricing.plan.hobby": "Hobbyiste",
    "pricing.plan.pro": "Pro",
    "pricing.plan.enterprise": "Entreprise",
    "pricing.plan.perMonth": "{price} / mois",
    "pricing.plan.customPricing": "Tarif personnalisé",
    "pricing.cta.choose": "Choisir « {plan} »",
    "pricing.region.label": "Région de facturation",
    "pricing.region.na": "Amérique du Nord",
    "pricing.region.eu": "Union européenne",
    "pricing.region.uk": "Royaume-Uni",
    "pricing.region.apac": "Asie-Pacifique",
    "pricing.note":
      "Les noms de forfaits, textes et prix sont localisés par react-intl. Les boutons ci-dessus et le Selector ci-dessous sont des composants astryx — leurs libellés aria internes, le placeholder de la zone de recherche et l'infobulle « Effacer » sont localisés par <InternationalizationProvider>.",
  },
};

type Plan = {
  key: "hobby" | "pro" | "enterprise";
  price: number | null; // null = custom
};

const PLANS: ReadonlyArray<Plan> = [
  {key: "hobby", price: 0},
  {key: "pro", price: 12},
  {key: "enterprise", price: null},
];

type Region = "na" | "eu" | "uk" | "apac";

// Inner component so useIntl is inside <IntlProvider>. This is where the
// two providers come together: react-intl formats consumer strings, astryx
// components render their own aria labels, placeholders, tooltips through
// <InternationalizationProvider>.
function PricingBody() {
  const intl = useIntl();
  const [region, setRegion] = useState<Region>("na");

  const regionOptions = [
    {value: "na", label: intl.formatMessage({id: "pricing.region.na"})},
    {value: "eu", label: intl.formatMessage({id: "pricing.region.eu"})},
    {value: "uk", label: intl.formatMessage({id: "pricing.region.uk"})},
    {value: "apac", label: intl.formatMessage({id: "pricing.region.apac"})},
  ];

  const currency =
    region === "eu" ? "EUR" : region === "uk" ? "GBP" : region === "apac" ? "JPY" : "USD";

  return (
    <VStack as="section" gap={5} hAlign="start">
      <VStack gap={1} width="100%">
        <Heading level={1}>
          <FormattedMessage id="pricing.heading" />
        </Heading>
        <Text as="p" color="secondary">
          <FormattedMessage id="pricing.tagline" />
        </Text>
      </VStack>

      {/* Astryx Selector — has a search box, a clear button, and a trigger
          placeholder. All three carry astryx-shipped strings that respond
          to the astryx InternationalizationProvider (switch the app to
          Français and open the dropdown to see "Rechercher…" / "Effacer"). */}
      <StackItem crossAlignSelf="stretch">
        <Selector
          label={intl.formatMessage({id: "pricing.region.label"})}
          options={regionOptions}
          value={region}
          onChange={(value) => setRegion(value as Region)}
          hasSearch
          hasClear
        />
      </StackItem>

      <HStack gap={3} wrap="wrap" width="100%">
        {PLANS.map((plan) => (
          <Card key={plan.key} padding={4}>
            <VStack gap={2}>
              <Heading level={3}>
                <FormattedMessage id={`pricing.plan.${plan.key}`} />
              </Heading>
              <Text as="p" color="secondary">
                {plan.price === null ? (
                  <FormattedMessage id="pricing.plan.customPricing" />
                ) : (
                  <FormattedMessage
                    id="pricing.plan.perMonth"
                    values={{
                      price: (
                        <FormattedNumber
                          value={plan.price}
                          style="currency"
                          currency={currency}
                        />
                      ),
                    }}
                  />
                )}
              </Text>
              <Button
                label={intl.formatMessage(
                  {id: "pricing.cta.choose"},
                  {plan: intl.formatMessage({id: `pricing.plan.${plan.key}`})},
                )}
                variant={plan.key === "pro" ? "primary" : "secondary"}
              />
            </VStack>
          </Card>
        ))}
      </HStack>

      <Text as="p" color="secondary" type="supporting">
        <FormattedMessage id="pricing.note" />
      </Text>
    </VStack>
  );
}

export const Pricing = () => {
  const {locale} = useAppLocale();

  // Map our app locale to what react-intl understands. Pseudo isn't a real
  // BCP 47 tag react-intl knows about — fall back to `en` messages so the
  // page still renders; astryx still pseudo-formats its own strings via
  // <InternationalizationProvider>.
  const rIntlLocale = locale === "pseudo" ? "en" : locale;
  const messages = APP_MESSAGES[rIntlLocale] ?? APP_MESSAGES.en;

  return (
    <IntlProvider locale={rIntlLocale} defaultLocale="en" messages={messages}>
      <PricingBody />
    </IntlProvider>
  );
};
