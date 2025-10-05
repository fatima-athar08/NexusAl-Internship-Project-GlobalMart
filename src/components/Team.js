import React from 'react'
import './Team.css'

export default function Team({teamMembers }) {
  return (
   <section id="team" className="section team-section">
        <h2 className="section-heading">Meet Our Experts</h2>
        
        <div className="team-group-photo">
            <img src="images/team-group.avif" alt="Our Team" className="team-img"/>
        </div>

        <div className="team-members">
            {teamMembers.map((m)=>(
            <div className="team-member-card" key={m.id}>
                <img src={m.image} alt={m.name}/>
                <div className="member-info">
                    <h3>{m.name}</h3>
                    <h4>{m.role}</h4>
                    <p>{m.quote}</p>
                    <div className="member-links">
                        {Object.entries(m.social).map(([platform, link]) => (
                            <a key={platform} href={link} target="_blank" rel="noopener noreferrer">
                                <i className={`fab fa-${platform}`}></i>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
              ))}
        </div>
    </section>
  )
}