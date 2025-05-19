
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/App";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

const CampusSelection = () => {
  const { setSelectedCampus } = useAppContext();
  const navigate = useNavigate();
  const { toast } = useToast();

  const campuses = [
    { name: "Islamabad Campus", emailExt: "@cuiislamabad.edu.pk", image: "🏛️" },
    { name: "Lahore Campus", emailExt: "@cuilahore.edu.pk", image: "🏛️" },
    { name: "Wah Campus", emailExt: "@cuiwah.edu.pk", image: "🏛️" },
    { name: "Vehari Campus", emailExt: "@cuivehari.edu.pk", image: "🏛️" },
    { name: "Sahiwal Campus", emailExt: "@cuisahiwal.edu.pk", image: "🏛️" },
    { name: "Attock Campus", emailExt: "@cuiattok.edu.pk", image: "🏛️" },
    { name: "Abbottabad Campus", emailExt: "@cuiabbottabad.edu.pk", image: "🏛️" },
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
    <div className="min-h-screen bg-gradient-to-b from-comsats-blue to-comsats-green p-6 flex flex-col items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center text-white mb-10"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Welcome to COMSATS University</h1>
        <p className="text-xl opacity-90">Select your campus to continue</p>
      </motion.div>

      <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {campuses.map((campus, index) => (
          <motion.div
            key={campus.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="campus-card hover-scale group"
            onClick={() => handleCampusSelect(campus.name)}
          >
            <div className="text-4xl mb-3">{campus.image}</div>
            <h2 className="text-xl font-semibold text-comsats-blue mb-1 group-hover:text-comsats-green transition-colors">{campus.name}</h2>
            <p className="text-sm text-gray-500">{campus.emailExt}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CampusSelection;
