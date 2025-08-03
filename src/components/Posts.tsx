import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Post {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  readTime: string;
  tags: string[];
  link: string;
}

const Posts: React.FC = () => {
  const navigate = useNavigate();
  
  const posts: Post[] = [
    {
      id: 2,
      title: "Migrating Desktop Applications to Cloud: Lessons Learned",
      date: "November 22, 2023",
      excerpt: "A deep dive into the challenges and solutions when migrating Adobe Captivate from desktop-only to cloud. Infrastructure decisions, system design principles, and automation strategies.",
      readTime: "12 min read",
      tags: ["Cloud Migration", "DevOps", "CI/CD", "System Design"],
      link: "/blog/migrating-desktop-applications-cloud"
    },
    {
      id: 3,
      title: "QR Code-Based Inventory Management: A Case Study",
      date: "October 10, 2023",
      excerpt: "How we revolutionized inventory tracking at Ninjacart using QR code Stack GRN system. From concept to implementation, covering the technical challenges and business impact.",
      readTime: "6 min read",
      tags: ["Inventory Management", "QR Codes", "Backend", "Optimization"],
      link: "/blog/qr-code-inventory-management-case-study"
    },
    {
      id: 4,
      title: "Performance Testing at Scale: Building vcbench for vCenter",
      date: "September 18, 2023",
      excerpt: "Creating performance testing tools for enterprise applications. The story behind vcbench and Hawkeye - VMware's first end-to-end performance suite appliance.",
      readTime: "10 min read",
      tags: ["Performance Testing", "VMware", "Scalability", "Enterprise"],
      link: "/blog/performance-testing-scale-vcbench-vcenter"
    },
    {
      id: 5,
      title: "Graph Processing Optimization: GSoC Experience with Gephi",
      date: "August 25, 2023",
      excerpt: "My Google Summer of Code experience working on GraphStore benchmark and tuning. Lessons learned in open source contribution and graph processing optimization.",
      readTime: "7 min read",
      tags: ["Open Source", "Graph Processing", "Performance", "GSoC"],
      link: "/blog/graph-processing-optimization-gsoc-gephi"
    },
    {
      id: 6,
      title: "Event-Driven Architecture: Automating Slot Assignment",
      date: "July 30, 2023",
      excerpt: "Implementing fair allocation algorithms with event handlers to automate executive slot assignments. Reducing latency and improving system efficiency through smart architecture.",
      readTime: "9 min read",
      tags: ["Event-Driven", "Algorithms", "Automation", "Architecture"],
      link: "/blog/event-driven-architecture-automating-slot-assignment"
    }
  ];

  const handlePostClick = (post: Post) => {
    navigate(post.link);
  };

  return (
    <section id="posts">
      <div className="section-content">
        <h2 className="section-title">Blog Posts & Articles</h2>
        <div className="posts-grid">
          {posts.map((post) => (
            <article 
              key={post.id} 
              className="post-card fade-in"
              onClick={() => handlePostClick(post)}
              style={{ cursor: post.link ? 'pointer' : 'default' }}
            >
              <div className="post-header">
                <h3 className="post-title">{post.title}</h3>
                <div className="post-meta">
                  <span className="post-date">{post.date}</span>
                  <span className="post-read-time">{post.readTime}</span>
                </div>
              </div>
              <div className="post-content">
                <p className="post-excerpt">{post.excerpt}</p>
                <div className="post-tags">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="post-tag">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="post-footer">
                <span className="read-more">Read More →</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Posts;