import IconSolarPanel2 from "tabler_icons_tsx/solar-panel-2.tsx";

type Props = {
  active: string;
};

export default function Header({ active }: Props) {
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
            <a
              href={menu.href}
              class={" text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 py-1 border-gray-500 dark:border-gray-400" +
                (menu.href === active ? " font-bold border-b-2" : "")}
            >
              {menu.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
