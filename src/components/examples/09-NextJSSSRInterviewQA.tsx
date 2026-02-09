import React, { useState } from 'react'

/**
 * TOP INTERVIEW QUESTIONS: NEXT.JS & SSR/SSG
 * 
 * Most commonly asked questions about Next.js, Server-Side Rendering, and Static Generation
 */

export default function NextJSSSRInterviewQA() {
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', color: 'var(--text-primary)' }}>
      <h1>⚡ Next.js & SSR/SSG - Top Interview Questions</h1>
      
      <Section1_WhatIsNextJS />
      <Section2_RenderingStrategies />
      <Section3_DataFetching />
      <Section4_RoutingAndNavigation />
      <Section5_NextJS13Features />
    </div>
  )
}

// ============================================================================
// Q1: What is Next.js and why use it?
// ============================================================================
function Section1_WhatIsNextJS() {
  return (
    <div style={{ marginBottom: '40px', padding: '20px', border: '2px solid #61dafb', borderRadius: '8px', color: 'var(--text-primary)' }}>
      <h2>Q1: What is Next.js and why use it over Create React App?</h2>
      
      <div style={{ background: '#1e1e1e', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
        <h3>Answer:</h3>
        <p><strong>Next.js</strong> is a React framework for building full-stack web applications with built-in SSR, SSG, routing, and optimization.</p>
        
        <h4>Key Features:</h4>
        <ul>
          <li>✅ <strong>Server-Side Rendering (SSR)</strong> - Render on server</li>
          <li>✅ <strong>Static Site Generation (SSG)</strong> - Pre-render at build time</li>
          <li>✅ <strong>File-based Routing</strong> - No react-router needed</li>
          <li>✅ <strong>API Routes</strong> - Backend endpoints in same project</li>
          <li>✅ <strong>Automatic Code Splitting</strong> - Faster page loads</li>
          <li>✅ <strong>Image Optimization</strong> - Built-in image component</li>
          <li>✅ <strong>TypeScript Support</strong> - Zero-config TypeScript</li>
          <li>✅ <strong>Fast Refresh</strong> - Instant feedback during development</li>
        </ul>

        <h4>When to use Next.js:</h4>
        <ul>
          <li>SEO is important (content needs to be indexed)</li>
          <li>Performance is critical (faster initial page load)</li>
          <li>Need server-side logic or API routes</li>
          <li>Building a content-heavy site (blog, e-commerce, marketing)</li>
        </ul>

        <h4>When to use Create React App:</h4>
        <ul>
          <li>Building a dashboard or admin panel (no SEO needed)</li>
          <li>Simple single-page application</li>
          <li>Don't need SSR/SSG</li>
        </ul>
      </div>

      <pre style={{ background: '#282c34', color: '#61dafb', padding: '15px', borderRadius: '5px', overflow: 'auto' }}>
{`// Next.js vs Create React App

// CRA (Client-Side Rendering only)
// 1. User requests page
// 2. Server sends HTML with <div id="root"></div>
// 3. Browser downloads JS bundle
// 4. React renders content
// 5. User sees content
// Problem: Slow initial load, poor SEO

// Next.js (Multiple rendering options)
// 1. User requests page
// 2. Server renders React to HTML (SSR)
// 3. Browser receives full HTML content
// 4. User sees content immediately (faster!)
// 5. JS hydrates the page
// Benefits: Fast initial load, great SEO

// File Structure Comparison

// CRA
src/
  App.tsx
  pages/
    Home.tsx
    About.tsx
  components/
    Header.tsx
  App.tsx  // Manual routing setup

// Next.js (Pages Router)
pages/
  index.tsx        // Route: /
  about.tsx        // Route: /about
  blog/
    [slug].tsx     // Route: /blog/:slug
    index.tsx      // Route: /blog
  api/
    hello.ts       // API endpoint: /api/hello

// Next.js (App Router - Next.js 13+)
app/
  layout.tsx       // Root layout
  page.tsx         // Route: /
  about/
    page.tsx       // Route: /about
  blog/
    [slug]/
      page.tsx     // Route: /blog/:slug
    page.tsx       // Route: /blog
  api/
    hello/
      route.ts     // API endpoint: /api/hello

// Basic Next.js Page (Pages Router)
// pages/index.tsx
export default function Home() {
  return (
    <div>
      <h1>Welcome to Next.js!</h1>
      <p>This page is server-rendered by default</p>
    </div>
  )
}

// Basic Next.js Page (App Router)
// app/page.tsx
export default function Home() {
  return (
    <div>
      <h1>Welcome to Next.js 13+!</h1>
      <p>This is a server component by default</p>
    </div>
  )
}

// Navigation in Next.js
import Link from 'next/link'
import { useRouter } from 'next/router'  // Pages Router
// OR
import { useRouter } from 'next/navigation'  // App Router

function Navigation() {
  const router = useRouter()
  
  return (
    <nav>
      {/* Declarative navigation */}
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/blog/my-post">Blog Post</Link>
      
      {/* Programmatic navigation */}
      <button onClick={() => router.push('/dashboard')}>
        Go to Dashboard
      </button>
    </nav>
  )
}

// API Routes (Backend in Next.js!)
// pages/api/users.ts
import type { NextApiRequest, NextApiResponse } from 'next'

type User = {
  id: number
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[]>
) {
  if (req.method === 'GET') {
    const users = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' }
    ]
    res.status(200).json(users)
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}

// Now you can fetch from your own API:
// fetch('/api/users')

// Image Optimization
import Image from 'next/image'

function ProductImage() {
  return (
    <Image
      src="/product.jpg"
      alt="Product"
      width={500}
      height={300}
      priority  // Load immediately
      placeholder="blur"
      // Next.js automatically optimizes images!
    />
  )
}

// Head/Metadata
import Head from 'next/head'

function Page() {
  return (
    <>
      <Head>
        <title>My Page Title</title>
        <meta name="description" content="Page description" />
        <meta property="og:title" content="My Page" />
      </Head>
      <main>Content</main>
    </>
  )
}

// App Router - New metadata API
// app/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Page Title',
  description: 'Page description',
  openGraph: {
    title: 'My Page',
    description: 'Page description'
  }
}

export default function Page() {
  return <main>Content</main>
}

// Environment Variables
// .env.local
NEXT_PUBLIC_API_URL=https://api.example.com
DATABASE_URL=postgresql://...

// Usage
const apiUrl = process.env.NEXT_PUBLIC_API_URL  // Available in browser
const dbUrl = process.env.DATABASE_URL  // Server-side only

// Configuration
// next.config.js
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['example.com']
  },
  env: {
    CUSTOM_VAR: 'value'
  },
  async redirects() {
    return [
      {
        source: '/old-path',
        destination: '/new-path',
        permanent: true
      }
    ]
  }
}`}
      </pre>

      <div style={{ marginTop: '15px', padding: '10px', background: '#3a3510', color: '#f0e68c', borderRadius: '5px' }}>
        <strong>Interview Tip:</strong> Emphasize that Next.js is a framework, not a library - it provides structure and conventions. Mention both Pages Router (older) and App Router (Next.js 13+). Discuss SEO and performance benefits.
      </div>
    </div>
  )
}

// ============================================================================
// Q2: What are rendering strategies in Next.js?
// ============================================================================
function Section2_RenderingStrategies() {
  return (
    <div style={{ marginBottom: '40px', padding: '20px', border: '2px solid #61dafb', borderRadius: '8px' }}>
      <h2>Q2: What are the different rendering strategies in Next.js?</h2>
      
      <div style={{ background: '#1e1e1e', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
        <h3>Answer:</h3>
        <p>Next.js supports multiple rendering strategies: SSG, SSR, ISR, and CSR.</p>
        
        <h4>Rendering Strategies:</h4>
        <ol>
          <li><strong>SSG</strong> - Static Site Generation (fastest)</li>
          <li><strong>SSR</strong> - Server-Side Rendering (dynamic)</li>
          <li><strong>ISR</strong> - Incremental Static Regeneration (best of both)</li>
          <li><strong>CSR</strong> - Client-Side Rendering (React default)</li>
        </ol>

        <h4>Comparison:</h4>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr style={{ background: '#e0e0e0', color: '#1a1a1a' }}>
              <th style={{ padding: '8px', border: '1px solid #444' }}>Strategy</th>
              <th style={{ padding: '8px', border: '1px solid #444' }}>When Rendered</th>
              <th style={{ padding: '8px', border: '1px solid #444' }}>Best For</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #444' }}>SSG</td>
              <td style={{ padding: '8px', border: '1px solid #444' }}>Build time</td>
              <td style={{ padding: '8px', border: '1px solid #444' }}>Static content</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #444' }}>SSR</td>
              <td style={{ padding: '8px', border: '1px solid #444' }}>Every request</td>
              <td style={{ padding: '8px', border: '1px solid #444' }}>Dynamic data</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #444' }}>ISR</td>
              <td style={{ padding: '8px', border: '1px solid #444' }}>Build + revalidate</td>
              <td style={{ padding: '8px', border: '1px solid #444' }}>Semi-static</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #444' }}>CSR</td>
              <td style={{ padding: '8px', border: '1px solid #444' }}>Client-side</td>
              <td style={{ padding: '8px', border: '1px solid #444' }}>Private data</td>
            </tr>
          </tbody>
        </table>
      </div>

      <pre style={{ background: '#282c34', color: '#61dafb', padding: '15px', borderRadius: '5px', overflow: 'auto' }}>
{`// 1. SSG - Static Site Generation (Default, Fastest)
// pages/about.tsx
export default function About() {
  return <div>About Us - This page is pre-rendered at build time</div>
}
// Generated once during build, served as static HTML
// Perfect for: Marketing pages, blogs, documentation

// SSG with Data
// pages/blog.tsx
export async function getStaticProps() {
  const posts = await fetchPosts()  // Runs at build time
  
  return {
    props: {
      posts
    }
  }
}

export default function Blog({ posts }) {
  return (
    <div>
      <h1>Blog Posts</h1>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  )
}

// SSG with Dynamic Routes
// pages/blog/[slug].tsx
export async function getStaticPaths() {
  const posts = await fetchPosts()
  
  // Generate paths for all posts at build time
  const paths = posts.map(post => ({
    params: { slug: post.slug }
  }))
  
  return {
    paths,
    fallback: false  // 404 for non-existent paths
    // fallback: true  // Generate on-demand
    // fallback: 'blocking'  // SSR for first request
  }
}

export async function getStaticProps({ params }) {
  const post = await fetchPost(params.slug)
  
  return {
    props: { post },
    revalidate: 60  // ISR: Regenerate every 60 seconds
  }
}

export default function BlogPost({ post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
    </article>
  )
}

// 2. SSR - Server-Side Rendering (Dynamic)
// pages/dashboard.tsx
export async function getServerSideProps(context) {
  // Runs on EVERY request
  const { req, res, query } = context
  
  // Access cookies, headers, etc.
  const session = await getSession(req)
  
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }
  
  const userData = await fetchUserData(session.userId)
  
  return {
    props: {
      user: userData
    }
  }
}

export default function Dashboard({ user }) {
  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <p>Your personalized dashboard</p>
    </div>
  )
}
// Perfect for: User dashboards, personalized content, real-time data

// 3. ISR - Incremental Static Regeneration (Best of Both Worlds)
// pages/products.tsx
export async function getStaticProps() {
  const products = await fetchProducts()
  
  return {
    props: { products },
    revalidate: 60  // Regenerate page every 60 seconds
  }
}

export default function Products({ products }) {
  return (
    <div>
      <h1>Products</h1>
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  )
}
// How it works:
// 1. Page generated at build time (like SSG)
// 2. Served as static HTML (fast!)
// 3. After 60 seconds, next request triggers regeneration
// 4. New version replaces old one
// Perfect for: E-commerce, news sites, frequently updated content

// 4. CSR - Client-Side Rendering (React Default)
import { useEffect, useState } from 'react'

export default function Profile() {
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    // Fetch on client-side
    fetch('/api/user')
      .then(res => res.json())
      .then(setUser)
  }, [])
  
  if (!user) return <div>Loading...</div>
  
  return <div>Welcome, {user.name}</div>
}
// Perfect for: Private dashboards, user-specific data, no SEO needed

// Combining Strategies
export async function getServerSideProps() {
  // Fetch public data on server
  const publicData = await fetchPublicData()
  
  return {
    props: { publicData }
  }
}

export default function Page({ publicData }) {
  // Fetch private data on client
  const [privateData, setPrivateData] = useState(null)
  
  useEffect(() => {
    fetch('/api/private-data').then(res => res.json()).then(setPrivateData)
  }, [])
  
  return (
    <div>
      <h1>{publicData.title}</h1>
      {privateData && <div>Private: {privateData.info}</div>}
    </div>
  )
}

// Next.js 13+ App Router - Server Components
// app/page.tsx (Server Component by default)
async function Page() {
  // Fetch directly in component (server-side)
  const data = await fetch('https://api.example.com/data')
  const posts = await data.json()
  
  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>{post.title}</article>
      ))}
    </div>
  )
}

// App Router - Client Component (opt-in)
'use client'  // Mark as client component

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}

// App Router - Dynamic Routes with generateStaticParams
// app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = await fetchPosts()
  
  return posts.map(post => ({
    slug: post.slug
  }))
}

async function BlogPost({ params }) {
  const post = await fetchPost(params.slug)
  
  return (
    <article>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
    </article>
  )
}

// App Router - Revalidation
// app/products/page.tsx
export const revalidate = 60  // Revalidate every 60 seconds

async function Products() {
  const products = await fetchProducts()
  
  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  )
}

// Decision Tree for Choosing Strategy:
// 
// Can it be pre-rendered? 
//   Yes → Is data static?
//     Yes → SSG ✅
//     No → Updates frequently?
//       Yes → ISR ✅
//       No → SSG with revalidate ✅
//   No → Needs user data?
//     Yes → SSR + CSR ✅
//     No → SSR ✅`}
      </pre>

      <div style={{ marginTop: '15px', padding: '10px', background: '#3a3510', color: '#f0e68c', borderRadius: '5px' }}>
        <strong>Interview Tip:</strong> Emphasize that SSG is fastest and should be default choice. ISR combines benefits of SSG and SSR. Mention fallback modes in getStaticPaths. Discuss App Router's server components as the future.
      </div>
    </div>
  )
}

// ============================================================================
// Q3: Data Fetching in Next.js
// ============================================================================
function Section3_DataFetching() {
  return (
    <div style={{ marginBottom: '40px', padding: '20px', border: '2px solid #61dafb', borderRadius: '8px' }}>
      <h2>Q3: How does data fetching work in Next.js?</h2>
      
      <div style={{ background: '#1e1e1e', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
        <h3>Answer:</h3>
        <p>Next.js provides multiple data fetching methods depending on the rendering strategy.</p>
        
        <h4>Pages Router Methods:</h4>
        <ul>
          <li><strong>getStaticProps</strong> - Fetch data at build time (SSG)</li>
          <li><strong>getServerSideProps</strong> - Fetch data on each request (SSR)</li>
          <li><strong>getStaticPaths</strong> - Define dynamic routes for SSG</li>
        </ul>

        <h4>App Router Methods:</h4>
        <ul>
          <li><strong>fetch()</strong> - Native fetch in server components</li>
          <li><strong>SWR/React Query</strong> - Client-side data fetching</li>
        </ul>
      </div>

      <pre style={{ background: '#282c34', color: '#61dafb', padding: '15px', borderRadius: '5px', overflow: 'auto' }}>
{`// Pages Router - getStaticProps
export async function getStaticProps(context) {
  const { params, preview, previewData } = context
  
  // Fetch from API
  const res = await fetch('https://api.example.com/posts')
  const posts = await res.json()
  
  // Read from file system
  const fs = require('fs')
  const content = fs.readFileSync('data.json', 'utf8')
  
  // Query database
  const users = await db.users.findMany()
  
  return {
    props: {
      posts,
      users
    },
    revalidate: 60  // ISR: Revalidate every 60 seconds
  }
}

// Pages Router - getServerSideProps
export async function getServerSideProps(context) {
  const { req, res, query, params } = context
  
  // Access cookies
  const token = req.cookies.token
  
  // Set custom headers
  res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59')
  
  // Fetch user-specific data
  const userData = await fetchUserData(token)
  
  // Redirect if not authenticated
  if (!userData) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }
  
  // Return 404
  if (!userData) {
    return {
      notFound: true
    }
  }
  
  return {
    props: {
      user: userData
    }
  }
}

// Pages Router - getStaticPaths
export async function getStaticPaths() {
  const posts = await fetchAllPosts()
  
  const paths = posts.map(post => ({
    params: { 
      id: post.id.toString(),
      slug: post.slug
    }
  }))
  
  return {
    paths,
    fallback: false
    // fallback: false - 404 for paths not returned
    // fallback: true - Generate page on first request (show loading)
    // fallback: 'blocking' - SSR on first request (no loading state)
  }
}

export async function getStaticProps({ params }) {
  const post = await fetchPost(params.id)
  
  return {
    props: { post }
  }
}

// App Router - Server Component (Async)
// app/posts/page.tsx
async function PostsPage() {
  // Fetch directly in component
  const res = await fetch('https://api.example.com/posts', {
    next: { revalidate: 60 }  // ISR
  })
  const posts = await res.json()
  
  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>{post.title}</article>
      ))}
    </div>
  )
}

// App Router - Parallel Data Fetching
async function Page() {
  // Fetch in parallel
  const [posts, users, comments] = await Promise.all([
    fetchPosts(),
    fetchUsers(),
    fetchComments()
  ])
  
  return (
    <div>
      <Posts data={posts} />
      <Users data={users} />
      <Comments data={comments} />
    </div>
  )
}

// App Router - Sequential Data Fetching
async function Page() {
  const user = await fetchUser()
  const posts = await fetchUserPosts(user.id)  // Depends on user
  const comments = await fetchPostComments(posts[0].id)  // Depends on posts
  
  return <div>{/* ... */}</div>
}

// App Router - Caching Options
fetch('https://api.example.com/data', {
  // Force cache (default for GET)
  cache: 'force-cache'
})

fetch('https://api.example.com/data', {
  // No caching
  cache: 'no-store'
})

fetch('https://api.example.com/data', {
  // ISR - Revalidate every 60 seconds
  next: { revalidate: 60 }
})

fetch('https://api.example.com/data', {
  // Tag-based revalidation
  next: { tags: ['posts'] }
})

// Revalidate by tag
import { revalidateTag } from 'next/cache'

export async function POST(request: Request) {
  // Trigger revalidation for all fetches with 'posts' tag
  revalidateTag('posts')
  return Response.json({ revalidated: true })
}

// App Router - Loading States
// app/posts/loading.tsx
export default function Loading() {
  return <div>Loading posts...</div>
}

// App Router - Error Handling
// app/posts/error.tsx
'use client'

export default function Error({
  error,
  reset
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  )
}

// Client-Side Fetching with SWR
import useSWR from 'swr'

function Profile() {
  const { data, error, isLoading } = useSWR('/api/user', fetcher)
  
  if (error) return <div>Failed to load</div>
  if (isLoading) return <div>Loading...</div>
  
  return <div>Hello {data.name}!</div>
}

// Client-Side Fetching with React Query
import { useQuery } from '@tanstack/react-query'

function Posts() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts
  })
  
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  
  return (
    <div>
      {data.map(post => (
        <article key={post.id}>{post.title}</article>
      ))}
    </div>
  )
}

// API Routes
// pages/api/posts.ts
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const posts = await db.posts.findMany()
    res.status(200).json(posts)
  } else if (req.method === 'POST') {
    const newPost = await db.posts.create({
      data: req.body
    })
    res.status(201).json(newPost)
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}

// App Router - Route Handlers
// app/api/posts/route.ts
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const posts = await db.posts.findMany()
  return NextResponse.json(posts)
}

export async function POST(request: Request) {
  const body = await request.json()
  const newPost = await db.posts.create({ data: body })
  return NextResponse.json(newPost, { status: 201 })
}

// Dynamic API Routes
// app/api/posts/[id]/route.ts
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const post = await db.posts.findUnique({
    where: { id: params.id }
  })
  
  if (!post) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  
  return NextResponse.json(post)
}`}
      </pre>

      <div style={{ marginTop: '15px', padding: '10px', background: '#3a3510', color: '#f0e68c', borderRadius: '5px' }}>
        <strong>Interview Tip:</strong> Mention that getStaticProps runs at build time only. getServerSideProps runs on every request. App Router's fetch() with caching options is more flexible. Discuss trade-offs between server and client fetching.
      </div>
    </div>
  )
}

// ============================================================================
// Q4: Routing and Navigation
// ============================================================================
function Section4_RoutingAndNavigation() {
  const [showCode, setShowCode] = useState(false)

  return (
    <div style={{ marginBottom: '40px', padding: '20px', border: '2px solid #61dafb', borderRadius: '8px' }}>
      <h2>Q4: How does routing work in Next.js?</h2>
      
      <div style={{ background: '#1e1e1e', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
        <h3>Answer:</h3>
        <p>Next.js uses <strong>file-based routing</strong> - file structure determines routes automatically.</p>
        
        <h4>Key Concepts:</h4>
        <ul>
          <li><strong>Pages Router</strong> - files in /pages directory</li>
          <li><strong>App Router</strong> - files in /app directory (Next.js 13+)</li>
          <li><strong>Dynamic Routes</strong> - [param] syntax</li>
          <li><strong>Catch-all Routes</strong> - [...param] syntax</li>
          <li><strong>Link Component</strong> - Client-side navigation</li>
        </ul>
      </div>

      <h3>Live Demo:</h3>
      <div style={{ background: 'rgba(76, 175, 80, 0.15)', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px', border: '1px solid rgba(76, 175, 80, 0.4)' }}>
        <button 
          onClick={() => setShowCode(!showCode)}
          style={{ padding: '10px 20px', cursor: 'pointer', background: '#4caf50', color: 'white', border: 'none', borderRadius: '5px' }}
        >
          {showCode ? 'Hide' : 'Show'} Routing Examples
        </button>
        {showCode && (
          <div style={{ marginTop: '15px', background: 'rgba(255, 255, 255, 0.05)', padding: '15px', borderRadius: '5px', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
            <p><strong>Current route simulation:</strong> /blog/next-js-routing</p>
            <p><strong>Route params:</strong> {`{ slug: 'next-js-routing' }`}</p>
          </div>
        )}
      </div>

      <pre style={{ background: '#282c34', color: '#61dafb', padding: '15px', borderRadius: '5px', overflow: 'auto' }}>
{`// Pages Router - File Structure to Routes
pages/
  index.tsx              → /
  about.tsx              → /about
  blog/
    index.tsx            → /blog
    [slug].tsx           → /blog/:slug  (dynamic)
    [...slug].tsx        → /blog/* (catch-all)
  api/
    hello.ts             → /api/hello

// Dynamic Route Example
// pages/blog/[slug].tsx
import { useRouter } from 'next/router'

export default function BlogPost() {
  const router = useRouter()
  const { slug } = router.query  // Get slug from URL
  
  return <h1>Post: {slug}</h1>
}
// URL: /blog/my-post → slug = 'my-post'

// Multiple Dynamic Segments
// pages/shop/[category]/[product].tsx
export default function Product() {
  const router = useRouter()
  const { category, product } = router.query
  
  return (
    <div>
      <p>Category: {category}</p>
      <p>Product: {product}</p>
    </div>
  )
}
// URL: /shop/electronics/laptop
// → category = 'electronics', product = 'laptop'

// Catch-all Routes
// pages/docs/[...slug].tsx
export default function Docs() {
  const router = useRouter()
  const { slug } = router.query
  // slug is an array!
  
  return <div>Path: {slug?.join('/')}</div>
}
// URL: /docs/api/reference/hooks
// → slug = ['api', 'reference', 'hooks']

// Optional Catch-all Routes
// pages/docs/[[...slug]].tsx
// Matches /docs AND /docs/any/path

// Link Component (Client-side navigation)
import Link from 'next/link'

function Navigation() {
  return (
    <nav>
      {/* Basic link */}
      <Link href="/">Home</Link>
      
      {/* Link with dynamic route */}
      <Link href="/blog/my-post">Blog Post</Link>
      
      {/* Link with object */}
      <Link href={{
        pathname: '/blog/[slug]',
        query: { slug: 'my-post' }
      }}>
        Blog Post
      </Link>
      
      {/* External link (opens in new tab) */}
      <Link href="https://example.com" target="_blank" rel="noopener">
        External
      </Link>
      
      {/* Prefetch disabled (default: true) */}
      <Link href="/about" prefetch={false}>About</Link>
      
      {/* Replace instead of push */}
      <Link href="/login" replace>Login</Link>
    </nav>
  )
}

// Programmatic Navigation
import { useRouter } from 'next/router'

function LoginButton() {
  const router = useRouter()
  
  const handleLogin = async () => {
    await login()
    
    // Navigate to dashboard
    router.push('/dashboard')
    
    // Navigate with query params
    router.push({
      pathname: '/search',
      query: { q: 'next.js' }
    })
    
    // Replace (don't add to history)
    router.replace('/dashboard')
    
    // Go back
    router.back()
    
    // Reload current route
    router.reload()
  }
  
  return <button onClick={handleLogin}>Login</button>
}

// App Router - File Structure
app/
  page.tsx               → /
  layout.tsx             → Root layout
  about/
    page.tsx             → /about
  blog/
    page.tsx             → /blog
    [slug]/
      page.tsx           → /blog/:slug
  shop/
    [category]/
      [product]/
        page.tsx         → /shop/:category/:product

// App Router - Layout (Shared UI)
// app/layout.tsx
export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
        </nav>
        {children}  {/* Pages render here */}
        <footer>Footer</footer>
      </body>
    </html>
  )
}

// App Router - Nested Layouts
// app/blog/layout.tsx
export default function BlogLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <aside>Blog Sidebar</aside>
      <main>{children}</main>
    </div>
  )
}

// App Router - Dynamic Route
// app/blog/[slug]/page.tsx
export default function BlogPost({
  params
}: {
  params: { slug: string }
}) {
  return <h1>Post: {params.slug}</h1>
}

// App Router - Navigation
'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'

function Component() {
  const router = useRouter()
  const pathname = usePathname()  // Current path
  const searchParams = useSearchParams()  // Query params
  
  // Get query param
  const query = searchParams.get('q')
  
  // Navigate
  router.push('/dashboard')
  router.replace('/login')
  router.back()
  router.forward()
  router.refresh()  // Refresh server components
  
  return null
}

// App Router - Parallel Routes
app/
  @analytics/
    page.tsx
  @team/
    page.tsx
  layout.tsx
  page.tsx

// app/layout.tsx
export default function Layout({
  children,
  analytics,
  team
}: {
  children: React.ReactNode
  analytics: React.ReactNode
  team: React.ReactNode
}) {
  return (
    <>
      {children}
      {analytics}
      {team}
    </>
  )
}

// App Router - Intercepting Routes
app/
  @modal/
    (..)photo/
      [id]/
        page.tsx
  photo/
    [id]/
      page.tsx

// App Router - Route Groups (don't affect URL)
app/
  (marketing)/
    about/
      page.tsx         → /about
    contact/
      page.tsx         → /contact
  (shop)/
    products/
      page.tsx         → /products
    cart/
      page.tsx         → /cart

// Middleware (Pages & App Router)
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check authentication
  const token = request.cookies.get('token')
  
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  // Add custom header
  const response = NextResponse.next()
  response.headers.set('x-custom-header', 'value')
  return response
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*']
}`}
      </pre>

      <div style={{ marginTop: '15px', padding: '10px', background: '#3a3510', color: '#f0e68c', borderRadius: '5px' }}>
        <strong>Interview Tip:</strong> Emphasize file-based routing simplicity - no react-router config needed. Mention Link prefetching for better performance. Discuss layouts in App Router for shared UI.
      </div>
    </div>
  )
}

// ============================================================================
// Q5: Next.js 13+ Features (App Router)
// ============================================================================
function Section5_NextJS13Features() {
  return (
    <div style={{ marginBottom: '40px', padding: '20px', border: '2px solid #61dafb', borderRadius: '8px' }}>
      <h2>Q5: What are the new features in Next.js 13+?</h2>
      
      <div style={{ background: '#1e1e1e', color: 'var(--text-primary)', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
        <h3>Answer:</h3>
        <p>Next.js 13+ introduced the <strong>App Router</strong> with server components, improved routing, and better data fetching.</p>
        
        <h4>Major New Features:</h4>
        <ul>
          <li>✅ <strong>App Router</strong> - New routing system</li>
          <li>✅ <strong>Server Components</strong> - Components that run only on server</li>
          <li>✅ <strong>Streaming</strong> - Progressive rendering</li>
          <li>✅ <strong>Server Actions</strong> - Mutations without API routes</li>
          <li>✅ <strong>Turbopack</strong> - Faster bundler (beta)</li>
          <li>✅ <strong>Improved Metadata API</strong> - Better SEO</li>
        </ul>
      </div>

      <pre style={{ background: '#282c34', color: '#61dafb', padding: '15px', borderRadius: '5px', overflow: 'auto' }}>
{`// Server Components (Default in App Router)
// app/page.tsx - Runs ONLY on server
async function Page() {
  // Can access database directly!
  const posts = await db.posts.findMany()
  
  // Can use server-only packages
  const fs = require('fs')
  const data = fs.readFileSync('data.txt', 'utf8')
  
  // Can access environment variables safely
  const apiKey = process.env.SECRET_API_KEY
  
  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>{post.title}</article>
      ))}
    </div>
  )
}

// Benefits of Server Components:
// - Smaller bundle size (code stays on server)
// - Direct database access
// - Better security (API keys not exposed)
// - Automatic code splitting

// Client Components (opt-in with 'use client')
'use client'

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  )
}

// When to use Client Components:
// - Need useState, useEffect, or other hooks
// - Event listeners (onClick, onChange, etc.)
// - Browser APIs (localStorage, window, etc.)
// - Third-party libraries that use React hooks

// Composing Server and Client Components
// app/page.tsx (Server Component)
import ClientCounter from './ClientCounter'

async function Page() {
  const data = await fetchData()  // Server-side
  
  return (
    <div>
      <h1>{data.title}</h1>
      <ClientCounter />  {/* Client component nested */}
    </div>
  )
}

// Server Actions (Mutations without API routes!)
// app/actions.ts
'use server'

export async function createPost(formData: FormData) {
  const title = formData.get('title')
  const content = formData.get('content')
  
  const post = await db.posts.create({
    data: { title, content }
  })
  
  revalidatePath('/posts')  // Revalidate posts page
  return post
}

// app/new-post/page.tsx
import { createPost } from '../actions'

export default function NewPost() {
  return (
    <form action={createPost}>
      <input name="title" />
      <textarea name="content" />
      <button type="submit">Create Post</button>
    </form>
  )
}

// With Client Component
'use client'

import { createPost } from '../actions'

export default function NewPost() {
  const [isPending, startTransition] = useTransition()
  
  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      await createPost(formData)
      // Show success message
    })
  }
  
  return (
    <form action={handleSubmit}>
      <input name="title" />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Creating...' : 'Create Post'}
      </button>
    </form>
  )
}

// Streaming with Suspense
// app/page.tsx
import { Suspense } from 'react'

function SlowComponent() {
  // Simulate slow data fetch
  const data = await fetchSlowData()  // 3 seconds
  return <div>{data}</div>
}

export default function Page() {
  return (
    <div>
      <h1>Fast Content (shows immediately)</h1>
      
      <Suspense fallback={<div>Loading slow content...</div>}>
        <SlowComponent />  {/* Streams in when ready */}
      </Suspense>
    </div>
  )
}

// Parallel Streaming
export default function Page() {
  return (
    <div>
      <Suspense fallback={<div>Loading posts...</div>}>
        <Posts />
      </Suspense>
      
      <Suspense fallback={<div>Loading comments...</div>}>
        <Comments />
      </Suspense>
    </div>
  )
}
// Both load in parallel, stream when ready!

// Metadata API
// app/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Page',
  description: 'This is my page',
  openGraph: {
    title: 'My Page',
    description: 'This is my page',
    images: ['/og-image.jpg']
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My Page',
    description: 'This is my page'
  }
}

// Dynamic Metadata
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await fetchPost(params.id)
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      images: [post.image]
    }
  }
}

// Loading UI
// app/posts/loading.tsx
export default function Loading() {
  return (
    <div>
      <div className="skeleton" />
      <div className="skeleton" />
      <div className="skeleton" />
    </div>
  )
}

// Error Handling
// app/posts/error.tsx
'use client'

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  )
}

// Not Found Page
// app/posts/not-found.tsx
export default function NotFound() {
  return (
    <div>
      <h2>Post Not Found</h2>
      <p>The post you're looking for doesn't exist.</p>
    </div>
  )
}

// Route Handlers (API Routes in App Router)
// app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('query')
  
  const posts = await db.posts.findMany({
    where: { title: { contains: query } }
  })
  
  return NextResponse.json(posts)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const post = await db.posts.create({ data: body })
  
  return NextResponse.json(post, { status: 201 })
}

// Partial Prerendering (Experimental)
// Combines static and dynamic rendering in same page
export const experimental_ppr = true

export default async function Page() {
  return (
    <div>
      {/* Static shell (cached) */}
      <header>Static Header</header>
      
      {/* Dynamic content (on-demand) */}
      <Suspense fallback={<div>Loading...</div>}>
        <DynamicContent />
      </Suspense>
    </div>
  )
}

// Comparison: Pages Router vs App Router
// Pages Router               App Router
// -------------------        -------------------
// pages/                     app/
// getStaticProps            fetch() in components
// getServerSideProps        Server components
// Client-side by default    Server-side by default
// _app.tsx, _document.tsx   layout.tsx
// No streaming              Streaming with Suspense
// API routes in pages/api   Route handlers in app/api`}
      </pre>

      <div style={{ marginTop: '15px', padding: '10px', background: '#3a3510', color: '#f0e68c', borderRadius: '5px' }}>
        <strong>Interview Tip:</strong> Emphasize that App Router is the future of Next.js. Server Components reduce bundle size and improve performance. Mention that you can gradually adopt App Router alongside Pages Router.
      </div>
    </div>
  )
}
