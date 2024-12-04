import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { PostList } from './components/posts/PostList';
import { PostForm } from './components/posts/PostForm';
import { Post } from './types/blog';
import { Plus } from 'lucide-react';
import { Button } from './components/ui/Button';

// Mock data for demonstration
const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Getting Started with React',
    excerpt: 'Learn the basics of React and its core concepts',
    content: 'Full content here...',
    status: 'published',
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-03-10'),
  },
  {
    id: '2',
    title: 'Advanced TypeScript Patterns',
    excerpt: 'Explore advanced TypeScript features and patterns',
    content: 'Full content here...',
    status: 'draft',
    createdAt: new Date('2024-03-09'),
    updatedAt: new Date('2024-03-09'),
  },
];

function App() {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handleEdit = (post: Post) => {
    setSelectedPost(post);
    setIsEditing(true);
  };

  const handleDelete = (postId: string) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  const handleSubmit = (formData: any) => {
    if (selectedPost) {
      setPosts(
        posts.map((post) =>
          post.id === selectedPost.id
            ? { ...post, ...formData, updatedAt: new Date() }
            : post
        )
      );
    } else {
      const newPost: Post = {
        id: Date.now().toString(),
        ...formData,
        status: 'draft',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setPosts([newPost, ...posts]);
    }
    setIsEditing(false);
    setSelectedPost(null);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">Posts</h1>
              {!isEditing && (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  New Post
                </Button>
              )}
            </div>

            {isEditing ? (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">
                  {selectedPost ? 'Edit Post' : 'Create New Post'}
                </h2>
                <PostForm
                  initialData={selectedPost || undefined}
                  onSubmit={handleSubmit}
                  onCancel={() => {
                    setIsEditing(false);
                    setSelectedPost(null);
                  }}
                />
              </div>
            ) : (
              <PostList
                posts={posts}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;