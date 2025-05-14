
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { FileText, Search, Download } from 'lucide-react';

const templateCategories = [
  {
    category: "Rental",
    templates: [
      { id: 1, title: "Residential Lease Agreement", downloads: 5420 },
      { id: 2, title: "Commercial Property Rental", downloads: 1890 },
      { id: 3, title: "Roommate Agreement", downloads: 3250 },
      { id: 4, title: "Notice to Vacate", downloads: 2130 },
    ],
  },
  {
    category: "Loans",
    templates: [
      { id: 5, title: "Personal Loan Agreement", downloads: 4270 },
      { id: 6, title: "Promissory Note", downloads: 2580 },
      { id: 7, title: "Loan Payment Schedule", downloads: 1950 },
      { id: 8, title: "Debt Settlement Agreement", downloads: 1430 },
    ],
  },
  {
    category: "Legal",
    templates: [
      { id: 9, title: "General Affidavit", downloads: 6840 },
      { id: 10, title: "Power of Attorney", downloads: 5120 },
      { id: 11, title: "Non-Disclosure Agreement", downloads: 4730 },
      { id: 12, title: "Cease and Desist Letter", downloads: 2170 },
    ],
  },
  {
    category: "Employment",
    templates: [
      { id: 13, title: "Employment Contract", downloads: 5290 },
      { id: 14, title: "Independent Contractor Agreement", downloads: 4180 },
      { id: 15, title: "Termination Letter", downloads: 2340 },
      { id: 16, title: "Employee Handbook", downloads: 1720 },
    ],
  },
];

const Templates = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-legal-primary text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <FileText className="h-16 w-16 mx-auto mb-6" />
            <h1 className="text-4xl font-bold mb-4">Legal Document Templates</h1>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Access professionally drafted legal templates that you can customize for your specific needs.
            </p>
            <div className="max-w-lg mx-auto relative">
              <Input 
                placeholder="Search for templates..."
                className="pl-10 py-6 rounded-full text-black"
              />
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </section>

        {/* Templates Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Tabs defaultValue={templateCategories[0].category.toLowerCase()}>
              <div className="flex justify-center mb-8">
                <TabsList className="h-auto p-1">
                  {templateCategories.map((cat) => (
                    <TabsTrigger 
                      key={cat.category} 
                      value={cat.category.toLowerCase()}
                      className="px-6 py-2"
                    >
                      {cat.category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              
              {templateCategories.map((category) => (
                <TabsContent key={category.category} value={category.category.toLowerCase()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.templates.map((template) => (
                      <Card key={template.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <CardHeader className="bg-legal-light pb-2">
                          <CardTitle className="text-legal-primary">{template.title}</CardTitle>
                          <CardDescription>
                            <div className="flex items-center text-sm text-gray-500">
                              <Download className="h-4 w-4 mr-1" />
                              {template.downloads.toLocaleString()} downloads
                            </div>
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <p className="text-gray-600">
                            Professional template that covers all legal requirements and protects your interests. Easy to customize to your specific situation.
                          </p>
                        </CardContent>
                        <CardFooter className="flex justify-between border-t bg-gray-50 py-4">
                          <Button variant="outline">Preview</Button>
                          <Button className="bg-legal-primary hover:bg-legal-secondary">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
        
        {/* How It Works */}
        <section className="py-16 bg-legal-light">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-legal-primary mb-4">How to Use Our Templates</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Using our legal templates is quick, easy, and ensures your documents are legally sound.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-14 h-14 bg-legal-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-legal-primary">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Download Template</h3>
                <p className="text-gray-600">Choose and download the template that fits your needs.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-14 h-14 bg-legal-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-legal-primary">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Fill in Details</h3>
                <p className="text-gray-600">Customize with your specific information and requirements.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-14 h-14 bg-legal-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-legal-primary">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Use Document</h3>
                <p className="text-gray-600">Print, sign, and use your professionally prepared document.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Templates;
