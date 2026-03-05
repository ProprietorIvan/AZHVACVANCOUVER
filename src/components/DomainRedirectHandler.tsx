import { useEffect } from "react";
import { useRouter } from "next/router";

const DomainRedirectHandler: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Domain redirects removed - this is now a dedicated HVAC site
    // All traffic goes to the main HVAC site
  }, [router]);

  return null;
};

export default DomainRedirectHandler;
