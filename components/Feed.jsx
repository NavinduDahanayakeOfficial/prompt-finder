"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";
import { useRouter } from "next/navigation";

const PromptCardList = ({ data, handleTagClick }) => {
   return (
      <div className="mt-16 prompt_layout">
         {data.map((post) => (
            <PromptCard
               key={post._id}
               post={post}
               handleTagClick={handleTagClick}
            />
         ))}
      </div>
   );
};

const Feed = () => {
   const [searchText, setSearchText] = useState("");
   const [allPosts, setAllPosts] = useState([]);
   const [searchResult, setSearchResult] = useState([]);
   const [searchTimeout, setSearchTimeout] = useState(null);

   const router = useRouter();

   const handleSearchChange = (e) => {
      e.preventDefault();
      clearTimeout(searchTimeout);
      setSearchText(e.target.value);

      setSearchTimeout(
         setTimeout(() => {
            const searchResult = querySearch(e.target.value);
            setSearchResult(searchResult);
         }, 500)
      );
   };

   const querySearch = (text) => {
      const regex = new RegExp(text, "i");

      return allPosts.filter((post) => {
         return (
            regex.test(post.prompt) ||
            regex.test(post.creator.email) ||
            regex.test(post.tag)
         );
      });
   };

   useEffect(() => {
      const fetchPost = async () => {
         const response = await fetch("/api/prompt");
         const data = await response.json();
         setAllPosts(data);
      };

      fetchPost();
   }, [router.asPath]);

   const handleTagClick = (tag) => {
      setSearchText(tag);
      setSearchResult(querySearch(tag));
   }

   return (
      <section className="feed">
         <form className="relative w-full flex-center">
            <input
               type="text"
               placeholder="Search for tag or username"
               value={searchText}
               onChange={handleSearchChange}
               required
               className="search_input peer"
            ></input>
         </form>

         {searchText ? (
            <PromptCardList data={searchResult} handleTagClick={handleTagClick} />
         ) : (
            <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
         )}
      </section>
   );
};

export default Feed;
