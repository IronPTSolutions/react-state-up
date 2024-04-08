import { useForm } from 'react-hook-form';
import { isValidURL } from '../../../lib/validations';
import noImage from '../../../assets/img/no-image.jpg';

function EventForm({ className, onCreate }) {
  const { register, handleSubmit, reset, watch, formState: { errors, isValid } } = useForm({ mode: 'all' });

  const handleEventSubmit = (event) => {
    onCreate(event);
    reset();
  }

  const image = watch('image');

  return (
    <div className={`row ${className}`}>
      <div className="col-3"><div className="h-100" style={{ backgroundImage: `url('${(!errors.image && image) ? image : noImage}')`, backgroundSize: 'cover'}}></div></div>
      <div className="col-9">
        <form onSubmit={handleSubmit(handleEventSubmit)}>

          {/* TITLE */}
          <div className="input-group mb-1">
            <span className="input-group-text"><i className="fa fa-tag fa-fw" /></span>
            <input type="text" className={`form-control ${errors.title ? 'is-invalid' : ''}`} placeholder="Event title..."
              {...register('title', {
                required: 'Event title is required',
                minLength: {
                  value: 3,
                  message: 'Event title needs at least 3 chars'
                }
              })} />
            {errors.title && (<div className='invalid-feedback'>{errors.title.message}</div>)}
          </div>

          {/* IMAGE */}
          <div className="input-group mb-1">
            <span className="input-group-text"><i className="fa fa-picture-o fa-fw" /></span>
            <input type="text" className={`form-control ${errors.image ? 'is-invalid' : ''}`} placeholder="Event Image..."
              {...register('image', {
                required: 'Event image is required',
                validate: (value) => {
                  return isValidURL(value) || 'Invalid URL';
                }
              })} />
            {errors.image && (<div className='invalid-feedback'>{errors.image.message}</div>)}
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary" disabled={!isValid}>Add Event</button>
          </div>
        </form>
      </div>
    </div>
  )
}

EventForm.defaultProps = {
  className: '',
  onCreate: () => {}
}

export default EventForm;
