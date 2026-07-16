---
title: "Building Real-Time Collaborative Editing with Y.js, WebSockets, and Tiptap"
date: 2025-08-23
readTime: 14 min read
tags: [Y.js, WebSockets, CRDT, Tiptap, React]
draft: false
---
*Learn how to build a Google Docs-like collaborative editing experience using modern web technologies. Real-time collaborative editing has become an essential feature in modern web applications. Whether you're building a document editor, a note-taking app, or a content management system, users expect to see changes from other collaborators instantly.*

## What We'll Build

By the end of this article, you'll have a complete understanding of:

- **Y.js**: A powerful Conflict-free Replicated Data Type (CRDT) library for real-time collaboration
- **WebSocket Server**: A Node.js server that handles real-time synchronization
- **Tiptap Editor**: A modern rich-text editor built on ProseMirror with React integration
- **User Awareness**: Real-time cursor positions and participant management

## Architecture Overview

Our collaborative editing system consists of three main components:

### 1. Y.js CRDT Layer

- Handles conflict-free document synchronization
- Manages operational transformations
- Provides automatic conflict resolution

### 2. WebSocket Communication

- Real-time bidirectional communication
- Low-latency message delivery
- Connection management and recovery

### 3. Rich Text Editor

- Tiptap editor with collaboration extensions
- User-friendly editing interface
- Real-time cursor tracking

## Core Technologies

### Y.js: Conflict-Free Collaborative Editing

Y.js is a CRDT (Conflict-free Replicated Data Type) implementation that allows multiple users to edit the same document simultaneously without conflicts. It automatically merges changes and ensures all users see a consistent state.

#### Key Benefits:

- **Offline-first**: Works without constant server connection
- **Conflict Resolution**: Automatically resolves editing conflicts
- **Performance**: Efficient delta synchronization
- **Scalability**: Handles thousands of concurrent users

### WebSockets: Real-Time Communication

WebSockets provide full-duplex communication between the client and server, enabling instant synchronization of document changes and user awareness data.

### Tiptap: Modern Rich Text Editor

Tiptap is a headless rich text editor built on ProseMirror, offering excellent integration with Y.js for collaborative editing.

## Step 1: Setting Up the Y.js WebSocket Server

First, let's create our WebSocket server that will coordinate collaboration between clients.

### Server Dependencies

```json
{
  "dependencies": {
    "ws": "^8.18.3",
    "y-websocket": "^1.5.4",
    "yjs": "^13.6.27",
    "y-protocols": "^1.0.6"
  }
}
```

### WebSocket Server Implementation

```javascript
const http = require('http')
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
  console.log('\n🛑 Shutting down server...')
  wss.clients.forEach((ws) => ws.terminate())
  server.close(() => {
    console.log('✅ Server closed')
    process.exit(0)
  })
})
```

#### Key Server Features:

- **Document Isolation**: Each document is identified by URL path
- **Connection Management**: Tracks active connections and handles cleanup
- **Update Logging**: Provides detailed logging of Y.js operations
- **Health Monitoring**: Built-in health check endpoint
- **Graceful Shutdown**: Proper cleanup on server termination

## Step 2: Building the React Client with Tiptap

Now let's build the client-side application that connects to our Y.js server.

### Client Dependencies

```json
{
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
}
```

### Main Editor Component

```tsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
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
    const wsUrl = `ws://${socketHost}:${socketPort}`;
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
          displayname: `${user.name.first} ${user.name.last}`,
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
          editor.commands.setContent(`
            <p>Welcome to the Tiptap React Editor with Y.js Collaboration!</p>
            <p>Start typing to test real-time collaborative editing.</p>
          `);
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

export default TiptapEditor;
```

## Step 3: Implementing User Awareness and Cursors

One of the most impressive features of collaborative editing is seeing where other users are working in real-time.

### Collaboration Cursors Component

```tsx
import React, { useEffect, useState } from 'react';

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

export default CollaborationCursors;
```

### CSS for Cursor Animation

```css
@keyframes cursor-blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0.3; }
}

