import { ICONS } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import DropdownList from "./DropdownList";
import RecordScreen from "./RecordScreen";

const Header = ({ subHeader, title, userImg }: SharedHeaderProps) => {
  return (
    <header className="header">
      <section className="header-container">
        <div className="details">
          {userImg && (
            <Image
              src={userImg}
              alt="user"
              height={66}
              width={66}
              className="rounded-full"
            />
          )}
          <article>
            <p>{subHeader}</p>
            <h1>{title}</h1>
          </article>
        </div>
        <aside>
          <Link href="/upload">
            <Image
              src="/assets/icons/upload.svg"
              alt="upload"
              height={16}
              width={16}
            />
            <span>Upload a video</span>
          </Link>
          <RecordScreen/>
        </aside>
      </section>
      <section className="search-filter">
        <div className="search">
          <input
            type="text"
            placeholder="Search for videos, folders tags... "
          />
          <Image
            src="/assets/icons/search.svg"
            alt="search"
            height={16}
            width={16}
          />
        </div>
        <DropdownList />
      </section>
    </header>
  );
};

export default Header;
