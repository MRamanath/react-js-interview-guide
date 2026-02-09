import React, { useState, useEffect, useRef, useCallback, useMemo, useReducer } from 'react'

/**
 * TOP INTERVIEW QUESTIONS: REACT HOOKS
 * 
 * Most commonly asked hooks interview questions with live examples
 */

export default function HooksInterviewQA() {
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', color: 'var(--text-primary)' }}>
      <h1>🪝 React Hooks - Top Interview Questions</h1>
      
      <Section1_WhatAreHooks />
      <Section2_UseStateDeepDive />
      <Section3_UseEffectDeepDive />
      <Section4_UseRefVsState />
      <Section5_UseCallbackVsMemo />
      <Section6_UseReducerExample />
      <Section7_RulesOfHooks />
    </div>
  )
}

// ============================================================================
// Q1: What are Hooks? Why were they introduced?
// ============================================================================
function Section1_WhatAreHooks() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ marginBottom: '40px', padding: '20px', border: '2px solid #61dafb', borderRadius: '8px', color: 'var(--text-primary)' }}>
      <h2>Q1: What are Hooks and why were they introduced?</h2>
      
      <div style={{ background: '#1e1e1e', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
        <h3>Answer:</h3>
        <p><strong>Hooks</strong> are functions that let you use state and lifecycle features in functional components (introduced in React 16.8).</p>
        
        <h4>Problems Hooks Solve:</h4>
        <ol>
          <li><strong>Reusing stateful logic</strong> - Before: HOCs and render props were complex</li>
          <li><strong>Complex components</strong> - Before: Lifecycle methods scattered related logic</li>
          <li><strong>'this' confusion</strong> - Before: Class components required understanding 'this'</li>
          <li><strong>Component size</strong> - Before: Class components had more boilerplate</li>
        </ol>

        <h4>Built-in Hooks:</h4>
        <ul>
          <li><code>useState</code> - Add state to functional components</li>
          <li><code>useEffect</code> - Perform side effects</li>
          <li><code>useContext</code> - Access context values</li>
          <li><code>useReducer</code> - Complex state logic</li>
          <li><code>useCallback</code> - Memoize callbacks</li>
          <li><code>useMemo</code> - Memoize expensive calculations</li>
          <li><code>useRef</code> - Reference mutable values/DOM elements</li>
          <li><code>useLayoutEffect</code>, <code>useImperativeHandle</code>, etc.</li>
        </ul>
      </div>

      <h3>Simple Example:</h3>
      <div style={{ background: 'rgba(76, 175, 80, 0.15)', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginTop: '15px', border: '1px solid rgba(76, 175, 80, 0.4)' }}>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)} style={{ padding: '8px 16px', cursor: 'pointer' }}>
          Increment
        </button>
      </div>

      <pre style={{ background: '#282c34', color: '#61dafb', padding: '15px', borderRadius: '5px', overflow: 'auto', marginTop: '15px' }}>
{`// Before Hooks (Class Component)
class Counter extends React.Component {
  constructor(props) {
    super(props)
    this.state = { count: 0 }
    this.handleClick = this.handleClick.bind(this)  // 😰 binding
  }
  
  handleClick() {
    this.setState({ count: this.state.count + 1 })
  }
  
  render() {
    return <button onClick={this.handleClick}>{this.state.count}</button>
  }
}

// With Hooks (Functional Component)
function Counter() {
  const [count, setCount] = useState(0)  // 😊 simple!
  
  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  )
}`}
      </pre>

      <div style={{ marginTop: '15px', padding: '10px', background: '#3a3510', color: '#f0e68c', borderRadius: '5px' }}>
        <strong>Interview Tip:</strong> Emphasize that Hooks don't replace class components but provide a more direct API to React concepts. They're backward compatible - you can gradually adopt them.
      </div>
    </div>
  )
}

