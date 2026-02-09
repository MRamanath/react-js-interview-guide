import React, { useState, memo, useMemo, useCallback, lazy, Suspense } from 'react'

/**
 * TOP INTERVIEW QUESTIONS: REACT PERFORMANCE & OPTIMIZATION
 * 
 * Most commonly asked performance optimization interview questions
 */

export default function PerformanceInterviewQA() {
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', color: 'var(--text-primary)' }}>
      <h1>⚡ Performance & Optimization - Top Interview Questions</h1>
      
      <Section1_ReactMemo />
      <Section2_VirtualizationConcept />
      <Section3_CodeSplitting />
      <Section4_BundleOptimization />
      <Section5_RenderOptimization />
    </div>
  )
}

// ============================================================================
// Q1: What is React.memo and when should you use it?
// ============================================================================

const ExpensiveChild = memo(({ value, onClick }: { value: number; onClick: () => void }) => {
  console.log('ExpensiveChild rendered')
  
  // Simulate expensive render
  let result = 0
  for (let i = 0; i < 10000000; i++) {
    result += i
  }
  
  return (
    <div style={{ padding: '10px', background: 'rgba(76, 175, 80, 0.15)', color: 'var(--text-primary)', borderRadius: '5px', margin: '5px 0', border: '1px solid rgba(76, 175, 80, 0.4)' }}>
      <p>Child Value: {value}</p>
      <button onClick={onClick} style={{ padding: '5px 10px', cursor: 'pointer' }}>
        Child Button
      </button>
      <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Expensive computation done: {result.toString().slice(0, 10)}...</p>
    </div>
  )
})

const NormalChild = ({ value, onClick }: { value: number; onClick: () => void }) => {
  console.log('NormalChild rendered')
  return (
    <div style={{ padding: '10px', background: 'rgba(244, 67, 54, 0.15)', color: 'var(--text-primary)', borderRadius: '5px', margin: '5px 0', border: '1px solid rgba(244, 67, 54, 0.4)' }}>
      <p>Child Value: {value}</p>
      <button onClick={onClick} style={{ padding: '5px 10px', cursor: 'pointer' }}>
        Child Button
      </button>
    </div>
  )
}

