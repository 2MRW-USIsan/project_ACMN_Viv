# Coding Guidelines

## Functional Programming Principles
- Aim to write pure functions without side effects.
- Favor function compositions and avoid deeply nested loops.
- Use higher-order functions (e.g., `map`, `filter`, `reduce`) to handle collections.

## Class Usage Restrictions
- Avoid using classes as data holders. Prefer data structures or objects without behavior.
- Keep classes small and focused on a single responsibility. Use composition over inheritance where possible.
- Restrict the use of static methods and properties unless necessary.

## Mapping Objects for Conditionals
- Always use functional approaches to handle conditionals, avoiding `if` statements whenever possible.
- Use objects/maps to represent state transitions or conditions, and retrieve actions based on current state.
- Leverage pattern matching or switch statements (where applicable) for clearer intent in conditionals.

## Immutability Patterns
- Adopt immutability as a default to avoid unintended side effects and make your code more predictable.
- Utilize libraries like Immutable.js or immer to handle complex data structures if needed.
- Always create copies of objects before mutating them, using spread operators or utility functions.

## Conclusion
Following these guidelines will enhance code maintainability, readability, and reduce bugs in the application. Embrace these principles as part of your development workflows!
