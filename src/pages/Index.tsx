
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/home/Hero";
import { FileUpload } from "@/components/home/FileUpload";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <Navbar />
      <div className="container pt-24">
        <div className="mt-12">
          <Hero />
        </div>
        <div className="mt-16">
          <FileUpload />
        </div>
      </div>
    </div>
  );
};

export default Index;
