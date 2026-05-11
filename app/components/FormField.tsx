import { ReactNode, InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";

interface FormFieldProps {
  label: string;
  required?: boolean;
  children: ReactNode;
  error?: string;
}

export function FormField({ label, required, children, error }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label style={{ fontSize: 12, fontWeight: 600, color: "#001A4D" }}>
        {label}
        {required && <span style={{ color: "#EF5350", marginLeft: 2 }}>*</span>}
      </label>
      {children}
      {error && (
        <span style={{ fontSize: 11, color: "#EF5350", marginTop: 2 }}>{error}</span>
      )}
    </div>
  );
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export function Input({ error, style, ...props }: InputProps) {
  return (
    <input
      {...props}
      style={{
        height: 44,
        background: "#F0F7FF",
        border: `1px solid ${error ? "#EF5350" : "#E0E0E0"}`,
        borderRadius: 12,
        padding: "0 12px",
        fontSize: 14,
        color: "#001A4D",
        outline: "none",
        width: "100%",
        boxSizing: "border-box",
        fontFamily: "inherit",
        ...style,
      }}
      onFocus={(e) => {
        e.target.style.borderColor = "#0052CC";
        e.target.style.boxShadow = "0 0 0 3px rgba(0,82,204,0.1)";
        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        e.target.style.borderColor = error ? "#EF5350" : "#E0E0E0";
        e.target.style.boxShadow = "none";
        props.onBlur?.(e);
      }}
    />
  );
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export function Textarea({ error, style, ...props }: TextareaProps) {
  return (
    <textarea
      {...props}
      style={{
        minHeight: 88,
        background: "#F0F7FF",
        border: `1px solid ${error ? "#EF5350" : "#E0E0E0"}`,
        borderRadius: 12,
        padding: "12px",
        fontSize: 14,
        color: "#001A4D",
        outline: "none",
        width: "100%",
        boxSizing: "border-box",
        resize: "vertical",
        fontFamily: "inherit",
        lineHeight: 1.5,
        ...style,
      }}
      onFocus={(e) => {
        e.target.style.borderColor = "#0052CC";
        e.target.style.boxShadow = "0 0 0 3px rgba(0,82,204,0.1)";
        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        e.target.style.borderColor = error ? "#EF5350" : "#E0E0E0";
        e.target.style.boxShadow = "none";
        props.onBlur?.(e);
      }}
    />
  );
}

interface SelectFieldProps {
  value: string;
  onChange: (val: string) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
  error?: boolean;
}

export function SelectField({ value, onChange, options, placeholder, error }: SelectFieldProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          height: 44,
          background: "#F0F7FF",
          border: `1px solid ${error ? "#EF5350" : "#E0E0E0"}`,
          borderRadius: 12,
          padding: "0 36px 0 12px",
          fontSize: 14,
          color: value ? "#001A4D" : "#9E9E9E",
          outline: "none",
          width: "100%",
          boxSizing: "border-box",
          fontFamily: "inherit",
          appearance: "none",
          cursor: "pointer",
        }}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={16}
        color="#9E9E9E"
        style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
      />
    </div>
  );
}
