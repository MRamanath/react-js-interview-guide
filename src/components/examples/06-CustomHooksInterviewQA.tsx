import React, { useState, useEffect, useCallback, useRef } from 'react'

/**
 * TOP INTERVIEW QUESTIONS: CUSTOM HOOKS
 * 
 * Most commonly asked questions about creating and using custom hooks
 */

export default function CustomHooksInterviewQA() {
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', color: 'var(--text-primary)' }}>
      <h1>🎣 Custom Hooks - Top Interview Questions</h1>
      
      <Section1_WhatAreCustomHooks />
      <Section2_CommonPatterns />
      <Section3_UseLocalStorage />
      <Section4_UseFetch />
      <Section5_BestPractices />
    </div>
  )
}

// ============================================================================
// Q1: What are Custom Hooks? Why create them?
// ============================================================================
function Section1_WhatAreCustomHooks() {
  return (
    <div style={{ marginBottom: '40px', padding: '20px', border: '2px solid #61dafb', borderRadius: '8px', color: 'var(--text-primary)' }}>
      <h2>Q1: What are Custom Hooks and why create them?</h2>
      
      <div style={{ background: '#1e1e1e', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
        <h3>Answer:</h3>
        <p><strong>Custom Hooks</strong> are JavaScript functions that start with "use" and can call other hooks. They let you extract and reuse stateful logic between components.</p>
        
        <h4>Why Create Custom Hooks:</h4>
        <ul>
          <li><strong>Code Reusability</strong> - Share logic across multiple components</li>
          <li><strong>Separation of Concerns</strong> - Extract complex logic from components</li>
          <li><strong>Better Testing</strong> - Test logic independently</li>
          <li><strong>Cleaner Components</strong> - Keep components focused on UI</li>
          <li><strong>Composition</strong> - Combine multiple hooks together</li>
        </ul>

        <h4>Rules for Custom Hooks:</h4>
        <ul>
          <li>✅ Must start with "use" (convention)</li>
          <li>✅ Can call other hooks</li>
          <li>✅ Can have any arguments and return values</li>
          <li>✅ Follow all Rules of Hooks</li>
        </ul>

        <h4>When to Create Custom Hooks:</h4>
        <ul>
          <li>Logic used in multiple components</li>
          <li>Complex state logic that can be extracted</li>
          <li>Side effects that can be reused</li>
          <li>To simplify component code</li>
        </ul>
      </div>

      <pre style={{ background: '#282c34', color: '#61dafb', padding: '15px', borderRadius: '5px', overflow: 'auto' }}>
{`// Simple Custom Hook Example
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue)
  
  const increment = useCallback(() => setCount(c => c + 1), [])
  const decrement = useCallback(() => setCount(c => c - 1), [])
  const reset = useCallback(() => setCount(initialValue), [initialValue])
  
  return { count, increment, decrement, reset }
}

// Usage in Component
function Counter() {
  const { count, increment, decrement, reset } = useCounter(0)
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}

// Without Custom Hook (repeated logic)
function Counter1() {
  const [count, setCount] = useState(0)
  const increment = () => setCount(c => c + 1)
  const decrement = () => setCount(c => c - 1)
  const reset = () => setCount(0)
  // ... UI
}

function Counter2() {
  const [count, setCount] = useState(10)
  const increment = () => setCount(c => c + 1)
  const decrement = () => setCount(c => c - 1)
  const reset = () => setCount(10)
  // ... Same logic repeated! 😢
}

// With Custom Hook (DRY)
function Counter1() {
  const counter = useCounter(0)
  // ... UI
}

function Counter2() {
  const counter = useCounter(10)
  // ... Same UI, different initial value 😊
}

// TypeScript Custom Hook
function useCounter(initialValue: number = 0) {
  const [count, setCount] = useState(initialValue)
  
  const increment = useCallback(() => setCount(c => c + 1), [])
  const decrement = useCallback(() => setCount(c => c - 1), [])
  const reset = useCallback(() => setCount(initialValue), [initialValue])
  
  return { count, increment, decrement, reset } as const
}

// Custom Hook with Configuration
interface UseCounterOptions {
  min?: number
  max?: number
  step?: number
}

function useCounter(initialValue = 0, options: UseCounterOptions = {}) {
  const { min, max, step = 1 } = options
  const [count, setCount] = useState(initialValue)
  
  const increment = useCallback(() => {
    setCount(c => {
      const newValue = c + step
      return max !== undefined ? Math.min(newValue, max) : newValue
    })
  }, [max, step])
  
  const decrement = useCallback(() => {
    setCount(c => {
      const newValue = c - step
      return min !== undefined ? Math.max(newValue, min) : newValue
    })
  }, [min, step])
  
  return { count, increment, decrement }
}

// Usage
const counter = useCounter(0, { min: 0, max: 10, step: 2 })`}
      </pre>

      <div style={{ marginTop: '15px', padding: '10px', background: '#3a3510', color: '#f0e68c', borderRadius: '5px' }}>
        <strong>Interview Tip:</strong> Emphasize that custom hooks are about extracting logic, not UI. They're functions that follow hooks rules. Mention that they make code more maintainable and testable.
      </div>
    </div>
  )
}

// ============================================================================
// Q2: Common Custom Hook Patterns
// ============================================================================
function Section2_CommonPatterns() {
  return (
    <div style={{ marginBottom: '40px', padding: '20px', border: '2px solid #61dafb', borderRadius: '8px', color: 'var(--text-primary)' }}>
      <h2>Q2: What are common custom hook patterns?</h2>
      
      <div style={{ background: '#1e1e1e', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
        <h3>Answer:</h3>
        <p>Common patterns that custom hooks solve:</p>
        
        <ol>
          <li><strong>Data Fetching</strong> - useFetch, useQuery</li>
          <li><strong>Form Handling</strong> - useForm, useInput</li>
          <li><strong>Browser APIs</strong> - useLocalStorage, useMediaQuery</li>
          <li><strong>UI State</strong> - useToggle, useModal</li>
          <li><strong>Lifecycle</strong> - useMount, useUpdateEffect</li>
          <li><strong>Performance</strong> - useDebounce, useThrottle</li>
        </ol>
      </div>

      <pre style={{ background: '#282c34', color: '#61dafb', padding: '15px', borderRadius: '5px', overflow: 'auto' }}>
{`// 1. useToggle - Boolean state management
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue)
  
  const toggle = useCallback(() => setValue(v => !v), [])
  const setTrue = useCallback(() => setValue(true), [])
  const setFalse = useCallback(() => setValue(false), [])
  
  return [value, toggle, setTrue, setFalse] as const
}

// Usage
function Modal() {
  const [isOpen, toggle, open, close] = useToggle(false)
  
  return (
    <>
      <button onClick={open}>Open Modal</button>
      {isOpen && <ModalContent onClose={close} />}
    </>
  )
}

// 2. useDebounce - Delay value updates
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    
    return () => clearTimeout(handler)
  }, [value, delay])
  
  return debouncedValue
}

// Usage
function Search() {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 500)
  
  useEffect(() => {
    if (debouncedQuery) {
      // API call only after user stops typing for 500ms
      fetchResults(debouncedQuery)
    }
  }, [debouncedQuery])
  
  return <input value={query} onChange={e => setQuery(e.target.value)} />
}

// 3. useMediaQuery - Responsive design
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    return window.matchMedia(query).matches
  })
  
  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches)
    
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [query])
  
  return matches
}

// Usage
function ResponsiveComponent() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)')
  const isDesktop = useMediaQuery('(min-width: 1025px)')
  
  return (
    <div>
      {isMobile && <MobileView />}
      {isTablet && <TabletView />}
      {isDesktop && <DesktopView />}
    </div>
  )
}

// 4. usePrevious - Access previous value
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>()
  
  useEffect(() => {
    ref.current = value
  }, [value])
  
  return ref.current
}

// Usage
function Counter() {
  const [count, setCount] = useState(0)
  const prevCount = usePrevious(count)
  
  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCount}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}

// 5. useInterval - Declarative setInterval
function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback)
  
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])
  
  useEffect(() => {
    if (delay === null) return
    
    const id = setInterval(() => savedCallback.current(), delay)
    return () => clearInterval(id)
  }, [delay])
}

// Usage
function Timer() {
  const [count, setCount] = useState(0)
  const [isRunning, setIsRunning] = useState(true)
  
  useInterval(() => {
    setCount(count + 1)
  }, isRunning ? 1000 : null)
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? 'Pause' : 'Resume'}
      </button>
    </div>
  )
}

// 6. useOnClickOutside - Click outside detection
function useOnClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return
      }
      handler(event)
    }
    
    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)
    
    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}

// Usage
function Dropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  useOnClickOutside(dropdownRef, () => setIsOpen(false))
  
  return (
    <div ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
      {isOpen && <DropdownMenu />}
    </div>
  )
}

// 7. useWindowSize - Track window dimensions
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })
  
  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  return size
}

// Usage
function Component() {
  const { width, height } = useWindowSize()
  
  return (
    <div>
      Window size: {width} x {height}
    </div>
  )
}`}
      </pre>

      <div style={{ marginTop: '15px', padding: '10px', background: '#3a3510', color: '#f0e68c', borderRadius: '5px' }}>
        <strong>Interview Tip:</strong> Mention popular custom hook libraries like react-use, usehooks-ts. Explain that these patterns solve common problems and make code more declarative.
      </div>
    </div>
  )
}

// ============================================================================
// Q3: useLocalStorage Hook Example
// ============================================================================

function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue] as const
}

function Section3_UseLocalStorage() {
  const [name, setName] = useLocalStorage('demo-name', '')
  const [isDark, setIsDark] = useLocalStorage('demo-theme', false)

  return (
    <div style={{ marginBottom: '40px', padding: '20px', border: '2px solid #61dafb', borderRadius: '8px', color: 'var(--text-primary)' }}>
      <h2>Q3: How to create a useLocalStorage hook?</h2>
      
      <div style={{ background: '#1e1e1e', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
        <h3>Answer:</h3>
        <p>A <strong>useLocalStorage</strong> hook synchronizes state with localStorage, persisting data across page refreshes.</p>
        
        <h4>Key Features:</h4>
        <ul>
          <li>Read from localStorage on mount</li>
          <li>Write to localStorage on changes</li>
          <li>Handle JSON serialization/deserialization</li>
          <li>Error handling for localStorage access</li>
          <li>TypeScript generic support</li>
        </ul>
      </div>

      <h3>Live Demo:</h3>
      <div style={{ background: 'rgba(76, 175, 80, 0.15)', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px', border: '1px solid rgba(76, 175, 80, 0.4)' }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Name (persisted in localStorage):</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            style={{ padding: '8px', width: '100%', maxWidth: '400px' }}
          />
        </div>
        
        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
              type="checkbox"
              checked={isDark}
              onChange={(e) => setIsDark(e.target.checked)}
            />
            Dark Mode (persisted)
          </label>
        </div>
        
        <p style={{ marginTop: '15px', fontSize: '12px', color: 'var(--text-secondary)' }}>
          💡 Refresh the page - your values will persist!
        </p>
      </div>

      <pre style={{ background: '#282c34', color: '#61dafb', padding: '15px', borderRadius: '5px', overflow: 'auto' }}>
{`// useLocalStorage Hook Implementation
function useLocalStorage<T>(key: string, initialValue: T) {
  // Get from localStorage on mount
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error('Error reading from localStorage:', error)
      return initialValue
    }
  })

  // Save to localStorage when value changes
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function (like useState)
      const valueToStore = value instanceof Function 
        ? value(storedValue) 
        : value
      
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error('Error writing to localStorage:', error)
    }
  }

  return [storedValue, setValue] as const
}

// Usage Examples
function App() {
  const [name, setName] = useLocalStorage('username', 'Anonymous')
  const [theme, setTheme] = useLocalStorage('theme', 'light')
  const [settings, setSettings] = useLocalStorage('settings', {
    notifications: true,
    language: 'en'
  })
  
  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} />
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </div>
  )
}

// Advanced: Sync across tabs
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function 
        ? value(storedValue) 
        : value
      
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
      
      // Dispatch custom event for cross-tab sync
      window.dispatchEvent(new Event('local-storage'))
    } catch (error) {
      console.error(error)
    }
  }

  // Listen for changes from other tabs
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const item = window.localStorage.getItem(key)
        if (item) {
          setStoredValue(JSON.parse(item))
        }
      } catch (error) {
        console.error(error)
      }
    }

    // Listen to storage events from other tabs
    window.addEventListener('storage', handleStorageChange)
    // Listen to custom events from same tab
    window.addEventListener('local-storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('local-storage', handleStorageChange)
    }
  }, [key])

  return [storedValue, setValue] as const
}

// With remove functionality
function useLocalStorage<T>(key: string, initialValue: T) {
  // ... same as above

  const remove = useCallback(() => {
    try {
      window.localStorage.removeItem(key)
      setStoredValue(initialValue)
    } catch (error) {
      console.error(error)
    }
  }, [key, initialValue])

  return [storedValue, setValue, remove] as const
}`}
      </pre>

      <div style={{ marginTop: '15px', padding: '10px', background: '#3a3510', color: '#f0e68c', borderRadius: '5px' }}>
        <strong>Interview Tip:</strong> Mention error handling for localStorage (it can throw errors in private mode or when quota exceeded). Discuss the storage event for cross-tab synchronization.
      </div>
    </div>
  )
}

// ============================================================================
// Q4: useFetch Hook Example
// ============================================================================

interface UseFetchResult<T> {
  data: T | null
  loading: boolean
  error: Error | null
  refetch: () => void
}

function useFetch<T>(url: string): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [refetchIndex, setRefetchIndex] = useState(0)

  const refetch = useCallback(() => {
    setRefetchIndex(prev => prev + 1)
  }, [])

  useEffect(() => {
    let cancelled = false

    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const json = await response.json()
        
        if (!cancelled) {
          setData(json)
        }
      } catch (e) {
        if (!cancelled) {
          setError(e as Error)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      cancelled = true
    }
  }, [url, refetchIndex])

  return { data, loading, error, refetch }
}

function Section4_UseFetch() {
  const [userId, setUserId] = useState(1)
  const { data, loading, error, refetch } = useFetch<{ id: number; name: string; email: string }>(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  )

  return (
    <div style={{ marginBottom: '40px', padding: '20px', border: '2px solid #61dafb', borderRadius: '8px', color: 'var(--text-primary)' }}>
      <h2>Q4: How to create a useFetch hook for data fetching?</h2>
      
      <div style={{ background: '#1e1e1e', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
        <h3>Answer:</h3>
        <p>A <strong>useFetch</strong> hook encapsulates data fetching logic, managing loading, error, and data states.</p>
        
        <h4>Key Features:</h4>
        <ul>
          <li>Automatic fetching on mount</li>
          <li>Loading state management</li>
          <li>Error handling</li>
          <li>Cleanup on unmount (prevent memory leaks)</li>
          <li>Refetch capability</li>
          <li>TypeScript generic support</li>
        </ul>

        <h4>Important Considerations:</h4>
        <ul>
          <li>Cancel pending requests on unmount</li>
          <li>Handle race conditions</li>
          <li>Consider using React Query/SWR for production</li>
        </ul>
      </div>

      <h3>Live Demo:</h3>
      <div style={{ background: 'rgba(33, 150, 243, 0.15)', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px', border: '1px solid rgba(33, 150, 243, 0.4)' }}>
        <div style={{ marginBottom: '15px' }}>
          <label>User ID: </label>
          <input
            type="number"
            value={userId}
            onChange={(e) => setUserId(Number(e.target.value))}
            min="1"
            max="10"
            style={{ padding: '5px', marginLeft: '10px' }}
          />
          <button onClick={refetch} style={{ padding: '5px 15px', marginLeft: '10px', cursor: 'pointer' }}>
            Refetch
          </button>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: '#f87171' }}>Error: {error.message}</p>}
        {data && (
          <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '15px', borderRadius: '5px', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
            <p><strong>Name:</strong> {data.name}</p>
            <p><strong>Email:</strong> {data.email}</p>
          </div>
        )}
      </div>

      <pre style={{ background: '#282c34', color: '#61dafb', padding: '15px', borderRadius: '5px', overflow: 'auto' }}>
{`// useFetch Hook Implementation
interface UseFetchResult<T> {
  data: T | null
  loading: boolean
  error: Error | null
  refetch: () => void
}

function useFetch<T>(url: string): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [refetchIndex, setRefetchIndex] = useState(0)

  const refetch = useCallback(() => {
    setRefetchIndex(prev => prev + 1)
  }, [])

  useEffect(() => {
    // Cancel flag to prevent state updates after unmount
    let cancelled = false

    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(\`HTTP error! status: \${response.status}\`)
        }
        const json = await response.json()
        
        // Only update state if component is still mounted
        if (!cancelled) {
          setData(json)
        }
      } catch (e) {
        if (!cancelled) {
          setError(e as Error)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchData()

    // Cleanup: Set cancelled flag
    return () => {
      cancelled = true
    }
  }, [url, refetchIndex])

  return { data, loading, error, refetch }
}

// Usage
function UserProfile({ userId }: { userId: number }) {
  const { data, loading, error, refetch } = useFetch<User>(
    \`/api/users/\${userId}\`
  )

  if (loading) return <Spinner />
  if (error) return <Error message={error.message} />
  if (!data) return <div>No data</div>

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.email}</p>
      <button onClick={refetch}>Refresh</button>
    </div>
  )
}

// Advanced: With AbortController
function useFetch<T>(url: string): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const abortController = new AbortController()

    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(url, {
          signal: abortController.signal  // Pass abort signal
        })
        
        if (!response.ok) {
          throw new Error(\`HTTP error! status: \${response.status}\`)
        }
        
        const json = await response.json()
        setData(json)
      } catch (e) {
        // Don't set error if request was aborted
        if (e instanceof Error && e.name !== 'AbortError') {
          setError(e)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    // Abort fetch on cleanup
    return () => {
      abortController.abort()
    }
  }, [url])

  return { data, loading, error }
}

// With options (POST, headers, etc.)
interface UseFetchOptions extends RequestInit {
  skip?: boolean
}

function useFetch<T>(url: string, options?: UseFetchOptions): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(!options?.skip)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (options?.skip) return

    const abortController = new AbortController()

    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          ...options,
          signal: abortController.signal
        })
        
        if (!response.ok) {
          throw new Error(\`HTTP error! status: \${response.status}\`)
        }
        
        const json = await response.json()
        setData(json)
      } catch (e) {
        if (e instanceof Error && e.name !== 'AbortError') {
          setError(e)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    return () => abortController.abort()
  }, [url, options])

  return { data, loading, error }
}

// Usage with POST
const { data } = useFetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'John' })
})

// Note: For production, use React Query or SWR
// They handle caching, revalidation, deduplication, etc.`}
      </pre>

      <div style={{ marginTop: '15px', padding: '10px', background: '#3a3510', color: '#f0e68c', borderRadius: '5px' }}>
        <strong>Interview Tip:</strong> Emphasize cleanup to prevent memory leaks and race conditions. Mention that production apps should use React Query or SWR instead of rolling their own solution.
      </div>
    </div>
  )
}

// ============================================================================
// Q5: Best Practices for Custom Hooks
// ============================================================================
function Section5_BestPractices() {
  return (
    <div style={{ marginBottom: '40px', padding: '20px', border: '2px solid #61dafb', borderRadius: '8px', color: 'var(--text-primary)' }}>
      <h2>Q5: What are best practices for custom hooks?</h2>
      
      <div style={{ background: '#1e1e1e', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
        <h3>Answer:</h3>
        
        <h4>Best Practices:</h4>
        <ol>
          <li><strong>Name with "use" prefix</strong> - Required for linting</li>
          <li><strong>Keep hooks focused</strong> - Single responsibility</li>
          <li><strong>Return arrays or objects</strong> - Consistent API</li>
          <li><strong>Document dependencies</strong> - Clear about what triggers updates</li>
          <li><strong>Handle cleanup</strong> - Prevent memory leaks</li>
          <li><strong>Make them testable</strong> - Can test independently</li>
          <li><strong>Use TypeScript</strong> - Type safety and IntelliSense</li>
        </ol>
      </div>

      <pre style={{ background: '#282c34', color: '#61dafb', padding: '15px', borderRadius: '5px', overflow: 'auto' }}>
{`// ✅ Good Practices

// 1. Use "use" prefix
function useFormValidation() { /* ... */ }  // ✅ Good
function formValidation() { /* ... */ }     // ❌ Bad - no "use"

// 2. Return consistent structure
// Array destructuring (like useState)
function useToggle(initial = false) {
  const [value, setValue] = useState(initial)
  const toggle = () => setValue(v => !v)
  return [value, toggle] as const  // ✅ Array
}

// Object destructuring (for many values)
function useFetch(url: string) {
  // ... implementation
  return { data, loading, error, refetch }  // ✅ Object
}

// 3. Memoize callbacks
function useCounter() {
  const [count, setCount] = useState(0)
  
  // ❌ Bad: New function every render
  const increment = () => setCount(c => c + 1)
  
  // ✅ Good: Memoized
  const increment = useCallback(() => setCount(c => c + 1), [])
  
  return { count, increment }
}

// 4. Handle cleanup properly
function useEventListener(event: string, handler: (e: Event) => void) {
  useEffect(() => {
    window.addEventListener(event, handler)
    
    // ✅ Always cleanup
    return () => {
      window.removeEventListener(event, handler)
    }
  }, [event, handler])
}

// 5. Accept configuration object for many options
// ❌ Bad: Too many parameters
function useFetch(url, method, headers, body, cache, credentials) { }

// ✅ Good: Single config object
interface UseFetchOptions {
  method?: string
  headers?: HeadersInit
  body?: BodyInit
  cache?: RequestCache
  credentials?: RequestCredentials
}

function useFetch(url: string, options?: UseFetchOptions) { }

// 6. Provide default values
function useLocalStorage<T>(
  key: string, 
  initialValue: T  // Default value
) {
  // ... implementation
}

// 7. Early returns for invalid states
function useUser(userId?: string) {
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    if (!userId) return  // ✅ Early return
    
    fetchUser(userId).then(setUser)
  }, [userId])
  
  return user
}

// 8. Compose hooks together
function useAuthenticatedFetch(url: string) {
  const { token } = useAuth()  // Use another hook
  
  return useFetch(url, {
    headers: {
      Authorization: \`Bearer \${token}\`
    }
  })
}

// 9. TypeScript generics for flexibility
function useArray<T>(initialValue: T[]) {
  const [array, setArray] = useState(initialValue)
  
  const push = useCallback((element: T) => {
    setArray(arr => [...arr, element])
  }, [])
  
  const remove = useCallback((index: number) => {
    setArray(arr => arr.filter((_, i) => i !== index))
  }, [])
  
  return { array, set: setArray, push, remove }
}

// 10. Document your hook
/**
 * Custom hook for managing form state
 * 
 * @param initialValues - Initial form values
 * @returns Form state and handlers
 * 
 * @example
 * const form = useForm({ email: '', password: '' })
 * 
 * <input
 *   name="email"
 *   value={form.values.email}
 *   onChange={form.handleChange}
 * />
 */
function useForm<T extends Record<string, any>>(initialValues: T) {
  // ... implementation
}

// Testing Custom Hooks
// Use @testing-library/react-hooks

import { renderHook, act } from '@testing-library/react-hooks'

describe('useCounter', () => {
  it('should increment counter', () => {
    const { result } = renderHook(() => useCounter())
    
    act(() => {
      result.current.increment()
    })
    
    expect(result.current.count).toBe(1)
  })
})

// Common Mistakes to Avoid

// ❌ 1. Conditionally calling hooks
function useBadHook(shouldUse: boolean) {
  if (shouldUse) {
    const [state] = useState(0)  // ❌ Conditional hook
  }
}

// ✅ Fix: Always call hooks
function useGoodHook(shouldUse: boolean) {
  const [state] = useState(0)  // ✅ Always called
  
  if (!shouldUse) return null
}

// ❌ 2. Not cleaning up side effects
function useBadHook() {
  useEffect(() => {
    const interval = setInterval(() => {}, 1000)
    // ❌ No cleanup - memory leak!
  }, [])
}

// ✅ Fix: Return cleanup function
function useGoodHook() {
  useEffect(() => {
    const interval = setInterval(() => {}, 1000)
    return () => clearInterval(interval)  // ✅ Cleanup
  }, [])
}

// ❌ 3. Missing dependencies
function useBadHook(userId: string) {
  useEffect(() => {
    fetchUser(userId)  // Uses userId
  }, [])  // ❌ Missing userId dependency
}

// ✅ Fix: Include all dependencies
function useGoodHook(userId: string) {
  useEffect(() => {
    fetchUser(userId)
  }, [userId])  // ✅ Include userId
}`}
      </pre>

      <div style={{ marginTop: '15px', padding: '10px', background: '#3a3510', color: '#f0e68c', borderRadius: '5px' }}>
        <strong>Interview Tip:</strong> Mention that custom hooks should be pure functions and follow the same rules as built-in hooks. Discuss testing with @testing-library/react-hooks. Emphasize composition over complexity.
      </div>
    </div>
  )
}
