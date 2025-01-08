import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./styles/ParticipantsList.css"
import {LuPencilLine} from "react-icons/lu";

interface Participant {
  id: number;
  name: string;
  email: string;
}

export const ParticipantsList = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchParticipants = async () => {
        try {
            setLoading(true);
            const response = await fetch("http://localhost:3001/participants");
            if(!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            const participants: Participant[] = await response.json();
            setParticipants(participants);
            setError(null);
        } catch(error: unknown) {
            console.error("Error fetching participants:", error);
            setError("Could not fetch participants. Please try again later.");
        } finally {
            setLoading(false);
        }
    };
    fetchParticipants();
  }, []);


  const handleClick = (id: number) => {
      navigate(`/participants/${id}`);
  }

  return (
      <div>
          <header className="header">
              <div className="logo">
                  <svg
                      width="40"
                      height="40"
                      viewBox="0 0 80 80"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-label="logo"
                  >
                      <path d="M5 5H75V75H5V5ZM0 0V80H80V0H0Z" fill="#222222"/>
                      <path d="M60 55H41.6667V60H60V55Z" fill="#222222"/>
                      <path
                          d="M25 60V42.5H41.6667V37.5H25V25H41.6667V20H20V60H25Z"
                          fill="#222222"
                      />
                  </svg>
              </div>
          </header>
          <div className="container">
              {loading ? (
                  <p>Loading ...</p>
              ) : error ? (
                  <p className="error-message">{error}</p>
              ) : (
                  <div className="section" role="region" aria-describedby="participants-title">
                      <h1 className="heading-title">Participants
                          <NavLink to="add" className="add-link">Add Participant</NavLink>
                      </h1>
                      <ul className="participants-list">
                          {participants.map((participant) => (
                              <li key={participant.id} className="participant">
                                  <div className="container-span">
                                      <span className="participant-name">{participant.name}</span>
                                      <span className="participant-email">{participant.email}</span>
                                  </div>

                                  <div className="edit-link-container">
                                      <button className="btn-edit" onClick={() => handleClick(participant.id)}
                                              aria-label={`Edit Participant ${participant.id}`}>
                                          <LuPencilLine/>
                                      </button>
                                      <NavLink to={`/participants/${participant.id}`}
                                               className="edit-link">Edit</NavLink>
                                  </div>

                              </li>
                          ))}
                      </ul>
                  </div>
              )}
          </div>
      </div>
  )
};
