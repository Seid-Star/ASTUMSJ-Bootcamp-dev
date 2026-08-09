function ColorPreview({ color }) {
  return (
    <div className="color-preview">
      <div
        className="color-preview__swatch"
        style={{ backgroundColor: color.toLowerCase() }}
      />
      <p className="color-preview__label">
        Selected color: <span style={{ color: color.toLowerCase() }}>{color}</span>
      </p>
    </div>
  );
}

export default ColorPreview;
