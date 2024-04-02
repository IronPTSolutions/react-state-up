import './EventItem.css';

function EventItem({ event, onDelete, onToggleFav }) {

  const handleDelete = () => onDelete(event);
  const handleToggleFav = () => onToggleFav(event);

  return (
    <div className="event card position-relative">
      <div className="event-actions d-flex gap-2 position-absolute">
        <i className={`fa fa-heart ${event.fav ? 'text-danger' : ''}`} role='button' onClick={handleToggleFav}/>
        <i className="fa fa-times text-danger" role='button' onClick={handleDelete} />
      </div>
      <img src={event.image} className="card-img-top" alt={event.title} />
      <div className="card-body">
        <h5 className="card-title">{event.title}</h5>
      </div>
    </div>
  )
}

EventItem.defaultProps = {
  onDelete: () => {},
  onToggleFav: () => {}
}

export default EventItem