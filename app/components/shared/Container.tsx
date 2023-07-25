"use client";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="h-full max-w-[880px] mx-auto md:px-4 sm:px-12 px-6 md:pl-[128px] py-[100px] sm:py-[130px] md:py-[72px]">
      {children}
    </div>
  );
};

export default Container;
