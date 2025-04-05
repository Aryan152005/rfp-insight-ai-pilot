
import { useState, useRef, useEffect } from "react";
import { SendHorizontal, PlusCircle, RefreshCcw, FileText, Inbox, ArrowLeft, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

type Message = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  sources?: {
    title: string;
    page: number;
    text: string;
  }[];
};

type ChatHistoryItem = {
  id: string;
  title: string;
  preview: string;
  date: Date;
};

export const ChatInterface = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "system-1",
      role: "system",
      content: "I'm your RFP analysis assistant. I can answer questions about the IT Modernization RFP document using RAG technology to provide accurate answers with citations. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Mock chat history
  const chatHistory: ChatHistoryItem[] = [
    {
      id: "chat-1",
      title: "IT Modernization RFP",
      preview: "Technical requirements, evaluation criteria...",
      date: new Date(Date.now() - 86400000), // yesterday
    },
    {
      id: "chat-2",
      title: "Healthcare Services Contract",
      preview: "HIPAA compliance, service levels...",
      date: new Date(Date.now() - 172800000), // 2 days ago
    },
    {
      id: "chat-3",
      title: "Federal Construction Project",
      preview: "Davis-Bacon requirements, bonding...",
      date: new Date(Date.now() - 604800000), // 7 days ago
    },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!message.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: message,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage("");
    setLoading(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: `msg-${Date.now()}`,
        role: "assistant",
        content: "Based on the RFP document, the technical requirements include cloud-native architecture on AWS or Azure, microservices implementation, and zero-trust security model. The deadline for submission is May 15, 2025, and the evaluation will weigh technical approach (40%), past performance (25%), management approach (20%), and price (15%).",
        timestamp: new Date(),
        sources: [
          {
            title: "Technical Requirements",
            page: 14,
            text: "The solution must leverage cloud-native architectures on either AWS or Azure platforms, implement a microservices approach, and adhere to zero-trust security principles."
          },
          {
            title: "Submission Instructions",
            page: 3,
            text: "Proposal submissions are due no later than 5:00 PM ET on May 15, 2025."
          },
          {
            title: "Evaluation Criteria",
            page: 23,
            text: "Proposals will be evaluated using a 100-point scale with Technical Approach (40%), Past Performance (25%), Management Approach (20%), and Price (15%)."
          }
        ]
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setLoading(false);
      
      // Focus the input field after response
      inputRef.current?.focus();
    }, 1500);
  };

  const startNewChat = () => {
    toast({
      title: "New Chat Started",
      description: "Your new RFP chat session has been created."
    });
    
    setMessages([
      {
        id: "system-1",
        role: "system",
        content: "I'm your RFP analysis assistant. I can answer questions about RFP documents using RAG technology. How can I help you today?",
        timestamp: new Date(),
      }
    ]);
    
    setMessage("");
  };

  return (
    <div className="flex h-[calc(100vh-80px)]">
      {/* Chat Sidebar */}
      <div className={`border-r ${showSidebar ? 'w-64' : 'w-0'} bg-gray-50 transition-all duration-300 overflow-hidden`}>
        <div className="p-4">
          <Button
            className="w-full bg-rfp-blue hover:bg-rfp-blue/90"
            onClick={startNewChat}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            New Chat
          </Button>
          
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-500 mb-3">Recent Chats</h3>
            <ul className="space-y-2">
              {chatHistory.map((chat) => (
                <li key={chat.id}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-left h-auto py-2 px-3"
                    onClick={() => {
                      toast({
                        title: "Chat Selected",
                        description: `Loaded "${chat.title}" chat history.`
                      });
                    }}
                  >
                    <FileText className="h-4 w-4 mr-2 flex-shrink-0 text-gray-500" />
                    <div className="truncate">
                      <p className="font-medium text-sm">{chat.title}</p>
                      <p className="text-xs text-gray-500 truncate">{chat.preview}</p>
                    </div>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      {/* Chat Main Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="border-b p-4 flex items-center justify-between bg-white">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2 md:hidden"
              onClick={() => setShowSidebar(!showSidebar)}
            >
              {showSidebar ? <ArrowLeft className="h-5 w-5" /> : <Inbox className="h-5 w-5" />}
            </Button>
            <div>
              <h2 className="text-lg font-semibold">IT Modernization RFP</h2>
              <p className="text-sm text-gray-500">Chat with your RFP document</p>
            </div>
          </div>
          
          <div>
            <Button variant="ghost" size="icon">
              <Download className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Messages Area */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-6">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <Card className={`max-w-3xl ${
                  msg.role === "user" 
                    ? "bg-rfp-blue text-white border-rfp-blue" 
                    : "bg-white"
                }`}>
                  <CardContent className="pt-4">
                    {msg.content}
                    
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-xs font-medium text-gray-600 mb-2">Sources:</p>
                        <div className="space-y-2">
                          {msg.sources.map((source, idx) => (
                            <div key={idx} className="bg-gray-50 rounded p-2 text-sm">
                              <Badge variant="outline" className="bg-blue-50 text-blue-800 mb-1">
                                {source.title} (p. {source.page})
                              </Badge>
                              <p className="text-xs text-gray-700">{source.text}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start">
                <Card>
                  <CardContent className="pt-4 flex items-center space-x-2">
                    <RefreshCcw className="h-4 w-4 animate-spin" />
                    <span>Analyzing RFP document...</span>
                  </CardContent>
                </Card>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        {/* Input Area */}
        <div className="p-4 border-t bg-white">
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask a question about this RFP..."
              className="flex-1"
              disabled={loading}
              ref={inputRef}
            />
            <Button 
              type="submit" 
              className="bg-rfp-blue hover:bg-rfp-blue/90"
              disabled={loading || !message.trim()}
            >
              <SendHorizontal className="h-5 w-5" />
            </Button>
          </form>
          
          <p className="text-xs text-center text-gray-500 mt-2">
            Answers are generated using AI and RFP document context. Verify information before use.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
