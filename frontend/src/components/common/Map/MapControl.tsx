import { BiCurrentLocation, BiMinus, BiPlus, BiReset } from "react-icons/bi";
import { Button, ButtonGroup } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";
import { ControlPosition, MapControl as GoogleMapControl } from "@vis.gl/react-google-maps";

import { useGigSelectionStore } from "@/stores/gigs/useGigSelectionStore";
import { DEFAULT_MAX_ZOOM, DEFAULT_ZOOM, useMapStore } from "@/stores/useMapStore";

export function MapControl() {
  const { setSelectedGig } = useGigSelectionStore((state) => state);
  const { reset, setCoordinates, setZoom, zoom } = useMapStore();

  return (
    <GoogleMapControl position={ControlPosition.RIGHT_TOP}>
      <div className="p-3">
        <ButtonGroup color="primary" size="md" variant="shadow">
          <Tooltip content="Zoom in">
            <Button
              isIconOnly
              onPress={() => {
                if (zoom < DEFAULT_MAX_ZOOM) {
                  setZoom(zoom + 1);
                }
              }}
            >
              <BiPlus />
            </Button>
          </Tooltip>
          <Tooltip content="Zoom out">
            <Button
              isIconOnly
              onPress={() => {
                if (zoom > DEFAULT_ZOOM) {
                  setZoom(zoom - 1);
                }
              }}
            >
              <BiMinus />
            </Button>
          </Tooltip>
          <Tooltip content="Reset map">
            <Button
              isIconOnly
              onPress={() => {
                setSelectedGig(null);
                reset();
              }}
            >
              <BiReset />
            </Button>
          </Tooltip>
          <Tooltip content="My location">
            <Button
              isIconOnly
              onPress={() => {
                if ("geolocation" in navigator) {
                  navigator.geolocation.getCurrentPosition(
                    (position) => {
                      const { latitude, longitude } = position.coords;
                      setCoordinates({
                        latitude,
                        longitude,
                      });
                      setZoom(15);
                    },
                    () => {}
                  );
                }
              }}
            >
              <BiCurrentLocation />
            </Button>
          </Tooltip>
        </ButtonGroup>
      </div>
    </GoogleMapControl>
  );
}
