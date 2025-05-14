import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Search, Star, Briefcase, Calendar, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const specializations = [
  "All Specializations",
  "Family Law",
  "Corporate Law",
  "Criminal Defense",
  "Intellectual Property",
  "Real Estate Law",
  "Tax Law",
  "Immigration Law",
  "Employment Law"
];

const dummyLawyers = [
  {
    id: 'dummy1',
    firstName: 'John',
    lastName: 'Doe',
    specialization: 'Corporate Law',
    photo: '',
    rating: 4.8,
    reviews: 45,
    experience: 10,
    cases: 150,
    winRate: 85,
    available: true
  },
  {
    id: 'dummy2',
    firstName: 'Jane',
    lastName: 'Smith',
    specialization: 'Family Law',
    photo: '',
    rating: 4.5,
    reviews: 30,
    experience: 7,
    cases: 100,
    winRate: 78,
    available: false
  },
  {
    id: 'dummy3',
    firstName: 'Rahul',
    lastName: 'Verma',
    specialization: 'Criminal Defense',
    photo: '',
    rating: 4.9,
    reviews: 60,
    experience: 12,
    cases: 180,
    winRate: 90,
    available: true
  }
];

const handleViewProfile = () => {
  const pdfUrl = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
  window.open(pdfUrl, '_blank');
};

const Lawyers = () => {
  const [lawyers, setLawyers] = useState([]);
  const [filteredLawyers, setFilteredLawyers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('All Specializations');

  useEffect(() => {
    const fetchLawyers = async () => {
      const querySnapshot = await getDocs(collection(db, "lawyers"));
      const firestoreLawyers = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      const combinedLawyers = [...dummyLawyers, ...firestoreLawyers];
      setLawyers(combinedLawyers);
      setFilteredLawyers(combinedLawyers);
    };

    fetchLawyers();
  }, []);

  useEffect(() => {
    const query = searchQuery.toLowerCase();

    const filtered = lawyers.filter(lawyer => {
      const fullName = `${lawyer.firstName} ${lawyer.lastName}`.toLowerCase();
      const matchesName = fullName.includes(query);
      const matchesSpec = lawyer.specialization?.toLowerCase().includes(query);
      return matchesName || matchesSpec;
    });

    setFilteredLawyers(filtered);
  }, [searchQuery, selectedSpecialization, lawyers]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-legal-primary text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <Briefcase className="h-16 w-16 mx-auto mb-6" />
            <h1 className="text-4xl font-bold mb-4">Find a Qualified Lawyer</h1>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Connect with experienced lawyers specialized in your specific legal matters.
            </p>
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Input 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, specialization, or location..."
                  className="pl-10 py-6 rounded-lg text-black"
                />
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              </div>
              <Select
                value={selectedSpecialization}
                onValueChange={(value) => setSelectedSpecialization(
                  specializations.find(spec => spec.toLowerCase().replace(/\s/g, '-') === value) || "All Specializations"
                )}
              >
                <SelectTrigger className="w-full md:w-[240px] py-6 bg-white text-black">
                  <SelectValue placeholder="Select specialization" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {specializations.map((specialization) => (
                      <SelectItem key={specialization} value={specialization.toLowerCase().replace(/\s/g, '-')}>
                        {specialization}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button className="bg-legal-accent hover:bg-legal-accent/90 text-legal-primary py-6 px-8">
                Search
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-legal-primary">Available Lawyers</h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Show:</span>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Lawyers" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Lawyers</SelectItem>
                    <SelectItem value="available">Available Now</SelectItem>
                    <SelectItem value="top-rated">Top Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLawyers.map((lawyer) => {
                const {
                  id,
                  firstName = "Unknown",
                  lastName = "",
                  specialization = "N/A",
                  photo,
                  rating = 0,
                  reviews = 0,
                  experience = "N/A",
                  cases = "N/A",
                  winRate = "N/A",
                  available = false,
                } = lawyer;

                const fullName = `${firstName} ${lastName}`.trim();

                const photoURL = photo && typeof photo === 'string' && photo.startsWith('http')
                  ? photo
                  : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&h=256&q=80';

                return (
                  <Card key={id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="relative">
                        <div className="absolute top-4 right-4">
                          {available ? (
                            <Badge className="bg-green-500 hover:bg-green-600">
                              <Check className="h-3 w-3 mr-1" />
                              Available Now
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-white text-gray-500 border-gray-300">
                              Not Available
                            </Badge>
                          )}
                        </div>
                        <div className="p-6 flex gap-4 items-center">
                          <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 border-4 border-white shadow-sm">
                            <img 
                              src={photoURL} 
                              alt={fullName} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold">{fullName}</h3>
                            <p className="text-legal-primary font-medium">{specialization}</p>
                            <div className="flex items-center mt-1">
                              <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                              <span className="ml-1 font-semibold">{rating}</span>
                              <span className="text-gray-500 ml-1">({reviews} reviews)</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="px-6 py-4 border-t border-gray-100">
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div>
                            <p className="text-gray-500 text-xs">Experience</p>
                            <p className="font-semibold">{experience} yrs</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs">Cases</p>
                            <p className="font-semibold">{cases}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs">Win Rate</p>
                            <p className="font-semibold">{winRate}%</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="bg-gray-50 border-t p-4">
                      <div className="w-full flex gap-3">
                        <Button onClick={handleViewProfile} variant="outline" className="flex-1">
                          View Profile
                        </Button>
                        <Button
                          disabled={!available}
                          className={`flex-1 ${available ? 'bg-legal-primary hover:bg-legal-secondary' : ''}`}
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          Book
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>

            <div className="mt-12 text-center">
              <Button variant="outline" className="px-8">Load More</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Lawyers;