// ============================================================================
// Q2: How does useState work? Common pitfalls?
// ============================================================================
function Section2_UseStateDeepDive() {
  const [count, setCount] = useState(0)
  const [user, setUser] = useState({ name: 'John', age: 25 })

  // Common mistake: Not using functional update
  const incrementWrong = () => {
    setCount(count + 1)  // ⚠️ Uses stale value if called multiple times
    setCount(count + 1)  // This won't increment by 2!
  }

  const incrementRight = () => {
    setCount(prev => prev + 1)  // ✅ Uses latest value
    setCount(prev => prev + 1)  // This WILL increment by 2!
  }

  // Common mistake: Mutating object state
  const updateUserWrong = () => {
    user.age = 26  // ❌ Direct mutation doesn't trigger re-render
    setUser(user)  // React sees same reference, won't update
  }

  const updateUserRight = () => {
    setUser({ ...user, age: 26 })  // ✅ Create new object
  }

  return (
    <div style={{ marginBottom: '40px', padding: '20px', border: '2px solid #61dafb', borderRadius: '8px', color: 'var(--text-primary)' }}>
      <h2>Q2: How does useState work? What are common pitfalls?</h2>
      
      <div style={{ background: '#1e1e1e', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
        <h3>Answer:</h3>
        <p><code>useState</code> is a Hook that lets you add state to functional components.</p>
        
        <h4>How it works:</h4>
        <ul>
          <li>Returns array: <code>[currentState, updaterFunction]</code></li>
          <li>Initial state only used on first render</li>
          <li>State updates are <strong>asynchronous</strong></li>
          <li>Multiple updates are <strong>batched</strong> for performance</li>
          <li>React uses <strong>Object.is()</strong> to compare old and new state</li>
        </ul>

        <h4>Common Pitfalls:</h4>
        <ol>
          <li><strong>Stale closures:</strong> Using state value directly instead of functional update</li>
          <li><strong>Object mutation:</strong> Mutating objects instead of creating new ones</li>
          <li><strong>Expensive initialization:</strong> Not using lazy initialization for expensive operations</li>
          <li><strong>Reference equality:</strong> Updating with same reference doesn't trigger re-render</li>
        </ol>
      </div>

      <h3>Live Examples:</h3>
      
      {/* Example 1: Functional updates */}
      <div style={{ background: 'rgba(244, 67, 54, 0.15)', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px', border: '1px solid rgba(244, 67, 54, 0.4)' }}>
        <h4>❌ Pitfall 1: Not Using Functional Update</h4>
        <p>Count: {count}</p>
        <button onClick={incrementWrong} style={{ padding: '8px 16px', cursor: 'pointer', marginRight: '10px' }}>
          Increment Twice (Wrong) - Only adds 1!
        </button>
        <button onClick={incrementRight} style={{ padding: '8px 16px', cursor: 'pointer' }}>
          Increment Twice (Right) - Adds 2!
        </button>
        <button onClick={() => setCount(0)} style={{ padding: '8px 16px', cursor: 'pointer', marginLeft: '10px' }}>
          Reset
        </button>
      </div>

      {/* Example 2: Object updates */}
      <div style={{ background: 'rgba(76, 175, 80, 0.15)', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px', border: '1px solid rgba(76, 175, 80, 0.4)' }}>
        <h4>✅ Correct: Immutable Updates</h4>
        <p>User: {user.name}, Age: {user.age}</p>
        <button onClick={updateUserRight} style={{ padding: '8px 16px', cursor: 'pointer' }}>
          Increase Age (Correct)
        </button>
      </div>

      <pre style={{ background: '#282c34', color: '#61dafb', padding: '15px', borderRadius: '5px', overflow: 'auto' }}>
{`// ❌ WRONG: Stale closure problem
const [count, setCount] = useState(0)

const increment = () => {
  setCount(count + 1)  // Uses current count
  setCount(count + 1)  // Still uses SAME count (stale)
  // Result: count only increments by 1
}

// ✅ RIGHT: Functional update
const increment = () => {
  setCount(prev => prev + 1)  // Uses latest value
  setCount(prev => prev + 1)  // Uses updated value
  // Result: count increments by 2
}

// ❌ WRONG: Mutating object
const [user, setUser] = useState({ name: 'John', age: 25 })
user.age = 26  // Mutation!
setUser(user)  // Same reference, no re-render

// ✅ RIGHT: Create new object
setUser({ ...user, age: 26 })  // New object, triggers re-render

// ✅ BEST: For nested objects
setUser(prev => ({ ...prev, age: 26 }))

// Lazy initialization (for expensive initial state)
const [state, setState] = useState(() => {
  const initialState = expensiveComputation()
  return initialState
})`}
      </pre>

      <div style={{ marginTop: '15px', padding: '10px', background: '#3a3510', color: '#f0e68c', borderRadius: '5px' }}>
        <strong>Interview Tip:</strong> Explain that state updates are batched in React 18 automatically (even in async functions). Mention the functional update form is crucial when new state depends on previous state.
      </div>
    </div>
  )
}

// ============================================================================
// Q3: Explain useEffect and its cleanup
// ============================================================================
function Section3_UseEffectDeepDive() {
  const [count, setCount] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  // Effect runs on every render
  useEffect(() => {
    console.log('Component rendered!')
  })

  // Effect runs only on mount
  useEffect(() => {
    console.log('Component mounted!')
    return () => console.log('Component unmounted!')
  }, [])

  // Effect runs when count changes
  useEffect(() => {
    console.log(`Count changed to: ${count}`)
  }, [count])

  // Effect with cleanup (simulating subscription)
  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setCount(c => c + 1)
      }, 1000)

      // Cleanup function
      return () => {
        clearInterval(interval)
        console.log('Interval cleared!')
      }
    }
  }, [isRunning])

  return (
    <div style={{ marginBottom: '40px', padding: '20px', border: '2px solid #61dafb', borderRadius: '8px', color: 'var(--text-primary)' }}>
      <h2>Q3: Explain useEffect and its cleanup function</h2>
      
      <div style={{ background: '#1e1e1e', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
        <h3>Answer:</h3>
        <p><code>useEffect</code> lets you perform side effects in functional components. It replaces <code>componentDidMount</code>, <code>componentDidUpdate</code>, and <code>componentWillUnmount</code>.</p>
        
        <h4>Syntax:</h4>
        <pre style={{ background: '#e0e0e0', color: '#1a1a1a', padding: '10px', borderRadius: '5px' }}>
{`useEffect(() => {
  // Effect code
  return () => {
    // Cleanup code (optional)
  }
}, [dependencies])`}
        </pre>

        <h4>Dependency Array:</h4>
        <ul>
          <li><strong>No array:</strong> Runs after every render</li>
          <li><strong>Empty array []:</strong> Runs only on mount and unmount</li>
          <li><strong>With values [a, b]:</strong> Runs when a or b changes</li>
        </ul>

        <h4>Cleanup Function:</h4>
        <ul>
          <li>Runs before effect re-runs (if dependencies changed)</li>
          <li>Runs on component unmount</li>
          <li>Used for: canceling subscriptions, clearing timers, removing event listeners</li>
        </ul>

        <h4>Common Use Cases:</h4>
        <ul>
          <li>Data fetching</li>
          <li>Setting up subscriptions</li>
          <li>Manual DOM manipulation</li>
          <li>Event listeners</li>
        </ul>
      </div>

      <h3>Live Example: Timer with Cleanup</h3>
      <div style={{ background: 'rgba(33, 150, 243, 0.15)', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginTop: '15px', border: '1px solid rgba(33, 150, 243, 0.4)' }}>
        <p><strong>Count:</strong> {count}</p>
        <p><strong>Status:</strong> {isRunning ? '▶️ Running' : '⏸️ Stopped'}</p>
        
        <button 
          onClick={() => setIsRunning(!isRunning)}
          style={{ padding: '10px 20px', cursor: 'pointer', marginRight: '10px' }}
        >
          {isRunning ? 'Stop' : 'Start'} Timer
        </button>
        
        <button 
          onClick={() => setCount(0)}
          style={{ padding: '10px 20px', cursor: 'pointer' }}
        >
          Reset
        </button>

        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '10px' }}>
          Open console to see effect logs. When you stop the timer, the cleanup function clears the interval.
        </p>
      </div>

      <pre style={{ background: '#282c34', color: '#61dafb', padding: '15px', borderRadius: '5px', overflow: 'auto', marginTop: '15px' }}>
{`// Pattern 1: Run on every render
useEffect(() => {
  console.log('Runs after every render')
})

// Pattern 2: Run only on mount
useEffect(() => {
  console.log('Runs only once on mount')
  
  return () => {
    console.log('Cleanup on unmount')
  }
}, [])  // Empty dependency array

// Pattern 3: Run when specific values change
useEffect(() => {
  console.log('Runs when userId changes')
  
  // Fetch user data
  fetchUser(userId)
}, [userId])  // Re-run when userId changes

// Pattern 4: Async in useEffect
useEffect(() => {
  // Can't make useEffect callback async directly
  // Create async function inside
  const fetchData = async () => {
    const result = await fetch('/api/data')
    const data = await result.json()
    setData(data)
  }
  
  fetchData()
}, [])

// Pattern 5: Cleanup subscriptions
useEffect(() => {
  const subscription = someAPI.subscribe(data => {
    setData(data)
  })
  
  // Cleanup runs before re-running effect and on unmount
  return () => {
    subscription.unsubscribe()
  }
}, [someValue])

// ⚠️ Common Mistake: Missing dependencies
useEffect(() => {
  console.log(count)  // Using count but not in dependencies
}, [])  // ❌ Missing count in dependencies

// ✅ Fix: Include all dependencies
useEffect(() => {
  console.log(count)
}, [count])  // ✅ count is in dependencies`}
      </pre>

      <div style={{ marginTop: '15px', padding: '10px', background: '#3a3510', color: '#f0e68c', borderRadius: '5px' }}>
        <strong>Interview Tip:</strong> Mention the importance of cleanup to prevent memory leaks. Explain that useEffect runs after render (asynchronously), while useLayoutEffect runs synchronously after DOM mutations.
      </div>
    </div>
  )
}

// ============================================================================
// Q4: useRef vs useState - When to use each?
// ============================================================================
function Section4_UseRefVsState() {
  const [stateCount, setStateCount] = useState(0)
  const refCount = useRef(0)
  const [renderCount, setRenderCount] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const incrementState = () => {
    setStateCount(stateCount + 1)  // Triggers re-render
  }

  const incrementRef = () => {
    refCount.current += 1  // Does NOT trigger re-render
    console.log('Ref count:', refCount.current)
  }

  const focusInput = () => {
    inputRef.current?.focus()
  }

  // This effect tracks renders
  useEffect(() => {
    setRenderCount(prev => prev + 1)
  })

  return (
    <div style={{ marginBottom: '40px', padding: '20px', border: '2px solid #61dafb', borderRadius: '8px', color: 'var(--text-primary)' }}>
      <h2>Q4: useRef vs useState - When to use each?</h2>
      
      <div style={{ background: '#1e1e1e', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
        <h3>Answer:</h3>
        
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr style={{ background: '#61dafb' }}>
              <th style={{ padding: '10px', border: '1px solid #444' }}>useState</th>
              <th style={{ padding: '10px', border: '1px solid #444' }}>useRef</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #444' }}>Triggers re-render on change</td>
              <td style={{ padding: '10px', border: '1px solid #444' }}>Does NOT trigger re-render</td>
            </tr>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #444' }}>Use for UI data</td>
              <td style={{ padding: '10px', border: '1px solid #444' }}>Use for mutable values</td>
            </tr>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #444' }}>Async updates</td>
              <td style={{ padding: '10px', border: '1px solid #444' }}>Synchronous updates</td>
            </tr>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #444' }}>Immutable pattern</td>
              <td style={{ padding: '10px', border: '1px solid #444' }}>Mutable (.current)</td>
            </tr>
          </tbody>
        </table>

        <h4 style={{ marginTop: '15px' }}>Use useRef for:</h4>
        <ul>
          <li><strong>DOM references</strong> - Access DOM elements directly</li>
          <li><strong>Mutable values</strong> - Store values that don't need re-render</li>
          <li><strong>Previous values</strong> - Remember previous state/props</li>
          <li><strong>Instance variables</strong> - Like class instance variables</li>
          <li><strong>Timers/intervals</strong> - Store timer IDs</li>
        </ul>
      </div>

      <h3>Live Comparison:</h3>
      <div style={{ background: 'rgba(76, 175, 80, 0.15)', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px', border: '1px solid rgba(76, 175, 80, 0.4)' }}>
        <p><strong>Component rendered {renderCount} times</strong></p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
        {/* useState example */}
        <div style={{ background: 'rgba(33, 150, 243, 0.15)', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', border: '1px solid rgba(33, 150, 243, 0.4)' }}>
          <h4>useState (Triggers Re-render)</h4>
          <p>State Count: {stateCount}</p>
          <button onClick={incrementState} style={{ padding: '8px 16px', cursor: 'pointer' }}>
            Increment State
          </button>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '10px' }}>
            Click triggers re-render, watch render count above
          </p>
        </div>

        {/* useRef example */}
        <div style={{ background: 'rgba(156, 39, 176, 0.15)', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', border: '1px solid rgba(156, 39, 176, 0.4)' }}>
          <h4>useRef (NO Re-render)</h4>
          <p>Ref Count: {refCount.current}</p>
          <button onClick={incrementRef} style={{ padding: '8px 16px', cursor: 'pointer' }}>
            Increment Ref
          </button>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '10px' }}>
            Check console - no re-render, but value updated
          </p>
        </div>
      </div>

      {/* DOM reference example */}
      <div style={{ background: 'rgba(255, 152, 0, 0.15)', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginTop: '15px', border: '1px solid rgba(255, 152, 0, 0.4)' }}>
        <h4>useRef for DOM Access:</h4>
        <input 
          ref={inputRef}
          type="text" 
          placeholder="Click button to focus me"
          style={{ padding: '8px', width: '300px', marginRight: '10px' }}
        />
        <button onClick={focusInput} style={{ padding: '8px 16px', cursor: 'pointer' }}>
          Focus Input
        </button>
      </div>

      <pre style={{ background: '#282c34', color: '#61dafb', padding: '15px', borderRadius: '5px', overflow: 'auto', marginTop: '15px' }}>
{`// Use useState when you need re-render
const [count, setCount] = useState(0)
setCount(count + 1)  // Triggers re-render

// Use useRef when you DON'T need re-render
const countRef = useRef(0)
countRef.current += 1  // No re-render

// Common useRef patterns:

// 1. DOM reference
const inputRef = useRef<HTMLInputElement>(null)
inputRef.current?.focus()

// 2. Store previous value
const prevValueRef = useRef<number>()
useEffect(() => {
  prevValueRef.current = value
}, [value])

// 3. Store timer ID
const timerRef = useRef<NodeJS.Timeout>()
timerRef.current = setInterval(() => {...}, 1000)
clearInterval(timerRef.current)

// 4. Instance variable (like class property)
const instanceVar = useRef({ count: 0, name: 'test' })
instanceVar.current.count++  // Mutable!

// ⚠️ Common Mistake: Using useRef for state
const count = useRef(0)
count.current++
// UI won't update! Use useState instead.`}
      </pre>

      <div style={{ marginTop: '15px', padding: '10px', background: '#3a3510', color: '#f0e68c', borderRadius: '5px' }}>
        <strong>Interview Tip:</strong> Emphasize that useRef is like a "box" that holds a mutable value in its .current property. The value persists across renders but changes don't trigger re-renders.
      </div>
    </div>
  )
}

// ============================================================================
// Q5: useCallback vs useMemo - What's the difference?
// ============================================================================
function Section5_UseCallbackVsMemo() {
  const [count, setCount] = useState(0)
  const [input, setInput] = useState('')

  // Without memoization
  const expensiveCalculation = () => {
    console.log('Calculating...')
    let result = 0
    for (let i = 0; i < 1000000; i++) {
      result += count
    }
    return result
  }

  // With useMemo - memoizes the VALUE
  const memoizedValue = useMemo(() => {
    console.log('useMemo: Calculating...')
    let result = 0
    for (let i = 0; i < 1000000; i++) {
      result += count
    }
    return result
  }, [count])

  // With useCallback - memoizes the FUNCTION
  const memoizedCallback = useCallback(() => {
    console.log('useCallback: Function called')
    return count * 2
  }, [count])

  return (
    <div style={{ marginBottom: '40px', padding: '20px', border: '2px solid #61dafb', borderRadius: '8px', color: 'var(--text-primary)' }}>
      <h2>Q5: useCallback vs useMemo - What's the difference?</h2>
      
      <div style={{ background: '#1e1e1e', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
        <h3>Answer:</h3>
        <p>Both optimize performance by memoizing values, but they serve different purposes:</p>
        
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr style={{ background: '#61dafb' }}>
              <th style={{ padding: '10px', border: '1px solid #444' }}>useCallback</th>
              <th style={{ padding: '10px', border: '1px solid #444' }}>useMemo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #444' }}>Returns memoized FUNCTION</td>
              <td style={{ padding: '10px', border: '1px solid #444' }}>Returns memoized VALUE</td>
            </tr>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #444' }}>Prevents function recreation</td>
              <td style={{ padding: '10px', border: '1px solid #444' }}>Prevents expensive calculations</td>
            </tr>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #444' }}>Use for callbacks to child components</td>
              <td style={{ padding: '10px', border: '1px solid #444' }}>Use for expensive computations</td>
            </tr>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #444' }}><code>useCallback(fn, deps)</code></td>
              <td style={{ padding: '10px', border: '1px solid #444' }}><code>useMemo(() =&gt; fn(), deps)</code></td>
            </tr>
          </tbody>
        </table>

        <h4 style={{ marginTop: '15px' }}>Relationship:</h4>
        <pre style={{ background: '#e0e0e0', color: '#1a1a1a', padding: '10px', borderRadius: '5px' }}>
{`useCallback(fn, deps) === useMemo(() => fn, deps)`}
        </pre>
      </div>

      <h3>Live Example:</h3>
      <div style={{ background: 'rgba(76, 175, 80, 0.15)', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px', border: '1px solid rgba(76, 175, 80, 0.4)' }}>
        <p><strong>Count:</strong> {count}</p>
        <button onClick={() => setCount(count + 1)} style={{ padding: '8px 16px', cursor: 'pointer', marginRight: '10px' }}>
          Increment Count
        </button>
        
        <p style={{ marginTop: '15px' }}><strong>Type to see difference:</strong></p>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Typing here shouldn't recalculate..."
          style={{ padding: '8px', width: '100%' }}
        />
        
        <p style={{ marginTop: '15px' }}>
          <strong>Memoized Result:</strong> {memoizedValue}
        </p>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
          Open console: Typing in input doesn't recalculate. Only incrementing count does.
        </p>
      </div>

      <pre style={{ background: '#282c34', color: '#61dafb', padding: '15px', borderRadius: '5px', overflow: 'auto' }}>
{`// useMemo - Memoize expensive CALCULATION
const expensiveValue = useMemo(() => {
  // This only runs when dependencies change
  return items.reduce((sum, item) => sum + item.value, 0)
}, [items])  // Recalculate only when items changes

// useCallback - Memoize FUNCTION REFERENCE
const handleClick = useCallback(() => {
  // This function is only recreated when dependencies change
  doSomething(id)
}, [id])  // Recreate only when id changes

// Why useCallback matters with React.memo:
const Child = React.memo(({ onClick }) => {
  console.log('Child rendered')
  return <button onClick={onClick}>Click</button>
})

// ❌ Without useCallback - Child re-renders every time
function Parent() {
  const [count, setCount] = useState(0)
  
  const handleClick = () => console.log('clicked')  // New function every render
  
  return <Child onClick={handleClick} />  // Child thinks prop changed
}

// ✅ With useCallback - Child doesn't re-render unnecessarily
function Parent() {
  const [count, setCount] = useState(0)
  
  const handleClick = useCallback(() => {
    console.log('clicked')
  }, [])  // Same function reference across renders
  
  return <Child onClick={handleClick} />  // Child knows prop didn't change
}

// When to use:
// useCallback: Passing callbacks to optimized child components
// useMemo: Expensive calculations, object/array creation in dependencies
// Neither: Most of the time! Premature optimization is the root of evil.`}
      </pre>

      <div style={{ marginTop: '15px', padding: '10px', background: '#3a3510', color: '#f0e68c', borderRadius: '5px' }}>
        <strong>Interview Tip:</strong> Mention that these hooks have overhead - don't overuse them. Only use when you have performance problems or when passing callbacks to memoized components.
      </div>
    </div>
  )
}

// ============================================================================
// Q6: When to use useReducer vs useState?
// ============================================================================
function Section6_UseReducerExample() {
  type State = {
    count: number
    step: number
  }

  type Action = 
    | { type: 'increment' }
    | { type: 'decrement' }
    | { type: 'reset' }
    | { type: 'setStep'; payload: number }

  const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case 'increment':
        return { ...state, count: state.count + state.step }
      case 'decrement':
        return { ...state, count: state.count - state.step }
      case 'reset':
        return { ...state, count: 0 }
      case 'setStep':
        return { ...state, step: action.payload }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, { count: 0, step: 1 })

  return (
    <div style={{ marginBottom: '40px', padding: '20px', border: '2px solid #61dafb', borderRadius: '8px' }}>
      <h2>Q6: When to use useReducer vs useState?</h2>
      
      <div style={{ background: '#1e1e1e', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
        <h3>Answer:</h3>
        <p><code>useReducer</code> is an alternative to useState for managing complex state logic.</p>
        
        <h4>Use useState when:</h4>
        <ul>
          <li>State is simple (single value, boolean, string)</li>
          <li>No complex update logic</li>
          <li>State updates are independent</li>
        </ul>

        <h4>Use useReducer when:</h4>
        <ul>
          <li>Complex state logic (multiple sub-values)</li>
          <li>Next state depends on previous state</li>
          <li>Multiple actions affect the same state</li>
          <li>Want to separate concerns (actions vs state)</li>
          <li>Testing state logic in isolation</li>
        </ul>
      </div>

      <h3>Live Example:</h3>
      <div style={{ background: 'rgba(33, 150, 243, 0.15)', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginTop: '15px', border: '1px solid rgba(33, 150, 243, 0.4)' }}>
        <p><strong>Count:</strong> {state.count}</p>
        <p><strong>Step:</strong> {state.step}</p>
        
        <div style={{ marginTop: '15px' }}>
          <button 
            onClick={() => dispatch({ type: 'increment' })}
            style={{ padding: '8px 16px', cursor: 'pointer', marginRight: '10px' }}
          >
            + {state.step}
          </button>
          <button 
            onClick={() => dispatch({ type: 'decrement' })}
            style={{ padding: '8px 16px', cursor: 'pointer', marginRight: '10px' }}
          >
            - {state.step}
          </button>
          <button 
            onClick={() => dispatch({ type: 'reset' })}
            style={{ padding: '8px 16px', cursor: 'pointer' }}
          >
            Reset
          </button>
        </div>

        <div style={{ marginTop: '15px' }}>
          <label>Step Size: </label>
          <input
            type="number"
            value={state.step}
            onChange={(e) => dispatch({ type: 'setStep', payload: parseInt(e.target.value) || 1 })}
            style={{ padding: '8px', width: '100px', marginLeft: '10px' }}
          />
        </div>
      </div>

      <pre style={{ background: '#282c34', color: '#61dafb', padding: '15px', borderRadius: '5px', overflow: 'auto', marginTop: '15px' }}>
{`// Simple state - use useState
const [count, setCount] = useState(0)
const [name, setName] = useState('')

// Complex state - use useReducer
type State = {
  count: number
  step: number
  history: number[]
}

type Action = 
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'setStep'; payload: number }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'increment':
      return {
        ...state,
        count: state.count + state.step,
        history: [...state.history, state.count + state.step]
      }
    case 'decrement':
      return {
        ...state,
        count: state.count - state.step,
        history: [...state.history, state.count - state.step]
      }
    case 'setStep':
      return { ...state, step: action.payload }
    default:
      return state
  }
}

const [state, dispatch] = useReducer(reducer, {
  count: 0,
  step: 1,
  history: []
})

// Dispatch actions
dispatch({ type: 'increment' })
dispatch({ type: 'setStep', payload: 5 })

// Benefits:
// 1. All state logic in one place (reducer)
// 2. Easy to test reducer in isolation
// 3. Predictable state updates
// 4. TypeScript discriminated unions for type safety`}
      </pre>

      <div style={{ marginTop: '15px', padding: '10px', background: '#3a3510', color: '#f0e68c', borderRadius: '5px' }}>
        <strong>Interview Tip:</strong> Mention that useReducer is Redux-like but local to a component. It's great for forms, modals, or any component with multiple state fields that interact.
      </div>
    </div>
  )
}

// ============================================================================
// Q7: What are the Rules of Hooks?
// ============================================================================
function Section7_RulesOfHooks() {
  return (
    <div style={{ marginBottom: '40px', padding: '20px', border: '2px solid #61dafb', borderRadius: '8px', color: 'var(--text-primary)' }}>
      <h2>Q7: What are the Rules of Hooks?</h2>
      
      <div style={{ background: '#1e1e1e', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
        <h3>Answer:</h3>
        <p>Hooks have two critical rules that must be followed:</p>
        
        <h4>Rule 1: Only Call Hooks at the Top Level</h4>
        <ul>
          <li>❌ Don't call hooks inside loops, conditions, or nested functions</li>
          <li>✅ Call hooks at the top level of your component</li>
          <li><strong>Why?</strong> React relies on the order of hook calls to track state</li>
        </ul>

        <h4>Rule 2: Only Call Hooks from React Functions</h4>
        <ul>
          <li>✅ Call hooks from React functional components</li>
          <li>✅ Call hooks from custom hooks</li>
          <li>❌ Don't call hooks from regular JavaScript functions</li>
          <li>❌ Don't call hooks from class components</li>
        </ul>

        <h4>Rule 3: Custom Hooks Must Start with "use"</h4>
        <ul>
          <li>This is a convention, not enforced by JavaScript</li>
          <li>Allows linters to find bugs</li>
          <li>Makes it clear that hooks rules apply</li>
        </ul>
      </div>

      <h3>Examples:</h3>
      <pre style={{ background: '#282c34', color: '#61dafb', padding: '15px', borderRadius: '5px', overflow: 'auto' }}>
{`// ❌ WRONG: Hook inside condition
function Component() {
  if (condition) {
    const [state, setState] = useState(0)  // ❌ Conditional hook!
  }
}
// Problem: Hook might not be called, order changes

// ✅ RIGHT: Condition inside hook
function Component() {
  const [state, setState] = useState(0)  // ✅ Always called
  
  if (condition) {
    setState(newValue)  // ✅ Conditional update is fine
  }
}

// ❌ WRONG: Hook inside loop
function Component() {
  for (let i = 0; i < 5; i++) {
    const [value, setValue] = useState(i)  // ❌ Loop hook!
  }
}

// ✅ RIGHT: Use array/object state
function Component() {
  const [values, setValues] = useState([0, 1, 2, 3, 4])  // ✅
}

// ❌ WRONG: Hook inside callback
function Component() {
  const handleClick = () => {
    const [state, setState] = useState(0)  // ❌ Nested hook!
  }
}

// ✅ RIGHT: Hook at top level
function Component() {
  const [state, setState] = useState(0)  // ✅
  
  const handleClick = () => {
    setState(state + 1)  // ✅ Use state in callback
  }
}

// ❌ WRONG: Hook in regular function
function regularFunction() {
  const [state, setState] = useState(0)  // ❌ Not a component!
}

// ✅ RIGHT: Custom hook (starts with "use")
function useCustomHook() {
  const [state, setState] = useState(0)  // ✅ Custom hook
  return [state, setState]
}

// ✅ RIGHT: Use in component
function Component() {
  const [state, setState] = useCustomHook()  // ✅
}

// Why these rules exist:
// React uses the ORDER of hook calls to track which state 
// corresponds to which useState/useEffect call. If the order
// changes between renders, React can't track state correctly.

// Example of what React does internally (simplified):
let state = []
let index = 0

function useState(initialValue) {
  const currentIndex = index
  state[currentIndex] = state[currentIndex] ?? initialValue
  
  const setState = (newValue) => {
    state[currentIndex] = newValue
    reRender()
  }
  
  index++
  return [state[currentIndex], setState]
}

// If hooks are conditional, index gets out of sync!`}
      </pre>

      <div style={{ marginTop: '15px', padding: '10px', background: '#3a3510', color: '#f0e68c', borderRadius: '5px' }}>
        <strong>Interview Tip:</strong> Explain that React uses the call order to link hook calls to their state. The ESLint plugin "eslint-plugin-react-hooks" helps enforce these rules automatically.
      </div>
    </div>
  )
}
