"use client";

import Profile from "@components/Profile";
import { useEffect, useState } from "react";

const UserProfile = ({params}) => {
   const [posts, setPosts] = useState([]);
   const userId =params.id;
   

   useEffect(() => {
      const fetchPosts = async () => {
         const response = await fetch(`/api/users/${userId}/posts`);
         const data = await response.json();
         setPosts(data);
      };

      fetchPosts();
   }, [userId]);

   return (
      <Profile
         name={`${posts[0]?.creator.username}'s`}
         desc="Welcome to personalized profile page"
         data={posts}
      />
   );
};

export default UserProfile;
