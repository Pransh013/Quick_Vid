const FormField = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  as = "input",
  options = [],
}: FormFieldProps) => {

  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      {as === "input" ? (
        <input
          type="text"
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          name={id}
        />
      ) : as === "textarea" ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
            name={id}
            rows={3}
        />
      ) : as === "select" ? (
        <select id={id} value={value} onChange={onChange} name={id}>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : null}
    </div>
  );
};

export default FormField;
