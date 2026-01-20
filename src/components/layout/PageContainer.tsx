import { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  title?: string;
  description?: string;
  actions?: ReactNode;
}

export const PageContainer = ({
  children,
  title,
  description,
  actions,
}: PageContainerProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {(title || actions) && (
        <div className="bg-white border-b border-gray-200 px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              {title && (
                <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
              )}
              {description && (
                <p className="mt-1 text-sm text-gray-600">{description}</p>
              )}
            </div>
            {actions && <div>{actions}</div>}
          </div>
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
};
