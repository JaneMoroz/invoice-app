"use client";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="h-full max-w-[880px] mx-auto md:px-4 sm:px-12 px-6 md:pl-[128px] pt-[100px] pb-0 sm:pb-8 sm:pt-[130px] md:pt-[72px]">
      {children}
    </div>
  );
};

export default Container;
