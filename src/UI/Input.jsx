import "../layouts/authentication/sign-in.css";
// eslint-disable-next-line react/prop-types
export default function Input({ label, id, error, ...props }) {
  return (
    <div className="control no—margin">
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} />
      <div>{error && <p>{error}</p>}</div>
    </div>
  );
}
