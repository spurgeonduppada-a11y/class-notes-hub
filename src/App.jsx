import React, { useState } from 'react';

const CURRENT_SEMESTER_DATA = [
  {
    id: 'dm',
    title: 'Data Mining',
    units: [
      { unit: 1, name: 'Data Preprocessing & Data Warehousing', notesUrl: '/unit1.pdf' },
      { unit: 2, name: 'Association Rule Mining & Apriori Algorithm', notesUrl: '/unit2.pdf' },
      { unit: 3, name: 'Classification Techniques & Decision Trees', notesUrl: '#' },
      { unit: 4, name: 'Cluster Analysis & K-Means Algorithms', notesUrl: '#' },
      { unit: 5, name: 'Outlier Analysis & Web/Text Mining', notesUrl: '#' },
    ],
    assignments: [
      { id: 1, title: 'Assignment 1: Data Cleaning & Transformation Pipeline', fileUrl: '#' },
      { id: 2, title: 'Assignment 2: Apriori vs FP-Growth Comparison', fileUrl: '#' },
      { id: 3, title: 'Assignment 3: Decision Tree Classifier Implementation', fileUrl: '#' },
      { id: 4, title: 'Assignment 4: K-Means Clustering on Multi-Feature Data', fileUrl: '#' },
      { id: 5, title: 'Assignment 5: Outlier Detection and Pattern Analysis', fileUrl: '#' },
    ]
  },
  {
    id: 'cn',
    title: 'Computer Networks',
    units: [
      { unit: 1, name: 'Physical Layer & Network Models (OSI, TCP/IP)', notesUrl: '#' },
      { unit: 2, name: 'Data Link Layer: Framing, Flow & Error Control', notesUrl: '#' },
      { unit: 3, name: '...', notesUrl: '/unit3.pdf' },
      { unit: 4, name: 'Transport Layer: TCP Congestion Control & UDP', notesUrl: '#' },
      { unit: 5, name: 'Application Layer: DNS, HTTP, SMTP & Security', notesUrl: '#' },
    ],
    assignments: [
      { id: 1, title: 'Assignment 1: Network Topology & Packet Tracing Analysis', fileUrl: '/AS.1.pdf' },
      { id: 2, title: 'Assignment 2: CRC and Hamming Error Detection Calculation', fileUrl: '#' },
      { id: 3, title: 'Assignment 3: Subnetting Scheme & Distance Vector Routing', fileUrl: '#' },
      { id: 4, title: 'Assignment 4: TCP Handshake & Flow Control Simulation', fileUrl: '#' },
      { id: 5, title: 'Assignment 5: Socket Programming for Client-Server Model', fileUrl: '#' },
    ]
  },
  {
    id: 'ai',
    title: 'Artificial Intelligence',
    units: [
      { unit: 1, name: 'Introduction to AI Agents & Uninformed Search', notesUrl: '#' },
      { unit: 2, name: 'Informed Heuristic Search (A*, Greedy) & Games', notesUrl: '#' },
      { unit: 3, name: 'Knowledge Representation & First-Order Logic', notesUrl: '#' },
      { unit: 4, name: 'Probabilistic Reasoning & Bayesian Networks', notesUrl: '#' },
      { unit: 5, name: 'Reinforcement Learning & Modern Expert Systems', notesUrl: '#' },
    ],
    assignments: [
      { id: 1, title: 'Assignment 1: State Space Search Problem Formulations', fileUrl: '#' },
      { id: 2, title: 'Assignment 2: A* Algorithm & Minimax Alpha-Beta Pruning', fileUrl: '#' },
      { id: 3, title: 'Assignment 3: Resolution & Inference in Propositional Logic', fileUrl: '#' },
      { id: 4, title: 'Assignment 4: Conditional Probability & Bayes Rule Problems', fileUrl: '#' },
      { id: 5, title: 'Assignment 5: Reinforcement Learning Policy Evaluation', fileUrl: '#' },
    ]
  },
  {
    id: 'ooad',
    title: 'Object Oriented Analysis and Design',
    units: [
      { unit: 1, name: 'OOAD Principles, UML Overview & Use Case Models', notesUrl: '#' },
      { unit: 2, name: 'Static Modeling: Class & Object Diagrams', notesUrl: '#' },
      { unit: 3, name: 'Dynamic Modeling: Sequence, Activity & State Diagrams', notesUrl: '#' },
      { unit: 4, name: 'Architectural & Design Patterns (GoF Patterns)', notesUrl: '#' },
      { unit: 5, name: 'Component/Deployment Diagrams & Software Lifecycle', notesUrl: '#' },
    ],
    assignments: [
      { id: 1, title: 'Assignment 1: Use Case Modeling for Library System', fileUrl: '#' },
      { id: 2, title: 'Assignment 2: Class Diagrams & Multiplicity Relations', fileUrl: '#' },
      { id: 3, title: 'Assignment 3: Interaction & Sequence Diagrams for Checkout Flow', fileUrl: '#' },
      { id: 4, title: 'Assignment 4: Factory and Singleton Pattern Blueprint', fileUrl: '#' },
      { id: 5, title: 'Assignment 5: Deployment Diagram & Component Architecture', fileUrl: '#' },
    ]
  },
  {
    id: 'gs',
    title: 'Gender Sensitization',
    units: [
      { unit: 1, name: 'Understanding Gender, Sex & Socialization Roles', notesUrl: '#' },
      { unit: 2, name: 'Gender Power Relations & Institutional Inequality', notesUrl: '#' },
      { unit: 3, name: 'Gender-Based Violence, Safety & Legal Protections', notesUrl: '#' },
      { unit: 4, name: 'Gender in the Workplace, Leadership & Wage Equality', notesUrl: '#' },
      { unit: 5, name: 'Human Rights, Inclusivity & Constitutional Rights', notesUrl: '#' },
    ],
    assignments: [
      { id: 1, title: 'Assignment 1: Cultural Conditioning & Media Analysis Essay', fileUrl: '#' },
      { id: 2, title: 'Assignment 2: Case Study on Institutional Gender Gaps', fileUrl: '#' },
      { id: 3, title: 'Assignment 3: Legal Frameworks (POSH Act & Protections) Review', fileUrl: '#' },
      { id: 4, title: 'Assignment 4: Workplace Inclusion & Diversity Policies Analysis', fileUrl: '#' },
      { id: 5, title: 'Assignment 5: Synthesis on Constitutional Equity & Rights', fileUrl: '#' },
    ]
  }
];

