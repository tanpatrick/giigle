"use client";

import { BiLogIn } from "react-icons/bi";
import { useUser } from "@auth0/nextjs-auth0";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@heroui/dropdown";

export function UserMenuItem() {
  const { user } = useUser();

  if (!user?.email) {
    return (
      <Button
        color="primary"
        variant="solid"
        endContent={<BiLogIn />}
        onPress={() => {
          window.location.href = "/auth/login";
        }}
      >
        Login
      </Button>
    );
  }

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          as="button"
          className="transition-transform"
          color="secondary"
          isBordered
          name={user?.nickname}
          size="sm"
          src="https://api.dicebear.com/9.x/bottts/svg"
        />
      </DropdownTrigger>
      <DropdownMenu
        className="p-3"
        itemClasses={{
          base: [
            "rounded-md",
            "text-default-500",
            "transition-opacity",
            "data-[hover=true]:text-foreground",
            "data-[hover=true]:bg-default-100",
            "dark:data-[hover=true]:bg-default-50",
            "data-[selectable=true]:focus:bg-default-50",
            "data-[pressed=true]:opacity-70",
            "data-[focus-visible=true]:ring-default-500",
          ],
        }}
      >
        <DropdownSection showDivider aria-label="Preferences">
          <DropdownItem key="profile" className="h-14 gap-2">
            <div className="flex">
              <div className="flex-none">
                <Avatar
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  isBordered
                  name={user.nickname}
                  size="sm"
                  src="https://api.dicebear.com/9.x/bottts/svg"
                />
              </div>

              <p className="flex-1 ml-5 font-semibold self-center">{user?.nickname}</p>
            </div>
          </DropdownItem>

          <DropdownItem
            key="theme"
            isReadOnly
            className="cursor-default"
            endContent={
              <select
                className="z-10 outline-none w-16 py-0.5 rounded-md text-tiny group-data-[hover=true]:border-default-500 border-small border-default-300 dark:border-default-200 bg-transparent text-default-500"
                id="theme"
                name="theme"
              >
                <option>System</option>
                <option>Dark</option>
                <option>Light</option>
              </select>
            }
          >
            Theme
          </DropdownItem>
        </DropdownSection>

        <DropdownSection aria-label="Help & Feedback">
          <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
          <DropdownItem key="logout">
            <a className="block w-full" href="/auth/logout">
              Log out
            </a>
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
