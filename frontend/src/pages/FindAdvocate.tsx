import React from 'react';
import { Search, Star, MapPin, Award, Scale, PhoneCall, Mail } from 'lucide-react';

export const FindAdvocate = () => {
  const advocates = [
    {
      id: 1,
      name: "Adv. Rajesh Kumar",
      type: "NALSA Pro-Bono Lawyer",
      specialty: "Criminal Law, Domestic Violence",
      experience: "15 Years",
      rating: 4.9,
      location: "District Court, Delhi",
      image: "https://i.pravatar.cc/150?img=11",
      free: true
    },
    {
      id: 2,
      name: "Adv. Priya Sharma",
      type: "Private Practitioner",
      specialty: "Property Law, Civil Disputes",
      experience: "8 Years",
      rating: 4.7,
      location: "High Court, Delhi",
      image: "https://i.pravatar.cc/150?img=5",
      free: false
    },
    {
      id: 3,
      name: "Adv. Sanjay Gupta",
      type: "NALSA Pro-Bono Lawyer",
      specialty: "Cyber Crime, Financial Fraud",
      experience: "12 Years",
      rating: 4.8,
      location: "Supreme Court, Delhi",
      image: "https://i.pravatar.cc/150?img=33",
      free: true
    },
    {
      id: 4,
      name: "Adv. Meera Reddy",
      type: "Private Practitioner",
      specialty: "Family Law, Divorce",
      experience: "20 Years",
      rating: 5.0,
      location: "Family Court, Dwarka",
      image: "https://i.pravatar.cc/150?img=44",
      free: false
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex justify-between items-center mb-8 border-b pb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#1a2a40] tracking-tight mb-2">Find an Advocate</h2>
            <p className="text-slate-500 font-medium">Connect with verified NALSA pro-bono lawyers and private practitioners.</p>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by specialty..." 
              className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {advocates.map((adv) => (
            <div key={adv.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:border-orange-400 hover:shadow-md transition-all group">
              <div className="flex items-start gap-4">
                <img src={adv.image} alt={adv.name} className="w-16 h-16 rounded-full border-2 border-slate-100 object-cover" />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-slate-800">{adv.name}</h3>
                    <div className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded text-xs font-bold border border-yellow-200">
                      <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" /> {adv.rating}
                    </div>
                  </div>
                  
                  <p className={`text-xs font-bold px-2 py-1 rounded inline-block mt-1 mb-3 ${adv.free ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                    {adv.type}
                  </p>
                  
                  <div className="space-y-2 text-sm text-slate-600 font-medium">
                    <p className="flex items-center gap-2"><Scale className="h-4 w-4 text-slate-400" /> {adv.specialty}</p>
                    <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-slate-400" /> {adv.location}</p>
                    <p className="flex items-center gap-2"><Award className="h-4 w-4 text-slate-400" /> {adv.experience} Experience</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-slate-100 flex gap-3">
                <button className="flex-1 bg-[#1a2a40] text-white py-2 rounded-lg font-bold text-sm hover:bg-slate-800 transition">
                  Book Consultation
                </button>
                <button className="p-2 bg-slate-50 border border-slate-200 text-slate-600 hover:text-orange-600 hover:border-orange-200 rounded-lg transition">
                  <PhoneCall className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
