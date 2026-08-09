import { useState } from "react";
import ColorButton from "./components/ColorButton";
import ColorPreview from "./components/ColorPreview";
import Card from "./components/Card";
const colors = ["Red", "Blue", "Green", "Yellow", "Purple"];
function App() {
  const [selectedColor, setSelectedColor] = useState(null);
  const [customHex, setCustomHex] = useState("");
  function handleSelect(color) {
    setSelectedColor(color);
    setCustomHex("");
  }
  function handleReset() {
    setSelectedColor(null);
    setCustomHex("");
  }
  function handleHexSubmit(event) {
    event.preventDefault();
    const value = customHex.trim();
    if (/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(value)) {
      setSelectedColor(value);
    }
  }

  const activeColor = selectedColor;

  return (
    <div className="app">
      <Card>
        <header className="app__header">
          <h1>
            Color Palette <span className="Picker-text">Picker</span>
          </h1>
          <p>Pick a color to preview it below</p>
        </header>

        <section className="app__section">
          <h2 className="app__section-title">Choose a color</h2>
          <div className="app__button-row">
            {colors.map((color) => (
              <ColorButton
                key={color}
                color={color}
                onClick={handleSelect}
                isSelected={selectedColor === color}
              />
            ))}
          </div>
        </section>

        <section className="app__section">
          <h2 className="app__section-title">Preview</h2>

          {activeColor ? (
            <ColorPreview color={activeColor} />
          ) : (
            <div className="app__placeholder">
              <span className="app__placeholder-icon">🎨</span>
              <p>No color selected yet</p>
            </div>
          )}
        </section>

        <form className="app__hex-form" onSubmit={handleHexSubmit}>
          <label htmlFor="hex-input" className="app__hex-label">
            Or try a custom hex color
          </label>
          <div className="app__hex-row">
            <input
              id="hex-input"
              type="text"
              placeholder="#A855F7"
              value={customHex}
              onChange={(event) => setCustomHex(event.target.value)}
              className="app__hex-input"
            />
            <button type="submit" className="app__hex-button">
              Preview
            </button>
          </div>
        </form>

        <button type="button" className="app__reset" onClick={handleReset}>
          ⟳ Reset
        </button>
      </Card>
    </div>
  );
}

export default App;
