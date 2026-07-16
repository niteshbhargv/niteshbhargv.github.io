import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { getPost, formatDate } from '../content/posts';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPost(slug) : undefined;

  React.useEffect(() => {
    if (post) document.title = `${post.title} — Nitesh Bhargava`;
    return () => {
      document.title = 'Nitesh Bhargava — Software Engineer';
    };
  }, [post]);

  if (!post) {
    return (
      <article className="post">
        <h1>Not found</h1>
        <p>
          There's no post at this address. <Link to="/">Back to the homepage</Link>.
        </p>
      </article>
    );
  }

  return (
    <article className="post">
      <header className="post-head">
        <h1>{post.title}</h1>
        <p className="post-byline">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {post.readTime && <span> · {post.readTime}</span>}
        </p>
      </header>
      <div className="prose">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
          {post.body}
        </ReactMarkdown>
      </div>
    </article>
  );
};

export default BlogPost;
