import Link from "next/link";
import style from "../../styles/components/navigation/Header.module.scss"

type HeaderTypes = {
  title: string;
  isCentered?: boolean;
};

const Header = ({ title, isCentered }: HeaderTypes) => {
  const centered = isCentered
    ? { justifyContent: "center" }
    : { justifyContent: "flex-start" };
  return (
    <nav className={style.container} style={centered}>
      <Link href={"/"}>
        <a><h1>{title}</h1></a>
      </Link>
      <ul>
        <li>
          <Link href={"/"}>
            <a>Host</a>
          </Link>
        </li>
        <li>
          <Link href={"/test"}>
            <a>Join</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
