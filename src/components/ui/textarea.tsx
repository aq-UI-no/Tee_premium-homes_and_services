import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export function Textarea({ className = '', ...props }: TextareaProps) {
  return (
    <textarea
      className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent ${className}`}
      {...props}
    />
  );
} 