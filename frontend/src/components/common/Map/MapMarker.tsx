import { AdvancedMarker } from "@vis.gl/react-google-maps";

import { Coordinates } from "@/types/Coordinate";

import { MarkerIcon } from "../icons/MarkerIcon";

type MapMarkerProps = {
  isSelected?: boolean;
  location: Coordinates;
  onClick?: () => void;
};

export function MapMarker({ isSelected, location, onClick }: MapMarkerProps) {
  return (
    <AdvancedMarker
      onClick={onClick}
      position={{
        lat: location.latitude,
        lng: location.longitude,
      }}
      style={{
        transform: `scale(${isSelected ? "1.3" : "1"})`,
      }}
    >
      <MarkerIcon isSelected={isSelected} />
    </AdvancedMarker>
  );
}
