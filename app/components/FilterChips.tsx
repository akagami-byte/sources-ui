interface FilterChipsProps {
  options: string[];
  selected: string;
  onChange: (value: string) => void;
}

export function FilterChips({ options, selected, onChange }: FilterChipsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
      {options.map((opt) => {
        const isActive = selected === opt;
        return (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            style={{
              flexShrink: 0,
              height: 32,
              paddingLeft: 12,
              paddingRight: 12,
              borderRadius: 20,
              fontSize: 13,
              fontWeight: isActive ? 600 : 400,
              background: isActive ? "#0052CC" : "#F0F0F0",
              color: isActive ? "white" : "#616161",
              border: "none",
              cursor: "pointer",
              transition: "all 200ms ease-in-out",
              whiteSpace: "nowrap",
            }}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
