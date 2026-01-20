import { assignTicket, unassignTicket } from "../services/ticketService.js";
import { isAdmin } from "../utils/utils.js";

const AssignTicketPage = ({ ticketId }) => {
  if (!isAdmin()) return <p>Access Denied</p>;

  const handleAssign = async () => {
    await assignTicket(ticketId, 2); // example userId
    alert("Assigned");
  };

  const handleUnassign = async () => {
    await unassignTicket(ticketId, 2);
    alert("Unassigned");
  };

  return (
    <div>
      <button onClick={handleAssign}>Assign</button>
      <button onClick={handleUnassign}>Unassign</button>
    </div>
  );
};

export default AssignTicketPage;