export default function App() {
  const [selectedSubject, setSelectedSubject] = useState(CURRENT_SEMESTER_DATA[0]);
  const [activeTab, setActiveTab] = useState('units');
  const [searchQuery, setSearchQuery] = useState('');
  const [aiModal, setAiModal] = useState({ open: false, title: '', topic: '', isAssignment: false });
  const [userQuestion, setUserQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState('');

  const filteredSubjects = CURRENT_SEMESTER_DATA.filter((sub) =>
    sub.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openAiAssistant = (title, topic, isAssignment = false) => {
    setUserQuestion('');
    setAiAnswer('');
    setAiModal({ open: true, title, topic, isAssignment });
  };

  const closeAiAssistant = () => {
    setAiModal({ open: false, title: '', topic: '', isAssignment: false });
  };

  const handleAiAsk = () => {
    if (!userQuestion.trim()) return;
    setAiAnswer(
      'Analysis for "' + userQuestion + '":\n\n' +
      '1. Core Topic: ' + aiModal.topic + '\n' +
      '2. Exam / Viva Tip: Structure with clear definitions, diagrams, and steps.\n' +
      '3. Method: Verify boundary cases and key properties.'
    );
  };
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', fontFamily: 'sans-serif', padding: '2rem' }}>
      <header style={{ maxWidth: '1100px', margin: '0 auto 2rem auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#38bdf8' }}>
          Class Study Hub
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.05rem' }}>
          Organized Unit Notes, Assignments (1–5), and AI Study Support.
        </p>
        <input
          type="text"
          placeholder="Search subjects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            marginTop: '1.5rem',
            padding: '0.75rem 1.25rem',
            width: '100%',
            maxWidth: '520px',
            borderRadius: '8px',
            border: '1px solid #334155',
            backgroundColor: '#1e293b',
            color: '#fff',
            fontSize: '1rem',
            outline: 'none'
          }}
        />
      </header>

      <main style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#cbd5e1' }}>Semester Courses</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {filteredSubjects.length > 0 ? (
              filteredSubjects.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setSelectedSubject(sub)}
                  style={{
                    textAlign: 'left',
                    padding: '1rem',
                    borderRadius: '8px',
                    backgroundColor: selectedSubject?.id === sub.id ? '#0284c7' : '#1e293b',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ fontWeight: 'bold', fontSize: '1.05rem' }}>{sub.title}</div>
                </button>
              ))
            ) : (
              <p style={{ color: '#64748b' }}>No courses match your query.</p>
            )}
          </div>
        </div>

        {selectedSubject && (
          <div style={{ backgroundColor: '#1e293b', padding: '1.5rem', borderRadius: '12px', border: '1px solid #334155' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <h2 style={{ fontSize: '1.5rem', margin: 0, color: '#38bdf8' }}>{selectedSubject.title}</h2>

              <div style={{ display: 'flex', gap: '0.5rem', backgroundColor: '#0f172a', padding: '0.25rem', borderRadius: '8px' }}>
                <button
                  onClick={() => setActiveTab('units')}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    border: 'none',
                    cursor: 'pointer',
                    backgroundColor: activeTab === 'units' ? '#38bdf8' : 'transparent',
                    color: activeTab === 'units' ? '#0f172a' : '#94a3b8',
                    fontWeight: 'bold'
                  }}
                >
                  Units (1–5)
                </button>
                <button
                  onClick={() => setActiveTab('assignments')}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    border: 'none',
                    cursor: 'pointer',
                    backgroundColor: activeTab === 'assignments' ? '#38bdf8' : 'transparent',
                    color: activeTab === 'assignments' ? '#0f172a' : '#94a3b8',
                    fontWeight: 'bold'
                  }}
                >
                  Assignments (1–5)
                </button>
              </div>
            </div>

            {activeTab === 'units' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {selectedSubject.units.map((u) => (
                  <div
                    key={u.unit}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.9rem 1rem',
                      backgroundColor: '#0f172a',
                      borderRadius: '8px',
                      border: '1px solid #334155',
                      flexWrap: 'wrap',
                      gap: '0.75rem'
                    }}
                  >
                    <div style={{ flex: '1 1 250px' }}>
                      <span style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: 'bold', display: 'block' }}>
                        UNIT {u.unit}
                      </span>
                      <span style={{ fontSize: '0.95rem', color: '#e2e8f0' }}>{u.name}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => openAiAssistant('Unit ' + u.unit + ' AI Assistant', u.name, false)}
                        style={{
                          padding: '0.45rem 0.8rem',
                          backgroundColor: '#8b5cf6',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.85rem',
                          fontWeight: '600'
                        }}
                      >
                        ✨ Ask AI
                      </button>
                      <button
                        onClick={() => window.open(u.notesUrl, '_blank')}
                        style={{
                          padding: '0.45rem 0.8rem',
                          backgroundColor: '#0284c7',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.85rem'
                        }}
                      >
                        View Notes
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'assignments' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {selectedSubject.assignments.map((a) => (
                  <div
                    key={a.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.9rem 1rem',
                      backgroundColor: '#0f172a',
                      borderRadius: '8px',
                      border: '1px solid #334155',
                      flexWrap: 'wrap',
                      gap: '0.75rem'
                    }}
                  >
                    <div style={{ flex: '1 1 250px' }}>
                      <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 'bold', display: 'block' }}>
                        ASSIGNMENT {a.id}
                      </span>
                      <span style={{ fontSize: '0.95rem', color: '#e2e8f0' }}>{a.title}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => openAiAssistant('Assignment ' + a.id + ' Solver Helper', a.title, true)}
                        style={{
                          padding: '0.45rem 0.8rem',
                          backgroundColor: '#10b981',
                          color: '#0f172a',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.85rem',
                          fontWeight: '700'
                        }}
                      >
                        💡 Solve Guide
                      </button>
                      <button
                        onClick={() => window.open(a.fileUrl, '_blank')}
                        style={{
                          padding: '0.45rem 0.8rem',
                          backgroundColor: '#334155',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.85rem'
                        }}
                      >
                        View PDF
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {aiModal.open && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1.5rem',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#1e293b',
            padding: '1.75rem',
            borderRadius: '12px',
            maxWidth: '600px',
            width: '100%',
            border: '1px solid #475569'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, color: '#38bdf8', fontSize: '1.25rem' }}>{aiModal.title}</h3>
              <button onClick={closeAiAssistant} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
            </div>
            
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1rem' }}>
              Selected Focus: <strong style={{ color: '#f8fafc' }}>{aiModal.topic}</strong>
            </p>

            <div style={{ backgroundColor: '#0f172a', padding: '1rem', borderRadius: '8px', fontSize: '0.88rem', color: '#cbd5e1', marginBottom: '1rem' }}>
              <strong>⚡ Quick AI Insights:</strong>
              <ul style={{ margin: '0.5rem 0 0 1.25rem', padding: 0 }}>
                <li>{aiModal.isAssignment ? 'Key methodology and solution structure identified.' : 'Key theoretical definitions mapped.'}</li>
                <li>{aiModal.isAssignment ? 'Ensure standard steps are verified.' : 'Focus on core principles.'}</li>
              </ul>
            </div>

            <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                placeholder="Ask AI a question..."
                value={userQuestion}
                onChange={(e) => setUserQuestion(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAiAsk()}
                style={{
                  flex: 1,
                  padding: '0.6rem 0.8rem',
                  borderRadius: '6px',
                  border: '1px solid #334155',
                  backgroundColor: '#0f172a',
                  color: '#fff',
                  outline: 'none'
                }}
              />
              <button
                onClick={handleAiAsk}
                style={{
                  padding: '0.6rem 1rem',
                  backgroundColor: '#8b5cf6',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                Ask
              </button>
            </div>

            {aiAnswer && (
              <div style={{ backgroundColor: '#0f172a', padding: '0.85rem', borderRadius: '8px', fontSize: '0.85rem', color: '#e2e8f0', whiteSpace: 'pre-line', border: '1px solid #3b82f6', marginBottom: '1rem' }}>
                {aiAnswer}
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={closeAiAssistant}
                style={{
                  padding: '0.5rem 1.25rem',
                  backgroundColor: '#334155',
                  border: 'none',
                  borderRadius: '6px',
                  color: '#fff',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}