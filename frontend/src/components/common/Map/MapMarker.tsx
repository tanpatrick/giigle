import { Marker } from "@vis.gl/react-google-maps";

import { Coordinates } from "@/types/Coordinate";

type MapMarkerProps = {
  iconSrc?: string;
  isVisible?: boolean;
  location: Coordinates;
  onMouseOver?: () => void;
};

export function MapMarker({ iconSrc, isVisible, location, onMouseOver }: MapMarkerProps) {
  return (
    <Marker
      animation={google.maps.Animation.DROP}
      icon={
        iconSrc
          ? {
              scaledSize: new window.google.maps.Size(25, 25),
              url: iconSrc,
            }
          : null
      }
      onMouseOver={onMouseOver}
      position={{
        lat: location.latitude,
        lng: location.longitude,
      }}
      visible={isVisible}
    />
  );
}
