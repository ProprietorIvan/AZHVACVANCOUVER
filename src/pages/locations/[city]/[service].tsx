import { GetStaticPaths, GetStaticProps } from "next";
import LocationServicePageContent, {
  getLocationStaticProps,
} from "@/components/LocationServicePageContent";
import { getAllLocationServicePaths } from "@/data/locations";

export default function LocationServicePage({
  citySlug,
  serviceSlug,
}: {
  citySlug: string;
  serviceSlug: string;
}) {
  return (
    <LocationServicePageContent citySlug={citySlug} serviceSlug={serviceSlug} />
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllLocationServicePaths().map(({ city, service }) => ({
    params: { city, service },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const citySlug = params?.city as string;
  const serviceSlug = params?.service as string;
  return getLocationStaticProps(citySlug, serviceSlug);
};
