import React, { useState } from 'react'
import FundamentalsInterviewQA from './01-FundamentalsInterviewQA'
import HooksInterviewQA from './02-HooksInterviewQA'
import PerformanceInterviewQA from './03-PerformanceInterviewQA'
import ContextStateInterviewQA from './04-ContextStateInterviewQA'
import AdvancedPatternsInterviewQA from './05-AdvancedPatternsInterviewQA'
import CustomHooksInterviewQA from './06-CustomHooksInterviewQA'
import ReduxTestingInterviewQA from './07-ReduxTestingInterviewQA'
import TypeScriptReactInterviewQA from './08-TypeScriptReactInterviewQA'
import NextJSSSRInterviewQA from './09-NextJSSSRInterviewQA'

/**
 * REACT INTERVIEW QUESTIONS - INTERACTIVE EXAMPLES
 * 
 * This section contains top interview questions with live, working code examples.
 * Each topic is organized into separate files for easy navigation.
 */

const TOPICS = [
  {
    id: 'fundamentals',
    title: '⚛️ React Fundamentals',
    description: 'JSX, Components, Props, State, Virtual DOM, Keys, Events',
    component: FundamentalsInterviewQA,
    count: 6,
    level: 'Beginner',
    tags: ['JSX', 'Components', 'Props', 'State'],
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  {
    id: 'hooks',
    title: '🪝 React Hooks',
    description: 'useState, useEffect, useRef, useCallback, useMemo, useReducer, Rules',
    component: HooksInterviewQA,
    count: 7,
    level: 'Intermediate',
    tags: ['useState', 'useEffect', 'useCallback', 'useMemo'],
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  },
  {
    id: 'performance',
    title: '⚡ Performance & Optimization',
    description: 'React.memo, Virtualization, Code Splitting, Bundle Size, Re-renders',
    component: PerformanceInterviewQA,
    count: 5,
    level: 'Advanced',
    tags: ['React.memo', 'Code Splitting', 'Optimization'],
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
  },
  {
    id: 'context-state',
    title: '🌐 Context API & State Management',
    description: 'Prop Drilling, Context API, State Colocation, Redux vs Context',
    component: ContextStateInterviewQA,
    count: 5,
    level: 'Intermediate',
    tags: ['Context API', 'State Management', 'Redux'],
    gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
  },
  {
    id: 'advanced',
    title: '🏗️ Advanced Patterns & Features',
    description: 'HOC, Render Props, Compound Components, Error Boundaries, Forms, Router, React 18',
    component: AdvancedPatternsInterviewQA,
    count: 7,
    level: 'Advanced',
    tags: ['HOC', 'Render Props', 'Error Boundaries', 'React 18'],
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
  },
  {
    id: 'custom-hooks',
    title: '🎣 Custom Hooks',
    description: 'useLocalStorage, useFetch, useToggle, useDebounce, Best Practices',
    component: CustomHooksInterviewQA,
    count: 5,
    level: 'Intermediate',
    tags: ['Custom Hooks', 'useLocalStorage', 'useFetch'],
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
  },
  {
    id: 'redux-testing',
    title: '🗄️ Redux & Testing',
    description: 'Redux Toolkit, RTK Query, React Testing Library, Best Practices',
    component: ReduxTestingInterviewQA,
    count: 4,
    level: 'Advanced',
    tags: ['Redux Toolkit', 'Testing', 'RTK Query'],
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
  },
  {
    id: 'typescript-react',
    title: '🔷 TypeScript with React',
    description: 'Component Types, Hooks, Generics, Utility Types, Best Practices',
    component: TypeScriptReactInterviewQA,
    count: 5,
    level: 'Intermediate',
    tags: ['TypeScript', 'Types', 'Generics'],
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
  },
  {
    id: 'nextjs-ssr',
    title: '⚡ Next.js & SSR/SSG',
    description: 'Server-Side Rendering, Static Generation, App Router, Data Fetching',
    component: NextJSSSRInterviewQA,
    count: 5,
    level: 'Advanced',
    tags: ['Next.js', 'SSR', 'SSG', 'App Router'],
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
  }
]

export default function InterviewExamplesIndex() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)

  const selectedTopicData = TOPICS.find(t => t.id === selectedTopic)

  if (selectedTopic && selectedTopicData) {
    const TopicComponent = selectedTopicData.component
    return (
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <button
          onClick={() => setSelectedTopic(null)}
          style={{
            padding: '10px 20px',
            cursor: 'pointer',
            marginBottom: '20px',
            background: '#61dafb',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px'
          }}
        >
          ← Back to Topics
        </button>
        <TopicComponent />
      </div>
    )
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '42px', marginBottom: '10px', color: 'var(--text-primary)' }}>
          📚 React Interview Questions
        </h1>
        <h2 style={{ fontSize: '24px', color: 'var(--text-secondary)', fontWeight: 'normal' }}>
          Top Interview Questions with Live Code Examples
        </h2>
        <p style={{ fontSize: '16px', color: 'var(--text-tertiary)', marginTop: '10px' }}>
          Interactive examples covering the most commonly asked React interview questions
        </p>
      </header>

      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '30px',
        borderRadius: '15px',
        marginBottom: '40px',
        color: 'white'
      }}>
        <h3 style={{ margin: '0 0 15px 0', fontSize: '24px', color: 'white' }}>
          🎯 What's Inside?
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '8px', color: 'white' }}>
            <strong style={{ fontSize: '24px', color: 'white' }}>49+</strong>
            <div style={{ color: 'white' }}>Interview Questions</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '8px', color: 'white' }}>
            <strong style={{ fontSize: '24px', color: 'white' }}>9</strong>
            <div style={{ color: 'white' }}>Topic Categories</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '8px', color: 'white' }}>
            <strong style={{ fontSize: '24px', color: 'white' }}>100%</strong>
            <div style={{ color: 'white' }}>Interactive Examples</div>
          </div>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '25px',
        marginBottom: '40px'
      }}>
        {TOPICS.map((topic) => (
          <div
            key={topic.id}
            onClick={() => setSelectedTopic(topic.id)}
            style={{
              background: topic.gradient,
              borderRadius: '12px',
              padding: '25px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.25)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)'
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.15)'
            }}
          >
            {/* Background overlay */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(255,255,255,0.95)',
              borderRadius: '12px'
            }} />
            
            {/* Content */}
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <h3 style={{
                  margin: 0,
                  fontSize: '20px',
                  color: '#1a1a1a',
                  fontWeight: 'bold'
                }}>
                  {topic.title}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'flex-end' }}>
                  <span style={{
                    background: '#61dafb',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}>
                    {topic.count} Q&A
                  </span>
                  <span style={{
                    background: topic.level === 'Beginner' ? '#4caf50' : topic.level === 'Intermediate' ? '#ff9800' : '#f44336',
                    color: 'white',
                    padding: '3px 10px',
                    borderRadius: '15px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    {topic.level}
                  </span>
                </div>
              </div>
              
              <p style={{
                color: '#555',
                margin: '12px 0',
                lineHeight: '1.6',
                fontSize: '14px'
              }}>
                {topic.description}
              </p>
              
              {/* Tags */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                marginTop: '15px',
                marginBottom: '15px'
              }}>
                {topic.tags.map(tag => (
                  <span key={tag} style={{
                    background: '#e8e8e8',
                    color: '#333',
                    padding: '4px 10px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    border: '1px solid #d0d0d0'
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
              
              <div style={{
                marginTop: '15px',
                color: '#61dafb',
                fontSize: '14px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center'
              }}>
                Explore Questions →
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        background: '#f8f9fa',
        padding: '30px',
        borderRadius: '12px',
        marginBottom: '40px',
        color: '#333'
      }}>
        <h3 style={{ marginTop: 0, color: '#1a1a1a' }}>💡 How to Use This Section</h3>
        <ol style={{ color: '#333', lineHeight: '1.8' }}>
          <li style={{ color: '#333' }}><strong style={{ color: '#1a1a1a' }}>Click on any topic card</strong> above to see the interview questions</li>
          <li style={{ color: '#333' }}><strong style={{ color: '#1a1a1a' }}>Each question includes:</strong>
            <ul style={{ color: '#333' }}>
              <li style={{ color: '#333' }}>Detailed answer with key points</li>
              <li style={{ color: '#333' }}>Live, interactive code examples</li>
              <li style={{ color: '#333' }}>Code snippets with explanations</li>
              <li style={{ color: '#333' }}>Interview tips and best practices</li>
            </ul>
          </li>
          <li style={{ color: '#333' }}><strong style={{ color: '#1a1a1a' }}>Open your browser console</strong> to see logs and debug information</li>
          <li style={{ color: '#333' }}><strong style={{ color: '#1a1a1a' }}>Interact with the examples</strong> to understand concepts better</li>
          <li style={{ color: '#333' }}><strong style={{ color: '#1a1a1a' }}>Use the "Back to Topics" button</strong> to return to this page</li>
        </ol>
      </div>

      <div style={{
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        padding: '25px',
        borderRadius: '12px',
        color: 'white',
        textAlign: 'center'
      }}>
        <h3 style={{ marginTop: 0 }}>🚀 Quick Tips for Interview Success</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginTop: '20px',
          textAlign: 'left'
        }}>
          <div>
            <strong>✓ Understand, don't memorize</strong>
            <p style={{ fontSize: '14px', margin: '5px 0 0 0', opacity: 0.9 }}>
              Focus on understanding concepts rather than memorizing code
            </p>
          </div>
          <div>
            <strong>✓ Practice explaining</strong>
            <p style={{ fontSize: '14px', margin: '5px 0 0 0', opacity: 0.9 }}>
              Practice explaining concepts out loud as if teaching someone
            </p>
          </div>
          <div>
            <strong>✓ Know the "why"</strong>
            <p style={{ fontSize: '14px', margin: '5px 0 0 0', opacity: 0.9 }}>
              Always understand why a pattern or solution is recommended
            </p>
          </div>
          <div>
            <strong>✓ Hands-on practice</strong>
            <p style={{ fontSize: '14px', margin: '5px 0 0 0', opacity: 0.9 }}>
              Build projects to reinforce concepts and gain real experience
            </p>
          </div>
        </div>
      </div>

      <footer style={{
        marginTop: '40px',
        padding: '20px',
        textAlign: 'center',
        color: 'var(--text-tertiary)',
        borderTop: '1px solid var(--border-primary)'
      }}>
        <p>💻 All examples are fully functional and interactive</p>
        <p style={{ fontSize: '14px', marginTop: '10px' }}>
          Use the navigation at the top to explore other sections of this tutorial
        </p>
      </footer>
    </div>
  )
}
