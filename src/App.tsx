import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
  const [posts, setPosts] = useState<Post[] | null>(null);
  useEffect(() => {
    console.log("init()");
    getData();
  }, []);

  async function getData() {
    console.log("init()");
    const { data } = await axios.get<Post[]>(
      "https://jsonplaceholder.typicode.com/posts"
    );
    setPosts(data);
    // console.log(data);
  }

  return (
    <div>
      {posts?.map((post: Post) => (
        <li>{post.title}</li>
      ))}
    </div>
  );
}

export default App;

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
