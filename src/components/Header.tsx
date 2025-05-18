import {
  GitHubLogoIcon,
  ArrowTopRightIcon,
  LinkedInLogoIcon,
  EnvelopeClosedIcon,
  FileTextIcon,
} from "@radix-ui/react-icons";
import * as Tooltip from "@radix-ui/react-tooltip";

interface HeaderProps {
  name: string;
  description: string;
  avatarUrl1?: string;
  avatarUrl2?: string;
  isAvailable: boolean;
}

export const Header = ({ name, description, isAvailable }: HeaderProps) => {
  return (
    <header className="py-5 px-6">
      {/* <div className="relative group">
        <Image
          src={avatarUrl1}
          alt={`Profile picture of ${name}`}
          width={72}
          height={72}
          className="rounded-full border-4 border-white absolute top-0 left-0 group-hover:opacity-0 transition-opacity duration-300"
        />
        <Image
          src={avatarUrl2}
          alt={`Alternative profile picture of ${name}`}
          width={72}
          height={72}
          className="rounded-full border-4 border-white absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div> */}
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mt-24">{name}</h1>
        <p className="mt-2 text-gray-600">{description}</p>
        <p className="mt-2 flex items-center gap-2 font-semibold">
          {isAvailable ? (
            <>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-ping"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-600"></span>
              </span>
              Available for collaborating
            </>
          ) : (
            <span className="text-red-600">
              🔴 Not available for new projects
            </span>
          )}
        </p>
        <div className="mt-4 flex gap-4">
          {/* GitHub Link */}
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <a
                  href="https://github.com/Rayzon3"
                  className="relative group"
                  target="_blank"
                >
                  <GitHubLogoIcon className="w-6 h-6 group-hover:opacity-0 transition-opacity" />
                  <ArrowTopRightIcon className="w-6 h-6 absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </Tooltip.Trigger>
              <Tooltip.Content
                side="top"
                className="bg-gray-800 text-white px-2 py-1 rounded-md text-sm"
              >
                GitHub
              </Tooltip.Content>
            </Tooltip.Root>
          </Tooltip.Provider>
          {/* LinkedIn Link */}
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <a
                  href="https://www.linkedin.com/in/rahulbhardwaj03/"
                  className="relative group"
                  target="_blank"
                >
                  <LinkedInLogoIcon className="w-6 h-6 group-hover:opacity-0 transition-opacity" />
                  <ArrowTopRightIcon className="w-6 h-6 absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </Tooltip.Trigger>
              <Tooltip.Content
                side="top"
                className="bg-gray-800 text-white px-2 py-1 rounded-md text-sm"
              >
                LinkedIn
              </Tooltip.Content>
            </Tooltip.Root>
          </Tooltip.Provider>
          {/* Email Link */}
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <a
                  href="mailto:rahul.03111999@gmail.com"
                  className="relative group"
                >
                  <EnvelopeClosedIcon className="w-6 h-6 group-hover:opacity-0 transition-opacity" />
                  <ArrowTopRightIcon className="w-6 h-6 absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </Tooltip.Trigger>
              <Tooltip.Content
                side="top"
                className="bg-gray-800 text-white px-2 py-1 rounded-md text-sm"
              >
                Email
              </Tooltip.Content>
            </Tooltip.Root>
          </Tooltip.Provider>
          {/* Resume Link */}
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <a
                  href="https://drive.google.com/file/d/1atZRW4uzGDF1PmeF5moTXD56cs13-MJy/view?usp=sharing"
                  className="relative group"
                  target="_blank"
                >
                  <FileTextIcon className="w-6 h-6 group-hover:opacity-0 transition-opacity" />
                  <ArrowTopRightIcon className="w-6 h-6 absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </Tooltip.Trigger>
              <Tooltip.Content
                side="top"
                className="bg-gray-800 text-white px-2 py-1 rounded-md text-sm"
              >
                Resume
              </Tooltip.Content>
            </Tooltip.Root>
          </Tooltip.Provider>
        </div>
      </div>
    </header>
  );
};
