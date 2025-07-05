"use client";

const Loading = ({ text = "Cargando..." }) => {
  return (
    <div className="flex flex-col items-center justify-center h-64">
      <div className="loader"></div>
      <p className="mt-4 text-cyan-500">{text}</p>
    </div>
  );
};

export default Loading;