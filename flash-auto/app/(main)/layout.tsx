'use client'
import Header from "../components/layout/Header/Header";
import Footer from "../components/layout/Footer";

const layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    return (
      <div className="w-full">
              
          <Header />
  
          <div className="bg-lavender dark:bg-black dark:text-white">
              {children}
  
          </div>
          <Footer />
      </div>
    )
}

export default layout


