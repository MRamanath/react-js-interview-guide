import React, { createContext, useContext, useState, useReducer, useCallback, useMemo } from 'react'

/**
 * TOP INTERVIEW QUESTIONS: CONTEXT API & STATE MANAGEMENT
 * 
 * Most commonly asked questions about Context API and state management patterns
 */

export default function ContextStateInterviewQA() {
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', color: 'var(--text-primary)' }}>
      <h1>🌐 Context API & State Management - Top Interview Questions</h1>
      
      <Section1_PropDrilling />
      <Section2_ContextAPI />
      <Section3_ContextPerformance />
      <Section4_StateColocation />
      <Section5_StateManagementLibraries />
    </div>
  )
}

// ============================================================================
// Q1: What is prop drilling and how to avoid it?
// ============================================================================
function Section1_PropDrilling() {
  const [user, setUser] = useState({ name: 'John Doe', role: 'Admin' })

  return (
    <div style={{ marginBottom: '40px', padding: '20px', border: '2px solid #61dafb', borderRadius: '8px', color: 'var(--text-primary)' }}>
      <h2>Q1: What is prop drilling and how to avoid it?</h2>
      
      <div style={{ background: '#1e1e1e', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
        <h3>Answer:</h3>
        <p><strong>Prop drilling</strong> is passing props through multiple levels of components that don't need the data themselves, just to reach a deeply nested component.</p>
        
        <h4>Problems:</h4>
        <ul>
          <li>❌ Verbose and repetitive code</li>
          <li>❌ Hard to refactor</li>
          <li>❌ Intermediate components become coupled</li>
          <li>❌ Difficult to track data flow</li>
        </ul>

        <h4>Solutions:</h4>
        <ol>
          <li><strong>Context API</strong> - Share data without passing props</li>
          <li><strong>Component Composition</strong> - Pass components as children</li>
          <li><strong>State Management Libraries</strong> - Redux, Zustand, Jotai</li>
          <li><strong>State Colocation</strong> - Keep state close to where it's used</li>
        </ol>
      </div>

      <h3>Live Example - Prop Drilling Problem:</h3>
      <div style={{ background: 'rgba(244, 67, 54, 0.15)', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px', border: '1px solid rgba(244, 67, 54, 0.4)' }}>
        <h4>❌ With Prop Drilling:</h4>
        <LevelOne user={user} />
      </div>

      <pre style={{ background: '#282c34', color: '#61dafb', padding: '15px', borderRadius: '5px', overflow: 'auto', marginTop: '15px' }}>
{`// ❌ Prop Drilling Problem
function App() {
  const [user, setUser] = useState({ name: 'John', role: 'Admin' })
  
  return <ComponentA user={user} />
}

function ComponentA({ user }) {
  // ComponentA doesn't use user, just passes it down
  return <ComponentB user={user} />
}

function ComponentB({ user }) {
  // ComponentB doesn't use user either, just passes it down
  return <ComponentC user={user} />
}

function ComponentC({ user }) {
  // Finally, ComponentC uses user
  return <div>{user.name}</div>
}

// ✅ Solution 1: Context API
const UserContext = createContext(null)

function App() {
  const [user, setUser] = useState({ name: 'John', role: 'Admin' })
  
  return (
    <UserContext.Provider value={user}>
      <ComponentA />  {/* No props! */}
    </UserContext.Provider>
  )
}

function ComponentA() {
  return <ComponentB />  {/* No props! */}
}

function ComponentB() {
  return <ComponentC />  {/* No props! */}
}

function ComponentC() {
  const user = useContext(UserContext)  // Direct access!
  return <div>{user.name}</div>
}

// ✅ Solution 2: Component Composition
function App() {
  const [user, setUser] = useState({ name: 'John', role: 'Admin' })
  
  return (
    <Layout>
      <UserProfile user={user} />  {/* Pass directly to where it's needed */}
    </Layout>
  )
}

function Layout({ children }) {
  // Layout doesn't need to know about user
  return <div className="layout">{children}</div>
}

// ✅ Solution 3: State Colocation
// Move state closer to where it's used
function ComponentC() {
  // If user is only needed here, fetch/manage it here
  const [user, setUser] = useState({ name: 'John', role: 'Admin' })
  return <div>{user.name}</div>
}`}
      </pre>

      <div style={{ marginTop: '15px', padding: '10px', background: '#3a3510', color: '#f0e68c', borderRadius: '5px' }}>
        <strong>Interview Tip:</strong> Mention that prop drilling isn't always bad - for 2-3 levels, props are fine and more explicit. Context is better for truly global data like theme, auth, or language.
      </div>
    </div>
  )
}

function LevelOne({ user }: { user: { name: string; role: string } }) {
  return (
    <div style={{ padding: '10px', background: '#1e1e1e', color: 'var(--text-primary)', margin: '5px', border: '1px solid #444' }}>
      <div>Level 1 (passes user down ⬇️)</div>
      <LevelTwo user={user} />
    </div>
  )
}

function LevelTwo({ user }: { user: { name: string; role: string } }) {
  return (
    <div style={{ padding: '10px', background: '#1e1e1e', color: 'var(--text-primary)', margin: '5px', border: '1px solid #444' }}>
      <div>Level 2 (passes user down ⬇️)</div>
      <LevelThree user={user} />
    </div>
  )
}

function LevelThree({ user }: { user: { name: string; role: string } }) {
  return (
    <div style={{ padding: '10px', background: 'rgba(76, 175, 80, 0.15)', color: 'var(--text-primary)', margin: '5px', border: '1px solid rgba(76, 175, 80, 0.5)' }}>
      <div>Level 3 (finally uses user!)</div>
      <div><strong>User:</strong> {user.name} ({user.role})</div>
    </div>
  )
}

// ============================================================================
// Q2: How does Context API work? When to use it?
// ============================================================================

interface ThemeContextType {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  
  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }, [])
  
  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme])
  
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

function ThemeDemo() {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <div style={{ 
      padding: '15px', 
      background: theme === 'light' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.3)',
      color: 'var(--text-primary)',
      borderRadius: '5px',
      transition: 'all 0.3s',
      border: theme === 'light' ? '2px solid rgba(100, 150, 200, 0.5)' : '2px solid rgba(150, 100, 200, 0.5)'
    }}>
      <p>Current Theme (Context State): <strong>{theme}</strong></p>
      <button 
        onClick={toggleTheme}
        style={{ padding: '8px 16px', cursor: 'pointer' }}
      >
        Toggle Theme
      </button>
      <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '10px' }}>
        This simulates theme context switching (not the actual app theme)
      </p>
    </div>
  )
}

