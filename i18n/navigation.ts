import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Locale-aware wrappers for Next.js navigation primitives.
// Import Link, useRouter, usePathname, redirect from here — NOT from next/navigation.
export const { Link, useRouter, usePathname, redirect } =
  createNavigation(routing);
