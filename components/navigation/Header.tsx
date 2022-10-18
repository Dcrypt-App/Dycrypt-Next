import Link from "next/link";
import style from "./Header.module.scss";
// import logo from "../../styles/components/navigation/Logo.module.scss";

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
        <a>
          <h1>{title}</h1>
          {/* <div class="stack" style="--stacks: 3;">
            <span style="--index: 0;">STACK</span>
            <span style="--index: 1;">STACK</span>
            <span style="--index: 2;">STACK</span>
          </div> */}
        </a>
      </Link>
      <ul>
        <li>
          <Link href={"/"}>
            <a>Host</a>
          </Link>
        </li>
        <li>
          <Link href={"/"}>
            <a>Join</a>
          </Link>
        </li>
        <li>
          <Link href={"/chatroom"}>
            <a>Chat</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
