import { useState } from "react";

const ItineraryForm = ({ onGenerate }) => {
  const [preferences, setPreferences] = useState([]);
  const [days, setDays] = useState(3);

  const handlePreferenceChange = (event) => {
    const value = event.target.value;
    setPreferences((prev) =>
      prev.includes(value) ? prev.filter((p) => p !== value) : [...prev, value]
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onGenerate({ preferences, days });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Plan Your Trip</h2>

      <label>
        Trip Duration (Days):
        <input
          type="number"
          value={days}
          min="1"
          onChange={(e) => setDays(e.target.value)}
        />
      </label>

      <fieldset>
        <legend>Select Interests:</legend>
        <label>
          <input
            type="checkbox"
            value="nature"
            onChange={handlePreferenceChange}
          />
          Nature
        </label>
        <label>
          <input
            type="checkbox"
            value="culture"
            onChange={handlePreferenceChange}
          />
          Culture
        </label>
        <label>
          <input
            type="checkbox"
            value="adventure"
            onChange={handlePreferenceChange}
          />
          Adventure
        </label>
      </fieldset>

      <button type="submit">Generate Itinerary</button>
    </form>
  );
};

export default ItineraryForm;
