import Translate from "./Translate";

const CategoryBadge = ({ name, color = "#4f46e5" }) => (
  <span
    className="inline-block text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded"
    style={{ backgroundColor: color, color: "#fff" }}
  >
    <Translate>{name}</Translate>
  </span>
);

export default CategoryBadge;
