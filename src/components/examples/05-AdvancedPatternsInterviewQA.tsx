import React, { Component, useState, cloneElement, createContext, useContext } from 'react'

/**
 * TOP INTERVIEW QUESTIONS: ADVANCED PATTERNS, FORMS, ROUTING & REACT 18
 * 
 * Most commonly asked questions about advanced React patterns
 */

export default function AdvancedPatternsInterviewQA() {
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', color: 'var(--text-primary)' }}>
      <h1>🏗️ Advanced Patterns, Forms, Routing & React 18 - Top Interview Questions</h1>
      
      <Section1_HOC />
      <Section2_RenderProps />
      <Section3_CompoundComponents />
      <Section4_ErrorBoundaries />
      <Section5_ControlledVsUncontrolled />
      <Section6_ReactRouter />
      <Section7_React18Features />
    </div>
  )
}

// ============================================================================
// Q1: What are Higher-Order Components (HOC)?
// ============================================================================

// HOC Example
function withLogger<P extends object>(WrappedComponent: React.ComponentType<P>) {
  return function WithLogger(props: P) {
    console.log('Component rendered with props:', props)
    return <WrappedComponent {...props} />
  }
}

const ButtonWithLogger = withLogger(({ onClick }: { onClick: () => void }) => (
  <button onClick={onClick} style={{ padding: '8px 16px', cursor: 'pointer' }}>
    Click Me
  </button>
))

function Section1_HOC() {
  return (
    <div style={{ marginBottom: '40px', padding: '20px', border: '2px solid #61dafb', borderRadius: '8px', color: 'var(--text-primary)' }}>
      <h2>Q1: What are Higher-Order Components (HOC)?</h2>
      
      <div style={{ background: '#1e1e1e', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
        <h3>Answer:</h3>
        <p>A <strong>Higher-Order Component (HOC)</strong> is a function that takes a component and returns a new component with enhanced functionality.</p>
        
        <h4>Characteristics:</h4>
        <ul>
          <li>Function that takes a component, returns a component</li>
          <li>Used for cross-cutting concerns (logging, auth, etc.)</li>
          <li>Don't modify original component (pure function)</li>
          <li>Compose multiple HOCs together</li>
        </ul>

        <h4>Common Use Cases:</h4>
        <ul>
          <li>Authentication/Authorization</li>
          <li>Logging and analytics</li>
          <li>Loading states</li>
          <li>Error handling</li>
          <li>Data fetching</li>
        </ul>

        <h4>⚠️ Hooks have largely replaced HOCs:</h4>
        <ul>
          <li>Custom hooks are simpler</li>
          <li>Better TypeScript support</li>
          <li>No wrapper hell</li>
        </ul>
      </div>

      <h3>Live Example:</h3>
      <div style={{ background: 'rgba(76, 175, 80, 0.15)', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px', border: '1px solid rgba(76, 175, 80, 0.4)' }}>
        <ButtonWithLogger onClick={() => console.log('Button clicked!')} />
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '10px' }}>
          Open console - HOC logs props before rendering component
        </p>
      </div>

      <pre style={{ background: '#282c34', color: '#61dafb', padding: '15px', borderRadius: '5px', overflow: 'auto' }}>
{`// Basic HOC Pattern
function withAuth(WrappedComponent) {
  return function WithAuth(props) {
    const { user } = useAuth()
    
    if (!user) {
      return <Redirect to="/login" />
    }
    
    return <WrappedComponent {...props} />
  }
}

// Usage
const ProtectedDashboard = withAuth(Dashboard)

// HOC with additional props
function withLoading(WrappedComponent) {
  return function WithLoading({ isLoading, ...props }) {
    if (isLoading) {
      return <Spinner />
    }
    
    return <WrappedComponent {...props} />
  }
}

// Composing multiple HOCs
const Enhanced = withAuth(withLoading(withLogger(MyComponent)))

// Better: Use compose utility
import { compose } from 'redux'  // or create your own

const enhance = compose(
  withAuth,
  withLoading,
  withLogger
)

const EnhancedComponent = enhance(MyComponent)

// TypeScript HOC
function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P> {
  return (props: P) => {
    const { user } = useAuth()
    
    if (!user) {
      return <Navigate to="/login" />
    }
    
    return <WrappedComponent {...props} />
  }
}

// HOC Best Practices:
// 1. Don't use HOCs inside render method
// ❌ Bad
function Parent() {
  const EnhancedChild = withLogger(Child)  // New component every render!
  return <EnhancedChild />
}

// ✅ Good
const EnhancedChild = withLogger(Child)
function Parent() {
  return <EnhancedChild />
}

// 2. Pass unrelated props through
function withLogger(WrappedComponent) {
  return function WithLogger(props) {
    console.log(props)
    return <WrappedComponent {...props} />  // Pass all props
  }
}

// 3. Copy static methods
import hoistNonReactStatics from 'hoist-non-react-statics'

function enhance(WrappedComponent) {
  class Enhance extends React.Component {
    render() {
      return <WrappedComponent {...this.props} />
    }
  }
  
  hoistNonReactStatics(Enhance, WrappedComponent)
  return Enhance
}

// ⚠️ Modern Alternative: Custom Hooks
// Instead of HOC:
const ProtectedDashboard = withAuth(Dashboard)

// Use hook:
function Dashboard() {
  const { user } = useAuth()
  
  if (!user) {
    return <Navigate to="/login" />
  }
  
  return <div>Dashboard content</div>
}`}
      </pre>

      <div style={{ marginTop: '15px', padding: '10px', background: '#3a3510', color: '#f0e68c', borderRadius: '5px' }}>
        <strong>Interview Tip:</strong> Mention that HOCs were popular before hooks. Today, custom hooks solve the same problems more elegantly. Still important to know for legacy codebases.
      </div>
    </div>
  )
}

// ============================================================================
// Q2: What is the Render Props pattern?
// ============================================================================

function MouseTracker({ render }: { render: (position: { x: number; y: number }) => React.ReactNode }) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  
  const handleMouseMove = (e: React.MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY })
  }
  
  return (
    <div 
      onMouseMove={handleMouseMove}
      style={{ padding: '20px', background: '#1e1e1e', color: 'var(--text-primary)', borderRadius: '5px', minHeight: '100px' }}
    >
      {render(position)}
    </div>
  )
}

