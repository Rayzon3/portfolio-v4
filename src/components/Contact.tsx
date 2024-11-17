import { ChatBubbleIcon } from "@radix-ui/react-icons";

export const Contact = () => {
  return (
    <div className="flex border border-gray-300 rounded-lg bg-gray-50 p-6 shadow-lg bg-opacity-80 justify-between">
      {/* <div className="flex items-center align-middle space-x-3 font-semibold text-gray-700 border-b pb-3">
        <ChatBubbleIcon />
        <h4 className="text-xl">Contact</h4>
      </div> */}
      <div className="flex items-center align-middle space-x-4">
        <ChatBubbleIcon />
        <div>Let&apos;s connect!</div>
      </div>

      <a
        href="mailto:rahul.03111999@gmail.com"
        className="border border-gray-300 rounded-lg p-2 hover:bg-black hover:text-white"
      >
        Send an email
      </a>
    </div>
  );
};
