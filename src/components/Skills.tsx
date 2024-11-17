import { CodeIcon } from "@radix-ui/react-icons";

export const Skills = () => {
  const skills = [
    "TypeScript",
    "Elixir",
    "React.Js",
    "Next.Js",
    "Node.Js",
    "PostgreSQL",
    "Prisma",
    "AWS",
  ];

  return (
    <div className="border border-gray-300 rounded-lg bg-gray-50 p-6 shadow-lg bg-opacity-80">
      <div className="flex items-center align-middle space-x-3 font-semibold text-gray-700 border-b pb-3">
        <CodeIcon />
        <h4 className="text-xl">Skills</h4>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        {skills.map((skill, idx) => (
          <div
            key={idx}
            className="border border-gray-300 text-black px-4 py-2 rounded-full bg-white hover:bg-black hover:text-white transition duration-200"
          >
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
};
