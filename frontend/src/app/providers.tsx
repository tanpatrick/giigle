"use client";

import { Auth0Provider } from "@auth0/nextjs-auth0";
import { HeroUIProvider } from "@heroui/react";
import { APIProvider } from "@vis.gl/react-google-maps";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Auth0Provider>
      <HeroUIProvider locale="en-GB">
        <MapProvider>{children}</MapProvider>
      </HeroUIProvider>
    </Auth0Provider>
  );
}

function MapProvider({ children }: { children: React.ReactNode }) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
  return <APIProvider apiKey={apiKey}>{children}</APIProvider>;
}
