import { FloatingHeader } from "@/components/ui/floating-header";

export const Navbar = () => {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-primary-foreground focus:shadow-elevated"
      >
        Skip to content
      </a>
      <FloatingHeader />
    </>
  );
};
