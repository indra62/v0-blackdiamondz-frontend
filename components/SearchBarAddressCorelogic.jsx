import React, { useState, useRef } from "react";
import Paddington from "@/components/paddington";

const SearchBarAddressCorelogic = () => {
  const [showPaddington, setShowPaddington] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [paddingtonKey, setPaddingtonKey] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const debounceTimeout = useRef(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    if (value.trim() === "") {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }
    debounceTimeout.current = setTimeout(() => {
      fetchSuggestions(value);
    }, 300);
  };

  const fetchSuggestions = async (query) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/corelogic-suggest-autocomplete?q=${encodeURIComponent(query)}`
      );
      if (!res.ok) throw new Error("Failed to fetch suggestions");
      const data = await res.json();
      setSuggestions(data.suggestions || []);
      setShowDropdown(true);
    } catch (err) {
      setSuggestions([]);
      setShowDropdown(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion.suggestion || "");
    setSelectedSuggestion(suggestion);
    setShowDropdown(false);
  };

  return (
    <>
    <div className="flex flex-col md:flex-row gap-4 mt-8 relative w-full">
        <div className="flex-grow relative">
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="Start typing to find your address..."
            className="w-full bg-transparent border border-[#656565] p-4 text-white focus:outline-none focus:border-[#BD9574]"
            autoComplete="off"
            onFocus={() =>
              inputValue && suggestions.length > 0 && setShowDropdown(true)
            }
            onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
          />
          {showDropdown && suggestions.length > 0 && (
            <ul className="absolute z-10 left-0 bg-[#22201a] border border-[#656565] mt-1 shadow-lg max-h-60 overflow-auto w-full list-none text-left p-0 m-0">
              {loading && (
                <li className="px-[-40px] py-2 text-gray-400">Loading...</li>
              )}
              {!loading &&
                suggestions.map((s, idx) => (
                  <li
                    key={s.propertyId || idx}
                    className="w-full m-0 px-4 py-2 cursor-pointer hover:bg-[#BD9574] hover:text-[#211f17] text-white text-left"
                    onMouseDown={() => handleSuggestionClick(s)}
                  >
                    {s.suggestion}
                  </li>
                ))}
            </ul>
          )}
        </div>
        <button
          className={`bg-[#BD9574] text-[#211f17] px-8 py-4 hover:bg-[#BD9574] transition-colors ${!selectedSuggestion ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => {
            setShowPaddington(true);
            setPaddingtonKey(Date.now());
          }}
          disabled={!selectedSuggestion}
        >
          Find Out
        </button>
      </div>
      {showPaddington && (
        <Paddington key={paddingtonKey} selectedSuggestion={selectedSuggestion} />
      )}
    </>
  );
};

export default SearchBarAddressCorelogic;
