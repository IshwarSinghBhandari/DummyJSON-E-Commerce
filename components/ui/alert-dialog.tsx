import * as React from 'react';

type AlertDialogContextType = {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
};

const AlertDialogContext = React.createContext<AlertDialogContextType | undefined>(
  undefined,
);

interface AlertDialogProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export function AlertDialog({ open, onOpenChange, children }: AlertDialogProps) {
  if (!open) return null;

  return (
    <AlertDialogContext.Provider value={{ open, onOpenChange }}>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        {children}
      </div>
    </AlertDialogContext.Provider>
  );
}

interface AlertDialogContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function AlertDialogContent({
  children,
  className = '',
  ...props
}: AlertDialogContentProps) {
  return (
    <div
      className={`w-full max-w-md rounded-lg bg-white p-6 shadow-lg ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

interface AlertDialogHeaderProps {
  children: React.ReactNode;
}

export function AlertDialogHeader({ children }: AlertDialogHeaderProps) {
  return <div className="mb-4 space-y-2 text-left">{children}</div>;
}

interface AlertDialogTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export function AlertDialogTitle({
  children,
  className = '',
  ...props
}: AlertDialogTitleProps) {
  return (
    <h2
      className={`text-lg font-semibold leading-none tracking-tight ${className}`}
      {...props}
    >
      {children}
    </h2>
  );
}

interface AlertDialogDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export function AlertDialogDescription({
  children,
  className = '',
  ...props
}: AlertDialogDescriptionProps) {
  return (
    <p className={`text-sm text-gray-600 ${className}`} {...props}>
      {children}
    </p>
  );
}

interface AlertDialogFooterProps {
  children: React.ReactNode;
}

export function AlertDialogFooter({ children }: AlertDialogFooterProps) {
  return (
    <div className="mt-6 flex flex-row-reverse gap-2">{children}</div>
  );
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function AlertDialogAction({
  children,
  className = '',
  onClick,
  ...props
}: ButtonProps) {
  const ctx = React.useContext(AlertDialogContext);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    ctx?.onOpenChange?.(false);
  };

  return (
    <button
      type="button"
      className={`inline-flex h-9 items-center justify-center rounded-md bg-black px-3 text-sm font-medium text-white hover:bg-black/90 ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}

export function AlertDialogCancel({
  children,
  className = '',
  onClick,
  ...props
}: ButtonProps) {
  const ctx = React.useContext(AlertDialogContext);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    ctx?.onOpenChange?.(false);
  };

  return (
    <button
      type="button"
      className={`inline-flex h-9 items-center justify-center rounded-md border border-gray-200 bg-white px-3 text-sm font-medium text-gray-900 hover:bg-gray-50 ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}

