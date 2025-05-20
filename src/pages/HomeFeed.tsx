import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAppContext } from "@/App";
import { useToast } from "@/components/ui/use-toast";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter 
} from "@/components/ui/dialog";
import { Plus, Heart, MessageCircle, SmilePlus } from "lucide-react";
import { motion } from "framer-motion";

interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  image?: string;
  video?: string;
  timestamp: string;
  likes: number;
  comments: Comment[];
  userLiked: boolean;
}

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
}

const mockPosts: Post[] = [
  {
    id: "1",
    author: {
      name: "Ahmed Khan",
      avatar: "AK",
    },
    content: "Just submitted my final project for Software Engineering class! 🎉",
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159",
    timestamp: "2 hours ago",
    likes: 24,
    comments: [
      {
        id: "c1",
        author: {
          name: "Fatima Ali",
          avatar: "FA",
        },
        content: "Congratulations! What was your project about?",
        timestamp: "1 hour ago",
      },
    ],
    userLiked: false,
  },
  {
    id: "2",
    author: {
      name: "Sara Ahmed",
      avatar: "SA",
    },
    content: "Our team won the COMSATS hackathon! So proud of everyone's hard work. 🏆",
    image: "https://images.unsplash.com/photo-1535016120720-40c646be5580",
    timestamp: "5 hours ago",
    likes: 56,
    comments: [],
    userLiked: true,
  },
  {
    id: "3",
    author: {
      name: "Muhammad Ali",
      avatar: "MA",
    },
    content: "Looking for study partners for the upcoming Algorithms exam next week. Anyone interested?",
    timestamp: "Yesterday",
    likes: 8,
    comments: [
      {
        id: "c2",
        author: {
          name: "Zain Abbas",
          avatar: "ZA",
        },
        content: "I'm in! Let's meet at the library tomorrow.",
        timestamp: "16 hours ago",
      },
      {
        id: "c3",
        author: {
          name: "Ayesha Khan",
          avatar: "AK",
        },
        content: "Count me in too! What time?",
        timestamp: "12 hours ago",
      },
    ],
    userLiked: false,
  },
];

