import { BackpackIcon } from "@radix-ui/react-icons";

export const Experience = () => {
  const experiences = [
    {
      company: "Byteridge",
      role: "Software Development Engineer",
      years: "2023 — Present",
    },
    {
      company: "Zyvka",
      role: "Backend Developer",
      years: "2022 — 2023",
    },
  ];

  return (
    <div className="border border-gray-300 rounded-lg bg-gray-50 p-6 shadow-lg bg-opacity-80">
      <div className="flex items-center align-middle space-x-3 font-semibold text-gray-700 border-b pb-3">
        <BackpackIcon />
        <h4 className="text-xl">Experience</h4>
      </div>

      <ul className="mt-6 space-y-4">
        {experiences.map((exp, idx) => (
          <li
            key={idx}
            className="flex justify-between items-center py-2 px-4 rounded-lg transition duration-200 ease-in-out "
          >
            <div className="flex flex-col space-y-1">
              <span className="font-medium text-gray-800">{exp.company}</span>
              <span className="text-gray-500">{exp.role}</span>
            </div>
            <span className="text-gray-400 ml-4">{exp.years}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
