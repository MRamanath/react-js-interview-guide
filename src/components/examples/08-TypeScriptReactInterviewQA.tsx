import React, { useState, useCallback } from 'react'

/**
 * TOP INTERVIEW QUESTIONS: TYPESCRIPT WITH REACT
 * 
 * Most commonly asked questions about using TypeScript in React applications
 */

export default function TypeScriptReactInterviewQA() {
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', color: 'var(--text-primary)' }}>
      <h1>🔷 TypeScript with React - Top Interview Questions</h1>
      
      <Section1_WhyTypeScript />
      <Section2_ComponentTypes />
      <Section3_HooksWithTS />
      <Section4_AdvancedPatterns />
      <Section5_CommonPitfalls />
    </div>
  )
}

// ============================================================================
// Q1: Why use TypeScript with React?
// ============================================================================
function Section1_WhyTypeScript() {
  return (
    <div style={{ marginBottom: '40px', padding: '20px', border: '2px solid #61dafb', borderRadius: '8px', color: 'var(--text-primary)' }}>
      <h2>Q1: Why use TypeScript with React?</h2>
      
      <div style={{ background: '#1e1e1e', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
        <h3>Answer:</h3>
        <p><strong>TypeScript</strong> adds static type checking to JavaScript, catching errors at compile time rather than runtime.</p>
        
        <h4>Benefits of TypeScript with React:</h4>
        <ul>
          <li>✅ <strong>Catch errors early</strong> - Before runtime</li>
          <li>✅ <strong>Better IDE support</strong> - IntelliSense, autocomplete</li>
          <li>✅ <strong>Self-documenting code</strong> - Types as documentation</li>
          <li>✅ <strong>Refactoring confidence</strong> - Safe to change code</li>
          <li>✅ <strong>Better team collaboration</strong> - Clear interfaces</li>
          <li>✅ <strong>Improved maintainability</strong> - Easier to understand code</li>
        </ul>

        <h4>When to use TypeScript:</h4>
        <ul>
          <li>Large applications with multiple developers</li>
          <li>Long-term projects requiring maintainability</li>
          <li>Complex data structures</li>
          <li>Public libraries or APIs</li>
        </ul>
      </div>

      <pre style={{ background: '#282c34', color: '#61dafb', padding: '15px', borderRadius: '5px', overflow: 'auto' }}>
{`// JavaScript (No type safety)
function greet(name) {
  return "Hello, " + name.toUpperCase()
}

greet(123)  // Runtime error! ❌
greet()     // Runtime error! ❌

// TypeScript (Type safety)
function greet(name: string): string {
  return "Hello, " + name.toUpperCase()
}

greet(123)  // ❌ Compile error: Argument of type 'number' is not assignable
greet()     // ❌ Compile error: Expected 1 arguments, but got 0

greet("John")  // ✅ Works perfectly

// React Component without TypeScript
function Button({ label, onClick, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  )
}

// What types are label, onClick, disabled? 🤔
// Can I pass a number for label? String for onClick?
// No way to know without checking implementation!

// React Component with TypeScript
interface ButtonProps {
  label: string
  onClick: () => void
  disabled?: boolean  // Optional
}

function Button({ label, onClick, disabled = false }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  )
}

// Now it's crystal clear! ✨
// - label must be a string
// - onClick is a function that takes no args and returns void
// - disabled is optional and must be a boolean

// Usage
<Button 
  label="Click me"
  onClick={() => console.log('clicked')}
/>  // ✅ Valid

<Button 
  label={123}  // ❌ Type error!
  onClick="hello"  // ❌ Type error!
/>

// IDE Benefits
const props: ButtonProps = {
  label: "Test",
  onClick: () => {},
  dis// ← IntelliSense shows "disabled" here! 🎉
}

// Common TypeScript Types for React
type Status = 'idle' | 'loading' | 'success' | 'error'  // Union types

interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'user'
  metadata?: Record<string, any>  // Optional
}

type ApiResponse<T> = {
  data: T
  status: number
  error?: string
}

// Generic component
interface ListProps<T> {
  items: T[]
  renderItem: (item: T) => React.ReactNode
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  )
}

// Usage with type inference
<List 
  items={[1, 2, 3]}
  renderItem={(num) => <span>{num}</span>}  // num is inferred as number
/>

<List 
  items={users}
  renderItem={(user) => <span>{user.name}</span>}  // user is inferred as User
/>`}
      </pre>

      <div style={{ marginTop: '15px', padding: '10px', background: '#3a3510', color: '#f0e68c', borderRadius: '5px' }}>
        <strong>Interview Tip:</strong> Emphasize that TypeScript catches bugs during development, not production. Mention IntelliSense and refactoring benefits. Discuss the learning curve but long-term benefits.
      </div>
    </div>
  )
}

// ============================================================================
// Q2: How to type React components?
// ============================================================================
function Section2_ComponentTypes() {
  return (
    <div style={{ marginBottom: '40px', padding: '20px', border: '2px solid #61dafb', borderRadius: '8px', color: 'var(--text-primary)' }}>
      <h2>Q2: How do you type React components in TypeScript?</h2>
      
      <div style={{ background: '#1e1e1e', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
        <h3>Answer:</h3>
        <p>React components can be typed using <code>React.FC</code>, function signatures, or inline prop types.</p>
        
        <h4>Common Approaches:</h4>
        <ol>
          <li><strong>Interface/Type + Function</strong> - Recommended ✅</li>
          <li><strong>React.FC</strong> - Older approach, less recommended</li>
          <li><strong>Inline types</strong> - For simple components</li>
        </ol>
      </div>

      <pre style={{ background: '#282c34', color: '#61dafb', padding: '15px', borderRadius: '5px', overflow: 'auto' }}>
{`// Method 1: Interface + Function (Recommended ✅)
interface ButtonProps {
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary'
  disabled?: boolean
  children?: React.ReactNode
}

function Button({ label, onClick, variant = 'primary', disabled }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled} className={variant}>
      {label}
    </button>
  )
}

// Method 2: Type alias (also good ✅)
type ButtonProps = {
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}

const Button = ({ label, onClick, variant = 'primary' }: ButtonProps) => {
  return <button onClick={onClick} className={variant}>{label}</button>
}

// Method 3: React.FC (older, less recommended)
const Button: React.FC<ButtonProps> = ({ label, onClick, variant = 'primary' }) => {
  return <button onClick={onClick} className={variant}>{label}</button>
}
// Issues: Implicitly types children, harder to work with generics

// Method 4: Inline types (for simple components)
function Button({ label }: { label: string }) {
  return <button>{label}</button>
}

// Props with children
interface CardProps {
  title: string
  children: React.ReactNode  // Can be anything renderable
}

function Card({ title, children }: CardProps) {
  return (
    <div>
      <h2>{title}</h2>
      {children}
    </div>
  )
}

// Event handlers
interface FormProps {
  onSubmit: (data: FormData) => void
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

function Form({ onSubmit, onChange, onClick }: FormProps) {
  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      onSubmit(new FormData(e.currentTarget))
    }}>
      <input onChange={onChange} />
      <button onClick={onClick}>Submit</button>
    </form>
  )
}

// Common event types
type InputChangeEvent = React.ChangeEvent<HTMLInputElement>
type ButtonClickEvent = React.MouseEvent<HTMLButtonElement>
type FormSubmitEvent = React.FormEvent<HTMLFormElement>
type KeyboardEvent = React.KeyboardEvent<HTMLInputElement>

// Ref types
interface InputProps {
  inputRef: React.RefObject<HTMLInputElement>
}

function Input({ inputRef }: InputProps) {
  return <input ref={inputRef} />
}

// Component with generics
interface SelectProps<T> {
  options: T[]
  value: T
  onChange: (value: T) => void
  getLabel: (option: T) => string
  getValue: (option: T) => string | number
}

function Select<T>({ options, value, onChange, getLabel, getValue }: SelectProps<T>) {
  return (
    <select 
      value={getValue(value)} 
      onChange={(e) => {
        const selectedValue = e.target.value
        const option = options.find(opt => getValue(opt).toString() === selectedValue)
        if (option) onChange(option)
      }}
    >
      {options.map((option) => (
        <option key={getValue(option)} value={getValue(option)}>
          {getLabel(option)}
        </option>
      ))}
    </select>
  )
}

// Usage
const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' }
]

<Select
  options={users}
  value={users[0]}
  onChange={(user) => console.log(user.name)}  // user is typed as User!
  getLabel={(user) => user.name}
  getValue={(user) => user.id}
/>

// Extending HTML element props
interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary'
}

function CustomButton({ variant, ...props }: CustomButtonProps) {
  return <button {...props} className={\`btn-\${variant}\`} />
}

// Usage - Gets all native button props!
<CustomButton 
  variant="primary"
  onClick={() => {}}
  disabled
  type="submit"
  aria-label="Submit"
  // All button props available! ✨
/>

// Component with no props
function Header() {
  return <h1>Welcome</h1>
}
// OR
const Header: React.FC = () => {
  return <h1>Welcome</h1>
}

// Optional vs Required props
interface UserCardProps {
  name: string           // Required
  age?: number          // Optional
  email: string | undefined  // Can be undefined
}

// Discriminated unions for complex props
type ButtonProps = 
  | { variant: 'primary'; color?: never }
  | { variant: 'custom'; color: string }

function Button(props: ButtonProps) {
  if (props.variant === 'primary') {
    // color is not available here
    return <button className="primary">Click</button>
  } else {
    // color is required here
    return <button style={{ backgroundColor: props.color }}>Click</button>
  }
}`}
      </pre>

      <div style={{ marginTop: '15px', padding: '10px', background: '#3a3510', color: '#f0e68c', borderRadius: '5px' }}>
        <strong>Interview Tip:</strong> Recommend using interface + function over React.FC. Mention extending HTML attributes for custom components. Discuss children typing and event handler types.
      </div>
    </div>
  )
}

// ============================================================================
// Q3: How to type React hooks?
// ============================================================================
function Section3_HooksWithTS() {
  const [count, setCount] = useState(0)
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)

  return (
    <div style={{ marginBottom: '40px', padding: '20px', border: '2px solid #61dafb', borderRadius: '8px', color: 'var(--text-primary)' }}>
      <h2>Q3: How do you type React hooks in TypeScript?</h2>
      
      <div style={{ background: '#1e1e1e', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
        <h3>Answer:</h3>
        <p>React hooks can be typed using TypeScript generics and type inference.</p>
        
        <h4>Key Concepts:</h4>
        <ul>
          <li><strong>useState</strong> - Type is inferred from initial value</li>
          <li><strong>useRef</strong> - Specify element type or mutable value</li>
          <li><strong>useReducer</strong> - Type state and actions</li>
          <li><strong>useContext</strong> - Type the context value</li>
          <li><strong>Custom hooks</strong> - Return types inferred or explicit</li>
        </ul>
      </div>

      <h3>Live Demo:</h3>
      <div style={{ background: 'rgba(33, 150, 243, 0.15)', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px', border: '1px solid rgba(33, 150, 243, 0.4)' }}>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)} style={{ padding: '5px 15px', cursor: 'pointer' }}>
          Increment
        </button>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '10px' }}>
          count is inferred as number automatically
        </p>
      </div>

      <pre style={{ background: '#282c34', color: '#61dafb', padding: '15px', borderRadius: '5px', overflow: 'auto' }}>
{`// useState - Type inference
const [count, setCount] = useState(0)  // Inferred as number
const [name, setName] = useState('')   // Inferred as string
const [isOpen, setIsOpen] = useState(false)  // Inferred as boolean

// useState - Explicit typing (when initial value is null/undefined)
const [user, setUser] = useState<User | null>(null)
const [data, setData] = useState<string | undefined>(undefined)

// useState - With interface
interface User {
  id: number
  name: string
  email: string
}

const [user, setUser] = useState<User | null>(null)

// Later...
setUser({ id: 1, name: 'John', email: 'john@example.com' })  // ✅
setUser({ id: 1, name: 'John' })  // ❌ Type error: missing email

// useState - With union types
type Status = 'idle' | 'loading' | 'success' | 'error'
const [status, setStatus] = useState<Status>('idle')

setStatus('loading')  // ✅
setStatus('pending')  // ❌ Type error

// useRef - DOM element
const inputRef = useRef<HTMLInputElement>(null)
const divRef = useRef<HTMLDivElement>(null)

// Usage
useEffect(() => {
  inputRef.current?.focus()  // Optional chaining needed (can be null)
}, [])

return <input ref={inputRef} />

// useRef - Mutable value
const countRef = useRef<number>(0)
const timerRef = useRef<NodeJS.Timeout | null>(null)

useEffect(() => {
  timerRef.current = setInterval(() => {
    countRef.current++
  }, 1000)
  
  return () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }
}, [])

// useReducer - Type state and actions
interface State {
  count: number
  error: string | null
}

type Action = 
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'RESET' }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 }
    case 'DECREMENT':
      return { ...state, count: state.count - 1 }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    case 'RESET':
      return { count: 0, error: null }
    default:
      return state
  }
}

const [state, dispatch] = useReducer(reducer, { count: 0, error: null })

// Usage - fully typed!
dispatch({ type: 'INCREMENT' })  // ✅
dispatch({ type: 'SET_ERROR', payload: 'Oops!' })  // ✅
dispatch({ type: 'SET_ERROR' })  // ❌ Error: payload is required
dispatch({ type: 'UNKNOWN' })  // ❌ Type error

// useContext - Type the context
interface ThemeContextType {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined)

// Custom hook with type guard
function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context  // Type is ThemeContextType (not undefined)
}

// Usage
function Button() {
  const { theme, toggleTheme } = useTheme()  // Fully typed! ✨
  
  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  )
}

// useEffect - No special typing needed
useEffect(() => {
  // Cleanup function inferred
  return () => {
    console.log('cleanup')
  }
}, [dependency])

// useCallback - Types inferred from function
const handleClick = useCallback((id: number) => {
  console.log(id)
}, [])
// handleClick is typed as (id: number) => void

// useMemo - Return type inferred
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b)
}, [a, b])
// Type inferred from return value

// Custom hook with explicit return type
function useCounter(initialValue: number = 0) {
  const [count, setCount] = useState(initialValue)
  
  const increment = useCallback(() => setCount(c => c + 1), [])
  const decrement = useCallback(() => setCount(c => c - 1), [])
  const reset = useCallback(() => setCount(initialValue), [initialValue])
  
  return { count, increment, decrement, reset } as const
  // 'as const' makes return type readonly tuple
}

// Usage - fully typed
const counter = useCounter(0)
counter.increment()  // ✅
counter.count = 10  // ❌ Error: count is readonly

// Custom hook with generic type
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then((data: T) => setData(data))
      .catch(setError)
      .finally(() => setLoading(false))
  }, [url])
  
  return { data, loading, error }
}

// Usage with type inference
interface User {
  id: number
  name: string
}

const { data, loading, error } = useFetch<User>('/api/user')
// data is typed as User | null ✨

// useImperativeHandle - Type the ref handle
interface InputHandle {
  focus: () => void
  clear: () => void
}

const CustomInput = forwardRef<InputHandle, { placeholder: string }>(
  ({ placeholder }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null)
    
    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
      clear: () => {
        if (inputRef.current) inputRef.current.value = ''
      }
    }))
    
    return <input ref={inputRef} placeholder={placeholder} />
  }
)

// Usage
const inputHandleRef = useRef<InputHandle>(null)

useEffect(() => {
  inputHandleRef.current?.focus()  // Typed methods available! ✨
}, [])`}
      </pre>

      <div style={{ marginTop: '15px', padding: '10px', background: '#3a3510', color: '#f0e68c', borderRadius: '5px' }}>
        <strong>Interview Tip:</strong> Mention that useState often infers types automatically. Emphasize explicit typing for null/undefined initial values. Discuss discriminated unions for useReducer actions.
      </div>
    </div>
  )
}

// ============================================================================
// Q4: Advanced TypeScript patterns with React
// ============================================================================
function Section4_AdvancedPatterns() {
  return (
    <div style={{ marginBottom: '40px', padding: '20px', border: '2px solid #61dafb', borderRadius: '8px', color: 'var(--text-primary)' }}>
      <h2>Q4: What are advanced TypeScript patterns in React?</h2>
      
      <div style={{ background: '#1e1e1e', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
        <h3>Answer:</h3>
        <p>Advanced patterns include generics, utility types, discriminated unions, and mapped types.</p>
        
        <h4>Key Patterns:</h4>
        <ol>
          <li><strong>Generic Components</strong> - Reusable with different types</li>
          <li><strong>Utility Types</strong> - Pick, Omit, Partial, Required</li>
          <li><strong>Discriminated Unions</strong> - Type-safe state management</li>
          <li><strong>Conditional Types</strong> - Types based on conditions</li>
        </ol>
      </div>

      <pre style={{ background: '#282c34', color: '#61dafb', padding: '15px', borderRadius: '5px', overflow: 'auto' }}>
{`// Generic Components
interface TableProps<T> {
  data: T[]
  columns: Column<T>[]
  onRowClick: (row: T) => void
}

interface Column<T> {
  key: keyof T
  label: string
  render?: (value: T[keyof T], row: T) => React.ReactNode
}

function Table<T>({ data, columns, onRowClick }: TableProps<T>) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map(col => (
            <th key={String(col.key)}>{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i} onClick={() => onRowClick(row)}>
            {columns.map(col => (
              <td key={String(col.key)}>
                {col.render 
                  ? col.render(row[col.key], row)
                  : String(row[col.key])
                }
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

// Usage - fully typed!
interface User {
  id: number
  name: string
  email: string
}

<Table<User>
  data={users}
  columns={[
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { 
      key: 'email', 
      label: 'Email',
      render: (email) => <a href={\`mailto:\${email}\`}>{email}</a>
    }
  ]}
  onRowClick={(user) => console.log(user.name)}  // user is typed!
/>

// Utility Types
interface User {
  id: number
  name: string
  email: string
  password: string
}

// Pick - Select specific properties
type PublicUser = Pick<User, 'id' | 'name' | 'email'>
// { id: number; name: string; email: string }

// Omit - Exclude specific properties
type UserWithoutPassword = Omit<User, 'password'>
// { id: number; name: string; email: string }

// Partial - Make all properties optional
type PartialUser = Partial<User>
// { id?: number; name?: string; email?: string; password?: string }

// Required - Make all properties required
type RequiredUser = Required<Partial<User>>

// Readonly - Make all properties readonly
type ReadonlyUser = Readonly<User>

// Record - Create object type with specific keys and values
type UserRoles = Record<string, 'admin' | 'user' | 'guest'>

// Usage in components
interface UpdateUserProps {
  user: Partial<User>  // Can update any field
  onSave: (user: User) => void
}

function UpdateUserForm({ user, onSave }: UpdateUserProps) {
  return (
    <form>
      <input name="name" defaultValue={user.name} />
      <input name="email" defaultValue={user.email} />
    </form>
  )
}

// Discriminated Unions (Type-safe state)
type RequestState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string }

function DataComponent() {
  const [state, setState] = useState<RequestState<User>>({ status: 'idle' })
  
  // TypeScript knows which properties are available!
  if (state.status === 'loading') {
    return <div>Loading...</div>
  }
  
  if (state.status === 'error') {
    return <div>Error: {state.error}</div>  // error is available
  }
  
  if (state.status === 'success') {
    return <div>{state.data.name}</div>  // data is available
  }
  
  return <div>Idle</div>
}

// Mapped Types
type Nullable<T> = {
  [K in keyof T]: T[K] | null
}

type NullableUser = Nullable<User>
// { id: number | null; name: string | null; ... }

type Optional<T> = {
  [K in keyof T]?: T[K]
}

// Conditional Types
type IsArray<T> = T extends any[] ? true : false

type A = IsArray<string[]>  // true
type B = IsArray<string>    // false

// Extract function argument types
type GetFirstArg<T> = T extends (first: infer F, ...args: any[]) => any ? F : never

function example(name: string, age: number) {}

type FirstArg = GetFirstArg<typeof example>  // string

// Component prop extraction
type ComponentProps<T> = T extends React.ComponentType<infer P> ? P : never

const MyButton: React.FC<{ label: string }> = ({ label }) => <button>{label}</button>

type MyButtonProps = ComponentProps<typeof MyButton>  // { label: string }

// Polymorphic components
type AsProp<C extends React.ElementType> = {
  as?: C
}

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P)

type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = {}
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>

type TextProps<C extends React.ElementType> = PolymorphicComponentProp<
  C,
  { color?: string }
>

function Text<C extends React.ElementType = 'span'>({
  as,
  color,
  children,
  ...props
}: TextProps<C>) {
  const Component = as || 'span'
  return (
    <Component style={{ color }} {...props}>
      {children}
    </Component>
  )
}

// Usage - Component adapts to 'as' prop!
<Text as="h1" color="red">Heading</Text>
<Text as="a" href="/home" color="blue">Link</Text>  // href is available!
<Text as="button" onClick={() => {}}>Button</Text>  // onClick available!

// Type Guards
function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value
  )
}

function processValue(value: unknown) {
  if (isUser(value)) {
    console.log(value.name)  // TypeScript knows it's a User!
  }
}

// Const assertions
const COLORS = {
  primary: '#007bff',
  secondary: '#6c757d',
  success: '#28a745'
} as const

type Color = typeof COLORS[keyof typeof COLORS]
// '#007bff' | '#6c757d' | '#28a745'

// Enum alternative (union of string literals)
const Status = {
  Pending: 'pending',
  Approved: 'approved',
  Rejected: 'rejected'
} as const

type StatusType = typeof Status[keyof typeof Status]
// 'pending' | 'approved' | 'rejected'`}
      </pre>

      <div style={{ marginTop: '15px', padding: '10px', background: '#3a3510', color: '#f0e68c', borderRadius: '5px' }}>
        <strong>Interview Tip:</strong> Discuss utility types (Pick, Omit, Partial) as time-savers. Mention discriminated unions for type-safe state. Emphasize generics for reusable components.
      </div>
    </div>
  )
}

// ============================================================================
// Q5: Common TypeScript pitfalls in React
// ============================================================================
function Section5_CommonPitfalls() {
  return (
    <div style={{ marginBottom: '40px', padding: '20px', border: '2px solid #61dafb', borderRadius: '8px', color: 'var(--text-primary)' }}>
      <h2>Q5: What are common TypeScript pitfalls in React?</h2>
      
      <div style={{ background: '#1e1e1e', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
        <h3>Answer:</h3>
        <p>Common mistakes include improper typing, using <code>any</code>, incorrect event types, and complex type gymnastics.</p>
        
        <h4>Common Pitfalls:</h4>
        <ul>
          <li>❌ Using <code>any</code> everywhere</li>
          <li>❌ Wrong event handler types</li>
          <li>❌ Not handling null/undefined</li>
          <li>❌ Over-engineering types</li>
          <li>❌ Type assertions instead of type guards</li>
        </ul>
      </div>

      <pre style={{ background: '#282c34', color: '#61dafb', padding: '15px', borderRadius: '5px', overflow: 'auto' }}>
{`// Pitfall 1: Using 'any' everywhere
// ❌ Bad
function handleData(data: any) {
  return data.something.value  // No type safety!
}

// ✅ Good
interface Data {
  something: {
    value: string
  }
}

function handleData(data: Data) {
  return data.something.value  // Type safe!
}

// Pitfall 2: Wrong event types
// ❌ Bad
function handleClick(event: any) {
  console.log(event.target.value)
}

// ✅ Good
function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
  console.log(event.currentTarget)  // Correctly typed!
}

function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
  console.log(event.target.value)  // value is typed as string
}

// Pitfall 3: Not handling null/undefined
// ❌ Bad
interface Props {
  user: User | null
}

function UserProfile({ user }: Props) {
  return <div>{user.name}</div>  // Error: user might be null!
}

// ✅ Good
function UserProfile({ user }: Props) {
  if (!user) return <div>No user</div>
  return <div>{user.name}</div>  // Safe!
}

// Or use optional chaining
return <div>{user?.name ?? 'No user'}</div>

// Pitfall 4: Type assertions (as) instead of type guards
// ❌ Bad (bypasses type checking)
const data = fetchData() as User  // Dangerous!
console.log(data.name)  // Might crash at runtime

// ✅ Good (runtime validation)
const data = fetchData()
if (isUser(data)) {
  console.log(data.name)  // Type-safe!
}

// Pitfall 5: Children typing
// ❌ Bad
interface Props {
  children: JSX.Element  // Too restrictive!
}

// Only accepts single JSX element
<Component>
  <div>Child 1</div>
  <div>Child 2</div>  // Error!
</Component>

// ✅ Good
interface Props {
  children: React.ReactNode  // Accepts anything renderable
}

// Accepts strings, numbers, arrays, fragments, etc.
<Component>
  <div>Child 1</div>
  <div>Child 2</div>  // ✅ Works!
</Component>

// Pitfall 6: Incorrect useState initial value
// ❌ Bad
const [user, setUser] = useState(null)  // Type is null!
setUser({ id: 1, name: 'John' })  // Error!

// ✅ Good
const [user, setUser] = useState<User | null>(null)
setUser({ id: 1, name: 'John' })  // ✅ Works!

// Pitfall 7: Not using discriminated unions
// ❌ Bad
interface State {
  loading: boolean
  data: User | null
  error: string | null
}
// Can have invalid states: loading=true, data=User, error="error"

// ✅ Good
type State =
  | { status: 'loading' }
  | { status: 'success'; data: User }
  | { status: 'error'; error: string }
// Impossible to have invalid state!

// Pitfall 8: Overusing React.FC
// ❌ Avoid
const Component: React.FC<Props> = ({ children }) => {
  return <div>{children}</div>
}
// Issues: implicitly types children, harder to use with generics

// ✅ Better
function Component({ children }: PropsWithChildren<Props>) {
  return <div>{children}</div>
}

// Pitfall 9: Not extracting component prop types
// ❌ Repetitive
function Button({ label, onClick }: { label: string; onClick: () => void }) {}
function AnotherButton({ label, onClick }: { label: string; onClick: () => void }) {}

// ✅ Reusable
interface ButtonProps {
  label: string
  onClick: () => void
}

function Button({ label, onClick }: ButtonProps) {}
function AnotherButton(props: ButtonProps) {}

// Pitfall 10: Complex type gymnastics
// ❌ Over-engineered
type ComplexType<T extends Record<string, any>> = {
  [K in keyof T]: T[K] extends object
    ? ComplexType<T[K]>
    : T[K] extends Array<infer U>
    ? Array<ComplexType<U>>
    : T[K]
}
// Hard to understand and maintain

// ✅ Simple and clear
interface User {
  name: string
  email: string
  address: {
    street: string
    city: string
  }
}
// Clear and maintainable

// Tips for success:
// 1. Start simple, add complexity only when needed
// 2. Use 'unknown' instead of 'any' when unsure
// 3. Leverage type inference - don't over-annotate
// 4. Use utility types (Pick, Omit, etc.) to avoid repetition
// 5. Create discriminated unions for complex state
// 6. Always handle null/undefined explicitly
// 7. Use type guards for runtime validation
// 8. Keep types close to their usage
// 9. Document complex types with comments
// 10. Use 'strict' mode in tsconfig.json

// tsconfig.json recommended settings
{
  "compilerOptions": {
    "strict": true,                       // Enable all strict checks
    "noImplicitAny": true,               // Error on implicit any
    "strictNullChecks": true,            // Null/undefined checking
    "strictFunctionTypes": true,         // Function type checking
    "noUnusedLocals": true,              // Error on unused variables
    "noUnusedParameters": true,          // Error on unused params
    "noImplicitReturns": true,           // All paths must return
    "noFallthroughCasesInSwitch": true, // Switch statement completeness
    "esModuleInterop": true,             // CommonJS/ES6 interop
    "skipLibCheck": true,                // Skip type checking of .d.ts files
    "jsx": "react-jsx",                  // React 17+ JSX transform
    "lib": ["DOM", "DOM.Iterable", "ES2020"],
    "module": "ESNext",
    "target": "ES2020",
    "moduleResolution": "node"
  }
}`}
      </pre>

      <div style={{ marginTop: '15px', padding: '10px', background: '#3a3510', color: '#f0e68c', borderRadius: '5px' }}>
        <strong>Interview Tip:</strong> Mention that TypeScript should help, not hinder. Avoid using 'any' - use 'unknown' instead. Emphasize strict mode and proper null handling. Keep types simple and maintainable.
      </div>
    </div>
  )
}
