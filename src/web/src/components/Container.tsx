import type { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <main className="mt-4 px-3 w-full">
        {children}
    </main>
  )
}

export default Container;