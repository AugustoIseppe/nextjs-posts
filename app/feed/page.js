import Posts from '@/components/posts';
import { getPosts } from '@/lib/posts';
import { get } from 'express/lib/response';

// export const metadata = {
//   title: 'Feed',
//   description: 'All posts by all users.',
// };

// Dynamic metadata
export async function generateMetadata(){
  const posts = await getPosts();
  const numberOfPosts = posts.length;
  return {
    title: `All posts by all users. ${numberOfPosts} posts available.`,
    description: 'Browse all posts shared by users of the platform.',
  };
}; 
export default async function FeedPage() {
  const posts = await getPosts();
  return (
    <>
      <h1>All posts by all users</h1>
      <Posts posts={posts} />
    </>
  );
}
