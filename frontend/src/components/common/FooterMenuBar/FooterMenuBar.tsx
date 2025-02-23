import { BiListUl, BiMap } from "react-icons/bi";
import { Button, ButtonGroup } from "@heroui/button";

import { useHomeStore } from "@/stores/useHomeStore";

export function FooterMenuBar() {
  const { setListMode, setMapMode, viewMode } = useHomeStore();
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-md border-t flex justify-around py-2 md:hidden z-50">
      <ButtonGroup>
        <Button color={viewMode === "list" ? "primary" : "default"} onPress={setListMode} startContent={<BiListUl />}>
          List
        </Button>
        <Button color={viewMode === "map" ? "primary" : "default"} onPress={setMapMode} startContent={<BiMap />}>
          Map
        </Button>
      </ButtonGroup>
    </div>
  );
}
