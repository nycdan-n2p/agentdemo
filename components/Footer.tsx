import { Globe } from "lucide-react";

const FOOTER_LINKS_ROW1 = [
  { label: "Terms of Service", href: "https://www.net2phone.com/terms-of-service" },
  { label: "Privacy Policy", href: "https://www.net2phone.com/privacy-policy" },
  { label: "Cookie Notice", href: "https://www.net2phone.com/privacy-policy" },
] as const;

const FOOTER_LINKS_ROW2 = [
  { label: "Privacy Notice for California Consumers", href: "https://www.net2phone.com/ccpa-notice" },
  {
    label: "Your California Privacy Choices",
    href: "https://www.idt.net/ccpa-do-not-sell/",
    external: true,
  },
] as const;

export function Footer() {
  return (
    <footer className="bg-white text-neutral-600">
      <div className="mx-auto w-full max-w-[1152px] px-4 py-8 lg:px-0 text-center">
        {/* Row 1: copyright, Kari's Law, links */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm">
          <span className="text-neutral-500">© Copyright 2026 net2phone</span>
          <span className="text-neutral-500">Kari&apos;s Law Compliant</span>
          {FOOTER_LINKS_ROW1.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-neutral-600 hover:text-foreground hover:underline transition-colors"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Row 2: California links */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm">
          {FOOTER_LINKS_ROW2.map(({ label, href, external }) => (
            <a
              key={label}
              href={href}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="text-neutral-600 hover:text-foreground hover:underline transition-colors"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Row 3: globe + address */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm text-neutral-500">
          <Globe className="h-4 w-4 shrink-0" aria-hidden />
          <span>Global Headquarters: 520 Broad St, Newark, NJ 07102</span>
        </div>
      </div>
    </footer>
  );
}
