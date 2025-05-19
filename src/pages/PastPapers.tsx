
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, FileText, Upload, Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface PastPaper {
  id: string;
  courseCode: string;
  courseName: string;
  examType: "Midterm" | "Final";
  semester: string;
  year: string;
  uploadedBy: string;
  dateUploaded: string;
  fileUrl: string;
  approved: boolean;
}

const mockPapers: PastPaper[] = [
  {
    id: "1",
    courseCode: "CSE357",
    courseName: "Business Process Engineering",
    examType: "Midterm",
    semester: "Spring",
    year: "2023",
    uploadedBy: "Dr. Amin Khan",
    dateUploaded: "15 Apr, 2023",
    fileUrl: "/papers/CSE357_Midterm_Spring_2023.pdf",
    approved: true,
  },
  {
    id: "2",
    courseCode: "CSE357",
    courseName: "Business Process Engineering",
    examType: "Final",
    semester: "Spring",
    year: "2023",
    uploadedBy: "Dr. Amin Khan",
    dateUploaded: "20 Jun, 2023",
    fileUrl: "/papers/CSE357_Final_Spring_2023.pdf",
    approved: true,
  },
  {
    id: "3",
    courseCode: "CSC356",
    courseName: "Human Computer Interaction",
    examType: "Midterm",
    semester: "Fall",
    year: "2022",
    uploadedBy: "Dr. Sara Ali",
    dateUploaded: "12 Nov, 2022",
    fileUrl: "/papers/CSC356_Midterm_Fall_2022.pdf",
    approved: true,
  },
  {
    id: "4",
    courseCode: "CSC356",
    courseName: "Human Computer Interaction",
    examType: "Final",
    semester: "Fall",
    year: "2022",
    uploadedBy: "Dr. Sara Ali",
    dateUploaded: "25 Jan, 2023",
    fileUrl: "/papers/CSC356_Final_Fall_2022.pdf",
    approved: true,
  },
  {
    id: "5",
    courseCode: "CSC354",
    courseName: "Machine Learning",
    examType: "Midterm",
    semester: "Spring",
    year: "2023",
    uploadedBy: "Dr. Ahmed Hassan",
    dateUploaded: "10 Mar, 2023",
    fileUrl: "/papers/CSC354_Midterm_Spring_2023.pdf",
    approved: true,
  },
  {
    id: "6",
    courseCode: "CSC354",
    courseName: "Machine Learning",
    examType: "Final",
    semester: "Spring",
    year: "2023",
    uploadedBy: "Dr. Ahmed Hassan",
    dateUploaded: "15 Jun, 2023",
    fileUrl: "/papers/CSC354_Final_Spring_2023.pdf",
    approved: true,
  },
  {
    id: "7",
    courseCode: "CSC325",
    courseName: "Software Construction and Development",
    examType: "Midterm",
    semester: "Fall",
    year: "2022",
    uploadedBy: "Dr. Bilal Khan",
    dateUploaded: "5 Nov, 2022",
    fileUrl: "/papers/CSC325_Midterm_Fall_2022.pdf",
    approved: true,
  },
  {
    id: "8",
    courseCode: "CSC325",
    courseName: "Software Construction and Development",
    examType: "Final",
    semester: "Fall",
    year: "2022",
    uploadedBy: "Dr. Bilal Khan",
    dateUploaded: "10 Jan, 2023",
    fileUrl: "/papers/CSC325_Final_Fall_2022.pdf",
    approved: true,
  },
  {
    id: "9",
    courseCode: "CSC494",
    courseName: "Software Project Management",
    examType: "Midterm",
    semester: "Spring",
    year: "2023",
    uploadedBy: "Prof. Zainab Ali",
    dateUploaded: "20 Mar, 2023",
    fileUrl: "/papers/CSC494_Midterm_Spring_2023.pdf",
    approved: true,
  },
  {
    id: "10",
    courseCode: "CSC494",
    courseName: "Software Project Management",
    examType: "Final",
    semester: "Spring",
    year: "2023",
    uploadedBy: "Prof. Zainab Ali",
    dateUploaded: "25 Jun, 2023",
    fileUrl: "/papers/CSC494_Final_Spring_2023.pdf",
    approved: true,
  },
];

