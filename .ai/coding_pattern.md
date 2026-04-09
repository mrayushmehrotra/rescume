# Coding Patterns & Standards

To ensure consistency across the **Rescume** codebase, all AI-generated and manual code should adhere to the following architectural patterns.

## 1. Functional Component Architecture
We use React Functional Components with Hooks as the primary UI building block.

- **Component Structure**: Use Arrow Functions with explicit return types (`React.FC` or inferred).
- **Hooks**: Leverage standard hooks (`useState`, `useEffect`, `useMemo`) and custom hooks for shared logic.
- **Fragments**: Use `<>...</>` to avoid unnecessary DOM bloating.
- **Props**: Always define props using `interface` or `type`.

```tsx
interface ButtonProps {
  label: string;
  onClick: () => void;
}

export const AppButton: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button onClick={onClick} className="...">
      {label}
    </button>
  );
};
```

## 2. OOP Concepts in Logic & Data
While the UI is functional, the underlying business logic and data modeling should leverage OOP concepts where it improves structure and reusability.

- **Classes for Entities**: Use classes to model core entities (e.g., `Resume`, `User`, `TailoringSession`) when they require internal state transition logic or complex calculations.
- **Service Pattern**: Use classes or singleton objects to encapsulate external API calls and side effects (e.g., `AIService`, `LaTeXCompiler`).
- **Encapsulation**: Keep private logic hidden and expose only what is necessary via public methods or getters.
- **Interfaces**: Use interfaces to define contracts for services, ensuring mockability for testing.

```tsx
// OOP for Entity Logic
class ResumeBuilder {
  private content: string;

  constructor(baseContent: string) {
    this.content = baseContent;
  }

  public async tailorForJD(jd: string): Promise<void> {
    // Logic to interact with AI Service
  }

  public getRawLaTeX(): string {
    return this.content;
  }
}
```

## 3. Directory Structure
- `src/components`: UI components (Atoms, Molecules, Organisms).
- `src/lib`: Core logic, classes, and utility services (OOP focused).
- `src/hooks`: Custom React hooks for functional logic sharing.
- `src/app`: Next.js App Router routes and page components.

## 4. State Management
- **Local State**: Functional `useState`/`useReducer`.
- **Global State**: Context API or specialized stores (Zustand/Jotai) if needed, following a predictable pattern.

## 5. Styling
- **Tailwind CSS v4**: Utility-first styling.
- **shadcn/ui**: Component-based UI library following the defined functional pattern.
