
import { forwardRef } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import type { LinkProps } from "react-router-dom";
import { AppShell } from "@astryxdesign/core/AppShell";
import { Banner } from "@astryxdesign/core/Banner";
import { Icon } from "@astryxdesign/core/Icon";
import { NavIcon } from "@astryxdesign/core/NavIcon";
import { SideNav, SideNavItem, SideNavSection } from "@astryxdesign/core/SideNav";
import { TopNav, TopNavHeading } from "@astryxdesign/core/TopNav";
import { HStack } from "@astryxdesign/core/HStack";
import { VStack } from "@astryxdesign/core/VStack";
import { useDirection, useTranslator } from "@astryxdesign/core/i18n";
import { Home } from "./Home";
import { About } from "./About";
import { Pricing } from "./Pricing";
import { LocalePicker } from "./i18n/LocalePicker";
import { ThemePicker } from "./theme/ThemePicker";

type RouterLinkProps = Omit<LinkProps, "to"> & {
  href?: string;
};

const RouterLink = forwardRef<HTMLAnchorElement, RouterLinkProps>(
  ({ href = "/", ...props }, ref) => <Link ref={ref} to={href} {...props} />,
);

function App() {
  const t = useTranslator();
  const direction = useDirection();
  const { pathname } = useLocation();

  const homeNavItem = { href: "/", label: t("@app.nav.home"), icon: "check" } as const;
  const aboutNavItem = { href: "/about", label: t("@app.nav.about"), icon: "info" } as const;
  const pricingNavItem = { href: "/pricing", label: t("@app.nav.pricing"), icon: "star" } as const;

  const topNav = (
    <TopNav
      label={t("@app.nav.primaryLabel")}
      heading={
        <TopNavHeading
          as={RouterLink}
          heading={t("@app.appName")}
          headingHref="/"
          logo={<NavIcon icon={<Icon icon="check" />} />}
        />
      }
      endContent={
        <HStack gap={2} align="center">
          <ThemePicker />
          <LocalePicker />
        </HStack>
      }
    />
  );

  const sideNav = (
    <SideNav>
      <VStack height="100%" justify="between">
        <SideNavSection title={t("@app.nav.sectionPages")} isHeaderHidden>
          <SideNavItem
            as={RouterLink}
            href={homeNavItem.href}
            icon={homeNavItem.icon}
            isSelected={pathname === homeNavItem.href}
            label={homeNavItem.label}
            selectedIcon={homeNavItem.icon}
          />
        </SideNavSection>
        <SideNavSection title={t("@app.nav.sectionMore")} isHeaderHidden>
          <SideNavItem
            as={RouterLink}
            href={pricingNavItem.href}
            icon={pricingNavItem.icon}
            isSelected={pathname === pricingNavItem.href}
            label={pricingNavItem.label}
            selectedIcon={pricingNavItem.icon}
          />
          <SideNavItem
            as={RouterLink}
            href={aboutNavItem.href}
            icon={aboutNavItem.icon}
            isSelected={pathname === aboutNavItem.href}
            label={aboutNavItem.label}
            selectedIcon={aboutNavItem.icon}
          />
        </SideNavSection>
      </VStack>
    </SideNav>
  );

  return (
    <AppShell
      contentPadding={6}
      dir={direction}
      sideNav={sideNav}
      topNav={topNav}
      variant="elevated"
    >
      <Banner
        status="warning"
        title={t("@app.banner.testApp")}
        // Stick just below the sticky TopNav. AppShell measures the header and
        // exposes its height as --appshell-header-height (same var its own
        // sticky SideNav pins to); zIndex keeps it above scrolling content.
        // The status "muted" colors are semi-transparent in some themes (e.g.
        // neutral dark), designed to composite over the content surface. When
        // sticky, scrolling content would show through, so back the banner with
        // the same opaque surface it normally sits on (radius matches the card).
        style={{
          position: "sticky",
          top: "var(--appshell-header-height, 0px)",
          zIndex: 1,
          backgroundColor: "var(--color-background-surface)",
          borderRadius: "var(--radius-container)",
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </AppShell>
  );
}

export default App;
