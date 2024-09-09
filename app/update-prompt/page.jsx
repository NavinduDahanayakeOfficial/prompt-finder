"use client";

import Form from "@components/Form";
import { Suspense, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

const UpdatePrompt = () => {
   const router = useRouter();

   return (
      <Suspense fallback={<div>Loading...</div>}>
         <UpdatePromptContent router={router} />
      </Suspense>
   );
};

const UpdatePromptContent = (router) => {
   const searchParams = useSearchParams();
   const promptId = searchParams.get("id");

   const [submitting, setSubmitting] = useState(false);

   const [post, setPost] = useState({
      prompt: "",
      tag: "",
   });

   const fetchPost = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();
      setPost({
         prompt: data.prompt,
         tag: data.tag,
      });
   };

   useEffect(() => {
      if (promptId) fetchPost();
   }, [promptId]);

   const editPrompt = async (e) => {
      e.preventDefault();
      setSubmitting(true);

      if (!promptId) return alert("Prompt not found");

      try {
         const response = await fetch(`/api/prompt/${promptId}`, {
            method: "PATCH",
            body: JSON.stringify({
               prompt: post.prompt,
               tag: post.tag,
            }),
         });

         if (response.ok) {
            router.push("/profile");
         }
      } catch (error) {
         console.log(error);
      } finally {
         setSubmitting(false);
      }
   };

   return (
      <Form
         type="Update"
         post={post}
         setPost={setPost}
         submitting={submitting}
         handleSubmit={editPrompt}
      />
   );
};

export default UpdatePrompt;
