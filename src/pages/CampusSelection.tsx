
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/App";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const CampusSelection = () => {
  const { setSelectedCampus } = useAppContext();
  const navigate = useNavigate();
  const { toast } = useToast();

  const campuses = [
    { name: "Islamabad Campus", emailExt: "@cuiislamabad.edu.pk" },
    { name: "Lahore Campus", emailExt: "@cuilahore.edu.pk" },
    { name: "Wah Campus", emailExt: "@cuiwah.edu.pk" },
    { name: "Vehari Campus", emailExt: "@cuivehari.edu.pk" },
    { name: "Sahiwal Campus", emailExt: "@cuisahiwal.edu.pk" },
    { name: "Attock Campus", emailExt: "@cuiattok.edu.pk" },
    { name: "Abbottabad Campus", emailExt: "@cuiabbottabad.edu.pk" },
  ];

  const handleCampusSelect = (campus: string) => {
    setSelectedCampus(campus);
    toast({
      title: "Campus Selected",
      description: `You've selected ${campus}`,
    });
    navigate("/authentication");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-comsats-blue">Select Your Campus</h1>
        <p className="text-xl text-gray-600">Choose the COMSATS campus you belong to</p>
      </motion.div>

      <div className="w-full max-w-md space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {campuses.map((campus, index) => (
            <motion.div
              key={campus.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="w-full"
            >
              <button 
                className="w-full bg-white border border-gray-200 rounded-lg p-4 text-center hover:bg-gray-50 hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-comsats-blue"
                onClick={() => handleCampusSelect(campus.name)}
              >
                <h2 className="text-lg font-medium">{campus.name}</h2>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CampusSelection;