function Section1_ReactMemo() {
  const [parentCount, setParentCount] = useState(0)
  const [childValue, setChildValue] = useState(0)

  // Memoized callback to prevent re-renders
  const handleClick = useCallback(() => {
    console.log('Button clicked')
  }, [])

  return (
    <div style={{ marginBottom: '40px', padding: '20px', border: '2px solid #61dafb', borderRadius: '8px', color: 'var(--text-primary)' }}>
      <h2>Q1: What is React.memo and when should you use it?</h2>
      
      <div style={{ background: '#1e1e1e', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
        <h3>Answer:</h3>
        <p><strong>React.memo</strong> is a Higher-Order Component that memoizes a component, preventing re-renders if props haven't changed.</p>
        
        <h4>How it works:</h4>
        <ul>
          <li>Wraps functional component</li>
          <li>Performs shallow comparison of props</li>
          <li>Skips render if props are equal</li>
          <li>Can provide custom comparison function</li>
        </ul>

        <h4>When to use:</h4>
        <ul>
          <li>✅ Component renders often with same props</li>
          <li>✅ Component is expensive to render</li>
          <li>✅ Pure functional component (same props → same output)</li>
        </ul>

        <h4>When NOT to use:</h4>
        <ul>
          <li>❌ Props change frequently</li>
          <li>❌ Component is already fast</li>
          <li>❌ Premature optimization</li>
        </ul>
      </div>

      <h3>Live Comparison:</h3>
      <div style={{ background: 'rgba(33, 150, 243, 0.15)', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px', border: '1px solid rgba(33, 150, 243, 0.4)' }}>
        <p><strong>Parent Count:</strong> {parentCount}</p>
        <button 
          onClick={() => setParentCount(parentCount + 1)}
          style={{ padding: '8px 16px', cursor: 'pointer', marginRight: '10px' }}
        >
          Update Parent (No child prop change)
        </button>
        <button 
          onClick={() => setChildValue(childValue + 1)}
          style={{ padding: '8px 16px', cursor: 'pointer' }}
        >
          Update Child Value
        </button>
        
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '10px' }}>
          Open console: Memoized child doesn't re-render when parent count changes
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
        <div>
          <h4>✅ With React.memo (Optimized)</h4>
          <ExpensiveChild value={childValue} onClick={handleClick} />
        </div>
        <div>
          <h4>❌ Without React.memo</h4>
          <NormalChild value={childValue} onClick={handleClick} />
        </div>
      </div>

      <pre style={{ background: '#282c34', color: '#61dafb', padding: '15px', borderRadius: '5px', overflow: 'auto', marginTop: '15px' }}>
{`// Basic usage
const MyComponent = memo(({ name }) => {
  return <div>{name}</div>
})

// With custom comparison
const MyComponent = memo(({ user }) => {
  return <div>{user.name}</div>
}, (prevProps, nextProps) => {
  // Return true if props are equal (skip render)
  // Return false if props changed (re-render)
  return prevProps.user.id === nextProps.user.id
})

// Important: memo only checks props!
// Still re-renders if component's own state or context changes

// Combine with useCallback to prevent re-renders
function Parent() {
  const [count, setCount] = useState(0)
  
  // ❌ Wrong: New function every render, memo useless
  const handleClick = () => console.log('clicked')
  
  // ✅ Right: Same function reference, memo works
  const handleClick = useCallback(() => {
    console.log('clicked')
  }, [])
  
  return <MemoizedChild onClick={handleClick} />
}

// TypeScript with memo
interface Props {
  name: string
  age: number
}

const MyComponent: React.FC<Props> = memo(({ name, age }) => {
  return <div>{name} - {age}</div>
})`}
      </pre>

      <div style={{ marginTop: '15px', padding: '10px', background: '#3a3510', color: '#f0e68c', borderRadius: '5px' }}>
        <strong>Interview Tip:</strong> Mention that memo is shallow comparison by default. For deep comparisons or complex props, provide a custom comparison function. Also, emphasize that it's not free - there's overhead in comparing props.
      </div>
    </div>
  )
}

// ============================================================================
// Q2: What is list virtualization and why is it important?
// ============================================================================
function Section2_VirtualizationConcept() {
  const [showAll, setShowAll] = useState(false)
  const items = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`)
  
  const visibleItems = showAll ? items : items.slice(0, 50)

  return (
    <div style={{ marginBottom: '40px', padding: '20px', border: '2px solid #61dafb', borderRadius: '8px', color: 'var(--text-primary)' }}>
      <h2>Q2: What is list virtualization and why is it important?</h2>
      
      <div style={{ background: '#1e1e1e', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
        <h3>Answer:</h3>
        <p><strong>List virtualization (windowing)</strong> is a technique that only renders visible items in a long list, improving performance dramatically.</p>
        
        <h4>Problem:</h4>
        <ul>
          <li>Rendering 10,000 DOM nodes is slow</li>
          <li>High memory usage</li>
          <li>Sluggish scrolling</li>
          <li>Poor user experience</li>
        </ul>

        <h4>Solution:</h4>
        <ul>
          <li>Only render items in viewport + buffer</li>
          <li>Reuse DOM nodes as user scrolls</li>
          <li>Maintain scroll position with container height</li>
        </ul>

        <h4>Popular Libraries:</h4>
        <ul>
          <li><code>react-window</code> - Lightweight, recommended</li>
          <li><code>react-virtualized</code> - Feature-rich, larger</li>
          <li><code>@tanstack/react-virtual</code> - Modern, headless</li>
        </ul>

        <h4>When to use:</h4>
        <ul>
          <li>Lists with hundreds+ items</li>
          <li>Data grids/tables</li>
          <li>Infinite scroll</li>
          <li>Feed/timeline views</li>
        </ul>
      </div>

      <h3>Concept Demo:</h3>
      <div style={{ background: 'rgba(33, 150, 243, 0.15)', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px', border: '1px solid rgba(33, 150, 243, 0.4)' }}>
        <p><strong>Total Items:</strong> {items.length.toLocaleString()}</p>
        <p><strong>Rendered Items:</strong> {visibleItems.length}</p>
        
        <button 
          onClick={() => setShowAll(!showAll)}
          style={{ padding: '10px 20px', cursor: 'pointer', marginBottom: '15px' }}
        >
          {showAll ? '⚡ Show Only Visible (Fast)' : '🐌 Show All (Slow)'}
        </button>
        
        <div style={{ 
          height: '300px', 
          overflow: 'auto', 
          border: '1px solid rgba(100, 150, 200, 0.3)', 
          borderRadius: '5px',
          background: 'rgba(255, 255, 255, 0.05)'
        }}>
          {visibleItems.map((item, index) => (
            <div 
              key={index}
              style={{ 
                padding: '8px', 
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'var(--text-primary)'
              }}
            >
              {item}
            </div>
          ))}
          {!showAll && (
            <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-secondary)' }}>
              ... and {items.length - visibleItems.length} more items (not rendered)
            </div>
          )}
        </div>
      </div>

      <pre style={{ background: '#282c34', color: '#61dafb', padding: '15px', borderRadius: '5px', overflow: 'auto' }}>
{`// Without virtualization (renders ALL items - slow!)
function RegularList({ items }) {
  return (
    <div style={{ height: 500, overflow: 'auto' }}>
      {items.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </div>
  )
}

// With react-window (renders only visible - fast!)
import { FixedSizeList } from 'react-window'

function VirtualList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>{items[index]}</div>
  )

  return (
    <FixedSizeList
      height={500}        // Container height
      itemCount={items.length}
      itemSize={35}       // Each item height
      width="100%"
    >
      {Row}
    </FixedSizeList>
  )
}

// Variable size items
import { VariableSizeList } from 'react-window'

function VirtualList({ items }) {
  const getItemSize = (index) => {
    // Return height for each item dynamically
    return items[index].isLarge ? 100 : 50
  }

  return (
    <VariableSizeList
      height={500}
      itemCount={items.length}
      itemSize={getItemSize}
      width="100%"
    >
      {Row}
    </VariableSizeList>
  )
}

// With infinite scroll
import InfiniteLoader from 'react-window-infinite-loader'

function InfiniteList({ hasNextPage, loadMore, items }) {
  const isItemLoaded = (index) => !hasNextPage || index < items.length
  
  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={hasNextPage ? items.length + 1 : items.length}
      loadMoreItems={loadMore}
    >
      {({ onItemsRendered, ref }) => (
        <FixedSizeList
          onItemsRendered={onItemsRendered}
          ref={ref}
          {...otherProps}
        />
      )}
    </InfiniteLoader>
  )
}`}
      </pre>

      <div style={{ marginTop: '15px', padding: '10px', background: '#3a3510', color: '#f0e68c', borderRadius: '5px' }}>
        <strong>Interview Tip:</strong> Explain how virtualization calculates which items are visible based on scroll position and container size. Mention that it's essential for performance with large datasets.
      </div>
    </div>
  )
}

// ============================================================================
// Q3: What is code splitting and lazy loading?
// ============================================================================
function Section3_CodeSplitting() {
  const [showHeavyComponent, setShowHeavyComponent] = useState(false)

  return (
    <div style={{ marginBottom: '40px', padding: '20px', border: '2px solid #61dafb', borderRadius: '8px', color: 'var(--text-primary)' }}>
      <h2>Q3: What is code splitting and lazy loading?</h2>
      
      <div style={{ background: '#1e1e1e', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
        <h3>Answer:</h3>
        <p><strong>Code splitting</strong> breaks your bundle into smaller chunks that are loaded on demand, reducing initial load time.</p>
        
        <h4>Benefits:</h4>
        <ul>
          <li><strong>Faster initial load</strong> - Load only what's needed</li>
          <li><strong>Better caching</strong> - Unchanged chunks stay cached</li>
          <li><strong>Reduced bandwidth</strong> - Users don't download unused code</li>
          <li><strong>Better UX</strong> - App becomes interactive faster</li>
        </ul>

        <h4>Methods:</h4>
        <ol>
          <li><strong>React.lazy()</strong> - Component-level splitting</li>
          <li><strong>Dynamic import()</strong> - Module-level splitting</li>
          <li><strong>Route-based splitting</strong> - Split by route</li>
        </ol>

        <h4>Best Practices:</h4>
        <ul>
          <li>Split at route boundaries</li>
          <li>Split large dependencies (charts, editors, etc.)</li>
          <li>Use Suspense for loading states</li>
          <li>Avoid too many tiny chunks</li>
        </ul>
      </div>

      <h3>Live Example:</h3>
      <div style={{ background: 'rgba(76, 175, 80, 0.15)', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px', border: '1px solid rgba(76, 175, 80, 0.4)' }}>
        <button 
          onClick={() => setShowHeavyComponent(!showHeavyComponent)}
          style={{ padding: '10px 20px', cursor: 'pointer', marginBottom: '15px' }}
        >
          {showHeavyComponent ? 'Hide' : 'Load'} Heavy Component
        </button>
        
        {showHeavyComponent && (
          <Suspense fallback={<div style={{ padding: '20px', background: 'rgba(255, 152, 0, 0.15)', color: 'var(--text-primary)', borderRadius: '5px', border: '1px solid rgba(255, 152, 0, 0.4)' }}>Loading component...</div>}>
            <div style={{ padding: '15px', background: 'rgba(33, 150, 243, 0.15)', color: 'var(--text-primary)', borderRadius: '5px', border: '1px solid rgba(33, 150, 243, 0.4)' }}>
              <p>Heavy component loaded! (In a real app, this would be a separate JS bundle)</p>
            </div>
          </Suspense>
        )}
      </div>

      <pre style={{ background: '#282c34', color: '#61dafb', padding: '15px', borderRadius: '5px', overflow: 'auto' }}>
{`// 1. Component-level splitting with React.lazy
import { lazy, Suspense } from 'react'

// Instead of: import HeavyComponent from './HeavyComponent'
const HeavyComponent = lazy(() => import('./HeavyComponent'))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  )
}

