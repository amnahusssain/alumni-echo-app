
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Search } from "lucide-react";

interface JobOpportunity {
  id: string;
  title: string;
  company: string;
  style: "Hybrid" | "Online" | "On-Site";
  salary: string;
  location: string;
  package: string;
  workingHours: string;
  qualification: string;
  applyLink: string;
  website: string;
  linkedin: string;
}

const mockJobs: JobOpportunity[] = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "Tech Innovators Ltd",
    style: "Hybrid",
    salary: "80,000 - 100,000 PKR",
    location: "Islamabad, Pakistan",
    package: "Healthcare, Annual bonus, Retirement plan",
    workingHours: "9:00 AM - 5:00 PM (Mon-Fri)",
    qualification: "Bachelor's in Computer Science, 2+ years React experience",
    applyLink: "https://example.com/apply",
    website: "https://techinnov.example.com",
    linkedin: "https://linkedin.com/company/techinnov",
  },
  {
    id: "2",
    title: "Machine Learning Engineer",
    company: "AI Solutions Pakistan",
    style: "Online",
    salary: "120,000 - 150,000 PKR",
    location: "Remote",
    package: "Healthcare, Education allowance, Stock options",
    workingHours: "Flexible hours",
    qualification: "Master's in AI/ML, Experience with TensorFlow or PyTorch",
    applyLink: "https://example.com/apply",
    website: "https://aisol.example.com",
    linkedin: "https://linkedin.com/company/aisol",
  },
  {
    id: "3",
    title: "Full Stack Developer",
    company: "FinTech Innovations",
    style: "On-Site",
    salary: "90,000 - 120,000 PKR",
    location: "Lahore, Pakistan",
    package: "Healthcare, Transportation, Meal allowance",
    workingHours: "9:00 AM - 6:00 PM (Mon-Fri)",
    qualification: "Bachelor's in Software Engineering, MERN stack experience",
    applyLink: "https://example.com/apply",
    website: "https://fintech.example.com",
    linkedin: "https://linkedin.com/company/fintech",
  },
  {
    id: "4",
    title: "Data Analyst",
    company: "Analytics PRO",
    style: "Hybrid",
    salary: "70,000 - 85,000 PKR",
    location: "Islamabad, Pakistan",
    package: "Healthcare, Annual bonus",
    workingHours: "10:00 AM - 6:00 PM (Mon-Fri)",
    qualification: "Bachelor's in Statistics or related field, SQL proficiency",
    applyLink: "https://example.com/apply",
    website: "https://analytics.example.com",
    linkedin: "https://linkedin.com/company/analytics",
  },
  {
    id: "5",
    title: "UI/UX Designer",
    company: "Creative Solutions",
    style: "On-Site",
    salary: "75,000 - 95,000 PKR",
    location: "Karachi, Pakistan",
    package: "Healthcare, Training budget",
    workingHours: "9:00 AM - 5:00 PM (Mon-Fri)",
    qualification: "Degree in Design, Portfolio showcasing UI/UX projects",
    applyLink: "https://example.com/apply",
    website: "https://creative.example.com",
    linkedin: "https://linkedin.com/company/creative",
  },
];

const AlumniPortal = () => {
  const [jobs, setJobs] = useState<JobOpportunity[]>(mockJobs);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [filterStyle, setFilterStyle] = useState<string | null>(null);

  const selectedJob = jobs.find((job) => job.id === selectedJobId);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStyle = filterStyle ? job.style === filterStyle : true;

    return matchesSearch && matchesStyle;
  });

  const handleFilterChange = (style: string | null) => {
    setFilterStyle(style === filterStyle ? null : style);
  };

  return (
    <MainLayout title="Alumni Job Portal">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Job Opportunities</h2>
          <p className="text-gray-600 mb-6">
            Explore job opportunities posted by COMSATS alumni. Find your dream job and connect with companies looking for talented graduates.
          </p>

          {/* Search and filter */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search jobs by title, company, or location..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStyle === "Hybrid" ? "default" : "outline"}
                size="sm"
                onClick={() => handleFilterChange("Hybrid")}
              >
                Hybrid
              </Button>
              <Button
                variant={filterStyle === "Online" ? "default" : "outline"}
                className={filterStyle === "Online" ? "bg-green-500 hover:bg-green-600" : ""}
                size="sm"
                onClick={() => handleFilterChange("Online")}
              >
                Online
              </Button>
              <Button
                variant={filterStyle === "On-Site" ? "default" : "outline"}
                size="sm"
                onClick={() => handleFilterChange("On-Site")}
              >
                On-Site
              </Button>
            </div>
          </div>

          {/* Job listings */}
          <div className="space-y-4">
            {filteredJobs.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No job opportunities matching your criteria.</p>
              </div>
            ) : (
              filteredJobs.map((job) => (
                <Card key={job.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{job.title}</CardTitle>
                        <CardDescription>{job.company}</CardDescription>
                      </div>
                      <Badge
                        variant={
                          job.style === "Hybrid"
                            ? "default"
                            : job.style === "Online"
                            ? "default"
                            : "outline"
                        }
                        className={job.style === "Online" ? "bg-green-500 hover:bg-green-600" : ""}
                      >
                        {job.style}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm mb-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <p className="text-gray-700"><span className="font-medium">Location:</span> {job.location}</p>
                        <p className="text-gray-700"><span className="font-medium">Salary:</span> {job.salary}</p>
                        <p className="text-gray-700"><span className="font-medium">Working Hours:</span> {job.workingHours}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      onClick={() => setSelectedJobId(job.id)}
                    >
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Job details dialog */}
        <Dialog open={!!selectedJobId} onOpenChange={(open) => !open && setSelectedJobId(null)}>
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle>{selectedJob?.title}</DialogTitle>
            </DialogHeader>
            {selectedJob && (
              <div className="space-y-4 py-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold">{selectedJob.company}</h3>
                  <Badge
                    variant="default"
                    className={selectedJob.style === "Online" ? "bg-green-500" : ""}
                  >
                    {selectedJob.style}
                  </Badge>
                </div>

                <div className="space-y-3 border rounded-lg p-4 bg-gray-50">
                  <div>
                    <Label className="text-gray-500">Salary</Label>
                    <p className="font-medium">{selectedJob.salary}</p>
                  </div>

                  <div>
                    <Label className="text-gray-500">Location</Label>
                    <p className="font-medium">{selectedJob.location}</p>
                  </div>

                  <div>
                    <Label className="text-gray-500">Working Hours</Label>
                    <p className="font-medium">{selectedJob.workingHours}</p>
                  </div>

                  <div>
                    <Label className="text-gray-500">Package</Label>
                    <p className="font-medium">{selectedJob.package}</p>
                  </div>

                  <div>
                    <Label className="text-gray-500">Qualification</Label>
                    <p className="font-medium">{selectedJob.qualification}</p>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="flex gap-2">
                    <Button asChild className="flex-1">
                      <a href={selectedJob.applyLink} target="_blank" rel="noopener noreferrer">
                        Apply Now
                      </a>
                    </Button>
                    <Button variant="outline" asChild className="flex-1">
                      <a href={selectedJob.website} target="_blank" rel="noopener noreferrer">
                        Company Website
                      </a>
                    </Button>
                  </div>
                  <Button variant="outline" asChild className="w-full">
                    <a href={selectedJob.linkedin} target="_blank" rel="noopener noreferrer">
                      Company LinkedIn
                    </a>
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
};

export default AlumniPortal;
