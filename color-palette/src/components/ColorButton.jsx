const EMOJI_BY_COLOR = {
  Red: "🟥",
  Blue: "🟦",
  Green: "🟩",
  Yellow: "🟨",
  Purple: "🟪",
};

function ColorButton({ color, onClick, isSelected }) {
  return (
    <button
      type="button"
      className={`color-button ${isSelected ? "color-button--selected" : ""}`}
      style={{ "--swatch": color.toLowerCase() }}
      onClick={() => onClick(color)}
    >
      <span className="color-button__dab">{EMOJI_BY_COLOR[color] ?? "⬤"}</span>
      <span className="color-button__label">{color}</span>
      {isSelected && <span className="color-button__check">✓</span>}
    </button>
  );
}

export default ColorButton;