// 2. Route-based splitting (React Router)
import { Routes, Route } from 'react-router-dom'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Dashboard = lazy(() => import('./pages/Dashboard'))

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Suspense>
  )
}

// 3. Named exports with lazy
const { Chart } = lazy(() => 
  import('./Charts').then(module => ({
    default: module.Chart
  }))
)

// 4. Preloading components
const HeavyComponent = lazy(() => import('./HeavyComponent'))

// Preload on hover
function Button() {
  const preload = () => {
    const component = import('./HeavyComponent')
  }
  
  return (
    <button onMouseEnter={preload}>
      Show Heavy Component
    </button>
  )
}

// 5. Multiple Suspense boundaries
function App() {
  return (
    <div>
      <Header />
      
      <Suspense fallback={<Skeleton />}>
        <MainContent />
      </Suspense>
      
      <Suspense fallback={<Sidebar />}>
        <Comments />
      </Suspense>
    </div>
  )
}

// 6. Error boundaries with lazy loading
import { ErrorBoundary } from 'react-error-boundary'

const LazyComponent = lazy(() => import('./LazyComponent'))

function App() {
  return (
    <ErrorBoundary fallback={<div>Failed to load component</div>}>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </ErrorBoundary>
  )
}

// Webpack magic comments for chunk naming
const Dashboard = lazy(() => 
  import(/* webpackChunkName: "dashboard" */ './Dashboard')
)`}
      </pre>

      <div style={{ marginTop: '15px', padding: '10px', background: '#3a3510', color: '#f0e68c', borderRadius: '5px' }}>
        <strong>Interview Tip:</strong> Explain the bundle analysis tools (webpack-bundle-analyzer) to identify splitting opportunities. Mention that Suspense can have multiple boundaries for granular loading states.
      </div>
    </div>
  )
}

// ============================================================================
// Q4: How to optimize bundle size?
// ============================================================================
function Section4_BundleOptimization() {
  return (
    <div style={{ marginBottom: '40px', padding: '20px', border: '2px solid #61dafb', borderRadius: '8px', color: 'var(--text-primary)' }}>
      <h2>Q4: How to optimize React bundle size?</h2>
      
      <div style={{ background: '#1e1e1e', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
        <h3>Answer:</h3>
        <p>Bundle size directly impacts load time and user experience. Here are key optimization strategies:</p>
        
        <h4>1. Tree Shaking</h4>
        <ul>
          <li>Use ES6 imports (not require)</li>
          <li>Import only what you need</li>
          <li>Configure properly in build tool</li>
        </ul>

        <h4>2. Dependency Optimization</h4>
        <ul>
          <li>Use lightweight alternatives</li>
          <li>Remove unused dependencies</li>
          <li>Check bundle size before adding</li>
        </ul>

        <h4>3. Build Optimizations</h4>
        <ul>
          <li>Enable production mode</li>
          <li>Minification & uglification</li>
          <li>Compression (gzip/brotli)</li>
          <li>Source map separation</li>
        </ul>

        <h4>4. Code Splitting</h4>
        <ul>
          <li>Route-based splitting</li>
          <li>Component lazy loading</li>
          <li>Vendor chunk separation</li>
        </ul>
      </div>

      <pre style={{ background: '#282c34', color: '#61dafb', padding: '15px', borderRadius: '5px', overflow: 'auto' }}>
{`// 1. Tree Shaking - Import only what you need

