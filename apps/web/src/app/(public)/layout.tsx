import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/Footer';

const PublicLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

export default PublicLayout