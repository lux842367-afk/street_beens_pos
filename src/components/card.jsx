function Card({ title, value, children, className = "" }) {
  return (
    <div className={`card ${className}`}>
      {title && <h3>{title}</h3>}
      {value && <p>{value}</p>}
      {children}
    </div>
  );
}

export default Card;