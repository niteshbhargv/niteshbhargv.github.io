import React from 'react';
import { Link } from 'react-router-dom';
import { posts, formatDate } from '../content/posts';

const Posts: React.FC = () => {
  if (posts.length === 0) return null;

  return (
    <section id="writing">
      <h2 className="section-title">Writing</h2>
      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={`/blog/${post.slug}`} className="post-link">
              <span className="post-link-title">{post.title}</span>
              <time className="post-link-date" dateTime={post.date}>
                {formatDate(post.date)}
              </time>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Posts;
