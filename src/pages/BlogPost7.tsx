import React from 'react';

const BlogPost7: React.FC = () => {
  return (
    <div className="blog-post-container">
      <article className="blog-post">
        <header className="blog-post-header">
          <h1 className="blog-post-title">Building Real-Time Collaborative Editing with Y.js, WebSockets, and Tiptap: A Complete Architecture Guide</h1>
          <div className="blog-post-meta">
            <span className="blog-post-date">August 23, 2024</span>
            <span className="blog-post-read-time">14 min read</span>
          </div>
          <div className="blog-post-tags">
            {["JavaScript", "React", "Y.js", "WebSockets", "Tiptap", "CRDT", "Real-time", "Collaboration"].map((tag, index) => (
              <span key={index} className="blog-post-tag">{tag}</span>
            ))}
          </div>
        </header>
        
        <div className="blog-post-content">
          <p className="blog-post-intro">
            Learn how to build a Google Docs-like collaborative editing experience using modern web technologies. Real-time collaborative editing has become an essential feature in modern web applications. Whether you're building a document editor, a note-taking app, or a content management system, users expect to see changes from other collaborators instantly.
          </p>

          <h2>What We'll Build</h2>
          <p>By the end of this article, you'll have a complete understanding of:</p>
          <ul>
            <li><strong>Y.js</strong>: A powerful Conflict-free Replicated Data Type (CRDT) library for real-time collaboration</li>
            <li><strong>WebSocket Server</strong>: A Node.js server that handles real-time synchronization</li>
            <li><strong>Tiptap Editor</strong>: A modern rich-text editor built on ProseMirror with React integration</li>
            <li><strong>User Awareness</strong>: Real-time cursor positions and participant management</li>
          </ul>

          <h2>Architecture Overview</h2>
          <p>Our collaborative editing system consists of three main components:</p>

          <h3>1. Y.js CRDT Layer</h3>
          <ul>
            <li>Handles conflict-free document synchronization</li>
            <li>Manages operational transformations</li>
            <li>Provides automatic conflict resolution</li>
          </ul>

          <h3>2. WebSocket Communication</h3>
          <ul>
            <li>Real-time bidirectional communication</li>
            <li>Low-latency message delivery</li>
            <li>Connection management and recovery</li>
          </ul>

          <h3>3. Rich Text Editor</h3>
          <ul>
            <li>Tiptap editor with collaboration extensions</li>
            <li>User-friendly editing interface</li>
            <li>Real-time cursor tracking</li>
          </ul>

          <h2>Core Technologies</h2>
          
          <h3>Y.js: Conflict-Free Collaborative Editing</h3>
          <p>
            Y.js is a CRDT (Conflict-free Replicated Data Type) implementation that allows multiple users to edit the same document simultaneously without conflicts. It automatically merges changes and ensures all users see a consistent state.
          </p>
          
          <h4>Key Benefits:</h4>
          <ul>
            <li><strong>Offline-first</strong>: Works without constant server connection</li>
            <li><strong>Conflict Resolution</strong>: Automatically resolves editing conflicts</li>
            <li><strong>Performance</strong>: Efficient delta synchronization</li>
            <li><strong>Scalability</strong>: Handles thousands of concurrent users</li>
          </ul>

          <h3>WebSockets: Real-Time Communication</h3>
          <p>
            WebSockets provide full-duplex communication between the client and server, enabling instant synchronization of document changes and user awareness data.
          </p>

          <h3>Tiptap: Modern Rich Text Editor</h3>
          <p>
            Tiptap is a headless rich text editor built on ProseMirror, offering excellent integration with Y.js for collaborative editing.
          </p>

          <h2>Step 1: Setting Up the Y.js WebSocket Server</h2>
          <p>First, let's create our WebSocket server that will coordinate collaboration between clients.</p>

          <h3>Server Dependencies</h3>
          <pre><code>{`{
  "dependencies": {
    "ws": "^8.18.3",
    "y-websocket": "^1.5.4",
    "yjs": "^13.6.27",
    "y-protocols": "^1.0.6"
  }
}`}</code></pre>

          <h3>WebSocket Server Implementation</h3>
          <pre><code>{`const http = require('http')
const WebSocket = require('ws')
const Y = require('yjs')
const { setupWSConnection } = require('y-websocket/bin/utils')
const config = require('./config.js')

console.log('🚀 Starting Y.js WebSocket server...')

// Create HTTP server
const server = http.createServer()

// Create WebSocket server
const wss = new WebSocket.Server({ server })

let connectionCount = 0
const docs = new Map() // Store Y.js documents for logging

// Helper function to log Y.js updates in human readable format
const logYjsUpdate = (docName, update, origin, doc) => {
  console.log('🔄 Y.js Document Update')
  console.log('  📄 Document:', docName)
  console.log('  🔀 Origin:', origin || 'unknown')
  console.log('  📊 Update size:', update.length, 'bytes')

  try {
    const decodedUpdate = Y.decodeUpdate(update)
    console.log('  📝 Update info:')
    console.log('    📊 Structs:', decodedUpdate.structs?.length || 0)
    console.log('    🗑️  DeleteSet:', decodedUpdate.ds ? Object.keys(decodedUpdate.ds.clients).length : 0, 'clients')

    // Log document content if available
    if (doc) {
      const xmlText = doc.getText('prosemirror')
      const content = xmlText.toString()
      console.log('  📖 Document content:', content.slice(0, 100) + (content.length > 100 ? '...' : ''))
    }
  } catch (error) {
    console.log('  🔢 Update (hex):', Array.from(update).map(b => b.toString(16).padStart(2, '0')).join(' '))
  }

  console.log('  ⏰ Time:', new Date().toISOString())
}

// Handle WebSocket connections
wss.on('connection', (ws, req) => {
  connectionCount++
  const connId = connectionCount

  console.log('🔌 New WebSocket connection #' + connId)
  console.log('  📄 URL:', req.url)
  console.log('  👥 Total connections:', wss.clients.size)

  // Extract document name from URL
  const docName = req.url?.slice(1) || 'default'

  // Use the official y-websocket utility to handle the connection
  setupWSConnection(ws, req)

  // Hook into document updates for logging
  setTimeout(() => {
    try {
      if (ws.doc && !docs.has(docName)) {
        const doc = ws.doc
        docs.set(docName, doc)

        console.log('📊 Y.js Document "' + docName + '" connected for logging')

        // Set up update listener for this document
        doc.on('update', (update, origin) => {
          logYjsUpdate(docName, update, origin, doc)
        })

        console.log('✅ Update logging enabled for document:', docName)
      }
    } catch (error) {
      console.log('❌ Error setting up document logging:', error.message)
    }
  }, 100)

  // Handle connection close
  ws.on('close', (code, reason) => {
    console.log('❌ Connection #' + connId + ' closed')
    console.log('  👥 Remaining connections:', wss.clients.size)
  })

  ws.on('error', (error) => {
    console.error('🚨 WebSocket error on connection #' + connId + ':', error.message)
  })
})

// Start the server
server.listen(config.port, '0.0.0.0', () => {
  console.log('🎯 Y.js WebSocket server running on port ' + config.port)
  console.log('🔗 Local access: ws://localhost:' + config.port)
  console.log('📚 Document URLs: ws://localhost:' + config.port + '/doc-NAME')
})

// Health check endpoint
server.on('request', (req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({
      status: 'ok',
      connections: wss.clients.size,
      uptime: process.uptime()
    }))
  } else {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('Y.js WebSocket Server - Ready for connections')
  }
})

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\\n🛑 Shutting down server...')
  wss.clients.forEach((ws) => ws.terminate())
  server.close(() => {
    console.log('✅ Server closed')
    process.exit(0)
  })
})`}</code></pre>

          <h4>Key Server Features:</h4>
          <ul>
            <li><strong>Document Isolation</strong>: Each document is identified by URL path</li>
            <li><strong>Connection Management</strong>: Tracks active connections and handles cleanup</li>
            <li><strong>Update Logging</strong>: Provides detailed logging of Y.js operations</li>
            <li><strong>Health Monitoring</strong>: Built-in health check endpoint</li>
            <li><strong>Graceful Shutdown</strong>: Proper cleanup on server termination</li>
          </ul>

          <h2>Step 2: Building the React Client with Tiptap</h2>
          <p>Now let's build the client-side application that connects to our Y.js server.</p>

          <h3>Client Dependencies</h3>
          <pre><code>{`{
  "dependencies": {
    "@tiptap/react": "^3.2.2",
    "@tiptap/starter-kit": "^3.2.2",
    "@tiptap/extension-collaboration": "^3.2.2",
    "@tiptap/extension-collaboration-caret": "^3.2.2",
    "y-websocket": "^3.0.0",
    "yjs": "^13.6.27",
    "react": "^19.1.1",
    "bootstrap": "^5.3.7",
    "axios": "^1.11.0"
  }
}`}</code></pre>

          <h3>Main Editor Component</h3>
          <pre><code>{`import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { Container, Row, Col, Alert, Button } from 'react-bootstrap';
import { WebsocketProvider } from 'y-websocket';
import { Doc } from 'yjs';
import Collaboration from '@tiptap/extension-collaboration';

// Import Tiptap extensions
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Heading from '@tiptap/extension-heading';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';

interface Participant {
  clientID: string;
  displayname: string;
  displaycolor: string;
  thumbnail: string;
  cursor?: { from: number; to: number };
  focused?: boolean;
}

const TiptapEditor: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [participants, setParticipants] = useState<{ [key: string]: Participant }>({});
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<string>('Connecting...');
  const [yDoc, setYDoc] = useState<Doc | null>(null);
  const providerRef = useRef<WebsocketProvider | null>(null);

  // Generate random color for user
  const getDisplayColor = useCallback((str: string): string => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let colour = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xFF;
      colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
  }, []);

  // Initialize Y.Doc and WebSocket Provider
  useEffect(() => {
    console.log('🚀 Initializing Y.js collaboration...');

    // Create Y.Doc instance
    const newYDoc = new Doc();
    setYDoc(newYDoc);

    // Get server configuration
    const socketHost = process.env.REACT_APP_SOCKETSERVER_HOST || 'localhost';
    const socketPort = process.env.REACT_APP_SOCKETSERVER_PORT || '8000';

    // Create WebSocket URL for Y.js
    const wsUrl = \`ws://\${socketHost}:\${socketPort}\`;
    console.log('🔗 Connecting Y.js WebSocket to:', wsUrl);

    // Create WebSocket provider
    const provider = new WebsocketProvider(wsUrl, 'doc-99', newYDoc);
    providerRef.current = provider;

    // Set up provider event listeners
    provider.on('status', ({ status }: { status: string }) => {
      console.log('📡 Y.js Provider status:', status);
      setIsConnected(status === 'connected');
      setConnectionStatus(status === 'connected' ? 'Connected' : status);
    });

    provider.on('sync', (isSynced: boolean) => {
      console.log('🔄 Y.js Provider sync:', isSynced ? 'synced' : 'syncing');
      if (isSynced) {
        setConnectionStatus('Synced');
        setLoading(false);
      }
    });

    // Load user data from API
    const loadUserData = async () => {
      try {
        const response = await axios.get('https://randomuser.me/api/');
        const user = response.data.results[0];
        const newUserData = {
          displayname: \`\${user.name.first} \${user.name.last}\`,
          displaycolor: getDisplayColor(provider.awareness.clientID.toString()),
          thumbnail: user.picture.thumbnail
        };
        setUserData(newUserData);
        // Set user awareness data
        provider.awareness.setLocalStateField('user', newUserData);
      } catch (error) {
        console.error('❌ Error loading user data:', error);
        // Fallback user data
        const fallbackUserData = {
          displayname: 'Anonymous User',
          displaycolor: getDisplayColor(provider.awareness.clientID.toString()),
          thumbnail: 'https://via.placeholder.com/50'
        };
        setUserData(fallbackUserData);
        provider.awareness.setLocalStateField('user', fallbackUserData);
      }
    };

    loadUserData();

    // Set up awareness change listener for participants
    const handleAwarenessChange = () => {
      const awarenessStates = provider.awareness.getStates();
      const newParticipants: { [key: string]: Participant } = {};

      awarenessStates.forEach((state, clientId) => {
        if (state.user && clientId !== provider.awareness.clientID) {
          newParticipants[clientId.toString()] = {
            clientID: clientId.toString(),
            displayname: state.user.displayname,
            displaycolor: state.user.displaycolor,
            thumbnail: state.user.thumbnail,
            cursor: state.cursor,
            focused: state.focused
          };
        }
      });

      setParticipants(newParticipants);
    };

    provider.awareness.on('change', handleAwarenessChange);

    // Cleanup function
    return () => {
      console.log('🧹 Cleaning up Y.js provider...');
      provider.awareness.off('change', handleAwarenessChange);
      provider.destroy();
      newYDoc.destroy();
    };
  }, [getDisplayColor]);

  // Initialize Tiptap editor with Y.js Collaboration
  const editor = useEditor({
    extensions: [
      // Core extensions (excluding History for Y.js compatibility)
      Document,
      Paragraph,
      Text,
      Bold,
      Italic,
      Heading,
      BulletList,
      OrderedList,
      ListItem,
      ...(yDoc ? [
        Collaboration.configure({
          document: yDoc,
        }),
      ] : []),
    ],
    content: '',
    onCreate: ({ editor }) => {
      console.log('🎉 Tiptap Editor with Y.js Collaboration Created!');

      // Set initial content only once when document is empty
      setTimeout(() => {
        if (editor.isEmpty && yDoc) {
          editor.commands.setContent(\`
            <p>Welcome to the Tiptap React Editor with Y.js Collaboration!</p>
            <p>Start typing to test real-time collaborative editing.</p>
          \`);
        }
      }, 100);
    },
    onUpdate: ({ editor }) => {
      // Update cursor position for awareness
      if (providerRef.current && !editor.isDestroyed) {
        const { from, to } = editor.state.selection;
        providerRef.current.awareness.setLocalStateField('cursor', { from, to });
      }
    },
    onSelectionUpdate: ({ editor }) => {
      // Update cursor position for other users
      if (providerRef.current && !editor.isDestroyed) {
        const { from, to } = editor.state.selection;
        providerRef.current.awareness.setLocalStateField('cursor', { from, to });
      }
    },
    onFocus: () => {
      if (providerRef.current) {
        providerRef.current.awareness.setLocalStateField('focused', true);
      }
    },
    onBlur: () => {
      if (providerRef.current) {
        providerRef.current.awareness.setLocalStateField('focused', false);
      }
    },
  }, [yDoc, userData]);

  return (
    <Container fluid className="mt-3">
      <Row>
        <Col md={8}>
          <h2>Collaborative Tiptap Editor (Y.js)</h2>

          {/* Connection Status */}
          {!isConnected && (
            <Alert variant="warning" className="mb-3">
              <Alert.Heading>🔄 {connectionStatus}</Alert.Heading>
              <p>Setting up collaborative editing with Y.js...</p>
            </Alert>
          )}
          {isConnected && (
            <Alert variant="success" className="mb-3">
              <Alert.Heading>✅ Connected</Alert.Heading>
              <p>Real-time collaboration is active!</p>
              <small>Status: {connectionStatus} | Active Users: {Object.keys(participants).length + 1}</small>
            </Alert>
          )}

          {/* Editor */}
          {yDoc ? (
            <div className="border rounded">
              <EditorContent editor={editor} />
            </div>
          ) : (
            <div className="border rounded d-flex align-items-center justify-content-center" style={{ minHeight: '200px' }}>
              <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2 mb-0">Initializing Y.js collaboration...</p>
              </div>
            </div>
          )}
        </Col>

        <Col md={4}>
          <ParticipantsList
            participants={participants}
            myClientID={providerRef.current?.awareness.clientID.toString() || ''}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default TiptapEditor;`}</code></pre>

          <h2>Step 3: Implementing User Awareness and Cursors</h2>
          <p>One of the most impressive features of collaborative editing is seeing where other users are working in real-time.</p>

          <h3>Collaboration Cursors Component</h3>
          <pre><code>{`import React, { useEffect, useState } from 'react';

interface Participant {
  clientID: string;
  displayname: string;
  displaycolor: string;
  cursor?: { from: number; to: number };
  focused?: boolean;
}

interface CollaborationCursorsProps {
  editor: any;
  participants: Participant[];
  myClientID?: string;
}

interface CursorPosition {
  x: number;
  y: number;
  height: number;
}

const CollaborationCursors: React.FC<CollaborationCursorsProps> = ({
  editor,
  participants,
  myClientID
}) => {
  const [cursors, setCursors] = useState<Record<string, CursorPosition & Participant>>({});

  useEffect(() => {
    if (!editor || !participants) return;

    const updateCursors = () => {
      const newCursors: Record<string, CursorPosition & Participant> = {};

      participants.forEach(participant => {
        // Skip current user and users without cursor data
        if (participant.clientID === myClientID || !participant.cursor || !participant.focused) {
          return;
        }

        try {
          // Get DOM coordinates for cursor position
          const coords = editor.view.coordsAtPos(participant.cursor.from);
          if (coords) {
            newCursors[participant.clientID] = {
              ...participant,
              x: coords.left,
              y: coords.top,
              height: coords.bottom - coords.top,
            };
          }
        } catch (error) {
          // Position might be invalid, skip this cursor
          console.debug('Could not get cursor position for', participant.displayname);
        }
      });

      setCursors(newCursors);
    };

    // Update cursors on editor updates
    const handleUpdate = () => {
      setTimeout(updateCursors, 0); // Defer to next tick
    };

    editor.on('update', handleUpdate);
    editor.on('selectionUpdate', handleUpdate);

    // Initial update
    updateCursors();

    return () => {
      editor.off('update', handleUpdate);
      editor.off('selectionUpdate', handleUpdate);
    };
  }, [editor, participants, myClientID]);

  return (
    <div className="collaboration-cursors-overlay" style={{ position: 'relative', pointerEvents: 'none' }}>
      {Object.values(cursors).map(cursor => (
        <div
          key={cursor.clientID}
          className="collaboration-cursor"
          style={{
            position: 'fixed',
            left: cursor.x + 'px',
            top: cursor.y + 'px',
            height: cursor.height + 'px',
            zIndex: 1000,
            pointerEvents: 'none',
          }}
        >
          {/* Cursor line */}
          <div
            style={{
              width: '2px',
              height: '100%',
              backgroundColor: cursor.displaycolor,
              animation: 'cursor-blink 1s infinite',
            }}
          />
          {/* User label */}
          <div
            style={{
              position: 'absolute',
              top: '-25px',
              left: '4px',
              backgroundColor: cursor.displaycolor,
              color: 'white',
              padding: '2px 6px',
              borderRadius: '3px',
              fontSize: '11px',
              fontWeight: '600',
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            }}
          >
            {cursor.displayname}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CollaborationCursors;`}</code></pre>

          <h3>CSS for Cursor Animation</h3>
          <pre><code>{`@keyframes cursor-blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0.3; }
}

.collaboration-cursor {
  transition: all 0.1s ease-in-out;
}`}</code></pre>

          <h2>Understanding the Data Flow</h2>
          <p>Let's trace how changes flow through our collaborative editing system:</p>

          <h3>1. User Types in Editor</h3>
          <p>User Input → Tiptap Editor → ProseMirror Document → Y.js Document</p>

          <h3>2. Y.js Synchronization</h3>
          <p>Y.js Document → Y.js Update → WebSocket → Y.js Server → Other Clients</p>

          <h3>3. Remote Changes</h3>
          <p>WebSocket Message → Y.js Document → ProseMirror Document → Tiptap Editor → UI Update</p>

          <h3>4. Awareness Data Flow</h3>
          <p>Cursor Position → Y.js Awareness → WebSocket → Other Clients → Cursor Visualization</p>

          <h2>Key Implementation Details</h2>
          
          <h3>Y.js Configuration</h3>
          <p>Important: When using Y.js with Tiptap, exclude the History extension:</p>
          <pre><code>{`// ❌ Don't include History extension
import { History } from '@tiptap/extension-history'

// ✅ Y.js handles history automatically
extensions: [
  // ... other extensions
  Collaboration.configure({
    document: yDoc,
  }),
  // Don't add History extension
]`}</code></pre>

          <h3>Connection Management</h3>
          <pre><code>{`// Monitor connection status
provider.on('status', ({ status }) => {
  setIsConnected(status === 'connected');
  setConnectionStatus(status);
});

// Handle sync events
provider.on('sync', (isSynced) => {
  if (isSynced) {
    setLoading(false);
  }
});`}</code></pre>

          <h2>Performance Optimizations</h2>
          
          <h3>1. Debounce Awareness Updates</h3>
          <pre><code>{`const debouncedAwarenessUpdate = useMemo(
  () => debounce((cursor) => {
    provider.awareness.setLocalStateField('cursor', cursor);
  }, 50),
  [provider]
);`}</code></pre>

          <h3>2. Efficient Cursor Rendering</h3>
          <pre><code>{`// Only update cursors when necessary
useEffect(() => {
  const updateCursors = () => {
    // Only process visible cursors
    participants
      .filter(p => p.focused && p.cursor)
      .forEach(updateCursorPosition);
  };

  // Throttle cursor updates
  const throttledUpdate = throttle(updateCursors, 16); // 60fps

  editor.on('selectionUpdate', throttledUpdate);
  return () => editor.off('selectionUpdate', throttledUpdate);
}, [editor, participants]);`}</code></pre>

          <h2>Production Considerations</h2>
          
          <h3>1. Persistence</h3>
          <p>Y.js documents exist only in memory by default. For production, implement persistence:</p>
          <pre><code>{`const { LeveldbPersistence } = require('y-leveldb');

// Set up persistence
const persistence = new LeveldbPersistence('./db');

wss.on('connection', (ws, req) => {
  const docName = req.url?.slice(1) || 'default';

  setupWSConnection(ws, req, {
    persistence,
    docName,
  });
});`}</code></pre>

          <h3>2. Authentication & Authorization</h3>
          <pre><code>{`wss.on('connection', (ws, req) => {
  // Verify user authentication
  const token = req.headers.authorization;
  if (!verifyToken(token)) {
    ws.close(1008, 'Unauthorized');
    return;
  }

  setupWSConnection(ws, req);
});`}</code></pre>

          <h3>3. Rate Limiting</h3>
          <pre><code>{`const rateLimit = new Map();

wss.on('connection', (ws, req) => {
  const clientIP = req.connection.remoteAddress;

  // Implement rate limiting per IP
  if (exceedsRateLimit(clientIP)) {
    ws.close(1008, 'Rate limit exceeded');
    return;
  }

  setupWSConnection(ws, req);
});`}</code></pre>

          <h2>Troubleshooting Common Issues</h2>
          
          <h3>1. Connection Issues</h3>
          <p>Problem: WebSocket connection fails</p>
          <pre><code>{`// Solution: Add connection retry logic
const connectWithRetry = (maxRetries = 5) => {
  let retries = 0;

  const connect = () => {
    const provider = new WebsocketProvider(wsUrl, docName, yDoc);

    provider.on('status', ({ status }) => {
      if (status === 'disconnected' && retries < maxRetries) {
        retries++;
        setTimeout(() => {
          connect();
        }, Math.pow(2, retries) * 1000); // Exponential backoff
      }
    });
  };

  connect();
};`}</code></pre>

          <h3>2. Document Sync Issues</h3>
          <p>Problem: Documents not syncing properly</p>
          <pre><code>{`// Solution: Force sync after connection
provider.on('status', ({ status }) => {
  if (status === 'connected') {
    // Force document sync
    setTimeout(() => {
      provider.sync();
    }, 100);
  }
});`}</code></pre>

          <h2>Deployment Guide</h2>
          
          <h3>1. Docker Setup</h3>
          <pre><code>{`# Dockerfile for Y.js server
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 8000
CMD ["node", "yjs-server.js"]`}</code></pre>

          <h3>2. Nginx Configuration</h3>
          <pre><code>{`upstream yjs_backend {
    server yjs-server:8000;
}

server {
    listen 80;
    server_name your-domain.com;

    # WebSocket proxy
    location / {
        proxy_pass http://yjs_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # WebSocket timeout
        proxy_read_timeout 86400;
        proxy_send_timeout 86400;
    }
}`}</code></pre>

          <h2>Conclusion</h2>
          <p>
            Building a real-time collaborative editing system with Y.js, WebSockets, and Tiptap provides a robust foundation for modern collaborative applications. The combination offers:
          </p>
          <ul>
            <li>Conflict-free collaboration through Y.js CRDTs</li>
            <li>Real-time synchronization via WebSockets</li>
            <li>Rich editing experience with Tiptap</li>
            <li>User awareness with cursor tracking</li>
            <li>Scalable architecture for production use</li>
          </ul>

          <p>This implementation handles the core challenges of collaborative editing:</p>
          <ul>
            <li>Operational transformation for conflict resolution</li>
            <li>Network partition tolerance with offline-first design</li>
            <li>Real-time updates with minimal latency</li>
            <li>User experience with visual collaboration cues</li>
          </ul>

          <p>
            The system is production-ready with proper error handling, connection management, and performance optimizations. You can extend it further with features like document persistence, user authentication, and advanced collaboration tools.
          </p>

          <h2>Key Takeaways</h2>
          <ul>
            <li>Y.js CRDTs eliminate the complexity of manual conflict resolution</li>
            <li>WebSocket connections provide the real-time communication layer</li>
            <li>Tiptap's collaboration extensions integrate seamlessly with Y.js</li>
            <li>User awareness creates an engaging collaborative experience</li>
            <li>Proper architecture ensures scalability and maintainability</li>
          </ul>

          <p>Ready to build your own collaborative editing application? Start with this foundation and customize it for your specific use case!</p>
        </div>
      </article>
    </div>
  );
};

export default BlogPost7;