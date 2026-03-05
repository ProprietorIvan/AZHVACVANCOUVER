import { useEffect } from "react";
import { useRouter } from "next/router";

const DomainRedirectHandler: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Check if there's a redirect parameter in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const redirectSource = urlParams.get("from");

    // Check if user has already been redirected today
    const redirectCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("domain_redirect_today="));

    if (!redirectCookie && redirectSource) {
      // Set cookie to prevent multiple redirects today
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);

      document.cookie = `domain_redirect_today=${redirectSource}; expires=${tomorrow.toUTCString()}; path=/; SameSite=Lax`;

      // Redirect based on source
      if (redirectSource === "vancouver-demolition") {
        router.push("/demolition");
      } else if (redirectSource === "burnabydrywall") {
        router.push("/burnaby-drywall");
      }
    }

    // Also check document.referrer as fallback
    if (!redirectCookie && document.referrer) {
      const refererUrl = new URL(document.referrer);
      const refererDomain = refererUrl.hostname.toLowerCase();

      if (refererDomain.includes("vancouver-demolition.com")) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);

        document.cookie = `domain_redirect_today=vancouver-demolition; expires=${tomorrow.toUTCString()}; path=/; SameSite=Lax`;
        router.push("/demolition");
      } else if (refererDomain.includes("burnabydrywall.ca")) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);

        document.cookie = `domain_redirect_today=burnabydrywall; expires=${tomorrow.toUTCString()}; path=/; SameSite=Lax`;
        router.push("/burnaby-drywall");
      }
    }
  }, [router]);

  return null; // This component doesn't render anything
};

export default DomainRedirectHandler;


