import { LoaderPinwheel } from "lucide-react";

export const Loading = () => {
  return (
    <div className="flex justify-start items-start gap-2 m-5 h-screen  text-gray-500">
      <LoaderPinwheel className="animate-spin h-6 w-6" />
      <p>Carregando...</p>
    </div>
  );
};