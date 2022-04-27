import clsx from "clsx";

export const BadgeSaleStatus = ({ status }) => {
  const classNamesDnD = clsx(
    "rounded-full font-bold bg-green-600 px-3 py-1 text-white",
    {
      ["bg-green-400"]: status === "En venda",
      ["bg-orange-500"]: status === "Reservat",
      ["bg-blue-400"]: status === "Venut",
      ["bg-red-500"]: status === "Cancel·lat",
    }
  );

  return <span className={classNamesDnD}>{status}</span>;
};
