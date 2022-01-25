import { useState, ChangeEvent, useEffect } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
const PlacesAutocomplete = () => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
  } = usePlacesAutocomplete({
    requestOptions: {},
    debounce: 300,
  });
  const [pickupLatitude, setPickupLatitude] = useState<number>();
  const handleInput = (e: ChangeEvent<HTMLInputElement>): void => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  useEffect(() => {
    console.log("init()");
    getGeocode({ address: "Mylapore Chennai, Tamil Nadu, India" })
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        setPickupLatitude(lat);
        console.log("📍 Coordinates: ", { lat, lng });
      })
      .catch((error) => {
        console.log("😱 Error: ", error);
      });
  }, []);

  const handleSelect =
    ({ description }: any) =>
    () => {
      // Get latitude and longitude via utility functions
      getGeocode({ address: description })
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          setPickupLatitude(lat);
          console.log("📍 Coordinates: ", { lat, lng });
        })
        .catch((error) => {
          console.log("😱 Error: ", error);
        });
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;
      return (
        <li key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });
  return (
    <div>
      <input
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Where are you going?"
      />

      {status === "OK" && <ul>{renderSuggestions()}</ul>}
      {pickupLatitude}
    </div>
  );
};
export default PlacesAutocomplete;
