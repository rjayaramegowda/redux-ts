import { ChangeEvent } from "react";
import usePlacesAutocomplete from "use-places-autocomplete";

export default function App() {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
  } = usePlacesAutocomplete();

  const handleInput = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  function renderList(): JSX.Element {
    const suggestions = data.map(({ place_id, description }: any) => (
      <li key={place_id}>{description}</li>
    ));

    return <ul>{suggestions}</ul>;
  }

  return (
    <div className="conatiner">
      <input
        style={{ width: 300, maxWidth: "90%" }}
        value={value}
        onChange={handleInput}
        disabled={!ready}
      />
      {renderList()}
    </div>
  );
}