function Section2_RenderProps() {
  return (
    <div style={{ marginBottom: '40px', padding: '20px', border: '2px solid #61dafb', borderRadius: '8px' }}>
      <h2>Q2: What is the Render Props pattern?</h2>
      
      <div style={{ background: '#1e1e1e', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
        <h3>Answer:</h3>
        <p>The <strong>Render Props</strong> pattern is a technique for sharing code between components using a prop whose value is a function.</p>
        
        <h4>Key Points:</h4>
        <ul>
          <li>Component takes a function as a prop</li>
          <li>Function returns React elements</li>
          <li>Provides flexibility in rendering</li>
          <li>Alternative to HOCs for code reuse</li>
        </ul>

        <h4>Common Names:</h4>
        <ul>
          <li><code>render</code> prop (most common)</li>
          <li><code>children</code> as a function</li>
          <li>Any prop name that's a function</li>
        </ul>

        <h4>⚠️ Hooks have also replaced this pattern:</h4>
        <ul>
          <li>Custom hooks are cleaner</li>
          <li>No nesting/"render prop hell"</li>
        </ul>
      </div>

      <h3>Live Example:</h3>
      <div style={{ background: 'rgba(33, 150, 243, 0.15)', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px', border: '1px solid rgba(33, 150, 243, 0.4)' }}>
        <MouseTracker render={(pos) => (
          <div>
            <p><strong>Move your mouse over this area!</strong></p>
            <p>X: {pos.x}, Y: {pos.y}</p>
          </div>
        )} />
      </div>

      <pre style={{ background: '#282c34', color: '#61dafb', padding: '15px', borderRadius: '5px', overflow: 'auto' }}>
{`// Render Props Pattern
function DataFetcher({ url, render }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
  }, [url])
  
  return render({ data, loading })
}

// Usage
<DataFetcher
  url="/api/users"
  render={({ data, loading }) => {
    if (loading) return <div>Loading...</div>
    return <div>{data.map(user => <div key={user.id}>{user.name}</div>)}</div>
  }}
/>

// Alternative: Children as a function
function Toggle({ children }) {
  const [on, setOn] = useState(false)
  const toggle = () => setOn(!on)
  
  return children({ on, toggle })
}

// Usage
<Toggle>
  {({ on, toggle }) => (
    <div>
      <button onClick={toggle}>{on ? 'ON' : 'OFF'}</button>
      {on && <div>Content visible!</div>}
    </div>
  )}
</Toggle>

// Real-world example: Form validation
function FormField({ name, validate, children }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState(null)
  
  const handleChange = (e) => {
    const newValue = e.target.value
    setValue(newValue)
    
    const validationError = validate(newValue)
    setError(validationError)
  }
  
  return children({
    value,
    onChange: handleChange,
    error
  })
}

// Usage
<FormField
  name="email"
  validate={(value) => {
    if (!value.includes('@')) return 'Invalid email'
    return null
  }}
>
  {({ value, onChange, error }) => (
    <div>
      <input value={value} onChange={onChange} />
      {error && <span style={{ color: 'red' }}>{error}</span>}
    </div>
  )}
</FormField>

// Combining multiple render props (gets nested)
<UserContext.Consumer>
  {user => (
    <ThemeContext.Consumer>
      {theme => (
        <LanguageContext.Consumer>
          {language => (
            <div>
              {/* Component using all three contexts */}
            </div>
          )}
        </LanguageContext.Consumer>
      )}
    </ThemeContext.Consumer>
  )}
</UserContext.Consumer>

// ⚠️ Modern Alternative: Custom Hook
// Instead of render props:
<MouseTracker render={(pos) => <div>X: {pos.x}</div>} />

// Use hook:
function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])
  
  return position
}

// Usage (much cleaner!)
function Component() {
  const position = useMousePosition()
  return <div>X: {position.x}, Y: {position.y}</div>
}`}
      </pre>

      <div style={{ marginTop: '15px', padding: '10px', background: '#3a3510', color: '#f0e68c', borderRadius: '5px' }}>
        <strong>Interview Tip:</strong> Explain that render props and HOCs solved the same problem - sharing stateful logic. Hooks are now the preferred solution but you'll see render props in older code.
      </div>
    </div>
  )
}

// ============================================================================
// Q3: What are Compound Components?
// ============================================================================

const TabsContext = createContext<{ activeTab: number; setActiveTab: (tab: number) => void } | undefined>(undefined)

function Tabs({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState(0)
  
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div style={{ border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '5px', padding: '10px' }}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

function TabList({ children }: { children: React.ReactNode }) {
  return <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', borderBottom: '2px solid rgba(255, 255, 255, 0.2)', paddingBottom: '10px' }}>{children}</div>
}

function Tab({ index, children }: { index: number; children: React.ReactNode }) {
  const context = useContext(TabsContext)
  if (!context) throw new Error('Tab must be used within Tabs')
  
  const { activeTab, setActiveTab } = context
  const isActive = activeTab === index
  
  return (
    <button
      onClick={() => setActiveTab(index)}
      style={{
        padding: '8px 16px',
        cursor: 'pointer',
        background: isActive ? '#61dafb' : 'rgba(255, 255, 255, 0.1)',
        color: isActive ? '#000' : 'var(--text-primary)',
        border: isActive ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '5px',
        fontWeight: isActive ? 'bold' : 'normal',
        transition: 'all 0.2s'
      }}
    >
      {children}
    </button>
  )
}

function TabPanels({ children }: { children: React.ReactNode }) {
  const context = useContext(TabsContext)
  if (!context) throw new Error('TabPanels must be used within Tabs')
  
  const { activeTab } = context
  const childArray = React.Children.toArray(children)
  
  return <div>{childArray[activeTab]}</div>
}

function TabPanel({ children }: { children: React.ReactNode }) {
  return <div style={{ padding: '10px' }}>{children}</div>
}

function Section3_CompoundComponents() {
  return (
    <div style={{ marginBottom: '40px', padding: '20px', border: '2px solid #61dafb', borderRadius: '8px', color: 'var(--text-primary)' }}>
      <h2>Q3: What are Compound Components?</h2>
      
      <div style={{ background: '#1e1e1e', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
        <h3>Answer:</h3>
        <p><strong>Compound Components</strong> are a pattern where components work together to form a complete UI. They share implicit state through Context.</p>
        
        <h4>Characteristics:</h4>
        <ul>
          <li>Multiple components work together</li>
          <li>Share state implicitly via Context</li>
          <li>Flexible and composable API</li>
          <li>Used by libraries like Reach UI, Radix UI</li>
        </ul>

        <h4>Benefits:</h4>
        <ul>
          <li>✅ Flexible component composition</li>
          <li>✅ Better separation of concerns</li>
          <li>✅ Cleaner API for consumers</li>
          <li>✅ Less prop drilling</li>
        </ul>

        <h4>Examples in the wild:</h4>
        <ul>
          <li>Select/Option (HTML)</li>
          <li>Tabs/Tab/TabPanel</li>
          <li>Accordion/AccordionItem</li>
          <li>Dropdown/DropdownItem</li>
        </ul>
      </div>

      <h3>Live Example:</h3>
      <div style={{ background: 'rgba(76, 175, 80, 0.15)', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px', border: '1px solid rgba(76, 175, 80, 0.4)' }}>
        <Tabs>
          <TabList>
            <Tab index={0}>Tab 1</Tab>
            <Tab index={1}>Tab 2</Tab>
            <Tab index={2}>Tab 3</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>Content for Tab 1</TabPanel>
            <TabPanel>Content for Tab 2</TabPanel>
            <TabPanel>Content for Tab 3</TabPanel>
          </TabPanels>
        </Tabs>
      </div>

      <pre style={{ background: '#282c34', color: '#61dafb', padding: '15px', borderRadius: '5px', overflow: 'auto' }}>
{`// Compound Components Pattern

// 1. Create Context
const TabsContext = createContext()

// 2. Parent Component (manages state)
function Tabs({ children }) {
  const [activeTab, setActiveTab] = useState(0)
  
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div>{children}</div>
    </TabsContext.Provider>
  )
}

// 3. Child Components (consume context)
function TabList({ children }) {
  return <div className="tab-list">{children}</div>
}

function Tab({ index, children }) {
  const { activeTab, setActiveTab } = useContext(TabsContext)
  
  return (
    <button
      onClick={() => setActiveTab(index)}
      className={activeTab === index ? 'active' : ''}
    >
      {children}
    </button>
  )
}

function TabPanel({ children }) {
  return <div className="tab-panel">{children}</div>
}

// 4. Attach sub-components (optional, for better DX)
Tabs.List = TabList
Tabs.Tab = Tab
Tabs.Panels = TabPanels
Tabs.Panel = TabPanel

// Usage
<Tabs>
  <Tabs.List>
    <Tabs.Tab index={0}>Tab 1</Tabs.Tab>
    <Tabs.Tab index={1}>Tab 2</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panels>
    <Tabs.Panel>Content 1</Tabs.Panel>
    <Tabs.Panel>Content 2</Tabs.Panel>
  </Tabs.Panels>
</Tabs>

// Real-world example: Accordion
const AccordionContext = createContext()

function Accordion({ children }) {
  const [openItems, setOpenItems] = useState([])
  
  const toggle = (id) => {
    setOpenItems(prev => 
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }
  
  return (
    <AccordionContext.Provider value={{ openItems, toggle }}>
      <div>{children}</div>
    </AccordionContext.Provider>
  )
}

function AccordionItem({ id, children }) {
  const { openItems, toggle } = useContext(AccordionContext)
  const isOpen = openItems.includes(id)
  
  return (
    <div>
      {React.Children.map(children, child =>
        React.cloneElement(child, { id, isOpen, toggle })
      )}
    </div>
  )
}

function AccordionHeader({ id, isOpen, toggle, children }) {
  return (
    <button onClick={() => toggle(id)}>
      {children}
      {isOpen ? '▼' : '▶'}
    </button>
  )
}

function AccordionPanel({ isOpen, children }) {
  if (!isOpen) return null
  return <div>{children}</div>
}

// Usage
<Accordion>
  <AccordionItem id="1">
    <AccordionHeader>Section 1</AccordionHeader>
    <AccordionPanel>Content 1</AccordionPanel>
  </AccordionItem>
  <AccordionItem id="2">
    <AccordionHeader>Section 2</AccordionHeader>
    <AccordionPanel>Content 2</AccordionPanel>
  </AccordionItem>
</Accordion>

// vs. Non-compound approach (less flexible)
<Accordion
  items={[
    { id: 1, header: 'Section 1', content: 'Content 1' },
    { id: 2, header: 'Section 2', content: 'Content 2' }
  ]}
/>
// Problem: Can't customize individual items easily`}
      </pre>

      <div style={{ marginTop: '15px', padding: '10px', background: '#3a3510', color: '#f0e68c', borderRadius: '5px' }}>
        <strong>Interview Tip:</strong> Mention that compound components give users flexibility while maintaining internal state. Used heavily in headless UI libraries. Compare to HTML's native compound components (select/option).
      </div>
    </div>
  )
}

// ============================================================================
// Q4: What are Error Boundaries?
// ============================================================================

class ErrorBoundaryExample extends Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', background: 'rgba(244, 67, 54, 0.15)', color: 'var(--text-primary)', border: '2px solid rgba(244, 67, 54, 0.5)', borderRadius: '5px' }}>
          <h3>⚠️ Something went wrong</h3>
          <p>{this.state.error?.message}</p>
          <button 
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{ padding: '8px 16px', cursor: 'pointer' }}
          >
            Try Again
          </button>
        </div>
      )
    }
    
    return this.props.children
  }
}

function BuggyComponent() {
  const [shouldThrow, setShouldThrow] = useState(false)
  
  if (shouldThrow) {
    throw new Error('I crashed!')
  }
  
  return (
    <button 
      onClick={() => setShouldThrow(true)}
      style={{ padding: '8px 16px', cursor: 'pointer' }}
    >
      Click to Crash
    </button>
  )
}

function Section4_ErrorBoundaries() {
  return (
    <div style={{ marginBottom: '40px', padding: '20px', border: '2px solid #61dafb', borderRadius: '8px' }}>
      <h2>Q4: What are Error Boundaries and how do they work?</h2>
      
      <div style={{ background: '#1e1e1e', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
        <h3>Answer:</h3>
        <p><strong>Error Boundaries</strong> are React components that catch JavaScript errors anywhere in their child component tree, log errors, and display fallback UI.</p>
        
        <h4>Key Points:</h4>
        <ul>
          <li>Must be class components (no hooks equivalent yet)</li>
          <li>Use <code>getDerivedStateFromError()</code> or <code>componentDidCatch()</code></li>
          <li>Catch errors during rendering, lifecycle methods, constructors</li>
          <li>Don't catch errors in event handlers, async code, SSR, or in error boundary itself</li>
        </ul>

        <h4>What Error Boundaries DON'T catch:</h4>
        <ul>
          <li>❌ Event handlers (use try-catch)</li>
          <li>❌ Asynchronous code (setTimeout, promises)</li>
          <li>❌ Server-side rendering</li>
          <li>❌ Errors in the error boundary itself</li>
        </ul>
      </div>

      <h3>Live Example:</h3>
      <ErrorBoundaryExample>
        <div style={{ background: 'rgba(76, 175, 80, 0.15)', padding: '15px', borderRadius: '5px', border: '1px solid rgba(76, 175, 80, 0.4)' }}>
          <p>This component is protected by an Error Boundary</p>
          <BuggyComponent />
        </div>
      </ErrorBoundaryExample>

      <pre style={{ background: '#282c34', color: '#61dafb', padding: '15px', borderRadius: '5px', overflow: 'auto', marginTop: '15px' }}>
{`// Error Boundary Class Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  
  // Update state when error occurs
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  
  // Log error information
  componentDidCatch(error, errorInfo) {
    // Send to error reporting service
    logErrorToService(error, errorInfo)
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong.</h1>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      )
    }
    
    return this.props.children
  }
}

// Usage
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>

// Multiple error boundaries for granular control
<ErrorBoundary fallback={<PageError />}>
  <Header />
  
  <ErrorBoundary fallback={<SidebarError />}>
    <Sidebar />
  </ErrorBoundary>
  
  <ErrorBoundary fallback={<MainError />}>
    <Main />
  </ErrorBoundary>
</ErrorBoundary>

// With fallback prop pattern
function ErrorBoundary({ fallback, children }) {
  // ... error boundary logic
  
  if (hasError) {
    return fallback({ error, resetError })
  }
  
  return children
}

// Usage
<ErrorBoundary
  fallback={({ error, resetError }) => (
    <div>
      <h1>Error: {error.message}</h1>
      <button onClick={resetError}>Try again</button>
    </div>
  )}
>
  <MyComponent />
</ErrorBoundary>

// Event handler errors (not caught by error boundaries)
function MyComponent() {
  const handleClick = () => {
    try {
      // Code that might throw
      throw new Error('Event handler error')
    } catch (error) {
      // Handle error manually
      console.error(error)
    }
  }
  
  return <button onClick={handleClick}>Click</button>
}

// Async errors (not caught by error boundaries)
function MyComponent() {
  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .catch(error => {
        // Handle error manually
        console.error(error)
      })
  }, [])
}

// React 18: Error boundaries can be reset
function ErrorBoundary({ children }) {
  const [error, setError] = useState(null)
  
  if (error) {
    return (
      <div>
        <h1>Error: {error.message}</h1>
        <button onClick={() => setError(null)}>
          Reset
        </button>
      </div>
    )
  }
  
  return (
    <ErrorBoundaryClass onError={setError}>
      {children}
    </ErrorBoundaryClass>
  )
}

// Production vs Development
// In development, errors are also shown in overlay
// In production, only fallback UI is shown

// Best practices:
// 1. Place error boundaries strategically
// 2. Log errors to monitoring service (Sentry, LogRocket)
// 3. Provide clear fallback UI
// 4. Allow users to recover (reset button)
// 5. Don't wrap entire app in one boundary`}
      </pre>

      <div style={{ marginTop: '15px', padding: '10px', background: '#3a3510', color: '#f0e68c', borderRadius: '5px' }}>
        <strong>Interview Tip:</strong> Emphasize what error boundaries DON'T catch. Mention that there's no functional component equivalent yet. Discuss error reporting services integration.
      </div>
    </div>
  )
}

// ============================================================================
// Q5: Controlled vs Uncontrolled Components (Forms)
// ============================================================================

function Section5_ControlledVsUncontrolled() {
  const [controlledValue, setControlledValue] = useState('')
  const uncontrolledRef = React.useRef<HTMLInputElement>(null)
  
  return (
    <div style={{ marginBottom: '40px', padding: '20px', border: '2px solid #61dafb', borderRadius: '8px' }}>
      <h2>Q5: Controlled vs Uncontrolled Components in Forms</h2>
      
      <div style={{ background: '#1e1e1e', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
        <h3>Answer:</h3>
        
        <h4>Controlled Components:</h4>
        <ul>
          <li>Form data handled by React state</li>
          <li>Value set via props, changes via onChange</li>
          <li>Single source of truth (React state)</li>
          <li><strong>Recommended approach</strong></li>
        </ul>

        <h4>Uncontrolled Components:</h4>
        <ul>
          <li>Form data handled by DOM</li>
          <li>Access value via refs</li>
          <li>Less code, but less control</li>
          <li>Use for file inputs or simple forms</li>
        </ul>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
        <div style={{ background: 'rgba(76, 175, 80, 0.15)', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', border: '1px solid rgba(76, 175, 80, 0.4)' }}>
          <h4>✅ Controlled</h4>
          <input
            type="text"
            value={controlledValue}
            onChange={(e) => setControlledValue(e.target.value)}
            placeholder="Controlled input"
            style={{ padding: '8px', width: '100%' }}
          />
          <p>Value: {controlledValue}</p>
        </div>
        
        <div style={{ background: 'rgba(255, 152, 0, 0.15)', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', border: '1px solid rgba(255, 152, 0, 0.4)' }}>
          <h4>⚠️ Uncontrolled</h4>
          <input
            ref={uncontrolledRef}
            type="text"
            defaultValue=""
            placeholder="Uncontrolled input"
            style={{ padding: '8px', width: '100%' }}
          />
          <button 
            onClick={() => alert(uncontrolledRef.current?.value)}
            style={{ padding: '8px 16px', cursor: 'pointer', marginTop: '10px' }}
          >
            Get Value
          </button>
        </div>
      </div>

      <pre style={{ background: '#282c34', color: '#61dafb', padding: '15px', borderRadius: '5px', overflow: 'auto', marginTop: '15px' }}>
{`// Controlled Component (Recommended)
function ControlledForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    agree: false
  })
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)  // React state is source of truth
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
      />
      <input
        name="agree"
        type="checkbox"
        checked={formData.agree}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  )
}

// Uncontrolled Component
function UncontrolledForm() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const agreeRef = useRef()
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      agree: agreeRef.current.checked
    }
    console.log(formData)  // DOM is source of truth
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input ref={emailRef} name="email" defaultValue="" />
      <input ref={passwordRef} name="password" type="password" />
      <input ref={agreeRef} name="agree" type="checkbox" />
      <button type="submit">Submit</button>
    </form>
  )
}

// When to use each:

// Controlled - Most cases
// ✅ Form validation
// ✅ Conditional submission
// ✅ Dynamic form fields
// ✅ Formatting input (e.g., credit card)
// ✅ Multiple submit buttons with different actions

// Uncontrolled - Special cases
// ✅ File input (always uncontrolled)
// ✅ Simple forms without validation
// ✅ Integration with non-React code
// ✅ Performance-critical forms (large lists)

// File input (always uncontrolled)
function FileUpload() {
  const fileRef = useRef()
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const files = fileRef.current.files
    console.log(files)
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input ref={fileRef} type="file" />
      <button type="submit">Upload</button>
    </form>
  )
}`}
      </pre>

      <div style={{ marginTop: '15px', padding: '10px', background: '#3a3510', color: '#f0e68c', borderRadius: '5px' }}>
        <strong>Interview Tip:</strong> Controlled components are recommended for most use cases. Mention file inputs are always uncontrolled. Discuss form libraries like Formik, React Hook Form.
      </div>
    </div>
  )
}

// ============================================================================
// Q6: React Router Concepts
// ============================================================================

function Section6_ReactRouter() {
  return (
    <div style={{ marginBottom: '40px', padding: '20px', border: '2px solid #61dafb', borderRadius: '8px' }}>
      <h2>Q6: Key React Router Concepts (Interview Questions)</h2>
      
      <div style={{ background: '#1e1e1e', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
        <h3>Common Interview Questions:</h3>
        
        <h4>1. What is React Router and why use it?</h4>
        <p>Client-side routing library for React. Enables navigation without page reloads (SPA).</p>
        
        <h4>2. BrowserRouter vs HashRouter vs MemoryRouter?</h4>
        <ul>
          <li><strong>BrowserRouter:</strong> Uses HTML5 history API (clean URLs)</li>
          <li><strong>HashRouter:</strong> Uses URL hash (#) - for static servers</li>
          <li><strong>MemoryRouter:</strong> In-memory history - for tests/React Native</li>
        </ul>

        <h4>3. How to pass data between routes?</h4>
        <ul>
          <li>URL parameters (<code>/user/:id</code>)</li>
          <li>Query strings (<code>?search=query</code>)</li>
          <li>State via <code>navigate()</code></li>
          <li>Context/Global state</li>
        </ul>

        <h4>4. Programmatic navigation?</h4>
        <ul>
          <li>Use <code>useNavigate()</code> hook</li>
          <li>Or <code>&lt;Navigate&gt;</code> component</li>
        </ul>

        <h4>5. Protected routes?</h4>
        <ul>
          <li>Wrap route in auth-checking component</li>
          <li>Redirect to login if not authenticated</li>
        </ul>
      </div>

      <pre style={{ background: '#282c34', color: '#61dafb', padding: '15px', borderRadius: '5px', overflow: 'auto' }}>
{`// Basic Setup (React Router v6)
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/users/123">User 123</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

// URL Parameters
function User() {
  const { id } = useParams()  // Get :id from URL
  return <div>User ID: {id}</div>
}

// Query Strings
function SearchPage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q')
  return <div>Searching for: {query}</div>
}

// Programmatic Navigation
function LoginPage() {
  const navigate = useNavigate()
  
  const handleLogin = () => {
    // ... login logic
    navigate('/dashboard', { replace: true })
  }
  
  return <button onClick={handleLogin}>Login</button>
}

// Protected Routes
function ProtectedRoute({ children }) {
  const { user } = useAuth()
  
  if (!user) {
    return <Navigate to="/login" replace />
  }
  
  return children
}

// Usage
<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  } 
/>

// Nested Routes
<Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="about" element={<About />} />
    <Route path="users" element={<Users />}>
      <Route path=":id" element={<UserDetail />} />
      <Route path="new" element={<NewUser />} />
    </Route>
  </Route>
</Routes>

function Layout() {
  return (
    <div>
      <Header />
      <Outlet />  {/* Renders child routes */}
      <Footer />
    </div>
  )
}

// Passing state between routes
navigate('/details', { state: { from: 'profile' } })

// Access state
function DetailsPage() {
  const location = useLocation()
  const from = location.state?.from
}

// useNavigate options
navigate('/path')              // Navigate to path
navigate(-1)                   // Go back
navigate(1)                    // Go forward
navigate('/path', {
  replace: true,               // Replace history entry
  state: { data: 'value' }    // Pass state
})`}
      </pre>

      <div style={{ marginTop: '15px', padding: '10px', background: '#3a3510', color: '#f0e68c', borderRadius: '5px' }}>
        <strong>Interview Tip:</strong> Know the differences between React Router v5 and v6. Mention v6 uses Routes instead of Switch, element instead of component prop, and removed useHistory in favor of useNavigate.
      </div>
    </div>
  )
}

// ============================================================================
// Q7: React 18 New Features
// ============================================================================

function Section7_React18Features() {
  return (
    <div style={{ marginBottom: '40px', padding: '20px', border: '2px solid #61dafb', borderRadius: '8px', color: 'var(--text-primary)' }}>
      <h2>Q7: What's new in React 18?</h2>
      
      <div style={{ background: '#1e1e1e', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
        <h3>Answer:</h3>
        <p>React 18 introduced several major features focused on improving user experience and performance.</p>
        
        <h4>Key Features:</h4>
        <ol>
          <li><strong>Automatic Batching</strong> - Multiple setState calls batched (even in async)</li>
          <li><strong>Transitions</strong> - Mark updates as non-urgent</li>
          <li><strong>Suspense for SSR</strong> - Stream HTML, selective hydration</li>
          <li><strong>New Root API</strong> - createRoot instead of render</li>
          <li><strong>New Hooks</strong> - useId, useTransition, useDeferredValue, useSyncExternalStore</li>
          <li><strong>Concurrent Features</strong> - Interruptible rendering</li>
        </ol>
      </div>

      <pre style={{ background: '#282c34', color: '#61dafb', padding: '15px', borderRadius: '5px', overflow: 'auto' }}>
{`// 1. New Root API
// React 17
import ReactDOM from 'react-dom'
ReactDOM.render(<App />, document.getElementById('root'))

// React 18
import { createRoot } from 'react-dom/client'
const root = createRoot(document.getElementById('root'))
root.render(<App />)

// 2. Automatic Batching
function Component() {
  const [count, setCount] = useState(0)
  const [flag, setFlag] = useState(false)
  
  // React 17: Only batched in React event handlers
  // React 18: Batched everywhere (promises, setTimeout, etc.)
  
  const handleClick = () => {
    fetch('/api').then(() => {
      setCount(c => c + 1)  // Batched!
      setFlag(f => !f)      // Batched!
      // Only one re-render in React 18
    })
  }
}

// Opt out of batching (rare)
import { flushSync } from 'react-dom'

flushSync(() => {
  setCount(c => c + 1)
})
// DOM updated here
flushSync(() => {
  setFlag(f => !f)
})
// DOM updated here

// 3. Transitions (useTransition)
function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isPending, startTransition] = useTransition()
  
  const handleChange = (e) => {
    // Urgent: Update input immediately
    setQuery(e.target.value)
    
    // Non-urgent: Update results can wait
    startTransition(() => {
      setResults(filterResults(e.target.value))
    })
  }
  
  return (
    <div>
      <input value={query} onChange={handleChange} />
      {isPending && <Spinner />}
      <Results items={results} />
    </div>
  )
}

// 4. useDeferredValue (alternative to useTransition)
function SearchPage() {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)
  
  // query updates immediately (input stays responsive)
  // deferredQuery updates with lower priority
  
  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <Results query={deferredQuery} />
    </div>
  )
}

// 5. useId (for SSR-safe unique IDs)
function Form() {
  const id = useId()
  
  return (
    <div>
      <label htmlFor={\`\${id}-email\`}>Email</label>
      <input id={\`\${id}-email\`} />
      
      <label htmlFor={\`\${id}-password\`}>Password</label>
      <input id={\`\${id}-password\`} />
    </div>
  )
}

// 6. Suspense for Data Fetching (experimental)
const resource = fetchData()  // Returns suspendable resource

function Component() {
  const data = resource.read()  // Suspends if not ready
  return <div>{data}</div>
}

// Usage
<Suspense fallback={<Loading />}>
  <Component />
</Suspense>

// 7. Suspense on the Server (SSR improvements)
// Streaming HTML
// Selective hydration (interactive before full page loads)

// 8. useSyncExternalStore (for library authors)
function useStore(store) {
  return useSyncExternalStore(
    store.subscribe,     // Subscribe to store
    store.getState,      // Get snapshot
    store.getServerState // Server snapshot (SSR)
  )
}

// 9. Concurrent Rendering
// React can start, pause, and resume rendering
// Prevents blocking on expensive re-renders
// Automatically enabled with new features

// Migration Tips:
// 1. Update to React 18
// 2. Replace ReactDOM.render with createRoot
// 3. Test your app (batching might change behavior)
// 4. Gradually adopt new features
// 5. Use Strict Mode to find issues`}
      </pre>

      <div style={{ marginTop: '15px', padding: '10px', background: '#3a3510', color: '#f0e68c', borderRadius: '5px' }}>
        <strong>Interview Tip:</strong> Focus on automatic batching and transitions - they're the most practical improvements. Mention that concurrent features are opt-in and won't break existing code. Explain the difference between startTransition (updates within your control) and useDeferredValue (updates from props).
      </div>
    </div>
  )
}
