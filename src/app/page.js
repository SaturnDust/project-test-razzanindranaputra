import Header from '@/ui/header.jsx';
import { Suspense } from "react";
import PostIdeas from '@/ui/postIdeas.jsx';

export default function Home() {
  return (
      <> 
        <Header />
        <Suspense fallback={<div>Loading post...</div>}>
          <PostIdeas />
        </Suspense>
      </>
  );
}
