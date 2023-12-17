import IconSolarPanel2 from "tabler_icons_tsx/solar-panel-2.tsx";
import type { FunctionalComponent } from "preact";
import HeaderMenu from "../islands/HeaderMenu.tsx";

interface Props {
  active: string;
}

const Header: FunctionalComponent<Props> = ({ active }: Props) => {
  const menus = [
    { name: "Home", href: "/" },
    { name: "Going Green!", href: "/green/" },
    { name: "Monies", href: "/monies/" },
    { name: "About", href: "/about/" },
  ];

  return (
    <div class="bg-white dark:bg-black w-full max-w-screen-xlg py-6 px-8 flex flex-col sm:flex-row gap-4 ">
      <a class="flex items-center flex-1" href="/">
        <IconSolarPanel2 aria-hidden="true" class="dark:text-white" />
        <div class="text-2xl ml-1 font-bold dark:text-white">
          Why Switch?
        </div>
      </a>
      <ul class="flex items-center gap-6">
        {menus.map((menu) => (
          <li>
            <HeaderMenu
              title={menu.name}
              active={(active === "/" && menu.href === "/") ||
                (active.startsWith(menu.href) && menu.href !== "/")}
              href={menu.href}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export { Header as default };
