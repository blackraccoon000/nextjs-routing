import Link from "next/link";
import classes from "./MainHeader.module.css";

const MainHeader = (): JSX.Element => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href={"/"}>NextEvents</Link>
      </div>
      <nav className={classes.navigation}>
        <ul>
          <li>
            <Link href={"/events"}>Browse AllEvents</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
