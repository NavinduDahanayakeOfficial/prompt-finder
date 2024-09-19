import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const dynamic = "force-dynamic";
export const GET = async (request) => {
   try {
      await connectToDB();
      const prompts = await Prompt.find().populate("creator");
      return new Response(JSON.stringify(prompts), {
         status: 200,
         headers: {
            "Cache-Control": "s-maxage=60, stale-while-revalidate=30", // Cache for 60 seconds, allow stale for 30 seconds
         },
      });
   } catch (error) {
      return new Response("Failed to fetch prompts", { status: 500 });
   }
};
