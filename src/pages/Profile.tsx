
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog";
import { useAppContext } from "@/App";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Edit, Upload, User, X } from "lucide-react";

const Profile = () => {
  const { userData, setUserData } = useAppContext();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({ ...userData });
  const [newSkill, setNewSkill] = useState("");
  const [newInterest, setNewInterest] = useState("");

  const handleChange = (field: string, value: string) => {
    setEditedData({
      ...editedData,
      [field]: value,
    });
  };

  const handleSave = () => {
    setUserData(editedData);
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved.",
    });
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !editedData.skills.includes(newSkill.trim())) {
      setEditedData({
        ...editedData,
        skills: [...editedData.skills, newSkill.trim()],
      });
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setEditedData({
      ...editedData,
      skills: editedData.skills.filter((s) => s !== skill),
    });
  };

  const handleAddInterest = () => {
    if (newInterest.trim() && !editedData.interests.includes(newInterest.trim())) {
      setEditedData({
        ...editedData,
        interests: [...editedData.interests, newInterest.trim()],
      });
      setNewInterest("");
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setEditedData({
      ...editedData,
      interests: editedData.interests.filter((i) => i !== interest),
    });
  };

  const handleProfilePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, we would upload the file to a server
      // For now, we'll use a FileReader to get a data URL
      const reader = new FileReader();
      reader.onload = () => {
        setEditedData({
          ...editedData,
          avatar: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Here we would normally upload the CV file to a server
      // For demo purposes, we'll just store the file name
      setEditedData({
        ...editedData,
        cv: file.name,
      });

      toast({
        title: "CV Uploaded",
        description: `${file.name} has been uploaded successfully.`,
      });
    }
  };

  return (
    <MainLayout title="My Profile">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <Card className="mb-6">
          <CardHeader className="pb-0">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="relative w-32 h-32">
                {userData.avatar ? (
                  <img
                    src={userData.avatar}
                    alt={userData.name}
                    className="w-32 h-32 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-comsats-blue text-white flex items-center justify-center text-3xl font-semibold">
                    {userData.name.substring(0, 2).toUpperCase()}
                  </div>
                )}
                {isEditing && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="icon"
                        className="absolute bottom-0 right-0 rounded-full"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Update Profile Picture</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="flex justify-center mb-4">
                          {editedData.avatar ? (
                            <img
                              src={editedData.avatar}
                              alt="Preview"
                              className="w-32 h-32 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-32 h-32 rounded-full bg-comsats-blue text-white flex items-center justify-center text-3xl font-semibold">
                              {userData.name.substring(0, 2).toUpperCase()}
                            </div>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="picture">Upload New Picture</Label>
                          <Input
                            id="picture"
                            type="file"
                            accept="image/*"
                            onChange={handleProfilePictureUpload}
                          />
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-2xl font-bold">{userData.name}</h1>
                <p className="text-gray-500">{userData.email}</p>
                <p className="mt-2">{userData.bio}</p>
                <div className="mt-4 flex justify-center sm:justify-start gap-4">
                  {!isEditing ? (
                    <Button onClick={() => setIsEditing(true)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button onClick={handleSave}>Save Changes</Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsEditing(false);
                          setEditedData({ ...userData });
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Academic Information */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Academic Information</CardTitle>
            </CardHeader>
            <CardContent>
              {!isEditing ? (
                <div className="space-y-4">
                  <div>
                    <Label className="text-gray-500">Registration Number</Label>
                    <p className="font-medium">{userData.regNumber}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500">Batch</Label>
                    <p className="font-medium">{userData.batch}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500">Degree Program</Label>
                    <p className="font-medium">{userData.degree}</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={editedData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={editedData.bio}
                      onChange={(e) => handleChange("bio", e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="regNumber">Registration Number</Label>
                    <Input
                      id="regNumber"
                      value={editedData.regNumber}
                      onChange={(e) => handleChange("regNumber", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="batch">Batch</Label>
                    <Input
                      id="batch"
                      value={editedData.batch}
                      onChange={(e) => handleChange("batch", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="degree">Degree Program</Label>
                    <Input
                      id="degree"
                      value={editedData.degree}
                      onChange={(e) => handleChange("degree", e.target.value)}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Upload CV */}
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-500">CV/Resume</Label>
                  <div className="mt-2">
                    {userData.cv ? (
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                        <span className="text-sm truncate">{userData.cv}</span>
                        <Button size="sm" variant="outline">
                          Download
                        </Button>
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">No CV uploaded</p>
                    )}
                  </div>
                  <div className="mt-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="w-full">
                          <Upload className="h-4 w-4 mr-2" />
                          {userData.cv ? "Update CV" : "Upload CV"}
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Upload CV/Resume</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div>
                            <Label htmlFor="cv">Upload PDF File</Label>
                            <Input
                              id="cv"
                              type="file"
                              accept=".pdf,.doc,.docx"
                              onChange={handleCVUpload}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button onClick={() => {}}>Upload</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent>
              {!isEditing ? (
                <div className="flex flex-wrap gap-2">
                  {userData.skills.length > 0 ? (
                    userData.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No skills added yet</p>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a skill..."
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddSkill();
                        }
                      }}
                    />
                    <Button type="button" onClick={handleAddSkill}>
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {editedData.skills.map((skill) => (
                      <Badge key={skill} className="pr-1">
                        {skill}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 ml-1"
                          onClick={() => handleRemoveSkill(skill)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Interests */}
          <Card>
            <CardHeader>
              <CardTitle>Interests</CardTitle>
            </CardHeader>
            <CardContent>
              {!isEditing ? (
                <div className="flex flex-wrap gap-2">
                  {userData.interests.length > 0 ? (
                    userData.interests.map((interest) => (
                      <Badge key={interest} variant="outline">
                        {interest}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No interests added yet</p>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add an interest..."
                      value={newInterest}
                      onChange={(e) => setNewInterest(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddInterest();
                        }
                      }}
                    />
                    <Button type="button" onClick={handleAddInterest}>
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {editedData.interests.map((interest) => (
                      <Badge key={interest} variant="outline" className="pr-1">
                        {interest}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 ml-1"
                          onClick={() => handleRemoveInterest(interest)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
