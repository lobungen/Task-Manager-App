import { TicketData } from '../interfaces/TicketData';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

interface TicketCardProps {
  ticket: TicketData;
  deleteTicket: (ticketId: string) => Promise<void>;
}

const getPriorityColor = (priority?: string) => {
  switch (priority) {
    case 'High':
      return { color: 'red', fontWeight: 'bold' };
    case 'Medium':
      return { color: 'orange', fontWeight: 'bold' };
    case 'Low':
      return { color: 'green', fontWeight: 'bold' };
    default:
      return {};
  }
};

const getAvatarColor = (username?: string) => {
  // Generate a color based on username hash
  if (!username) return '#888';
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = `hsl(${hash % 360}, 70%, 50%)`;
  return color;
};

const formatDate = (dateString?: string) => {
  if (!dateString) return 'No timestamp';
  // If it's a number string, parse it as a number
  const dateNum = Number(dateString);
  const date = !isNaN(dateNum) ? new Date(dateNum) : new Date(dateString);
  return isNaN(date.getTime()) ? 'No timestamp' : date.toLocaleString();
};

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

 
  return (
    <div className='ticket-card'>
      <h3>{ticket.name}</h3>
      <p>{ticket.description}</p>
      <div className="assigned-user">
        <FaUserCircle
          title={ticket.assignedUser?.username}
          size={24}
          color={getAvatarColor(ticket.assignedUser?.username)}
        />
        <span className="username">{ticket.assignedUser?.username}</span>
      </div>
      <p><strong>Created:</strong> {formatDate(ticket.createdAt)}</p>
      <p><strong>Updated:</strong> {formatDate(ticket.updatedAt)}</p>
      <p>
        <strong>Priority:</strong>{' '}
        <span style={getPriorityColor(ticket.priority)}>{ticket.priority}</span>
      </p>
      <button type='button' onClick={handleEdit} className='editBtn'>Edit</button>
      <button type='button' onClick={handleDelete} className='deleteBtn'>Delete</button>
    </div>
  );
};

export default TicketCard;