function Section2_ContextAPI() {
  return (
    <div style={{ marginBottom: '40px', padding: '20px', border: '2px solid #61dafb', borderRadius: '8px' }}>
      <h2>Q2: How does Context API work? When should you use it?</h2>
      
      <div style={{ background: '#1e1e1e', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
        <h3>Answer:</h3>
        <p>The <strong>Context API</strong> provides a way to pass data through the component tree without manually passing props at every level.</p>
        
        <h4>How it works:</h4>
        <ol>
          <li><code>createContext()</code> - Creates a Context object</li>
          <li><code>Provider</code> - Provides value to descendant components</li>
          <li><code>useContext()</code> - Consumes the value in any descendant</li>
        </ol>

        <h4>When to use Context:</h4>
        <ul>
          <li>✅ Theme (dark/light mode)</li>
          <li>✅ Authentication state (current user)</li>
          <li>✅ Language/i18n</li>
          <li>✅ Global settings/preferences</li>
          <li>✅ Data that many components need</li>
        </ul>

        <h4>When NOT to use Context:</h4>
        <ul>
          <li>❌ Frequently changing state (causes re-renders)</li>
          <li>❌ State needed by only 2-3 components</li>
          <li>❌ Complex state logic (use Redux/Zustand)</li>
          <li>❌ Server state (use React Query/SWR)</li>
        </ul>
      </div>

      <h3>Live Example:</h3>
      <ThemeProvider>
        <ThemeDemo />
      </ThemeProvider>

      <pre style={{ background: '#282c34', color: '#61dafb', padding: '15px', borderRadius: '5px', overflow: 'auto', marginTop: '15px' }}>
{`// 1. Create Context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// 2. Create Provider Component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')
  
  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }, [])
  
  // Memoize value to prevent unnecessary re-renders
  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme])
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

// 3. Create Custom Hook (Best Practice)
function useTheme() {
  const context = useContext(ThemeContext)
  
  // Error handling
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  
  return context
}

// 4. Wrap App with Provider
function App() {
  return (
    <ThemeProvider>
      <Header />
      <Main />
      <Footer />
    </ThemeProvider>
  )
}

// 5. Consume Context in Components
function Header() {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <header style={{ background: theme === 'light' ? '#fff' : '#000' }}>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </header>
  )
}

// Multiple Contexts Pattern
function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <RouterProvider>
            <App />
          </RouterProvider>
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}

// Or use a single AppProvider
function AppProvider({ children }) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}

// TypeScript Best Practices
interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}`}
      </pre>

      <div style={{ marginTop: '15px', padding: '10px', background: '#3a3510', color: '#f0e68c', borderRadius: '5px' }}>
        <strong>Interview Tip:</strong> Emphasize creating custom hooks for consuming context. Mention that every consumer re-renders when context value changes, which is why memoization is important.
      </div>
    </div>
  )
}

// ============================================================================
// Q3: How to optimize Context API performance?
// ============================================================================
function Section3_ContextPerformance() {
  return (
    <div style={{ marginBottom: '40px', padding: '20px', border: '2px solid #61dafb', borderRadius: '8px' }}>
      <h2>Q3: How to optimize Context API performance?</h2>
      
      <div style={{ background: '#1e1e1e', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
        <h3>Answer:</h3>
        <p>Context can cause performance issues if not used carefully, as all consumers re-render when context value changes.</p>
        
        <h4>Optimization Strategies:</h4>
        <ol>
          <li><strong>Memoize context value</strong> - Use useMemo</li>
          <li><strong>Split contexts</strong> - Separate frequently vs rarely changing data</li>
          <li><strong>Use memo on consumers</strong> - Prevent propagation</li>
          <li><strong>Selector pattern</strong> - Only subscribe to needed data</li>
          <li><strong>State colocation</strong> - Keep state as local as possible</li>
        </ol>
      </div>

      <pre style={{ background: '#282c34', color: '#61dafb', padding: '15px', borderRadius: '5px', overflow: 'auto' }}>
{`// ❌ Problem: All consumers re-render on ANY change
const AppContext = createContext({
  user: null,      // Changes rarely
  theme: 'light',  // Changes occasionally
  count: 0         // Changes frequently
})

function Consumer() {
  const { user } = useContext(AppContext)
  // Re-renders even when count changes! 😱
  return <div>{user.name}</div>
}

// ✅ Solution 1: Split Contexts
const UserContext = createContext(null)
const ThemeContext = createContext('light')
const CountContext = createContext(0)

function App() {
  return (
    <UserContext.Provider value={user}>
      <ThemeContext.Provider value={theme}>
        <CountContext.Provider value={count}>
          <Content />
        </CountContext.Provider>
      </ThemeContext.Provider>
    </UserContext.Provider>
  )
}

function Consumer() {
  const user = useContext(UserContext)
  // Only re-renders when user changes ✅
  return <div>{user.name}</div>
}

// ✅ Solution 2: Memoize Context Value
function Provider({ children }) {
  const [user, setUser] = useState(null)
  const [theme, setTheme] = useState('light')
  
  // ❌ Bad: New object every render
  const value = { user, setUser, theme, setTheme }
  
  // ✅ Good: Memoized value
  const value = useMemo(() => ({
    user,
    setUser,
    theme,
    setTheme
  }), [user, theme])
  
  return <Context.Provider value={value}>{children}</Context.Provider>
}

// ✅ Solution 3: Split State and Actions
const StateContext = createContext(null)
const ActionsContext = createContext(null)

function Provider({ children }) {
  const [state, setState] = useState({ user: null, theme: 'light' })
  
  // Actions don't change, don't need memoization
  const actions = {
    setUser: (user) => setState(s => ({ ...s, user })),
    setTheme: (theme) => setState(s => ({ ...s, theme }))
  }
  
  return (
    <StateContext.Provider value={state}>
      <ActionsContext.Provider value={actions}>
        {children}
      </ActionsContext.Provider>
    </StateContext.Provider>
  )
}

// Components only re-render when state changes, not actions
function Consumer() {
  const { user } = useContext(StateContext)
  const { setUser } = useContext(ActionsContext)  // Doesn't cause re-render
  
  return <div>{user.name}</div>
}

// ✅ Solution 4: Selector Pattern (Advanced)
// Similar to Redux useSelector
function useContextSelector(context, selector) {
  const value = useContext(context)
  return selector(value)
}

// Usage
function Consumer() {
  // Only re-renders when user.name changes
  const userName = useContextSelector(AppContext, ctx => ctx.user.name)
  return <div>{userName}</div>
}

// ✅ Solution 5: React.memo on Consumers
const ExpensiveComponent = memo(({ userId }) => {
  // Only re-renders when userId prop changes
  return <div>User: {userId}</div>
})

function Parent() {
  const { user, count } = useContext(AppContext)
  
  // ExpensiveComponent won't re-render when count changes
  return <ExpensiveComponent userId={user.id} />
}

// ✅ Solution 6: Composition Pattern
function Provider({ children }) {
  const [state, setState] = useState(initialState)
  
  return (
    <Context.Provider value={state}>
      {children}  {/* children don't re-create */}
    </Context.Provider>
  )
}

// Usage
<Provider>
  <ExpensiveComponent />  {/* Won't re-render unnecessarily */}
</Provider>

// ✅ Solution 7: Use Context Only for Truly Global State
// Not everything needs to be in context!
function App() {
  // ❌ Bad: Putting all state in context
  const [formData, setFormData] = useState({})  // Only used in form
  
  // ✅ Good: Keep local state local
  return (
    <GlobalProvider>  {/* Only theme, auth, etc. */}
      <Form />  {/* Has its own local state */}
    </GlobalProvider>
  )
}`}
      </pre>

      <div style={{ marginTop: '15px', padding: '10px', background: '#3a3510', color: '#f0e68c', borderRadius: '5px' }}>
        <strong>Interview Tip:</strong> Mention that Context isn't designed for high-frequency updates. For complex state management, consider Redux Toolkit, Zustand, or Jotai. Always profile with React DevTools before optimizing.
      </div>
    </div>
  )
}

// ============================================================================
// Q4: What is state colocation?
// ============================================================================
function Section4_StateColocation() {
  return (
    <div style={{ marginBottom: '40px', padding: '20px', border: '2px solid #61dafb', borderRadius: '8px' }}>
      <h2>Q4: What is state colocation and why is it important?</h2>
      
      <div style={{ background: '#1e1e1e', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
        <h3>Answer:</h3>
        <p><strong>State colocation</strong> means keeping state as close as possible to where it's used. This improves performance, maintainability, and code organization.</p>
        
        <h4>Benefits:</h4>
        <ul>
          <li>✅ Faster - Fewer components re-render</li>
          <li>✅ Simpler - Easier to understand and maintain</li>
          <li>✅ More performant - Reduces render tree traversal</li>
          <li>✅ Better testing - Components are more isolated</li>
        </ul>

        <h4>Principle:</h4>
        <p><em>"Lift state up only when you need to share it between components"</em></p>
      </div>

      <pre style={{ background: '#282c34', color: '#61dafb', padding: '15px', borderRadius: '5px', overflow: 'auto' }}>
{`// ❌ Bad: State lifted too high
function App() {
  // These states are only used in specific components
  const [modalOpen, setModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTab, setSelectedTab] = useState(0)
  
  return (
    <div>
      <Header />
      <SearchBar query={searchQuery} setQuery={setSearchQuery} />
      <Tabs selected={selectedTab} setSelected={setSelectedTab} />
      <Modal open={modalOpen} setOpen={setModalOpen} />
      {/* Entire App re-renders when any state changes! */}
    </div>
  )
}

// ✅ Good: State colocated
function App() {
  return (
    <div>
      <Header />
      <SearchBar />  {/* Has its own search state */}
      <Tabs />       {/* Has its own tab state */}
      <Modal />      {/* Has its own modal state */}
      {/* Only specific components re-render */}
    </div>
  )
}

function SearchBar() {
  const [query, setQuery] = useState('')  // Local to SearchBar
  return <input value={query} onChange={e => setQuery(e.target.value)} />
}

// Example: When to lift state
// ❌ Bad: State too local
function UserList() {
  const [users, setUsers] = useState([])
  const [selectedId, setSelectedId] = useState(null)  // Local
  
  return (
    <div>
      <List users={users} onSelect={setSelectedId} />
      {/* Can't show UserDetails here - selectedId is local to List */}
    </div>
  )
}

// ✅ Good: Lift state when needed
function UserList() {
  const [users, setUsers] = useState([])
  const [selectedId, setSelectedId] = useState(null)  // Lifted
  
  return (
    <div>
      <List users={users} selectedId={selectedId} onSelect={setSelectedId} />
      <UserDetails userId={selectedId} />  {/* Now can access selectedId */}
    </div>
  )
}

// Real-world example: Form state
// ❌ Bad: All fields in parent
function Form() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [zipCode, setZipCode] = useState('')
  // ... many more fields
  
  // Entire form re-renders on every keystroke!
  return (
    <form>
      <input value={name} onChange={e => setName(e.target.value)} />
      <input value={email} onChange={e => setEmail(e.target.value)} />
      <AddressFields 
        address={address} setAddress={setAddress}
        city={city} setCity={setCity}
        zipCode={zipCode} setZipCode={setZipCode}
      />
    </form>
  )
}

// ✅ Good: Split into smaller components
function Form() {
  const handleSubmit = (data) => {
    console.log('Form data:', data)
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <PersonalInfo />     {/* Has its own state */}
      <AddressInfo />      {/* Has its own state */}
      <PaymentInfo />      {/* Has its own state */}
    </form>
  )
}

function PersonalInfo() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  // Only PersonalInfo re-renders on these changes
  
  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} />
      <input value={email} onChange={e => setEmail(e.target.value)} />
    </div>
  )
}

// Decision Framework
/*
Keep state local if:
- Only one component needs it
- Not needed by sibling components
- Not needed by parent for coordination

Lift state up when:
- Multiple siblings need to access/modify it
- Parent needs to coordinate between children
- Need to persist across route changes (or use global state)

Use global state (Context/Redux) when:
- Many unrelated components need it
- Deeply nested components need it
- Truly application-wide data (auth, theme, etc.)
*/`}
      </pre>

      <div style={{ marginTop: '15px', padding: '10px', background: '#3a3510', color: '#f0e68c', borderRadius: '5px' }}>
        <strong>Interview Tip:</strong> Kent C. Dodds popularized this concept. Mention "lift state up" vs "push state down" trade-offs. State colocation is about finding the right balance.
      </div>
    </div>
  )
}

// ============================================================================
// Q5: When to use Context vs Redux vs other libraries?
// ============================================================================
function Section5_StateManagementLibraries() {
  return (
    <div style={{ marginBottom: '40px', padding: '20px', border: '2px solid #61dafb', borderRadius: '8px' }}>
      <h2>Q5: When to use Context vs Redux vs other state management libraries?</h2>
      
      <div style={{ background: '#1e1e1e', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
        <h3>Answer:</h3>
        <p>Different state management solutions solve different problems. Choose based on your needs:</p>
        
        <h4>React Context API:</h4>
        <ul>
          <li>✅ Built-in, no extra dependencies</li>
          <li>✅ Simple global state</li>
          <li>✅ Good for: theme, auth, i18n</li>
          <li>❌ Performance issues with frequent updates</li>
          <li>❌ No built-in dev tools</li>
        </ul>

        <h4>Redux (Redux Toolkit):</h4>
        <ul>
          <li>✅ Predictable state updates</li>
          <li>✅ Excellent dev tools</li>
          <li>✅ Middleware ecosystem</li>
          <li>✅ Good for: complex apps, time-travel debugging</li>
          <li>❌ More boilerplate (even with RTK)</li>
          <li>❌ Learning curve</li>
        </ul>

        <h4>Zustand:</h4>
        <ul>
          <li>✅ Minimal boilerplate</li>
          <li>✅ No providers needed</li>
          <li>✅ Good performance</li>
          <li>✅ Good for: medium apps, quick setup</li>
          <li>❌ Smaller ecosystem</li>
        </ul>

        <h4>Jotai / Recoil:</h4>
        <ul>
          <li>✅ Atomic state management</li>
          <li>✅ Fine-grained reactivity</li>
          <li>✅ Good for: derived state, complex dependencies</li>
          <li>❌ Different mental model</li>
        </ul>

        <h4>React Query / SWR:</h4>
        <ul>
          <li>✅ Perfect for server state</li>
          <li>✅ Caching, refetching, sync</li>
          <li>✅ Good for: API data, server state</li>
          <li>❌ Not for client state</li>
        </ul>
      </div>

      <pre style={{ background: '#282c34', color: '#61dafb', padding: '15px', borderRadius: '5px', overflow: 'auto' }}>
{`// Decision Tree

// Simple global state (theme, auth, i18n) → Context API
const ThemeContext = createContext('light')
function App() {
  const [theme, setTheme] = useState('light')
  return (
    <ThemeContext.Provider value={theme}>
      <App />
    </ThemeContext.Provider>
  )
}

// Complex app, need dev tools, predictability → Redux Toolkit
import { configureStore, createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: { user: null, status: 'idle' },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    }
  }
})

const store = configureStore({
  reducer: {
    user: userSlice.reducer
  }
})

// Need minimal setup, good performance → Zustand
import create from 'zustand'

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 }))
}))

function Counter() {
  const { count, increment } = useStore()
  return <button onClick={increment}>{count}</button>
}

// Atomic state, fine-grained updates → Jotai
import { atom, useAtom } from 'jotai'

const countAtom = atom(0)

function Counter() {
  const [count, setCount] = useAtom(countAtom)
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}

// Server data (API calls) → React Query
import { useQuery, useMutation } from '@tanstack/react-query'

function Users() {
  const { data, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers
  })
  
  if (isLoading) return <div>Loading...</div>
  return <div>{data.map(user => <div key={user.id}>{user.name}</div>)}</div>
}

// Recommendation for different app sizes:

// Small App (< 10 components)
// - Local state + props
// - Maybe one Context for theme

// Medium App (10-50 components)
// - Local state + Context API for global state
// - React Query for server state

// Large App (50+ components)
// - Redux Toolkit for client state
// - React Query for server state
// - Or: Zustand + React Query

// Enterprise App
// - Redux Toolkit with normalized state
// - React Query for all server data
// - Strict patterns and dev tools

// Real-world combination (recommended)
function App() {
  return (
    <QueryClientProvider client={queryClient}>  {/* Server state */}
      <Provider store={store}>                    {/* Complex client state */}
        <ThemeProvider>                           {/* Simple global state */}
          <Router>
            <Routes />
          </Router>
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>
  )
}

// Key Questions to Ask:
// 1. Is this server or client state?
//    - Server → React Query/SWR
//    - Client → Context/Redux/Zustand

// 2. How complex is the state logic?
//    - Simple → useState/Context
//    - Complex → Redux/Zustand

// 3. How many components need it?
//    - Few → Props
//    - Some → Context
//    - Many → Redux/Zustand

// 4. How often does it change?
//    - Rarely → Context
//    - Frequently → Redux/Zustand

// 5. Need time-travel debugging?
//    - Yes → Redux
//    - No → Zustand/Context`}
      </pre>

      <div style={{ marginTop: '15px', padding: '10px', background: '#3a3510', color: '#f0e68c', borderRadius: '5px' }}>
        <strong>Interview Tip:</strong> Emphasize separating server state (API data) from client state (UI state). Most apps benefit from React Query + lightweight client state (Context/Zustand) rather than Redux for everything.
      </div>
    </div>
  )
}
