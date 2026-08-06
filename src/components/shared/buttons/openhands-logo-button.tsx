import OpenHandsLogo from "#/assets/branding/openhands-logo.svg?react";
import { NavigationLink } from "#/components/shared/navigation-link";
import { cn } from "#/utils/utils";

const DEFAULT_LOGO_WIDTH = 46;
const DEFAULT_LOGO_HEIGHT = 30;

export type OpenHandsLogoButtonProps = {
  className?: string;
  /** Applied to the root `<svg>` (e.g. `max-w-none` so Tailwind preflight doesn't clamp wide marks inside a narrow flex slot). */
  logoClassName?: string;
  logoWidth?: number;
  logoHeight?: number;
};

export function OpenHandsLogoButton({
  className,
  logoClassName,
  logoWidth = DEFAULT_LOGO_WIDTH,
  logoHeight = DEFAULT_LOGO_HEIGHT,
}: OpenHandsLogoButtonProps = {}) {
  return (
    <NavigationLink
      to="/conversations"
      aria-label="VAgent — Home"
      className={cn(
        "flex items-center gap-1.5 group select-none",
        className,
      )}
    >
      <OpenHandsLogo
        width={logoWidth}
        height={logoHeight}
        className={cn("shrink-0", logoClassName)}
      />
      <span
        className="hidden md:inline font-bold tracking-tight text-[15px] bg-gradient-to-r from-violet-400 to-purple-300 bg-clip-text text-transparent group-hover:from-violet-300 group-hover:to-purple-200 transition-all duration-200"
        style={{ letterSpacing: "-0.02em" }}
      >
        VAgent
      </span>
    </NavigationLink>
  );
}
