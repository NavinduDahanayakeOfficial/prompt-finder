import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

//GET (read) a prompt
export const GET = async (request, { params }) => {
   const id = params.id;
   try {
      await connectToDB();

      const prompt = await Prompt.findById(id).populate("creator");

      if (!prompt) return new Response("Prompt not found", { status: 404 });

      return new Response(JSON.stringify(prompt), { status: 200 });
   } catch (error) {
      console.log(error);
      return new Response("Failed to fetch prompt", { status: 500 });
   }
};

//PATCH (update) a prompt
export const PATCH = async (request, { params }) => {
   const id = params.id;
   const { prompt, tag } = await request.json();
   try {
      await connectToDB();

      const existingPrompt = await Prompt.findById(id);

      if (!existingPrompt)
         return new Response("Prompt not found", { status: 404 });

      existingPrompt.prompt = prompt;
      existingPrompt.tag = tag;

      await existingPrompt.save();

      return new Response(JSON.stringify(existingPrompt), { status: 200 });
   } catch (error) {
      console.log(error);
      return new Response("Failed to update the prompt", { status: 500 });
   }
};

//DELETE a prompt
export const DELETE = async (request, { params }) => {
   const id = params.id;
   try {
      await connectToDB();

      const prompt = await Prompt.findById(id);

      if (!prompt) return new Response("prompt not found", { status: 404 });

      await Prompt.findByIdAndDelete(id);

      return new Response("Prompt deleted successfully", { status: 200 });
   } catch (error) {
      console.log(error);
      return new Response("Failed to delete the prompt", { status: 500 });
   }
};
