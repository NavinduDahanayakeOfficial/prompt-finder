"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/profile";

const MyProfile = () => {
   const { data: session, status } = useSession();

   const [posts, setPosts] = useState([]);

   useEffect(() => {
      const fetchPosts = async () => {
         if (session?.user?.id) {
            const response = await fetch(
               `/api/users/${session?.user.id}/posts`
            );
            const data = await response.json();
            setPosts(data);
         }
      };

      if (status === "authenticated") fetchPosts();
   }, [session, status]);

   const handleEdit = () => {

   };

   const handleDelete = async () => {
      
   };

   if (status === "loading") {
    return <p>Loading...</p>;
  }

   return (
      <Profile
         name="My"
         desc="Welcome to your personalized profile page"
         data={posts}
         handleEdit={handleEdit}
         handleDelete={handleDelete}
      />
   );
};

export default MyProfile;
