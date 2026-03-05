const Label = ({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <span className={className} {...props}>
      {children}
    </span>
  );
};

export default Label