const PastPapers = () => {
  const { toast } = useToast();
  const [papers] = useState<PastPaper[]>(mockPapers);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    courseCode: "",
    courseName: "",
    examType: "",
    semester: "",
    year: "",
    file: null as File | null,
  });

  const handleUploadChange = (field: string, value: string) => {
    setUploadForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setUploadForm((prev) => ({
      ...prev,
      file,
    }));
  };

  const handleUploadSubmit = () => {
    if (!uploadForm.courseCode || !uploadForm.courseName || !uploadForm.examType || !uploadForm.file) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields and upload a file",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Past Paper Submitted",
      description: "Your submission will be reviewed by an administrator before publication.",
    });

    setIsUploadDialogOpen(false);
    setUploadForm({
      courseCode: "",
      courseName: "",
      examType: "",
      semester: "",
      year: "",
      file: null,
    });
  };

  const filterPapers = (papers: PastPaper[], examType: "All" | "Midterm" | "Final") => {
    return papers.filter((paper) => {
      const matchesSearch =
        paper.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paper.courseName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = examType === "All" || paper.examType === examType;

      return matchesSearch && matchesType;
    });
  };

  const allFilteredPapers = filterPapers(papers, "All");
  const midtermFilteredPapers = filterPapers(papers, "Midterm");
  const finalFilteredPapers = filterPapers(papers, "Final");

  const downloadPaper = (paper: PastPaper) => {
    toast({
      title: "Downloading Paper",
      description: `${paper.courseCode} ${paper.examType} paper is being downloaded.`,
    });
  };

  return (
    <MainLayout title="Past Papers">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
            <div>
              <h2 className="text-xl font-semibold">Past Papers Repository</h2>
              <p className="text-gray-600">Search and download past examination papers</p>
            </div>
            <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Upload className="w-4 h-4 mr-2" />
                  Contribute Paper
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload Past Paper</DialogTitle>
                  <DialogDescription>
                    Contribute to the paper repository by uploading a past paper. Your submission will be reviewed by an administrator.
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="courseCode">Course Code</Label>
                      <Input
                        id="courseCode"
                        placeholder="e.g., CSC354"
                        value={uploadForm.courseCode}
                        onChange={(e) => handleUploadChange("courseCode", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="courseName">Course Name</Label>
                      <Input
                        id="courseName"
                        placeholder="e.g., Machine Learning"
                        value={uploadForm.courseName}
                        onChange={(e) => handleUploadChange("courseName", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="examType">Exam Type</Label>
                      <Select
                        value={uploadForm.examType}
                        onValueChange={(value) => handleUploadChange("examType", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="Midterm">Midterm</SelectItem>
                            <SelectItem value="Final">Final</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="semester">Semester</Label>
                      <Select
                        value={uploadForm.semester}
                        onValueChange={(value) => handleUploadChange("semester", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="Spring">Spring</SelectItem>
                            <SelectItem value="Fall">Fall</SelectItem>
                            <SelectItem value="Summer">Summer</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="year">Year</Label>
                      <Select
                        value={uploadForm.year}
                        onValueChange={(value) => handleUploadChange("year", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="2024">2024</SelectItem>
                            <SelectItem value="2023">2023</SelectItem>
                            <SelectItem value="2022">2022</SelectItem>
                            <SelectItem value="2021">2021</SelectItem>
                            <SelectItem value="2020">2020</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="file">Upload File (PDF)</Label>
                    <Input
                      id="file"
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleUploadSubmit}>Submit for Review</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search by course code or name..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Tabs for filtering */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="all">All Papers</TabsTrigger>
              <TabsTrigger value="midterm">Midterm Exams</TabsTrigger>
              <TabsTrigger value="final">Final Exams</TabsTrigger>
            </TabsList>

            {/* All Papers */}
            <TabsContent value="all">
              <div className="space-y-4">
                {allFilteredPapers.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No papers matching your search criteria.</p>
                  </div>
                ) : (
                  allFilteredPapers.map((paper) => (
                    <Card key={paper.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <div>
                            <CardTitle className="text-lg">{paper.courseCode}</CardTitle>
                            <CardDescription>{paper.courseName}</CardDescription>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">{paper.examType} Exam</div>
                            <div className="text-xs text-gray-500">
                              {paper.semester} {paper.year}
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2 text-sm">
                        <p className="text-gray-500">
                          Uploaded by {paper.uploadedBy} on {paper.dateUploaded}
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => downloadPaper(paper)}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            {/* Midterm Exams */}
            <TabsContent value="midterm">
              <div className="space-y-4">
                {midtermFilteredPapers.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No midterm papers matching your search criteria.</p>
                  </div>
                ) : (
                  midtermFilteredPapers.map((paper) => (
                    <Card key={paper.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <div>
                            <CardTitle className="text-lg">{paper.courseCode}</CardTitle>
                            <CardDescription>{paper.courseName}</CardDescription>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">{paper.examType} Exam</div>
                            <div className="text-xs text-gray-500">
                              {paper.semester} {paper.year}
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2 text-sm">
                        <p className="text-gray-500">
                          Uploaded by {paper.uploadedBy} on {paper.dateUploaded}
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => downloadPaper(paper)}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            {/* Final Exams */}
            <TabsContent value="final">
              <div className="space-y-4">
                {finalFilteredPapers.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No final papers matching your search criteria.</p>
                  </div>
                ) : (
                  finalFilteredPapers.map((paper) => (
                    <Card key={paper.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <div>
                            <CardTitle className="text-lg">{paper.courseCode}</CardTitle>
                            <CardDescription>{paper.courseName}</CardDescription>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">{paper.examType} Exam</div>
                            <div className="text-xs text-gray-500">
                              {paper.semester} {paper.year}
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2 text-sm">
                        <p className="text-gray-500">
                          Uploaded by {paper.uploadedBy} on {paper.dateUploaded}
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => downloadPaper(paper)}
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default PastPapers;
