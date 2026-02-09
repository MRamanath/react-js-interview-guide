import React, { useState } from 'react'

/**
 * TOP INTERVIEW QUESTIONS: REDUX TOOLKIT & TESTING
 * 
 * Most commonly asked questions about Redux Toolkit and Testing in React
 */

export default function ReduxTestingInterviewQA() {
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', color: 'var(--text-primary)' }}>
      <h1>🗄️ Redux Toolkit & Testing - Top Interview Questions</h1>
      
      <Section1_ReduxBasics />
      <Section2_ReduxToolkit />
      <Section3_TestingReact />
      <Section4_TestingStrategies />
    </div>
  )
}

// ============================================================================
// Q1: What is Redux and when to use it?
// ============================================================================
function Section1_ReduxBasics() {
  return (
    <div style={{ marginBottom: '40px', padding: '20px', border: '2px solid #61dafb', borderRadius: '8px', color: 'var(--text-primary)' }}>
      <h2>Q1: What is Redux and when should you use it?</h2>
      
      <div style={{ background: '#1e1e1e', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
        <h3>Answer:</h3>
        <p><strong>Redux</strong> is a predictable state container for JavaScript apps. It helps manage global state in a centralized store.</p>
        
        <h4>Core Concepts:</h4>
        <ul>
          <li><strong>Store</strong> - Single source of truth for app state</li>
          <li><strong>Actions</strong> - Plain objects describing what happened</li>
          <li><strong>Reducers</strong> - Pure functions that update state based on actions</li>
          <li><strong>Dispatch</strong> - Function to send actions to the store</li>
          <li><strong>Selectors</strong> - Functions to read data from store</li>
        </ul>

        <h4>When to use Redux:</h4>
        <ul>
          <li>✅ Large app with complex state</li>
          <li>✅ State shared across many components</li>
          <li>✅ Frequently updated state</li>
          <li>✅ Complex state update logic</li>
          <li>✅ Need for time-travel debugging</li>
          <li>✅ Medium-to-large team</li>
        </ul>

        <h4>When NOT to use Redux:</h4>
        <ul>
          <li>❌ Small apps (overkill)</li>
          <li>❌ Simple state (useState/Context is enough)</li>
          <li>❌ Just starting with React</li>
          <li>❌ Server state (use React Query/SWR)</li>
        </ul>
      </div>

      <pre style={{ background: '#282c34', color: '#61dafb', padding: '15px', borderRadius: '5px', overflow: 'auto' }}>
{`// Classic Redux Flow (verbose)

// 1. Define Action Types
const INCREMENT = 'counter/INCREMENT'
const DECREMENT = 'counter/DECREMENT'

// 2. Create Action Creators
const increment = () => ({ type: INCREMENT })
const decrement = () => ({ type: DECREMENT })

// 3. Create Reducer
const initialState = { count: 0 }

function counterReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 }
    case DECREMENT:
      return { ...state, count: state.count - 1 }
    default:
      return state
  }
}

// 4. Create Store
import { createStore } from 'redux'
const store = createStore(counterReducer)

// 5. Use in React
import { Provider, useSelector, useDispatch } from 'react-redux'

function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  )
}

function Counter() {
  const count = useSelector(state => state.count)
  const dispatch = useDispatch()
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  )
}

// Redux Principles:
// 1. Single source of truth (one store)
// 2. State is read-only (only changed via actions)
// 3. Changes made with pure functions (reducers)

// Data Flow:
// 1. User clicks button
// 2. Component dispatches action
// 3. Reducer processes action
// 4. Store updates state
// 5. Components re-render with new state`}
      </pre>

      <div style={{ marginTop: '15px', padding: '10px', background: '#3a3510', color: '#f0e68c', borderRadius: '5px' }}>
        <strong>Interview Tip:</strong> Mention that Redux is not always necessary - Context API works for many apps. Emphasize the three principles. Discuss Redux DevTools for debugging.
      </div>
    </div>
  )
}

// ============================================================================
// Q2: What is Redux Toolkit and why use it?
// ============================================================================
function Section2_ReduxToolkit() {
  return (
    <div style={{ marginBottom: '40px', padding: '20px', border: '2px solid #61dafb', borderRadius: '8px', color: 'var(--text-primary)' }}>
      <h2>Q2: What is Redux Toolkit and why should you use it?</h2>
      
      <div style={{ background: '#1e1e1e', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
        <h3>Answer:</h3>
        <p><strong>Redux Toolkit (RTK)</strong> is the official, opinionated, batteries-included toolset for efficient Redux development.</p>
        
        <h4>Problems RTK Solves:</h4>
        <ul>
          <li>❌ Too much boilerplate code</li>
          <li>❌ Complex store setup</li>
          <li>❌ Need for many packages</li>
          <li>❌ Difficult to configure correctly</li>
        </ul>

        <h4>RTK Benefits:</h4>
        <ul>
          <li>✅ Less boilerplate (80% less code)</li>
          <li>✅ Built-in Immer (mutable updates)</li>
          <li>✅ Automatic action creators</li>
          <li>✅ Better TypeScript support</li>
          <li>✅ RTK Query for API calls</li>
        </ul>

        <h4>Key APIs:</h4>
        <ul>
          <li><code>configureStore()</code> - Setup store with good defaults</li>
          <li><code>createSlice()</code> - Define reducers and actions together</li>
          <li><code>createAsyncThunk()</code> - Handle async logic</li>
          <li><code>createEntityAdapter()</code> - Normalized state</li>
          <li><code>RTK Query</code> - Data fetching and caching</li>
        </ul>
      </div>

      <pre style={{ background: '#282c34', color: '#61dafb', padding: '15px', borderRadius: '5px', overflow: 'auto' }}>
{`// Redux Toolkit (Modern, Recommended)

import { configureStore, createSlice } from '@reduxjs/toolkit'

// 1. Create Slice (combines reducers + actions)
const counterSlice = createSlice({
  name: 'counter',
  initialState: { count: 0 },
  reducers: {
    // Immer allows "mutating" code (actually immutable)
    increment: (state) => {
      state.count += 1  // ✅ Looks mutable, actually immutable!
    },
    decrement: (state) => {
      state.count -= 1
    },
    incrementByAmount: (state, action) => {
      state.count += action.payload
    }
  }
})

// Actions automatically created!
export const { increment, decrement, incrementByAmount } = counterSlice.actions

// 2. Configure Store (includes DevTools, thunk, etc.)
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer
  }
})

// TypeScript types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// 3. Use in React (same as classic Redux)
function Counter() {
  const count = useSelector((state: RootState) => state.counter.count)
  const dispatch = useDispatch<AppDispatch>()
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
    </div>
  )
}

// Async Logic with createAsyncThunk
import { createAsyncThunk } from '@reduxjs/toolkit'

// Define async thunk
export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (userId: string) => {
    const response = await fetch(\`/api/users/\${userId}\`)
    return response.json()
  }
)

// Handle in slice
const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

// Usage
function UserProfile({ userId }: { userId: string }) {
  const dispatch = useDispatch()
  const { user, status } = useSelector((state: RootState) => state.user)
  
  useEffect(() => {
    dispatch(fetchUser(userId))
  }, [dispatch, userId])
  
  if (status === 'loading') return <div>Loading...</div>
  if (status === 'failed') return <div>Error!</div>
  if (!user) return null
  
  return <div>{user.name}</div>
}

// RTK Query - Even Simpler!
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define API
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getUser: builder.query<User, string>({
      query: (id) => \`users/\${id}\`
    }),
    updateUser: builder.mutation<User, Partial<User> & Pick<User, 'id'>>({
      query: ({ id, ...patch }) => ({
        url: \`users/\${id}\`,
        method: 'PATCH',
        body: patch
      })
    })
  })
})

// Auto-generated hooks!
export const { useGetUserQuery, useUpdateUserMutation } = api

// Usage - Incredibly Simple!
function UserProfile({ userId }: { userId: string }) {
  const { data: user, isLoading, error } = useGetUserQuery(userId)
  const [updateUser] = useUpdateUserMutation()
  
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error!</div>
  if (!user) return null
  
  return (
    <div>
      <h1>{user.name}</h1>
      <button onClick={() => updateUser({ id: userId, name: 'New Name' })}>
        Update
      </button>
    </div>
  )
}

// Multiple Slices
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    user: userSlice.reducer,
    [api.reducerPath]: api.reducer  // RTK Query
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware)
})

// Comparison: Classic Redux vs RTK
// Classic: ~50 lines of code
// RTK: ~15 lines of code (70% reduction!)
// Same functionality, much less boilerplate`}
      </pre>

      <div style={{ marginTop: '15px', padding: '10px', background: '#3a3510', color: '#f0e68c', borderRadius: '5px' }}>
        <strong>Interview Tip:</strong> Emphasize that RTK is the official recommended way to write Redux. Mention Immer for immutable updates, and RTK Query as an alternative to React Query. Discuss the massive reduction in boilerplate.
      </div>
    </div>
  )
}

// ============================================================================
// Q3: How to test React components?
// ============================================================================
function Section3_TestingReact() {
  return (
    <div style={{ marginBottom: '40px', padding: '20px', border: '2px solid #61dafb', borderRadius: '8px', color: 'var(--text-primary)' }}>
      <h2>Q3: How do you test React components?</h2>
      
      <div style={{ background: '#1e1e1e', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
        <h3>Answer:</h3>
        <p>React components are tested using <strong>React Testing Library</strong> (recommended) or Enzyme (legacy).</p>
        
        <h4>Testing Library Philosophy:</h4>
        <ul>
          <li>"The more your tests resemble the way your software is used, the more confidence they give you"</li>
          <li>Test behavior, not implementation</li>
          <li>Query by accessibility attributes</li>
          <li>Avoid testing internal state</li>
        </ul>

        <h4>Common Test Types:</h4>
        <ol>
          <li><strong>Unit Tests</strong> - Test individual components</li>
          <li><strong>Integration Tests</strong> - Test component interactions</li>
          <li><strong>E2E Tests</strong> - Test entire user flows (Cypress, Playwright)</li>
        </ol>

        <h4>What to Test:</h4>
        <ul>
          <li>✅ Component renders without crashing</li>
          <li>✅ Correct content displayed</li>
          <li>✅ User interactions work</li>
          <li>✅ Props affect rendering correctly</li>
          <li>✅ Error states and edge cases</li>
        </ul>

        <h4>What NOT to Test:</h4>
        <ul>
          <li>❌ Implementation details</li>
          <li>❌ Third-party libraries</li>
          <li>❌ React itself</li>
        </ul>
      </div>

      <pre style={{ background: '#282c34', color: '#61dafb', padding: '15px', borderRadius: '5px', overflow: 'auto' }}>
{`// Setup: Install dependencies
// npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event

// Component to test
function Counter() {
  const [count, setCount] = useState(0)
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  )
}

// Test file: Counter.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Counter from './Counter'

describe('Counter', () => {
  // 1. Basic render test
  it('renders with initial count of 0', () => {
    render(<Counter />)
    expect(screen.getByText('Count: 0')).toBeInTheDocument()
  })
  
  // 2. User interaction test
  it('increments count when button clicked', async () => {
    const user = userEvent.setup()
    render(<Counter />)
    
    const button = screen.getByRole('button', { name: /increment/i })
    await user.click(button)
    
    expect(screen.getByText('Count: 1')).toBeInTheDocument()
  })
  
  // 3. Multiple interactions
  it('resets count to 0', async () => {
    const user = userEvent.setup()
    render(<Counter />)
    
    // Increment twice
    const incrementBtn = screen.getByRole('button', { name: /increment/i })
    await user.click(incrementBtn)
    await user.click(incrementBtn)
    
    // Reset
    const resetBtn = screen.getByRole('button', { name: /reset/i })
    await user.click(resetBtn)
    
    expect(screen.getByText('Count: 0')).toBeInTheDocument()
  })
})

// Query Methods (Priority Order)
// 1. getByRole - Most accessible
screen.getByRole('button', { name: /submit/i })
screen.getByRole('textbox', { name: /email/i })

// 2. getByLabelText - For form inputs
screen.getByLabelText('Email')

// 3. getByPlaceholderText
screen.getByPlaceholderText('Enter email')

// 4. getByText
screen.getByText('Hello World')

// 5. getByTestId - Last resort
screen.getByTestId('custom-element')

// Async Testing
it('loads and displays data', async () => {
  render(<UserProfile userId="1" />)
  
  // Wait for element to appear
  const userName = await screen.findByText('John Doe')
  expect(userName).toBeInTheDocument()
})

// Mocking API calls
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const server = setupServer(
  rest.get('/api/user', (req, res, ctx) => {
    return res(ctx.json({ name: 'John Doe' }))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

it('fetches and displays user', async () => {
  render(<UserProfile />)
  
  expect(await screen.findByText('John Doe')).toBeInTheDocument()
})

// Testing with Context
const wrapper = ({ children }) => (
  <ThemeProvider theme="dark">
    {children}
  </ThemeProvider>
)

it('renders with theme', () => {
  render(<Button />, { wrapper })
  // Test implementation
})

// Testing hooks
import { renderHook, act } from '@testing-library/react'

it('increments counter', () => {
  const { result } = renderHook(() => useCounter())
  
  act(() => {
    result.current.increment()
  })
  
  expect(result.current.count).toBe(1)
})

// Snapshot testing (use sparingly)
import renderer from 'react-test-renderer'

it('matches snapshot', () => {
  const tree = renderer.create(<Button />).toJSON()
  expect(tree).toMatchSnapshot()
})

// Common assertions
expect(element).toBeInTheDocument()
expect(element).toBeVisible()
expect(element).toBeDisabled()
expect(element).toHaveTextContent('Hello')
expect(element).toHaveClass('active')
expect(element).toHaveAttribute('href', '/home')
expect(element).toHaveValue('John')

// Testing Library Best Practices:
// 1. Query by accessibility (role, label)
// 2. Use userEvent instead of fireEvent
// 3. Use findBy for async operations
// 4. Test behavior, not implementation
// 5. Don't test library code
// 6. Avoid queryByTestId unless necessary`}
      </pre>

      <div style={{ marginTop: '15px', padding: '10px', background: '#3a3510', color: '#f0e68c', borderRadius: '5px' }}>
        <strong>Interview Tip:</strong> Emphasize testing from the user's perspective. Mention React Testing Library's philosophy. Discuss the query priority: role &gt; label &gt; text &gt; test ID.
      </div>
    </div>
  )
}

// ============================================================================
// Q4: Testing Strategies and Best Practices
// ============================================================================
function Section4_TestingStrategies() {
  return (
    <div style={{ marginBottom: '40px', padding: '20px', border: '2px solid #61dafb', borderRadius: '8px', color: 'var(--text-primary)' }}>
      <h2>Q4: What are testing best practices and strategies?</h2>
      
      <div style={{ background: '#1e1e1e', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
        <h3>Answer:</h3>
        
        <h4>Testing Pyramid:</h4>
        <pre style={{ background: '#e0e0e0', color: '#1a1a1a', padding: '10px', borderRadius: '5px' }}>
{`        /\\
       /  \\     E2E (Few) - Slow, expensive, high confidence
      /____\\
     /      \\   Integration (Some) - Medium speed, good coverage
    /________\\
   /          \\  Unit (Many) - Fast, cheap, immediate feedback
  /__________\\
`}
        </pre>

        <h4>Testing Best Practices:</h4>
        <ol>
          <li><strong>Write tests as you code</strong> - TDD or alongside</li>
          <li><strong>Test behavior, not implementation</strong></li>
          <li><strong>Keep tests simple and readable</strong></li>
          <li><strong>Test one thing per test</strong></li>
          <li><strong>Use descriptive test names</strong></li>
          <li><strong>Follow AAA pattern</strong> - Arrange, Act, Assert</li>
          <li><strong>Mock external dependencies</strong></li>
          <li><strong>Keep tests fast</strong></li>
        </ol>
      </div>

      <pre style={{ background: '#282c34', color: '#61dafb', padding: '15px', borderRadius: '5px', overflow: 'auto' }}>
{`// AAA Pattern (Arrange, Act, Assert)
it('adds item to cart', () => {
  // Arrange - Setup
  render(<Cart />)
  const addButton = screen.getByRole('button', { name: /add/i })
  
  // Act - Perform action
  fireEvent.click(addButton)
  
  // Assert - Verify result
  expect(screen.getByText('Items: 1')).toBeInTheDocument()
})

// Good test names (describe behavior)
// ✅ Good
it('displays error message when email is invalid')
it('disables submit button while loading')
it('redirects to dashboard after successful login')

// ❌ Bad
it('works')
it('test1')
it('renders correctly')

// Test coverage goals
// - Aim for 80%+ coverage
// - 100% of critical paths
// - Focus on business logic

// Mocking strategies

// 1. Mock modules
jest.mock('./api', () => ({
  fetchUser: jest.fn()
}))

// 2. Mock functions
const mockOnClick = jest.fn()
render(<Button onClick={mockOnClick} />)
fireEvent.click(screen.getByRole('button'))
expect(mockOnClick).toHaveBeenCalledTimes(1)

// 3. Mock timers
jest.useFakeTimers()

it('debounces input', () => {
  render(<SearchInput />)
  const input = screen.getByRole('textbox')
  
  fireEvent.change(input, { target: { value: 'test' } })
  
  // Advance time
  jest.advanceTimersByTime(500)
  
  expect(mockSearch).toHaveBeenCalledWith('test')
})

// 4. Mock network requests (MSW)
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const server = setupServer(
  rest.get('/api/users', (req, res, ctx) => {
    return res(
      ctx.json([
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' }
      ])
    )
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

// Error scenarios
it('handles network error', async () => {
  server.use(
    rest.get('/api/users', (req, res, ctx) => {
      return res(ctx.status(500))
    })
  )
  
  render(<UserList />)
  
  expect(await screen.findByText(/error/i)).toBeInTheDocument()
})

// Testing Redux
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react'

function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = configureStore({
      reducer: { counter: counterReducer },
      preloadedState
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
  
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

// Usage
it('displays counter from store', () => {
  renderWithProviders(<Counter />, {
    preloadedState: {
      counter: { count: 10 }
    }
  })
  
  expect(screen.getByText('Count: 10')).toBeInTheDocument()
})

// Testing Router
import { MemoryRouter } from 'react-router-dom'

it('navigates on click', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  )
  
  fireEvent.click(screen.getByText('Go to About'))
  expect(screen.getByText('About Page')).toBeInTheDocument()
})

// Accessibility testing
import { axe } from 'jest-axe'

it('has no accessibility violations', async () => {
  const { container } = render(<Form />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})

// Visual regression testing
// Use tools like Percy, Chromatic, or jest-image-snapshot

// E2E Testing with Cypress/Playwright
describe('User Flow', () => {
  it('completes checkout process', () => {
    cy.visit('/products')
    cy.get('[data-testid="add-to-cart"]').first().click()
    cy.get('[data-testid="cart-icon"]').click()
    cy.get('[data-testid="checkout"]').click()
    cy.get('[data-testid="confirm-order"]').click()
    cy.contains('Order confirmed').should('be.visible')
  })
})

// Test organization
describe('User Profile', () => {
  describe('Rendering', () => {
    it('displays user information')
    it('shows loading state')
    it('shows error state')
  })
  
  describe('Interactions', () => {
    it('updates name on edit')
    it('saves changes on submit')
  })
  
  describe('Edge Cases', () => {
    it('handles missing data')
    it('validates form inputs')
  })
})

// Continuous Integration
// Run tests on every commit
// Block merges if tests fail
// Track coverage over time

// Test Performance
// - Use test.only for focused testing
// - Use test.skip for broken tests temporarily
// - Keep tests independent
// - Clean up after each test
// - Use beforeEach/afterEach wisely`}
      </pre>

      <div style={{ marginTop: '15px', padding: '10px', background: '#3a3510', color: '#f0e68c', borderRadius: '5px' }}>
        <strong>Interview Tip:</strong> Discuss the testing pyramid - more unit tests, fewer E2E tests. Mention TDD (Test-Driven Development) benefits. Emphasize that tests are documentation and safety net for refactoring.
      </div>
    </div>
  )
}
