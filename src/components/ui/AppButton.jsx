const AppButton = ({ onClick, className = "", children, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={className}
    >
      {children}
    </button>
  );
};

export default AppButton;
