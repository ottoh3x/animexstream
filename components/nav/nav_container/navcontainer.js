import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import styled from "styled-components"
const InSpan = styled.span`
  &:hover {
    background : #2563EB;
    color:white;
  }
`;

const Link2 = ({ theme, href, name, Icon }) => {
  const router = useRouter();
  const H = href.split("/");
  const H1 = H[H.length - 2];
  const H2 = H[H.length - 1];

  const Path = router.asPath.split("/");
  const Pp = Path[Path.length - 2];
  const Pr = Path[Path.length - 1]

  return (
    <Link href={href}>
      {H1 == Pp && H2 == Pr ? (
        
        <span
          className={`text-white bg-[#2563EB] cursor-pointer my-0.5 p-1 items-center flex flex-row   rounded-full`}
        >
          <Icon size={20} strokeWidth={0.5}  style={{
              margin: "0px 10px",
              color: name == "My List" ? "red" : theme.text.selected,
            }} />
          {name}
        </span>
      ) : (
        <InSpan
          className={`${theme.text.notselected} cursor-pointer my-0.5 p-1 items-center md:w-full flex flex-row  border border-transparent rounded-full`}
          border={theme.border}
        >
          <Icon size={20} strokeWidth={0.5} style={{
              margin: "0px 10px",
              color: name == "My List" ? "red" : theme.text.selected,
            }} />
          {name}
        </InSpan>
      )}
    </Link>
  );
};
const NavContainer = ({ links, heading }) => {
  const theme = useSelector((state) => state.theme);

  return (
    <div className="w-10/12 my-5">
      <span
        className={`${theme.text.selected} w-10/12 font-bold mx-2 text-xl`}
      >
        {heading}
      </span>
      <div className={`bg-gray-400 rounded-full h-0.5 mx-2 w-1/12`} />

      <div className={`text-base flex flex-col my-1.5`}>
        {links?.map((Item) => (
          <Link2
            href={Item.link}
            name={Item.name}
            Icon={Item.icon}
            key={Item.index}
            theme={theme}
          />
        ))}
      </div>
    </div>
  );
};

export default NavContainer;
