import React, { useState, useEffect } from "react";
import "./index.css";

export default function App() {
  const [inputs, setInputs] = useState({
    chicken: false,
    eggCount: 0,
    paneer: false,
    dal: false,
    peanuts: false,
    whey: false,
    soya: false,
  });

  const [extras, setExtras] = useState([{ name: "", calories: 0, protein: 0 }]);

  useEffect(() => {
    const savedInputs = JSON.parse(localStorage.getItem("foodieInputs"));
    const savedExtras = JSON.parse(localStorage.getItem("foodieExtras"));
    if (savedInputs) setInputs(savedInputs);
    if (savedExtras) setExtras(savedExtras);
  }, []);

  useEffect(() => {
    localStorage.setItem("foodieInputs", JSON.stringify(inputs));
    localStorage.setItem("foodieExtras", JSON.stringify(extras));
  }, [inputs, extras]);

  const handleExtraChange = (index, field, value) => {
    const updatedExtras = [...extras];
    updatedExtras[index][field] = field === "name" ? value : parseFloat(value || 0);
    setExtras(updatedExtras);
  };

  const addExtraField = () => {
    setExtras([...extras, { name: "", calories: 0, protein: 0 }]);
  };

  const calculateProtein = () => {
    let protein = 0;
    if (inputs.chicken) protein += 30;
    protein += inputs.eggCount * 6;
    if (inputs.paneer) protein += 9;
    if (inputs.dal) protein += 7;
    if (inputs.peanuts) protein += 10;
    if (inputs.whey) protein += 24;
    if (inputs.soya) protein += 12;
    extras.forEach(extra => {
      protein += extra.protein;
    });
    return protein;
  };

  const calculateCalories = () => {
    let cal = 0;
    if (inputs.chicken) cal += 165;
    cal += inputs.eggCount * 70;
    if (inputs.paneer) cal += 130;
    if (inputs.dal) cal += 150;
    if (inputs.peanuts) cal += 250;
    if (inputs.whey) cal += 130;
    if (inputs.soya) cal += 120;
    extras.forEach(extra => {
      cal += extra.calories;
    });
    return cal;
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🍽️ Foodie – Daily Tracker</h1>

      <div style={styles.section}>
        <h2>Meals Consumed</h2>
        <label><input type="checkbox" checked={inputs.chicken} onChange={() => setInputs({ ...inputs, chicken: !inputs.chicken })} /> Chicken</label>
        <label>Eggs: <input type="number" value={inputs.eggCount} onChange={e => setInputs({ ...inputs, eggCount: parseInt(e.target.value || 0) })} /></label>
        <label><input type="checkbox" checked={inputs.paneer} onChange={() => setInputs({ ...inputs, paneer: !inputs.paneer })} /> Paneer</label>
        <label><input type="checkbox" checked={inputs.dal} onChange={() => setInputs({ ...inputs, dal: !inputs.dal })} /> Dal</label>
        <label><input type="checkbox" checked={inputs.peanuts} onChange={() => setInputs({ ...inputs, peanuts: !inputs.peanuts })} /> Peanuts</label>
        <label><input type="checkbox" checked={inputs.whey} onChange={() => setInputs({ ...inputs, whey: !inputs.whey })} /> Whey</label>
        <label><input type="checkbox" checked={inputs.soya} onChange={() => setInputs({ ...inputs, soya: !inputs.soya })} /> Soya</label>
      </div>

      <div style={styles.section}>
        <h2>Extra Items</h2>
        {extras.map((item, i) => (
          <div key={i} style={styles.row}>
            <input placeholder="Item" value={item.name} onChange={e => handleExtraChange(i, 'name', e.target.value)} />
            <input type="number" placeholder="Calories" value={item.calories} onChange={e => handleExtraChange(i, 'calories', e.target.value)} />
            <input type="number" placeholder="Protein (g)" value={item.protein} onChange={e => handleExtraChange(i, 'protein', e.target.value)} />
          </div>
        ))}
        <button onClick={addExtraField}>+ Add More</button>
      </div>

      <div style={styles.section}>
        <h2>📊 Daily Totals</h2>
        <p><strong>Protein:</strong> {calculateProtein()} g</p>
        <p><strong>Calories:</strong> {calculateCalories()} kcal</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "auto",
    padding: "1rem",
    fontFamily: "sans-serif"
  },
  heading: {
    textAlign: "center",
    fontSize: "1.5rem"
  },
  section: {
    background: "#f9f9f9",
    padding: "1rem",
    borderRadius: "8px",
    marginTop: "1rem",
    boxShadow: "0 0 4px rgba(0,0,0,0.1)"
  },
  row: {
    display: "flex",
    gap: "0.5rem",
    marginBottom: "0.5rem"
  }
};
