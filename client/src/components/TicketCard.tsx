import { TicketData } from '../interfaces/TicketData';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

interface TicketCardProps {
  ticket: TicketData;
  deleteTicket: (ticketId: string) => Promise<void>;
}

const TicketCard = ({ ticket, deleteTicket }: TicketCardProps) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (ticket.id) {
      try {
        await deleteTicket(ticket.id);
      } catch (error) {
        console.error('Failed to delete ticket:', error);
      }
    }
  };

  const handleEdit = () => {
    navigate('/edit', { state: { id: ticket.id } });
  };

  const formattedCreatedAt = ticket.createdAt
    ? new Date(ticket.createdAt).toLocaleString()
    : 'No timestamp';

  const formattedUpdatedAt = ticket.updatedAt
    ? new Date(ticket.updatedAt).toLocaleString()
    : 'No update timestamp';

  return (
    <div className='ticket-card'>
      <h3>{ticket.name}</h3>
      <p>{ticket.description}</p>
      <div className="assigned-user">
        {ticket.assignedUser?.avatarUrl ? (
          <img
            src={ticket.assignedUser.avatarUrl}
            alt={ticket.assignedUser.username}
            className="avatar"
          />
        ) : (
          <FaUserCircle title={ticket.assignedUser?.username} size={24} />
        )}
        <span className="username">{ticket.assignedUser?.username}</span>
      </div>
      <p><strong>Created:</strong> {formattedCreatedAt}</p>
      <p><strong>Updated:</strong> {formattedUpdatedAt}</p>
      <p><strong>Priority:</strong> {ticket.priority}</p>
      <button type='button' onClick={handleEdit} className='editBtn'>Edit</button>
      <button type='button' onClick={handleDelete} className='deleteBtn'>Delete</button>
    </div>
  );
};

export default TicketCard;
