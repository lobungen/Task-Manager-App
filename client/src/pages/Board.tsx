import { useEffect, useState, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';

import { retrieveTickets, deleteTicket } from '../api/ticketAPI';
import ErrorPage from './ErrorPage';
// import Swimlane from '../components/Swimlane';
import { TicketData } from '../interfaces/TicketData';
import { ApiMessage } from '../interfaces/ApiMessage';
import taskimage from '../assets/task-management.png';

import auth from '../utils/auth';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

import { useQuery } from '@apollo/client';
import { QUERY_TICKETS } from '../utils/queries';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';


const boardStates = ['To Do', 'In Progress', 'Done'];

const Board = () => {
  //const [tickets, setTickets] = useState<TicketData[]>([]);
  //const [error, setError] = useState(false);
  const [ticketsByStatus, setTicketsByStatus] = useState<Record<string, TicketData[]>>({
    'To Do': [],
    'In Progress': [],
    'Done': [],
  });
  // const [tickets, setTickets] = useState<TicketData[]>([]);
  const [error, setError] = useState(false);
  const [loginCheck, setLoginCheck] = useState(false);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'status'>('name');
  
  const { loading, data, error } = useQuery(QUERY_TICKETS);
  // this becomes the source of truth/STATE for tickets
  const tickets = data?.tickets || [];

  console.log("loading: ", loading);
  console.log("data: ", data);
  console.log("error: ", error);

  if (loading) return <p>Loading...</p>;


  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);

    }
  };

  const fetchTickets = async () => {
    try {
      const data = await retrieveTickets();
      const grouped: Record<string, TicketData[]> = {
        'To Do': [],
        'In Progress': [],
        'Done': [],
      };

      data.forEach((ticket: TicketData) => {
        if (typeof ticket.status === 'string' && boardStates.includes(ticket.status)) {
          grouped[ticket.status].push(ticket);
        }
      });

      if (filter) {
        Object.keys(grouped).forEach(status => {
          grouped[status] = grouped[status].filter(t =>
            (t.name ?? '').toLowerCase().includes(filter.toLowerCase())
          );
        });
      }
      if (sortBy === 'name') {
        Object.keys(grouped).forEach(status => {
          grouped[status].sort((a, b) => (a.name ?? '').localeCompare(b.name ?? ''));
        });
      }

      setTicketsByStatus(grouped);
    } catch (err) {
      console.error('Failed to retrieve tickets:', err);
      setError(true);
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) return;

    const sourceList = Array.from(ticketsByStatus[source.droppableId]);
    const destList = Array.from(ticketsByStatus[destination.droppableId]);

    const [movedTicket] = sourceList.splice(source.index, 1);

    if (source.droppableId !== destination.droppableId) {
      movedTicket.status = destination.droppableId;
    }

    destList.splice(destination.index, 0, movedTicket);

    setTicketsByStatus(prev => ({
      ...prev,
      [source.droppableId]: sourceList,
      [destination.droppableId]: destList,
    }));

    // Optionally, update ticket status on backend here
  };

  const deleteIndvTicket = async (ticketId: number): Promise<ApiMessage> => {
    try {
      const data = await deleteTicket(ticketId);
      fetchTickets();
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as 'name' | 'status');
  };



  useLayoutEffect(() => {
    checkLogin();
  }, []);

  useEffect(() => {
    if (loginCheck) {
      fetchTickets();
    }
  }, [loginCheck, filter, sortBy]);

  if (error) {
    return <ErrorPage />;
  }

  return (
    <>
      <div>
        {!loginCheck ? (
          <>
            <div className="login-notice">
              <img src={taskimage} alt="Task Manager Logo" />
              <h1>Welcome to Task Manager App!</h1>
              <p>Let's get organized. Start by adding your first task and take control of your productivity.</p>
            </div>
            <div className="special-features">
              <h2>Special Features</h2>
              <ul>
                <li>Organize tasks by status: To Do, In Progress, Done</li>
                <li>Filter tasks by name</li>
                <li>Sort tasks by name or status</li>
                <li>Delete tasks easily</li>
              </ul>
              <p>To get started, please log in or create an account.</p>
            </div>
          </>
        ) : (
          <>
            <div className="controls">
              <input
                type="text"
                placeholder="Filter tickets"
                value={filter}
                onChange={handleFilterChange}
                className="input-select"
              />
              <select value={sortBy} onChange={handleSortChange} className="input-select">
                <option value="name">Sort by Name</option>
                <option value="status">Sort by Status</option>
              </select>
            </div>
            <button type="button" id="create-ticket-link">
              <Link to="/create">New Ticket</Link>
            </button>

            <DragDropContext onDragEnd={onDragEnd}>
              <div className="board-display" style={{ display: 'flex', gap: '16px' }}>
                {boardStates.map(status => (
                  <Droppable droppableId={status} key={status}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{
                          background: snapshot.isDraggingOver ? '#e0e0e0' : '#f7f7f7',
                          padding: 8,
                          width: 300,
                          minHeight: 500,
                          borderRadius: 4,
                        }}
                      >
                        <h3>{status}</h3>
                        {ticketsByStatus[status].map((ticket, index) => (
                          <Draggable
                            key={(ticket.id ?? `ticket-${index}`).toString()}
                            draggableId={(ticket.id ?? `ticket-${index}`).toString()}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  userSelect: 'none',
                                  padding: 16,
                                  marginBottom: 8,
                                  backgroundColor: snapshot.isDragging ? '#d3d3d3' : '#fff',
                                  boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
                                  borderRadius: 4,
                                  ...provided.draggableProps.style,
                                }}
                              >
                                <h5>{ticket.name}</h5>
                                <p>{ticket.description || 'No description'}</p>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => {
                                    if (typeof ticket.id === 'number') {
                                      deleteIndvTicket(ticket.id);
                                    }
                                  }}
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                ))}
              </div>
            </DragDropContext>
          </>
        )}
        <footer className="app-footer">
          <p>&copy; 2025 Task Manager App. All rights reserved.</p>
          <div className="footer-social">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Board;
