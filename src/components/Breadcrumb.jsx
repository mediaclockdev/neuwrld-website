import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Breadcrumb = () => {
  const breadcrumb = useSelector((state) => state.categories.breadcrumb);

  if (!breadcrumb.length) return null;

  return (
    <nav className="text-sm text-gray-600 mb-4">
      <ul className="flex items-center gap-2">
        <li>
          <Link to="/" className="hover:underline">
            Home
          </Link>
        </li>

        {breadcrumb.map((item, index) => (
          <li key={item.slug} className="flex items-center gap-2">
            <span>/</span>
            {index === breadcrumb.length - 1 ? (
              <span className="font-medium text-black">{item.name}</span>
            ) : (
              <Link to={`/category/${item.slug}`} className="hover:underline">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
