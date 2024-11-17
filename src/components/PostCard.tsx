export const PostCard = () => {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h2 className="font-semibold">Latest Post</h2>
      <p className="text-sm text-gray-400">November 4, 2024</p>
      <h3 className="mt-2 text-lg font-bold">
        Complete Guide to Setting Up a VPS with Next.js on Hostinger
      </h3>
      <div className="mt-2 flex gap-2 text-sm text-blue-600">
        <span>#Hosting</span>
        <span>#Tutorial</span>
      </div>
      <p className="mt-2 text-gray-600 text-sm">
        Learn step-by-step how to deploy a Next.js project on a Hostinger VPS...
      </p>
    </div>
  );
};
