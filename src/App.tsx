
import { forwardRef } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import type { LinkProps } from "react-router-dom";
import { AppShell } from "@astryxdesign/core/AppShell";
import { Icon } from "@astryxdesign/core/Icon";
import { NavIcon } from "@astryxdesign/core/NavIcon";
import { SideNav, SideNavItem, SideNavSection } from "@astryxdesign/core/SideNav";
import { TopNav, TopNavHeading } from "@astryxdesign/core/TopNav";
import { VStack } from "@astryxdesign/core/VStack";
import { Home } from "./Home";
import { About } from "./About";

type RouterLinkProps = Omit<LinkProps, "to"> & {
  href?: string;
};

const RouterLink = forwardRef<HTMLAnchorElement, RouterLinkProps>(
  ({ href = "/", ...props }, ref) => <Link ref={ref} to={href} {...props} />,
);

const homeNavItem = { href: "/", label: "Home", icon: "check" } as const;
const aboutNavItem = { href: "/about", label: "About", icon: "info" } as const;

function App() {
  const { pathname } = useLocation();

  const topNav = (
    <TopNav
      label="Primary"
      heading={
        <TopNavHeading
          as={RouterLink}
          heading="Another Todo"
          headingHref="/"
          logo={<NavIcon icon={<Icon icon="check" />} />}
        />
      }
    />
  );

  const sideNav = (
    <SideNav>
      <VStack height="100%" justify="between">
        <SideNavSection title="Pages" isHeaderHidden>
          <SideNavItem
            as={RouterLink}
            href={homeNavItem.href}
            icon={homeNavItem.icon}
            isSelected={pathname === homeNavItem.href}
            label={homeNavItem.label}
            selectedIcon={homeNavItem.icon}
          />
        </SideNavSection>
        <SideNavSection title="More" isHeaderHidden>
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
    <AppShell contentPadding={6} sideNav={sideNav} topNav={topNav} variant="elevated">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </AppShell>
  );
}

export default App;
