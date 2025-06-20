type PageTitleType = {
  title: string;
  description?: string;
  children?: React.ReactNode;
};

export function PageTitle({ title, description, children }: PageTitleType) {
  return (
    <div className="w-full flex flex-col items-start justify-start gap-4 lg:flex-row lg:items-center lg:justify-between pb-4 border-b border-border">
      <div className="flex flex-col items-start">
        <h3 className="text-lg lg:text-2xl font-bold">{title}</h3>
        {description && (
          <p className="text-muted-foreground text-xs lg:text-base">{description}</p>
        )}
      </div>
      {children && (
        <div className="flex items-center justify-center gap-2 flex-wrap w-fit">
          {children}
        </div>
      )}
    </div>
  );
}
