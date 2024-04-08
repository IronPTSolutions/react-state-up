import { useState } from "react";

const validations = {
  title: (value) => {
    let message;
    if (!value) {
      message = 'Event title is required';
    }
    return message;
  },
  image: (value) => {
    let message;
    if (!value) {
      message = 'Event image is required';
    }
    return message;
  }
}

function EventFormVanilla({ className, onCreate }) {
  const [state, setState] = useState({
    event: {
      title: '',
      image: ''
    },
    errors: {
      title: validations.title(''),
      image: validations.image(''),
    },
    touch: {
      title: false,
      image: false
    }
  })

  const handleChange = (changeEvent) => {
    const { name, value } = changeEvent.currentTarget;
    setState({
      ...state,
      event: {
        ...state.event,
        [name]: value
      },
      errors: {
        ...state.errors,
        [name]: validations[name](value)
      }
    })
  }
  
  const handleBlur = (blurEvent) => {
    const { name } = blurEvent.currentTarget;
    setState({
      ...state,
      touch: {
        ...state.touch,
        [name]: true
      }
    })
  }

  const isValid = () => {
    const { errors } = state;
    return !Object.keys(errors).some((name) => errors[name] !== undefined)
  }

  const handleSubmit = (submitEvent) => {
    submitEvent.preventDefault();

    if (isValid()) {
      onCreate(event)
      setState({
        event: {
          title: '',
          image: ''
        },
        errors: {
          title: validations.title(''),
          image: validations.image(''),
        },
        touch: {
          title: false,
          image: false
        }
      })
    }
  }

  const { event, errors, touch } = state;
  return (
    <form className={className} onSubmit={handleSubmit}>
      {/* TITLE */}
      <div className="input-group mb-1">
        <span className="input-group-text"><i className="fa fa-tag fa-fw" /></span>
        <input type="text" name="title" value={event.title} onChange={handleChange} onBlur={handleBlur} className={`form-control  ${touch.title && errors.title ? 'is-invalid' : ''}`} placeholder="Event title..." />
        {touch.title && errors.title && (<div className="invalid-feedback">{errors.title}</div>)}
      </div>

      {/* IMAGE */}
      <div className="input-group mb-1">
        <span className="input-group-text"><i className="fa fa-picture-o fa-fw" /></span>
        <input type="text" name="image" value={event.image} onChange={handleChange} onBlur={handleBlur} className={`form-control ${touch.image && errors.image ? 'is-invalid' : ''}`} placeholder="Event image..." />
        {touch.image && errors.image && (<div className="invalid-feedback">{errors.image}</div>)}
      </div>
      
      <div className="d-grid">
        <button type="submit" className="btn btn-primary" disabled={!isValid()}>Add Event</button>
      </div>
    </form>
  )
}

EventFormVanilla.defaultProps = {
  onCreate: () => {},
  className: ''
}

export default EventFormVanilla;