.collaboration-cursor {
  transition: all 0.1s ease-in-out;
}
```

## Understanding the Data Flow

Let's trace how changes flow through our collaborative editing system:

### 1. User Types in Editor

User Input → Tiptap Editor → ProseMirror Document → Y.js Document

### 2. Y.js Synchronization

Y.js Document → Y.js Update → WebSocket → Y.js Server → Other Clients

### 3. Remote Changes

WebSocket Message → Y.js Document → ProseMirror Document → Tiptap Editor → UI Update

### 4. Awareness Data Flow

Cursor Position → Y.js Awareness → WebSocket → Other Clients → Cursor Visualization

## Key Implementation Details

### Y.js Configuration

Important: When using Y.js with Tiptap, exclude the History extension:

```javascript
// ❌ Don't include History extension
import { History } from '@tiptap/extension-history'

// ✅ Y.js handles history automatically
extensions: [
  // ... other extensions
  Collaboration.configure({
    document: yDoc,
  }),
  // Don't add History extension
]
```

### Connection Management

```javascript
// Monitor connection status
provider.on('status', ({ status }) => {
  setIsConnected(status === 'connected');
  setConnectionStatus(status);
});

// Handle sync events
provider.on('sync', (isSynced) => {
  if (isSynced) {
    setLoading(false);
  }
});
```

## Performance Optimizations

### 1. Debounce Awareness Updates

```javascript
const debouncedAwarenessUpdate = useMemo(
  () => debounce((cursor) => {
    provider.awareness.setLocalStateField('cursor', cursor);
  }, 50),
  [provider]
);
```

### 2. Efficient Cursor Rendering

```javascript
// Only update cursors when necessary
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
}, [editor, participants]);
```

## Production Considerations

### 1. Persistence

Y.js documents exist only in memory by default. For production, implement persistence:

```javascript
const { LeveldbPersistence } = require('y-leveldb');

// Set up persistence
const persistence = new LeveldbPersistence('./db');

wss.on('connection', (ws, req) => {
  const docName = req.url?.slice(1) || 'default';

  setupWSConnection(ws, req, {
    persistence,
    docName,
  });
});
```

### 2. Authentication & Authorization

```javascript
wss.on('connection', (ws, req) => {
  // Verify user authentication
  const token = req.headers.authorization;
  if (!verifyToken(token)) {
    ws.close(1008, 'Unauthorized');
    return;
  }

  setupWSConnection(ws, req);
});
```

### 3. Rate Limiting

```javascript
const rateLimit = new Map();

wss.on('connection', (ws, req) => {
  const clientIP = req.connection.remoteAddress;

  // Implement rate limiting per IP
  if (exceedsRateLimit(clientIP)) {
    ws.close(1008, 'Rate limit exceeded');
    return;
  }

  setupWSConnection(ws, req);
});
```

## Troubleshooting Common Issues

### 1. Connection Issues

Problem: WebSocket connection fails

```javascript
// Solution: Add connection retry logic
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
};
```

### 2. Document Sync Issues

Problem: Documents not syncing properly

```javascript
// Solution: Force sync after connection
provider.on('status', ({ status }) => {
  if (status === 'connected') {
    // Force document sync
    setTimeout(() => {
      provider.sync();
    }, 100);
  }
});
```

## Deployment Guide

### 1. Docker Setup

```dockerfile
# Dockerfile for Y.js server
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 8000
CMD ["node", "yjs-server.js"]
```

### 2. Nginx Configuration

```nginx
upstream yjs_backend {
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
}
```

## Conclusion

Building a real-time collaborative editing system with Y.js, WebSockets, and Tiptap provides a robust foundation for modern collaborative applications. The combination offers:

- Conflict-free collaboration through Y.js CRDTs
- Real-time synchronization via WebSockets
- Rich editing experience with Tiptap
- User awareness with cursor tracking
- Scalable architecture for production use

This implementation handles the core challenges of collaborative editing:

- Operational transformation for conflict resolution
- Network partition tolerance with offline-first design
- Real-time updates with minimal latency
- User experience with visual collaboration cues

The system is production-ready with proper error handling, connection management, and performance optimizations. You can extend it further with features like document persistence, user authentication, and advanced collaboration tools.

## Key Takeaways

- Y.js CRDTs eliminate the complexity of manual conflict resolution
- WebSocket connections provide the real-time communication layer
- Tiptap's collaboration extensions integrate seamlessly with Y.js
- User awareness creates an engaging collaborative experience
- Proper architecture ensures scalability and maintainability

Ready to build your own collaborative editing application? Start with this foundation and customize it for your specific use case!
