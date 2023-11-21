import Link from "next/link";

function Topbar() {
  return (
    <nav className="topbar">
      <Link href="/" className="flex items-center gap-4">
        <p className="text-heading3-bold text-light-1 max-lg:hidden">
          EducaNews
        </p>
      </Link>

      <div className="flex items-center gap-1">
        <div className="block md:hidden"></div>
      </div>
    </nav>
  );
}

export default Topbar;
