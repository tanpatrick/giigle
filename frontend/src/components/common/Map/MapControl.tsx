import { BiMinus, BiPlus } from "react-icons/bi";
import { Button, ButtonGroup } from "@heroui/button";
import { ControlPosition, MapControl as GoogleMapControl } from "@vis.gl/react-google-maps";

import { DEFAULT_MAX_ZOOM, DEFAULT_ZOOM, useMapStore } from "@/stores/useMapStore";

export function MapControl() {
  const { setZoom, zoom } = useMapStore();
  return (
    <GoogleMapControl position={ControlPosition.RIGHT_BOTTOM}>
      <div className="p-3">
        <ButtonGroup size="sm">
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
        </ButtonGroup>
      </div>
    </GoogleMapControl>
  );
}
