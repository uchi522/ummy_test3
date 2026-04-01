export default function TagBadge({ tag }) {
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium border"
      style={{
        backgroundColor: tag.color + '1A',
        borderColor: tag.color + '4D',
        color: tag.color,
      }}
    >
      {tag.label}
    </span>
  );
}
