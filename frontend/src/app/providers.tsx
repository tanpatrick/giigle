"use client";

import { HeroUIProvider } from "@heroui/react";
import { APIProvider } from "@vis.gl/react-google-maps";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider locale="es-GB">
      <MapProvider>{children}</MapProvider>
    </HeroUIProvider>
  );
}

function MapProvider({ children }: { children: React.ReactNode }) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
  return <APIProvider apiKey={apiKey}>{children}</APIProvider>;
}
