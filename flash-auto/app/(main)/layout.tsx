import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";


const layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div>
            
        <Header />

        <div>
            {children}

        </div>
        <Footer />
    </div>
  )
}

export default layout