// ❌ Bad: Imports entire library
import _ from 'lodash'
_.debounce(fn, 300)

// ✅ Good: Import specific function
import debounce from 'lodash/debounce'
debounce(fn, 300)

// ❌ Bad: Imports all icons
import * as Icons from 'react-icons'

// ✅ Good: Import specific icons
import { FaUser, FaHeart } from 'react-icons/fa'

// 2. Analyze bundle size
// package.json
{
  "scripts": {
    "analyze": "source-map-explorer 'build/static/js/*.js'"
  }
}

// Or with webpack-bundle-analyzer
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

plugins: [
  new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    openAnalyzer: false
  })
]

// 3. Replace heavy libraries

// ❌ Heavy: moment.js (70kb)
import moment from 'moment'
moment().format('YYYY-MM-DD')

// ✅ Light: date-fns (2kb per function)
import { format } from 'date-fns'
format(new Date(), 'yyyy-MM-dd')

// ✅ Lighter: day.js (2kb)
import dayjs from 'dayjs'
dayjs().format('YYYY-MM-DD')

// 4. Dynamic imports for heavy dependencies

// Load chart library only when needed
const loadChart = async () => {
  const { Chart } = await import('chart.js')
  return Chart
}

// 5. Optimize images
// Use WebP format, lazy load images
<img 
  loading="lazy" 
  src="image.webp" 
  alt="description"
