import { error } from "@sveltejs/kit";
import { getBlogPost } from "$lib/data/blog";
import type { PageLoad } from "./$types";

export const load: PageLoad = ({ params }) => {
  const post = getBlogPost(params.slug);

  if (!post) {
    throw error(404, "Post not found");
  }

  return { post };
};
