import React from 'react';
import About from '../components/About';
import Team from '../components/Team';

export default function AboutPage() {
    const mission = "To connect buyers and sellers across the world with quality and value";
    const values = [
        { title: "Customer First:", text: "Your satisfaction is our success." },
        { title: "Quality Curated:", text: "We vet products and sellers." },
        { title: "Transparency:", text: "No hidden fees, just fair prices." }
    ];
    const image = "images/team photo.avif";
    
    // Updated Team Members Data
    const teamMembers=[
      {
        id:1,name:"Aris Throne",role:"UX Design & CRO Lead",image:"images/Aris Throne.avif",quote:"Implemented a user-friendly site search and filtering system, making it easier for customers to find exactly what they need.",social: { linkedin: "#", github: "#" }
      },
      {
        id:2,name:"Ben Carter",role:"E-commerce Data Analyst",image:"images/Ben Carter.avif",quote:"Performed customer segmentation analysis to identify high-value cohorts and personalize marketing efforts, leading to a 12% increase in customer retention.",social: { instagram: "#" }
      },
      {
        id:3,name:"Sofia Rodriguez",role:"Product & Category Manager",image:"images/Sofia Rodriguez.avif",quote:"Developed and executed the merchandising strategy for key product categories, optimizing product assortments based on sales trends and profitability analysis.",social: { behance: "#" }
      },
      {
        id:4,name:"Maya Chen",role:"Growth Marketing Manager",image:"images/Maya Chen.avif",quote:"Developed and executed a multi-channel digital marketing strategy(SEO,PPC,email) that increased organic traffic by 40% year-over-year.",social: { instagram: "#" }
      },
      {
        id:5,name:"Chloe Davis",role:"Backend Engineer & System Architect",image:"images/Chloe Davis.avif",quote:"Architected and scaled GlobalMart's product inventory management system, ensuring real-time sync across all sales channels and preventing overselling.",social: { github: "#" }
      }
    ];

    return (
        <div className="page-container">
            <About mission={mission} values={values} image={image} />
            <Team teamMembers={teamMembers} />
        </div>
    );
}