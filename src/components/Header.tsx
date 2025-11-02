import logo from "figma:asset/00615d1b59bc611665476fb4668d05fa3e99d2d2.png";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="w-full bg-white border-b border-blue-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6">
        <div className="flex items-center justify-center">
          <Link to="/" aria-label="홈으로 이동">
            <img src={logo} alt="온통청년 로고" className="h-16 sm:h-20" />
          </Link>
        </div>
      </div>
    </header>
  );
}