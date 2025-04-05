
import { useState, useRef, useEffect } from "react";
import { SendHorizontal, Info, Inbox, Search, RefreshCcw, ArrowUp, ArrowDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  sources?: {
    citation: string;
    page: number;
    text: string;
  }[];
};

type QuestionSuggestion = {
  id: string;
  text: string;
};

export const QATab = () => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const { toast } = useToast();

  // Example question suggestions
  const questionSuggestions: QuestionSuggestion[] = [
    { id: "q1", text: "What are the key technical requirements?" },
    { id: "q2", text: "What is the evaluation criteria for this RFP?" },
    { id: "q3", text: "When are proposal submissions due?" },
    { id: "q4", text: "What certifications are required for this RFP?" },
    { id: "q5", text: "What is the expected timeline for project completion?" },
  ];

  // Scroll to bottom of messages when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle sending a question
  const handleSendQuestion = (questionText: string = query) => {
    if (!questionText.trim()) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: questionText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setQuery("");
    setLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const answers = [
        {
          content: "According to the RFP, the key technical requirements include:\n\n1. Cloud-native architecture using AWS or Azure\n2. Microservices-based approach\n3. Zero-trust security model implementation\n4. API-first design methodology\n5. Automated CI/CD pipeline\n\nThese requirements are detailed in Section 5.2 of the RFP document.",
          sources: [
            {
              citation: "Technical Requirements",
              page: 14,
              text: "The solution must leverage cloud-native architectures on either AWS or Azure platforms, implement a microservices approach, and adhere to zero-trust security principles.",
            },
            {
              citation: "Technical Approach",
              page: 15,
              text: "Vendors must demonstrate experience with API-first design and automated CI/CD pipelines for continuous delivery.",
            },
          ],
        },
        {
          content: "The evaluation criteria for this RFP is based on a 100-point scale with the following breakdown:\n\n- Technical Approach: 40 points\n- Past Performance: 25 points\n- Management Approach: 20 points\n- Price: 15 points\n\nProposals scoring below 70 points in the technical evaluation will not be considered for award.",
          sources: [
            {
              citation: "Evaluation Criteria",
              page: 23,
              text: "Proposals will be evaluated using a 100-point scale with Technical Approach (40%), Past Performance (25%), Management Approach (20%), and Price (15%).",
            },
          ],
        },
        {
          content: "The RFP submissions are due on May 15, 2025 by 5:00 PM Eastern Time. All submissions must be made electronically through the procurement portal. Late submissions will not be accepted under any circumstances.",
          sources: [
            {
              citation: "Submission Instructions",
              page: 3,
              text: "Proposal submissions are due no later than 5:00 PM ET on May 15, 2025. All submissions must be made through the electronic procurement portal.",
            },
          ],
        },
        {
          content: "The required certifications for this RFP include:\n\n1. ISO 27001 (Information Security Management)\n2. CMMI Level 3 or higher\n3. Cloud platform certifications (AWS Certified Solutions Architect or Azure Solutions Architect)\n4. PMP certification for the Project Manager\n5. CISSP certification for the Security Lead\n\nThe certifications must be current and valid at the time of proposal submission.",
          sources: [
            {
              citation: "Qualification Requirements",
              page: 8,
              text: "Vendors must possess ISO 27001 certification and CMMI Level 3 or higher. Key personnel must hold relevant cloud platform certifications, with PMP required for Project Manager and CISSP for Security Lead.",
            },
          ],
        },
        {
          content: "According to the RFP timeline, the project is expected to be completed within 12 months from the contract award date. This includes:\n\n- Planning Phase: 2 months\n- Design Phase: 2 months\n- Development Phase: 5 months\n- Testing Phase: 2 months\n- Deployment Phase: 1 month\n\nThe contract may include options for maintenance and support for up to 3 additional years.",
          sources: [
            {
              citation: "Project Timeline",
              page: 12,
              text: "The project timeline spans 12 months with distinct phases: Planning (2mo), Design (2mo), Development (5mo), Testing (2mo), and Deployment (1mo).",
            },
            {
              citation: "Contract Terms",
              page: 35,
              text: "The base contract period is 12 months with options for 3 additional years of maintenance and support.",
            },
          ],
        },
      ];

      // Match the question to a pre-defined answer for the demo
      let responseIndex = -1;
      
      if (questionText.toLowerCase().includes("technical requirement")) {
        responseIndex = 0;
      } else if (questionText.toLowerCase().includes("evaluation criteria")) {
        responseIndex = 1;
      } else if (questionText.toLowerCase().includes("due") || questionText.toLowerCase().includes("deadline")) {
        responseIndex = 2;
      } else if (questionText.toLowerCase().includes("certification")) {
        responseIndex = 3;
      } else if (questionText.toLowerCase().includes("timeline")) {
        responseIndex = 4;
      } else {
        // Default response if no match
        responseIndex = Math.floor(Math.random() * answers.length);
      }
      
      const responseData = answers[responseIndex];
      
      const aiMessage: Message = {
        id: `msg-${Date.now()}`,
        role: "assistant",
        content: responseData.content,
        timestamp: new Date(),
        sources: responseData.sources,
      };

      setMessages((prev) => [...prev, aiMessage]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="flex flex-col h-[calc(100vh-240px)]">
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
            <CardTitle className="text-xl">RFP Question & Answer</CardTitle>
            <Tabs defaultValue="all" className="w-full md:w-auto">
              <TabsList className="grid w-full md:w-auto grid-cols-3">
                <TabsTrigger value="all" className="text-xs md:text-sm">All Questions</TabsTrigger>
                <TabsTrigger value="technical" className="text-xs md:text-sm">Technical</TabsTrigger>
                <TabsTrigger value="compliance" className="text-xs md:text-sm">Compliance</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col h-full pb-0">
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto mb-4 pr-2">
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 text-gray-500">
                <Info className="h-12 w-12 mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-800 mb-2">Ask questions about this RFP</h3>
                <p className="mb-6 max-w-md mx-auto">
                  Use this AI assistant to ask questions about the RFP document. 
                  Get instant answers with citations from the source material.
                </p>
                
                <div className="w-full max-w-md space-y-2">
                  {questionSuggestions.map((suggestion) => (
                    <Button
                      key={suggestion.id}
                      variant="outline"
                      className="w-full justify-start text-left h-auto py-3"
                      onClick={() => handleSendQuestion(suggestion.text)}
                    >
                      <Search className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="truncate">{suggestion.text}</span>
                    </Button>
                  ))}
                </div>
              </div>
            )}
            
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`mb-4 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-3xl rounded-lg px-4 py-3 ${
                    msg.role === "user"
                      ? "bg-rfp-blue text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                  
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-xs font-medium text-gray-700 mb-2">Sources:</p>
                      <div className="space-y-2">
                        {msg.sources.map((source, idx) => (
                          <div key={idx} className="bg-white rounded p-2 text-sm">
                            <div className="flex justify-between items-center">
                              <Badge variant="outline" className="bg-rfp-blue/10 text-rfp-blue">
                                {source.citation} (p. {source.page})
                              </Badge>
                              <div className="flex space-x-1">
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                  <ArrowUp className="h-3 w-3" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                  <ArrowDown className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                            <p className="text-xs mt-1 text-gray-700">{source.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start mb-4">
                <div className="max-w-3xl rounded-lg px-4 py-3 bg-gray-100">
                  <div className="flex items-center space-x-2">
                    <RefreshCcw className="h-4 w-4 animate-spin" />
                    <span>Analyzing RFP document...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input Area */}
          <div className="border-t p-4 bg-white">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendQuestion();
              }}
              className="flex space-x-2"
            >
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask a question about this RFP..."
                className="flex-1"
                disabled={loading}
              />
              <Button 
                type="submit" 
                className="bg-rfp-blue hover:bg-rfp-blue/90"
                disabled={loading || !query.trim()}
              >
                <SendHorizontal className="h-5 w-5" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
            
            <div className="mt-3 flex items-center text-xs text-gray-500">
              <Info className="h-3 w-3 mr-1" />
              <span>
                AI-powered answers based on the RFP document content. Citations are included for verification.
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QATab;
