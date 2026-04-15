import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { getNav, getFooter } from '@/lib/data';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const nav = getNav();
  const footer = getFooter();
  return (
    <>
      <Navbar nav={nav} />
      <main id="main" className="relative">
        {children}
      </main>
      <Footer footer={footer} />
    </>
  );
}
