
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, ExternalLink, Search } from "lucide-react";

interface SocietyEvent {
  id: string;
  title: string;
  society: string;
  type: "Online" | "Physical";
  date: string;
  day: string;
  time: string;
  location: string;
  campus: string;
  joinLink: string;
  details: string;
  image: string;
}

const mockEvents: SocietyEvent[] = [
  {
    id: "1",
    title: "Annual Tech Hackathon",
    society: "Computing Society",
    type: "Physical",
    date: "May 20, 2025",
    day: "Tuesday",
    time: "9:00 AM - 5:00 PM",
    location: "Main Auditorium",
    campus: "Islamabad Campus",
    joinLink: "",
    details:
      "Join us for a full-day hackathon where teams will compete to build innovative solutions. Cash prizes for the top three teams!",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
  },
  {
    id: "2",
    title: "AI Workshop Series",
    society: "AI & Data Science Society",
    type: "Online",
    date: "May 25, 2025",
    day: "Sunday",
    time: "3:00 PM - 5:00 PM",
    location: "",
    campus: "Virtual",
    joinLink: "https://zoom.us/j/example",
    details:
      "Learn the fundamentals of artificial intelligence in this beginner-friendly workshop series. Topics include machine learning basics, neural networks, and practical applications.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485",
  },
  {
    id: "3",
    title: "Business Plan Competition",
    society: "Entrepreneurship Society",
    type: "Physical",
    date: "June 5, 2025",
    day: "Thursday",
    time: "10:00 AM - 2:00 PM",
    location: "Business Studies Building",
    campus: "Lahore Campus",
    joinLink: "",
    details:
      "Present your business ideas to industry professionals and compete for funding opportunities. This competition aims to foster entrepreneurial spirit among students.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
  },
  {
    id: "4",
    title: "Game Development Workshop",
    society: "Gaming Society",
    type: "Online",
    date: "May 30, 2025",
    day: "Friday",
    time: "4:00 PM - 6:00 PM",
    location: "",
    campus: "Virtual",
    joinLink: "https://zoom.us/j/examplegame",
    details:
      "Learn the basics of game development using Unity. This workshop is suitable for beginners with basic programming knowledge. By the end, you'll have created a simple 2D game.",
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f",
  },
  {
    id: "5",
    title: "Engineering Project Exhibition",
    society: "Engineering Society",
    type: "Physical",
    date: "June 10, 2025",
    day: "Wednesday",
    time: "12:00 PM - 4:00 PM",
    location: "Engineering Block",
    campus: "Abbottabad Campus",
    joinLink: "",
    details:
      "Showcase of student engineering projects across all disciplines. Come explore innovative solutions and network with industry representatives.",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12",
  },
  {
    id: "6",
    title: "Web Development Bootcamp",
    society: "Web Development Society",
    type: "Online",
    date: "June 15-20, 2025",
    day: "Monday-Saturday",
    time: "5:00 PM - 7:00 PM",
    location: "",
    campus: "Virtual",
    joinLink: "https://zoom.us/j/webdev",
    details:
      "Intensive 6-day web development bootcamp covering HTML, CSS, JavaScript, React, and Node.js. Build a full-stack web application by the end of the week.",
    image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d",
  },
  {
    id: "7",
    title: "Art Exhibition",
    society: "Fine Arts Society",
    type: "Physical",
    date: "June 25, 2025",
    day: "Wednesday",
    time: "3:00 PM - 7:00 PM",
    location: "Art Gallery",
    campus: "Wah Campus",
    joinLink: "",
    details:
      "Showcasing student artwork across various mediums including painting, sculpture, photography, and digital art. Refreshments will be served.",
    image: "https://images.unsplash.com/photo-1594627882045-57465104050f",
  },
];

