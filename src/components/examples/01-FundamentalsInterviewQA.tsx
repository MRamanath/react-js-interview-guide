import React, { useState } from 'react'

/**
 * TOP INTERVIEW QUESTIONS: REACT FUNDAMENTALS
 * 
 * This file contains the most commonly asked interview questions
 * about React fundamentals with working code examples.
 */

export default function FundamentalsInterviewQA() {
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', color: 'var(--text-primary)' }}>
      <h1>🎯 React Fundamentals - Top Interview Questions</h1>
      
      <Section1_WhatIsJSX />
      <Section2_PropsVsState />
      <Section3_VirtualDOM />
      <Section4_KeysInLists />
      <Section5_ControlledComponents />
      <Section6_EventHandling />
    </div>
  )
}

// ============================================================================
// Q1: What is JSX? How does it work?
// ============================================================================
function Section1_WhatIsJSX() {
  const [showCompiled, setShowCompiled] = useState(false)
  
  return (
    <div style={{ marginBottom: '40px', padding: '20px', border: '2px solid #61dafb', borderRadius: '8px', color: 'var(--text-primary)' }}>
      <h2>Q1: What is JSX and how does it work?</h2>
      
      <div style={{ background: '#1e1e1e', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
        <h3>Answer:</h3>
        <p><strong>JSX (JavaScript XML)</strong> is a syntax extension for JavaScript that allows you to write HTML-like code in JavaScript. It gets compiled to React.createElement() calls.</p>
        
        <h4>Key Points:</h4>
        <ul>
          <li>JSX is syntactic sugar for React.createElement()</li>
          <li>It's compiled by Babel during build time</li>
          <li>Makes code more readable and maintainable</li>
          <li>Can embed JavaScript expressions using {`{}`}</li>
          <li>Must return a single root element (or Fragment)</li>
        </ul>
      </div>

      <button 
        onClick={() => setShowCompiled(!showCompiled)}
        style={{ padding: '10px 20px', marginBottom: '15px', cursor: 'pointer' }}
      >
        {showCompiled ? 'Show JSX' : 'Show Compiled Code'}
      </button>

      {!showCompiled ? (
        <pre style={{ background: '#282c34', color: '#61dafb', padding: '15px', borderRadius: '5px', overflow: 'auto' }}>
{`// JSX Syntax
const element = <h1 className="greeting">Hello, World!</h1>

// JSX with expressions
const name = "React"
const element2 = <h1>Hello, {name}!</h1>

// JSX with children
const element3 = (
  <div>
    <h1>Title</h1>
    <p>Paragraph</p>
  </div>
)`}
        </pre>
      ) : (
        <pre style={{ background: '#282c34', color: '#61dafb', padding: '15px', borderRadius: '5px', overflow: 'auto' }}>
{`// Compiled to React.createElement()
const element = React.createElement(
  'h1',
  { className: 'greeting' },
  'Hello, World!'
)

const name = "React"
const element2 = React.createElement('h1', null, 'Hello, ', name, '!')

const element3 = React.createElement(
  'div',
  null,
  React.createElement('h1', null, 'Title'),
  React.createElement('p', null, 'Paragraph')
)`}
        </pre>
      )}

      <div style={{ marginTop: '15px', padding: '10px', background: '#3a3510', color: '#f0e68c', borderRadius: '5px' }}>
        <strong>Interview Tip:</strong> Mention that JSX is optional but highly recommended. You can write React without JSX using createElement(), but it's much more verbose.
      </div>
    </div>
  )
}

// ============================================================================
// Q2: Props vs State - What's the difference?
// ============================================================================
function Section2_PropsVsState() {
  // This is STATE - internal to this component
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState('Hello')

  return (
    <div style={{ marginBottom: '40px', padding: '20px', border: '2px solid #61dafb', borderRadius: '8px', color: 'var(--text-primary)' }}>
      <h2>Q2: What's the difference between Props and State?</h2>
      
      <div style={{ background: '#1e1e1e', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
        <h3>Answer:</h3>
        
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr style={{ background: '#61dafb' }}>
              <th style={{ padding: '10px', border: '1px solid #444' }}>Props</th>
              <th style={{ padding: '10px', border: '1px solid #444' }}>State</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #444' }}>Passed from parent component</td>
              <td style={{ padding: '10px', border: '1px solid #444' }}>Managed within the component</td>
            </tr>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #444' }}>Read-only (immutable)</td>
              <td style={{ padding: '10px', border: '1px solid #444' }}>Can be updated (mutable)</td>
            </tr>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #444' }}>For component communication</td>
              <td style={{ padding: '10px', border: '1px solid #444' }}>For component's internal data</td>
            </tr>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #444' }}>Cannot be modified by child</td>
              <td style={{ padding: '10px', border: '1px solid #444' }}>Changed via setState/useState</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Live Example:</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
        {/* Parent Component showing STATE */}
        <div style={{ background: 'rgba(33, 150, 243, 0.15)', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', border: '1px solid rgba(33, 150, 243, 0.4)' }}>
          <h4>Parent Component (has STATE)</h4>
          <p>Count: {count} (this is state)</p>
          <button onClick={() => setCount(count + 1)} style={{ padding: '8px 16px', marginRight: '10px', cursor: 'pointer' }}>
            Increment
          </button>
          <button onClick={() => setCount(count - 1)} style={{ padding: '8px 16px', cursor: 'pointer' }}>
            Decrement
          </button>
          
          <div style={{ marginTop: '15px' }}>
            <input 
              type="text" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ padding: '8px', width: '100%' }}
            />
          </div>
        </div>

        {/* Child Component receiving PROPS */}
        <div style={{ background: 'rgba(156, 39, 176, 0.15)', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', border: '1px solid rgba(156, 39, 176, 0.4)' }}>
          <h4>Child Component (receives PROPS)</h4>
          <ChildComponentDemo count={count} message={message} />
        </div>
      </div>

      <pre style={{ background: '#282c34', color: '#61dafb', padding: '15px', borderRadius: '5px', overflow: 'auto', marginTop: '15px' }}>
{`// Parent manages STATE
const [count, setCount] = useState(0)
const [message, setMessage] = useState('Hello')

// Child receives PROPS (read-only)
<ChildComponent count={count} message={message} />

// Child cannot modify props directly
function ChildComponent({ count, message }) {
  // count = 10  ❌ This won't work!
  // You must pass a callback to modify parent's state
  return <div>Count: {count}, Message: {message}</div>
}`}
      </pre>

      <div style={{ marginTop: '15px', padding: '10px', background: '#3a3510', color: '#f0e68c', borderRadius: '5px' }}>
        <strong>Interview Tip:</strong> Props flow down (one-way data flow), state is local. To update parent state from child, pass a callback function as a prop.
      </div>
    </div>
  )
}

function ChildComponentDemo({ count, message }: { count: number; message: string }) {
  return (
    <div>
      <p><strong>Props received:</strong></p>
      <p>Count prop: {count}</p>
      <p>Message prop: {message}</p>
      <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '10px' }}>
        ℹ️ Child cannot modify these props directly
      </p>
    </div>
  )
}

// ============================================================================
// Q3: What is Virtual DOM and how does it work?
// ============================================================================
function Section3_VirtualDOM() {
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3'])
  const [updateCount, setUpdateCount] = useState(0)

  const addItem = () => {
    setItems([...items, `Item ${items.length + 1}`])
    setUpdateCount(updateCount + 1)
  }

  return (
    <div style={{ marginBottom: '40px', padding: '20px', border: '2px solid #61dafb', borderRadius: '8px', color: 'var(--text-primary)' }}>
      <h2>Q3: What is Virtual DOM and how does it work?</h2>
      
      <div style={{ background: '#1e1e1e', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
        <h3>Answer:</h3>
        <p>The <strong>Virtual DOM</strong> is a lightweight JavaScript representation of the actual DOM. React uses it to optimize updates and improve performance.</p>
        
        <h4>How it works:</h4>
        <ol>
          <li><strong>Initial Render:</strong> React creates a Virtual DOM tree representing the UI</li>
          <li><strong>State Changes:</strong> When state/props change, React creates a new Virtual DOM tree</li>
          <li><strong>Diffing (Reconciliation):</strong> React compares the new tree with the old tree</li>
          <li><strong>Batch Updates:</strong> React calculates the minimal set of changes needed</li>
          <li><strong>Real DOM Update:</strong> Only the changed elements are updated in the real DOM</li>
        </ol>

        <h4>Why it's faster:</h4>
        <ul>
          <li>Direct DOM manipulation is expensive (causes reflows/repaints)</li>
          <li>Virtual DOM operations are done in memory (much faster)</li>
          <li>Batching updates reduces number of DOM operations</li>
          <li>Only changed nodes are updated, not the entire tree</li>
        </ul>
      </div>

      <h3>Live Example - Watch React optimize updates:</h3>
      <div style={{ background: 'rgba(76, 175, 80, 0.15)', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginTop: '15px', border: '1px solid rgba(76, 175, 80, 0.4)' }}>
        <p><strong>Updates performed:</strong> {updateCount}</p>
        <button onClick={addItem} style={{ padding: '10px 20px', cursor: 'pointer', marginBottom: '15px' }}>
          Add Item (React only updates new item, not all items!)
        </button>
        
        <div>
          {items.map((item, index) => (
            <div 
              key={index} 
              style={{ 
                padding: '8px', 
                margin: '5px 0', 
                background: 'rgba(76, 175, 80, 0.1)', 
                borderRadius: '4px',
                border: '1px solid rgba(76, 175, 80, 0.5)',
                color: 'var(--text-primary)'
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      <pre style={{ background: '#282c34', color: '#61dafb', padding: '15px', borderRadius: '5px', overflow: 'auto', marginTop: '15px' }}>
{`// Without Virtual DOM (traditional approach)
document.getElementById('list').innerHTML = ''  // Remove ALL items
items.forEach(item => {
  const div = document.createElement('div')    // Recreate ALL items
  div.textContent = item
  document.getElementById('list').appendChild(div)
})

// With Virtual DOM (React's approach)
// React automatically:
// 1. Compares new virtual tree with old virtual tree
// 2. Identifies only the NEW item was added
// 3. Appends only the NEW DOM node
// Result: Much faster, especially for large lists!`}
      </pre>

      <div style={{ marginTop: '15px', padding: '10px', background: '#3a3510', color: '#f0e68c', borderRadius: '5px' }}>
        <strong>Interview Tip:</strong> Mention the reconciliation algorithm and how keys help React identify which items changed in lists.
      </div>
    </div>
  )
}

// ============================================================================
// Q4: Why are keys important in lists?
// ============================================================================
function Section4_KeysInLists() {
  const [items, setItems] = useState([
    { id: 1, text: 'Apple' },
    { id: 2, text: 'Banana' },
    { id: 3, text: 'Cherry' }
  ])

  const shuffleItems = () => {
    const shuffled = [...items].sort(() => Math.random() - 0.5)
    setItems(shuffled)
  }

  const addItem = () => {
    const newId = Math.max(...items.map(i => i.id)) + 1
    setItems([...items, { id: newId, text: `Item ${newId}` }])
  }

  return (
    <div style={{ marginBottom: '40px', padding: '20px', border: '2px solid #61dafb', borderRadius: '8px', color: 'var(--text-primary)' }}>
      <h2>Q4: Why are keys important in lists?</h2>
      
      <div style={{ background: '#1e1e1e', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
        <h3>Answer:</h3>
        <p><strong>Keys</strong> help React identify which items have changed, been added, or removed. They give elements a stable identity.</p>
        
        <h4>Why keys matter:</h4>
        <ul>
          <li><strong>Performance:</strong> React can update only changed items instead of re-rendering the entire list</li>
          <li><strong>State Preservation:</strong> Component state is preserved correctly during re-orders</li>
          <li><strong>Animation:</strong> Smooth animations when items are added/removed</li>
          <li><strong>Avoid Bugs:</strong> Prevents issues with controlled components (inputs, checkboxes)</li>
        </ul>

        <h4>Key Selection Rules:</h4>
        <ul>
          <li>✅ <strong>Use stable IDs:</strong> Database IDs, UUIDs</li>
          <li>✅ <strong>Use unique identifiers:</strong> Must be unique among siblings</li>
          <li>⚠️ <strong>Avoid array index:</strong> Only if list never reorders/filters</li>
          <li>❌ <strong>Never use random values:</strong> Breaks React's reconciliation</li>
        </ul>
      </div>

      <h3>Live Example:</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
        {/* Good: Using unique IDs */}
        <div style={{ background: 'rgba(76, 175, 80, 0.15)', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', border: '1px solid rgba(76, 175, 80, 0.4)' }}>
          <h4>✅ Good: Using unique IDs as keys</h4>
          {items.map((item) => (
            <div 
              key={item.id}
              style={{ 
                padding: '8px', 
                margin: '5px 0', 
                background: 'rgba(76, 175, 80, 0.1)', 
                borderRadius: '4px',
                border: '1px solid rgba(76, 175, 80, 0.5)',
                color: 'var(--text-primary)'
              }}
            >
              {item.text} (ID: {item.id})
            </div>
          ))}
          <pre style={{ fontSize: '11px', background: '#1e1e1e', color: 'var(--text-primary)', padding: '8px', marginTop: '10px', borderRadius: '4px' }}>
{`key={item.id}  ✅`}
          </pre>
        </div>

        {/* Bad: Using array index */}
        <div style={{ background: 'rgba(244, 67, 54, 0.15)', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', border: '1px solid rgba(244, 67, 54, 0.4)' }}>
          <h4>❌ Bad: Using array index as keys</h4>
          {items.map((item, index) => (
            <div 
              key={index}
              style={{ 
                padding: '8px', 
                margin: '5px 0', 
                background: 'rgba(244, 67, 54, 0.1)', 
                borderRadius: '4px',
                border: '1px solid rgba(244, 67, 54, 0.5)',
                color: 'var(--text-primary)'
              }}
            >
              {item.text} (Index: {index})
            </div>
          ))}
          <pre style={{ fontSize: '11px', background: '#1e1e1e', color: 'var(--text-primary)', padding: '8px', marginTop: '10px', borderRadius: '4px' }}>
{`key={index}  ❌ Problems when reordering!`}
          </pre>
        </div>
      </div>

      <div style={{ marginTop: '15px' }}>
        <button onClick={shuffleItems} style={{ padding: '10px 20px', cursor: 'pointer', marginRight: '10px' }}>
          Shuffle Items
        </button>
        <button onClick={addItem} style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Add Item
        </button>
      </div>

      <pre style={{ background: '#282c34', color: '#61dafb', padding: '15px', borderRadius: '5px', overflow: 'auto', marginTop: '15px' }}>
{`// ❌ BAD: Using index
items.map((item, index) => <Item key={index} {...item} />)
// Problem: When items reorder, keys change, React thinks they're new items

// ✅ GOOD: Using unique ID
items.map((item) => <Item key={item.id} {...item} />)
// When items reorder, keys stay the same, React knows they moved

// ⚠️ ACCEPTABLE: Only if list never changes
const staticList = ['Red', 'Blue', 'Green']
staticList.map((color, i) => <div key={i}>{color}</div>)`}
      </pre>

      <div style={{ marginTop: '15px', padding: '10px', background: '#3a3510', color: '#f0e68c', borderRadius: '5px' }}>
        <strong>Interview Tip:</strong> Explain the problems with index keys when the list can be reordered, filtered, or have items inserted in the middle.
      </div>
    </div>
  )
}

// ============================================================================
// Q5: Controlled vs Uncontrolled Components
// ============================================================================
function Section5_ControlledComponents() {
  // Controlled component state
  const [controlledValue, setControlledValue] = useState('')
  
  // Uncontrolled component ref
  const uncontrolledRef = React.useRef<HTMLInputElement>(null)
  const [uncontrolledDisplay, setUncontrolledDisplay] = useState('')

  const getUncontrolledValue = () => {
    if (uncontrolledRef.current) {
      setUncontrolledDisplay(uncontrolledRef.current.value)
    }
  }

  return (
    <div style={{ marginBottom: '40px', padding: '20px', border: '2px solid #61dafb', borderRadius: '8px', color: 'var(--text-primary)' }}>
      <h2>Q5: Controlled vs Uncontrolled Components</h2>
      
      <div style={{ background: '#1e1e1e', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
        <h3>Answer:</h3>
        
        <h4>Controlled Components:</h4>
        <ul>
          <li>Form data is handled by React state</li>
          <li>Value is set via props, changes via event handlers</li>
          <li>Single source of truth (React state)</li>
          <li>Can validate and transform input immediately</li>
          <li><strong>Recommended for most cases</strong></li>
        </ul>

        <h4>Uncontrolled Components:</h4>
        <ul>
          <li>Form data is handled by the DOM itself</li>
          <li>Access value using refs</li>
          <li>DOM is the source of truth</li>
          <li>Less code, but less control</li>
          <li>Useful for integrating with non-React code</li>
        </ul>
      </div>

      <h3>Live Comparison:</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
        {/* Controlled */}
        <div style={{ background: 'rgba(33, 150, 243, 0.15)', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', border: '1px solid rgba(33, 150, 243, 0.4)' }}>
          <h4>✅ Controlled Component</h4>
          <input
            type="text"
            value={controlledValue}
            onChange={(e) => setControlledValue(e.target.value)}
            placeholder="Type here (controlled)"
            style={{ padding: '8px', width: '100%', marginBottom: '10px' }}
          />
          <p><strong>React State Value:</strong> {controlledValue}</p>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Value updates on every keystroke
          </p>
        </div>

        {/* Uncontrolled */}
        <div style={{ background: 'rgba(156, 39, 176, 0.15)', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', border: '1px solid rgba(156, 39, 176, 0.4)' }}>
          <h4>⚠️ Uncontrolled Component</h4>
          <input
            type="text"
            ref={uncontrolledRef}
            defaultValue=""
            placeholder="Type here (uncontrolled)"
            style={{ padding: '8px', width: '100%', marginBottom: '10px' }}
          />
          <button onClick={getUncontrolledValue} style={{ padding: '8px 16px', cursor: 'pointer', marginBottom: '10px' }}>
            Get Value
          </button>
          <p><strong>Display Value:</strong> {uncontrolledDisplay}</p>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Must explicitly read value from DOM
          </p>
        </div>
      </div>

      <pre style={{ background: '#282c34', color: '#61dafb', padding: '15px', borderRadius: '5px', overflow: 'auto', marginTop: '15px' }}>
{`// Controlled Component (Recommended)
const [value, setValue] = useState('')

<input 
  value={value}  // ← React controls the value
  onChange={(e) => setValue(e.target.value)}
/>

// Uncontrolled Component
const inputRef = useRef<HTMLInputElement>(null)

<input 
  ref={inputRef}  // ← DOM controls the value
  defaultValue=""
/>

// Access value when needed:
const value = inputRef.current?.value`}
      </pre>

      <div style={{ marginTop: '15px', padding: '10px', background: '#3a3510', color: '#f0e68c', borderRadius: '5px' }}>
        <strong>Interview Tip:</strong> Mention that controlled components are preferred because they provide better control, validation, and integration with React's data flow. Use uncontrolled for file inputs or when integrating with legacy code.
      </div>
    </div>
  )
}

// ============================================================================
// Q6: Event Handling in React
// ============================================================================
function Section6_EventHandling() {
  const [clickCount, setClickCount] = useState(0)
  const [inputValue, setInputValue] = useState('')
  const [lastKeyPressed, setLastKeyPressed] = useState('')

  // Different ways to handle events
  const handleClick1 = () => {
    setClickCount(clickCount + 1)
  }

  const handleClick2 = (customArg: string) => {
    alert(`Button clicked with argument: ${customArg}`)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Form submitted with value: ${inputValue}`)
  }

  return (
    <div style={{ marginBottom: '40px', padding: '20px', border: '2px solid #61dafb', borderRadius: '8px', color: 'var(--text-primary)' }}>
      <h2>Q6: How does event handling work in React?</h2>
      
      <div style={{ background: '#1e1e1e', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
        <h3>Answer:</h3>
        <p>React implements <strong>Synthetic Events</strong> - a cross-browser wrapper around native browser events.</p>
        
        <h4>Key Differences from HTML:</h4>
        <ul>
          <li>Event names are camelCase: <code>onClick</code> not <code>onclick</code></li>
          <li>Pass function reference, not string: <code>{`onClick={handler}`}</code> not <code>{`onclick="handler()"`}</code></li>
          <li>Cannot return false to prevent default, must call <code>e.preventDefault()</code></li>
          <li>Events are pooled and nullified after callback (for performance)</li>
        </ul>

        <h4>Synthetic Event Benefits:</h4>
        <ul>
          <li>Cross-browser consistency</li>
          <li>Better performance through event delegation</li>
          <li>Same API as native events</li>
        </ul>
      </div>

      <h3>Live Examples:</h3>
      
      {/* Example 1: Basic Click */}
      <div style={{ background: 'rgba(76, 175, 80, 0.15)', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px', border: '1px solid rgba(76, 175, 80, 0.4)' }}>
        <h4>1. Basic Event Handler</h4>
        <button onClick={handleClick1} style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Click Me! (Clicked {clickCount} times)
        </button>
      </div>

      {/* Example 2: Passing Arguments */}
      <div style={{ background: 'rgba(33, 150, 243, 0.15)', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px', border: '1px solid rgba(33, 150, 243, 0.4)' }}>
        <h4>2. Passing Arguments to Event Handlers</h4>
        <button 
          onClick={() => handleClick2('First')}
          style={{ padding: '10px 20px', cursor: 'pointer', marginRight: '10px' }}
        >
          Button 1
        </button>
        <button 
          onClick={() => handleClick2('Second')}
          style={{ padding: '10px 20px', cursor: 'pointer' }}
        >
          Button 2
        </button>
      </div>

      {/* Example 3: Input Events */}
      <div style={{ background: 'rgba(156, 39, 176, 0.15)', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px', border: '1px solid rgba(156, 39, 176, 0.4)' }}>
        <h4>3. Input Events</h4>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => setLastKeyPressed(e.key)}
          placeholder="Type here..."
          style={{ padding: '8px', width: '300px' }}
        />
        <p>Current value: {inputValue}</p>
        <p>Last key pressed: {lastKeyPressed}</p>
      </div>

      {/* Example 4: Form Submit */}
      <div style={{ background: 'rgba(255, 152, 0, 0.15)', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px', border: '1px solid rgba(255, 152, 0, 0.4)' }}>
        <h4>4. Form Submit with preventDefault</h4>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter text and submit"
            style={{ padding: '8px', width: '300px', marginRight: '10px' }}
          />
          <button type="submit" style={{ padding: '8px 20px', cursor: 'pointer' }}>
            Submit
          </button>
        </form>
      </div>

      <pre style={{ background: '#282c34', color: '#61dafb', padding: '15px', borderRadius: '5px', overflow: 'auto' }}>
{`// 1. Basic event handler
<button onClick={handleClick}>Click</button>

// 2. Inline arrow function (to pass arguments)
<button onClick={() => handleClick('arg')}>Click</button>

// 3. Input events with type safety
<input 
  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }}
/>

// 4. Prevent default behavior
<form onSubmit={(e: React.FormEvent) => {
  e.preventDefault()
  // Handle form submission
}}>

// 5. Common event types in TypeScript
React.MouseEvent<HTMLButtonElement>
React.ChangeEvent<HTMLInputElement>
React.FormEvent<HTMLFormElement>
React.KeyboardEvent<HTMLInputElement>
React.FocusEvent<HTMLInputElement>`}
      </pre>

      <div style={{ marginTop: '15px', padding: '10px', background: '#3a3510', color: '#f0e68c', borderRadius: '5px' }}>
        <strong>Interview Tip:</strong> Mention event delegation - React attaches a single event listener at the root, not on every element. This improves performance.
      </div>
    </div>
  )
}
