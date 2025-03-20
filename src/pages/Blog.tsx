
import React from 'react';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useApp } from '@/context/AppContext';
import { Calendar, Clock, User, Tag, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Sample blog data
const blogPosts = [
  {
    id: 1,
    title: "How Custom Applications Can Transform Your Business",
    excerpt: "Discover the ways in which tailored software solutions can drive growth, efficiency, and competitive advantage for businesses of all sizes.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
    date: "May 15, 2023",
    readTime: "8 min",
    author: "Sarah Johnson",
    category: "Business",
    featured: true
  },
  {
    id: 2,
    title: "The Rise of Progressive Web Applications",
    excerpt: "Explore how PWAs are changing the landscape of web development and offering native-like experiences across all devices.",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=1200",
    date: "June 22, 2023",
    readTime: "6 min",
    author: "Michael Chen",
    category: "Technology"
  },
  {
    id: 3,
    title: "Securing Your Application: Best Practices",
    excerpt: "Learn essential security measures to protect your applications and user data from common threats and vulnerabilities.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1200",
    date: "July 3, 2023",
    readTime: "10 min",
    author: "Alex Rodriguez",
    category: "Security"
  },
  {
    id: 4,
    title: "Optimizing User Experience in Mobile Applications",
    excerpt: "Discover key principles and techniques for creating intuitive, engaging mobile app experiences that keep users coming back.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
    date: "August 17, 2023",
    readTime: "7 min",
    author: "Emma Wilson",
    category: "Design"
  },
  {
    id: 5,
    title: "The Future of AI in Application Development",
    excerpt: "Explore how artificial intelligence is revolutionizing software development and creating new possibilities for businesses.",
    image: "https://images.unsplash.com/photo-1677442135197-3b21a53bcc3e?auto=format&fit=crop&q=80&w=1200",
    date: "September 5, 2023",
    readTime: "9 min",
    author: "David Park",
    category: "Technology"
  },
  {
    id: 6,
    title: "Choosing the Right Technology Stack for Your Project",
    excerpt: "A comprehensive guide to selecting the optimal combination of technologies for your application development needs.",
    image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&q=80&w=1200",
    date: "October 12, 2023",
    readTime: "11 min",
    author: "Olivia Martinez",
    category: "Development"
  }
];

const Blog = () => {
  const { openChatbot } = useApp();

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero section */}
        <section className="bg-gradient-to-b from-indigo-50 to-white py-20 px-6">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-700">
              Insights & Resources
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-10">
              Stay updated with the latest trends, best practices, and insights in application development and digital innovation.
            </p>
          </div>
        </section>

        {/* Featured post */}
        {blogPosts.filter(post => post.featured).map(featuredPost => (
          <section key={featuredPost.id} className="py-12 px-6 bg-white">
            <div className="container mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center p-2 bg-purple-50 rounded-lg mb-4">
                    <span className="text-purple-600 font-medium">Featured Post</span>
                  </div>
                  <h2 className="text-3xl font-bold mb-4">{featuredPost.title}</h2>
                  <p className="text-gray-700 mb-6">{featuredPost.excerpt}</p>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-6 space-x-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{featuredPost.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{featuredPost.readTime} read</span>
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      <span>{featuredPost.author}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-8">
                    <Tag className="h-4 w-4 mr-1 text-blue-500" />
                    <span className="text-sm font-medium text-blue-500">{featuredPost.category}</span>
                  </div>
                  
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    Read Article
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-8 rounded-2xl">
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title} 
                    className="w-full h-auto rounded-xl shadow-lg object-cover" 
                  />
                </div>
              </div>
            </div>
          </section>
        ))}

        <Separator className="my-4" />

        {/* Blog posts grid */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Latest Articles</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.filter(post => !post.featured).map(post => (
                <div key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute top-2 right-2 bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-xs text-gray-500 mb-3 space-x-3">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{post.readTime} read</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-semibold">
                          {post.author.charAt(0)}
                        </div>
                        <span className="text-xs ml-2">{post.author}</span>
                      </div>
                      <Button size="sm" variant="ghost" className="text-blue-600 hover:text-blue-800">
                        Read more
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Button variant="outline" className="border-indigo-200 hover:bg-indigo-50">
                Load More Articles
              </Button>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-20 px-6 bg-gradient-to-r from-indigo-600 to-blue-700 text-white">
          <div className="container mx-auto text-center max-w-2xl">
            <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="mb-8">Get the latest articles, resources, and updates delivered directly to your inbox.</p>
            
            <div className="flex flex-col sm:flex-row items-center max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-4 py-3 rounded-lg sm:rounded-r-none mb-3 sm:mb-0 text-gray-900 focus:outline-none" 
              />
              <Button className="w-full sm:w-auto bg-white text-indigo-700 hover:bg-gray-100 sm:rounded-l-none">
                Subscribe
              </Button>
            </div>
            <p className="text-xs mt-4 text-indigo-100">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Blog;