const Societies = () => {
  const [events] = useState<SocietyEvent[]>(mockEvents);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const selectedEvent = events.find((event) => event.id === selectedEventId);

  const filterEvents = (type: "All" | "Online" | "Physical") => {
    return events.filter((event) => {
      const matchesSearch = 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.society.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.campus.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = type === "All" || event.type === type;

      return matchesSearch && matchesType;
    });
  };

  const allFilteredEvents = filterEvents("All");
  const onlineFilteredEvents = filterEvents("Online");
  const physicalFilteredEvents = filterEvents("Physical");

  return (
    <MainLayout title="Society Events">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-2">Upcoming Events</h2>
          <p className="text-gray-600 mb-6">
            Discover and participate in events organized by various student societies at COMSATS University.
          </p>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search events, societies or campus..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Tabs for filtering */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="all">All Events</TabsTrigger>
              <TabsTrigger value="physical">Physical Events</TabsTrigger>
              <TabsTrigger value="online">Online Events</TabsTrigger>
            </TabsList>

            {/* All Events */}
            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {allFilteredEvents.length === 0 ? (
                  <div className="col-span-2 text-center py-8">
                    <p className="text-gray-500">No events matching your search criteria.</p>
                  </div>
                ) : (
                  allFilteredEvents.map((event) => (
                    <Card key={event.id} className="overflow-hidden">
                      <div className="h-48 overflow-hidden">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{event.title}</CardTitle>
                          <Badge variant={event.type === "Online" ? "secondary" : "default"}>
                            {event.type}
                          </Badge>
                        </div>
                        <CardDescription>{event.society}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span>
                              {event.date} ({event.day}) • {event.time}
                            </span>
                          </div>
                          {event.type === "Physical" ? (
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-gray-500" />
                              <span>
                                {event.location}, {event.campus}
                              </span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-gray-500" />
                              <span>Virtual Event</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => setSelectedEventId(event.id)}
                        >
                          View Details
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            {/* Physical Events */}
            <TabsContent value="physical">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {physicalFilteredEvents.length === 0 ? (
                  <div className="col-span-2 text-center py-8">
                    <p className="text-gray-500">No physical events matching your search criteria.</p>
                  </div>
                ) : (
                  physicalFilteredEvents.map((event) => (
                    <Card key={event.id} className="overflow-hidden">
                      <div className="h-48 overflow-hidden">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{event.title}</CardTitle>
                          <Badge variant="default">Physical</Badge>
                        </div>
                        <CardDescription>{event.society}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span>
                              {event.date} ({event.day}) • {event.time}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span>
                              {event.location}, {event.campus}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => setSelectedEventId(event.id)}
                        >
                          View Details
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            {/* Online Events */}
            <TabsContent value="online">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {onlineFilteredEvents.length === 0 ? (
                  <div className="col-span-2 text-center py-8">
                    <p className="text-gray-500">No online events matching your search criteria.</p>
                  </div>
                ) : (
                  onlineFilteredEvents.map((event) => (
                    <Card key={event.id} className="overflow-hidden">
                      <div className="h-48 overflow-hidden">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{event.title}</CardTitle>
                          <Badge variant="secondary">Online</Badge>
                        </div>
                        <CardDescription>{event.society}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span>
                              {event.date} ({event.day}) • {event.time}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-gray-500" />
                            <span>Virtual Event</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => setSelectedEventId(event.id)}
                        >
                          View Details
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Event details dialog */}
        <Dialog open={!!selectedEventId} onOpenChange={(open) => !open && setSelectedEventId(null)}>
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle>{selectedEvent?.title}</DialogTitle>
            </DialogHeader>
            {selectedEvent && (
              <div className="space-y-4">
                <div className="h-56 overflow-hidden rounded-md">
                  <img
                    src={selectedEvent.image}
                    alt={selectedEvent.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">{selectedEvent.society}</h3>
                    <Badge variant={selectedEvent.type === "Online" ? "secondary" : "default"}>
                      {selectedEvent.type}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="font-medium">{selectedEvent.date}</p>
                          <p className="text-gray-500">{selectedEvent.day}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="font-medium">{selectedEvent.time}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {selectedEvent.type === "Physical" ? (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <div>
                            <p className="font-medium">{selectedEvent.location}</p>
                            <p className="text-gray-500">{selectedEvent.campus}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <ExternalLink className="w-4 h-4 text-gray-500" />
                          <div>
                            <p className="font-medium">Virtual Event</p>
                            <p className="text-gray-500">{selectedEvent.campus}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-2 border-t">
                    <h4 className="font-medium mb-2">Event Details:</h4>
                    <p className="text-gray-700">{selectedEvent.details}</p>
                  </div>

                  <div className="pt-4">
                    {selectedEvent.type === "Online" && selectedEvent.joinLink ? (
                      <Button asChild className="w-full">
                        <a
                          href={selectedEvent.joinLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Join Event
                        </a>
                      </Button>
                    ) : (
                      <Button className="w-full">Register to Attend</Button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
};

export default Societies;
