---
title: TypeScript Best Practices
date: 2025-12-20
category: software-engineering
excerpt: Mastering TypeScript to catch bugs early and write safer code. Advanced types, generics, and how to leverage the type system effectively.
author: Sagun Pandey
tags: typescript, type-safety, generics, advanced-types
---

# TypeScript Best Practices

TypeScript has become the de facto standard for large-scale JavaScript applications. By leveraging TypeScript's powerful type system, you can catch bugs early and write more maintainable code.

## Type Safety as a First-Class Feature

TypeScript's primary benefit is preventing entire categories of bugs at compile time:

```typescript
// JavaScript - Bug at runtime
function getUser(id) {
  return users[id]; // Returns undefined if not found, but caller doesn't know
}

// TypeScript - Caught at compile time
function getUser(id: number): User | undefined {
  return users[id];
}

// Caller must handle undefined case
const user = getUser(123);
if (user) {
  console.log(user.name); // Type guard
}
```

## Using Generics Effectively

Generics allow you to write reusable, type-safe code:

```typescript
// Generic function
function identity<T>(value: T): T {
  return value;
}

const num = identity<number>(42); // num is inferred as number
const str = identity<string>("hello"); // str is inferred as string

// Generic interface
interface Container<T> {
  value: T;
  getValue(): T;
  setValue(value: T): void;
}

// Generic class
class Stack<T> {
  private items: T[] = [];
  
  push(item: T) {
    this.items.push(item);
  }
  
  pop(): T | undefined {
    return this.items.pop();
  }
}
```

## Advanced Type Patterns

### Union Types
```typescript
type Status = 'pending' | 'success' | 'error';

function handleStatus(status: Status) {
  switch(status) {
    case 'pending':
      // TypeScript knows only 'pending' is possible here
      break;
    case 'success':
      // TypeScript knows only 'success' is possible here
      break;
    case 'error':
      // TypeScript knows only 'error' is possible here
      break;
  }
}
```

### Intersection Types
```typescript
type HasName = { name: string };
type HasAge = { age: number };

type Person = HasName & HasAge; // Person has both name and age
```

### Conditional Types
```typescript
// Only allow string if T is a string, otherwise allow number
type StringOrNumber<T> = T extends string ? string : number;

type A = StringOrNumber<"hello">; // string
type B = StringOrNumber<number>; // number
```

### Mapped Types
```typescript
// Create a type where all properties are readonly
type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};

// Create a type where all properties are optional
type Partial<T> = {
  [K in keyof T]?: T[K];
};
```

## Strict Mode

Always enable `strict` mode in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitThis": true
  }
}
```

## Discriminated Unions

A powerful pattern for type-safe state handling:

```typescript
type Result<T> = 
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };

function handleResult<T>(result: Result<T>) {
  switch (result.status) {
    case 'loading':
      console.log('Loading...');
      // result.data doesn't exist - TypeScript prevents access
      break;
    case 'success':
      console.log(result.data); // Only available in success case
      break;
    case 'error':
      console.log(result.error); // Only available in error case
      break;
  }
}
```

## Utility Types

TypeScript provides built-in utility types for common transformations:

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

// Partial<T> - Make all properties optional
type PartialUser = Partial<User>;

// Required<T> - Make all properties required
type RequiredUser = Required<PartialUser>;

// Pick<T, K> - Select specific properties
type UserPreview = Pick<User, 'id' | 'name'>;

// Omit<T, K> - Exclude specific properties
type UserWithoutEmail = Omit<User, 'email'>;

// Record<K, T> - Create object type with specific keys
type Roles = Record<'admin' | 'user' | 'guest', User[]>;
```

## Best Practices Summary

1. **Use strict mode** - Catch more errors at compile time
2. **Avoid `any`** - Use `unknown` if you must handle untyped values
3. **Leverage inference** - You don't always need explicit types
4. **Use discriminated unions** - For type-safe state handling
5. **Extract common types** - Reduce duplication
6. **Document complex types** - Add comments explaining why
7. **Use const assertions** - For literal type inference
8. **Keep types simple** - Complex types can be harder to understand

---

TypeScript is a powerful tool for writing maintainable, type-safe code. The investment in learning its advanced features pays dividends in code quality and developer productivity.