/>

// 6. Use production build
// Automatically removes development code
// package.json
{
  "scripts": {
    "build": "NODE_ENV=production vite build"
  }
}

// 7. Split vendor chunks (Vite/Webpack)
// vite.config.ts
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'ui': ['@mui/material']
        }
      }
    }
  }
}

// 8. Remove console.logs in production
// vite.config.ts
export default {
  esbuild: {
    drop: ['console', 'debugger']
  }
}

// 9. Use CDN for large libraries
// index.html
<script src="https://cdn.jsdelivr.net/npm/react@18/umd/react.production.min.js"></script>

// 10. Check bundle size
// Terminal command
npm run build
// Look at the output sizes

// Use tools:
// - bundlephobia.com - Check package size before installing
// - source-map-explorer - Analyze bundle
// - webpack-bundle-analyzer - Visualize bundle`}
      </pre>

      <div style={{ marginTop: '15px', padding: '10px', background: '#3a3510', color: '#f0e68c', borderRadius: '5px' }}>
        <strong>Interview Tip:</strong> Mention specific tools and real-world examples. Discuss the trade-off between bundle size and runtime performance. Emphasize measuring before and after optimization.
      </div>
    </div>
  )
}

// ============================================================================
// Q5: How to prevent unnecessary re-renders?
// ============================================================================
function Section5_RenderOptimization() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ marginBottom: '40px', padding: '20px', border: '2px solid #61dafb', borderRadius: '8px' }}>
      <h2>Q5: How to prevent unnecessary re-renders?</h2>
      
      <div style={{ background: '#1e1e1e', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
        <h3>Answer:</h3>
        <p>Unnecessary re-renders are a common performance issue. Here are strategies to prevent them:</p>
        
        <h4>1. React.memo</h4>
        <ul>
          <li>Memoize functional components</li>
          <li>Skip render if props unchanged</li>
        </ul>

        <h4>2. useCallback & useMemo</h4>
        <ul>
          <li>Prevent function recreation</li>
          <li>Memoize expensive calculations</li>
        </ul>

        <h4>3. State Structure</h4>
        <ul>
          <li>Keep state localized</li>
          <li>Split into smaller components</li>
          <li>Lift state only when needed</li>
        </ul>

        <h4>4. Context Optimization</h4>
        <ul>
          <li>Split contexts by update frequency</li>
          <li>Memoize context values</li>
        </ul>

        <h4>5. Key Props</h4>
        <ul>
          <li>Use stable keys in lists</li>
          <li>Avoid index as key</li>
        </ul>
      </div>

      <pre style={{ background: '#282c34', color: '#61dafb', padding: '15px', borderRadius: '5px', overflow: 'auto' }}>
{`// 1. Use React.memo
const ExpensiveComponent = memo(({ data }) => {
  // Only re-renders when data changes
  return <div>{data}</div>
})

// 2. useCallback for stable function references
function Parent() {
  const [count, setCount] = useState(0)
  
  // ❌ New function every render
  const handleClick = () => setCount(c => c + 1)
  
  // ✅ Same function reference
  const handleClick = useCallback(() => {
    setCount(c => c + 1)
  }, [])
  
  return <MemoChild onClick={handleClick} />
}

// 3. useMemo for expensive calculations
function Component({ items }) {
  // ❌ Recalculates every render
  const total = items.reduce((sum, item) => sum + item.price, 0)
  
  // ✅ Only recalculates when items change
  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price, 0)
  }, [items])
}

// 4. Split components to localize state
// ❌ Bad: Entire form re-renders on every keystroke
function FormBad() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  
  return (
    <div>
      <ExpensiveHeader />  {/* Re-renders unnecessarily */}
      <input value={name} onChange={e => setName(e.target.value)} />
      <input value={email} onChange={e => setEmail(e.target.value)} />
      <input value={address} onChange={e => setAddress(e.target.value)} />
    </div>
  )
}

// ✅ Good: Split into smaller components
function FormGood() {
  return (
    <div>
      <ExpensiveHeader />  {/* Doesn't re-render */}
      <NameInput />
      <EmailInput />
      <AddressInput />
    </div>
  )
}

// 5. Optimize Context
// ❌ Bad: Single context, all consumers re-render
const AppContext = createContext({
  user: null,
  theme: 'light',
  settings: {}
})

// ✅ Good: Split contexts
const UserContext = createContext(null)
const ThemeContext = createContext('light')
const SettingsContext = createContext({})

// Memoize context value
function AppProvider({ children }) {
  const [user, setUser] = useState(null)
  
  // ❌ New object every render
  <UserContext.Provider value={{ user, setUser }}>
  
  // ✅ Memoized value
  const value = useMemo(() => ({ user, setUser }), [user])
  <UserContext.Provider value={value}>
}

// 6. Use children prop pattern
function Wrapper({ children }) {
  const [state, setState] = useState(0)
  
  // children don't re-render when state changes
  return (
    <div>
      <button onClick={() => setState(s => s + 1)}>
        {state}
      </button>
      {children}
    </div>
  )
}

<Wrapper>
  <ExpensiveComponent />  {/* Won't re-render */}
</Wrapper>

// 7. Use React DevTools Profiler
// Identify components that re-render unnecessarily
// Enable "Highlight updates" in React DevTools

// 8. Avoid inline objects/arrays in props
// ❌ Bad: New object every render
<Component style={{ margin: 10 }} />

// ✅ Good: Define outside or memoize
const style = { margin: 10 }
<Component style={style} />

// ❌ Bad: New array every render
<List items={[1, 2, 3]} />

// ✅ Good: Define outside
const items = [1, 2, 3]
<List items={items} />

// 9. Bail out of state updates
function Component() {
  const [count, setCount] = useState(0)
  
  // If new value equals current value, React bails out
  setCount(0)  // No re-render if count is already 0
  
  // This also works with objects (must be same reference)
  const [user, setUser] = useState({ name: 'John' })
  setUser(user)  // No re-render (same reference)
}

// 10. Use production build
// Development build has extra checks that slow down rendering
npm run build`}
      </pre>

      <div style={{ marginTop: '15px', padding: '10px', background: '#3a3510', color: '#f0e68c', borderRadius: '5px' }}>
        <strong>Interview Tip:</strong> Emphasize measuring first with React DevTools Profiler before optimizing. Not all re-renders are bad - only optimize when there's a noticeable performance issue. Mention that premature optimization can make code harder to maintain.
      </div>
    </div>
  )
}