const HomeFeed = () => {
  const { userData } = useAppContext();
  const { toast } = useToast();
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostMedia, setNewPostMedia] = useState<string | null>(null);
  const [commentText, setCommentText] = useState("");
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  const handleCreatePost = () => {
    if (!newPostContent.trim()) {
      toast({
        title: "Empty post",
        description: "Please add some text to your post",
        variant: "destructive",
      });
      return;
    }

    const newPost: Post = {
      id: `p${Date.now()}`,
      author: {
        name: userData.name,
        avatar: userData.avatar || userData.name.substring(0, 2).toUpperCase(),
      },
      content: newPostContent,
      timestamp: "Just now",
      likes: 0,
      comments: [],
      userLiked: false,
    };

    if (newPostMedia) {
      if (newPostMedia.includes("video")) {
        newPost.video = newPostMedia;
      } else {
        newPost.image = newPostMedia;
      }
    }

    setPosts([newPost, ...posts]);
    setNewPostContent("");
    setNewPostMedia(null);
    setIsCreatePostOpen(false);

    toast({
      title: "Post created!",
      description: "Your post has been shared with the community",
    });
  };

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            likes: post.userLiked ? post.likes - 1 : post.likes + 1,
            userLiked: !post.userLiked,
          };
        }
        return post;
      })
    );
  };

  const handleAddComment = (postId: string) => {
    if (!commentText.trim()) return;

    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [
              ...post.comments,
              {
                id: `c${Date.now()}`,
                author: {
                  name: userData.name,
                  avatar: userData.avatar || userData.name.substring(0, 2).toUpperCase(),
                },
                content: commentText,
                timestamp: "Just now",
              },
            ],
          };
        }
        return post;
      })
    );

    setCommentText("");
    setActiveCommentId(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, we would upload the file to a server and get a URL back
      // For now, we'll just use a placeholder URL
      const isVideo = file.type.includes("video");
      const placeholderUrl = isVideo
        ? "https://example.com/video/placeholder.mp4"
        : "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158";
      setNewPostMedia(placeholderUrl);
    }
  };

  const toggleEmoji = (postId: string) => {
    toast({
      title: "Emoji Reactions",
      description: "Emoji reactions feature will be available in the next update!",
    });
  };

  return (
    <MainLayout title="Home Feed">
      <div className="max-w-2xl mx-auto">
        {/* Create post card */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-comsats-blue text-white flex items-center justify-center font-semibold">
              {userData.avatar || userData.name.substring(0, 2).toUpperCase()}
            </div>
            <Dialog open={isCreatePostOpen} onOpenChange={setIsCreatePostOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full text-left justify-start text-gray-500 bg-gray-100 hover:bg-gray-200"
                >
                  Start a New Post
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Create Post</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <Textarea
                    placeholder="What's on your mind?"
                    className="min-h-32"
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                  />
                  {newPostMedia && (
                    <div className="relative">
                      <img
                        src={newPostMedia}
                        alt="Post media"
                        className="w-full rounded-md object-cover max-h-60"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => setNewPostMedia(null)}
                      >
                        Remove
                      </Button>
                    </div>
                  )}
                  <div>
                    <label
                      htmlFor="post-media"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Add Photo/Video
                    </label>
                    <Input
                      id="post-media"
                      type="file"
                      accept="image/*,video/*"
                      onChange={handleFileUpload}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleCreatePost}>Post</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Posts feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="post-card"
            >
              {/* Post header */}
              <div className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-comsats-blue text-white flex items-center justify-center font-semibold">
                  {post.author.avatar}
                </div>
                <div>
                  <h3 className="font-semibold">{post.author.name}</h3>
                  <p className="text-xs text-gray-500">{post.timestamp}</p>
                </div>
              </div>

              {/* Post content */}
              <div className="px-4 py-2">
                <p>{post.content}</p>
              </div>

              {/* Post media */}
              {post.image && (
                <div className="mt-2">
                  <img
                    src={post.image}
                    alt="Post"
                    className="w-full max-h-96 object-cover"
                  />
                </div>
              )}
              {post.video && (
                <div className="mt-2">
                  <div className="w-full bg-black aspect-video flex items-center justify-center text-white">
                    Video Player Placeholder
                  </div>
                </div>
              )}

              {/* Post actions */}
              <div className="p-4 flex items-center space-x-4 border-t border-b">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`flex items-center gap-1 ${
                    post.userLiked ? "text-red-500" : ""
                  }`}
                  onClick={() => handleLike(post.id)}
                >
                  <Heart className={`w-5 h-5 ${post.userLiked ? "fill-current" : ""}`} />
                  {post.likes > 0 && <span>{post.likes}</span>}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={() => setActiveCommentId(activeCommentId === post.id ? null : post.id)}
                >
                  <MessageCircle className="w-5 h-5" />
                  {post.comments.length > 0 && <span>{post.comments.length}</span>}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={() => toggleEmoji(post.id)}
                >
                  <SmilePlus className="w-5 h-5" />
                </Button>
              </div>

              {/* Comments */}
              {(post.comments.length > 0 || activeCommentId === post.id) && (
                <div className="p-4 bg-gray-50">
                  {/* Comment input */}
                  {activeCommentId === post.id && (
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-full bg-comsats-green text-white flex items-center justify-center text-sm font-semibold">
                        {userData.name.substring(0, 2).toUpperCase()}
                      </div>
                      <Input
                        placeholder="Write a comment..."
                        className="flex-1"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                      />
                      <Button
                        size="sm"
                        onClick={() => handleAddComment(post.id)}
                        disabled={!commentText.trim()}
                      >
                        Post
                      </Button>
                    </div>
                  )}

                  {/* Comment list */}
                  <div className="space-y-4">
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="flex gap-2">
                        <div className="w-8 h-8 rounded-full bg-comsats-green text-white flex items-center justify-center text-sm font-semibold">
                          {comment.author.avatar}
                        </div>
                        <div className="bg-white rounded-lg p-2 flex-1">
                          <p className="text-sm font-semibold">{comment.author.name}</p>
                          <p className="text-sm">{comment.content}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {comment.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Floating action button */}
        <div className="fixed bottom-20 right-6">
          <Button
            size="lg"
            className="rounded-full w-14 h-14"
            onClick={() => setIsCreatePostOpen(true)}
          >
            <Plus className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default HomeFeed;
