import { useEffect, useState, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';

import { retrieveTickets, deleteTicket } from '../api/ticketAPI';
import ErrorPage from './ErrorPage';
import Swimlane from '../components/Swimlane';
import { TicketData } from '../interfaces/TicketData';
import { ApiMessage } from '../interfaces/ApiMessage';

import auth from '../utils/auth';

const boardStates = ['Todo', 'In Progress', 'Done'];

const Board = () => {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [error, setError] = useState(false);
  const [loginCheck, setLoginCheck] = useState(false);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'status'>('name');

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
   
    }
  };

  const fetchTickets = async () => {
    try {
      const data = await retrieveTickets();
      setTickets(data);
    } catch (err) {
      console.error('Failed to retrieve tickets:', err);
      setError(true);
    }
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

  const filteredTickets = tickets
    .filter(ticket => ticket.name?.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => (a[sortBy] || '').localeCompare(b[sortBy] || ''));

  useLayoutEffect(() => {
    checkLogin();
  }, []);

  useEffect(() => {
    if (loginCheck) {
      fetchTickets();
    }
  }, [loginCheck]);

  if (error) {
    return <ErrorPage />;
  }

  return (
    <>
      {!loginCheck ? (
        <div className="login-notice">
          <h1>Login to create & view tickets</h1>
        </div>
      ) : (
        <div className="board">
          <div className="controls">
            <input
              type="text"
              placeholder="Filter tickets"
              value={filter}
              onChange={handleFilterChange}
            />
            <select value={sortBy} onChange={handleSortChange}>
              <option value="name">Sort by Name</option>
              <option value="status">Sort by Status</option>
            </select>
          </div>
          <button type="button" id="create-ticket-link">
            <Link to="/create">New Ticket</Link>
          </button>
          <div className="board-display">
            {boardStates.map(status => {
              const filteredByStatus = filteredTickets.filter(
                ticket => ticket.status === status
              );
              return (
                <Swimlane
                  title={status}
                  key={status}
                  tickets={filteredByStatus}
                  deleteTicket={deleteIndvTicket}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
export default Board;
