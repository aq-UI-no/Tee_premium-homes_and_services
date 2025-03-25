# TypeScript Style Guide

This style guide outlines the coding standards and best practices for the Tee Premium Homes & Services project.

## General Guidelines

### Code Formatting
- Use 2 spaces for indentation
- Use semicolons at the end of statements
- Use single quotes for strings
- Use double quotes for JSX attributes
- Use trailing commas in multiline objects and arrays
- Use parentheses around arrow function parameters
- Use curly braces for all control structures

### Naming Conventions
- Use PascalCase for component names
- Use camelCase for variables, functions, and methods
- Use UPPER_SNAKE_CASE for constants
- Use kebab-case for file names
- Use PascalCase for type and interface names

### File Organization
- One component per file
- Group related components in directories
- Keep files under 300 lines when possible
- Use index.ts files for clean exports

## React Guidelines

### Component Structure
```typescript
// 1. Imports
import React from 'react';
import { useNavigate } from 'react-router-dom';

// 2. Types/Interfaces
interface ComponentProps {
  title: string;
  description?: string;
}

// 3. Component
export function Component({ title, description }: ComponentProps) {
  // 4. Hooks
  const navigate = useNavigate();

  // 5. Event Handlers
  const handleClick = () => {
    // Implementation
  };

  // 6. Render
  return (
    <div>
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </div>
  );
}
```

### Hooks
- Use custom hooks for reusable logic
- Prefix custom hooks with 'use'
- Keep hooks at the top of components
- Don't call hooks inside loops or conditions

### Props
- Use TypeScript interfaces for prop types
- Make props required unless they have a default value
- Use destructuring for props
- Document complex props with JSDoc comments

## TypeScript Guidelines

### Types and Interfaces
```typescript
// Use interfaces for object types
interface User {
  id: string;
  name: string;
  email: string;
}

// Use type for unions and intersections
type Status = 'active' | 'inactive' | 'pending';
type ExtendedUser = User & { role: string };

// Use enums for constants
enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest'
}
```

### Generics
```typescript
// Use generics for reusable components
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}
```

## State Management

### Local State
- Use useState for simple state
- Use useReducer for complex state logic
- Keep state as local as possible
- Use context for shared state

### Global State
- Use Redux for complex global state
- Use React Query for server state
- Keep global state minimal
- Document state structure

## Testing Guidelines

### Unit Tests
```typescript
import { render, screen } from '@testing-library/react';
import { Component } from './Component';

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component title="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
```

### Integration Tests
- Test component interactions
- Test data flow
- Test error states
- Test loading states

## Performance Guidelines

### Optimization
- Use React.memo for expensive renders
- Use useMemo for expensive computations
- Use useCallback for event handlers
- Lazy load components when possible

### Code Splitting
- Use dynamic imports
- Split by routes
- Split by feature
- Keep bundle size small

## Documentation

### Comments
- Use JSDoc for function documentation
- Document complex logic
- Keep comments up to date
- Remove unnecessary comments

### README
- Keep README up to date
- Document setup steps
- Document environment variables
- Document deployment process

## Git Guidelines

### Commits
- Use semantic commit messages
- Keep commits atomic
- Write clear commit messages
- Reference issues in commits

### Branches
- Use feature branches
- Use semantic branch names
- Keep branches up to date
- Delete merged branches

## Security Guidelines

### Best Practices
- Validate user input
- Sanitize data
- Use HTTPS
- Keep dependencies updated

### Authentication
- Use secure tokens
- Implement proper session management
- Use secure password storage
- Implement rate limiting

## Accessibility

### Guidelines
- Use semantic HTML
- Add ARIA labels
- Ensure keyboard navigation
- Test with screen readers

### Color Contrast
- Maintain WCAG 2.1 compliance
- Test color combinations
- Provide alternative text
- Support dark mode 